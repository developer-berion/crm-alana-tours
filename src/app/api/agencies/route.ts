import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { z } from 'zod'

const createAgencySchema = z.object({
    name: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre es muy largo')
})

export async function GET(request: Request) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const search = searchParams.get('search') || ''
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '50')
        const offset = (page - 1) * limit

        let whereClause = ''
        const params: any[] = []
        let paramIndex = 1

        if (search) {
            whereClause = ` WHERE a.name ILIKE $${paramIndex} OR b.branch_name ILIKE $${paramIndex} OR b.contact_name ILIKE $${paramIndex} OR b.email ILIKE $${paramIndex}`
            params.push(`%${search}%`)
            paramIndex++
        }

        // Get total count (counting ROWS i.e. agency+branch combinations)
        const countQuery = `
            SELECT COUNT(*) 
            FROM agencies a
            LEFT JOIN branches b ON b.agency_id = a.id
            ${whereClause ? whereClause + ' AND a.deleted_at IS NULL' : 'WHERE a.deleted_at IS NULL'}
        `
        const countResult = await pool.query(countQuery, params)
        const total = parseInt(countResult.rows[0].count)

        // Get paginated flat list
        // We select key fields from both tables
        let query = `
            SELECT 
                a.id as agency_id,
                a.name as agency_name,
                a.created_at,
                b.id as branch_id,
                b.branch_name,
                b.contact_name,
                b.email,
                b.phone,
                b.city,
                b.country,
                b.state,
                b.contact_status,
                b.lead_temperature,
                b.relationship_type,
                b.instagram_url,
                b.tiktok_url,
                b.facebook_url,
                b.website_url,
                b.notes
            FROM agencies a
            LEFT JOIN branches b ON b.agency_id = a.id
            ${whereClause ? whereClause + ' AND a.deleted_at IS NULL' : 'WHERE a.deleted_at IS NULL'}
            ORDER BY a.name ASC, b.id ASC
            LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
        `

        const result = await pool.query(query, [...params, limit, offset])

        return NextResponse.json({
            data: result.rows,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Agencies GET error:', error)
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

        const validation = createAgencySchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({
                error: validation.error.issues[0]?.message || 'Error de validación'
            }, { status: 400 })
        }

        const { name } = validation.data

        const result = await pool.query(
            'INSERT INTO agencies (name) VALUES ($1) RETURNING *',
            [name]
        )

        return NextResponse.json({ data: result.rows[0] })
    } catch (error) {
        console.error('Agencies POST error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}
