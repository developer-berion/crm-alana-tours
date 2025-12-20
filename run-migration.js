#!/usr/bin/env node

/**
 * Script Helper: Actualiza DB_HOST en .env.local y ejecuta migración
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const envPath = path.join(__dirname, '.env.local');
const newHost = '34.44.190.247'; // IP pública de Cloud SQL

console.log('📝 Actualizando .env.local con IP pública de Cloud SQL...\n');

try {
    // Leer .env.local
    let envContent = fs.readFileSync(envPath, 'utf8');

    // Reemplazar DB_HOST
    const oldHostMatch = envContent.match(/DB_HOST=([^\r\n]+)/);
    const oldHost = oldHostMatch ? oldHostMatch[1] : 'no encontrado';

    envContent = envContent.replace(
        /DB_HOST=([^\r\n]+)/,
        `DB_HOST=${newHost}`
    );

    // Guardar cambios
    fs.writeFileSync(envPath, envContent, 'utf8');

    console.log(`  ✅ DB_HOST actualizado`);
    console.log(`     Antes: ${oldHost}`);
    console.log(`     Ahora: ${newHost}\n`);

    console.log('═'.repeat(50));
    console.log('\n🚀 Ejecutando migración de datos...\n');
    console.log('═'.repeat(50) + '\n');

    // Ejecutar migración
    exec('node migrate-db.js', (error, stdout, stderr) => {
        console.log(stdout);
        if (stderr) console.error(stderr);

        if (error) {
            console.error(`\n❌ Error en migración: ${error.message}`);
            process.exit(1);
        }

        console.log('\n✅ Migración completada exitosamente!\n');
        process.exit(0);
    });

} catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
}
