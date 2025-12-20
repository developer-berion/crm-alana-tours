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

        const [agencyResult, branchesResult] = await Promise.all([
            pool.query('SELECT * FROM agencies WHERE id = $1', [id]),
            pool.query('SELECT * FROM branches WHERE agency_id = $1 ORDER BY branch_name', [id]),
        ])

        if (agencyResult.rows.length === 0) {
            return NextResponse.json({ error: 'Agencia no encontrada' }, { status: 404 })
        }

        return NextResponse.json({
            agency: agencyResult.rows[0],
            branches: branchesResult.rows,
        })
    } catch (error) {
        console.error('Agency GET error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        const { name } = body

        const result = await pool.query(
            'UPDATE agencies SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        )

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Agencia no encontrada' }, { status: 404 })
        }

        return NextResponse.json({ data: result.rows[0] })
    } catch (error) {
        console.error('Agency PUT error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const { id } = await params

        await pool.query('DELETE FROM agencies WHERE id = $1', [id])

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Agency DELETE error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}
