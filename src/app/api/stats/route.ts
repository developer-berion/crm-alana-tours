import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const [agencies, branches, leads, clients] = await Promise.all([
            pool.query('SELECT COUNT(*) FROM agencies'),
            pool.query('SELECT COUNT(*) FROM branches'),
            pool.query("SELECT COUNT(*) FROM branches WHERE relationship_type = 'lead'"),
            pool.query("SELECT COUNT(*) FROM branches WHERE relationship_type = 'client'"),
        ])

        return NextResponse.json({
            agencies: parseInt(agencies.rows[0].count),
            branches: parseInt(branches.rows[0].count),
            leads: parseInt(leads.rows[0].count),
            clients: parseInt(clients.rows[0].count),
        })
    } catch (error) {
        console.error('Stats error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}
