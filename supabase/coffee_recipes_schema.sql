-- ================================
-- ESQUEMA DE BASE DE DATOS PARA RECETAS DE CAFÉ DE ESPECIALIDAD
-- Basado en estándares SCA (Specialty Coffee Association)
-- ================================

-- Tabla principal para recetas de café
CREATE TABLE IF NOT EXISTS coffee_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Información básica de la receta
  name TEXT NOT NULL,
  description TEXT,
  origin TEXT, -- Brasil Santos, Colombia Huila, etc.
  process TEXT, -- Natural, Washed, Honey, etc.
  altitude INTEGER, -- Altitud en metros
  roast_level TEXT, -- Light, Medium, Dark
  roast_date DATE,
  
  -- Método de preparación
  brewing_method TEXT NOT NULL, -- Espresso, V60, Aeropress, French Press, etc.
  brewing_technique TEXT, -- Invertido, Standard, etc.
  
  -- Parámetros de extracción
  coffee_dose DECIMAL(5,2) NOT NULL, -- Gramos de café
  water_amount DECIMAL(7,2), -- Gramos o ml de agua
  extraction_time INTEGER, -- Tiempo en segundos
  water_temperature DECIMAL(4,1), -- Temperatura en °C
  grind_size TEXT, -- Fine, Medium, Coarse, etc.
  grind_setting INTEGER, -- Setting específico del molino
  pressure DECIMAL(4,1), -- Presión en bares (para espresso)
  
  -- Métricas SCA
  tds DECIMAL(4,2), -- Total Dissolved Solids en %
  extraction_yield DECIMAL(4,2), -- Porcentaje de extracción
  strength DECIMAL(4,2), -- Fuerza de la bebida
  
  -- Evaluación sensorial (SCA Cupping Form)
  fragrance_aroma DECIMAL(3,2), -- 0-10 puntos
  flavor DECIMAL(3,2), -- 0-10 puntos
  aftertaste DECIMAL(3,2), -- 0-10 puntos
  acidity DECIMAL(3,2), -- 0-10 puntos
  body DECIMAL(3,2), -- 0-10 puntos
  balance DECIMAL(3,2), -- 0-10 puntos
  uniformity DECIMAL(3,2), -- 0-10 puntos
  clean_cup DECIMAL(3,2), -- 0-10 puntos
  sweetness DECIMAL(3,2), -- 0-10 puntos
  overall_score DECIMAL(4,2), -- Puntuación total SCA (0-100)
  
  -- Notas de cata y protocolo
  tasting_notes TEXT, -- Descriptores de sabor
  brewing_protocol TEXT, -- Descripción detallada del proceso
  cupping_notes TEXT, -- Notas adicionales del cupping
  
  -- Costos y rentabilidad
  coffee_cost DECIMAL(6,2), -- Costo del café por porción
  total_cost DECIMAL(6,2), -- Costo total por bebida
  suggested_price DECIMAL(6,2), -- Precio sugerido de venta
  
  -- Imagen de la bebida
  image_url TEXT,
  
  -- Configuración y favoritos
  is_favorite BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT FALSE, -- Para compartir con la comunidad
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5), -- 1=Fácil, 5=Experto
  
  -- Metadatos
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_brewed_at TIMESTAMPTZ,
  brew_count INTEGER DEFAULT 0 -- Contador de veces que se ha preparado
);

-- Tabla para variaciones y ajustes de recetas
CREATE TABLE IF NOT EXISTS recipe_variations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID REFERENCES coffee_recipes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Nombre de la variación
  variation_name TEXT NOT NULL,
  notes TEXT,
  
  -- Parámetros modificados
  coffee_dose DECIMAL(5,2),
  water_amount DECIMAL(7,2),
  extraction_time INTEGER,
  water_temperature DECIMAL(4,1),
  grind_size TEXT,
  tds DECIMAL(4,2),
  extraction_yield DECIMAL(4,2),
  
  -- Evaluación de la variación
  overall_score DECIMAL(4,2),
  improvement_notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla para ingredientes adicionales y acompañamientos
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID REFERENCES coffee_recipes(id) ON DELETE CASCADE,
  
  ingredient_name TEXT NOT NULL,
  ingredient_type TEXT, -- Syrup, Milk, Spice, etc.
  amount DECIMAL(6,2),
  unit TEXT, -- ml, g, tsp, etc.
  optional BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla para etiquetas y categorización
