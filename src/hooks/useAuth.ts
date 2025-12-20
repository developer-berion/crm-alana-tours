'use client'

import { useEffect, useState, useCallback } from 'react'

export interface AuthUser {
    id: string
    name: string
    email: string
    role: string
}

export interface Profile {
    id: string
    name: string
    email: string
    role: string
}

export function useAuth() {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)

    const SESSION_TIMEOUT_MS = 40 * 60 * 1000 // 40 minutes

    const checkSessionTimeout = useCallback(() => {
        const lastActivity = localStorage.getItem('last_activity')
        const rememberMe = localStorage.getItem('remember_me') === 'true'

        if (lastActivity && !rememberMe) {
            const now = Date.now()
            if (now - parseInt(lastActivity) > SESSION_TIMEOUT_MS) {
                console.log('[useAuth] Session expired due to inactivity')
                handleLogout(true)
                return true
            }
        }
        return false
    }, [])

    const updateActivity = useCallback(() => {
        localStorage.setItem('last_activity', Date.now().toString())
    }, [])

    const handleLogout = async (isExpired = false) => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
        } catch (e) {
            console.error('Logout error:', e)
        }
        localStorage.removeItem('last_activity')
        setUser(null)
        setProfile(null)
        setLoading(false)
        if (isExpired) {
            window.location.href = '/login?expired=true'
        }
    }

    const fetchSession = useCallback(async () => {
        try {
            const res = await fetch('/api/auth/session')
            const data = await res.json()

            if (data.user) {
                setUser(data.user)
                setProfile(data.user) // Profile is included in session
            } else {
                setUser(null)
                setProfile(null)
            }
        } catch (err) {
            console.error('Session fetch error:', err)
            setUser(null)
            setProfile(null)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        let isMounted = true

        const initialize = async () => {
            if (checkSessionTimeout()) return

            updateActivity()
            await fetchSession()
        }

        initialize()

        // Activity listeners
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
        const activityHandler = () => {
            if (localStorage.getItem('remember_me') !== 'true') {
                updateActivity()
            }
        }

        events.forEach(event => window.addEventListener(event, activityHandler))

        const timeoutCheckInterval = setInterval(() => {
            if (isMounted) checkSessionTimeout()
        }, 60000) // Check every minute

        return () => {
            isMounted = false
            events.forEach(event => window.removeEventListener(event, activityHandler))
            clearInterval(timeoutCheckInterval)
        }
    }, [checkSessionTimeout, updateActivity, fetchSession])

    return { user, profile, loading }
}
