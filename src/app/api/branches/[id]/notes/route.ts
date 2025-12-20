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
            'SELECT * FROM agency_notes WHERE branch_id = $1 ORDER BY created_at DESC',
            [id]
        )

        return NextResponse.json({ data: result.rows })
    } catch (error) {
        console.error('Notes GET error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}

export async function POST(
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
        const { content } = body

        if (!content) {
            return NextResponse.json({ error: 'Contenido es requerido' }, { status: 400 })
        }

        const result = await pool.query(
            `INSERT INTO agency_notes (branch_id, content, created_by)
             VALUES ($1, $2, $3) RETURNING *`,
            [id, content, user.id]
        )

        // Log activity
        await pool.query(
            `INSERT INTO agency_activity_log (branch_id, user_id, action_type, field_name, new_value)
             VALUES ($1, $2, 'create', 'note', $3)`,
            [id, user.id, content.substring(0, 100)]
        )

        return NextResponse.json({ data: result.rows[0] })
    } catch (error) {
        console.error('Notes POST error:', error)
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

        const body = await request.json()
        const { noteId, content, isPinned } = body

        if (content !== undefined) {
            await pool.query(
                'UPDATE agency_notes SET content = $1 WHERE id = $2',
                [content, noteId]
            )
        }

        if (isPinned !== undefined) {
            await pool.query(
                'UPDATE agency_notes SET is_pinned = $1 WHERE id = $2',
                [isPinned, noteId]
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Notes PUT error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}
