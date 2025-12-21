'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
    LayoutDashboard,
    Building2,
    Upload,
    LogOut,
    User as UserIcon,
    Menu,
    X,
    PanelLeftClose,
    PanelLeftOpen
} from 'lucide-react'
import Link from 'next/link'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, profile, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    // Default collapsed (true) as per requirement
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading, router])

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
        } catch (e) {
            console.error('Logout error:', e)
        }
        router.push('/login')
    }

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Agencias', href: '/dashboard/agencies', icon: Building2 },
        { name: 'Importar', href: '/dashboard/import', icon: Upload },
    ]

    const SidebarContent = () => (
        <div className="flex h-full flex-col bg-white shadow-sm border-r border-gray-100">
            <div className="p-6 flex justify-between items-center bg-white z-10">
                <img src="/logo_alana.svg" alt="Alana Tours" className="h-10 w-auto" />
                {/* Close for mobile */}
                <button
                    className="md:hidden text-gray-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <X className="h-6 w-6" />
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary" // Premium feel adjustment
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-gray-400")} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-100 bg-white z-10">
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                        <UserIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 truncate">{profile?.name || 'Usuario'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-error transition-colors duration-200"
                >
                    <LogOut className="h-5 w-5" />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    )

    if (loading) return null

    return (
        <div className="h-screen w-screen overflow-hidden bg-gray-50/50 flex transition-all duration-300">
            {/* Desktop Sidebar - Collapsible */}
            <aside
                className={cn(
                    "hidden md:flex flex-col fixed inset-y-0 left-0 bg-white z-30 transition-all duration-300 ease-in-out border-r border-gray-200 h-full",
                    isSidebarCollapsed ? "w-0 -translate-x-full opacity-0 overflow-hidden" : "w-64 translate-x-0 opacity-100"
                )}
            >
                <div className="w-64 h-full"> {/* Inner container to maintain width during animation */}
                    <SidebarContent />
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <div className={cn(
                "fixed inset-0 z-50 md:hidden transition-opacity duration-300",
                isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
                <aside className={cn(
                    "absolute inset-y-0 left-0 w-[80%] max-w-sm bg-white transition-transform duration-300 transform shadow-2xl h-full",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    <SidebarContent />
                </aside>
            </div>

            {/* Main Content */}
            <main
                className={cn(
                    "flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300 ease-in-out",
                    // If not collapsed on desktop, add left margin
                    !isSidebarCollapsed ? "md:ml-64" : "md:ml-0"
                )}
            >
                {/* Universal Header */}
                <header className="shrink-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center px-4 md:px-6 justify-between z-20 supports-[backdrop-filter]:bg-white/60">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className="hidden md:flex p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            title={isSidebarCollapsed ? "Expandir menú" : "Colapsar menú"}
                        >
                            {isSidebarCollapsed ? <PanelLeftOpen className="h-6 w-6" /> : <PanelLeftClose className="h-6 w-6" />}
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        <div className="flex items-center gap-3">
                            {/* Show logo only if sidebar is collapsed (or mobile) to avoid duplication */}
                            {(isSidebarCollapsed || isMobileMenuOpen) && (
                                <img src="/logo_alana.svg" alt="Logo" className="h-8 md:h-10 w-auto md:hidden" />
                            )}
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-hidden relative w-full">
                    {children}
                </div>
            </main>
        </div>
    )
}
