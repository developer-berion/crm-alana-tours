'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { Profile } from '@/types/auth'

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true;
        const localSupabase = supabase;
        const SESSION_TIMEOUT_MS = 40 * 60 * 1000; // 40 minutes

        const checkSessionTimeout = () => {
            const lastActivity = localStorage.getItem('last_activity');
            const rememberMe = localStorage.getItem('remember_me') === 'true';

            if (lastActivity && !rememberMe) {
                const now = Date.now();
                if (now - parseInt(lastActivity) > SESSION_TIMEOUT_MS) {
                    console.log('[useAuth] Session expired due to inactivity');
                    handleLogout(true);
                    return true;
                }
            }
            return false;
        };

        const updateActivity = () => {
            localStorage.setItem('last_activity', Date.now().toString());
        };

        const handleLogout = async (isExpired = false) => {
            await localSupabase.auth.signOut();
            localStorage.removeItem('last_activity');
            if (isMounted) {
                setUser(null);
                setProfile(null);
                setLoading(false);
                if (isExpired) {
                    window.location.href = '/login?expired=true';
                }
            }
        };

        const fetchProfile = async (userId: string) => {
            try {
                const { data, error } = await localSupabase
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single()

                if (!isMounted) return null
                if (error) return null
                return data
            } catch (err) {
                return null
            }
        }

        const initialize = () => {
            if (checkSessionTimeout()) return null;

            updateActivity();

            try {
                localSupabase.auth.getSession().then(({ data: { session } }) => {
                    if (!isMounted) return
                    if (session?.user) {
                        setUser(session.user)
                        fetchProfile(session.user.id).then(p => {
                            if (isMounted) setProfile(p)
                        })
                    }
                    setLoading(false)
                }).catch(() => {
                    if (isMounted) setLoading(false)
                })

                const { data: { subscription } } = localSupabase.auth.onAuthStateChange((event, session) => {
                    if (!isMounted) return

                    if (event === 'SIGNED_IN') {
                        updateActivity();
                    }

                    const newUser = session?.user ?? null
                    setUser(newUser)

                    if (newUser) {
                        fetchProfile(newUser.id).then(p => {
                            if (isMounted) setProfile(p)
                        })
                    } else {
                        setProfile(null);
                    }
                    setLoading(false)
                })

                return subscription
            } catch (err) {
                if (isMounted) setLoading(false)
                return null
            }
        }

        const subscription = initialize()

        // Activity listeners
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        const activityHandler = () => {
            if (localStorage.getItem('remember_me') !== 'true') {
                updateActivity();
            }
        };

        events.forEach(event => window.addEventListener(event, activityHandler));

        const timeoutCheckInterval = setInterval(() => {
            checkSessionTimeout();
        }, 60000); // Check every minute

        return () => {
            isMounted = false
            if (subscription) subscription.unsubscribe()
            events.forEach(event => window.removeEventListener(event, activityHandler));
            clearInterval(timeoutCheckInterval);
        }
    }, [])

    return { user, profile, loading }
}
