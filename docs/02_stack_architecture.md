\# Stack \& Architecture



\## Frontend

\- Framework: Next.js (App Router)

\- Language: TypeScript

\- Styling: Tailwind CSS

\- Animations: Subtle (Tailwind transitions / light Framer Motion)

\- Responsive: Mobile-first



\## Backend

\- Supabase

&nbsp; - Auth

&nbsp; - Postgres Database

&nbsp; - Row Level Security (RLS)

&nbsp; - Edge Functions (password recovery)



\## Email

\- SMTP: Hostinger SMTP

\- Used only for password recovery



\## Hosting

\- Frontend: Hostinger (static build)

\- Backend: Supabase (managed)



\## Architecture Diagram (conceptual)



\[ Next.js Frontend ]

&nbsp;       |

&nbsp;       | supabase-js

&nbsp;       v

\[ Supabase ]

&nbsp; - Auth

&nbsp; - Database

&nbsp; - Edge Functions



