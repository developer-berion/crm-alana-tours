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
        console.log(`[LOGIN_DEBUG] Searching user for email: ${email}`);

        let result;
        try {
            result = await pool.query(
                'SELECT id, name, email, role, password_hash FROM profiles WHERE email = $1',
                [email.toLowerCase()]
            )
        } catch (dbError: any) {
            console.error('[LOGIN_DEBUG] Database query failed:', {
                message: dbError.message,
                code: dbError.code,
                detail: dbError.detail,
                host: process.env.DB_HOST
            });
            throw dbError; // Re-throw to be caught by outer catch
        }

        console.log(`[LOGIN_DEBUG] User search result: ${result.rows.length} rows found`);

        if (result.rows.length === 0) {
            console.log('[LOGIN_DEBUG] User not found in database');
            return NextResponse.json(
                { error: 'Credenciales inválidas' },
                { status: 401 }
            )
        }

        const user = result.rows[0]

        // Verify password
        if (!user.password_hash) {
            console.error(`[LOGIN_DEBUG] User ${user.email} has no password hash`);
            return NextResponse.json(
                { error: 'Usuario sin contraseña configurada' },
                { status: 401 }
            )
        }

        console.log('[LOGIN_DEBUG] Verifying password...');
        const isValid = await verifyPassword(password, user.password_hash)
        console.log(`[LOGIN_DEBUG] Password verification result: ${isValid}`);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Credenciales inválidas' },
                { status: 401 }
            )
        }

        // Create session
        console.log('[LOGIN_DEBUG] Creating session...');
        const token = await createSession(user.id)
        await setSessionCookie(token)
        console.log('[LOGIN_DEBUG] Session created successfully');

        return NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch (error: any) {
        console.error('[LOGIN_DEBUG] Critical Login Error:', {
            message: error?.message || 'Unknown error',
            stack: error?.stack,
            env: {
                DB_HOST: process.env.DB_HOST,
                DB_USER: process.env.DB_USER,
                // Do not log password
            }
        })
        return NextResponse.json(
            { error: 'Error interno del servidor', details: error?.message },
            { status: 500 }
        )
    }
}
