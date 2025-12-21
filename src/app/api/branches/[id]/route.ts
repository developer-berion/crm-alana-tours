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

        const [branchResult, agencyResult, notesResult, activityResult] = await Promise.all([
            pool.query('SELECT * FROM branches WHERE id = $1', [id]),
            pool.query('SELECT a.* FROM agencies a JOIN branches b ON b.agency_id = a.id WHERE b.id = $1', [id]),
            pool.query('SELECT * FROM agency_notes WHERE branch_id = $1 ORDER BY created_at DESC', [id]),
            pool.query('SELECT * FROM agency_activity_log WHERE branch_id = $1 ORDER BY created_at DESC LIMIT 5', [id]),
        ])

        if (branchResult.rows.length === 0) {
            return NextResponse.json({ error: 'Sucursal no encontrada' }, { status: 404 })
        }

        // Get user names for activity logs
        const userIds = [...new Set(activityResult.rows.map(log => log.user_id).filter(Boolean))]
        let usersMap: Record<string, { name: string; email: string }> = {}

        if (userIds.length > 0) {
            const usersResult = await pool.query(
                'SELECT id, name, email FROM profiles WHERE id = ANY($1)',
                [userIds]
            )
            usersMap = usersResult.rows.reduce((acc, u) => {
                acc[u.id] = { name: u.name, email: u.email }
                return acc
            }, {} as Record<string, { name: string; email: string }>)
        }

        return NextResponse.json({
            branch: branchResult.rows[0],
            agency: agencyResult.rows[0],
            notes: notesResult.rows,
            activity: activityResult.rows,
            usersMap,
        })
    } catch (error) {
        console.error('Branch GET error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}

// Whitelist of columns that can be updated directly
const ALLOWED_UPDATE_FIELDS = new Set([
    'branch_name', 'contact_name', 'email', 'phone', 'country', 'state', 'city',
    'address', 'google_maps_url', 'instagram_url', 'tiktok_url', 'facebook_url',
    'website_url', 'contact_status', 'lead_temperature', 'relationship_type', 'notes',
])

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
        const { field, value, oldValue } = body

        // Strict validation against whitelist
        if (!ALLOWED_UPDATE_FIELDS.has(field)) {
            console.warn(`Attempt to update unauthorized field: ${field} by user ${user.id}`)
            return NextResponse.json({ error: 'Campo no permitido o inválido' }, { status: 400 })
        }

        // Safe to interpolate because we checked against a hardcoded Set of strings
        const result = await pool.query(
            `UPDATE branches SET "${field}" = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
            [value, id]
        )

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Sucursal no encontrada' }, { status: 404 })
        }

        // Log activity
        await pool.query(
            `INSERT INTO agency_activity_log (branch_id, user_id, action_type, field_name, old_value, new_value)
             VALUES ($1, $2, 'update', $3, $4, $5)`,
            [id, user.id, field, oldValue || null, value]
        )

        // Get updated activity logs
        const activityResult = await pool.query(
            'SELECT * FROM agency_activity_log WHERE branch_id = $1 ORDER BY created_at DESC LIMIT 5',
            [id]
        )

        return NextResponse.json({
            data: result.rows[0],
            activity: activityResult.rows,
        })
    } catch (error) {
        console.error('Branch PUT error:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}
