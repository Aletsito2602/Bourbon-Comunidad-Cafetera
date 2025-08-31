import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Heart, Clock, Award, Coffee, ThermometerSun } from 'lucide-react';
import { CoffeeRecipeService } from '../../lib/coffee-service';
import type { RecipeSummary, RecipeFilters } from '../../types/coffee';
import { BREWING_METHODS, ROAST_LEVELS, DIFFICULTY_LEVELS } from '../../types/coffee';

interface CoffeeRecipesListProps {
  onAddRecipe?: () => void;
  onEditRecipe?: (recipe: RecipeSummary) => void;
  onBrewRecipe?: (recipe: RecipeSummary) => void;
}

export function CoffeeRecipesList({ 
  onAddRecipe, 
  onEditRecipe, 
  onBrewRecipe 
}: CoffeeRecipesListProps) {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<RecipeFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadRecipes();
  }, [filters]);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await CoffeeRecipeService.getAllRecipes(filters);
      setRecipes(data);
    } catch (err) {
      setError('Error al cargar las recetas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm || undefined }));
  };

  const handleFilterChange = (key: keyof RecipeFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value || undefined }));
  };

  const toggleFavorite = async (recipeId: string, currentFavorite: boolean) => {
    try {
      await CoffeeRecipeService.toggleFavorite(recipeId, !currentFavorite);
      setRecipes(prev => prev.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, is_favorite: !currentFavorite }
          : recipe
      ));
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const handleBrew = async (recipe: RecipeSummary) => {
    try {
      await CoffeeRecipeService.incrementBrewCount(recipe.id);
      setRecipes(prev => prev.map(r => 
        r.id === recipe.id 
          ? { ...r, brew_count: (r.brew_count || 0) + 1 }
          : r
      ));
      onBrewRecipe?.(recipe);
    } catch (err) {
      console.error('Error incrementing brew count:', err);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getExtractionColor = (status: string) => {
    if (status === 'Optimal') return 'text-green-600';
    if (status === 'Under-extracted') return 'text-orange-600';
    return 'text-red-600';
  };

  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      'Espresso': 'from-amber-500 to-orange-600',
      'V60': 'from-blue-500 to-cyan-600',
      'Aeropress': 'from-green-500 to-teal-600',
      'French Press': 'from-purple-500 to-indigo-600',
      'Cold Brew': 'from-purple-500 to-indigo-600',
      'Chemex': 'from-gray-500 to-slate-600',
    };
    return colors[method] || 'from-gray-500 to-gray-600';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={loadRecipes}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Recetas de Café de Especialidad</h1>
          <p className="text-gray-600">Sistema técnico de gestión de extracciones y parámetros SCA</p>
        </div>
        <button 
          onClick={onAddRecipe}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Nueva Receta
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-amber-200">
          <div className="text-sm text-amber-600 font-medium">Total Recetas</div>
          <div className="text-2xl font-bold text-gray-900">{recipes.length}</div>
          <div className="text-xs text-gray-500">
            {recipes.filter(r => r.is_favorite).length} favoritas
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="text-sm text-green-600 font-medium">Promedio SCA</div>
          <div className="text-2xl font-bold text-gray-900">
            {recipes.length > 0 
              ? (recipes.reduce((sum, r) => sum + (r.overall_score || 0), 0) / recipes.length).toFixed(1)
              : '0.0'
            }
          </div>
          <div className="text-xs text-gray-500">
            {recipes.filter(r => (r.overall_score || 0) >= 80).length} specialty
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-600 font-medium">Extracción Promedio</div>
          <div className="text-2xl font-bold text-gray-900">
            {recipes.length > 0 
              ? (recipes.filter(r => r.extraction_yield).reduce((sum, r) => sum + (r.extraction_yield || 0), 0) / recipes.filter(r => r.extraction_yield).length || 0).toFixed(1)
              : '0.0'
            }%
          </div>
          <div className="text-xs text-gray-500">Óptimo: 18-22%</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-600 font-medium">Métodos</div>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(recipes.map(r => r.brewing_method)).size}
          </div>
          <div className="text-xs text-gray-500">diferentes</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, origen, notas de cata..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              onChange={(e) => handleFilterChange('brewing_method', e.target.value)}
            >
              <option value="">Todos los Métodos</option>
              {BREWING_METHODS.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              onChange={(e) => handleFilterChange('roast_level', e.target.value)}
            >
              <option value="">Todos los Tuestes</option>
              {ROAST_LEVELS.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-3 py-2 border rounded-lg flex items-center gap-2 transition-colors ${
                showFilters 
                  ? 'bg-amber-100 border-amber-300 text-amber-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter size={16} />
              Filtros
            </button>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Puntuación mínima</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                placeholder="0-100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                onChange={(e) => handleFilterChange('min_score', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Dificultad</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                onChange={(e) => handleFilterChange('difficulty_level', parseInt(e.target.value))}
              >
                <option value="">Cualquiera</option>
                {Object.entries(DIFFICULTY_LEVELS).map(([level, label]) => (
                  <option key={level} value={level}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Solo favoritas</label>
              <input
                type="checkbox"
                className="mt-3 h-4 w-4 text-amber-600"
                onChange={(e) => handleFilterChange('is_favorite', e.target.checked)}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({})}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recipes Grid */}
      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <Coffee size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            {Object.keys(filters).length > 0 ? 'No se encontraron recetas' : 'Aún no hay recetas'}
          </h3>
          <p className="text-gray-500 mb-6">
            {Object.keys(filters).length > 0 
              ? 'Prueba ajustando los filtros de búsqueda'
              : 'Crea tu primera receta de café de especialidad'
            }
          </p>
          {Object.keys(filters).length === 0 && (
            <button 
              onClick={onAddRecipe}
              className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Crear Primera Receta
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Header with method-based gradient */}
              <div className={`bg-gradient-to-r ${getMethodColor(recipe.brewing_method)} p-4 text-white`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{recipe.name}</h3>
                      <button
                        onClick={() => toggleFavorite(recipe.id, recipe.is_favorite || false)}
                        className={`transition-colors ${
                          recipe.is_favorite 
                            ? 'text-red-200 hover:text-white' 
                            : 'text-white/60 hover:text-red-200'
                        }`}
                      >
                        <Heart 
                          size={16} 
                          fill={recipe.is_favorite ? 'currentColor' : 'none'}
                        />
                      </button>
                    </div>
                    <p className="text-sm opacity-90 mb-2">{recipe.origin}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-white/20 px-2 py-1 rounded text-xs">
                        {recipe.brewing_method}
                      </span>
                      {recipe.overall_score && (
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">
                          Score: {recipe.overall_score.toFixed(1)}
                        </span>
                      )}
                      {recipe.difficulty_level && (
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">
                          {DIFFICULTY_LEVELS[recipe.difficulty_level as keyof typeof DIFFICULTY_LEVELS]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">
                      {recipe.extraction_yield ? 'Extracción' : 'Ratio'}
                    </div>
                    <div className="text-xl font-bold">
                      {recipe.extraction_yield 
                        ? `${recipe.extraction_yield.toFixed(1)}%` 
                        : recipe.brew_ratio || 'N/A'
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Parameters Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Dosis:</span>
                      <span className="font-medium">{recipe.coffee_dose}g</span>
                    </div>
                    {recipe.water_amount && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Agua:</span>
                        <span className="font-medium">{recipe.water_amount}g</span>
                      </div>
                    )}
                    {recipe.extraction_time && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tiempo:</span>
                        <span className="font-medium">
                          {Math.floor(recipe.extraction_time / 60)}:
                          {(recipe.extraction_time % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                    )}
                    {recipe.brew_ratio && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ratio:</span>
                        <span className="font-medium">{recipe.brew_ratio}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {recipe.water_temperature && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Temp:</span>
                        <span className="font-medium">{recipe.water_temperature}°C</span>
                      </div>
                    )}
                    {recipe.tds && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">TDS:</span>
                        <span className="font-medium">{recipe.tds.toFixed(2)}%</span>
                      </div>
                    )}
                    {recipe.grind_size && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Molienda:</span>
                        <span className="font-medium">{recipe.grind_size}</span>
                      </div>
                    )}
                    {recipe.total_cost && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Costo:</span>
                        <span className="font-medium">${recipe.total_cost.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tasting Notes */}
                {recipe.tasting_notes && (
                  <div className="border-t pt-3 mb-3">
                    <div className="text-xs text-gray-500 mb-2">Notas de Cata:</div>
                    <p className="text-sm text-gray-700">{recipe.tasting_notes}</p>
                  </div>
                )}

                {/* Tags */}
                {recipe.tags && recipe.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {recipe.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    {recipe.brew_count && recipe.brew_count > 0 && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {recipe.brew_count} veces
                      </span>
                    )}
                    {recipe.overall_score && (
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getScoreColor(recipe.overall_score)}`}>
                        <Award size={12} />
                        {recipe.coffee_grade}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onEditRecipe?.(recipe)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleBrew(recipe)}
                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      Preparar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}