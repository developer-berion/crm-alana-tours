\# Authentication \& Security



\## User Model

\- 3 users only

\- All users are superadmin

\- Created manually via Supabase



\## Auth Provider

\- Supabase Auth (email/password)



\## Password Recovery Flow

\- User submits email

\- Supabase Edge Function is called

\- Function:

&nbsp; - Generates secure random password

&nbsp; - Updates password via Supabase Admin API

&nbsp; - Sends email via Hostinger SMTP

\- UI shows confirmation message only



\## Password Rules

\- Minimum 12 characters

\- Uppercase, lowercase, number, special character

\- Random generation only



\## Security Rules

\- No passwords handled in frontend

\- No service\_role exposed

\- RLS enabled on all tables

\- Audit logs are read-only



