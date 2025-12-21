'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface TempData {
    name: string
    value: number
    color: string
    [key: string]: any
}

interface TemperatureChartProps {
    data: TempData[]
}

export function TemperatureChart({ data }: TemperatureChartProps) {
    const total = data.reduce((acc, curr) => acc + curr.value, 0)

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[400px] flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Temperatura de Leads</h3>
            <div className="flex-1 w-full min-h-0 relative">
                {total > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                label={false}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        No hay datos
                    </div>
                )}

                {/* Center text for Total */}
                {total > 0 && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[65%] text-center">
                        <p className="text-3xl font-bold text-gray-900">{total}</p>
                        <p className="text-xs text-gray-500">Total</p>
                    </div>
                )}
            </div>
        </div>
    )
}
