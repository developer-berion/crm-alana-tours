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
        const search = searchParams.get('search') || ''

        let query = `
            SELECT a.*, 
                   COUNT(b.id) as branch_count,
                   MIN(b.contact_status) as contact_status,
                   MIN(b.lead_temperature) as lead_temperature,
                   MIN(b.city) as city
            FROM agencies a
            LEFT JOIN branches b ON b.agency_id = a.id
        `
        const params: string[] = []

        if (search) {
            query += ` WHERE a.name ILIKE $1`
            params.push(`%${search}%`)
        }

        query += ` GROUP BY a.id ORDER BY a.created_at DESC`

        const result = await pool.query(query, params)

        return NextResponse.json({ data: result.rows })
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
        const { name } = body

        if (!name) {
            return NextResponse.json({ error: 'Nombre es requerido' }, { status: 400 })
        }

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
