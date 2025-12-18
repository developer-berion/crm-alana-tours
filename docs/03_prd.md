\# Product Requirements Document (PRD)



\## Core Entity Model

\- Agency (company / parent entity)

\- Branch (actual contact / location)



All commercial activity happens at branch level.



\## Main Features (MVP)



\### Authentication

\- Login

\- Logout

\- Password recovery (email + generated password)

\- 3 predefined superadmin users



\### Agency Management

\- Create, edit, view agencies

\- Agencies can have multiple branches



\### Branch Management

Each branch includes:

\- Agency reference

\- Branch name

\- Contact info

\- Location

\- Commercial status



\### Commercial Classification

\- Contact status:

&nbsp; - not\_contacted

&nbsp; - contacted

&nbsp; - waiting\_response

&nbsp; - rejected

&nbsp; - interested

\- Lead temperature:

&nbsp; - cold

&nbsp; - warm

&nbsp; - hot

\- Relationship type:

&nbsp; - lead

&nbsp; - client



\### Notes

\- Free-text notes per branch

\- Timestamped

\- Linked to user



\### Audit History

\- Every change is logged

\- Last 5 actions visible in UI

\- Full history stored in database



\### Bulk Import

\- CSV / Excel upload

\- Validation

\- Duplicate detection

\- Pre-import preview



\## Out of Scope

\- Automations

\- Integrations

\- Reports

\- Advanced permissions



