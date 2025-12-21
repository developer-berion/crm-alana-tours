'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import AddAgencyModal from './AddAgencyModal'
import AgenciesTable, { AgencyWithBranches } from '@/components/agencies/AgenciesTable'

// Debounce hook implementation within the file for simplicity
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])
    return debouncedValue
}

export default function AgenciesPage() {
    const [agencies, setAgencies] = useState<AgencyWithBranches[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)
    
    // Pagination State
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const [statusFilter, setStatusFilter] = useState('all') // Note: Backend filtering for this not yet implemented in API, so kept local or needs API update
    const [tempFilter, setTempFilter] = useState('all')
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchAgencies = useCallback(async (pageParam: number, searchParam: string) => {
        setLoading(true)
        try {
            const query = new URLSearchParams({
                page: pageParam.toString(),
                limit: '20', // Reduced limit for better UX
                search: searchParam,
                // TODO: Pass status/temp filters to API when backend supports it
            })
            
            const res = await fetch(`/api/agencies?${query.toString()}`)
            if (res.ok) {
                const { data, pagination } = await res.json()
                // Transform data to match expected structure
                const transformed = data.map((a: any) => ({
                    ...a,
                    branches: a.branches || []
                }))
                setAgencies(transformed)
                setTotalPages(pagination.totalPages)
            }
        } catch (error) {
            console.error('Error fetching agencies:', error)
        }
        setLoading(false)
    }, [])

    // Reset page when search changes
    useEffect(() => {
        setPage(1)
    }, [debouncedSearch])

    // Fetch when page or search changes
    useEffect(() => {
        fetchAgencies(page, debouncedSearch)
    }, [page, debouncedSearch, fetchAgencies])

    // Client-side sorting (still useful for the current page)
    const sortedAgencies = [...agencies].sort((a, b) => {
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
                onSuccess={() => fetchAgencies(page, search)}
            />

            {/* Filters & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white shadow-sm"
                    />
                </div>

                {/* Filter Controls Group */}
                <div className="flex flex-wrap gap-2 md:flex-nowrap">
                    {/* Visual filters only - would need API update to be truly effective server-side */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        disabled
                        className="opacity-50 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 text-sm font-medium cursor-not-allowed"
                        title="Filtrado por estado temporalmente deshabilitado mientras se mueve al servidor"
                    >
                        <option value="all">Estado (Pronto)</option>
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
                agencies={sortedAgencies}
                loading={loading}
            />

            {/* Pagination Controls */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-sm text-gray-600">
                    Página <span className="font-bold text-gray-900">{page}</span> de <span className="font-bold text-gray-900">{totalPages}</span>
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1 || loading}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages || loading}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    )
}
