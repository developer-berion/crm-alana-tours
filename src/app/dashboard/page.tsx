'use client'

import { useAuth } from '@/hooks/useAuth'
import { Building2, Users, ArrowUpRight, History } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
    const [stats, setStats] = useState({
        agencies: 0,
        branches: 0,
        leads: 0,
        clients: 0
    })

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/stats')
                if (res.ok) {
                    const data = await res.json()
                    setStats({
                        agencies: data.agencies || 0,
                        branches: data.branches || 0,
                        leads: data.leads || 0,
                        clients: data.clients || 0
                    })
                }
            } catch (err) {
                console.error('Error fetching stats:', err)
            }
        }
        fetchStats()
    }, [])

    const statCards = [
        { name: 'Agencias', value: stats.agencies, icon: Building2, color: 'text-primary' },
        { name: 'Sucursales', value: stats.branches, icon: Users, color: 'text-accent' },
        { name: 'Leads', value: stats.leads, icon: ArrowUpRight, color: 'text-warning' },
        { name: 'Clientes', value: stats.clients, icon: History, color: 'text-success' },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Bienvenido al CRM Lite</h1>
                <p className="text-gray-600">Resumen general de operaciones</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Actividad Reciente</h2>
                    <div className="text-center py-12 text-gray-500 italic">
                        No hay actividad reciente para mostrar.
                    </div>
                </div>
            </div>
        </div>
    )
}
