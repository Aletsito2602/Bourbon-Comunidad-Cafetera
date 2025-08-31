-- Solucionar RLS en Storage para el bucket settings-assets
-- Ejecutar en Supabase SQL Editor

-- Ver las políticas actuales del storage
SELECT * FROM storage.policies WHERE bucket_id = 'settings-assets';

-- Eliminar políticas existentes que puedan estar causando problemas
DELETE FROM storage.policies WHERE bucket_id = 'settings-assets';

-- Crear políticas permisivas para desarrollo/pruebas
-- POLÍTICA 1: Permitir subir archivos a cualquiera
INSERT INTO storage.policies (id, bucket_id, policy_name, policy_definition)
VALUES (
  'settings-assets-insert',
  'settings-assets',
  'Allow public uploads',
  'ALLOW'
);

-- POLÍTICA 2: Permitir leer archivos a cualquiera (para mostrar las imágenes)
INSERT INTO storage.policies (id, bucket_id, policy_name, policy_definition) 
VALUES (
  'settings-assets-select',
  'settings-assets', 
  'Allow public downloads',
  'ALLOW'
);

-- POLÍTICA 3: Permitir actualizar archivos
INSERT INTO storage.policies (id, bucket_id, policy_name, policy_definition)
VALUES (
  'settings-assets-update',
  'settings-assets',
  'Allow public updates', 
  'ALLOW'
);

-- Verificar que se crearon las políticas
SELECT * FROM storage.policies WHERE bucket_id = 'settings-assets';