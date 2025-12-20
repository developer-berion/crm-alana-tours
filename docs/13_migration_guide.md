# Guía de Migración Pre-Deployment

Esta guía te indica cómo preparar la base de datos Cloud SQL antes de hacer deploy del CRM sin Supabase.

---

## Requisitos Previos

- Acceso a Google Cloud Console
- Base de datos Cloud SQL (`alana-crm-db`) activa
- Acceso a un terminal con `gcloud` o usar Cloud Shell

---

## Opción A: Desde Cloud Console (Recomendado)

### 1. Abrir Cloud SQL en el navegador

1. Ve a [Cloud SQL Console](https://console.cloud.google.com/sql)
2. Selecciona tu instancia: `alana-crm-db`
3. Click en **"Cloud SQL Studio"** (barra lateral izquierda)
4. Selecciona la base de datos `crm_alana_tours`

### 2. Ejecutar los comandos SQL

Copia y pega estos comandos en Cloud SQL Studio:

```sql
-- PASO 1: Crear tabla de sesiones
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(64) PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

-- PASO 2: Agregar columna password_hash
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
```

### 3. Generar tu hash de contraseña

Ejecuta esto en tu terminal local (donde tienes Node.js):

```bash
cd c:\Users\victo\Berion Company Projects\crm-alana-tours
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('TuContraseñaAqui', 12).then(h => console.log(h));"
```

**Ejemplo de salida:**
```
$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.5Q3o9O1QKGI5Oy
```

### 4. Establecer la contraseña del usuario

De vuelta en Cloud SQL Studio, ejecuta:

```sql
-- Cambia el email y el hash por los tuyos
UPDATE profiles 
SET password_hash = '$2a$12$TU_HASH_AQUI'
WHERE email = 'victor@berion.com.ve';
```

---

## Opción B: Desde Terminal con gcloud

```bash
# Conectar a Cloud SQL
gcloud sql connect alana-crm-db --user=postgres --database=crm_alana_tours

# Luego ejecuta los comandos SQL del Paso 2 arriba
```

---

## Verificación

Ejecuta estas consultas para confirmar que todo está listo:

```sql
-- Verificar tabla sessions
SELECT table_name FROM information_schema.tables 
WHERE table_name = 'sessions';

-- Verificar columna password_hash
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'profiles' AND column_name = 'password_hash';

-- Verificar usuarios con contraseña configurada
SELECT email, name, 
       CASE WHEN password_hash IS NOT NULL THEN '✅ Listo' ELSE '❌ Pendiente' END as estado
FROM profiles;
```

---

## Después de la Migración

Una vez completados estos pasos, puedes hacer deploy:

```bash
git add .
git commit -m "feat: remove Supabase, add custom auth"
git push origin main
```

El workflow de GitHub Actions desplegará automáticamente a Cloud Run.

---

## Solución de Problemas

| Error | Solución |
|-------|----------|
| `relation "profiles" does not exist` | La tabla profiles no existe. Verifica el nombre de tu base de datos. |
| `column "password_hash" already exists` | Ya ejecutaste el comando. Puedes ignorar este error. |
| `invalid input syntax for type uuid` | El user_id en sessions debe ser UUID válido. |
| Login falla con "Credenciales inválidas" | Verifica que el hash esté correctamente copiado (sin espacios extra). |
