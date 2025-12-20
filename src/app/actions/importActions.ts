'use server'

import pool from '@/lib/db'
import { AgencyImportInput } from '@/utils/importService'

export type ImportActionResult = {
    success: boolean
    summary: {
        total: number
        imported: number
        duplicates: number
        errors: number
    }
    details: string[]
}

export async function importAgencies(data: AgencyImportInput[], userId: string): Promise<ImportActionResult> {
    const client = await pool.connect()

    let imported = 0
    let duplicates = 0
    let errors = 0
    const details: string[] = []

    try {
        await client.query('BEGIN')

        for (const row of data) {
            try {
                // 1. Check Duplicate (Agency Name + Email) OR (Agency Name + Country + City)
                // DB naming convention check: table 'agencies', columns 'name'.
                // table 'branches', columns 'email', 'country', 'city'.
                // We need to check if the AGENCY exists.

                // Strategy:
                // A. Check if Agency exists by Name.
                //    If YES -> Check if it has a branch with same Email.
                // B. If NO -> It's a new Agency.

                // Step A: Check Agency
                const agencyRes = await client.query(
                    'SELECT id FROM agencies WHERE name = $1',
                    [row.agency_name]
                )

                let agencyId: string

                if (agencyRes.rows.length > 0) {
                    agencyId = agencyRes.rows[0].id

                    // Check for duplicate branch in this agency
                    const branchCheck = await client.query(
                        `SELECT id FROM branches 
                         WHERE agency_id = $1 
                         AND (email = $2 OR (country = $3 AND city = $4 AND branch_name = $5))`,
                        [agencyId, row.email, row.country || '', row.city || '', row.branch_name || 'Principal']
                    )

                    if (branchCheck.rows.length > 0) {
                        duplicates++
                        details.push(`Duplicate: ${row.agency_name} - ${row.email}`)
                        continue // Skip to next row
                    }

                } else {
                    // Create New Agency
                    const newAgency = await client.query(
                        'INSERT INTO agencies (name) VALUES ($1) RETURNING id',
                        [row.agency_name]
                    )
                    agencyId = newAgency.rows[0].id
                }

                // 2. Insert Branch
                const newBranch = await client.query(
                    `INSERT INTO branches (
                        agency_id, branch_name, contact_name, email, phone, 
                        country, state, city, instagram_url, tiktok_url, website_url, 
                        contact_status, lead_temperature, relationship_type, notes
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
                    RETURNING id`,
                    [
                        agencyId,
                        row.branch_name || 'Principal',
                        row.contact_name,
                        row.email,
                        row.phone,
                        row.country,
                        row.state,
                        row.city,
                        row.instagram_url,
                        row.tiktok_url,
                        row.website_url,
                        row.contact_status || 'not_contacted',
                        row.lead_temperature || 'cold',
                        row.relationship_type || 'lead',
                        row.notes
                    ]
                )
                const branchId = newBranch.rows[0].id

                // 3. Audit Log
                await client.query(
                    `INSERT INTO agency_activity_log (branch_id, user_id, action_type, new_value)
                     VALUES ($1, $2, $3, $4)`,
                    [branchId, userId, 'bulk_import_create', 'Importado masivamente']
                )

                imported++

            } catch (rowError: any) {
                console.error("Row Import Error", rowError)
                errors++
                details.push(`Error importing ${row.agency_name}: ${rowError.message}`)
            }
        }

        await client.query('COMMIT')

        // Final Global Log Entry (optional, but requested in specs as 'import_logs')
        try {
            await client.query(
                `INSERT INTO import_logs (file_name, uploaded_by, total_rows, valid_rows, duplicate_rows, invalid_rows)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                ['Bulk Import Batch', userId, data.length, imported, duplicates, errors]
            )
        } catch (logLimitError) {
            console.warn("Could not write separate import_log", logLimitError)
        }

        return {
            success: true,
            summary: {
                total: data.length,
                imported,
                duplicates,
                errors
            },
            details
        }

    } catch (e: any) {
        await client.query('ROLLBACK')
        console.error("Transaction Error", e)
        return {
            success: false,
            summary: { total: data.length, imported: 0, duplicates: 0, errors: data.length },
            details: [`Transaction Failed: ${e.message}`]
        }
    } finally {
        client.release()
    }
}
