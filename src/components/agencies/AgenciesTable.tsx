'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FlatAgencyBranchRow, ContactStatus, LeadTemperature, RelationshipType } from '@/types/database'
import { Plus, ArrowUp, ArrowDown, Download } from 'lucide-react'
import * as XLSX from 'xlsx'
import { Tooltip } from 'react-tooltip'
import { z } from 'zod'
import SocialsCell from './SocialsCell'
import EmailsCell from './EmailsCell'
import EditPopoverCell from '../ui/EditPopoverCell'
import AddBranchModal from '@/components/agencies/AddBranchModal'

interface AgenciesTableProps {
    agencies: FlatAgencyBranchRow[]
    loading: boolean
    className?: string
}

// Validation schemas
const emailSchema = z.string().email().nullable().or(z.literal(''))

// Option Lists
const STATUS_OPTIONS: { value: ContactStatus; label: string; color: string }[] = [
    { value: 'not_contacted', label: 'No Contactado', color: 'bg-gray-100 text-gray-700' },
    { value: 'contacted', label: 'Contactado', color: 'bg-blue-100 text-blue-700' },
    { value: 'waiting_response', label: 'Esperando', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'rejected', label: 'Rechazado', color: 'bg-red-100 text-red-700' },
    { value: 'interested', label: 'Interesado', color: 'bg-green-100 text-green-700' },
]

const TEMP_OPTIONS: { value: LeadTemperature; label: string; color: string }[] = [
    { value: 'cold', label: 'Frío', color: 'bg-blue-50 text-blue-600' },
    { value: 'warm', label: 'Tibio', color: 'bg-orange-50 text-orange-600' },
    { value: 'hot', label: 'Caliente', color: 'bg-red-50 text-red-600' },
]

const REL_OPTIONS: { value: RelationshipType; label: string; color: string }[] = [
    { value: 'lead', label: 'Lead', color: 'bg-gray-100 text-gray-600' },
    { value: 'client', label: 'Cliente', color: 'bg-purple-100 text-purple-700' },
]

type SortKey = keyof FlatAgencyBranchRow | 'created_at'
type SortDirection = 'asc' | 'desc'

