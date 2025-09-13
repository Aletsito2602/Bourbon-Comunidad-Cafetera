import { useState } from 'react';
import { CoffeeRecipesList } from './CoffeeRecipesList';
import { CoffeeRecipeForm } from './CoffeeRecipeForm';
import { SCAExtractionCalculator } from './SCAExtractionCalculator';
import type { RecipeSummary } from '../../types/coffee';

export function CoffeeRecipesManager() {
  const [, setRecipes] = useState<RecipeSummary[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeSummary | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const handleAddRecipe = () => {
    setSelectedRecipe(null);
    setIsFormOpen(true);
  };

  const handleEditRecipe = (recipe: RecipeSummary) => {
    setSelectedRecipe(recipe);
    setIsFormOpen(true);
  };

  const handleBrewRecipe = (recipe: RecipeSummary) => {
    // Aquí podrías abrir un modal de preparación o logging
    console.log('Brewing recipe:', recipe.name);
    
    // Podrías mostrar una notificación o abrir una vista de preparación
    // Por ahora solo mostramos la calculadora con los datos de la receta
    setSelectedRecipe(recipe);
    setShowCalculator(true);
  };

  const handleSaveRecipe = (recipe: RecipeSummary) => {
    setRecipes(prev => {
      const existingIndex = prev.findIndex(r => r.id === recipe.id);
      if (existingIndex >= 0) {
        // Actualizar receta existente
        const updated = [...prev];
        updated[existingIndex] = recipe;
        return updated;
      } else {
        // Agregar nueva receta
        return [recipe, ...prev];
      }
    });
    
    setIsFormOpen(false);
    setSelectedRecipe(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedRecipe(null);
  };

  const handleCloseCalculator = () => {
    setShowCalculator(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="space-y-6">
      <CoffeeRecipesList
        onAddRecipe={handleAddRecipe}
        onEditRecipe={handleEditRecipe}
        onBrewRecipe={handleBrewRecipe}
      />

      {/* Calculadora de Extracción */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span>🧮</span>
            Calculadora de Extracción SCA
          </h3>
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            {showCalculator ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        
        {showCalculator && (
          <SCAExtractionCalculator 
            recipe={selectedRecipe}
            onClose={handleCloseCalculator}
          />
        )}
      </div>

      {/* Modal del formulario */}
      <CoffeeRecipeForm
        recipe={selectedRecipe}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveRecipe}
      />
    </div>
  );
}