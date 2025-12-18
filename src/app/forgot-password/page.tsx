'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react'

const forgotSchema = z.object({
    email: z.string().email('Email inválido'),
})

type ForgotFormValues = z.infer<typeof forgotSchema>

export default function ForgotPasswordPage() {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotFormValues>({
        resolver: zodResolver(forgotSchema),
    })

    const onSubmit = async (data: ForgotFormValues) => {
        setIsLoading(true)
        setError(null)

        try {
            // According to requirements, this calls an Edge Function
            const { error } = await supabase.functions.invoke('password-recovery', {
                body: { email: data.email },
            })

            // Requirement: "If the email exists, we sent a new password."
            // We show success even if the email doesn't exist for security.
            setIsSent(true)
        } catch (err) {
            console.error(err)
            // Even on error, we might want to show the generic message
            setIsSent(true)
        } finally {
            setIsLoading(false)
        }
    }

    if (isSent) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 font-sans">
                <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-sm text-center">
                    <div className="flex justify-center">
                        <CheckCircle2 className="h-16 w-16 text-success" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Correo enviado</h1>
                    <p className="text-gray-600">
                        Si el email existe, hemos enviado una nueva contraseña. Por favor, revisa tu bandeja de entrada.
                    </p>
                    <button
                        onClick={() => router.push('/login')}
                        className="mt-6 flex w-full items-center justify-center gap-2 text-primary hover:underline"
                    >
                        <ArrowLeft className="h-4 w-4" /> Volver al login
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 font-sans">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-sm">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-primary">Recuperar contraseña</h1>
                    <p className="mt-2 text-gray-600">Ingresa tu email para recibir una nueva clave</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
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
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Enviar instrucciones'}
                    </button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => router.push('/login')}
                            className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" /> Volver al login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
