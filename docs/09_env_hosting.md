# Environment & Hosting

## Application Hosting

- **Platform**: Google Cloud Run
- **Region**: us-central1
- **Container Registry**: Google Artifact Registry
- **CI/CD**: GitHub Actions (automatic deploys from `main`)
- **Framework**: Next.js 15+ (App Router)

For deployment rules and troubleshooting, see [11_deployment_guidelines.md](./11_deployment_guidelines.md).

## Database (Cloud SQL)

- `DB_HOST` - Cloud SQL instance IP or Unix socket
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name (e.g., `alana_crm`)
- `DB_PORT` - Port (default: 5432)

## Authentication (Supabase)

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - For Edge Functions only

## SMTP (Hostinger)

- `SMTP_HOST=smtp.hostinger.com`
- `SMTP_PORT=465`
- `SMTP_SECURE=true`
- `SMTP_USER=no-reply@domain.com`
- `SMTP_PASSWORD=********`

## GCP Service Account (GitHub Actions)

- `GCP_SA_KEY` - Service account JSON key (GitHub Secret)
- Required roles:
  - `roles/run.admin`
  - `roles/storage.admin`
  - `roles/artifactregistry.writer`
  - `roles/iam.serviceAccountUser`

## Notes

- SMTP credentials never exposed to frontend (only Edge Functions)
- Database credentials stored in Cloud Run environment
- GCP service account key stored as GitHub Secret
