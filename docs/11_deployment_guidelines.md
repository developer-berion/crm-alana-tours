# Deployment Guidelines & Vercel Best Practices

## Deployment Workflow (Git)

To ensure a safe and automated deployment process, follow this strict Git workflow:

1.  **Development**: All new features and fixes must be implemented on the `development` branch (or feature branches merged into `development`).
2.  **Testing**: Verify changes locally (`npm run dev`) and ensure no build errors occur (`npm run build`).
3.  **Staging**: Push changes to `development`. This can be connected to a Preview deployment in Vercel.
4.  **Production Deployment**:
    *   Switch to `main` branch.
    *   Merge `development` into `main`.
    *   Push to `origin main`.
    *   **Trigger**: Vercel automatically detects the push to `main` and starts the production build.

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

## Next.js App Router & Vercel Build Rules

To avoid common build failures in Vercel (Production Mode), adhere to the following strict coding guidelines, specifically for the App Router:

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

*   Ensure all `NEXT_PUBLIC_` variables are defined in the Vercel Project Settings.
*   Check that `suppressHydrationWarning` is added to the `<html>` or `<body>` tag if using hydration-sensitive libraries (like specialized scroll locks or theme providers).

## Troubleshooting Deploys

*   **Build Logs**: Always check the "Building" tab in Vercel if a deploy fails.
*   **Local Build**: Run `npm run build` locally before pushing to catch errors early.
