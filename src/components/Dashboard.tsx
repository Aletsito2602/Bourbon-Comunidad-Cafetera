import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { AppSidebar } from './app-sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

interface DashboardProps {
  onLogout: () => void
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState('home')

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Bienvenido a Bourbon Web</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="dashboard-card">
                <h2>Recetas</h2>
                <p>Gestiona tus recetas de cócteles</p>
              </div>
              <div className="dashboard-card">
                <h2>Stock</h2>
                <p>Controla tu inventario</p>
              </div>
              <div className="dashboard-card">
                <h2>Comandas</h2>
                <p>Gestiona pedidos y comandas</p>
              </div>
            </div>
          </div>
        )
      case 'recetas':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Recetas de Café de Especialidad</h1>
                <p className="text-gray-600">Sistema técnico de gestión de extracciones y parámetros SCA</p>
              </div>
              <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2">
                <span>+</span>
                Nueva Receta
              </button>
            </div>

            {/* Métricas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-amber-200">
                <div className="text-sm text-amber-600 font-medium">Total Recetas</div>
                <div className="text-2xl font-bold text-gray-900">24</div>
                <div className="text-xs text-gray-500">8 Espresso, 16 Filtro</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="text-sm text-green-600 font-medium">Rendimiento Promedio</div>
                <div className="text-2xl font-bold text-gray-900">19.8%</div>
                <div className="text-xs text-gray-500">Óptimo SCA: 18-22%</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-600 font-medium">TDS Promedio</div>
                <div className="text-2xl font-bold text-gray-900">1.35%</div>
                <div className="text-xs text-gray-500">Objetivo: 1.15-1.45%</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <div className="text-sm text-purple-600 font-medium">Costo/Bebida</div>
                <div className="text-2xl font-bold text-gray-900">$1.85</div>
                <div className="text-xs text-gray-500">28% del precio</div>
              </div>
            </div>

            {/* Filtros y Búsqueda */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="Buscar recetas por origen, método, notas..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Todos los Métodos</option>
                    <option>Espresso</option>
                    <option>V60</option>
                    <option>Chemex</option>
                    <option>Aeropress</option>
                    <option>French Press</option>
                    <option>Cold Brew</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>Todos los Orígenes</option>
                    <option>Brasil</option>
                    <option>Colombia</option>
                    <option>Etiopía</option>
                    <option>Guatemala</option>
                    <option>Perú</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Lista de Recetas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Receta Espresso */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Espresso House Blend</h3>
                      <p className="text-sm opacity-90">Brasil Santos + Colombia Huila</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">Espresso</span>
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">Score: 84.5</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">Rendimiento</div>
                      <div className="text-xl font-bold">20.2%</div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Dosis:</span>
                        <span className="font-medium">18.5g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Yield:</span>
                        <span className="font-medium">37g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tiempo:</span>
                        <span className="font-medium">28s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ratio:</span>
                        <span className="font-medium">1:2.0</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Temp:</span>
                        <span className="font-medium">93°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">TDS:</span>
                        <span className="font-medium">10.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Presión:</span>
                        <span className="font-medium">9 bar</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Costo:</span>
                        <span className="font-medium">$1.75</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="text-xs text-gray-500 mb-2">Notas de Cata:</div>
                    <p className="text-sm text-gray-700">"Chocolate amargo, nuez tostada, final dulce. Cuerpo cremoso con acidez balanceada."</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-xs text-gray-500">
                      Última actualización: Hace 3 días
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Editar</button>
                      <button className="text-green-600 hover:text-green-800 text-sm">Preparar</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Receta V60 */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Etiopía Yirgacheffe</h3>
                      <p className="text-sm opacity-90">Natural Process - Altitude 1,800m</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">V60</span>
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">Score: 88.0</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">Rendimiento</div>
                      <div className="text-xl font-bold">21.5%</div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Café:</span>
                        <span className="font-medium">22g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Agua:</span>
                        <span className="font-medium">350g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tiempo:</span>
                        <span className="font-medium">3:20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ratio:</span>
                        <span className="font-medium">1:15.9</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Temp:</span>
                        <span className="font-medium">94°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">TDS:</span>
                        <span className="font-medium">1.42%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Molienda:</span>
                        <span className="font-medium">Medium</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Costo:</span>
                        <span className="font-medium">$2.20</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="text-xs text-gray-500 mb-2">Protocolo de Vertido:</div>
                    <p className="text-sm text-gray-700">"Bloom 44g/30s → 150g/1:15 → 250g/2:10 → 350g/2:45. Agitación suave post-bloom."</p>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="text-xs text-gray-500 mb-2">Perfil Sensorial:</div>
                    <p className="text-sm text-gray-700">"Bergamota, té negro, chocolate blanco. Acidez brillante, cuerpo medio, final floral."</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-xs text-gray-500">
                      Última actualización: Hace 1 día
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Editar</button>
                      <button className="text-green-600 hover:text-green-800 text-sm">Preparar</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Receta Cold Brew */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Cold Brew Concentrate</h3>
                      <p className="text-sm opacity-90">Guatemala Antigua + Brasil Cerrado</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">Cold Brew</span>
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">24h Batch</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">Rendimiento</div>
                      <div className="text-xl font-bold">22.8%</div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Café:</span>
                        <span className="font-medium">500g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Agua:</span>
                        <span className="font-medium">3L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tiempo:</span>
                        <span className="font-medium">18h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ratio:</span>
                        <span className="font-medium">1:6</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Temp:</span>
                        <span className="font-medium">Ambiente</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">TDS Conc:</span>
                        <span className="font-medium">3.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Dilución:</span>
                        <span className="font-medium">1:1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Yield:</span>
                        <span className="font-medium">~40 porciones</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="text-xs text-gray-500 mb-2">Proceso:</div>
                    <p className="text-sm text-gray-700">"Molienda gruesa (800-900μm). Inmersión total 18h. Filtrado doble: malla gruesa + papel."</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-xs text-gray-500">
                      Próximo batch: En 2 días
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Editar</button>
                      <button className="text-orange-600 hover:text-orange-800 text-sm">Iniciar Batch</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Receta Aeropress */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">Perú Amazonas</h3>
                      <p className="text-sm opacity-90">Washed Process - Cooperativa</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">Aeropress</span>
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">Invertido</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-90">Rendimiento</div>
                      <div className="text-xl font-bold">19.8%</div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Café:</span>
                        <span className="font-medium">17g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Agua:</span>
                        <span className="font-medium">250g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tiempo:</span>
                        <span className="font-medium">2:30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ratio:</span>
                        <span className="font-medium">1:14.7</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Temp:</span>
                        <span className="font-medium">87°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">TDS:</span>
                        <span className="font-medium">1.28%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Presión:</span>
                        <span className="font-medium">30s press</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Costo:</span>
                        <span className="font-medium">$1.95</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="text-xs text-gray-500 mb-2">Técnica:</div>
                    <p className="text-sm text-gray-700">"Invertido: 100g bloom 30s → 200g agitar → 250g 1:30 → voltear → press 30s"</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-xs text-gray-500">
                      Actualizado: Hace 5 días
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Editar</button>
                      <button className="text-green-600 hover:text-green-800 text-sm">Preparar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculadora de Extracción */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>🧮</span>
                Calculadora de Extracción SCA
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Parámetros de Entrada</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Dosis (g)</label>
                      <input type="number" className="w-full mt-1 px-3 py-2 border rounded-lg" defaultValue="18.5" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Yield (g)</label>
                      <input type="number" className="w-full mt-1 px-3 py-2 border rounded-lg" defaultValue="37" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">TDS (%)</label>
                      <input type="number" step="0.1" className="w-full mt-1 px-3 py-2 border rounded-lg" defaultValue="10.8" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Cálculos Automáticos</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Ratio:</span>
                      <span className="font-medium">1:2.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Extracción:</span>
                      <span className="font-medium text-green-600">21.6%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Fuerza:</span>
                      <span className="font-medium text-blue-600">10.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className="text-green-600 text-sm">✅ Óptimo</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Recomendaciones</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-green-600">✅ Extracción en rango SCA</div>
                    <div className="text-sm text-green-600">✅ TDS óptimo para espresso</div>
                    <div className="text-sm text-amber-600">⚡ Considerar +0.5g dosis</div>
                    <div className="text-sm text-gray-500">📊 Parámetros balanceados</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'stock':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Stock</h1>
            <p className="text-gray-600">Gestiona tu inventario de bebidas y ingredientes.</p>
          </div>
        )
      case 'mi-carta':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Mi Carta Online</h1>
            <p className="text-gray-600 mb-8">Elige una plantilla profesional para tu carta digital. Cada diseño está optimizado para atraer a tus clientes.</p>
            
            <div className="templates-grid">
              {/* Template 1 - Clásica */}
              <div className="template-card-new">
                <div className="template-image">
                  <div className="mock-browser">
                    <div className="browser-bar">
                      <div className="browser-dots">
                        <div className="dot red"></div>
                        <div className="dot yellow"></div>
                        <div className="dot green"></div>
                      </div>
                      <div className="url-bar">tubar.com/carta</div>
                    </div>
                    <div className="template-content classic-design">
                      <div className="mock-header">
                        <div className="mock-logo">🍸</div>
                        <h3>Bar Elegante</h3>
                        <div className="mock-line"></div>
                      </div>
                      <div className="mock-menu">
                        <div className="mock-item">
                          <span>Mojito Clásico</span>
                          <span className="mock-dots">.......</span>
                          <span>$12</span>
                        </div>
                        <div className="mock-item">
                          <span>Old Fashioned</span>
                          <span className="mock-dots">.......</span>
                          <span>$15</span>
                        </div>
                        <div className="mock-item">
                          <span>Manhattan</span>
                          <span className="mock-dots">.......</span>
                          <span>$14</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="template-details">
                  <h4>Clásica</h4>
                  <p>Elegante y tradicional, perfecta para bares sofisticados</p>
                  <div className="template-features">
                    <span className="feature-tag">Responsive</span>
                    <span className="feature-tag">SEO Optimizada</span>
                  </div>
                  <button className="template-select-btn">Seleccionar</button>
                </div>
              </div>

              {/* Template 2 - Moderna */}
              <div className="template-card-new">
                <div className="template-image">
                  <div className="mock-browser">
                    <div className="browser-bar">
                      <div className="browser-dots">
                        <div className="dot red"></div>
                        <div className="dot yellow"></div>
                        <div className="dot green"></div>
                      </div>
                      <div className="url-bar">tubar.com/menu</div>
                    </div>
                    <div className="template-content modern-design">
                      <div className="modern-nav">BOURBON LOUNGE</div>
                      <div className="modern-grid-layout">
                        <div className="modern-card">
                          <div className="card-image">🍹</div>
                          <div className="card-info">
                            <h4>MOJITO</h4>
                            <span>$12</span>
                          </div>
                        </div>
                        <div className="modern-card">
                          <div className="card-image">🥃</div>
                          <div className="card-info">
                            <h4>WHISKEY</h4>
                            <span>$16</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="template-details">
                  <h4>Moderna</h4>
                  <p>Diseño limpio y minimalista con cards interactivos</p>
                  <div className="template-features">
                    <span className="feature-tag">Grid Layout</span>
                    <span className="feature-tag">Animaciones</span>
                  </div>
                  <button className="template-select-btn">Seleccionar</button>
                </div>
              </div>

              {/* Template 3 - Tropical */}
              <div className="template-card-new">
                <div className="template-image">
                  <div className="mock-browser">
                    <div className="browser-bar">
                      <div className="browser-dots">
                        <div className="dot red"></div>
                        <div className="dot yellow"></div>
                        <div className="dot green"></div>
                      </div>
                      <div className="url-bar">beach-bar.com</div>
                    </div>
                    <div className="template-content tropical-design">
                      <div className="tropical-header">
                        <h3>🌴 Tropical Paradise 🌴</h3>
                        <div className="wave-divider"></div>
                      </div>
                      <div className="tropical-menu">
                        <div className="tropical-item">
                          <span className="drink-emoji">🍹</span>
                          <span>Piña Colada</span>
                          <span>$11</span>
                        </div>
                        <div className="tropical-item">
                          <span className="drink-emoji">🥥</span>
                          <span>Coconut Mojito</span>
                          <span>$10</span>
                        </div>
                        <div className="tropical-item">
                          <span className="drink-emoji">🍸</span>
                          <span>Mango Daiquiri</span>
                          <span>$12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="template-details">
                  <h4>Tropical</h4>
                  <p>Colores vibrantes, perfecta para beach bars y terrazas</p>
                  <div className="template-features">
                    <span className="feature-tag">Colorful</span>
                    <span className="feature-tag">Beach Theme</span>
                  </div>
                  <button className="template-select-btn">Seleccionar</button>
                </div>
              </div>

              {/* Template 4 - Dark Luxury */}
              <div className="template-card-new">
                <div className="template-image">
                  <div className="mock-browser">
                    <div className="browser-bar">
                      <div className="browser-dots">
                        <div className="dot red"></div>
                        <div className="dot yellow"></div>
                        <div className="dot green"></div>
                      </div>
                      <div className="url-bar">premium-lounge.com</div>
                    </div>
                    <div className="template-content luxury-design">
                      <div className="luxury-header">
                        <h3>PREMIUM LOUNGE</h3>
                        <div className="gold-line"></div>
                      </div>
                      <div className="luxury-menu">
                        <div className="luxury-item">
                          <div className="item-details">
                            <h4>Dom Pérignon 2012</h4>
                            <p>Champagne Premium</p>
                          </div>
                          <span className="price">$180</span>
                        </div>
                        <div className="luxury-item">
                          <div className="item-details">
                            <h4>Macallan 25 Years</h4>
                            <p>Single Malt Whiskey</p>
                          </div>
                          <span className="price">$95</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="template-details">
                  <h4>Luxury Dark</h4>
                  <p>Diseño premium para lounges y bares de alta gama</p>
                  <div className="template-features">
                    <span className="feature-tag">Premium</span>
                    <span className="feature-tag">Dark Mode</span>
                  </div>
                  <button className="template-select-btn">Seleccionar</button>
                </div>
              </div>

              {/* Template 5 - Vintage */}
              <div className="template-card-new">
                <div className="template-image">
                  <div className="mock-browser">
                    <div className="browser-bar">
                      <div className="browser-dots">
                        <div className="dot red"></div>
                        <div className="dot yellow"></div>
                        <div className="dot green"></div>
                      </div>
                      <div className="url-bar">vintage-bar.com</div>
                    </div>
                    <div className="template-content vintage-design">
                      <div className="vintage-frame">
                        <h3>VINTAGE BAR</h3>
                        <p>~ ESTABLISHED 1920 ~</p>
                      </div>
                      <div className="vintage-menu">
                        <div className="vintage-item">Manhattan ..................... $15</div>
                        <div className="vintage-item">Martini ........................ $13</div>
                        <div className="vintage-item">Sidecar ........................ $14</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="template-details">
                  <h4>Vintage</h4>
                  <p>Estilo retro años 20, ideal para speakeasy y bares temáticos</p>
                  <div className="template-features">
                    <span className="feature-tag">Retro</span>
                    <span className="feature-tag">Speakeasy</span>
                  </div>
                  <button className="template-select-btn">Seleccionar</button>
                </div>
              </div>

              {/* Template 6 - Minimalist */}
              <div className="template-card-new">
                <div className="template-image">
                  <div className="mock-browser">
                    <div className="browser-bar">
                      <div className="browser-dots">
                        <div className="dot red"></div>
                        <div className="dot yellow"></div>
                        <div className="dot green"></div>
                      </div>
                      <div className="url-bar">minimal-bar.com</div>
                    </div>
                    <div className="template-content minimal-design">
                      <div className="minimal-header">BAR</div>
                      <div className="minimal-menu">
                        <div className="minimal-category">COCKTAILS</div>
                        <div className="minimal-item">
                          <span>Negroni</span>
                          <span>14</span>
                        </div>
                        <div className="minimal-item">
                          <span>Aperol Spritz</span>
                          <span>12</span>
                        </div>
                        <div className="minimal-category">SPIRITS</div>
                        <div className="minimal-item">
                          <span>Gin Tonic</span>
                          <span>10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="template-details">
                  <h4>Minimalista</h4>
                  <p>Ultra limpio y simple, máxima legibilidad y elegancia</p>
                  <div className="template-features">
                    <span className="feature-tag">Simple</span>
                    <span className="feature-tag">Clean</span>
                  </div>
                  <button className="template-select-btn">Seleccionar</button>
                </div>
              </div>
            </div>

            <div className="current-template-section">
              <h2 className="text-2xl font-bold mb-6">Tu Carta Actual</h2>
              <div className="current-template-card">
                <div className="current-template-preview">
                  <div className="mini-browser">
                    <div className="mini-browser-bar">
                      <div className="mini-dots">
                        <div className="dot red"></div>
                        <div className="dot yellow"></div>
                        <div className="dot green"></div>
                      </div>
                      <div className="mini-url">turestaurante.com/carta</div>
                    </div>
                    <div className="mini-content classic-design">
                      <div className="mini-header">
                        <div className="mini-logo">🍸</div>
                        <h4>Tu Restaurante</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="current-template-info">
                  <div>
                    <h3 className="text-lg font-semibold">Plantilla Activa: Clásica</h3>
                    <p className="text-gray-600">Última actualización: Hace 2 días</p>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Publicada y activa
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button className="template-btn-secondary">
                      <span>👁️</span>
                      Vista Previa
                    </button>
                    <button className="template-btn">
                      <span>✏️</span>
                      Personalizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'comandas':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Comandas</h1>
            <p className="text-gray-600">Gestiona pedidos y comandas de clientes.</p>
          </div>
        )
      case 'equipo':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Equipo</h1>
            <p className="text-gray-600">Administra tu equipo de trabajo.</p>
          </div>
        )
      case 'ajustes':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Ajustes</h1>
            <p className="text-gray-600">Configuración de la aplicación.</p>
          </div>
        )
      default:
        return <div>Sección no encontrada</div>
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold capitalize">
                {activeSection.replace('-', ' ')}
              </h1>
              <div className="text-xs text-gray-500">
                Cmd+B para colapsar sidebar
              </div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          {renderContent()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}