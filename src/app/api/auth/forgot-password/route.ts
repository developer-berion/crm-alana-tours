import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { hashPassword, generateSecurePassword } from '@/lib/auth'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json(
                { error: 'Email es requerido' },
                { status: 400 }
            )
        }

        // Find user by email
        const result = await pool.query(
            'SELECT id, name, email FROM profiles WHERE email = $1',
            [email.toLowerCase()]
        )

        // Always return success to prevent email enumeration
        if (result.rows.length === 0) {
            return NextResponse.json({ success: true })
        }

        const user = result.rows[0]

        // Generate new password
        const newPassword = generateSecurePassword(16)
        const hashedPassword = await hashPassword(newPassword)

        // Update password in database
        await pool.query(
            'UPDATE profiles SET password_hash = $1 WHERE id = $2',
            [hashedPassword, user.id]
        )

        // Send email with new password
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.hostinger.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        })

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: user.email,
            subject: 'Nueva contraseña - CRM Alana Tours',
            html: `
                <h2>Hola ${user.name},</h2>
                <p>Has solicitado restablecer tu contraseña.</p>
                <p>Tu nueva contraseña es: <strong>${newPassword}</strong></p>
                <p>Por favor, guárdala en un lugar seguro.</p>
                <br>
                <p>Saludos,<br>Equipo Alana Tours</p>
            `,
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Password recovery error:', error)
        // Still return success to prevent information leakage
        return NextResponse.json({ success: true })
    }
}
