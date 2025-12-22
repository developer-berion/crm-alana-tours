import { z } from 'zod'

export const AgencyImportSchema = z.object({
    agency_name: z.string().min(1, 'Nombre de agencia requerido'),
    branch_name: z.string().optional().default('Principal'),
    email: z.string().email('Email inválido'),
    contact_name: z.string().optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
    country: z.string().optional().or(z.literal('')),
    state: z.string().optional().or(z.literal('')),
    city: z.string().optional().or(z.literal('')),
    instagram_url: z.string().url('URL inválida').optional().or(z.literal('')),
    tiktok_url: z.string().url('URL inválida').optional().or(z.literal('')),
    website_url: z.string().url('URL inválida').optional().or(z.literal('')),
    contact_status: z.enum(['not_contacted', 'contacted', 'waiting_response', 'rejected', 'interested']).optional().default('not_contacted'),
    lead_temperature: z.enum(['cold', 'warm', 'hot']).optional().default('cold'),
    relationship_type: z.enum(['lead', 'client']).optional().default('lead'),
    notes: z.string().optional().or(z.literal(''))
})

export type AgencyImportInput = z.infer<typeof AgencyImportSchema>

// Keep existing parsing logic but update validation to use Zod
import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import { ContactStatus, LeadTemperature, RelationshipType } from '@/types/database'

export interface ImportRow {
    agency_name: string
    branch_name: string
    contact_name?: string
    email: string
    phone?: string
    country?: string
    state?: string
    city?: string
    instagram_url?: string
    tiktok_url?: string
    website_url?: string
    contact_status: ContactStatus
    lead_temperature: LeadTemperature
    relationship_type: RelationshipType
    notes?: string
}

export interface ImportResult {
    valid: ImportRow[]
    duplicates: { row: ImportRow; reason: string }[]
    invalid: { row: any; errors: string[] }[]
}

export async function parseFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const extension = file.name.split('.').pop()?.toLowerCase()

        if (extension === 'csv') {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => resolve(results.data),
                error: (error) => reject(error),
            })
        } else if (extension === 'xlsx') {
            const reader = new FileReader()
            reader.onload = (e) => {
                const data = e.target?.result
                const workbook = XLSX.read(data, { type: 'binary' })
                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]
                resolve(XLSX.utils.sheet_to_json(sheet))
            }
            reader.onerror = (error) => reject(error)
            reader.readAsBinaryString(file)
        } else {
            reject(new Error('Formato de archivo no soportado'))
        }
    })
}

const NORMALIZATION_MAP = {
    contact_status: {
        'no contactado': 'not_contacted',
        'contactado': 'contacted',
        'esperando respuesta': 'waiting_response',
        'rechazado': 'rejected',
        'interesado': 'interested',
        'no contactad': 'not_contacted', // Handle truncated text from screenshot
        'sin contacto': 'not_contacted'
    },
    lead_temperature: {
        'frio': 'cold',
        'frío': 'cold',
        'tibio': 'warm',
        'caliente': 'hot'
    },
    relationship_type: {
        'lead': 'lead',
        'cliente': 'client'
    }
}

function normalizeValue(field: string, value: string): string {
    if (!value) return ''
    const normalized = value.toString().toLowerCase().trim()

    // Check specific normalization maps
    if (field === 'contact_status' && (NORMALIZATION_MAP.contact_status as any)[normalized]) {
        return (NORMALIZATION_MAP.contact_status as any)[normalized]
    }
    if (field === 'lead_temperature' && (NORMALIZATION_MAP.lead_temperature as any)[normalized]) {
        return (NORMALIZATION_MAP.lead_temperature as any)[normalized]
    }
    if (field === 'relationship_type' && (NORMALIZATION_MAP.relationship_type as any)[normalized]) {
        return (NORMALIZATION_MAP.relationship_type as any)[normalized]
    }

    return value
}

function sanitizeUrl(url: string): string {
    if (!url) return ''
    try {
        const schema = z.string().url()
        const result = schema.safeParse(url)
        return result.success ? url : ''
    } catch {
        return ''
    }
}

export function validateAndNormalize(data: any[]): ImportResult {
    const result: ImportResult = {
        valid: [],
        duplicates: [],
        invalid: [],
    }

    const seenEmails = new Set<string>()
    const seenAgencyBranches = new Set<string>()

    data.forEach((row, index) => {
        // Normalization
        const raw: any = {
            agency_name: row["Agency Name"] || row.agency_name || row.Agencia || '',
            branch_name: row["Branch Name"] || row.branch_name || row.Sucursal || 'Principal',
            email: row["Email"] || row.email || row.Email || '',
            contact_name: row["Contact Name"] || row.contact_name || row.Contacto || '',
            phone: row["Phone"] || row.phone || row.Telefono || row.Teléfono || '',
            country: row["Country"] || row.country || row.Pais || row.País || '',
            state: row["State"] || row.state || row.Provincia || row.Estado || '',
            city: row["City"] || row.city || row.Ciudad || '',
            instagram_url: sanitizeUrl(row["Instagram"] || row.instagram_url || row.Instagram || ''),
            tiktok_url: sanitizeUrl(row["TikTok"] || row.tiktok_url || row.TikTok || ''),
            website_url: sanitizeUrl(row["Website"] || row.website_url || row.Web || ''),
            contact_status: normalizeValue('contact_status', (row["Contact Status"] || row.contact_status || 'not_contacted').toString().toLowerCase()),
            lead_temperature: normalizeValue('lead_temperature', (row["Temperature"] || row.lead_temperature || 'cold').toString().toLowerCase()),
            relationship_type: normalizeValue('relationship_type', (row["Relationship"] || row.relationship_type || 'lead').toString().toLowerCase()),
            notes: row["Initial Note"] || row.notes || row.Notas || '',
        }

        // Zod Validation
        const safeParse = AgencyImportSchema.safeParse(raw)

        if (!safeParse.success) {
            const errors = safeParse.error.issues.map(i => `${i.path.join('.')}: ${i.message}`)
            result.invalid.push({ row: raw, errors })
            return
        }

        const normalized = safeParse.data as ImportRow;

        // Duplicate Detection (Local to file)
        const emailKey = normalized.email.toLowerCase()
        const agencyBranchKey = `${normalized.agency_name.toLowerCase()}|${normalized.branch_name?.toLowerCase()}`

        if (seenEmails.has(emailKey)) {
            result.duplicates.push({ row: normalized, reason: 'Email duplicado en el archivo' })
            return
        }
        if (seenAgencyBranches.has(agencyBranchKey)) {
            result.duplicates.push({ row: normalized, reason: 'Agencia y Sucursal duplicadas en el archivo' })
            return
        }

        seenEmails.add(emailKey)
        seenAgencyBranches.add(agencyBranchKey)
        result.valid.push(normalized)
    })

    return result
}
