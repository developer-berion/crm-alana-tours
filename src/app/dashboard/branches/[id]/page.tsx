'use client'

import { useEffect, useState, use } from 'react'
import { supabase } from '@/lib/supabase'
import { Branch, Agency, AgencyNote, ActivityLog } from '@/types/database'
import {
    ArrowLeft, Loader2, MapPin,
    Phone, Mail, Globe, Instagram, Facebook,
    Video, Save, Plus, History,
    MessageSquare, Trash2, Map, Edit2, Archive, X, Check
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { countries, statesByCountry, Country } from '@/utils/locationData'

export default function BranchDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [branch, setBranch] = useState<Branch | null>(null)
    const [agency, setAgency] = useState<Agency | null>(null)
    const [notes, setNotes] = useState<AgencyNote[]>([])
    const [logs, setLogs] = useState<ActivityLog[]>([])
    const [authors, setAuthors] = useState<Record<string, { name: string, email: string }>>({})
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [newNote, setNewNote] = useState('')
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
    const [editingNoteContent, setEditingNoteContent] = useState('')
    const [showArchived, setShowArchived] = useState(false)
    const [phoneList, setPhoneList] = useState<string[]>([])
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
                setPhoneList(branchData.phone ? branchData.phone.split(',').map((p: string) => p.trim()) : [])

                // Fetch authors for notes and logs
                const userIds = new Set<string>()
                notesRes.data?.forEach(n => userIds.add(n.created_by))
                logsRes.data?.forEach(l => userIds.add(l.user_id))

                if (userIds.size > 0) {
                    const { data: profiles } = await supabase.from('profiles').select('id, name, email').in('id', Array.from(userIds))
                    if (profiles) {
                        const authorMap: Record<string, { name: string, email: string }> = {}
                        profiles.forEach(p => authorMap[p.id] = p)
                        setAuthors(authorMap)
                    }
                }
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
        } else {
            console.error(`Error updating field ${field}:`, {
                message: (error as any).message,
                code: (error as any).code,
                details: (error as any).details,
                hint: (error as any).hint
            })
            alert(`Error al guardar: ${(error as any).message || 'Error desconocido'}`)
            // Revert value in local state
            setBranch({ ...branch })
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

                // Add current user to authors if not present
                if (!authors[user.id]) {
                    const { data: profile } = await supabase.from('profiles').select('name, email').eq('id', user.id).single()
                    if (profile) {
                        setAuthors(prev => ({ ...prev, [user.id]: { name: profile.name, email: profile.email } }))
                    }
                }

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

    const handleUpdateNote = async (noteId: string) => {
        if (!editingNoteContent.trim()) return
        setIsSaving(true)

        const { error } = await supabase.from('agency_notes').update({
            content: editingNoteContent,
            updated_at: new Date().toISOString()
        }).eq('id', noteId)

        if (!error) {
            setNotes(notes.map(n => n.id === noteId ? { ...n, content: editingNoteContent, updated_at: new Date().toISOString() } : n))
            setEditingNoteId(null)
            setEditingNoteContent('')
        }
        setIsSaving(false)
    }

    const handleArchiveNote = async (noteId: string, archive: boolean) => {
        setIsSaving(true)
        const { error } = await supabase.from('agency_notes').update({
            archived: archive
        }).eq('id', noteId)

        if (!error) {
            setNotes(notes.map(n => n.id === noteId ? { ...n, archived: archive } : n))
        }
        setIsSaving(false)
    }

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    if (!branch) return <div className="text-center py-12 text-error">Sucursal no encontrada.</div>

    const shortenUrl = (url: string | null) => {
        if (!url) return '';
        try {
            const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
            const domain = parsed.hostname.replace('www.', '');
            return parsed.pathname.length > 1 ? `${domain}...` : domain;
        } catch (e) {
            return url;
        }
    };

    const SocialLink = ({ icon: Icon, url, field, placeholder }: { icon: any, url: string | null, field: keyof Branch, placeholder: string }) => {
        const [localValue, setLocalValue] = useState(url || '');

        useEffect(() => {
            setLocalValue(url || '');
        }, [url]);

        return (
            <div className="flex items-center gap-3 group">
                <Icon className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                <div className="flex-1 flex flex-col min-w-0">
                    <input
                        className="text-sm border-none p-0 focus:ring-0 w-full bg-transparent"
                        value={localValue}
                        placeholder={placeholder}
                        onChange={(e) => setLocalValue(e.target.value)}
                        onBlur={(e) => handleUpdateBranch(field, e.target.value)}
                    />
                    {url && (
                        <a
                            href={url.startsWith('http') ? url : `https://${url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-primary hover:underline truncate w-fit"
                            title={url}
                        >
                            {shortenUrl(url)}
                        </a>
                    )}
                </div>
            </div>
        );
    };

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
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ubicación</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2 pl-6">
                                        <input
                                            className="text-sm border-b border-gray-100 py-1 focus:ring-0 w-full"
                                            placeholder="Ciudad"
                                            value={branch.city || ''}
                                            onChange={(e) => setBranch({ ...branch, city: e.target.value })}
                                            onBlur={(e) => handleUpdateBranch('city', e.target.value)}
                                        />
                                        <select
                                            className="text-sm border-b border-gray-100 py-1 focus:ring-0 w-full bg-transparent"
                                            value={branch.state || ''}
                                            onChange={(e) => {
                                                const newState = e.target.value;
                                                setBranch({ ...branch, state: newState });
                                                handleUpdateBranch('state', newState);
                                            }}
                                        >
                                            <option value="" disabled>Estado/Departamento</option>
                                            {statesByCountry[branch.country as Country]?.map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        <select
                                            className="text-sm border-b border-gray-100 py-1 focus:ring-0 w-full bg-transparent"
                                            value={branch.country || 'Venezuela'}
                                            onChange={(e) => {
                                                const newCountry = e.target.value as Country;
                                                const newState = statesByCountry[newCountry][0] || '';
                                                setBranch({ ...branch, country: newCountry, state: newState });
                                                handleUpdateBranch('country', newCountry);
                                                handleUpdateBranch('state', newState);
                                            }}
                                        >
                                            {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <input
                                            className="text-sm border-b border-gray-100 py-1 focus:ring-0 w-full"
                                            placeholder="Dirección exacta"
                                            value={branch.address || ''}
                                            onChange={(e) => setBranch({ ...branch, address: e.target.value })}
                                            onBlur={(e) => handleUpdateBranch('address', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-gray-400" />
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Teléfonos</span>
                                        </div>
                                        <button
                                            onClick={() => setPhoneList([...phoneList, ''])}
                                            className="text-primary hover:text-primary/80 transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-2 pl-6">
                                        {phoneList.map((phone, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <input
                                                    className="text-sm border-b border-gray-100 py-1 focus:ring-0 flex-1"
                                                    value={phone}
                                                    placeholder="Nº de teléfono"
                                                    onChange={(e) => {
                                                        const newList = [...phoneList];
                                                        newList[index] = e.target.value;
                                                        setPhoneList(newList);
                                                    }}
                                                    onBlur={() => {
                                                        const filtered = phoneList.filter(p => p.trim() !== '');
                                                        handleUpdateBranch('phone', filtered.join(', '));
                                                    }}
                                                />
                                                <button
                                                    onClick={() => {
                                                        const newList = phoneList.filter((_, i) => i !== index);
                                                        setPhoneList(newList);
                                                        handleUpdateBranch('phone', newList.join(', '));
                                                    }}
                                                    className="text-gray-300 hover:text-error transition-colors"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                        {phoneList.length === 0 && (
                                            <p className="text-xs text-gray-400 italic">No hay teléfonos registrados</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                    <input
                                        className="text-sm border-none p-0 focus:ring-0 w-full"
                                        value={branch.email || ''}
                                        placeholder="Email"
                                        onChange={(e) => setBranch({ ...branch, email: e.target.value })}
                                        onBlur={(e) => handleUpdateBranch('email', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <SocialLink
                                    icon={Globe}
                                    url={branch.website_url}
                                    field="website_url"
                                    placeholder="Sitio web"
                                />
                                <SocialLink
                                    icon={Instagram}
                                    url={branch.instagram_url}
                                    field="instagram_url"
                                    placeholder="Instagram"
                                />
                                <SocialLink
                                    icon={Facebook}
                                    url={branch.facebook_url}
                                    field="facebook_url"
                                    placeholder="Facebook"
                                />
                                <SocialLink
                                    icon={Video}
                                    url={branch.tiktok_url}
                                    field="tiktok_url"
                                    placeholder="TikTok"
                                />
                                <SocialLink
                                    icon={Map}
                                    url={branch.google_maps_url}
                                    field="google_maps_url"
                                    placeholder="Google Maps URL"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Notes */}
                    <h2 className="text-lg font-bold text-gray-900 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" /> Notas y Seguimiento
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Ver archivadas</span>
                            <button
                                onClick={() => setShowArchived(!showArchived)}
                                className={`w-8 h-4 rounded-full transition-colors relative ${showArchived ? 'bg-primary' : 'bg-gray-200'}`}
                            >
                                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${showArchived ? 'left-4.5' : 'left-0.5'}`} style={{ left: showArchived ? '18px' : '2px' }} />
                            </button>
                        </div>
                    </h2>
                    <div className="space-y-6">
                        <div className="flex gap-3">
                            <textarea
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Añadir una nota de seguimiento..."
                                className="flex-1 rounded-xl border-gray-200 text-sm focus:ring-primary focus:border-primary resize-none h-20"
                            />
                            <button
                                onClick={handleAddNote}
                                disabled={isSaving || !newNote.trim()}
                                className="bg-primary text-white p-3 rounded-xl disabled:opacity-50 h-fit hover:bg-primary/90 transition-colors"
                            >
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {notes.filter(n => showArchived ? true : !n.archived).length === 0 && (
                                <p className="text-center text-gray-400 text-sm py-4 italic">No hay notas visibles</p>
                            )}
                            {notes.filter(n => showArchived ? true : !n.archived).map((note) => (
                                <div
                                    key={note.id}
                                    className={`group p-4 rounded-xl border relative transition-all ${note.archived
                                        ? 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-100'
                                        : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                                {(authors[note.created_by]?.name || '?').charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-900">
                                                    {authors[note.created_by]?.name || 'Usuario desconocido'}
                                                </span>
                                                <span className="text-[10px] text-gray-400">
                                                    {formatDistanceToNow(new Date(note.created_at), { addSuffix: true, locale: es })}
                                                    {note.updated_at && note.updated_at !== note.created_at && ' (Editado)'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {!note.archived && (
                                                <button
                                                    onClick={() => {
                                                        setEditingNoteId(note.id)
                                                        setEditingNoteContent(note.content)
                                                    }}
                                                    className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit2 className="h-3.5 w-3.5" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleArchiveNote(note.id, !note.archived)}
                                                className={`p-1.5 rounded-lg transition-colors ${note.archived
                                                    ? 'text-primary bg-primary/10 hover:bg-primary/20'
                                                    : 'text-gray-400 hover:text-error hover:bg-error/5'
                                                    }`}
                                                title={note.archived ? "Desarchivar" : "Archivar"}
                                            >
                                                <Archive className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {editingNoteId === note.id ? (
                                        <div className="mt-2 space-y-2">
                                            <textarea
                                                value={editingNoteContent}
                                                onChange={(e) => setEditingNoteContent(e.target.value)}
                                                className="w-full rounded-lg border-gray-200 text-sm focus:ring-primary focus:border-primary resize-y min-h-[80px]"
                                                autoFocus
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => setEditingNoteId(null)}
                                                    className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateNote(note.id)}
                                                    className="px-3 py-1.5 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
                                                >
                                                    Guardar
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap pl-8 relative">
                                            {note.archived && (
                                                <span className="absolute left-8 -top-6 text-[10px] font-bold text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded">ARCHIVADA</span>
                                            )}
                                            {note.content}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
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