export default function AgenciesTable({ agencies: initialAgencies, loading, className = '' }: AgenciesTableProps) {
    const router = useRouter()

    // State
    const [data, setData] = useState<FlatAgencyBranchRow[]>([])
    const [branchModal, setBranchModal] = useState({
        isOpen: false,
        agencyId: '',
        agencyName: ''
    });
    // Sorting & Search
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    // Initialize data
    useEffect(() => {
        setData(initialAgencies)
    }, [initialAgencies])

    // --- Helpers ---
    const handleSort = (key: SortKey) => {
        setSortConfig(current => {
            if (!current || current.key !== key) {
                return { key, direction: 'asc' }
            }
            if (current.direction === 'asc') {
                return { key, direction: 'desc' }
            }
            return null // Reset
        })
    }

    const getSortIcon = (key: SortKey) => {
        if (sortConfig?.key !== key) return null
        return sortConfig.direction === 'asc' ? <ArrowUp size={14} className="inline ml-1" /> : <ArrowDown size={14} className="inline ml-1" />
    }

    // --- Derived Data (Search & Sort) ---
    const filteredBranches = useMemo(() => {
        let processed = [...data]

        // 1. Search
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase()
            processed = processed.filter(item =>
                item.agency_name?.toLowerCase().includes(lowerTerm) ||
                item.branch_name?.toLowerCase().includes(lowerTerm) ||
                item.contact_name?.toLowerCase().includes(lowerTerm) ||
                item.city?.toLowerCase().includes(lowerTerm) ||
                item.country?.toLowerCase().includes(lowerTerm) ||
                item.state?.toLowerCase().includes(lowerTerm) ||
                item.contact_status?.toLowerCase().includes(lowerTerm) ||
                item.lead_temperature?.toLowerCase().includes(lowerTerm)
            )
        }

        // 2. Sort
        if (sortConfig) {
            processed.sort((a, b) => {
                const aVal = a[sortConfig.key]
                const bVal = b[sortConfig.key]

                if (aVal === bVal) return 0
                if (aVal === null || aVal === undefined) return 1
                if (bVal === null || bVal === undefined) return -1

                const comparison = aVal < bVal ? -1 : 1
                return sortConfig.direction === 'asc' ? comparison : -comparison
            })
        }

        return processed
    }, [data, searchTerm, sortConfig])

    // --- Export Logic ---
    const handleExport = () => {
        const formattedData = data.map(item => ({
            "Nombre Agencia": item.agency_name || '',
            "Sede": item.branch_name || '',
            "Contacto": item.contact_name || '',
            "Estatus": STATUS_OPTIONS.find(o => o.value === item.contact_status)?.label || item.contact_status || '',
            "Temperatura": TEMP_OPTIONS.find(o => o.value === item.lead_temperature)?.label || item.lead_temperature || '',
            "Relación": REL_OPTIONS.find(o => o.value === item.relationship_type)?.label || item.relationship_type || '',
            "País": item.country || '',
            "Estado": item.state || '',
            "Ciudad": item.city || '',
            "Email": item.email || '',
            "Teléfono": item.phone || '',
            "Instagram": item.instagram_url || '',
            "TikTok": item.tiktok_url || '',
            "Website": item.website_url || '',
            "Facebook": item.facebook_url || '',
            "Notas": item.notes || '',
            "Fecha Registro": item.created_at ? new Date(item.created_at).toLocaleDateString() : ''
        }));

        const ws = XLSX.utils.json_to_sheet(formattedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Agencias");
        XLSX.writeFile(wb, "agencias_crm_export.xlsx");
    };

    // --- Editing Logic ---
    const saveCell = async (row: FlatAgencyBranchRow, field: keyof FlatAgencyBranchRow | 'socials_update', customValue: any) => {
        const rowId = row.branch_id;
        const oldValue = row[field as keyof FlatAgencyBranchRow];

        if (field === 'socials_update') {
            const updates = customValue as Partial<FlatAgencyBranchRow>;
            const updatedData = data.map(r => {
                if (r.branch_id === rowId) {
                    return { ...r, ...updates }
                }
                return r
            })
            setData(updatedData)

            try {
                if (rowId) {
                    for (const [key, val] of Object.entries(updates)) {
                        if (val !== (row as any)[key]) {
                            await fetch(`/api/branches/${rowId}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ field: key, value: val, oldValue: (row as any)[key] })
                            })
                        }
                    }
                }
            } catch (e) { console.error(e) }
            return
        }

        if (oldValue === customValue) return

        if (field === 'email' && customValue) {
            const res = emailSchema.safeParse(customValue)
            if (!res.success) {
                alert('Email inválido')
                return
            }
        }

        // Optimistic Update
        const updatedData = data.map(r => {
            if (r.branch_id === row.branch_id) {
                return { ...r, [field]: customValue }
            }
            if (field === 'agency_name' && r.agency_id === row.agency_id) {
                return { ...r, agency_name: customValue }
            }
            return r
        })

        setData(updatedData)

        try {
            if (field === 'agency_name') {
                await fetch(`/api/agencies/${row.agency_id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: customValue })
                })
            } else if (row.branch_id) {
                await fetch(`/api/branches/${row.branch_id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ field, value: customValue, oldValue })
                })
            }
        } catch (error) {
            console.error('Save failed', error)
            router.refresh()
        }
    }

    const archiveAgency = async (row: FlatAgencyBranchRow) => {
        // Optimistic remove for all branches of this agency
        // Agency ID is needed. row has agency_id.
        const agencyId = row.agency_id;

        setData(prev => prev.filter(item => item.agency_id !== agencyId))

        try {
            await fetch(`/api/agencies/${agencyId}`, {
                method: 'DELETE'
            })
        } catch (error) {
            console.error('Archive failed', error)
            router.refresh()
        }
    }

    const handleModalSuccess = () => {
        router.refresh();
    };

    if (loading) return <div className="p-12 text-center text-gray-400">Cargando Super Tabla...</div>

    return (
        <div className={`space-y-4 flex flex-col ${className}`}>
            {/* Local Search and Export */}
            <div className="flex items-center gap-4 shrink-0">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, país, estado, ciudad, estatus..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-4 pr-10 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm text-sm"
                    />
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium text-sm transition-colors shadow-sm whitespace-nowrap"
                >
                    <Download size={16} />
                    Exportar
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col flex-1 min-h-0">
                <div className="overflow-auto flex-1 h-full w-full">
                    <table className="min-w-max divide-y divide-gray-200 text-sm h-full">
                        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-30">
                            <tr>
                                {/* 0. # Index - Sticky Left 0 */}
                                <th className="px-4 py-3 text-center font-semibold text-gray-400 uppercase tracking-wider w-12 sticky left-0 z-40 bg-gray-50 border-r border-gray-200">
                                    #
                                </th>
                                {/* 1. Agency Name - Sticky Left 12 (3rem) */}
                                <th
                                    onClick={() => handleSort('agency_name')}
                                    className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 w-[220px] max-w-[220px] sticky left-12 z-40 bg-gray-50 border-r border-gray-200 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)]"
                                >
                                    Agencia {getSortIcon('agency_name')}
                                </th>
                                <th onClick={() => handleSort('branch_name')} className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 min-w-[150px]">
                                    Sede {getSortIcon('branch_name')}
                                </th>
                                <th onClick={() => handleSort('contact_name')} className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 min-w-[150px]">
                                    Contacto {getSortIcon('contact_name')}
                                </th>
                                <th onClick={() => handleSort('contact_status')} className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                    Estado {getSortIcon('contact_status')}
                                </th>
                                <th onClick={() => handleSort('lead_temperature')} className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                    Temp {getSortIcon('lead_temperature')}
                                </th>
                                <th onClick={() => handleSort('relationship_type')} className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                    Relación {getSortIcon('relationship_type')}
                                </th>
                                <th onClick={() => handleSort('country')} className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 min-w-[120px]">
                                    País {getSortIcon('country')}
                                </th>
                                <th onClick={() => handleSort('state')} className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 min-w-[120px]">
                                    Estado {getSortIcon('state')}
                                </th>
                                <th onClick={() => handleSort('city')} className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 min-w-[120px]">
                                    Ciudad {getSortIcon('city')}
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider min-w-[180px]">
                                    Email
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider min-w-[140px]">
                                    Teléfono
                                </th>
                                <th className="px-4 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider">
                                    Redes
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider min-w-[200px]">
                                    Notas
                                </th>
                                <th onClick={() => handleSort('created_at')} className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                    Registro {getSortIcon('created_at')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBranches.map((row, index) => {
                                const rowKey = row.branch_id || `ghost_${row.agency_id}`;
                                return (
                                    <tr key={rowKey} className="hover:bg-gray-50 transition-colors">
                                        <td className="sticky left-0 bg-white group-hover:bg-gray-50 px-4 py-2 text-center text-gray-400 text-xs font-mono border-r border-gray-100 z-20 w-12">
                                            {index + 1}
                                        </td>
                                        <td className="sticky left-12 bg-white group-hover:bg-gray-50 px-4 py-2 border-r border-gray-200 font-medium text-gray-900 z-20 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)] max-w-[220px]">
                                            <div className="flex justify-between items-center group" title={row.agency_name || ''}>
                                                <EditPopoverCell
                                                    value={row.agency_name}
                                                    label="Agencia"
                                                    onSave={(val) => saveCell(row, 'agency_name', val)}
                                                    onArchive={() => archiveAgency(row)}
                                                    className="truncate block w-full text-sm font-medium text-gray-900"
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setBranchModal({
                                                            isOpen: true,
                                                            agencyId: row.agency_id,
                                                            agencyName: row.agency_name,
                                                        });
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-blue-50 text-primary rounded ml-2"
                                                    title="Agregar Sucursal"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-100">
                                            <EditPopoverCell value={row.branch_name} label="Sede" onSave={(val) => saveCell(row, 'branch_name', val)} />
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-100">
                                            <EditPopoverCell value={row.contact_name} label="Contacto" placeholder="Sin nombre" onSave={(val) => saveCell(row, 'contact_name', val)} />
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-100">
                                            <EditPopoverCell value={STATUS_OPTIONS.find(o => o.value === row.contact_status)?.label || 'Sin Estado'} label="Estado" type="select" options={STATUS_OPTIONS} onSave={(val) => saveCell(row, 'contact_status', val)} className={`px-2 py-0.5 rounded text-[10px] font-medium w-fit ${STATUS_OPTIONS.find(o => o.value === row.contact_status)?.color || 'bg-gray-100'}`} />
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-100">
                                            <EditPopoverCell value={TEMP_OPTIONS.find(o => o.value === row.lead_temperature)?.label || '-'} label="Temperatura" type="select" options={TEMP_OPTIONS} onSave={(val) => saveCell(row, 'lead_temperature', val)} className={`px-2 py-0.5 rounded text-[10px] font-medium border w-fit ${TEMP_OPTIONS.find(o => o.value === row.lead_temperature)?.color || 'bg-gray-50'}`} />
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-100">
                                            <EditPopoverCell value={REL_OPTIONS.find(o => o.value === row.relationship_type)?.label || 'Lead'} label="Relación" type="select" options={REL_OPTIONS} onSave={(val) => saveCell(row, 'relationship_type', val)} className={`px-2 py-0.5 rounded text-[10px] font-medium w-fit ${REL_OPTIONS.find(o => o.value === row.relationship_type)?.color || 'bg-gray-100'}`} />
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-100">
                                            <EditPopoverCell value={row.country} label="País" onSave={(val) => saveCell(row, 'country', val)} placeholder="-" />
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-100">
                                            <EditPopoverCell value={row.state} label="Estado" onSave={(val) => saveCell(row, 'state', val)} placeholder="-" />
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-100">
                                            <EditPopoverCell value={row.city} label="Ciudad" onSave={(val) => saveCell(row, 'city', val)} placeholder="-" />
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-100">
                                            <EmailsCell
                                                initialValue={row.email}
                                                onSave={(val) => saveCell(row, 'email', val)}
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-100">
                                            <EditPopoverCell value={row.phone} label="Teléfono" type="phone" onSave={(val) => saveCell(row, 'phone', val)} placeholder="-" />
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-100">
                                            <SocialsCell instagram={row.instagram_url} tiktok={row.tiktok_url} website={row.website_url} facebook={row.facebook_url} onSave={(updates) => saveCell(row, 'socials_update', updates)} />
                                        </td>
                                        <td className="px-4 py-2 border-r border-gray-100 min-w-[200px]">
                                            <EditPopoverCell value={row.notes} label="Notas" type="textarea" onSave={(val) => saveCell(row, 'notes', val)} className="text-xs text-gray-500 line-clamp-2 h-full" placeholder="Agregar nota..." />
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-400 text-xs">
                                            {row.created_at ? new Date(row.created_at).toLocaleDateString() : '-'}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="bg-gray-50 p-2 text-xs text-center text-gray-400 border-t border-gray-200 shrink-0">
                    {filteredBranches.length} registros mostrados.
                </div>
            </div>

            <AddBranchModal
                isOpen={branchModal.isOpen}
                onClose={() => setBranchModal({ ...branchModal, isOpen: false })}
                onSuccess={handleModalSuccess}
                agencyId={branchModal.agencyId}
                agencyName={branchModal.agencyName}
            />
        </div>
    )
}
