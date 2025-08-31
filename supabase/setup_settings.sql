-- Tabla para configuraciones de la plataforma
CREATE TABLE IF NOT EXISTS platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
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
CREATE TRIGGER update_platform_settings_updated_at 
    BEFORE UPDATE ON platform_settings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Políticas RLS (Row Level Security)
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

-- Los usuarios solo pueden ver y editar sus propias configuraciones
CREATE POLICY "Users can view their own settings" ON platform_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings" ON platform_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" ON platform_settings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own settings" ON platform_settings
    FOR DELETE USING (auth.uid() = user_id);

-- Crear configuración por defecto para cada usuario nuevo
CREATE OR REPLACE FUNCTION create_default_settings_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO platform_settings (user_id, platform_name)
  VALUES (NEW.id, 'Bourbon Web');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para crear configuración por defecto al registrar usuario
CREATE TRIGGER create_default_settings
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_default_settings_for_user();

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_platform_settings_user_id ON platform_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_platform_settings_updated_at ON platform_settings(updated_at);