# Database Schema (Cloud SQL - PostgreSQL)

## agencies

- id (uuid, pk)
- name
- created_at
- deleted_at (timestamp, nullable)

## branches

- id (uuid, pk)
- agency_id (fk)
- branch_name
- contact_name
- email
- phone
- country
- state
- city
- address
- google_maps_url
- instagram_url
- tiktok_url
- facebook_url
- website_url
- contact_status
- lead_temperature
- relationship_type
- notes
- created_at
- updated_at

## agency_notes

- id (uuid, pk)
- branch_id (fk)
- content
- created_by (user_id)
- created_at

## agency_activity_log

- id (uuid, pk)
- branch_id (fk)
- user_id (fk)
- action_type
- field_name
- old_value
- new_value
- created_at

## import_logs

- id (uuid, pk)
- file_name
- uploaded_by
- total_rows
- valid_rows
- duplicate_rows
- invalid_rows
- created_at

## profiles

- id (uuid, pk)
- name
- email
- role
- created_at

---

## Connection

Database connection is managed via `pg` pool in `src/lib/db.ts`:

```typescript
import { Pool } from 'pg'

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: { rejectUnauthorized: false }
})
```
