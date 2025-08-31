import { useState, useEffect } from 'react';
import { X, Upload, Star, Calculator, Save, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { CoffeeRecipeService } from '../../lib/coffee-service';
import type { CoffeeRecipeInput, RecipeSummary, RecipeIngredient } from '../../types/coffee';
import { 
  BREWING_METHODS, 
  ROAST_LEVELS, 
  GRIND_SIZES, 
  PROCESS_METHODS, 
  DIFFICULTY_LEVELS 
} from '../../types/coffee';

interface CoffeeRecipeFormProps {
  recipe?: RecipeSummary | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: RecipeSummary) => void;
}

export function CoffeeRecipeForm({ recipe, isOpen, onClose, onSave }: CoffeeRecipeFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<Omit<RecipeIngredient, 'id' | 'created_at'>[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  
  // Calculados automáticamente
  const [brewRatio, setBrewRatio] = useState('');
  const [extractionYield, setExtractionYield] = useState<number>(0);
  const [scaScore, setScaScore] = useState<number>(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<CoffeeRecipeInput>();

  const watchedFields = watch([
    'coffee_dose', 
    'water_amount', 
    'tds',
    'fragrance_aroma',
    'flavor',
    'aftertaste',
    'acidity',
    'body',
    'balance',
    'uniformity',
    'clean_cup',
    'sweetness'
  ]);

  // Cargar datos del recipe si es edición
  useEffect(() => {
    if (recipe && isOpen) {
      reset({
        name: recipe.name,
        description: recipe.description || '',
        origin: recipe.origin || '',
        process: recipe.process || '',
        altitude: recipe.altitude || undefined,
        roast_level: recipe.roast_level || '',
        roast_date: recipe.roast_date || '',
        brewing_method: recipe.brewing_method,
        brewing_technique: recipe.brewing_technique || '',
        coffee_dose: recipe.coffee_dose,
        water_amount: recipe.water_amount || undefined,
        extraction_time: recipe.extraction_time || undefined,
        water_temperature: recipe.water_temperature || undefined,
        grind_size: recipe.grind_size || '',
        pressure: recipe.pressure || undefined,
        tds: recipe.tds || undefined,
        fragrance_aroma: recipe.fragrance_aroma || undefined,
        flavor: recipe.flavor || undefined,
        aftertaste: recipe.aftertaste || undefined,
        acidity: recipe.acidity || undefined,
        body: recipe.body || undefined,
        balance: recipe.balance || undefined,
        uniformity: recipe.uniformity || undefined,
        clean_cup: recipe.clean_cup || undefined,
        sweetness: recipe.sweetness || undefined,
        tasting_notes: recipe.tasting_notes || '',
        brewing_protocol: recipe.brewing_protocol || '',
        coffee_cost: recipe.coffee_cost || undefined,
        total_cost: recipe.total_cost || undefined,
        suggested_price: recipe.suggested_price || undefined,
        is_favorite: recipe.is_favorite || false,
        is_public: recipe.is_public || false,
        difficulty_level: recipe.difficulty_level || undefined
      });

      if (recipe.image_url) {
        setPreviewUrl(recipe.image_url);
      }

      if (recipe.tags) {
        setTags(recipe.tags);
      }

      // Cargar ingredientes
      loadIngredients(recipe.id);
    } else if (isOpen && !recipe) {
      // Reset para nuevo recipe
      reset();
      setIngredients([]);
      setTags([]);
      setPreviewUrl(null);
      setImageFile(null);
    }
  }, [recipe, isOpen, reset]);

  const loadIngredients = async (recipeId: string) => {
    try {
      const recipeIngredients = await CoffeeRecipeService.getRecipeIngredients(recipeId);
      setIngredients(recipeIngredients.map(ing => ({
        recipe_id: ing.recipe_id,
        ingredient_name: ing.ingredient_name,
        ingredient_type: ing.ingredient_type,
        amount: ing.amount,
        unit: ing.unit,
        optional: ing.optional
      })));
    } catch (err) {
      console.error('Error loading ingredients:', err);
    }
  };

  // Calcular valores automáticamente
  useEffect(() => {
    const [coffeeDose, waterAmount, tds, ...scaScores] = watchedFields;

    // Calcular ratio
    if (coffeeDose && waterAmount) {
      const ratio = CoffeeRecipeService.calculateBrewRatio(coffeeDose, waterAmount);
      setBrewRatio(ratio);
    }

    // Calcular extracción
    if (coffeeDose && waterAmount && tds) {
      const extraction = CoffeeRecipeService.calculateExtractionYield(coffeeDose, waterAmount, tds);
      setExtractionYield(extraction);
      setValue('extraction_yield', extraction);
    }

    // Calcular puntuación SCA
    const scaScoreValues = {
      fragrance_aroma: scaScores[0],
      flavor: scaScores[1],
      aftertaste: scaScores[2],
      acidity: scaScores[3],
      body: scaScores[4],
      balance: scaScores[5],
      uniformity: scaScores[6],
      clean_cup: scaScores[7],
      sweetness: scaScores[8]
    };

    const calculatedScore = CoffeeRecipeService.calculateSCAScore(scaScoreValues);
    setScaScore(calculatedScore);
    setValue('overall_score', calculatedScore);
  }, [watchedFields, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, {
      recipe_id: '',
      ingredient_name: '',
      ingredient_type: '',
      amount: 0,
      unit: '',
      optional: false
    }]);
  };

  const updateIngredient = (index: number, field: keyof RecipeIngredient, value: any) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim().toLowerCase()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: CoffeeRecipeInput) => {
    try {
      setLoading(true);
      setError(null);

      let imageUrl = previewUrl;

      // Subir imagen si hay una nueva
      if (imageFile) {
        const recipeId = recipe?.id || 'temp-' + Date.now();
        imageUrl = await CoffeeRecipeService.uploadRecipeImage(imageFile, recipeId);
      }

      const recipeData = {
        ...data,
        image_url: imageUrl || undefined
      };

      let savedRecipe;
      if (recipe) {
        // Actualizar receta existente
        savedRecipe = await CoffeeRecipeService.updateRecipe(recipe.id, recipeData);
      } else {
        // Crear nueva receta
        savedRecipe = await CoffeeRecipeService.createRecipe(recipeData);
      }

      // Actualizar ingredientes
      if (ingredients.length > 0) {
        const ingredientsWithRecipeId = ingredients.map(ing => ({
          ...ing,
          recipe_id: savedRecipe.id
        }));
        await CoffeeRecipeService.updateIngredients(savedRecipe.id, ingredientsWithRecipeId);
      }

      // Actualizar tags
      await CoffeeRecipeService.updateTags(savedRecipe.id, tags);

      // Obtener la receta completa con datos calculados
      const fullRecipe = await CoffeeRecipeService.getRecipeById(savedRecipe.id);
      if (fullRecipe) {
        onSave(fullRecipe);
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar la receta');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            {recipe ? 'Editar Receta' : 'Nueva Receta de Café'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
          {/* Información Básica */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-600 border-b border-amber-200 pb-2">
                Información Básica
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Receta *
                </label>
                <input
                  {...register('name', { required: 'El nombre es obligatorio' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Ej: Espresso House Blend"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Descripción de la receta..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origen
                  </label>
                  <input
                    {...register('origin')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Colombia Huila"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proceso
                  </label>
                  <select
                    {...register('process')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Seleccionar proceso</option>
                    {PROCESS_METHODS.map(process => (
                      <option key={process} value={process}>{process}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Altitud (m)
                  </label>
                  <input
                    type="number"
                    {...register('altitude', { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="1500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nivel de Tueste
                  </label>
                  <select
                    {...register('roast_level')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Seleccionar tueste</option>
                    {ROAST_LEVELS.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-600 border-b border-amber-200 pb-2">
                Imagen de la Bebida
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        setImageFile(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label className="cursor-pointer">
                        <span className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                          Seleccionar Imagen
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG, WEBP hasta 5MB</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dificultad
                  </label>
                  <select
                    {...register('difficulty_level', { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Seleccionar</option>
                    {Object.entries(DIFFICULTY_LEVELS).map(([level, label]) => (
                      <option key={level} value={level}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('is_favorite')}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700 flex items-center gap-1">
                      <Star size={16} className="text-yellow-500" />
                      Favorita
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('is_public')}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700">Pública</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parámetros de Preparación */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 border-b border-blue-200 pb-2 mb-4">
              Parámetros de Preparación
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Método *
                </label>
                <select
                  {...register('brewing_method', { required: 'El método es obligatorio' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar método</option>
                  {BREWING_METHODS.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
                {errors.brewing_method && (
                  <p className="text-red-500 text-sm mt-1">{errors.brewing_method.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Técnica
                </label>
                <input
                  {...register('brewing_technique')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Invertido, Standard..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosis de Café (g) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('coffee_dose', { 
                    required: 'La dosis es obligatoria',
                    valueAsNumber: true 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="18.5"
                />
                {errors.coffee_dose && (
                  <p className="text-red-500 text-sm mt-1">{errors.coffee_dose.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Agua (g/ml)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('water_amount', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="350"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiempo (segundos)
                </label>
                <input
                  type="number"
                  {...register('extraction_time', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperatura (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('water_temperature', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="94"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Molienda
                </label>
                <select
                  {...register('grind_size')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  {GRIND_SIZES.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Presión (bar)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('pressure', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="9"
                />
              </div>
            </div>

            {/* Valores calculados */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calculator size={16} className="text-blue-600" />
                <span className="font-medium text-blue-600">Valores Calculados</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Ratio: </span>
                  <span className="font-medium">{brewRatio || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Extracción: </span>
                  <span className="font-medium">{extractionYield.toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Score SCA: </span>
                  <span className="font-medium">{scaScore.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas SCA */}
          <div>
            <h3 className="text-lg font-semibold text-green-600 border-b border-green-200 pb-2 mb-4">
              Métricas SCA y Evaluación Sensorial
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-3">Métricas Técnicas</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      TDS (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('tds', { valueAsNumber: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="1.42"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Evaluación Sensorial (0-10)</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'fragrance_aroma', label: 'Fragancia/Aroma' },
                    { key: 'flavor', label: 'Sabor' },
                    { key: 'aftertaste', label: 'Retrogusto' },
                    { key: 'acidity', label: 'Acidez' },
                    { key: 'body', label: 'Cuerpo' },
                    { key: 'balance', label: 'Balance' }
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {label}
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="10"
                        {...register(key as keyof CoffeeRecipeInput, { valueAsNumber: true })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="8.0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Métricas Binarias (0-10)</h4>
                <div className="space-y-3">
                  {[
                    { key: 'uniformity', label: 'Uniformidad' },
                    { key: 'clean_cup', label: 'Taza Limpia' },
                    { key: 'sweetness', label: 'Dulzor' }
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        {...register(key as keyof CoffeeRecipeInput, { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="10"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notas y Protocolo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-600 border-b border-purple-200 pb-2 mb-4">
                Notas y Protocolo
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas de Cata
                  </label>
                  <textarea
                    {...register('tasting_notes')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Chocolate amargo, nuez tostada, final dulce..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Protocolo de Preparación
                  </label>
                  <textarea
                    {...register('brewing_protocol')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Bloom 44g/30s → 150g/1:15 → 250g/2:10..."
                  />
                </div>
              </div>
            </div>

            {/* Costos */}
            <div>
              <h3 className="text-lg font-semibold text-orange-600 border-b border-orange-200 pb-2 mb-4">
                Costos y Precios
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Costo del Café
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('coffee_cost', { valueAsNumber: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="1.20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Costo Total
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('total_cost', { valueAsNumber: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="1.75"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio Sugerido
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('suggested_price', { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="4.50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ingredientes adicionales */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-600 border-b border-gray-200 pb-2">
                Ingredientes Adicionales
              </h3>
              <button
                type="button"
                onClick={addIngredient}
                className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
              >
                + Agregar
              </button>
            </div>
            
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4">
                    <input
                      value={ingredient.ingredient_name}
                      onChange={(e) => updateIngredient(index, 'ingredient_name', e.target.value)}
                      placeholder="Nombre del ingrediente"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      value={ingredient.ingredient_type || ''}
                      onChange={(e) => updateIngredient(index, 'ingredient_type', e.target.value)}
                      placeholder="Tipo"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={ingredient.amount || ''}
                      onChange={(e) => updateIngredient(index, 'amount', parseFloat(e.target.value))}
                      placeholder="Cantidad"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      value={ingredient.unit || ''}
                      onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                      placeholder="Unidad"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={ingredient.optional || false}
                      onChange={(e) => updateIngredient(index, 'optional', e.target.checked)}
                      className="w-4 h-4"
                      title="Opcional"
                    />
                  </div>
                  <div className="col-span-1">
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold text-gray-600 border-b border-gray-200 pb-2 mb-4">
              Etiquetas
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Nueva etiqueta"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Agregar
              </button>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={16} />
              {loading ? 'Guardando...' : (recipe ? 'Actualizar' : 'Crear')} Receta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}