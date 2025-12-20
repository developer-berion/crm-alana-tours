// Convertir JSON exportado a SQL INSERT statements
const fs = require('fs');

console.log('🔄 Convirtiendo JSON a SQL...\n');

const data = JSON.parse(fs.readFileSync('supabase_export_full.json', 'utf8'));

let sql = `-- ============================================================
-- IMPORTACIÓN DE DATOS: Supabase → Cloud SQL
-- Generado automáticamente
-- ============================================================

`;

// Orden correcto para respetar foreign keys
const tableOrder = ['profiles', 'agencies', 'branches', 'agency_notes', 'agency_activity_log'];

function escapeValue(value) {
    if (value === null || value === undefined) return 'NULL';
    if (typeof value === 'string') {
        // Escapar comillas simples
        const escaped = value.replace(/'/g, "''");
        return `'${escaped}'`;
    }
    if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
    if (value instanceof Date) return `'${value.toISOString()}'`;
    if (typeof value === 'object') {
        // Para objetos JSON (si existen)
        return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
    }
    return value;
}

for (const table of tableOrder) {
    const rows = data[table] || [];

    if (rows.length === 0) {
        sql += `-- Tabla: ${table} (sin datos)\n\n`;
        continue;
    }

    sql += `-- ============================================================\n`;
    sql += `-- Tabla: ${table} (${rows.length} registros)\n`;
    sql += `-- ============================================================\n\n`;

    for (const row of rows) {
        const columns = Object.keys(row);
        const values = columns.map(col => escapeValue(row[col]));

        sql += `INSERT INTO ${table} (${columns.join(', ')})\n`;
        sql += `VALUES (${values.join(', ')})\n`;
        sql += `ON CONFLICT (id) DO NOTHING;\n\n`;
    }

    sql += '\n';
}

// Agregar queries de verificación
sql += `-- ============================================================\n`;
sql += `-- VERIFICACIÓN\n`;
sql += `-- ============================================================\n\n`;
sql += `SELECT 'profiles' as tabla, COUNT(*) as registros FROM profiles\n`;
sql += `UNION ALL\n`;
sql += `SELECT 'agencies', COUNT(*) FROM agencies\n`;
sql += `UNION ALL\n`;
sql += `SELECT 'branches', COUNT(*) FROM branches\n`;
sql += `UNION ALL\n`;
sql += `SELECT 'agency_notes', COUNT(*) FROM agency_notes\n`;
sql += `UNION ALL\n`;
sql += `SELECT 'agency_activity_log', COUNT(*) FROM agency_activity_log;\n\n`;

sql += `-- Verificar usuarios\n`;
sql += `SELECT id, email, name, role,\n`;
sql += `       CASE WHEN password_hash IS NOT NULL THEN '✅ Configurado' ELSE '❌ Pendiente' END as password_status\n`;
sql += `FROM profiles;\n`;

fs.writeFileSync('import-to-cloudsql.sql', sql);

console.log('✅ Archivo SQL generado: import-to-cloudsql.sql');
console.log('\nEstadísticas:');
console.log(`  - Profiles: ${data.profiles?.length || 0} registros`);
console.log(`  - Agencies: ${data.agencies?.length || 0} registros`);
console.log(`  - Branches: ${data.branches?.length || 0} registros`);
console.log(`  - Notes: ${data.agency_notes?.length || 0} registros`);
console.log(`  - Activity Log: ${data.agency_activity_log?.length || 0} registros`);
console.log('\n📋 Próximos pasos:');
console.log('  1. Abre: https://console.cloud.google.com/sql/instances');
console.log('  2. Click en "alana-crm-db" → "Cloud SQL Studio"');
console.log('  3. Copia y pega el contenido de "import-to-cloudsql.sql"');
console.log('  4. Click en "Run" para ejecutar');
console.log('');
