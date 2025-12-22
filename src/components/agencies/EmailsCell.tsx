'use client'

import { useState, useRef, useEffect } from 'react'
import { Mail, Plus, Trash2, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { Tooltip } from 'react-tooltip'
import { createRoot } from 'react-dom/client'

interface EmailsCellProps {
    initialValue?: string | null
    onSave: (newValue: string) => void
}

export default function EmailsCell({ initialValue, onSave }: EmailsCellProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const [emails, setEmails] = useState<string[]>([])
    const containerRef = useRef<HTMLDivElement>(null)
    const [tooltipId] = useState(() => Math.random().toString(36).substr(2, 9))

    // Parse initial value on mount or change
    useEffect(() => {
        if (initialValue) {
            setEmails(initialValue.split(',').map(e => e.trim()).filter(Boolean))
        } else {
            setEmails([])
        }
    }, [initialValue])

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation()

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            setPosition({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX
            })
            setIsOpen(true)
        }
    }

    const handleSave = () => {
        const filtered = emails.filter(e => e.trim() !== '')
        onSave(filtered.join(', '))
        setIsOpen(false)
        setEmails(filtered) // Sync state
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave()
        }
    }

    const handleChange = (index: number, value: string) => {
        const newEmails = [...emails]
        newEmails[index] = value
        setEmails(newEmails)
    }

    const handleAdd = () => {
        setEmails([...emails, ''])
    }

    const handleRemove = (index: number) => {
        const newEmails = emails.filter((_, i) => i !== index)
        setEmails(newEmails)
    }

    const PopoverContent = () => (
        <div
            className="fixed inset-0 z-[9999] isolate"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="absolute bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-in fade-in zoom-in-95 duration-200 w-80"
                style={{
                    top: Math.max(10, position.top - 100),
                    left: Math.max(10, position.left - 150)
                }}
                onClick={e => e.stopPropagation()}
            >
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-2 mb-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Correos Registrados</span>
                        <button
                            onClick={handleAdd}
                            className="text-primary hover:bg-blue-50 p-1 rounded transition-colors"
                            title="Agregar correo"
                        >
                            <Plus size={14} />
                        </button>
                    </div>

                    <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                        {emails.map((email, index) => (
                            <div key={index} className="flex items-center gap-2 group">
                                <div className="relative flex-1">
                                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                        <Mail size={14} />
                                    </div>
                                    <input
                                        className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-300"
                                        value={email}
                                        onChange={e => handleChange(index, e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="email@ejemplo.com"
                                        autoFocus={index === emails.length - 1 && email === ''}
                                    />
                                </div>
                                <button
                                    onClick={() => handleRemove(index)}
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Eliminar"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                        {emails.length === 0 && (
                            <p className="text-xs text-gray-400 italic text-center py-2">No hay correos registrados</p>
                        )}
                    </div>

                    <div className="pt-2 flex justify-end gap-2 border-t border-gray-50">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-[#006AB3] text-white text-xs font-medium px-4 py-1.5 rounded-lg hover:bg-[#005a99] transition-all shadow-sm shadow-primary/20 active:scale-95"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    // Render Logic for Closed State
    const hasMultiple = emails.length > 1
    const firstEmail = emails[0]

    return (
        <>
            <div
                ref={containerRef}
                onClick={handleOpen}
                className="relative group/mail h-full flex items-center min-w-[120px] cursor-pointer hover:bg-gray-50 -m-1 p-1 rounded transition-colors"
            >
                {emails.length > 0 ? (
                    hasMultiple ? (
                        <div className="flex items-center gap-1.5 max-w-full w-full">
                            <span className="truncate text-blue-600 block flex-1 text-sm">{firstEmail}</span>
                            <div className="flex items-center justify-center bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-blue-100 shrink-0">
                                +{emails.length - 1}
                            </div>
                        </div>
                    ) : (
                        <span className="truncate text-blue-600 text-sm">{firstEmail}</span>
                    )
                ) : (
                    <span className="text-xs text-gray-400 italic">-</span>
                )}
            </div>

            {isOpen && createPortal(<PopoverContent />, document.body)}
        </>
    )
}
