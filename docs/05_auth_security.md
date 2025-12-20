# Authentication & Security

## User Model

- 3 users only
- All users are superadmin
- Created manually via Supabase Dashboard

## Auth Provider

- Supabase Auth (email/password)
- Client: `@supabase/supabase-js`

## Password Recovery Flow

- User submits email
- Supabase Edge Function is called
- Function:
  - Generates secure random password
  - Updates password via Supabase Admin API
  - Sends email via Hostinger SMTP
- UI shows confirmation message only

## Password Rules

- Minimum 12 characters
- Uppercase, lowercase, number, special character
- Random generation only

## Security Rules

- No passwords handled in frontend
- No service_role exposed to frontend
- Database access via API Routes only (server-side)
- Audit logs are read-only

## Note on Architecture

Authentication uses Supabase Auth, while data storage uses Google Cloud SQL (PostgreSQL). This hybrid approach was adopted during migration to Google Cloud infrastructure.
