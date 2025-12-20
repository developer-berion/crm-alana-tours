#!/usr/bin/env node

/**
 * Script de Migración: Supabase → Google Cloud SQL
 * 
 * Este script:
 * 1. Exporta el esquema desde Supabase
 * 2. Exporta todos los datos
 * 3. Importa el esquema a Cloud SQL
 * 4. Importa los datos a Cloud SQL
 */

const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Cargar variables de entorno
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

console.log('🔧 Verificando configuración...');
console.log('  Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌');
console.log('  Cloud SQL Host:', process.env.DB_HOST || '❌ NO CONFIGURADO');
console.log('  Cloud SQL User:', process.env.DB_USER || '❌ NO CONFIGURADO');
console.log('  Cloud SQL DB:', process.env.DB_NAME || '❌ NO CONFIGURADO');
console.log('');

// Configuración Supabase (ORIGEN)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Preferir Service Role Key para bypass de RLS policies
const supabaseKey = supabaseServiceKey || supabaseAnonKey;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Faltan credenciales de Supabase en .env.local');
    console.error('   Necesitas: NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY (o ANON_KEY)');
    process.exit(1);
}

if (supabaseServiceKey) {
    console.log('  ✅ Usando SERVICE ROLE KEY (bypass RLS)');
} else {
    console.log('  ⚠️  Usando ANON KEY (puede estar limitado por RLS)');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Configuración Cloud SQL (DESTINO)
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.error('❌ Faltan credenciales de Cloud SQL en .env.local');
    console.error('   Asegúrate de tener: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
    process.exit(1);
}

const cloudSqlPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: { rejectUnauthorized: false }
});

const TABLES = ['profiles', 'agencies', 'branches', 'agency_notes', 'agency_activity_log'];

async function exportFromSupabase() {
    console.log('📦 Exportando datos desde Supabase...\n');

    const exportData = {};

    for (const table of TABLES) {
        console.log(`  → Exportando tabla: ${table}`);
        const { data, error } = await supabase.from(table).select('*');

        if (error) {
            console.error(`    ❌ Error en ${table}:`, error.message);
            exportData[table] = [];
        } else {
            exportData[table] = data || [];
            console.log(`    ✅ ${data?.length || 0} registros exportados`);
        }
    }

    // Guardar backup
    fs.writeFileSync(
        'supabase_backup.json',
        JSON.stringify(exportData, null, 2)
    );

    console.log('\n💾 Backup guardado en: supabase_backup.json\n');
    return exportData;
}

async function createSchemaInCloudSQL() {
    console.log('🏗️  Creando esquema en Cloud SQL...\n');

    const schema = `
    -- Tabla de perfiles (usuarios)
    CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        password_hash VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    -- Tabla de agencias
    CREATE TABLE IF NOT EXISTS agencies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    -- Tabla de sucursales
    CREATE TABLE IF NOT EXISTS branches (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
        branch_name VARCHAR(255) NOT NULL,
        contact_name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(255),
        country VARCHAR(100),
        state VARCHAR(100),
        city VARCHAR(100),
        address TEXT,
        google_maps_url TEXT,
        instagram_url TEXT,
        tiktok_url TEXT,
        facebook_url TEXT,
        website_url TEXT,
        contact_status VARCHAR(50) DEFAULT 'not_contacted',
        lead_temperature VARCHAR(50) DEFAULT 'cold',
        relationship_type VARCHAR(50) DEFAULT 'lead',
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    -- Tabla de notas
    CREATE TABLE IF NOT EXISTS agency_notes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_by UUID REFERENCES profiles(id),
        archived BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

    -- Tabla de actividad
    CREATE TABLE IF NOT EXISTS agency_activity_log (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
        user_id UUID REFERENCES profiles(id),
        action_type VARCHAR(50),
        field_name VARCHAR(100),
        old_value TEXT,
        new_value TEXT,
        created_at TIMESTAMP DEFAULT NOW()
    );

    -- Tabla de sesiones (nueva para auth custom)
    CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(64) PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );

    -- Índices
    CREATE INDEX IF NOT EXISTS idx_branches_agency_id ON branches(agency_id);
    CREATE INDEX IF NOT EXISTS idx_notes_branch_id ON agency_notes(branch_id);
    CREATE INDEX IF NOT EXISTS idx_activity_branch_id ON agency_activity_log(branch_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
    `;

    await cloudSqlPool.query(schema);
    console.log('✅ Esquema creado exitosamente\n');
}

async function importToCloudSQL(data) {
    console.log('📥 Importando datos a Cloud SQL...\n');

    for (const table of TABLES) {
        const records = data[table] || [];

        if (records.length === 0) {
            console.log(`  ⏭️  ${table}: Sin datos para importar`);
            continue;
        }

        console.log(`  → Importando ${records.length} registros a ${table}`);

        for (const record of records) {
            const columns = Object.keys(record).join(', ');
            const values = Object.values(record);
            const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

            const query = `
                INSERT INTO ${table} (${columns})
                VALUES (${placeholders})
                ON CONFLICT (id) DO NOTHING
            `;

            try {
                await cloudSqlPool.query(query, values);
            } catch (err) {
                console.error(`    ⚠️  Error en registro:`, err.message);
            }
        }

        console.log(`    ✅ ${table} importado`);
    }

    console.log('\n✅ Migración completada!\n');
}

async function verifyMigration() {
    console.log('🔍 Verificando migración...\n');

    for (const table of TABLES) {
        const result = await cloudSqlPool.query(`SELECT COUNT(*) FROM ${table}`);
        console.log(`  ${table}: ${result.rows[0].count} registros`);
    }

    console.log('');
}

async function main() {
    console.log('🚀 Iniciando migración Supabase → Cloud SQL\n');
    console.log('═'.repeat(50) + '\n');

    try {
        // Paso 1: Exportar desde Supabase
        const data = await exportFromSupabase();

        // Paso 2: Crear esquema en Cloud SQL
        await createSchemaInCloudSQL();

        // Paso 3: Importar datos
        await importToCloudSQL(data);

        // Paso 4: Verificar
        await verifyMigration();

        console.log('═'.repeat(50));
        console.log('✅ MIGRACIÓN COMPLETADA EXITOSAMENTE');
        console.log('═'.repeat(50) + '\n');

        console.log('📋 Próximos pasos:');
        console.log('  1. Actualiza tu .env.local con las credenciales de Cloud SQL');
        console.log('  2. Reinicia el servidor: npm run dev');
        console.log('  3. Prueba el login con tus credenciales');
        console.log('');

    } catch (error) {
        console.error('\n❌ Error en la migración:', error);
        process.exit(1);
    } finally {
        await cloudSqlPool.end();
    }
}

main();
