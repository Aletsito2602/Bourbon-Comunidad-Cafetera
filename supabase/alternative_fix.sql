-- Alternativa: Si NO quieres eliminar la tabla existente
-- Solo agregar la columna user_email a la tabla existente

-- Ver estructura actual de la tabla
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'platform_settings';

-- Agregar la columna que falta
ALTER TABLE platform_settings ADD COLUMN IF NOT EXISTS user_email TEXT;

-- Si necesitas eliminar user_id (opcional)
-- ALTER TABLE platform_settings DROP COLUMN IF EXISTS user_id;

-- Actualizar registro existente con email de prueba
UPDATE platform_settings 
SET user_email = 'test@bourbon.com' 
WHERE user_email IS NULL;

-- Si no hay registros, insertar uno de prueba
INSERT INTO platform_settings (
  user_email, 
  platform_name, 
  team_name,
  primary_color,
  secondary_color,
  accent_color
) 
SELECT 
  'test@bourbon.com', 
  'Bourbon Web', 
  'Mi Equipo',
  '#d97706',
  '#f59e0b',
  '#92400e'
WHERE NOT EXISTS (SELECT 1 FROM platform_settings WHERE user_email = 'test@bourbon.com');

-- Verificar resultado
SELECT * FROM platform_settings;