'use client'

import { useState } from 'react'
import { X, Building2, User, Globe2, MapPin, Loader2, Check, Plus, Trash2, Mail } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { countries, statesByCountry, Country } from '@/utils/locationData'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ContactStatus, LeadTemperature, RelationshipType } from '@/types/database'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface AddBranchModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    agencyId: string
    agencyName: string
}

export default function AddBranchModal({ isOpen, onClose, onSuccess, agencyId, agencyName }: AddBranchModalProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        branchName: '',
        contactName: '',
        country: 'Venezuela' as Country,
        state: '',
        city: '',
        email: '',
        contactStatus: 'not_contacted' as ContactStatus,
        leadTemperature: 'cold' as LeadTemperature,
        relationshipType: 'lead' as RelationshipType
    })
    const [phoneList, setPhoneList] = useState<string[]>([])

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('No estás autenticado')

            const { data: branch, error: branchError } = await supabase
                .from('branches')
                .insert({
                    agency_id: agencyId,
                    branch_name: formData.branchName,
                    contact_name: formData.contactName,
                    email: formData.email || null,
                    phone: phoneList.filter(p => p.trim()).join(', ') || null,
                    country: formData.country,
                    state: formData.state,
                    city: formData.city,
                    contact_status: formData.contactStatus,
                    lead_temperature: formData.leadTemperature,
                    relationship_type: formData.relationshipType
                })
                .select()
                .single()

            if (branchError) throw branchError

            // Log Activity
            await supabase.from('agency_activity_log').insert({
                branch_id: branch.id,
                user_id: user.id,
                action_type: 'create',
                new_value: `Sucursal creada: ${formData.branchName} para agencia ${agencyName}`
            })

            onSuccess()
            onClose()
            // Reset form
            setFormData({
                branchName: '',
                contactName: '',
                country: 'Venezuela',
                state: '',
                city: '',
                email: '',
                contactStatus: 'not_contacted',
                leadTemperature: 'cold',
                relationshipType: 'lead'
            })
            setPhoneList([])
        } catch (error: any) {
            console.error('Error adding branch:', error)
            alert('Error al agregar la sucursal: ' + (error.message || 'Error desconocido'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-8 py-6 bg-accent text-white flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                        <Building2 size={120} />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold">Nueva Sucursal</h2>
                        <p className="text-white/80 text-sm">Añadir una sucursal para <span className="font-bold">{agencyName}</span></p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors relative z-10"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-accent" />
                                    Nombre de la Sucursal *
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Ej. Sucursal Este"
                                    value={formData.branchName}
                                    onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-gray-50/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <User className="h-4 w-4 text-accent" />
                                    Representante / Contacto *
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Nombre completo"
                                    value={formData.contactName}
                                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-gray-50/50"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Ubicación
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500">País *</label>
                                    <select
                                        required
                                        value={formData.country}
                                        onChange={(e) => {
                                            const newCountry = e.target.value as Country;
                                            setFormData({ ...formData, country: newCountry, state: statesByCountry[newCountry][0] || '' })
                                        }}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-gray-50/50 appearance-none"
                                    >
                                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500">Estado *</label>
                                    <select
                                        required
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-gray-50/50 appearance-none"
                                    >
                                        <option value="" disabled>Seleccione un estado</option>
                                        {statesByCountry[formData.country].map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500">Ciudad *</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Ciudad"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-gray-50/50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-accent" />
                                    Email (Opcional)
                                </label>
                                <input
                                    type="email"
                                    placeholder="contacto@sucursal.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-gray-50/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-bold text-gray-700">Teléfonos (Opcional)</label>
                                    <button
                                        type="button"
                                        onClick={() => setPhoneList([...phoneList, ''])}
                                        className="text-accent hover:text-accent/80 transition-colors text-sm font-medium flex items-center gap-1"
                                    >
                                        <Plus className="h-4 w-4" /> Agregar
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {phoneList.map((phone, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="tel"
                                                placeholder="+58 412..."
                                                value={phone}
                                                onChange={(e) => {
                                                    const newList = [...phoneList];
                                                    newList[index] = e.target.value;
                                                    setPhoneList(newList);
                                                }}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-gray-50/50"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newList = phoneList.filter((_, i) => i !== index);
                                                    setPhoneList(newList);
                                                }}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {phoneList.length === 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setPhoneList([''])}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-accent/50 hover:text-accent transition-all text-sm font-medium"
                                        >
                                            + Agregar número de teléfono
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                                Clasificación
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500">Tipo *</label>
                                    <select
                                        required
                                        value={formData.relationshipType}
                                        onChange={(e) => setFormData({ ...formData, relationshipType: e.target.value as RelationshipType })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-gray-50/50"
                                    >
                                        <option value="lead">Lead</option>
                                        <option value="client">Cliente</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500">Temperatura *</label>
                                    <select
                                        required
                                        value={formData.leadTemperature}
                                        onChange={(e) => setFormData({ ...formData, leadTemperature: e.target.value as LeadTemperature })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-gray-50/50"
                                    >
                                        <option value="cold">Cold</option>
                                        <option value="warm">Warm</option>
                                        <option value="hot">Hot</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500">Estado de Contacto *</label>
                                    <select
                                        required
                                        value={formData.contactStatus}
                                        onChange={(e) => setFormData({ ...formData, contactStatus: e.target.value as ContactStatus })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-gray-50/50"
                                    >
                                        <option value="not_contacted">No contactado</option>
                                        <option value="contacted">Contactado</option>
                                        <option value="waiting_response">Esperando respuesta</option>
                                        <option value="interested">Interesado</option>
                                        <option value="rejected">Rechazado</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all border border-transparent"
                        >
                            Cancelar
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="flex-[2] bg-accent text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-accent/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <Check className="h-5 w-5" />
                                    Guardar Sucursal
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
