'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, AlertCircle } from 'lucide-react'

const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    remember: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginClient() {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const isExpired = searchParams.get('expired') === 'true'

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            remember: typeof window !== 'undefined' ? localStorage.getItem('remember_me') === 'true' : false
        }
    })

    useEffect(() => {
        const savedEmail = localStorage.getItem('saved_email')
        if (savedEmail) {
            setValue('email', savedEmail)
        }
    }, [setValue])

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true)
        setError(null)

        // Save preference
        localStorage.setItem('remember_me', data.remember ? 'true' : 'false')
        if (data.remember) {
            localStorage.setItem('saved_email', data.email)
        } else {
            localStorage.removeItem('saved_email')
        }

        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        })

        if (error) {
            setError('Email o contraseña incorrectos.')
            setIsLoading(false)
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex flex-col items-center justify-center">
                <img src="/logo_alana.svg" alt="Alana Tours" className="h-16 w-auto mb-4" />
                <p className="text-gray-600">Sistema de Clientes</p>
            </div>

            {isExpired && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 text-amber-800 animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                    <p className="text-sm font-medium">Su sesión ha expirado. Por favor, ingrese de nuevo.</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            {...register('email')}
                            type="email"
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            {...register('password')}
                            type="password"
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-error">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            {...register('remember')}
                            id="remember"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 select-none cursor-pointer">
                            Recordar mi sesión
                        </label>
                    </div>
                </div>

                {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-error">
                        {error}
                    </div>
                )}

                <button
                    disabled={isLoading}
                    type="submit"
                    className="flex w-full justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-opacity-90 disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Entrar'}
                </button>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => router.push('/forgot-password')}
                        className="text-sm text-accent hover:underline"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
            </form>
        </div>
    )
}
