'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Agency } from '@/types/database'
import { Building2, Search, Plus, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function AgenciesPage() {
    const [agencies, setAgencies] = useState<Agency[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        async function fetchAgencies() {
            const { data } = await supabase
                .from('agencies')
                .select('*')
                .order('name', { ascending: true })
            setAgencies(data || [])
            setLoading(false)
        }
        fetchAgencies()
    }, [])

    const filteredAgencies = agencies.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Agencias</h1>
                    <p className="text-gray-600">Gestiona las agencias principales</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-sm">
                    <Plus className="h-4 w-4" /> Nueva Agencia
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar agencia..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAgencies.map((agency) => (
                        <Link
                            key={agency.id}
                            href={`/dashboard/agencies/${agency.id}`}
                            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <Building2 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{agency.name}</h3>
                                        <p className="text-sm text-gray-500">Haz clic para ver sucursales</p>
                                    </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-primary transition-colors translate-x-0 group-hover:translate-x-1 duration-300" />
                            </div>
                        </Link>
                    ))}
                    {filteredAgencies.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                            No se encontraron agencias.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
