import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { CoffeeRecipeService } from '../../lib/coffee-service';
import type { RecipeSummary } from '../../types/coffee';

interface SCAExtractionCalculatorProps {
  recipe?: RecipeSummary | null;
  onClose?: () => void;
}

interface CalculationResults {
  brewRatio: string;
  extractionYield: number;
  strength: number;
  extractionStatus: 'Optimal' | 'Under-extracted' | 'Over-extracted';
  strengthStatus: 'Ideal' | 'Weak' | 'Strong';
  recommendations: string[];
}

export function SCAExtractionCalculator({ recipe, onClose }: SCAExtractionCalculatorProps) {
  const [coffeeInput, setCoffeeInput] = useState<number>(18.5);
  const [waterInput, setWaterInput] = useState<number>(37);
  const [tdsInput, setTdsInput] = useState<number>(10.8);
  const [results, setResults] = useState<CalculationResults | null>(null);

  // Cargar datos de la receta si existe
  useEffect(() => {
    if (recipe) {
      setCoffeeInput(recipe.coffee_dose);
      setWaterInput(recipe.water_amount || 37);
      setTdsInput(recipe.tds || 10.8);
    }
  }, [recipe]);

  // Calcular resultados cuando cambien los inputs
  useEffect(() => {
    calculateResults();
  }, [coffeeInput, waterInput, tdsInput]);

  const calculateResults = () => {
    if (!coffeeInput || !waterInput || !tdsInput) {
      setResults(null);
      return;
    }

    const brewRatio = CoffeeRecipeService.calculateBrewRatio(coffeeInput, waterInput);
    const extractionYield = CoffeeRecipeService.calculateExtractionYield(coffeeInput, waterInput, tdsInput);
    const strength = tdsInput;

    // Determinar estados
    const extractionStatus = CoffeeRecipeService.getExtractionStatus(extractionYield);
    
    let strengthStatus: 'Ideal' | 'Weak' | 'Strong';
    if (recipe?.brewing_method === 'Espresso') {
      if (strength >= 8 && strength <= 12) strengthStatus = 'Ideal';
      else if (strength < 8) strengthStatus = 'Weak';
      else strengthStatus = 'Strong';
    } else {
      // Pour over / filter coffee
      if (strength >= 1.15 && strength <= 1.45) strengthStatus = 'Ideal';
      else if (strength < 1.15) strengthStatus = 'Weak';
      else strengthStatus = 'Strong';
    }

    // Generar recomendaciones
    const recommendations: string[] = [];
    
    if (extractionStatus === 'Under-extracted') {
      recommendations.push('Molienda más fina para aumentar extracción');
      recommendations.push('Aumentar tiempo de contacto');
      recommendations.push('Aumentar temperatura del agua');
    } else if (extractionStatus === 'Over-extracted') {
      recommendations.push('Molienda más gruesa para reducir extracción');
      recommendations.push('Reducir tiempo de contacto');
      recommendations.push('Reducir temperatura del agua');
    }

    if (strengthStatus === 'Weak') {
      recommendations.push('Aumentar dosis de café o reducir agua');
      if (recipe?.brewing_method === 'Espresso') {
        recommendations.push('Considerar un rendimiento menor (menos volumen de salida)');
      }
    } else if (strengthStatus === 'Strong') {
      recommendations.push('Reducir dosis de café o aumentar agua');
      if (recipe?.brewing_method === 'Espresso') {
        recommendations.push('Considerar un rendimiento mayor (más volumen de salida)');
      }
    }

    if (extractionStatus === 'Optimal' && strengthStatus === 'Ideal') {
      recommendations.push('¡Parámetros excelentes! Receta bien balanceada');
      recommendations.push('Mantener consistencia en molienda y técnica');
    }

    setResults({
      brewRatio,
      extractionYield,
      strength,
      extractionStatus,
      strengthStatus,
      recommendations
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimal':
      case 'Ideal':
        return 'text-green-600 bg-green-100';
      case 'Under-extracted':
      case 'Over-extracted':
      case 'Weak':
      case 'Strong':
        return 'text-amber-600 bg-amber-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Optimal':
      case 'Ideal':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'Under-extracted':
      case 'Over-extracted':
      case 'Weak':
      case 'Strong':
        return <AlertTriangle size={16} className="text-amber-600" />;
      default:
        return <Calculator size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Calculator className="text-amber-600" size={20} />
          <h3 className="font-semibold text-gray-800">
            Calculadora de Extracción SCA
            {recipe && <span className="text-sm text-gray-500 ml-2">- {recipe.name}</span>}
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Parámetros de Entrada */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3 text-blue-800">Parámetros de Entrada</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-blue-700 font-medium mb-1">
                  Dosis de Café (g)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={coffeeInput}
                  onChange={(e) => setCoffeeInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-blue-700 font-medium mb-1">
                  {recipe?.brewing_method === 'Espresso' ? 'Volumen Salida (ml)' : 'Agua Total (g)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={waterInput}
                  onChange={(e) => setWaterInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-blue-700 font-medium mb-1">
                  TDS (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={tdsInput}
                  onChange={(e) => setTdsInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Cálculos Automáticos */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3 text-green-800">Resultados Calculados</h4>
            {results ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Ratio:</span>
                  <span className="font-semibold text-green-800">{results.brewRatio}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Extracción:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-800">
                      {results.extractionYield.toFixed(1)}%
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(results.extractionStatus)}`}>
                      {getStatusIcon(results.extractionStatus)}
                      {results.extractionStatus}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Fuerza:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-800">
                      {results.strength.toFixed(2)}%
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(results.strengthStatus)}`}>
                      {getStatusIcon(results.strengthStatus)}
                      {results.strengthStatus}
                    </span>
                  </div>
                </div>

                {/* Rangos objetivo */}
                <div className="mt-4 pt-3 border-t border-green-200">
                  <div className="text-xs text-green-600 space-y-1">
                    <div>📊 Extracción óptima: 18-22%</div>
                    <div>
                      💪 Fuerza ideal: {' '}
                      {recipe?.brewing_method === 'Espresso' ? '8-12%' : '1.15-1.45%'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-green-600 text-sm">
                Ingresa todos los parámetros para ver los resultados
              </div>
            )}
          </div>

          {/* Recomendaciones */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3 text-purple-800">Recomendaciones</h4>
            {results?.recommendations.length ? (
              <div className="space-y-2">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <TrendingUp size={14} className="text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-purple-700">{rec}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-purple-600 text-sm">
                Las recomendaciones aparecerán aquí basadas en tus cálculos
              </div>
            )}

            {/* Información contextual del método */}
            {recipe?.brewing_method && (
              <div className="mt-4 pt-3 border-t border-purple-200">
                <div className="text-xs text-purple-600">
                  <div className="font-medium mb-1">Método: {recipe.brewing_method}</div>
                  {recipe.brewing_method === 'Espresso' && (
                    <div>Tiempo ideal: 25-30s • Presión: 9 bar</div>
                  )}
                  {recipe.brewing_method === 'V60' && (
                    <div>Tiempo ideal: 2:30-4:00 • Vertido por pulsos</div>
                  )}
                  {recipe.brewing_method === 'Aeropress' && (
                    <div>Tiempo ideal: 1:30-2:30 • Presión manual</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gráfico visual de estado */}
        {results && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium mb-4 text-gray-800">Estado Visual</h4>
            <div className="grid grid-cols-2 gap-4">
              {/* Gráfico de extracción */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Extracción (%)</div>
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div className="w-[18%] bg-red-300"></div>
                    <div className="w-[4%] bg-green-400"></div>
                    <div className="flex-1 bg-red-300"></div>
                  </div>
                  <div 
                    className="absolute top-0 h-full w-1 bg-blue-600"
                    style={{ left: `${Math.min(Math.max(results.extractionYield, 0), 30) / 30 * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                    {results.extractionYield.toFixed(1)}%
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span className="text-green-600 font-medium">18-22%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Gráfico de fuerza */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Fuerza ({recipe?.brewing_method === 'Espresso' ? '%' : '%'})
                </div>
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  {recipe?.brewing_method === 'Espresso' ? (
                    <>
                      <div className="absolute inset-0 flex">
                        <div className="w-[53%] bg-red-300"></div>
                        <div className="w-[27%] bg-green-400"></div>
                        <div className="flex-1 bg-red-300"></div>
                      </div>
                      <div 
                        className="absolute top-0 h-full w-1 bg-blue-600"
                        style={{ left: `${Math.min(Math.max(results.strength, 0), 15) / 15 * 100}%` }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-9">
                        <span>0%</span>
                        <span className="text-green-600 font-medium">8-12%</span>
                        <span>15%</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 flex">
                        <div className="w-[38%] bg-red-300"></div>
                        <div className="w-[10%] bg-green-400"></div>
                        <div className="flex-1 bg-red-300"></div>
                      </div>
                      <div 
                        className="absolute top-0 h-full w-1 bg-blue-600"
                        style={{ left: `${Math.min(Math.max(results.strength, 0), 3) / 3 * 100}%` }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-9">
                        <span>0%</span>
                        <span className="text-green-600 font-medium">1.15-1.45%</span>
                        <span>3%</span>
                      </div>
                    </>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                    {results.strength.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}