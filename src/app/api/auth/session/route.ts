import { NextResponse } from 'next/server'
import { validateSession } from '@/lib/auth'

export async function GET() {
    try {
        const session = await validateSession()

        if (!session) {
            return NextResponse.json({ user: null })
        }

        return NextResponse.json({ user: session.user })
    } catch (error) {
        console.error('Session error:', error)
        return NextResponse.json({ user: null })
    }
}
