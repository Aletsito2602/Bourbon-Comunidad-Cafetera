# Setup de Recetas de Café de Especialidad

## Resumen

Este documento describe cómo configurar el sistema dinámico de recetas de café de especialidad en el proyecto Bourbon Web. El sistema incluye:

- ✅ Base de datos completa con estándares SCA
- ✅ Gestión de imágenes con Supabase Storage
- ✅ Formulario completo para crear/editar recetas
- ✅ Lista dinámica con filtros avanzados
- ✅ Calculadora de extracción SCA en tiempo real
- ✅ Evaluación sensorial y cupping sessions
- ✅ Gestión de variaciones e ingredientes
- ✅ Sistema de etiquetas y favoritos

## 1. Configuración de Base de Datos (Supabase)

### Paso 1: Ejecutar Scripts SQL

Ejecuta los siguientes scripts en orden en tu dashboard de Supabase:

```bash
# 1. Schema principal
/supabase/coffee_recipes_schema.sql

# 2. Configuración de storage
/supabase/coffee_images_storage.sql

# 3. Datos de ejemplo (opcional)
/supabase/sample_coffee_recipes.sql
```

### Paso 2: Configurar Variables de Entorno

Asegúrate de que tu archivo `.env.local` contenga:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Paso 3: Verificar Row Level Security (RLS)

Las políticas RLS están configuradas para que:
- Los usuarios solo ven sus propias recetas
- Las recetas públicas son visibles para todos
- Los usuarios autenticados pueden subir imágenes a su carpeta

## 2. Estructura del Proyecto

### Archivos Creados

```
src/
├── types/
│   └── coffee.ts              # Tipos TypeScript para recetas
├── lib/
│   └── coffee-service.ts      # Servicio para CRUD y utilidades
└── components/
    └── coffee/
        ├── CoffeeRecipesManager.tsx     # Componente principal
        ├── CoffeeRecipesList.tsx        # Lista con filtros
        ├── CoffeeRecipeForm.tsx         # Formulario completo
        └── SCAExtractionCalculator.tsx  # Calculadora SCA
```

### Integración con Dashboard

El sistema está integrado en `Dashboard.tsx` bajo el case `'recetas'`.

## 3. Funcionalidades Implementadas

### 3.1 Gestión de Recetas

**Crear Nueva Receta:**
- Formulario completo con validación
- Subida de imágenes
- Cálculos automáticos (ratio, extracción, SCA score)
- Gestión de ingredientes adicionales
- Sistema de etiquetas

**Editar Receta:**
- Pre-carga de todos los datos existentes
- Mantiene imágenes y relaciones
- Actualización en tiempo real

**Eliminar Receta:**
- Eliminación cascada de relaciones
- Limpieza automática de imágenes

### 3.2 Sistema de Filtros

- **Búsqueda por texto:** nombre, origen, notas de cata
- **Método de preparación:** Espresso, V60, Aeropress, etc.
- **Nivel de tueste:** Light, Medium, Dark, etc.
- **Puntuación SCA:** rango mínimo/máximo
- **Dificultad:** 1-5 estrellas
- **Solo favoritas:** checkbox

### 3.3 Evaluación SCA

**Métricas Técnicas:**
- TDS (Total Dissolved Solids)
- Extracción yield (%)
- Fuerza de la bebida
- Ratio agua:café

**Evaluación Sensorial (0-10):**
- Fragancia/Aroma
- Sabor
- Retrogusto
- Acidez
- Cuerpo
- Balance

**Métricas Binarias (0-10):**
- Uniformidad
- Taza Limpia
- Dulzor

### 3.4 Calculadora de Extracción

- Cálculos en tiempo real
- Recomendaciones automáticas
- Visualización del estado (óptimo/sub-extraído/sobre-extraído)
- Rangos específicos por método de preparación
- Gráficos visuales de estado

### 3.5 Sistema de Imágenes

- Subida a Supabase Storage
- Redimensionamiento automático
- Limpieza de imágenes huérfanas
- Preview en tiempo real
- Organización por usuario

## 4. Estructura de Base de Datos

### Tablas Principales

**coffee_recipes**
- Información básica y parámetros de preparación
- Métricas SCA y evaluación sensorial
- Costos y configuración

