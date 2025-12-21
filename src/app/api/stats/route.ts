import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        // Parallelize all queries for performance
        const [
            agenciesResult,
            activeClientsResult,
            hotLeadsResult,
            totalLeadsResult,
            funnelRawResult,
            tempResult,
            geoResult,
            socialsResult
        ] = await Promise.all([
            // KPIs
            pool.query('SELECT COUNT(*) FROM agencies WHERE deleted_at IS NULL'),
            pool.query("SELECT COUNT(*) FROM branches b JOIN agencies a ON b.agency_id = a.id WHERE a.deleted_at IS NULL AND b.relationship_type = 'client'"),
            pool.query("SELECT COUNT(*) FROM branches b JOIN agencies a ON b.agency_id = a.id WHERE a.deleted_at IS NULL AND b.lead_temperature = 'hot'"),
            pool.query("SELECT COUNT(*) FROM branches b JOIN agencies a ON b.agency_id = a.id WHERE a.deleted_at IS NULL AND b.relationship_type = 'lead'"),

            // Funnel Raw Data (Group by status and type)
            pool.query(`
                SELECT relationship_type, contact_status, COUNT(*) 
                FROM branches b 
                JOIN agencies a ON b.agency_id = a.id 
                WHERE a.deleted_at IS NULL 
                GROUP BY relationship_type, contact_status
            `),

            // Temperature (Group by lead_temperature)
            pool.query(`
                SELECT lead_temperature, COUNT(*) 
                FROM branches b 
                JOIN agencies a ON b.agency_id = a.id 
                WHERE a.deleted_at IS NULL 
                GROUP BY lead_temperature
            `),

            // Geo Distribution (All States)
            pool.query(`
                SELECT state, COUNT(*) as count 
                FROM branches b 
                JOIN agencies a ON b.agency_id = a.id 
                WHERE a.deleted_at IS NULL AND state IS NOT NULL AND state != '' 
                GROUP BY state 
                ORDER BY count DESC
            `),

            // Digital Presence
            pool.query(`
                SELECT 
                    COUNT(CASE WHEN website_url IS NOT NULL AND website_url != '' THEN 1 END) as website,
                    COUNT(CASE WHEN instagram_url IS NOT NULL AND instagram_url != '' THEN 1 END) as instagram,
                    COUNT(CASE WHEN tiktok_url IS NOT NULL AND tiktok_url != '' THEN 1 END) as tiktok,
                    COUNT(CASE WHEN facebook_url IS NOT NULL AND facebook_url != '' THEN 1 END) as facebook
                FROM branches b
                JOIN agencies a ON b.agency_id = a.id
                WHERE a.deleted_at IS NULL
            `)
        ])

        // --- Process KPIs ---
        const totalAgencies = parseInt(agenciesResult.rows[0].count)
        const activeClients = parseInt(activeClientsResult.rows[0].count)
        const hotLeads = parseInt(hotLeadsResult.rows[0].count)
        const totalLeads = parseInt(totalLeadsResult.rows[0].count)
        const conversionRate = totalLeads + activeClients > 0
            ? Math.round((activeClients / (activeClients + totalLeads)) * 100)
            : 0

        // --- Process Funnel ---
        // Map raw DB rows to simpler categories
        const funnelMap: Record<string, number> = {
            'Sin Contactar': 0,
            'Contactado': 0,
            'Interesado': 0,
            'Cliente': 0
        }

        funnelRawResult.rows.forEach(row => {
            if (row.relationship_type === 'client') {
                funnelMap['Cliente'] += parseInt(row.count)
            } else {
                switch (row.contact_status) {
                    case 'not_contacted':
                        funnelMap['Sin Contactar'] += parseInt(row.count); break;
                    case 'contacted':
                    case 'waiting_response':
                        funnelMap['Contactado'] += parseInt(row.count); break;
                    case 'interested':
                        funnelMap['Interesado'] += parseInt(row.count); break;
                    // 'rejected' is ignored for the positive funnel
                }
            }
        })

        const funnel = [
            { status: 'Sin Contactar', count: funnelMap['Sin Contactar'] },
            { status: 'Contactado', count: funnelMap['Contactado'] },
            { status: 'Interesado', count: funnelMap['Interesado'] },
            { status: 'Cliente', count: funnelMap['Cliente'] }
        ]

        // --- Process Temperature ---
        const tempMap: Record<string, number> = { 'cold': 0, 'warm': 0, 'hot': 0 }
        tempResult.rows.forEach(row => {
            if (row.lead_temperature && tempMap.hasOwnProperty(row.lead_temperature)) {
                tempMap[row.lead_temperature] = parseInt(row.count)
            }
        })

        const temperature = [
            { name: 'Frío', value: tempMap['cold'], color: '#60A5FA' },    // Light Blue
            { name: 'Tibio', value: tempMap['warm'], color: '#F59E0B' },   // Orange/Yellow
            { name: 'Caliente', value: tempMap['hot'], color: '#D93025' }  // Red
        ]

        // --- Process Geo ---
        const geoDistribution = geoResult.rows.map(row => ({
            state: row.state,
            count: parseInt(row.count)
        }))

        // --- Process Digital Presence ---
        const socialRow = socialsResult.rows[0]
        const digitalPresence = [
            { platform: 'Website', count: parseInt(socialRow.website) },
            { platform: 'Instagram', count: parseInt(socialRow.instagram) },
            { platform: 'TikTok', count: parseInt(socialRow.tiktok) },
            { platform: 'Facebook', count: parseInt(socialRow.facebook) }
        ]

        return NextResponse.json({
            kpis: {
                totalAgencies,
                activeClients,
                conversionRate,
                hotLeads
            },
            funnel,
            temperature,
            geoDistribution,
            digitalPresence
        })

    } catch (error) {
        console.error('Stats error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}
