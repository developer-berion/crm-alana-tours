'use client'

import { Building2, Users, CheckCircle, Flame } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface KPIStatsProps {
    data: {
        totalAgencies: number
        activeClients: number
        conversionRate: number
        hotLeads: number
    }
}

export function KPIStats({ data }: KPIStatsProps) {
    const stats = [
        {
            name: 'Total Agencias',
            value: data.totalAgencies,
            icon: Building2,
            color: 'text-primary',
            bg: 'bg-primary/10',
            desc: 'Registradas'
        },
        {
            name: 'Clientes Activos',
            value: data.activeClients,
            icon: CheckCircle,
            color: 'text-success',
            bg: 'bg-success/10',
            desc: 'En cartera'
        },
        {
            name: 'Tasa Conversión',
            value: `${data.conversionRate}%`,
            icon: Users,
            color: 'text-warning',
            bg: 'bg-warning/10',
            desc: 'Leads a Clientes'
        },
        {
            name: 'Leads Calientes',
            value: data.hotLeads,
            icon: Flame,
            color: 'text-error', // Using error for hot as per plan red color
            bg: 'bg-error/10',
            desc: 'Prioridad Alta'
        }
    ]

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.name}
                    className="relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md duration-300 group"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform origin-left">
                                {stat.value}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{stat.desc}</p>
                        </div>
                        <div className={twMerge("p-3 rounded-xl transition-colors", stat.bg, stat.color)}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
