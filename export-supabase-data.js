// Script simplificado para exportar datos de Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

console.log('📦 Exportando datos desde Supabase...\n');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function exportData() {
    const tables = ['profiles', 'agencies', 'branches', 'agency_notes', 'agency_activity_log'];
    const data = {};

    for (const table of tables) {
        console.log(`  → Exportando ${table}...`);
        const { data: rows, error } = await supabase.from(table).select('*');

        if (error) {
            console.error(`    ❌ Error:`, error.message);
            data[table] = [];
        } else {
            data[table] = rows;
            console.log(`    ✅ ${rows.length} registros`);
        }
    }

    // Guardar JSON completo
    fs.writeFileSync('supabase_export_full.json', JSON.stringify(data, null, 2));
    console.log('\n✅ Datos exportados a: supabase_export_full.json');
    console.log('\nResumen:');
    console.log(`  - Profiles: ${data.profiles?.length || 0}`);
    console.log(`  - Agencies: ${data.agencies?.length || 0}`);
    console.log(`  - Branches: ${data.branches?.length || 0}`);
    console.log(`  - Notes: ${data.agency_notes?.length || 0}`);
    console.log(`  - Activity Log: ${data.agency_activity_log?.length || 0}`);
}

exportData().catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
});
