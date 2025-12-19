'use client'

import { Agency, Branch } from '@/types/database'
import AgencyRow from './AgencyRow'
import { ArrowUpDown } from 'lucide-react'

// Extended Agency type to include branches for the UI logic
export type AgencyWithBranches = Agency & {
    branches?: Branch[]
}

interface AgenciesTableProps {
    agencies: AgencyWithBranches[]
    loading: boolean
}

export default function AgenciesTable({ agencies, loading }: AgenciesTableProps) {
    if (loading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="divide-y divide-gray-100">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="p-4 md:grid md:grid-cols-12 gap-4 animate-pulse">
                            <div className="col-span-3 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gray-100"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                                </div>
                            </div>
                            <div className="col-span-3 hidden md:block">
                                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                            </div>
                            <div className="col-span-2 hidden md:block">
                                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                            </div>
                            <div className="col-span-3 hidden md:block">
                                <div className="h-6 bg-gray-100 rounded-full w-24"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (agencies.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 mb-4">
                    <ArrowUpDown className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No se encontraron agencias</h3>
                <p className="mt-1 text-sm text-gray-500">Intenta ajustar tu búsqueda o agrega una nueva agencia.</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col">
            {/* Table Header (Desktop/Tablet) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-4 lg:col-span-3 pl-2">Agencia / Rep</div>
                <div className="col-span-4 lg:col-span-3">Contacto</div>
                <div className="col-span-1 lg:col-span-1 hidden lg:block">País</div>
                <div className="col-span-1 lg:col-span-1 hidden lg:block">Ciudad</div>
                <div className="col-span-1 lg:col-span-1 hidden lg:block">Fecha Reg.</div>
                <div className="col-span-2 lg:col-span-1 text-center">N° Suc.</div>
                <div className="col-span-2 lg:col-span-2">Estado / Temp</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
                {agencies.map((agency) => {
                    // Try to find the "Principal" branch, otherwise take the first one
                    const primaryBranch = agency.branches?.find(b => b.branch_name === 'Principal') || agency.branches?.[0]

                    return (
                        <AgencyRow
                            key={agency.id}
                            agency={agency}
                            primaryBranch={primaryBranch}
                        />
                    )
                })}
            </div>
        </div>
    )
}
