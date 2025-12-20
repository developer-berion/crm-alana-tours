'use client'

import { useState } from 'react'
import { X, Building2, User, Globe2, MapPin, Loader2, Check, Plus, Trash2 } from 'lucide-react'
import { countries, statesByCountry, Country } from '@/utils/locationData'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface AddAgencyModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export default function AddAgencyModal({ isOpen, onClose, onSuccess }: AddAgencyModalProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        agencyName: '',
        representative: '',
        country: 'Venezuela' as Country,
        state: '',
        city: '',
        email: ''
    })
    const [phoneList, setPhoneList] = useState<string[]>([])

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // 1. Create Agency
            const agencyRes = await fetch('/api/agencies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: formData.agencyName })
            })

            if (!agencyRes.ok) {
                const err = await agencyRes.json()
                throw new Error(err.error || 'Error creando agencia')
            }

            const { data: agency } = await agencyRes.json()

            // 2. Create Initial Branch
            const branchRes = await fetch('/api/branches', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    agency_id: agency.id,
                    branch_name: 'Principal',
                    contact_name: formData.representative,
                    email: formData.email || null,
                    phone: phoneList.filter(p => p.trim()).join(', ') || null,
                    country: formData.country,
                    state: formData.state,
                    city: formData.city,
                    contact_status: 'not_contacted',
                    lead_temperature: 'cold',
                    relationship_type: 'lead'
                })
            })

            if (!branchRes.ok) {
                const err = await branchRes.json()
                throw new Error(err.error || 'Error creando sucursal')
            }

            onSuccess()
            onClose()
            setFormData({
                agencyName: '',
                representative: '',
                country: 'Venezuela',
                state: '',
                city: '',
                email: ''
            })
            setPhoneList([])
        } catch (error: any) {
            console.error('Error adding agency:', error)
            alert('Error al agregar la agencia: ' + (error.message || 'Error desconocido'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-8 py-6 bg-primary text-white flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                        <Building2 size={120} />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold">Nueva Agencia</h2>
                        <p className="text-primary-foreground/80 text-sm">Registra una nueva agencia de viajes</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors relative z-10"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-primary" />
                                    Nombre de la Agencia *
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Ej. Alana Tours"
                                    value={formData.agencyName}
                                    onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <User className="h-4 w-4 text-primary" />
                                    Representante / Contacto *
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Nombre completo"
                                    value={formData.representative}
                                    onChange={(e) => setFormData({ ...formData, representative: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50/50"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Ubicación (Zona)
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
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50/50 appearance-none"
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
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50/50 appearance-none"
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
                                        placeholder="Valencia"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50/50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Email (Opcional)</label>
                                <input
                                    type="email"
                                    placeholder="contacto@agencia.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-bold text-gray-700">Teléfonos (Opcional)</label>
                                    <button
                                        type="button"
                                        onClick={() => setPhoneList([...phoneList, ''])}
                                        className="text-primary hover:text-primary/80 transition-colors text-sm font-medium flex items-center gap-1"
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
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50/50"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newList = phoneList.filter((_, i) => i !== index);
                                                    setPhoneList(newList);
                                                }}
                                                className="text-gray-400 hover:text-error transition-colors p-2"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {phoneList.length === 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setPhoneList([''])}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-primary/50 hover:text-primary transition-all text-sm font-medium"
                                        >
                                            + Agregar número de teléfono
                                        </button>
                                    )}
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
                            className="flex-[2] bg-primary text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <Check className="h-5 w-5" />
                                    Guardar Agencia
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
