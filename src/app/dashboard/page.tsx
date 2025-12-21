'use client'

import { useEffect, useState } from 'react'
import { KPIStats } from '@/components/dashboard/KPIStats'
import { FunnelChart } from '@/components/dashboard/FunnelChart'
import { TemperatureChart } from '@/components/dashboard/TemperatureChart'
import { VenezuelaMap } from '@/components/dashboard/VenezuelaMap'
import { DigitalPresence } from '@/components/dashboard/DigitalPresence'
import { Loader2 } from 'lucide-react'

export default function DashboardPage() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({
        kpis: {
            totalAgencies: 0,
            activeClients: 0,
            conversionRate: 0,
            hotLeads: 0
        },
        funnel: [],
        temperature: [],
        geoDistribution: [],
        digitalPresence: []
    })

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/stats')
                if (res.ok) {
                    const jsonData = await res.json()
                    setData(jsonData)
                }
            } catch (err) {
                console.error('Error fetching stats:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="h-full w-full overflow-y-auto p-6 md:p-8 space-y-8 animate-in fade-in duration-500 custom-scrollbar">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Command Center</h1>
                <p className="text-gray-600">Visión global de operaciones y salud comercial</p>
            </div>

            {/* Top Level KPIs */}
            <KPIStats data={data.kpis} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Row 1: Funnel & Temperature (Sales Health) */}
                <div className="lg:col-span-2">
                    <FunnelChart data={data.funnel} />
                </div>
                <div className="lg:col-span-1">
                    <TemperatureChart data={data.temperature} />
                </div>

                {/* Row 2: Geo & Digital (Market Reach), keeping balance */}
                <div className="lg:col-span-2">
                    <VenezuelaMap data={data.geoDistribution} />
                </div>
                <div className="lg:col-span-1">
                    <DigitalPresence data={data.digitalPresence} />
                </div>
            </div>
        </div>
    )
}