**recipe_variations**
- Variaciones y ajustes de recetas existentes
- Comparación de resultados

**recipe_ingredients**
- Ingredientes adicionales (leche, syrups, etc.)
- Cantidades y unidades

**recipe_tags**
- Sistema de etiquetado flexible
- Búsqueda y categorización

**cupping_sessions**
- Sesiones de degustación profesional
- Ambiente y condiciones

**cupping_evaluations**
- Evaluaciones SCA detalladas
- Defects tracking

### Vistas y Funciones

**recipe_summary (VIEW)**
- Datos combinados con cálculos automáticos
- Información de etiquetas e ingredientes

**Funciones de Cálculo:**
- `calculate_brew_ratio()`
- `calculate_sca_score()`
- `get_recipe_image_url()`

## 5. Uso del Sistema

### Para Usuarios Finales

1. **Crear Primera Receta:**
   - Ir a "Recetas" en el sidebar
   - Hacer clic en "Nueva Receta"
   - Completar información básica y parámetros
   - Subir imagen de la bebida
   - Guardar

2. **Usar Calculadora:**
   - Ingresar parámetros de preparación
   - Ver cálculos en tiempo real
   - Seguir recomendaciones de ajuste

3. **Gestionar Colección:**
   - Marcar favoritas
   - Filtrar por método/origen
   - Buscar por notas de cata
   - Crear variaciones

### Para Desarrolladores

```typescript
// Obtener todas las recetas
const recipes = await CoffeeRecipeService.getAllRecipes();

// Crear nueva receta
const newRecipe = await CoffeeRecipeService.createRecipe({
  name: "Mi Espresso",
  brewing_method: "Espresso",
  coffee_dose: 18.5,
  // ... otros parámetros
});

// Calcular métricas
const ratio = CoffeeRecipeService.calculateBrewRatio(18.5, 37);
const extraction = CoffeeRecipeService.calculateExtractionYield(18.5, 37, 10.8);
```

## 6. Estándares SCA Implementados

### Rangos de Extracción
- **Óptimo:** 18-22%
- **Sub-extraído:** < 18%
- **Sobre-extraído:** > 22%

### Rangos de Fuerza
**Espresso:**
- **Ideal:** 8-12%
- **Débil:** < 8%
- **Fuerte:** > 12%

**Pour Over/Filtro:**
- **Ideal:** 1.15-1.45%
- **Débil:** < 1.15%
- **Fuerte:** > 1.45%

### Puntuación SCA
- **Specialty Coffee:** 80-100 puntos
- **Premium Coffee:** 60-79 puntos
- **Commercial Coffee:** < 60 puntos

## 7. Próximos Pasos Sugeridos

1. **Análisis y Reportes:**
   - Dashboard de estadísticas
   - Gráficos de evolución
   - Comparativas entre recetas

2. **Comunidad:**
   - Compartir recetas públicas
   - Sistema de ratings
   - Comentarios y discusiones

3. **Integración con Hardware:**
   - Conectar con básculas inteligentes
   - Logging automático de TDS
   - Timer integrado

4. **Exportación:**
   - Exportar recetas a PDF
   - QR codes para compartir
   - Backup de datos

## 8. Mantenimiento

### Limpieza de Imágenes

Ejecutar periódicamente:
```sql
SELECT cleanup_orphaned_recipe_images();
```

### Backup de Datos

Las recetas contienen información valiosa. Considera:
- Backup automático de Supabase
- Exportación periódica a JSON
- Versionado de esquemas

### Monitoreo

Métricas importantes:
- Número de recetas por usuario
- Uso de storage para imágenes
- Consultas más frecuentes
- Errores de subida de archivos

---

## Resumen Técnico

Este sistema transforma la sección estática de recetas en una plataforma completa de gestión de café de especialidad, siguiendo estándares de la industria (SCA) y proporcionando herramientas profesionales para baristas y cafeterías.

**Base de datos:** Supabase PostgreSQL con RLS
**Frontend:** React + TypeScript + Tailwind CSS
**Estado:** React hooks y context
**Validación:** React Hook Form + Zod
**Storage:** Supabase Storage con políticas de seguridad

La implementación está lista para producción y puede escalarse fácilmente.