'use client'

import { useState, useRef, useEffect } from 'react'
import { Instagram, Globe, Video, ExternalLink, Facebook } from 'lucide-react'
import { createPortal } from 'react-dom'

interface SocialsCellProps {
    instagram?: string | null
    tiktok?: string | null
    website?: string | null
    facebook?: string | null
    onSave: (updates: { instagram_url?: string; tiktok_url?: string; website_url?: string; facebook_url?: string }) => void
}

export default function SocialsCell({ instagram, tiktok, website, facebook, onSave }: SocialsCellProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const [tempData, setTempData] = useState({
        instagram: instagram || '',
        tiktok: tiktok || '',
        website: website || '',
        facebook: facebook || ''
    })
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTempData({
            instagram: instagram || '',
            tiktok: tiktok || '',
            website: website || '',
            facebook: facebook || ''
        })
    }, [instagram, tiktok, website, facebook])

    const handleOpen = (e: React.MouseEvent) => {
        // e.stopPropagation() // REMOVED: Allow bubbling if needed, but here we handle it. 
        // Actually, if we stop propagation, the row click logic in parent (if any) won't trigger. 
        // But clicking on a cell usually implies editing or interacting with cell, not row Nav.
        // I'll keep stopPropagation for now to prevent row navigation if any.
        e.stopPropagation()

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            // Calculation similar to EditPopoverCell
            setPosition({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX
            })
            setIsOpen(true)
        }
    }

    const handleSave = () => {
        onSave({
            instagram_url: tempData.instagram,
            tiktok_url: tempData.tiktok,
            website_url: tempData.website,
            facebook_url: tempData.facebook
        })
        setIsOpen(false)
    }

    const handleIconClick = (e: React.MouseEvent, url: string | null | undefined) => {
        // If user explicitly clicks icon, we might want to let them visit? 
        // Prompt says: "Al hacer click en cualquier parte... DEBE abrirse el Popover".
        // So I will override standard link behavior to open Popover.
        // Inside popover I can add "Visit" buttons if needed, or user can copy paste.
        // Actually, keeping the "Visit" functionality might be useful but "Click anywhere" requirement is strong.
        // I will make it so ANY click opens modal.
        handleOpen(e)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave()
        }
    }

    const PopoverContent = () => (
        <div
            className="fixed inset-0 z-[9999] isolate"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="absolute bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-in fade-in zoom-in-95 duration-200 w-72"
                style={{
                    top: Math.max(10, position.top - 100), // Position above or near
                    left: Math.max(10, position.left - 150)
                }}
                onClick={e => e.stopPropagation()}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex justify-between">
                            Facebook
                            {tempData.facebook && <a href={tempData.facebook} target="_blank" className="text-blue-500 hover:underline cursor-pointer">Visitar</a>}
                        </label>
                        <div className="relative group">
                            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-700 transition-colors">
                                <Facebook size={14} />
                            </div>
                            <input
                                className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:border-blue-700 focus:ring-1 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-300"
                                value={tempData.facebook}
                                onChange={e => setTempData({ ...tempData, facebook: e.target.value })}
                                onKeyDown={handleKeyDown}
                                placeholder="facebook.com/..."
                                autoFocus
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex justify-between">
                            Instagram
                            {tempData.instagram && <a href={`https://instagram.com/${tempData.instagram.replace('@', '')}`} target="_blank" className="text-blue-500 hover:underline cursor-pointer">Visitar</a>}
                        </label>
                        <div className="relative group">
                            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                                <Instagram size={14} />
                            </div>
                            <input
                                className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-200 outline-none transition-all placeholder:text-gray-300"
                                value={tempData.instagram}
                                onChange={e => setTempData({ ...tempData, instagram: e.target.value })}
                                onKeyDown={handleKeyDown}
                                placeholder="@usuario"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex justify-between">
                            TikTok
                            {tempData.tiktok && <a href={`https://tiktok.com/@${tempData.tiktok.replace('@', '')}`} target="_blank" className="text-blue-500 hover:underline cursor-pointer">Visitar</a>}
                        </label>
                        <div className="relative group">
                            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
                                <Video size={14} />
                            </div>
                            <input
                                className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-200 outline-none transition-all placeholder:text-gray-300"
                                value={tempData.tiktok}
                                onChange={e => setTempData({ ...tempData, tiktok: e.target.value })}
                                onKeyDown={handleKeyDown}
                                placeholder="@usuario"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex justify-between">
                            Website
                            {tempData.website && <a href={tempData.website} target="_blank" className="text-blue-500 hover:underline cursor-pointer">Visitar</a>}
                        </label>
                        <div className="relative group">
                            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                <Globe size={14} />
                            </div>
                            <input
                                className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-300"
                                value={tempData.website}
                                onChange={e => setTempData({ ...tempData, website: e.target.value })}
                                onKeyDown={handleKeyDown}
                                placeholder="https://..."
                            />
                        </div>
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

    return (
        <>
            <div
                ref={containerRef}
                onClick={handleOpen}
                className="relative group/socials h-full flex items-center min-w-[120px] cursor-pointer hover:bg-gray-50 -m-1 p-1 rounded transition-colors"
                title="Click para editar redes"
            >
                <div className="flex gap-1.5 items-center pointer-events-none"> {/* Pointer events none to let parent div handle click */}
                    {/* Render Icons just for display */}
                    <div className={`p-1 rounded ${facebook ? 'text-blue-700' : 'text-gray-300'}`}>
                        <Facebook size={16} />
                    </div>
                    <div className={`p-1 rounded ${instagram ? 'text-pink-600' : 'text-gray-300'}`}>
                        <Instagram size={16} />
                    </div>
                    <div className={`p-1 rounded ${tiktok ? 'text-black' : 'text-gray-300'}`}>
                        <Video size={16} />
                    </div>
                    <div className={`p-1 rounded ${website ? 'text-blue-600' : 'text-gray-300'}`}>
                        <Globe size={16} />
                    </div>
                </div>
            </div>

            {isOpen && createPortal(<PopoverContent />, document.body)}
        </>
    )
}
