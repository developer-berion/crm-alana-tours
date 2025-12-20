import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { verifyPassword, createSession, setSessionCookie } from '@/lib/auth'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email y contraseña son requeridos' },
                { status: 400 }
            )
        }

        // Find user by email
        const result = await pool.query(
            'SELECT id, name, email, role, password_hash FROM profiles WHERE email = $1',
            [email.toLowerCase()]
        )

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'Credenciales inválidas' },
                { status: 401 }
            )
        }

        const user = result.rows[0]

        // Verify password
        if (!user.password_hash) {
            return NextResponse.json(
                { error: 'Usuario sin contraseña configurada' },
                { status: 401 }
            )
        }

        const isValid = await verifyPassword(password, user.password_hash)

        if (!isValid) {
            return NextResponse.json(
                { error: 'Credenciales inválidas' },
                { status: 401 }
            )
        }

        // Create session
        const token = await createSession(user.id)
        await setSessionCookie(token)

        return NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
