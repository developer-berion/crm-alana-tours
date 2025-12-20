// Quick script to check user email from Cloud SQL
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: { rejectUnauthorized: false }
});

async function checkUser() {
    try {
        console.log('📊 Consultando usuario en Cloud SQL...\n');

        const result = await pool.query(`
            SELECT id, email, name, role,
                   CASE WHEN password_hash IS NOT NULL THEN '✅ Configurado' ELSE '❌ Pendiente' END as password_status
            FROM profiles
        `);

        if (result.rows.length === 0) {
            console.log('❌ No se encontraron usuarios en la tabla profiles');
        } else {
            console.log('Usuario encontrado:');
            console.table(result.rows);
            console.log('\n📋 Información para login:');
            console.log(`  Email: ${result.rows[0].email}`);
            console.log(`  Password: admin123 (si password_status = ✅)`);
        }

        await pool.end();
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

checkUser();
