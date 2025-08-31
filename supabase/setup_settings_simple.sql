-- Versión simplificada sin dependencias de auth.users
-- Para usar temporalmente mientras configuras la autenticación

-- Tabla para configuraciones de la plataforma (versión simplificada)
CREATE TABLE IF NOT EXISTS platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT, -- Usaremos email como identificador temporal
  
  -- Configuración de plataforma
  platform_name TEXT DEFAULT 'Bourbon Web',
  platform_logo_url TEXT,
  primary_color TEXT DEFAULT '#d97706', -- amber-600
  secondary_color TEXT DEFAULT '#f59e0b', -- amber-500
  accent_color TEXT DEFAULT '#92400e', -- amber-700
  
  -- Configuración de cafetería
  coffee_shop_name TEXT,
  coffee_shop_logo_url TEXT,
  coffee_shop_address TEXT,
  coffee_shop_phone TEXT,
  coffee_shop_email TEXT,
  coffee_shop_description TEXT,
  team_name TEXT DEFAULT 'Mi Equipo',
  
  -- Configuración de facturación
  currency TEXT DEFAULT 'USD',
  tax_rate DECIMAL(5,4) DEFAULT 0.21, -- 21% IVA por defecto
  invoice_prefix TEXT DEFAULT 'INV',
  invoice_counter INTEGER DEFAULT 1000,
  business_tax_id TEXT,
  billing_address TEXT,
  
  -- Configuración adicional
  timezone TEXT DEFAULT 'UTC',
  language TEXT DEFAULT 'es',
  theme TEXT DEFAULT 'light',
  
  -- Metadatos
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at en platform_settings
DROP TRIGGER IF EXISTS update_platform_settings_updated_at ON platform_settings;
CREATE TRIGGER update_platform_settings_updated_at 
    BEFORE UPDATE ON platform_settings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_platform_settings_user_email ON platform_settings(user_email);
CREATE INDEX IF NOT EXISTS idx_platform_settings_updated_at ON platform_settings(updated_at);

-- Insertar configuración de prueba (opcional)
INSERT INTO platform_settings (user_email, platform_name, team_name)
VALUES ('test@bourbon.com', 'Bourbon Web', 'Mi Equipo')
ON CONFLICT DO NOTHING;