# Stack & Architecture

## Frontend

- Framework: Next.js 15+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Animations: Subtle (Tailwind transitions / light Framer Motion)
- Responsive: Mobile-first

## Backend

- **Database**: Google Cloud SQL (PostgreSQL)
  - Direct connection via `pg` pool (`src/lib/db.ts`)
  - API Routes for server-side operations
- **Authentication**: Supabase Auth (email/password)

## Email

- SMTP: Hostinger SMTP
- Used only for password recovery

## Hosting & Infrastructure

- **Application**: Google Cloud Run (containerized Next.js)
- **Database**: Google Cloud SQL (PostgreSQL)
- **Container Registry**: Google Artifact Registry
- **CI/CD**: GitHub Actions (automatic deploys from `main`)
- **Region**: us-central1

## Architecture Diagram (conceptual)

```
[ GitHub Repository ]
        |
        | push to main
        v
[ GitHub Actions ]
        |
        | docker build + push
        v
[ Artifact Registry ]
        |
        | deploy
        v
[ Google Cloud Run ]
        |
        | pg connection
        v
[ Google Cloud SQL (PostgreSQL) ]
```

## Authentication Flow

```
[ Next.js Frontend ]
        |
        | supabase-js (auth only)
        v
[ Supabase Auth ]
```
