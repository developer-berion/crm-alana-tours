'use client'

import { useEffect, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import AddAgencyModal from './AddAgencyModal'
import AgenciesTable, { AgencyWithBranches } from '@/components/agencies/AgenciesTable'

export default function AgenciesPage() {
    const [agencies, setAgencies] = useState<AgencyWithBranches[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [tempFilter, setTempFilter] = useState('all')
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchAgencies = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/agencies')
            if (res.ok) {
                const { data } = await res.json()
                // Transform data to match expected structure
                const transformed = data.map((a: any) => ({
                    ...a,
                    branches: a.branches || []
                }))
                setAgencies(transformed)
            }
        } catch (error) {
            console.error('Error fetching agencies:', error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAgencies()
    }, [])

    const filteredAgencies = agencies.filter(a => {
        const searchLower = search.toLowerCase()
        const primaryBranch = a.branches?.find(b => b.branch_name === 'Principal') || a.branches?.[0]

        // 1. Status Filter
        if (statusFilter !== 'all') {
            const currentStatus = primaryBranch?.contact_status || 'not_contacted'
            if (currentStatus !== statusFilter) return false
        }

        // 2. Temp Filter
        if (tempFilter !== 'all') {
            const currentTemp = primaryBranch?.lead_temperature || 'cold'
            if (currentTemp !== tempFilter) return false
        }

        // 3. Search (Name OR Branch details)
        if (searchLower) {
            if (a.name.toLowerCase().includes(searchLower)) return true
            if (primaryBranch) {
                if (primaryBranch.contact_name?.toLowerCase().includes(searchLower)) return true
                if (primaryBranch.email?.toLowerCase().includes(searchLower)) return true
                if (primaryBranch.contact_status?.toLowerCase().includes(searchLower)) return true
            }
            return false
        }

        return true
    }).sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime()
        const dateB = new Date(b.created_at || 0).getTime()
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm md:bg-transparent md:border-0 md:shadow-none md:p-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Agencias</h1>
                    <p className="text-gray-600">Gestiona las agencias principales y su estado</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-primary/30 active:scale-95 w-full sm:w-auto justify-center"
                >
                    <Plus className="h-5 w-5" /> Nueva Agencia
                </button>
            </div>

            <AddAgencyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchAgencies}
            />

            {/* Filters & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, representante o estado..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white shadow-sm"
                    />
                </div>

                {/* Filter Controls Group */}
                <div className="flex flex-wrap gap-2 md:flex-nowrap">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white shadow-sm text-gray-600 text-sm font-medium"
                    >
                        <option value="all">Todos los Estados</option>
                        <option value="not_contacted">No Contactado</option>
                        <option value="contacted">Contactado</option>
                        <option value="waiting_response">Esperando Respuesta</option>
                        <option value="rejected">Rechazado</option>
                        <option value="interested">Interesado</option>
                    </select>

                    <select
                        value={tempFilter}
                        onChange={(e) => setTempFilter(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white shadow-sm text-gray-600 text-sm font-medium"
                    >
                        <option value="all">Todas las Temp.</option>
                        <option value="cold">Frío</option>
                        <option value="warm">Tibio</option>
                        <option value="hot">Caliente</option>
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                        className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white shadow-sm text-gray-600 text-sm font-medium"
                    >
                        <option value="desc">Más recientes</option>
                        <option value="asc">Más antiguos</option>
                    </select>
                </div>
            </div>

            {/* Table/List */}
            <AgenciesTable
                agencies={filteredAgencies}
                loading={loading}
            />
        </div>
    )
}
