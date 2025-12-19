# Environment & Hosting

## Frontend Hosting

- **Platform**: Vercel
- **Integration**: GitHub (automatic deploys from `main`)
- **Framework**: Next.js App Router
- **Domain**: Hostinger (DNS pointing to Vercel)

For deployment rules and troubleshooting, see [11_deployment_guidelines.md](./11_deployment_guidelines.md).

## Supabase Env Vars

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (Edge Functions only)

## SMTP (Hostinger)

- `SMTP_HOST=smtp.hostinger.com`
- `SMTP_PORT=465`
- `SMTP_SECURE=true`
- `SMTP_USER=no-reply@domain.com`
- `SMTP_PASSWORD=********`

## Notes

- SMTP credentials never exposed to frontend (only Edge Functions).
