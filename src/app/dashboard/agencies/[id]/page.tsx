'use client'

import { useEffect, useState, use } from 'react'
import { supabase } from '@/lib/supabase'
import { Agency, Branch } from '@/types/database'
import { Building2, Plus, ArrowLeft, Loader2, MapPin, Phone, Mail, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AgencyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [agency, setAgency] = useState<Agency | null>(null)
    const [branches, setBranches] = useState<Branch[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            const [agencyRes, branchesRes] = await Promise.all([
                supabase.from('agencies').select('*').eq('id', id).single(),
                supabase.from('branches').select('*').eq('agency_id', id).order('branch_name', { ascending: true })
            ])

            setAgency(agencyRes.data)
            setBranches(branchesRes.data || [])
            setLoading(false)
        }
        fetchData()
    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!agency) {
        return (
            <div className="text-center py-12">
                <p className="text-error">Agencia no encontrada.</p>
                <Link href="/dashboard/agencies" className="text-primary hover:underline mt-4 inline-block">
                    Volver a agencias
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium w-fit"
                >
                    <ArrowLeft className="h-4 w-4" /> Volver
                </button>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                            <Building2 className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{agency.name}</h1>
                            <p className="text-gray-600">{branches.length} sucursales registradas</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-sm">
                        <Plus className="h-4 w-4" /> Nueva Sucursal
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <h2 className="text-xl font-bold text-gray-900">Sucursales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {branches.map((branch) => (
                        <div
                            key={branch.id}
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{branch.branch_name}</h3>
                                    <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${branch.relationship_type === 'client' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {branch.relationship_type === 'client' ? 'Cliente' : 'Lead'}
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${branch.lead_temperature === 'hot' ? 'bg-error/10 text-error' :
                                    branch.lead_temperature === 'warm' ? 'bg-warning/10 text-warning' :
                                        'bg-primary/10 text-primary'
                                    }`}>
                                    {branch.lead_temperature}
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span>{branch.city}, {branch.country}</span>
                                </div>
                                {branch.phone && (
                                    <div className="flex items-start gap-2">
                                        <Phone className="h-4 w-4 text-gray-400 mt-1" />
                                        <div className="flex flex-col">
                                            {branch.phone.split(',').map((phone, i) => (
                                                <span key={i} className="block">{phone.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {branch.email && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <span>{branch.email}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                                <span className="text-xs text-gray-400 italic">
                                    Estado: {branch.contact_status.replace('_', ' ')}
                                </span>
                                <Link
                                    href={`/dashboard/branches/${branch.id}`}
                                    className="text-primary font-medium text-sm flex items-center gap-1 hover:underline"
                                >
                                    Gestionar <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                    {branches.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
                            No hay sucursales registradas para esta agencia.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
