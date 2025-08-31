// ================================
// TIPOS TYPESCRIPT PARA RECETAS DE CAFÉ DE ESPECIALIDAD
// ================================

export interface CoffeeRecipe {
  id: string;
  user_id: string;
  
  // Información básica
  name: string;
  description?: string;
  origin?: string;
  process?: string;
  altitude?: number;
  roast_level?: string;
  roast_date?: string;
  
  // Método de preparación
  brewing_method: string;
  brewing_technique?: string;
  
  // Parámetros de extracción
  coffee_dose: number;
  water_amount?: number;
  extraction_time?: number;
  water_temperature?: number;
  grind_size?: string;
  grind_setting?: number;
  pressure?: number;
  
  // Métricas SCA
  tds?: number;
  extraction_yield?: number;
  strength?: number;
  
  // Evaluación sensorial SCA
  fragrance_aroma?: number;
  flavor?: number;
  aftertaste?: number;
  acidity?: number;
  body?: number;
  balance?: number;
  uniformity?: number;
  clean_cup?: number;
  sweetness?: number;
  overall_score?: number;
  
  // Notas y protocolo
  tasting_notes?: string;
  brewing_protocol?: string;
  cupping_notes?: string;
  
  // Costos
  coffee_cost?: number;
  total_cost?: number;
  suggested_price?: number;
  
  // Configuración
  image_url?: string;
  is_favorite?: boolean;
  is_public?: boolean;
  difficulty_level?: number;
  
  // Metadatos
  created_at?: string;
  updated_at?: string;
  last_brewed_at?: string;
  brew_count?: number;
}

export interface RecipeVariation {
  id: string;
  recipe_id: string;
  user_id: string;
  variation_name: string;
  notes?: string;
  
  // Parámetros modificados
  coffee_dose?: number;
  water_amount?: number;
  extraction_time?: number;
  water_temperature?: number;
  grind_size?: string;
  tds?: number;
  extraction_yield?: number;
  
  // Evaluación
  overall_score?: number;
  improvement_notes?: string;
  
  created_at?: string;
}

export interface RecipeIngredient {
  id: string;
  recipe_id: string;
  ingredient_name: string;
  ingredient_type?: string;
  amount?: number;
  unit?: string;
  optional?: boolean;
  created_at?: string;
}

export interface RecipeTag {
  id: string;
  recipe_id: string;
  tag: string;
  created_at?: string;
}

export interface CuppingSession {
  id: string;
  user_id: string;
  session_name: string;
  session_date?: string;
  cupper_name?: string;
  environment_notes?: string;
  created_at?: string;
}

export interface CuppingEvaluation {
  id: string;
  cupping_session_id: string;
  recipe_id: string;
  
  // Evaluación SCA detallada
  dry_fragrance?: number;
  wet_aroma?: number;
  brightness?: number;
  flavor?: number;
  aftertaste?: number;
  acidity?: number;
  body?: number;
  balance?: number;
  uniformity?: number;
  clean_cup?: number;
  sweetness?: number;
  overall_impression?: number;
  final_score?: number;
  
  // Defects
  taint?: number;
  fault?: number;
  
  notes?: string;
  created_at?: string;
}

// Tipos para la vista con datos calculados
export interface RecipeSummary extends CoffeeRecipe {
  brew_ratio?: string;
  coffee_grade?: 'Specialty' | 'Premium' | 'Commercial';
  extraction_status?: 'Optimal' | 'Under-extracted' | 'Over-extracted';
  variations_count?: number;
  tags?: string[];
  ingredients?: RecipeIngredient[];
}

// Tipos para formularios
export type CoffeeRecipeInput = Omit<CoffeeRecipe, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'brew_count'>;
export type RecipeVariationInput = Omit<RecipeVariation, 'id' | 'user_id' | 'created_at'>;
export type CuppingSessionInput = Omit<CuppingSession, 'id' | 'user_id' | 'created_at'>;

// Enums y constantes
export const BREWING_METHODS = [
  'Espresso',
  'V60',
  'Aeropress',
  'French Press',
  'Cold Brew',
  'Chemex',
  'Kalita Wave',
  'Siphon',
  'Moka Pot',
  'Turkish Coffee'
] as const;

export const ROAST_LEVELS = [
  'Light',
  'Light-Medium',
  'Medium',
  'Medium-Dark',
  'Dark'
] as const;

export const GRIND_SIZES = [
  'Extra Fine',
  'Fine',
  'Medium-Fine',
  'Medium',
  'Medium-Coarse',
  'Coarse',
  'Extra Coarse'
] as const;

export const PROCESS_METHODS = [
  'Washed',
  'Natural',
  'Honey',
  'Semi-washed',
  'Wet Hull',
  'Anaerobic',
  'Carbonic Maceration'
] as const;

export const DIFFICULTY_LEVELS = {
  1: 'Muy Fácil',
  2: 'Fácil', 
  3: 'Intermedio',
  4: 'Avanzado',
  5: 'Experto'
} as const;

export const SCA_SCORE_RANGES = {
  SPECIALTY: { min: 80, max: 100, label: 'Specialty Coffee' },
  PREMIUM: { min: 60, max: 79.99, label: 'Premium Coffee' },
  COMMERCIAL: { min: 0, max: 59.99, label: 'Commercial Coffee' }
} as const;

export const EXTRACTION_RANGES = {
  OPTIMAL: { min: 18, max: 22, label: 'Óptimo' },
  UNDER: { min: 0, max: 17.99, label: 'Sub-extraído' },
  OVER: { min: 22.01, max: 100, label: 'Sobre-extraído' }
} as const;

// Tipos para filtros
export interface RecipeFilters {
  brewing_method?: string;
  origin?: string;
  roast_level?: string;
  min_score?: number;
  max_score?: number;
  is_favorite?: boolean;
  difficulty_level?: number;
  tags?: string[];
  search?: string;
}

// Tipos para estadísticas
export interface RecipeStats {
  total_recipes: number;
  avg_extraction_yield: number;
  avg_tds: number;
  avg_cost_per_drink: number;
  favorite_recipes: number;
  brewing_methods_count: Record<string, number>;
  score_distribution: {
    specialty: number;
    premium: number;
    commercial: number;
  };
}

// Utilitarios de tipos
export type BrewingMethod = typeof BREWING_METHODS[number];
export type RoastLevel = typeof ROAST_LEVELS[number];
export type GrindSize = typeof GRIND_SIZES[number];
export type ProcessMethod = typeof PROCESS_METHODS[number];
export type DifficultyLevel = keyof typeof DIFFICULTY_LEVELS;