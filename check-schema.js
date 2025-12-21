const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '5432'),
});

async function checkSchema() {
    try {
        console.log('Checking sessions table indexes...');
        const result = await pool.query(`
            SELECT indexname, indexdef 
            FROM pg_indexes 
            WHERE tablename = 'sessions';
        `);
        console.table(result.rows);
        await pool.end();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkSchema();
