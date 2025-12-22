'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Check, Edit2, Trash } from 'lucide-react'

interface EditPopoverCellProps {
    value: string | null | undefined
    label: string
    onSave: (newValue: string) => Promise<void> | void
    onArchive?: () => Promise<void> | void
    type?: 'text' | 'email' | 'phone' | 'textarea' | 'select'
    options?: { value: string; label: string }[]
    className?: string
    placeholder?: string
    customDisplay?: React.ReactNode
}

export default function EditPopoverCell({
    value,
    label,
    onSave,
    onArchive,
    type = 'text',
    options = [],
    className = '',
    placeholder = 'Empty',
    customDisplay
}: EditPopoverCellProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [showArchiveConfirm, setShowArchiveConfirm] = useState(false)
    const [tempValue, setTempValue] = useState(value || '')
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const triggerRef = useRef<HTMLDivElement>(null)
    const popoverRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTempValue(value || '')
    }, [value])

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect()
            // Position slightly above the cell by default, or below if too close to top
            // Using fixed positioning relative to viewport
            let top = rect.top + window.scrollY - 10 // shifted up slightly
            const left = rect.left + window.scrollX - 10

            // Adjust if too close to bottom (simplified logic for now)
            if (rect.bottom > window.innerHeight - 200) {
                top = rect.top - 100 // Move up more
            }

            setPosition({ top: rect.top, left: rect.left })
            setIsOpen(true)
        }
    }

    const handleSave = async () => {
        if (tempValue !== value) {
            await onSave(tempValue)
        }
        setIsOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSave()
        }
        if (e.key === 'Escape') {
            setIsOpen(false)
            setShowArchiveConfirm(false)
            setTempValue(value || '')
        }
    }

    // Portal Content
    const PopoverContent = () => (
        <div
            className="fixed inset-0 z-[9999] isolate"
            onClick={(e) => {
                if (e.target === e.currentTarget) setIsOpen(false)
            }}
        >
            {/* Backdrop invisible but blocks interaction with other things */}
            <div
                ref={popoverRef}
                style={{
                    top: Math.max(10, position.top - 20), // Slight offset
                    left: Math.max(10, position.left - 10),
                    minWidth: '300px'
                }}
                className="absolute bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-in fade-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <X size={14} />
                    </button>
                </div>

                <div className="space-y-3">
                    {type === 'select' ? (
                        <select
                            autoFocus
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        >
                            {options.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    ) : type === 'textarea' ? (
                        <textarea
                            autoFocus
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && e.ctrlKey) handleSave() }}
                            rows={3}
                            className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                            placeholder={placeholder}
                        />
                    ) : (
                        <input
                            autoFocus
                            type={type}
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            placeholder={placeholder}
                        />
                    )}

                    <div className="flex justify-between items-center pt-2 border-t border-gray-50 mt-2">
                        {onArchive ? (
                            showArchiveConfirm ? (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onArchive();
                                        setShowArchiveConfirm(false);
                                        setIsOpen(false);
                                    }}
                                    className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors animate-in fade-in slide-in-from-left-2"
                                >
                                    ¿Seguro?
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowArchiveConfirm(true)}
                                    className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors flex items-center gap-1.5"
                                >
                                    <Trash size={12} /> Archivar
                                </button>
                            )
                        ) : (
                            <div></div>
                        )}

                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#006AB3] hover:bg-[#005a99] rounded-lg transition-all shadow-sm active:scale-95"
                            >
                                <Check size={14} />
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div
                ref={triggerRef}
                onClick={handleOpen}
                className={`group relative cursor-pointer min-h-[24px] flex items-center ${className} hover:bg-gray-50 -m-1 p-1 rounded transition-colors`}
                title="Click para editar"
            >
                {/* Display Value */}
                {customDisplay ? (
                    customDisplay
                ) : value ? (
                    <span className="truncate block">{value}</span>
                ) : (
                    <span className="text-gray-400 italic text-xs">{placeholder}</span>
                )}

                {/* Hover Icon */}
                <span className="ml-2 opacity-0 group-hover:opacity-100 text-gray-300 transition-opacity">
                    <Edit2 size={12} />
                </span>
            </div>

            {isOpen && createPortal(<PopoverContent />, document.body)}
        </>
    )
}
