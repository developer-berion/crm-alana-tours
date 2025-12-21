import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: Request) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const agencyId = searchParams.get('agency_id')

        let query = 'SELECT * FROM branches'
        const params: string[] = []

        if (agencyId) {
            query += ' WHERE agency_id = $1'
            params.push(agencyId)
        }

        query += ' ORDER BY branch_name'

        const result = await pool.query(query, params)

        return NextResponse.json({ data: result.rows })
    } catch (error) {
        console.error('Branches GET error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const body = await request.json()
        const {
            agency_id,
            branch_name,
            contact_name,
            email,
            phone,
            country,
            state,
            city,
            address,
            google_maps_url,
            instagram_url,
            tiktok_url,
            facebook_url,
            website_url,
            contact_status = 'not_contacted',
            lead_temperature = 'cold',
            relationship_type = 'lead',
            notes,
        } = body

        if (!agency_id || !branch_name) {
            return NextResponse.json(
                { error: 'agency_id y branch_name son requeridos' },
                { status: 400 }
            )
        }

        const result = await pool.query(
            `INSERT INTO branches (
                agency_id, branch_name, contact_name, email, phone, country, state, city,
                address, google_maps_url, instagram_url, tiktok_url, facebook_url, website_url,
                contact_status, lead_temperature, relationship_type, notes
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
            RETURNING *`,
            [
                agency_id, branch_name, contact_name, email, phone, country, state, city,
                address, google_maps_url, instagram_url, tiktok_url, facebook_url, website_url,
                contact_status, lead_temperature, relationship_type, notes,
            ]
        )

        // Log activity
        await pool.query(
            `INSERT INTO agency_activity_log (branch_id, user_id, action_type, field_name, new_value)
             VALUES ($1, $2, 'create', 'branch', $3)`,
            [result.rows[0].id, user.id, branch_name]
        )

        return NextResponse.json({ data: result.rows[0] })
    } catch (error) {
        console.error('Branches POST error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}
