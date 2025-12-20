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
        const ids = searchParams.get('ids')

        if (!ids) {
            return NextResponse.json({ data: [] })
        }

        const idArray = ids.split(',')

        const result = await pool.query(
            'SELECT id, name, email FROM profiles WHERE id = ANY($1)',
            [idArray]
        )

        return NextResponse.json({ data: result.rows })
    } catch (error) {
        console.error('Profiles GET error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}
