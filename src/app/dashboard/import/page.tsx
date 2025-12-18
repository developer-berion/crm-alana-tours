'use client'

import { useState } from 'react'
import { parseFile, validateAndNormalize, ImportRow, ImportResult } from '@/utils/importService'
import { supabase } from '@/lib/supabase'
import {
    Upload, FileText, CheckCircle2,
    AlertCircle, AlertTriangle,
    Loader2, ChevronRight, X
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export default function ImportPage() {
    const [file, setFile] = useState<File | null>(null)
    const [result, setResult] = useState<ImportResult | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isImporting, setIsImporting] = useState(false)
    const [importStatus, setImportStatus] = useState<{ current: number; total: number } | null>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return

        setIsLoading(true)
        setFile(selectedFile)
        try {
            const data = await parseFile(selectedFile)
            const validationResult = validateAndNormalize(data)
            setResult(validationResult)
        } catch (err) {
            console.error(err)
            alert('Error al procesar el archivo')
        } finally {
            setIsLoading(false)
        }
    }

    const handleImport = async () => {
        if (!result || result.valid.length === 0) return
        setIsImporting(true)
        const total = result.valid.length

        let successCount = 0
        const { data: { user } } = await supabase.auth.getUser()

        for (let i = 0; i < total; i++) {
            setImportStatus({ current: i + 1, total })
            const row = result.valid[i]

            try {
                // 1. Find or create agency
                let agencyId: string
                const { data: existingAgency } = await supabase
                    .from('agencies')
                    .select('id')
                    .eq('name', row.agency_name)
                    .single()

                if (existingAgency) {
                    agencyId = existingAgency.id
                } else {
                    const { data: newAgency } = await supabase
                        .from('agencies')
                        .insert({ name: row.agency_name })
                        .select()
                        .single()
                    agencyId = newAgency!.id
                }

                // 2. Insert Branch
                const { data: branch, error: branchError } = await supabase
                    .from('branches')
                    .insert({
                        agency_id: agencyId,
                        branch_name: row.branch_name,
                        contact_name: row.contact_name,
                        email: row.email,
                        phone: row.phone,
                        country: row.country,
                        state: row.state,
                        city: row.city,
                        instagram_url: row.instagram_url,
                        tiktok_url: row.tiktok_url,
                        website_url: row.website_url,
                        contact_status: row.contact_status,
                        lead_temperature: row.lead_temperature,
                        relationship_type: row.relationship_type,
                        notes: row.notes
                    })
                    .select()
                    .single()

                if (!branchError && branch && user) {
                    successCount++
                    // Log audit
                    await supabase.from('agency_activity_log').insert({
                        branch_id: branch.id,
                        user_id: user.id,
                        action_type: 'bulk_import',
                        new_value: 'Importado masivamente'
                    })
                }
            } catch (err) {
                console.error('Error importing row', i, err)
            }
        }

        // Final log
        if (user) {
            await supabase.from('import_logs').insert({
                file_name: file?.name || 'unknown',
                uploaded_by: user.id,
                total_rows: (result.valid.length + result.duplicates.length + result.invalid.length),
                valid_rows: successCount,
                duplicate_rows: result.duplicates.length,
                invalid_rows: result.invalid.length
            })
        }

        setIsImporting(false)
        setImportStatus(null)
        alert(`Importación finalizada. ${successCount} registros creados.`)
        setResult(null)
        setFile(null)
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Importación Masiva</h1>
                <p className="text-gray-600">Sube archivos .csv o .xlsx para cargar múltiples agencias</p>
            </div>

            {!result && (
                <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-primary/10 text-primary">
                        <Upload className="h-10 w-10" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">Haz clic para subir un archivo</p>
                        <p className="text-sm text-gray-500">CSV o XLSX (máx. 10MB)</p>
                    </div>
                    <input
                        type="file"
                        accept=".csv,.xlsx"
                        onChange={handleFileChange}
                        className="absolute opacity-0 cursor-pointer w-full h-full max-h-64 mt-[-150px]"
                        disabled={isLoading}
                    />
                    {isLoading && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
                </div>
            )}

            {result && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-success/10 text-success">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Válidos</p>
                                <p className="text-2xl font-bold text-gray-900">{result.valid.length}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-accent/10 text-accent">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Duplicados</p>
                                <p className="text-2xl font-bold text-gray-900">{result.duplicates.length}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-error/10 text-error">
                                <AlertCircle className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase">Inválidos</p>
                                <p className="text-2xl font-bold text-gray-900">{result.invalid.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="font-bold text-gray-900">Vista Previa (Primeros 10 válidos)</h2>
                            <div className="flex gap-2">
                                <button onClick={() => setResult(null)} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Cancelar</button>
                                <button
                                    onClick={handleImport}
                                    disabled={isImporting || result.valid.length === 0}
                                    className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50"
                                >
                                    {isImporting ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            {importStatus ? `${importStatus.current}/${importStatus.total}` : 'Importando...'}
                                        </div>
                                    ) : 'Comenzar Importación'}
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 font-bold text-gray-500 uppercase tracking-wider">Agencia</th>
                                        <th className="px-6 py-3 font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 font-bold text-gray-500 uppercase tracking-wider">Ciudad</th>
                                        <th className="px-6 py-3 font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {result.valid.slice(0, 10).map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{row.agency_name}</td>
                                            <td className="px-6 py-4 text-gray-600">{row.email}</td>
                                            <td className="px-6 py-4 text-gray-600">{row.city || '-'}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase">Listo</span>
                                            </td>
                                        </tr>
                                    ))}
                                    {result.valid.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">No hay registros válidos para importar.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
