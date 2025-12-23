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
    autosave?: boolean
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
    customDisplay,
    autosave = false
}: EditPopoverCellProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [showArchiveConfirm, setShowArchiveConfirm] = useState(false)
    const [tempValue, setTempValue] = useState(value || '')
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const triggerRef = useRef<HTMLDivElement>(null)
    const popoverRef = useRef<HTMLDivElement>(null)

    // Autosave timer ref
    const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null)

    // CRITICAL FIX: Only sync from parent when the popover is CLOSED.
    useEffect(() => {
        if (!isOpen) {
            setTempValue(value || '')
        }
    }, [value, isOpen])

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current)
        }
    }, [])

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect()
            let top = rect.top

            if (rect.bottom > window.innerHeight - 200) {
                top = rect.top - 100
            }

            setPosition({ top, left: rect.left })
            setTempValue(value || '')
            setIsOpen(true)
        }
    }

    const performSave = async (val: string) => {
        if (val !== value) {
            await onSave(val)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const newValue = e.target.value
        setTempValue(newValue)

        if (autosave) {
            if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current)
            autosaveTimerRef.current = setTimeout(() => {
                performSave(newValue)
            }, 500)
        }
    }

    const handleManualSave = async () => {
        if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current)
        await performSave(tempValue)
        setIsOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && type !== 'textarea') {
            e.preventDefault()
            handleManualSave()
        }
        if (e.key === 'Enter' && e.ctrlKey && type === 'textarea') {
            e.preventDefault()
            handleManualSave()
        }
        if (e.key === 'Escape') {
            setIsOpen(false)
            setShowArchiveConfirm(false)
            setTempValue(value || '')
        }
    }

    const handleClose = () => {
        setIsOpen(false)
        setShowArchiveConfirm(false)
    }

    // Render the popover content INLINE (not as a separate component)
    // This prevents React from remounting the textarea on each state change
    const portalContent = isOpen ? (
        <div
            className="fixed inset-0 z-[9999] isolate"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    handleClose()
                }
            }}
        >
            <div
                ref={popoverRef}
                style={{
                    top: Math.max(10, position.top - 20),
                    left: Math.max(10, position.left - 10),
                    minWidth: '300px'
                }}
                className="absolute bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-in fade-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                        <X size={14} />
                    </button>
                </div>

                <div className="space-y-3">
                    {type === 'select' ? (
                        <select
                            autoFocus
                            value={tempValue}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-sans"
                        >
                            {options.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    ) : type === 'textarea' ? (
                        <textarea
                            autoFocus
                            value={tempValue}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            rows={3}
                            className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none font-sans"
                            placeholder={placeholder}
                        />
                    ) : (
                        <input
                            autoFocus
                            type={type}
                            value={tempValue}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-sans"
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
                            <div className="text-[10px] text-gray-300 italic">
                                {autosave ? 'Autosave activo' : ''}
                            </div>
                        )}

                        <div className="flex gap-2">
                            <button
                                onClick={handleClose}
                                className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleManualSave}
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
    ) : null

    return (
        <>
            <div
                ref={triggerRef}
                onClick={handleOpen}
                className={`group relative cursor-pointer min-h-[24px] flex items-center ${className} hover:bg-gray-50 -m-1 p-1 rounded transition-colors`}
                title="Click para editar"
            >
                {customDisplay ? (
                    customDisplay
                ) : value ? (
                    <span className="truncate block font-sans">{value}</span>
                ) : (
                    <span className="text-gray-400 italic text-xs font-sans">{placeholder}</span>
                )}

                <span className="ml-2 opacity-0 group-hover:opacity-100 text-gray-300 transition-opacity">
                    <Edit2 size={12} />
                </span>
            </div>

            {portalContent && createPortal(portalContent, document.body)}
        </>
    )
}
