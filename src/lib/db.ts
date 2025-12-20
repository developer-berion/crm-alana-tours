import { Pool } from 'pg'

// Check if running in Cloud Run (using Unix socket)
const isCloudRun = process.env.DB_HOST?.startsWith('/cloudsql/')

const pool = new Pool(isCloudRun ? {
    // Cloud Run configuration with Unix socket
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
} : {
    // Local/development configuration with TCP
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: {
        rejectUnauthorized: false
    }
})

export default pool
