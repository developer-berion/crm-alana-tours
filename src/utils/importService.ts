import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import { Branch, ContactStatus, LeadTemperature, RelationshipType } from '@/types/database'

export interface ImportRow {
    agency_name: string
    branch_name?: string
    contact_name?: string
    email: string
    phone?: string
    country?: string
    state?: string
    city?: string
    instagram_url?: string
    tiktok_url?: string
    website_url?: string
    contact_status?: ContactStatus
    lead_temperature?: LeadTemperature
    relationship_type?: RelationshipType
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

export function validateAndNormalize(data: any[]): ImportResult {
    const result: ImportResult = {
        valid: [],
        duplicates: [],
        invalid: [],
    }

    const seenEmails = new Set<string>()
    const seenAgencyBranches = new Set<string>()

    data.forEach((row, index) => {
        const errors: string[] = []

        // Normalization
        const normalized: ImportRow = {
            agency_name: row.agency_name || row.Agencia || '',
            branch_name: row.branch_name || row.Sucursal || 'Principal',
            email: row.email || row.Email || '',
            contact_name: row.contact_name || row.Contacto,
            phone: row.phone || row.Telefono || row.Teléfono,
            country: row.country || row.Pais || row.País,
            state: row.state || row.Provincia || row.Estado,
            city: row.city || row.Ciudad,
            instagram_url: row.instagram_url || row.Instagram,
            tiktok_url: row.tiktok_url || row.TikTok,
            website_url: row.website_url || row.Web,
            contact_status: (row.contact_status || 'not_contacted') as ContactStatus,
            lead_temperature: (row.lead_temperature || 'cold') as LeadTemperature,
            relationship_type: (row.relationship_type || 'lead') as RelationshipType,
            notes: row.notes || row.Notas,
        }

        // Validation
        if (!normalized.agency_name) errors.push('Nombre de agencia requerido')
        if (!normalized.email) errors.push('Email requerido')
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) errors.push('Email inválido')

        if (errors.length > 0) {
            result.invalid.push({ row, errors })
            return
        }

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
