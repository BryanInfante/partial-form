# ECCIA — Formulario de inscritos

Formulario estático para GitHub Pages que registra participantes en Supabase.

## Backend

El backend es Supabase:

- Proyecto: `airen`
- Tabla: `public.eccia_inscritos`
- RLS: activado
- Acceso público: solo `INSERT`
- Sin política pública de `SELECT`, `UPDATE` ni `DELETE`

## Campos

- Nombres
- Apellidos
- Cédula/DNI
- Edad
- País
- Ciudad
- Dirección
- Celular
- Correo
- Empleador opcional

## Publicación en GitHub Pages

Subí estos archivos al repositorio:

- `index.html`
- `styles.css`
- `app.js`

No requiere build. Es HTML/CSS/JS puro.

## SQL de respaldo

El archivo `supabase-eccia-inscritos.sql` documenta el esquema aplicado en Supabase.
