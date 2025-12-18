'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import {
    LayoutDashboard,
    Building2,
    Upload,
    LogOut,
    User as UserIcon,
    Menu,
    X
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading, router])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        )
    }

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Agencias', href: '/dashboard/agencies', icon: Building2 },
        { name: 'Importar', href: '/dashboard/import', icon: Upload },
    ]

    const SidebarContent = () => (
        <div className="flex h-full flex-col bg-white shadow-sm transition-all duration-300">
            <div className="p-6">
                <h1 className="text-xl font-bold text-primary">CRM Lite</h1>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Alana Tours</p>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                                isActive
                                    ? "bg-primary text-white"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
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

    return (
        <div className="min-h-screen bg-background flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col fixed inset-y-0">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <div className={cn(
                "fixed inset-0 z-50 md:hidden transition-opacity duration-300",
                isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
                <aside className={cn(
                    "absolute inset-y-0 left-0 w-64 bg-white transition-transform duration-300 transform",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    <SidebarContent />
                </aside>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:pl-64 flex flex-col min-w-0">
                <header className="md:hidden h-16 bg-white shadow-sm flex items-center px-4 sticky top-0 z-40">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-600">
                        <Menu className="h-6 w-6" />
                    </button>
                    <h1 className="ml-2 font-bold text-primary">CRM Lite</h1>
                </header>
                <div className="p-4 md:p-8 animate-in fade-in duration-300">
                    {children}
                </div>
            </main>
        </div>
    )
}
