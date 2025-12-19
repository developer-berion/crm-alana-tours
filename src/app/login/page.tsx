import { Suspense } from 'react'
import LoginClient from './LoginClient'
import { Metadata } from 'next'
import { Loader2 } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Alana Tours – Sistema de Clientes',
    description: 'Login al sistema CRM de Alana Tours',
}

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 font-sans">
            <Suspense fallback={
                <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-sm flex items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            }>
                <LoginClient />
            </Suspense>
        </div>
    )
}
