#!/usr/bin/env node

/**
 * Script de Diagnóstico: Verificar acceso a Supabase
 */

const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Cargar variables de entorno
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

console.log('🔍 Diagnóstico de Conexión a Supabase\n');
console.log('═'.repeat(50));

// Mostrar configuración (sin mostrar valores completos por seguridad)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('\n📋 Configuración detectada:');
console.log(`  URL: ${supabaseUrl || '❌ NO CONFIGURADA'}`);
console.log(`  Anon Key: ${anonKey ? ('✅ ' + anonKey.substring(0, 20) + '...') : '❌ NO CONFIGURADA'}`);
console.log(`  Service Role Key: ${serviceRoleKey ? ('✅ ' + serviceRoleKey.substring(0, 20) + '...') : '❌ NO CONFIGURADA'}`);

if (!supabaseUrl || !anonKey) {
    console.error('\n❌ Faltan credenciales de Supabase en .env.local');
    process.exit(1);
}

console.log('\n═'.repeat(50));

// Probar con Anon Key
console.log('\n🔑 Prueba 1: Usando ANON KEY\n');
const supabaseAnon = createClient(supabaseUrl, anonKey);

async function testAnonAccess() {
    const tables = ['profiles', 'agencies', 'branches'];

    for (const table of tables) {
        console.log(`  → Probando acceso a "${table}"...`);
        const { data, error, count } = await supabaseAnon
            .from(table)
            .select('*', { count: 'exact', head: false });

        if (error) {
            console.error(`    ❌ Error: ${error.message}`);
            console.error(`       Code: ${error.code}`);
            console.error(`       Details: ${error.details}`);
        } else {
            console.log(`    ✅ ${data?.length || 0} registros leídos`);
        }
    }
}

// Probar con Service Role Key (si existe)
async function testServiceRoleAccess() {
    if (!serviceRoleKey) {
        console.log('\n⏭️  Service Role Key no configurada, omitiendo prueba...\n');
        return;
    }

    console.log('\n🔑 Prueba 2: Usando SERVICE ROLE KEY\n');
    const supabaseService = createClient(supabaseUrl, serviceRoleKey);

    const tables = ['profiles', 'agencies', 'branches'];

    for (const table of tables) {
        console.log(`  → Probando acceso a "${table}"...`);
        const { data, error } = await supabaseService
            .from(table)
            .select('*');

        if (error) {
            console.error(`    ❌ Error: ${error.message}`);
        } else {
            console.log(`    ✅ ${data?.length || 0} registros leídos`);
        }
    }
}

async function main() {
    try {
        await testAnonAccess();
        await testServiceRoleAccess();

        console.log('\n═'.repeat(50));
        console.log('\n📝 Diagnóstico completado\n');
        console.log('Si ves errores de permisos, necesitas:');
        console.log('  1. Obtener el SUPABASE_SERVICE_ROLE_KEY de tu proyecto');
        console.log('  2. Agregarlo a tu .env.local');
        console.log('  3. O deshabilitar RLS policies en Supabase');
        console.log('');

    } catch (error) {
        console.error('\n❌ Error en diagnóstico:', error);
    }
}

main();
