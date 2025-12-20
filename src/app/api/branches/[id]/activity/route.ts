import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const { id } = await params

        const result = await pool.query(
            'SELECT * FROM agency_activity_log WHERE branch_id = $1 ORDER BY created_at DESC LIMIT 10',
            [id]
        )

        return NextResponse.json({ data: result.rows })
    } catch (error) {
        console.error('Activity GET error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}
