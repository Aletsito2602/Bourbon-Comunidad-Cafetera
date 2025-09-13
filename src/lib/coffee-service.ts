// ================================
// SERVICIO PARA GESTIÓN DE RECETAS DE CAFÉ DE ESPECIALIDAD
// ================================

import { supabase } from './supabase';
import type { 
  CoffeeRecipe, 
  CoffeeRecipeInput, 
  RecipeVariation, 
  RecipeVariationInput,
  RecipeIngredient,
  RecipeTag,
  RecipeSummary,
  RecipeFilters,
  RecipeStats,
  CuppingSession,
  CuppingSessionInput,
  CuppingEvaluation
} from '../types/coffee';

export class CoffeeRecipeService {
  
  // ================================
  // OPERACIONES CRUD DE RECETAS
  // ================================

  static async getAllRecipes(filters?: RecipeFilters): Promise<RecipeSummary[]> {
    try {
      let query = supabase
        .from('recipe_summary')
        .select('*')
        .order('created_at', { ascending: false });

      // Aplicar filtros
      if (filters?.brewing_method) {
        query = query.eq('brewing_method', filters.brewing_method);
      }
      
      if (filters?.origin) {
        query = query.ilike('origin', `%${filters.origin}%`);
      }
      
      if (filters?.roast_level) {
        query = query.eq('roast_level', filters.roast_level);
      }
      
      if (filters?.min_score !== undefined) {
        query = query.gte('overall_score', filters.min_score);
      }
      
      if (filters?.max_score !== undefined) {
        query = query.lte('overall_score', filters.max_score);
      }
      
      if (filters?.is_favorite !== undefined) {
        query = query.eq('is_favorite', filters.is_favorite);
      }
      
      if (filters?.difficulty_level) {
        query = query.eq('difficulty_level', filters.difficulty_level);
      }
      
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,tasting_notes.ilike.%${filters.search}%,origin.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  }

  static async getRecipeById(id: string): Promise<RecipeSummary | null> {
    try {
      const { data, error } = await supabase
        .from('recipe_summary')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  }

  static async createRecipe(recipe: CoffeeRecipeInput): Promise<CoffeeRecipe> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuario no autenticado');

      const { data, error } = await supabase
        .from('coffee_recipes')
        .insert([{ ...recipe, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  }

  static async updateRecipe(id: string, updates: Partial<CoffeeRecipeInput>): Promise<CoffeeRecipe> {
    try {
      const { data, error } = await supabase
        .from('coffee_recipes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  }

  static async deleteRecipe(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('coffee_recipes')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  }

  static async toggleFavorite(id: string, is_favorite: boolean): Promise<void> {
    try {
      const { error } = await supabase
        .from('coffee_recipes')
        .update({ is_favorite })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }

  static async incrementBrewCount(id: string): Promise<void> {
    try {
      // First get current brew count
      const { data: currentRecipe } = await supabase
        .from('coffee_recipes')
        .select('brew_count')
        .eq('id', id)
        .single();

      const { error } = await supabase
        .from('coffee_recipes')
        .update({ 
          brew_count: (currentRecipe?.brew_count || 0) + 1,
          last_brewed_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error incrementing brew count:', error);
      throw error;
    }
  }

  // ================================
  // GESTIÓN DE VARIACIONES
  // ================================

  static async getRecipeVariations(recipeId: string): Promise<RecipeVariation[]> {
    try {
      const { data, error } = await supabase
        .from('recipe_variations')
        .select('*')
        .eq('recipe_id', recipeId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching variations:', error);
      throw error;
    }
  }

  static async createVariation(variation: RecipeVariationInput): Promise<RecipeVariation> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuario no autenticado');

      const { data, error } = await supabase
        .from('recipe_variations')
        .insert([{ ...variation, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating variation:', error);
      throw error;
    }
  }

  // ================================
  // GESTIÓN DE INGREDIENTES
  // ================================

  static async getRecipeIngredients(recipeId: string): Promise<RecipeIngredient[]> {
    try {
      const { data, error } = await supabase
        .from('recipe_ingredients')
        .select('*')
        .eq('recipe_id', recipeId)
        .order('optional', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      throw error;
    }
  }

  static async addIngredient(ingredient: Omit<RecipeIngredient, 'id' | 'created_at'>): Promise<RecipeIngredient> {
    try {
      const { data, error } = await supabase
        .from('recipe_ingredients')
        .insert([ingredient])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding ingredient:', error);
      throw error;
    }
  }

  static async updateIngredients(recipeId: string, ingredients: Omit<RecipeIngredient, 'id' | 'created_at'>[]): Promise<void> {
    try {
      // Eliminar ingredientes existentes
      await supabase
        .from('recipe_ingredients')
        .delete()
        .eq('recipe_id', recipeId);

      // Insertar nuevos ingredientes
      if (ingredients.length > 0) {
        const { error } = await supabase
          .from('recipe_ingredients')
          .insert(ingredients);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error updating ingredients:', error);
      throw error;
    }
  }

  // ================================
  // GESTIÓN DE ETIQUETAS
  // ================================

  static async getRecipeTags(recipeId: string): Promise<RecipeTag[]> {
    try {
      const { data, error } = await supabase
        .from('recipe_tags')
        .select('*')
        .eq('recipe_id', recipeId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }

  static async updateTags(recipeId: string, tags: string[]): Promise<void> {
    try {
      // Eliminar tags existentes
      await supabase
        .from('recipe_tags')
        .delete()
        .eq('recipe_id', recipeId);

      // Insertar nuevos tags
      if (tags.length > 0) {
        const tagInserts = tags.map(tag => ({ recipe_id: recipeId, tag }));
        const { error } = await supabase
          .from('recipe_tags')
          .insert(tagInserts);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error updating tags:', error);
      throw error;
    }
  }

  static async getAllTags(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('recipe_tags')
        .select('tag')
        .order('tag');

      if (error) throw error;
      
      // Eliminar duplicados
      const uniqueTags = [...new Set(data?.map(item => item.tag) || [])];
      return uniqueTags;
    } catch (error) {
      console.error('Error fetching all tags:', error);
      throw error;
    }
  }

  // ================================
  // GESTIÓN DE IMÁGENES
  // ================================

  static async uploadRecipeImage(file: File, recipeId: string): Promise<string> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuario no autenticado');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${recipeId}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('coffee-recipe-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data } = supabase.storage
        .from('coffee-recipe-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  static async deleteRecipeImage(imageUrl: string): Promise<void> {
    try {
      if (!imageUrl) return;

      // Extraer el path del archivo de la URL
      const url = new URL(imageUrl);
      const pathSegments = url.pathname.split('/');
      const fileName = pathSegments[pathSegments.length - 1];
      
      const { error } = await supabase.storage
        .from('coffee-recipe-images')
        .remove([fileName]);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  // ================================
  // SESIONES DE CUPPING
  // ================================

  static async getCuppingSessions(): Promise<CuppingSession[]> {
    try {
      const { data, error } = await supabase
        .from('cupping_sessions')
        .select('*')
        .order('session_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching cupping sessions:', error);
      throw error;
    }
  }

  static async createCuppingSession(session: CuppingSessionInput): Promise<CuppingSession> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuario no autenticado');

      const { data, error } = await supabase
        .from('cupping_sessions')
        .insert([{ ...session, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating cupping session:', error);
      throw error;
    }
  }

  static async getCuppingEvaluations(sessionId: string): Promise<CuppingEvaluation[]> {
    try {
      const { data, error } = await supabase
        .from('cupping_evaluations')
        .select(`
          *,
          coffee_recipes:recipe_id (name, origin)
        `)
        .eq('cupping_session_id', sessionId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching cupping evaluations:', error);
      throw error;
    }
  }

  // ================================
  // ESTADÍSTICAS Y REPORTES
  // ================================

  static async getRecipeStats(): Promise<RecipeStats> {
    try {
      const { data: recipes, error } = await supabase
        .from('coffee_recipes')
        .select('brewing_method, extraction_yield, tds, total_cost, is_favorite, overall_score');

      if (error) throw error;

      const stats: RecipeStats = {
        total_recipes: recipes?.length || 0,
        avg_extraction_yield: 0,
        avg_tds: 0,
        avg_cost_per_drink: 0,
        favorite_recipes: 0,
        brewing_methods_count: {},
        score_distribution: {
          specialty: 0,
          premium: 0,
          commercial: 0
        }
      };

      if (!recipes?.length) return stats;

      // Calcular promedios
      const validExtractionYields = recipes.filter(r => r.extraction_yield).map(r => r.extraction_yield!);
      const validTds = recipes.filter(r => r.tds).map(r => r.tds!);
      const validCosts = recipes.filter(r => r.total_cost).map(r => r.total_cost!);

      stats.avg_extraction_yield = validExtractionYields.length > 0 
        ? validExtractionYields.reduce((sum, val) => sum + val, 0) / validExtractionYields.length 
        : 0;

      stats.avg_tds = validTds.length > 0 
        ? validTds.reduce((sum, val) => sum + val, 0) / validTds.length 
        : 0;

      stats.avg_cost_per_drink = validCosts.length > 0 
        ? validCosts.reduce((sum, val) => sum + val, 0) / validCosts.length 
        : 0;

      // Contar favoritos
      stats.favorite_recipes = recipes.filter(r => r.is_favorite).length;

      // Distribución de métodos
      recipes.forEach(recipe => {
        const method = recipe.brewing_method;
        stats.brewing_methods_count[method] = (stats.brewing_methods_count[method] || 0) + 1;
      });

      // Distribución de puntuaciones
      recipes.forEach(recipe => {
        const score = recipe.overall_score || 0;
        if (score >= 80) {
          stats.score_distribution.specialty++;
        } else if (score >= 60) {
          stats.score_distribution.premium++;
        } else {
          stats.score_distribution.commercial++;
        }
      });

      return stats;
    } catch (error) {
      console.error('Error fetching recipe stats:', error);
      throw error;
    }
  }

  // ================================
  // UTILIDADES
  // ================================

  static calculateBrewRatio(coffeeGrams: number, waterGrams: number): string {
    if (!coffeeGrams || !waterGrams) return '';
    const ratio = waterGrams / coffeeGrams;
    return `1:${ratio.toFixed(1)}`;
  }

  static calculateExtractionYield(coffeeGrams: number, waterGrams: number, tds: number): number {
    if (!coffeeGrams || !waterGrams || !tds) return 0;
    return (waterGrams * tds / 100) / coffeeGrams * 100;
  }

  static calculateSCAScore(scores: {
    fragrance_aroma?: number;
    flavor?: number;
    aftertaste?: number;
    acidity?: number;
    body?: number;
    balance?: number;
    uniformity?: number;
    clean_cup?: number;
    sweetness?: number;
    overall?: number;
  }): number {
    const {
      fragrance_aroma = 0,
      flavor = 0,
      aftertaste = 0,
      acidity = 0,
      body = 0,
      balance = 0,
      uniformity = 0,
      clean_cup = 0,
      sweetness = 0,
      overall = 0
    } = scores;

    return fragrance_aroma + flavor + aftertaste + acidity + body + 
           balance + uniformity + clean_cup + sweetness + overall;
  }

  static getCoffeeGrade(score: number): 'Specialty' | 'Premium' | 'Commercial' {
    if (score >= 80) return 'Specialty';
    if (score >= 60) return 'Premium';
    return 'Commercial';
  }

  static getExtractionStatus(extractionYield: number): 'Optimal' | 'Under-extracted' | 'Over-extracted' {
    if (extractionYield >= 18 && extractionYield <= 22) return 'Optimal';
    if (extractionYield < 18) return 'Under-extracted';
    return 'Over-extracted';
  }
}