'use client'

import { useEffect, useState, use } from 'react'
import { supabase } from '@/lib/supabase'
import { Branch, Agency, AgencyNote, ActivityLog } from '@/types/database'
import {
    ArrowLeft, Loader2, MapPin,
    Phone, Mail, Globe, Instagram,
    Video, Save, Plus, History,
    MessageSquare
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export default function BranchDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [branch, setBranch] = useState<Branch | null>(null)
    const [agency, setAgency] = useState<Agency | null>(null)
    const [notes, setNotes] = useState<AgencyNote[]>([])
    const [logs, setLogs] = useState<ActivityLog[]>([])
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [newNote, setNewNote] = useState('')
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            const { data: branchData } = await supabase.from('branches').select('*').eq('id', id).single()
            if (branchData) {
                setBranch(branchData)
                const [agencyRes, notesRes, logsRes] = await Promise.all([
                    supabase.from('agencies').select('*').eq('id', branchData.agency_id).single(),
                    supabase.from('agency_notes').select('*').eq('branch_id', id).order('created_at', { ascending: false }),
                    supabase.from('agency_activity_log').select('*').eq('branch_id', id).order('created_at', { ascending: false }).limit(5)
                ])
                setAgency(agencyRes.data)
                setNotes(notesRes.data || [])
                setLogs(logsRes.data || [])
            }
            setLoading(false)
        }
        fetchData()
    }, [id])

    const handleUpdateBranch = async (field: keyof Branch, value: any) => {
        if (!branch) return
        setIsSaving(true)

        const oldValue = branch[field]
        const { error } = await supabase.from('branches').update({ [field]: value }).eq('id', id)

        if (!error) {
            setBranch({ ...branch, [field]: value })

            // Log activity
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                await supabase.from('agency_activity_log').insert({
                    branch_id: id,
                    user_id: user.id,
                    action_type: 'update',
                    field_name: field,
                    old_value: String(oldValue),
                    new_value: String(value)
                })

                // Refresh logs
                const { data: newLogs } = await supabase.from('agency_activity_log')
                    .select('*').eq('branch_id', id).order('created_at', { ascending: false }).limit(5)
                setLogs(newLogs || [])
            }
        }
        setIsSaving(false)
    }

    const handleAddNote = async () => {
        if (!newNote.trim() || !branch) return
        setIsSaving(true)

        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const { data: noteData, error } = await supabase.from('agency_notes').insert({
                branch_id: id,
                content: newNote,
                created_by: user.id
            }).select().single()

            if (!error && noteData) {
                setNotes([noteData, ...notes])
                setNewNote('')

                // Log activity
                await supabase.from('agency_activity_log').insert({
                    branch_id: id,
                    user_id: user.id,
                    action_type: 'add_note',
                    new_value: 'Nota añadida'
                })

                // Refresh logs
                const { data: newLogs } = await supabase.from('agency_activity_log')
                    .select('*').eq('branch_id', id).order('created_at', { ascending: false }).limit(5)
                setLogs(newLogs || [])
            }
        }
        setIsSaving(false)
    }

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    if (!branch) return <div className="text-center py-12 text-error">Sucursal no encontrada.</div>

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium w-fit">
                    <ArrowLeft className="h-4 w-4" /> Volver
                </button>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{branch.branch_name}</h1>
                        <p className="text-gray-600">Agencia: <span className="font-semibold">{agency?.name}</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                        {isSaving && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                        <span className="text-sm text-gray-400">Cambios se guardan automáticamente</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Info & Management */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Commercial Management */}
                    <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <History className="h-5 w-5 text-accent" /> Gestión Comercial
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Relación</label>
                                <select
                                    value={branch.relationship_type}
                                    onChange={(e) => handleUpdateBranch('relationship_type', e.target.value)}
                                    className="w-full rounded-lg border-gray-200 text-sm focus:ring-primary focus:border-primary"
                                >
                                    <option value="lead">Lead</option>
                                    <option value="client">Cliente</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Temperatura</label>
                                <select
                                    value={branch.lead_temperature}
                                    onChange={(e) => handleUpdateBranch('lead_temperature', e.target.value)}
                                    className="w-full rounded-lg border-gray-200 text-sm focus:ring-primary focus:border-primary"
                                >
                                    <option value="cold">Frío</option>
                                    <option value="warm">Tibio</option>
                                    <option value="hot">Caliente</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Estado de Contacto</label>
                                <select
                                    value={branch.contact_status}
                                    onChange={(e) => handleUpdateBranch('contact_status', e.target.value)}
                                    className="w-full rounded-lg border-gray-200 text-sm focus:ring-primary focus:border-primary"
                                >
                                    <option value="not_contacted">No contactado</option>
                                    <option value="contacted">Contactado</option>
                                    <option value="waiting_response">Esperando respuesta</option>
                                    <option value="interested">Interesado</option>
                                    <option value="rejected">Rechazado</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Contact & Location */}
                    <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-900">Información de Contacto</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                    <input
                                        className="text-sm border-none p-0 focus:ring-0 w-full"
                                        defaultValue={`${branch.city}, ${branch.state}, ${branch.country}`}
                                        onBlur={(e) => {
                                            const [city, state, country] = e.target.value.split(',').map(s => s.trim())
                                            if (city !== branch.city) handleUpdateBranch('city', city)
                                            // This is a bit complex for a single input, usually split fields.
                                        }}
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                    <input
                                        disabled={isSaving}
                                        className="text-sm border-none p-0 focus:ring-0 w-full"
                                        defaultValue={branch.phone || 'Sin teléfono'}
                                        onBlur={(e) => handleUpdateBranch('phone', e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                    <input
                                        className="text-sm border-none p-0 focus:ring-0 w-full"
                                        defaultValue={branch.email || 'Sin email'}
                                        onBlur={(e) => handleUpdateBranch('email', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Globe className="h-5 w-5 text-gray-400" />
                                    <input className="text-sm border-none p-0 focus:ring-0 w-full" defaultValue={branch.website_url || 'Sitio web'} onBlur={(e) => handleUpdateBranch('website_url', e.target.value)} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Instagram className="h-5 w-5 text-gray-400" />
                                    <input className="text-sm border-none p-0 focus:ring-0 w-full" defaultValue={branch.instagram_url || 'Instagram'} onBlur={(e) => handleUpdateBranch('instagram_url', e.target.value)} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Video className="h-5 w-5 text-gray-400" />
                                    <input className="text-sm border-none p-0 focus:ring-0 w-full" defaultValue={branch.tiktok_url || 'TikTok'} onBlur={(e) => handleUpdateBranch('tiktok_url', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Notes */}
                    <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" /> Notas y Seguimiento
                        </h2>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <textarea
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Añadir una nota de seguimiento..."
                                    className="flex-1 rounded-xl border-gray-200 text-sm focus:ring-primary focus:border-primary resize-none h-20"
                                />
                                <button
                                    onClick={handleAddNote}
                                    disabled={isSaving || !newNote.trim()}
                                    className="bg-primary text-white p-3 rounded-xl disabled:opacity-50 h-fit"
                                >
                                    <Plus className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {notes.map((note) => (
                                    <div key={note.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100 italic text-sm text-gray-700">
                                        <p className="mb-2">{note.content}</p>
                                        <p className="text-[10px] text-gray-400 not-italic uppercase tracking-widest font-bold">
                                            {formatDistanceToNow(new Date(note.created_at), { addSuffix: true, locale: es })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Audit Log */}
                <div className="space-y-8">
                    <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <History className="h-5 w-5 text-gray-400" /> Últimas Acciones
                        </h2>
                        <div className="space-y-6">
                            {logs.map((log) => (
                                <div key={log.id} className="flex gap-3 relative pb-6 last:pb-0">
                                    <div className="absolute left-[9px] top-6 bottom-0 w-px bg-gray-100 last:hidden" />
                                    <div className="h-5 w-5 rounded-full bg-primary/10 border-2 border-white flex-shrink-0 z-10" />
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-gray-900 uppercase tracking-tighter">
                                            {log.action_type === 'update' ? `Cambio en ${log.field_name}` :
                                                log.action_type === 'add_note' ? 'Nota registrada' : 'Acción del sistema'}
                                        </p>
                                        {log.action_type === 'update' && (
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                                {log.old_value || 'N/A'} → {log.new_value}
                                            </p>
                                        )}
                                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-medium">
                                            {formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: es })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {logs.length === 0 && (
                                <p className="text-center py-6 text-sm text-gray-400 italic">No hay registros aún.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
