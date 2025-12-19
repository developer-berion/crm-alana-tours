'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Search } from 'lucide-react'
import AddAgencyModal from './AddAgencyModal'
import AgenciesTable, { AgencyWithBranches } from '@/components/agencies/AgenciesTable'
import { Agency } from '@/types/database'

export default function AgenciesPage() {
    const [agencies, setAgencies] = useState<AgencyWithBranches[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [tempFilter, setTempFilter] = useState('all')
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Placeholder for edit functionality if we want to reuse the modal or just navigate
    // For now, onEdit will just open the detail page or we could open a modal if the modal supported editing.
    // The requirement says "Edit button goes to edit screen/modal (use existing pattern)".
    // The existing pattern seems to be just the AddAgencyModal. 
    // Since there is no "EditAgencyModal" evident yet, and scope says "only refactor list page",
    // I will assume for now we might leave it as a placeholder or navigate to detail.
    // However, the requirement says "Edit button".
    // I'll leave the onEdit as a stub that maybe logs or alerts for now, OR better, connects to a hypothetical edit flow.
    // Re-reading: "Actions: 'Editar' button... Edit button goes to edit screen/modal (use existing pattern)."
    // Since I don't see an explicit Edit screen in the file list, I'll direct it to the Detail page which has "Gestionar" or similar, 
    // OR I will simply log it for now if I can't find an edit route.
    // Actually, usually in these CRMs, the detail page IS the edit place or has the edit button.
    // But the requirements explicitly asked for an Edit button in the row.
    // I will making the Edit button open the AddAgencyModal in "Edit Mode" if possible, but the modal doesn't seem to support it yet.
    // To be safe and strictly follow "Do not new features", I will make the Edit button navigate to the detail page for now, 
    // or if I can, I'll quickly check if `AddAgencyModal` has edit props.
    // Checking `AddAgencyModal` content from step 22... it does NOT have initialData prop.
    // So I cannot easily use it for editing without refactoring it.
    // I will make the Edit button navigate to the agency detail page as a fallback, 
    // or maybe the user meant the "Branch" edit?
    // Let's just make it navigate to the detail page for now `dashboard/agencies/[id]`.

    // WAIT, actually I can just pass the ID to the route if there's an edit page.
    // But there isn't one visible.
    // I'll make it go to `/dashboard/agencies/[id]` which is the detail page.

    const fetchAgencies = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('agencies')
            .select('*, branches(*)')
            // Initial fetch order, though we will sort fully on client side
            .order('name', { ascending: true })

        if (error) {
            console.error('Error fetching agencies:', error)
        } else {
            setAgencies(data as AgencyWithBranches[] || [])
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
            // Check Agency Name
            if (a.name.toLowerCase().includes(searchLower)) return true

            // Check Branch Details
            if (primaryBranch) {
                if (primaryBranch.contact_name?.toLowerCase().includes(searchLower)) return true
                if (primaryBranch.email?.toLowerCase().includes(searchLower)) return true
                if (primaryBranch.contact_status?.toLowerCase().includes(searchLower)) return true
            }
            return false // If search is active and no match found
        }

        return true
    }).sort((a, b) => {
        // 4. Sorting by Date
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
                    {/* Status Filter */}
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

                    {/* Temp Filter */}
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

                    {/* Date Sort */}
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

