import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import pool from './db'

const SESSION_COOKIE_NAME = 'session_token'
const SESSION_MAX_AGE = 7 * 24 * 60 * 60 // 7 days in seconds

import crypto from 'crypto'

// Generate a secure random session token
function generateSessionToken(): string {
    return crypto.randomBytes(32).toString('hex')
}

// Hash a password
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
}

// Verify a password against a hash
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
}

// Generate a secure random password
export function generateSecurePassword(length: number = 16): string {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const special = '!@#$%^&*'
    const all = upper + lower + numbers + special

    // Ensure at least one of each type
    let password = ''
    password += upper[Math.floor(Math.random() * upper.length)]
    password += lower[Math.floor(Math.random() * lower.length)]
    password += numbers[Math.floor(Math.random() * numbers.length)]
    password += special[Math.floor(Math.random() * special.length)]

    // Fill the rest
    for (let i = 4; i < length; i++) {
        password += all[Math.floor(Math.random() * all.length)]
    }

    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('')
}

// Create a session for a user
export async function createSession(userId: string): Promise<string> {
    const token = generateSessionToken()
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000)

    // Store session in database
    // Store session in database
    // We use DELETE + INSERT instead of ON CONFLICT to handle cases where 
    // the unique constraint on user_id might be missing or different
    await pool.query('DELETE FROM sessions WHERE user_id = $1', [userId])

    await pool.query(
        'INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)',
        [token, userId, expiresAt]
    )

    return token
}

// Set session cookie
export async function setSessionCookie(token: string): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: SESSION_MAX_AGE,
        path: '/',
    })
}

// Get session from cookie and validate
export async function validateSession(): Promise<{ userId: string; user: AuthUser } | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!token) {
        return null
    }

    // Check session in database
    const result = await pool.query(
        `SELECT s.user_id, s.expires_at, p.id, p.name, p.email, p.role
         FROM sessions s
         JOIN profiles p ON p.id = s.user_id
         WHERE s.id = $1`,
        [token]
    )

    if (result.rows.length === 0) {
        return null
    }

    const session = result.rows[0]

    // Check if expired
    if (new Date(session.expires_at) < new Date()) {
        // Do not await the destroy operation to prevent blocking the response
        // Fire and forget, or handle in a separate cron job ideally
        destroySession().catch(err => console.error('Failed to cleanup expired session', err))
        return null
    }

    return {
        userId: session.user_id,
        user: {
            id: session.id,
            name: session.name,
            email: session.email,
            role: session.role,
        }
    }
}

// Destroy session
export async function destroySession(): Promise<void> {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (token) {
        await pool.query('DELETE FROM sessions WHERE id = $1', [token])
    }

    cookieStore.delete(SESSION_COOKIE_NAME)
}

// Get current user from session (for API routes)
export async function getCurrentUser(): Promise<AuthUser | null> {
    const session = await validateSession()
    return session?.user ?? null
}

// Type for authenticated user
export interface AuthUser {
    id: string
    name: string
    email: string
    role: string
}
