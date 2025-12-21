'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import AddAgencyModal from './AddAgencyModal'
import AgenciesTable from '@/components/agencies/AgenciesTable'
import { FlatAgencyBranchRow } from '@/types/database'

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
    const [agencies, setAgencies] = useState<FlatAgencyBranchRow[]>([]) // Updated to flat type
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)

    // Pagination State
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchAgencies = useCallback(async (pageParam: number, searchParam: string) => {
        setLoading(true)
        try {
            const query = new URLSearchParams({
                page: pageParam.toString(),
                limit: '50', // Increased limit for Data Grid view
                search: searchParam,
            })

            const res = await fetch(`/api/agencies?${query.toString()}`)
            if (res.ok) {
                const { data, pagination } = await res.json()
                // Data is already flat from the API now
                setAgencies(data)
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

    return (
        <div className="h-full flex flex-col p-4 md:p-6 overflow-hidden gap-4">
            {/* Header Area - Fixed Height */}
            <div className="shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Agencias</h1>
                    <p className="text-sm text-gray-500">Gestiona las agencias principales y su estado</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#006AB3] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#005a99] transition-all shadow-md active:scale-95 w-full sm:w-auto justify-center"
                >
                    <Plus className="h-4 w-4" /> Nueva Agencia
                </button>
            </div>

            <AddAgencyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => fetchAgencies(page, search)}
            />

            {/* Table Area - Flex 1 to fill space */}
            <div className="flex-1 min-h-0 relative">
                <AgenciesTable
                    agencies={agencies}
                    loading={loading}
                    className="h-full"
                />
            </div>

            {/* Pagination Controls - Fixed Height */}
            <div className="shrink-0 flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm z-10">
                <span className="text-xs text-gray-500">
                    Página <span className="font-bold text-gray-900">{page}</span> de <span className="font-bold text-gray-900">{totalPages}</span>
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1 || loading}
                        className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages || loading}
                        className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="h-4 w-4 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    )
}
