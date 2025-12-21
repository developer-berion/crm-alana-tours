'use client'

import { useEffect, useState, useMemo } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { scaleQuantile } from 'd3-scale'
import { Tooltip } from 'react-tooltip'

const VENEZUELA_TOPO_URL = 'https://raw.githubusercontent.com/xoolive/topojson/master/countries/venezuela/venezuela-estados.json'

interface GeoData {
    state: string
    count: number
}

interface VenezuelaMapProps {
    data: GeoData[]
}

export function VenezuelaMap({ data }: VenezuelaMapProps) {
    const [topology, setTopology] = useState<any>(null)

    useEffect(() => {
        fetch(VENEZUELA_TOPO_URL)
            .then(res => res.json())
            .then(setTopology)
            .catch(err => console.error('Error loading map topology:', err))
    }, [])

    const totalAgencies = useMemo(() => data.reduce((acc, curr) => acc + curr.count, 0), [data])

    // Sort data for the legend
    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => b.count - a.count)
    }, [data])

    const colorScale = useMemo(() => {
        return scaleQuantile<string>()
            .domain(data.map(d => d.count))
            .range([
                '#BFDBFE', // light blue 200
                '#93C5FD', // blue 300
                '#60A5FA', // blue 400
                '#3B82F6', // blue 500
                '#2563EB', // blue 600
                '#1D4ED8'  // blue 700
            ])
    }, [data])

    const getFillColor = (stateName: string) => {
        const stateData = data.find(d => {
            return d.state === stateName || d.state.toLowerCase() === stateName.toLowerCase()
        })

        if (!stateData || stateData.count === 0) {
            return '#E5E7EB' // gray-200 for 0
        }
        return colorScale(stateData.count)
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[500px]">
            <h3 className="text-lg font-bold text-gray-900 mb-6 px-1">Densidad Geográfica</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
                {/* Columna Izquierda: Mapa (2/3 del espacio) */}
                <div className="lg:col-span-2 relative border-r border-gray-100 pr-4 flex flex-col">
                    <div className="flex-1 w-full relative">
                        {topology ? (
                            <>
                                <ComposableMap
                                    projection="geoMercator"
                                    projectionConfig={{
                                        scale: 2500,
                                        center: [-66, 6]
                                    }}
                                    className="w-full h-full"
                                >
                                    <ZoomableGroup>
                                        <Geographies geography={topology}>
                                            {({ geographies }: { geographies: any[] }) =>
                                                geographies.map((geo: any) => {
                                                    const stateName = geo.properties.NAME_1
                                                    const stateData = data.find(d => d.state === stateName)
                                                    const count = stateData?.count || 0

                                                    return (
                                                        <Geography
                                                            key={geo.rsmKey}
                                                            geography={geo}
                                                            data-tooltip-id="map-tooltip"
                                                            data-tooltip-content={`${stateName}: ${count} Agencia${count !== 1 ? 's' : ''}`}
                                                            fill={getFillColor(stateName)}
                                                            stroke="#FFFFFF"
                                                            strokeWidth={0.5}
                                                            style={{
                                                                default: { outline: 'none' },
                                                                hover: {
                                                                    fill: '#F59E0B',
                                                                    outline: 'none',
                                                                    cursor: 'pointer'
                                                                },
                                                                pressed: { outline: 'none' },
                                                            }}
                                                        />
                                                    )
                                                })
                                            }
                                        </Geographies>
                                    </ZoomableGroup>
                                </ComposableMap>
                                <Tooltip id="map-tooltip" />
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                Cargando mapa...
                            </div>
                        )}
                    </div>
                </div>

                {/* Columna Derecha: Leyenda y Datos (1/3 del espacio) */}
                <div className="lg:col-span-1 flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-900">Distribución por Estado</h3>
                        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                            Total: {totalAgencies}
                        </span>
                    </div>

                    <div className="overflow-y-auto pr-2 space-y-5 custom-scrollbar flex-1 pb-2">
                        {sortedData.length > 0 ? (
                            sortedData.map((item) => {
                                const percentage = totalAgencies > 0
                                    ? ((item.count / totalAgencies) * 100).toFixed(1)
                                    : '0.0';

                                return (
                                    <div key={item.state} className="group">
                                        <div className="flex justify-between items-end mb-1.5">
                                            <span className="text-sm font-medium text-gray-700 truncate max-w-[140px]" title={item.state}>
                                                {item.state}
                                            </span>
                                            <div className="text-right">
                                                <span className="text-sm font-bold text-gray-900">{item.count}</span>
                                            </div>
                                        </div>

                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all duration-500 ease-out group-hover:bg-accent"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>

                                        <div className="text-right mt-1">
                                            <span className="text-[10px] text-gray-400 font-medium">{percentage}% del total</span>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-center py-8 text-gray-400 text-sm">
                                No hay datos disponibles
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
