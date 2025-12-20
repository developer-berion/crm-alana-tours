-- ============================================================
-- CONFIGURACIÓN FINAL POST-MIGRACIÓN
-- ============================================================

-- 1. Verificar que los datos se importaron correctamente
SELECT 'profiles' as tabla, COUNT(*) as registros FROM profiles
UNION ALL
SELECT 'agencies', COUNT(*) FROM agencies
UNION ALL
SELECT 'branches', COUNT(*) FROM branches
UNION ALL
SELECT 'agency_notes', COUNT(*) FROM agency_notes
UNION ALL
SELECT 'agency_activity_log', COUNT(*) FROM agency_activity_log;

-- 2. Ver los usuarios que existen
SELECT id, email, name, role,
       CASE WHEN password_hash IS NOT NULL 
            THEN '✅ Configurado' 
            ELSE '❌ Pendiente' 
       END as password_status
FROM profiles;

-- 3. Configurar password para el usuario
-- Hash generado con bcrypt para la contraseña: "admin123"
UPDATE profiles 
SET password_hash = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.5Q3o9O1QKGI5Oy'
WHERE password_hash IS NULL;

-- 4. Verificar que el password se configuró
SELECT id, email, name, role,
       CASE WHEN password_hash IS NOT NULL 
            THEN '✅ Configurado' 
            ELSE '❌ Pendiente' 
       END as password_status
FROM profiles;

-- 5. Ver una muestra de agencias importadas
SELECT id, name, created_at 
FROM agencies 
ORDER BY created_at DESC 
LIMIT 5;

-- 6. Ver una muestra de sucursales importadas
SELECT b.id, b.branch_name, b.email, a.name as agency_name
FROM branches b
JOIN agencies a ON a.id = b.agency_id
ORDER BY b.created_at DESC
LIMIT 5;
