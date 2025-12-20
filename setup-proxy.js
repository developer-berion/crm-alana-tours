// Script para actualizar .env.local y reiniciar con Cloud SQL Proxy
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

console.log('🔧 Actualizando configuración para usar Cloud SQL Proxy...\n');

try {
    // Leer .env.local
    let envContent = fs.readFileSync(envPath, 'utf8');

    // Reemplazar DB_HOST
    const oldHostMatch = envContent.match(/DB_HOST=([^\r\n]+)/);
    const oldHost = oldHostMatch ? oldHostMatch[1] : 'no encontrado';

    envContent = envContent.replace(
        /DB_HOST=([^\r\n]+)/,
        'DB_HOST=127.0.0.1'
    );

    // Guardar cambios
    fs.writeFileSync(envPath, envContent, 'utf8');

    console.log('✅ DB_HOST actualizado');
    console.log(`   Antes: ${oldHost}`);
    console.log(`   Ahora: 127.0.0.1 (Cloud SQL Proxy)\n`);

    console.log('═'.repeat(50));
    console.log('\n📋 Próximos pasos:\n');
    console.log('1. En una TERMINAL SEPARADA, ejecuta:');
    console.log('   cd "c:\\Users\\victo\\Berion Company Projects\\crm-alana-tours"');
    console.log('   .\\cloud_sql_proxy.exe alana-crm:us-central1:alana-crm-db\n');
    console.log('2. Cuando veas "Ready for new connections", presiona Ctrl+C aquí');
    console.log('3. Ejecuta: npm run dev\n');
    console.log('4. Abre http://localhost:3000/login y prueba login\n');
    console.log('═'.repeat(50));
    console.log('');

} catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
}
