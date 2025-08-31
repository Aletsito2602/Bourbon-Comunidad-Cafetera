# Sistema de Configuración Dinámico - Bourbon Web

Este sistema permite personalizar completamente la plataforma con configuraciones dinámicas almacenadas en Supabase.

## 🎯 Características Implementadas

### ✅ Configuración de Plataforma
- **Personalización visual**: Cambio dinámico de paleta de colores
- **Logo personalizable**: Subida de logo para el sidebar
- **Branding**: Nombre personalizable de la plataforma y equipo

### ✅ Configuración de Cafetería
- **Información del negocio**: Nombre, dirección, teléfono, email
- **Logo de cafetería**: Para cartas digitales y facturación
- **Descripción**: Texto promocional del negocio

### ✅ Configuración de Facturación
- **Sistema monetario**: Múltiples monedas soportadas
- **Impuestos**: Configuración de tasas de IVA/IGV
- **Numeración**: Prefijos y contadores automáticos para facturas
- **Datos fiscales**: NIT, RUT, dirección fiscal

## 🚀 Configuración Inicial

### 1. Base de Datos
Ejecutar el script SQL en Supabase:
```bash
# El archivo está en: ./supabase/setup_settings.sql
```

### 2. Storage (Opcional)
Para subir imágenes, crear un bucket en Supabase Storage:
- Nombre: `settings-assets`
- Público: Sí
- Políticas RLS: Configurar para que usuarios solo accedan a sus archivos

### 3. Variables de Entorno
Asegurar que estén configuradas:
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

## 📱 Cómo Usar

### Acceder a Configuraciones
1. Ingresar a la aplicación
2. Navegar a "Ajustes" en el sidebar
3. Usar las pestañas: Plataforma, Cafetería, Facturación

### Personalizar Colores
1. **Presets predefinidos**: Hacer clic en cualquier preset de color
2. **Colores personalizados**: Usar los selectores de color o ingresar códigos hex
3. **Vista previa**: Los cambios se aplican inmediatamente

### Subir Logos
1. **Logo de plataforma**: Aparece en el sidebar
2. **Logo de cafetería**: Para cartas y facturas
3. Formatos soportados: PNG, JPG, SVG
4. Tamaño recomendado: 200x200px (plataforma), 300x300px (cafetería)

## 🎨 Sistema de Colores Dinámicos

Los colores se aplican automáticamente usando CSS custom properties:

```css
:root {
  --primary-color: #d97706;    /* Color principal */
  --secondary-color: #f59e0b;  /* Color secundario */  
  --accent-color: #92400e;     /* Color de acento */
}
```

### Clases CSS Disponibles
- `.dynamic-primary-bg` - Fondo con color primario
- `.dynamic-primary-text` - Texto con color primario
- `.dynamic-secondary-bg` - Fondo con color secundario
- `.dynamic-accent-bg` - Fondo con color de acento

## 🏗️ Arquitectura del Sistema

### Componentes Principales
```
src/
├── components/
│   ├── Settings.tsx                 # Página principal con tabs
│   └── settings/
│       ├── PlatformSettings.tsx     # Config de plataforma
│       ├── CoffeeshopSettings.tsx   # Config de cafetería
│       └── BillingSettings.tsx      # Config de facturación
├── contexts/
│   └── SettingsContext.tsx          # Context para estado global
├── lib/
│   └── settings.ts                  # Service para API de Supabase
└── components/ui/
    └── tabs.tsx                     # Componente de pestañas
```

### Base de Datos
```sql
platform_settings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  platform_name TEXT,
  platform_logo_url TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  accent_color TEXT,
  coffee_shop_name TEXT,
  coffee_shop_logo_url TEXT,
  coffee_shop_address TEXT,
  coffee_shop_phone TEXT,
  coffee_shop_email TEXT,
  coffee_shop_description TEXT,
  team_name TEXT,
  currency TEXT,
  tax_rate DECIMAL(5,4),
  invoice_prefix TEXT,
  invoice_counter INTEGER,
  business_tax_id TEXT,
  billing_address TEXT,
  timezone TEXT,
  language TEXT,
  theme TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

## 🔧 Extensibilidad

### Agregar Nuevos Campos
1. Actualizar el esquema de `PlatformSettings` en `src/lib/settings.ts`
2. Agregar campos a la migración SQL
3. Actualizar los componentes de configuración correspondientes
4. Aplicar estilos en `SettingsContext.tsx` si es necesario

### Agregar Nuevas Pestañas
1. Crear nuevo componente en `src/components/settings/`
2. Importar y agregar en `Settings.tsx`
3. Agregar nueva pestaña en el `TabsList`

## 📝 Notas Técnicas

- **RLS**: Row Level Security habilitado - usuarios solo ven sus configuraciones
- **Triggers**: Actualizan `updated_at` automáticamente
- **Valores por defecto**: Se crean automáticamente para nuevos usuarios
- **Contexto React**: Estado global reactivo para cambios en tiempo real
- **CSS Variables**: Aplicación automática de colores personalizados

## 🎯 Próximas Mejoras Sugeridas

1. **Temas predefinidos**: Dark mode, modo alto contraste
2. **Más campos de personalización**: Fuentes, espaciado, bordes
3. **Backup/Restore**: Exportar e importar configuraciones
4. **Previsualización avanzada**: Vista previa completa de la interfaz
5. **Configuraciones por rol**: Diferentes configuraciones según usuario

---

¡El sistema está listo para usar! 🚀