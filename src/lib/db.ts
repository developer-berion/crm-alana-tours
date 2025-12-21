import { Pool, PoolConfig } from 'pg'

// Check if running in Cloud Run (using Unix socket)
const isCloudRun = process.env.DB_HOST?.startsWith('/cloudsql/')

// Validate essential environment variables
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_NAME']
const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar])

if (missingVars.length > 0) {
    console.error(`CRITICAL: Missing required environment variables: ${missingVars.join(', ')}`)
    // In production, we might want to throw, but for now we log heavily
}

console.log('Database Configuration:', {
    isCloudRun,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    // Do not log password
})

const baseConfig: PoolConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 20, // Limit maximum connections to prevent starving the DB
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 5000, // Fail if connection takes longer than 5 seconds
}

const poolConfig: PoolConfig = isCloudRun ? {
    ...baseConfig,
    // Cloud Run configuration with Unix socket
    host: process.env.DB_HOST,
} : {
    ...baseConfig,
    // Local/development configuration with TCP
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
}

console.log('Connecting with config:', {
    ...poolConfig,
    password: '***' // Hide password
})

const pool = new Pool(poolConfig)

// Don't exit process on idle client error, just log it.
// The pool will try to reconnect or create new clients as needed.
pool.on('error', (err) => {
    console.error('Unexpected error on idle client (non-fatal)', err)
})

export default pool

// Test connection on startup (non-blocking)
pool.query('SELECT NOW()')
    .then(() => console.log('✅ Database connection established successfully via ' + (isCloudRun ? 'socket' : 'TCP')))
    .catch((err) => console.error('❌ FATAL: Could not establish initial database connection:', err))