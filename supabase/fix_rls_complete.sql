-- SOLUCIÓN COMPLETA: Configurar RLS correctamente
-- Ejecutar en Supabase SQL Editor

-- Primero, eliminar políticas existentes que puedan estar mal configuradas
DROP POLICY IF EXISTS "Users can view their own settings" ON platform_settings;
DROP POLICY IF EXISTS "Users can insert their own settings" ON platform_settings;
DROP POLICY IF EXISTS "Users can update their own settings" ON platform_settings;
DROP POLICY IF EXISTS "Users can delete their own settings" ON platform_settings;

-- Habilitar RLS
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

-- Crear políticas más permisivas para desarrollo/pruebas
-- POLÍTICA 1: Permitir SELECT (leer) a todos los usuarios autenticados
CREATE POLICY "Allow authenticated users to read" ON platform_settings
    FOR SELECT TO authenticated
    USING (true);

-- POLÍTICA 2: Permitir INSERT (crear) a todos los usuarios autenticados
CREATE POLICY "Allow authenticated users to insert" ON platform_settings
    FOR INSERT TO authenticated
    WITH CHECK (true);

-- POLÍTICA 3: Permitir UPDATE (actualizar) a todos los usuarios autenticados
CREATE POLICY "Allow authenticated users to update" ON platform_settings
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

-- POLÍTICA 4: Permitir DELETE a todos los usuarios autenticados
CREATE POLICY "Allow authenticated users to delete" ON platform_settings
    FOR DELETE TO authenticated
    USING (true);

-- POLÍTICA 5: Para usuarios anónimos/no autenticados (si es necesario)
CREATE POLICY "Allow public read access" ON platform_settings
    FOR SELECT TO anon
    USING (true);

CREATE POLICY "Allow public insert access" ON platform_settings
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow public update access" ON platform_settings
    FOR UPDATE TO anon
    USING (true)
    WITH CHECK (true);

-- Verificar las políticas creadas
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'platform_settings';

-- Ver las políticas activas
SELECT policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'platform_settings';