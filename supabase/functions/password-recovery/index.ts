import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { SmtpClient } from 'https://deno.land/x/smtp/mod.ts'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const SMTP_HOST = Deno.env.get('SMTP_HOST')
const SMTP_PORT = parseInt(Deno.env.get('SMTP_PORT') || '465')
const SMTP_USER = Deno.env.get('SMTP_USER')
const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD')

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } })
    }

    try {
        const { email } = await req.json()

        const supabaseAdmin = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

        // 1. Check if user exists
        const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers()
        const user = users.find(u => u.email === email)

        if (user) {
            // 2. Generate strong random password
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
            let password = ""
            for (let i = 0; i < 16; i++) {
                password += charset.charAt(Math.floor(Math.random() * charset.length))
            }

            // 3. Update password in Supabase Auth
            await supabaseAdmin.auth.admin.updateUserById(user.id, { password })

            // 4. Send email via Hostinger SMTP
            const client = new SmtpClient()
            await client.connectTLS({
                hostname: SMTP_HOST!,
                port: SMTP_PORT,
                username: SMTP_USER!,
                password: SMTP_PASSWORD!,
            })

            await client.send({
                from: SMTP_USER!,
                to: email,
                subject: "Tu nueva contraseña - CRM Lite",
                content: `Hola,\n\nHas solicitado una nueva contraseña para acceder al CRM Lite.\n\nTu nueva contraseña es: ${password}\n\nTe recomendamos cambiarla una vez ingreses.\n\nSaludos,\nEquipo CRM`,
            })

            await client.close()

            // 5. Log activity
            await supabaseAdmin.from('agency_activity_log').insert({
                user_id: user.id,
                action_type: 'password_reset',
                new_value: 'System generated new password',
            })
        }

        return new Response(JSON.stringify({ message: 'Process completed' }), {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
    }
})
