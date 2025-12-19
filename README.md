# CRM Lite – Agencias de Viajes

Sistema interno de gestión de agencias y sucursales diseñado para **Alana Tours**.

## 🚀 Objetivos Alcanzados (MVP)

### 1. Gestión de Datos y CRM
- **Agencias y Sucursales**: Implementación de estructura jerárquica (Agencia > Sucursal).
- **Vista de Agencias Mejorada**:
  - Lista interactiva estilo CRM escalable.
  - **Filtros y Ordenamiento**: Filtrado por Estado y Temperatura, búsqueda por texto y ordenamiento por Fecha de Ingreso.
  - **Columnas Informativas**: Nuevos campos visuales para "Ciudad" y "N° de Sucursales".
- **Soporte Multi-Teléfono**: Capacidad para gestionar múltiples números de contacto por agencia y sucursal.
- **Ubicaciones Dinámicas**: Selección inteligente de País y Estado/Departamento mediante utilitarios centralizados.
- **Clasificación Comercial**: Gestión de estados de contacto, temperatura de leads y tipo de relación (Lead/Cliente).
- **Gestión de Notas**: Sistema de bitácora detallada para cada sucursal.
- **Importación Masiva**: Soporte para carga de archivos CSV y XLSX con detección de duplicados y previsualización.

### 2. Seguridad, Auditoría e Infraestructura
- **Autenticación**: Integración con Supabase Auth y perfiles de Superadmin.
- **Recuperación de Contraseña**: Flujo personalizado mediante Supabase Edge Functions y SMTP de Hostinger.
- **Historial de Auditoría**: Registro automático de todas las operaciones de escritura (creación, edición, notas, importaciones).
- **RLS (Row Level Security)**: Protección de datos a nivel de base de datos para usuarios autenticados.
- **CI/CD**: Integración completa con Vercel para despliegues automáticos desde GitHub.

### 3. Interfaz y Experiencia (UX/UI)
- **Branding Alana Tours**: Identidad corporativa completa con logotipos oficiales y sistema de colores.
- **Diseño Premium**: Interfaz moderna con tipografía Nohemi y micro-animaciones profesionales.
- **Responsive**: Diseño adaptado a dispositivos móviles y escritorio.
- **Dashboard**: Resumen visual de métricas clave del negocio.

## 🛠️ Stack Tecnológico
- **Frontend**: Next.js 15+ (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Backend/Base de Datos**: Supabase (PostgreSQL).
- **Infraestructura**: Vercel (Hosting), GitHub (CI/CD), Hostinger (SMTP).

## 📋 Próximos Pasos (Post-MVP)
- Reportes exportables en PDF/Excel.
- Dashboard con gráficas de rendimiento mensual.
- Sistema de notificaciones en tiempo real.

---
© 2024 Alana Tours - Desarrollado por Berion Company.
