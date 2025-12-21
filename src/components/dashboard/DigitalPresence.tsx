'use client'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'

interface SocialData {
    platform: string
    count: number
}

interface DigitalPresenceProps {
    data: SocialData[]
}

export function DigitalPresence({ data }: DigitalPresenceProps) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[400px] flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Presencia Digital</h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#E5E7EB" />
                        <PolarAngleAxis dataKey="platform" tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                        <Radar
                            name="Cuentas"
                            dataKey="count"
                            stroke="#8B5CF6"
                            fill="#8B5CF6"
                            fillOpacity={0.5}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
