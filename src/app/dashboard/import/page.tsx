'use client'

import { useState } from 'react'
import { parseFile, validateAndNormalize, ImportRow, ImportResult } from '@/utils/importService'
import { generateTemplate } from '@/utils/templateGenerator'
import { importAgencies } from '@/app/actions/importActions'
import {
    Upload, FileText, CheckCircle2,
    AlertCircle, AlertTriangle,
    Loader2, ChevronRight, X, Download
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
    const [importSummary, setImportSummary] = useState<{ total: number; imported: number; duplicates: number; errors: number } | null>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return

        setIsLoading(true)
        setFile(selectedFile)
        setImportSummary(null)
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

        try {
            // Call Server Action
            // Using a system ID for now as Supabase auth is removed/migrating
            const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000000';

            const response = await importAgencies(result.valid, SYSTEM_USER_ID)

            if (response.success) {
                setImportSummary(response.summary)
                setResult(null)
                setFile(null)
                if (response.summary.errors > 0 || response.summary.duplicates > 0) {
                    alert(`Importación completada con observaciones.\nImportados: ${response.summary.imported}\nDuplicados: ${response.summary.duplicates}\nErrores: ${response.summary.errors}`)
                } else {
                    alert(`¡Éxito! Se han importado ${response.summary.imported} agencias correctamente.`)
                }
            } else {
                alert(`Error en la importación: ${response.details?.join(', ') || 'Error desconocido'}`)
            }

        } catch (err) {
            console.error('Error calling server action', err)
            alert('Error crítico de conexión al importar.')
        } finally {
            setIsImporting(false)
        }
    }

    return (
        <div className="w-full max-w-full overflow-x-hidden space-y-8 px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Importación Masiva</h1>
                    <p className="text-gray-600">Sube archivos .csv o .xlsx para cargar múltiples agencias</p>
                </div>
                <div className="flex gap-2 relative z-10">
                    <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); generateTemplate('csv'); }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                        <FileText className="h-4 w-4" /> Plantilla CSV
                    </button>
                    <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); generateTemplate('xlsx'); }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors cursor-pointer"
                    >
                        <FileText className="h-4 w-4" /> Plantilla Excel
                    </button>
                </div>
            </div>

            {!result && !importSummary && (
                <div
                    className="relative bg-white p-12 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center space-y-4 hover:border-primary/50 transition-colors z-0"
                    style={{ position: 'relative' }}
                >
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
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        disabled={isLoading}
                    />
                    {isLoading && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
                </div>
            )}

            {importSummary && (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <div className="inline-flex p-4 rounded-full bg-success/10 text-success mb-4">
                        <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Proceso Finalizado</h2>
                    <p className="text-gray-600 mb-6">Resumen de la operación:</p>

                    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm font-bold text-gray-500 uppercase">Importados</p>
                            <p className="text-2xl font-bold text-success">{importSummary.imported}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm font-bold text-gray-500 uppercase">Duplicados</p>
                            <p className="text-2xl font-bold text-accent">{importSummary.duplicates}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm font-bold text-gray-500 uppercase">Errores</p>
                            <p className="text-2xl font-bold text-error">{importSummary.errors}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setImportSummary(null)}
                        className="mt-8 px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
                    >
                        Subir otro archivo
                    </button>
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
                                <p className="text-xs font-bold text-gray-400 uppercase">Duplicados (Archivo)</p>
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
                                <button onClick={() => { setResult(null); setFile(null); }} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Cancelar</button>
                                <button
                                    onClick={handleImport}
                                    disabled={isImporting || result.valid.length === 0}
                                    className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50"
                                >
                                    {isImporting ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Importando...
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
