-- Script para arreglar la tabla platform_settings existente
-- Ejecutar en Supabase SQL Editor

-- Opción 1: Si quieres mantener la estructura original con user_id
-- Primero eliminar la tabla existente (si está vacía o no te importa perder datos)
DROP TABLE IF EXISTS platform_settings CASCADE;

-- Crear tabla con estructura correcta
CREATE TABLE platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT, -- Usamos email temporal en lugar de user_id
  
  -- Configuración de plataforma
  platform_name TEXT DEFAULT 'Bourbon Web',
  platform_logo_url TEXT,
  primary_color TEXT DEFAULT '#d97706',
  secondary_color TEXT DEFAULT '#f59e0b',
  accent_color TEXT DEFAULT '#92400e',
  
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
  tax_rate DECIMAL(5,4) DEFAULT 0.21,
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

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para updated_at
CREATE TRIGGER update_platform_settings_updated_at 
    BEFORE UPDATE ON platform_settings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar configuración de prueba
INSERT INTO platform_settings (
  user_email, 
  platform_name, 
  team_name,
  primary_color,
  secondary_color,
  accent_color
) VALUES (
  'test@bourbon.com', 
  'Bourbon Web', 
  'Mi Equipo',
  '#d97706',
  '#f59e0b',
  '#92400e'
);

-- Verificar que todo funciona
SELECT * FROM platform_settings;