CREATE TABLE IF NOT EXISTS recipe_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID REFERENCES coffee_recipes(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(recipe_id, tag)
);

-- Tabla para sesiones de degustación
CREATE TABLE IF NOT EXISTS cupping_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  session_name TEXT NOT NULL,
  session_date DATE DEFAULT CURRENT_DATE,
  cupper_name TEXT,
  environment_notes TEXT, -- Temperatura ambiente, humedad, etc.
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla para evaluaciones en sesiones de cupping
CREATE TABLE IF NOT EXISTS cupping_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cupping_session_id UUID REFERENCES cupping_sessions(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES coffee_recipes(id) ON DELETE CASCADE,
  
  -- Evaluación SCA detallada
  dry_fragrance DECIMAL(3,2),
  wet_aroma DECIMAL(3,2),
  brightness DECIMAL(3,2),
  flavor DECIMAL(3,2),
  aftertaste DECIMAL(3,2),
  acidity DECIMAL(3,2),
  body DECIMAL(3,2),
  balance DECIMAL(3,2),
  uniformity INTEGER, -- 0-10 (puntos enteros)
  clean_cup INTEGER, -- 0-10 (puntos enteros)
  sweetness INTEGER, -- 0-10 (puntos enteros)
  overall_impression DECIMAL(3,2),
  final_score DECIMAL(4,2),
  
  -- Defects
  taint INTEGER DEFAULT 0, -- 0-4
  fault INTEGER DEFAULT 0, -- 0-4
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================
-- FUNCIONES Y TRIGGERS
-- ================================

-- Función para calcular automáticamente el ratio agua:café
CREATE OR REPLACE FUNCTION calculate_brew_ratio(coffee_dose DECIMAL, water_amount DECIMAL)
RETURNS TEXT AS $$
BEGIN
  IF coffee_dose IS NULL OR water_amount IS NULL OR coffee_dose = 0 THEN
    RETURN NULL;
  END IF;
  
  RETURN '1:' || ROUND(water_amount / coffee_dose, 1);
END;
$$ LANGUAGE plpgsql;

-- Función para calcular la puntuación SCA total
CREATE OR REPLACE FUNCTION calculate_sca_score(
  fragrance_aroma DECIMAL DEFAULT 0,
  flavor DECIMAL DEFAULT 0,
  aftertaste DECIMAL DEFAULT 0,
  acidity DECIMAL DEFAULT 0,
  body DECIMAL DEFAULT 0,
  balance DECIMAL DEFAULT 0,
  uniformity DECIMAL DEFAULT 0,
  clean_cup DECIMAL DEFAULT 0,
  sweetness DECIMAL DEFAULT 0,
  overall DECIMAL DEFAULT 0
)
RETURNS DECIMAL AS $$
BEGIN
  RETURN (
    COALESCE(fragrance_aroma, 0) + 
    COALESCE(flavor, 0) + 
    COALESCE(aftertaste, 0) + 
    COALESCE(acidity, 0) + 
    COALESCE(body, 0) + 
    COALESCE(balance, 0) + 
    COALESCE(uniformity, 0) + 
    COALESCE(clean_cup, 0) + 
    COALESCE(sweetness, 0) + 
    COALESCE(overall, 0)
  ) * 10; -- Escala de 0-100
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_coffee_recipes_updated_at 
    BEFORE UPDATE ON coffee_recipes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ================================
-- POLÍTICAS RLS (ROW LEVEL SECURITY)
-- ================================

-- Habilitar RLS en todas las tablas
ALTER TABLE coffee_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE cupping_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cupping_evaluations ENABLE ROW LEVEL SECURITY;

-- Políticas para coffee_recipes
CREATE POLICY "Users can view their own recipes" ON coffee_recipes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view public recipes" ON coffee_recipes
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can insert their own recipes" ON coffee_recipes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recipes" ON coffee_recipes
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recipes" ON coffee_recipes
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas para recipe_variations
CREATE POLICY "Users can manage their recipe variations" ON recipe_variations
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para recipe_ingredients
CREATE POLICY "Users can view ingredients of accessible recipes" ON recipe_ingredients
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM coffee_recipes 
            WHERE id = recipe_id 
            AND (user_id = auth.uid() OR is_public = true)
        )
    );

