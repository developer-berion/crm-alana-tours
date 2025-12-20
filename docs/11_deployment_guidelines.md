# Deployment Guidelines & Cloud Run Best Practices

## Deployment Workflow (Git + GitHub Actions)

To ensure a safe and automated deployment process, follow this strict Git workflow:

1.  **Development**: All new features and fixes must be implemented on the `development` branch (or feature branches merged into `development`).
2.  **Testing**: Verify changes locally (`npm run dev`) and ensure no build errors occur (`npm run build`).
3.  **Staging**: Push changes to `development`. This can be connected to a Preview deployment.
4.  **Production Deployment**:
    *   Switch to `main` branch.
    *   Merge `development` into `main`.
    *   Push to `origin main`.
    *   **Trigger**: GitHub Actions automatically detects the push to `main` and starts the deployment.

```bash
# Example Workflow
git checkout development
git add .
git commit -m "feat: new feature"
git push origin development

# Deploy to Production
git checkout main
git merge development
git push origin main
git checkout development
```

## GitHub Actions Pipeline

The deployment pipeline (`.github/workflows/google-cloud-run.yml`) performs:

1. **Checkout**: Clone the repository
2. **Google Auth**: Authenticate using service account key (`GCP_SA_KEY`)
3. **Docker Build**: Build container image
4. **Push to Artifact Registry**: `us-central1-docker.pkg.dev/alana-crm/cloud-run-source-deploy`
5. **Deploy to Cloud Run**: Deploy new revision to `alana-crm` service

## Next.js App Router Build Rules

To avoid common build failures, adhere to the following strict coding guidelines, specifically for the App Router:

### 1. Client Components & Search Params (`useSearchParams`)

**Rule**: Any Client Component that uses `useSearchParams()` must be wrapped in a `<Suspense>` boundary if it is used within a page that is statically text-rendered or could be prerendered.

*   **Why?**: Next.js requires knowing if a page depends on Request-time information. Without Suspense, the build fails because it tries to statically render a dynamic hook.
*   **Error**: `useSearchParams() should be wrapped in a suspense boundary`.

**Correct Implementation Pattern**:

1.  **Create a Client Component** for the logic using `useSearchParams`.
2.  **Keep the Page as a Server Component**.
3.  **Wrap the Client Component in `<Suspense>`** with a fallback.

**Example (`/app/login/page.tsx`):**

```tsx
// Server Component (page.tsx)
import { Suspense } from 'react'
import LoginClient from './LoginClient' // The component using useSearchParams

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClient />
    </Suspense>
  )
}
```

```tsx
// Client Component (LoginClient.tsx)
'use client'
import { useSearchParams } from 'next/navigation'

export default function LoginClient() {
  const searchParams = useSearchParams()
  // ... logic
  return <form>...</form>
}
```

### 2. Standard Environment Checks

*   Ensure all environment variables are defined in Cloud Run service configuration.
*   Check that `suppressHydrationWarning` is added to the `<html>` or `<body>` tag if using hydration-sensitive libraries.

## Troubleshooting Deploys

*   **Build Logs**: Check GitHub Actions logs if a deploy fails.
*   **Cloud Run Logs**: Use `gcloud run services logs read alana-crm --region=us-central1` for runtime errors.
*   **Local Build**: Run `npm run build` locally before pushing to catch errors early.

## Useful Commands

```bash
# View Cloud Run service status
gcloud run services describe alana-crm --region=us-central1

# View recent logs
gcloud run services logs read alana-crm --region=us-central1 --limit=50

# Manually deploy (if needed)
gcloud run deploy alana-crm --source . --region=us-central1
```
