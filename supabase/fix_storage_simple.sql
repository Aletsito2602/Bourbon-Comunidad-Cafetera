-- SOLUCIÓN ALTERNATIVA MÁS SIMPLE
-- Si lo anterior no funciona, usar este enfoque

-- Ver buckets existentes
SELECT * FROM storage.buckets WHERE name = 'settings-assets';

-- Si el bucket no permite archivos públicos, actualizarlo
UPDATE storage.buckets 
SET public = true 
WHERE name = 'settings-assets';

-- Eliminar TODAS las políticas del bucket (esto lo hace completamente público)
DELETE FROM storage.policies WHERE bucket_id = 'settings-assets';

-- Verificar configuración
SELECT name, id, public FROM storage.buckets WHERE name = 'settings-assets';
SELECT COUNT(*) as policy_count FROM storage.policies WHERE bucket_id = 'settings-assets';