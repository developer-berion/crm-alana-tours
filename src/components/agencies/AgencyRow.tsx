'use client'

import { Agency, Branch } from '@/types/database'
import { MoreHorizontal, Edit2, ChevronRight, Phone, Mail, MapPin, Building2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface AgencyRowProps {
    agency: Agency
    primaryBranch?: Branch
    onEdit: (agency: Agency) => void
}

const statusColors: Record<string, string> = {
    not_contacted: 'bg-gray-100 text-gray-600',
    contacted: 'bg-blue-100 text-blue-600',
    waiting_response: 'bg-yellow-100 text-yellow-600',
    rejected: 'bg-red-100 text-red-600',
    interested: 'bg-green-100 text-green-600'
}

const statusLabels: Record<string, string> = {
    not_contacted: 'No Contactado',
    contacted: 'Contactado',
    waiting_response: 'Esperando Respuesta',
    rejected: 'Rechazado',
    interested: 'Interesado'
}

const tempColors: Record<string, string> = {
    cold: 'bg-blue-50 text-blue-600 border-blue-100',
    warm: 'bg-orange-50 text-orange-600 border-orange-100',
    hot: 'bg-red-50 text-red-600 border-red-100'
}

const tempLabels: Record<string, string> = {
    cold: 'Frío',
    warm: 'Tibio',
    hot: 'Caliente'
}

export default function AgencyRow({ agency, primaryBranch, onEdit }: AgencyRowProps) {
    const router = useRouter()

    // Handle row click to navigate
    const handleRowClick = (e: React.MouseEvent) => {
        // Prevent navigation if clicking buttons or links
        if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
            return
        }
        router.push(`/dashboard/agencies/${agency.id}`)
    }

    const contactStatus = primaryBranch?.contact_status || 'not_contacted'
    const leadTemp = primaryBranch?.lead_temperature || 'cold'

    return (
        <div
            onClick={handleRowClick}
            className="group relative bg-white hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 cursor-pointer"
        >
            {/* Desktop/Tablet Layout */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 items-center">
                {/* Name & Rep */}
                <div className="col-span-4 lg:col-span-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Building2 size={18} />
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{agency.name}</h3>
                        {primaryBranch?.contact_name && (
                            <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                                <span className="opacity-70">Rep:</span> {primaryBranch.contact_name}
                            </p>
                        )}
                    </div>
                </div>

                {/* Contact (Email) - Hidden on Tablet tight spaces if needed, but we keep it for now */}
                <div className="col-span-3 lg:col-span-3 hidden md:flex flex-col justify-center min-w-0">
                    {primaryBranch?.email ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                            <Mail size={14} className="shrink-0 opacity-50" />
                            <span className="truncate">{primaryBranch.email}</span>
                        </div>
                    ) : (
                        <span className="text-xs text-gray-400 italic">Sin email</span>
                    )}
                    {primaryBranch?.phone && (
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 truncate">
                            <Phone size={12} className="shrink-0 opacity-50" />
                            <span className="truncate">{primaryBranch.phone.split(',')[0]}</span>
                        </div>
                    )}
                </div>

                {/* Location - Hidden on smaller Tablet */}
                <div className="col-span-2 lg:col-span-2 hidden lg:flex items-center gap-2 text-sm text-gray-600">
                    {primaryBranch?.country ? (
                        <>
                            <MapPin size={14} className="shrink-0 opacity-50" />
                            <span className="truncate">{primaryBranch.country}</span>
                        </>
                    ) : (
                        <span className="text-xs text-gray-400 italic">-</span>
                    )}
                </div>

                {/* Status & Temp */}
                <div className="col-span-3 lg:col-span-3 flex flex-wrap gap-2 items-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[contactStatus]}`}>
                        {statusLabels[contactStatus]}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${tempColors[leadTemp]}`}>
                        {tempLabels[leadTemp]}
                    </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 lg:col-span-1 flex justify-end gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onEdit(agency)
                        }}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Editar"
                    >
                        <Edit2 size={16} />
                    </button>
                    <div className="p-2 text-gray-300">
                        <ChevronRight size={16} />
                    </div>
                </div>
            </div>

            {/* Mobile Layout (< 768px) */}
            <div className="md:hidden p-4 space-y-3">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Building2 size={18} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">{agency.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                {primaryBranch?.contact_name && <span>{primaryBranch.contact_name}</span>}
                                {primaryBranch?.country && (
                                    <>
                                        <span>•</span>
                                        <span>{primaryBranch.country}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onEdit(agency)
                        }}
                        className="p-2 -mr-2 text-gray-400 hover:text-primary rounded-lg"
                    >
                        <Edit2 size={18} />
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 pl-[3.25rem]">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${statusColors[contactStatus]}`}>
                        {statusLabels[contactStatus]}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${tempColors[leadTemp]}`}>
                        {tempLabels[leadTemp]}
                    </span>
                </div>
            </div>
        </div>
    )
}
