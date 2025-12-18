# CRM Lite – Agencias de Viajes

Sistema interno de gestión de agencias y sucursales diseñado para **Alana Tours**.

## 🚀 Objetivos Alcanzados (MVP)

### 1. Gestión de Datos y CRM
- **Agencias y Sucursales**: Implementación de estructura jerárquica (Agencia > Sucursal).
- **Clasificación Comercial**: Gestión de estados de contacto, temperatura de leads y tipo de relación (Lead/Cliente).
- **Gestión de Notas**: Sistema de bitácora detallada para cada sucursal.
- **Importación Masiva**: Soporte para carga de archivos CSV y XLSX con detección de duplicados y previsualización.

### 2. Seguridad y Auditoría
- **Autenticación**: Integración con Supabase Auth y perfiles de Superadmin.
- **Recuperación de Contraseña**: Flujo personalizado mediante Supabase Edge Functions y SMTP de Hostinger.
- **Historial de Auditoría**: Registro automático de todas las operaciones de escritura (creación, edición, notas, importaciones).
- **RLS (Row Level Security)**: Protección de datos a nivel de base de datos para usuarios autenticados.

### 3. Interfaz y Experiencia (UX/UI)
- **Diseño Premium**: Interfaz moderna con tipografía Nohemi y sistema de colores corporativos.
- **Responsive**: Diseño adaptado a dispositivos móviles y escritorio.
- **Dashboard**: Resumen visual de métricas clave del negocio.

## 🛠️ Stack Tecnológico
- **Frontend**: Next.js 15+ (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Backend/Base de Datos**: Supabase (PostgreSQL).
- **Infraestructura**: Hostinger (SMTP y Hosting).

## 📋 Próximos Pasos (Post-MVP)
- Implementación de filtros avanzados en la lista de agencias.
- Reportes exportables en PDF/Excel.
- Dashboard con gráficas de rendimiento mensual.

---
© 2024 Alana Tours - Desarrollado por Berion Company.