CREATE POLICY "Users can manage ingredients of their recipes" ON recipe_ingredients
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM coffee_recipes 
            WHERE id = recipe_id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update ingredients of their recipes" ON recipe_ingredients
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM coffee_recipes 
            WHERE id = recipe_id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete ingredients of their recipes" ON recipe_ingredients
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM coffee_recipes 
            WHERE id = recipe_id 
            AND user_id = auth.uid()
        )
    );

-- Políticas similares para recipe_tags
CREATE POLICY "Users can view tags of accessible recipes" ON recipe_tags
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM coffee_recipes 
            WHERE id = recipe_id 
            AND (user_id = auth.uid() OR is_public = true)
        )
    );

CREATE POLICY "Users can manage tags of their recipes" ON recipe_tags
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM coffee_recipes 
            WHERE id = recipe_id 
            AND user_id = auth.uid()
        )
    );

-- Políticas para cupping_sessions
CREATE POLICY "Users can manage their cupping sessions" ON cupping_sessions
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para cupping_evaluations
CREATE POLICY "Users can view evaluations of their sessions" ON cupping_evaluations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM cupping_sessions 
            WHERE id = cupping_session_id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage evaluations of their sessions" ON cupping_evaluations
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM cupping_sessions 
            WHERE id = cupping_session_id 
            AND user_id = auth.uid()
        )
    );

-- ================================
-- ÍNDICES PARA RENDIMIENTO
-- ================================

CREATE INDEX IF NOT EXISTS idx_coffee_recipes_user_id ON coffee_recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_coffee_recipes_brewing_method ON coffee_recipes(brewing_method);
CREATE INDEX IF NOT EXISTS idx_coffee_recipes_is_public ON coffee_recipes(is_public);
CREATE INDEX IF NOT EXISTS idx_coffee_recipes_overall_score ON coffee_recipes(overall_score);
CREATE INDEX IF NOT EXISTS idx_coffee_recipes_created_at ON coffee_recipes(created_at);
CREATE INDEX IF NOT EXISTS idx_coffee_recipes_is_favorite ON coffee_recipes(is_favorite);

CREATE INDEX IF NOT EXISTS idx_recipe_variations_recipe_id ON recipe_variations(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_tags_recipe_id ON recipe_tags(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_tags_tag ON recipe_tags(tag);

-- ================================
-- VISTAS ÚTILES
-- ================================

-- Vista para recetas con información calculada
CREATE OR REPLACE VIEW recipe_summary AS
SELECT 
    r.*,
    calculate_brew_ratio(r.coffee_dose, r.water_amount) as brew_ratio,
    CASE 
        WHEN r.overall_score >= 80 THEN 'Specialty'
        WHEN r.overall_score >= 60 THEN 'Premium'
        ELSE 'Commercial'
    END as coffee_grade,
    CASE
        WHEN r.extraction_yield BETWEEN 18 AND 22 THEN 'Optimal'
        WHEN r.extraction_yield < 18 THEN 'Under-extracted'
        ELSE 'Over-extracted'
    END as extraction_status,
    (
        SELECT COUNT(*) 
        FROM recipe_variations rv 
        WHERE rv.recipe_id = r.id
    ) as variations_count,
    (
        SELECT json_agg(tag) 
        FROM recipe_tags rt 
        WHERE rt.recipe_id = r.id
    ) as tags
FROM coffee_recipes r;

-- Comentarios en las tablas principales
COMMENT ON TABLE coffee_recipes IS 'Recetas de café de especialidad con métricas SCA y evaluaciones sensoriales';
COMMENT ON TABLE recipe_variations IS 'Variaciones y ajustes realizados a las recetas base';
COMMENT ON TABLE cupping_sessions IS 'Sesiones de degustación y evaluación profesional';
COMMENT ON TABLE cupping_evaluations IS 'Evaluaciones detalladas siguiendo protocolo SCA';