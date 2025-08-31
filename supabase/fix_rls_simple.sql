-- SOLUCIÓN RÁPIDA: Deshabilitar RLS temporalmente
-- Ejecutar en Supabase SQL Editor

-- Deshabilitar Row Level Security en la tabla
ALTER TABLE platform_settings DISABLE ROW LEVEL SECURITY;

-- Verificar que se deshabilitó correctamente
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'platform_settings';

-- Ahora puedes hacer operaciones normalmente
SELECT * FROM platform_settings;