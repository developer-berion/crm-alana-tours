-- ============================================================
-- MIGRACIÓN MANUAL: Supabase → Cloud SQL
-- Ejecutar en Cloud SQL Studio (console.cloud.google.com/sql)
-- ============================================================

-- PASO 1: Crear el esquema completo
-- ============================================================

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

-- ============================================================
-- PASO 2: Crear índices
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_branches_agency_id ON branches(agency_id);
CREATE INDEX IF NOT EXISTS idx_notes_branch_id ON agency_notes(branch_id);
CREATE INDEX IF NOT EXISTS idx_activity_branch_id ON agency_activity_log(branch_id);
DROP INDEX IF EXISTS idx_sessions_user_id;
CREATE UNIQUE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

-- ============================================================
-- PASO 3: Crear usuario de prueba
-- ============================================================

-- Insertar un usuario de prueba (contraseña: "admin123")
-- Hash generado con bcrypt.hash('admin123', 12)
INSERT INTO profiles (name, email, role, password_hash)
VALUES (
    'Victor Berion',
    'victor@berion.com.ve',
    'admin',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.5Q3o9O1QKGI5Oy'
)
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- VERIFICACIÓN
-- ============================================================

-- Ver todas las tablas creadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Verificar que el usuario existe
SELECT id, name, email, role,
       CASE WHEN password_hash IS NOT NULL THEN '✅ Configurado' ELSE '❌ Pendiente' END as password_status
FROM profiles;

-- Contar registros en cada tabla
SELECT 
  'profiles' as tabla, COUNT(*) as registros FROM profiles
UNION ALL
SELECT 'agencies', COUNT(*) FROM agencies
UNION ALL
SELECT 'branches', COUNT(*) FROM branches
UNION ALL
SELECT 'agency_notes', COUNT(*) FROM agency_notes
UNION ALL
SELECT 'agency_activity_log', COUNT(*) FROM agency_activity_log
UNION ALL
SELECT 'sessions', COUNT(*) FROM sessions;
