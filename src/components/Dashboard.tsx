import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { AppSidebar } from './app-sidebar'
import { Settings } from './Settings'
import { CoffeeRecipesManager } from './coffee/CoffeeRecipesManager'
import { ComandasManager } from './comandas/ComandasManager'
import { Afiliados } from './Afiliados'
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
          <div className="space-y-6">
            {/* Header with greeting and date */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Buen día, Alejandro! ☕</h1>
                <p className="text-gray-600">Viernes, 13 de Septiembre • Tu cafetería está funcionando perfectamente</p>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-lg">
                <div className="text-sm font-medium">Estado del Sistema</div>
                <div className="flex items-center gap-1 text-xs">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  Operativo
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Revenue Today */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">$2,847</div>
                <div className="text-sm text-gray-600">Ventas de Hoy</div>
                <div className="mt-3 flex items-center text-xs text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  vs. ayer: +$318
                </div>
              </div>

              {/* Orders Today */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">+8.3%</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">127</div>
                <div className="text-sm text-gray-600">Órdenes Hoy</div>
                <div className="mt-3 flex items-center text-xs text-gray-500">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Promedio: 15.2 min
                </div>
              </div>

              {/* Customer Satisfaction */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">+0.2</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">4.8</div>
                <div className="text-sm text-gray-600">Satisfacción</div>
                <div className="mt-3 flex items-center text-xs text-gray-500">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  89 reseñas
                </div>
              </div>

              {/* Active Staff */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">100%</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">8/8</div>
                <div className="text-sm text-gray-600">Personal Activo</div>
                <div className="mt-3 flex items-center text-xs text-gray-500">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Turno completo
                </div>
              </div>
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="chart-title text-lg font-semibold text-gray-900">Ventas de la Semana</h3>
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors">7D</button>
                    <button className="text-xs px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">30D</button>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Chart Bars */}
                  <div className="flex items-end justify-between h-32 gap-2">
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-gradient-to-t from-amber-500 to-amber-300 w-10 rounded-t" style={{height: '76px'}}>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Lun</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-gradient-to-t from-amber-500 to-amber-300 w-10 rounded-t" style={{height: '102px'}}>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Mar</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-gradient-to-t from-amber-500 to-amber-300 w-10 rounded-t" style={{height: '58px'}}>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Mié</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-gradient-to-t from-amber-500 to-amber-300 w-10 rounded-t" style={{height: '115px'}}>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Jue</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-gradient-to-t from-amber-600 to-amber-400 w-10 rounded-t shadow-lg" style={{height: '128px'}}>
                      </div>
                      <span className="text-xs font-medium text-amber-600">Vie</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-gradient-to-t from-gray-400 to-gray-300 w-10 rounded-t" style={{height: '90px'}}>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">Sáb</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-gradient-to-t from-gray-400 to-gray-300 w-10 rounded-t" style={{height: '70px'}}>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">Dom</span>
                    </div>
                  </div>
                  
                  {/* Summary Stats */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-900">$14,457</div>
                      <div className="text-xs text-gray-500">Total Semana</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-green-600">+18.5%</div>
                      <div className="text-xs text-gray-500">vs. Anterior</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-900">$2,065</div>
                      <div className="text-xs text-gray-500">Promedio</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Products */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Productos Más Vendidos</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">☕</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Cappuccino</div>
                        <div className="text-sm text-gray-500">47 vendidos</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">$423</div>
                      <div className="text-xs text-green-600">+15%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🥐</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Croissant</div>
                        <div className="text-sm text-gray-500">32 vendidos</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">$192</div>
                      <div className="text-xs text-green-600">+8%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🧊</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Iced Latte</div>
                        <div className="text-sm text-gray-500">28 vendidos</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">$168</div>
                      <div className="text-xs text-blue-600">+22%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🍰</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Cheesecake</div>
                        <div className="text-sm text-gray-500">19 vendidos</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">$152</div>
                      <div className="text-xs text-purple-600">+5%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Órdenes Recientes</h3>
                  <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">Ver todas</button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-green-600">#127</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Mesa 8 - Cappuccino x2, Croissant</div>
                        <div className="text-sm text-gray-500">Hace 2 minutos</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">$24.50</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Completado</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-amber-600">#126</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Delivery - Iced Latte, Sandwich</div>
                        <div className="text-sm text-gray-500">Hace 5 minutos</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">$18.00</span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">En preparación</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">#125</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Mesa 3 - Espresso, Cheesecake</div>
                        <div className="text-sm text-gray-500">Hace 8 minutos</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">$15.50</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Nuevo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Acciones Rápidas</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">➕</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Nueva Orden</div>
                      <div className="text-sm text-gray-500">Crear pedido manual</div>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">📊</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Ver Reportes</div>
                      <div className="text-sm text-gray-500">Analytics detallados</div>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">📋</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Gestionar Stock</div>
                      <div className="text-sm text-gray-500">Actualizar inventario</div>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">⚙️</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Configuración</div>
                      <div className="text-sm text-gray-500">Ajustes del sistema</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 rounded-xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Rendimiento del Mes</h3>
                  <p className="text-amber-100">Septiembre 2024 • Día 13 de 30</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">87%</div>
                  <div className="text-sm text-amber-100">del objetivo</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">$18,420</div>
                  <div className="text-sm text-amber-100">Ventas del Mes</div>
                  <div className="text-xs text-amber-200 mt-1">Objetivo: $21,000</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">1,247</div>
                  <div className="text-sm text-amber-100">Órdenes Totales</div>
                  <div className="text-xs text-amber-200 mt-1">Promedio: 96/día</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">4.7★</div>
                  <div className="text-sm text-amber-100">Rating Promedio</div>
                  <div className="text-xs text-amber-200 mt-1">342 reseñas</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">92%</div>
                  <div className="text-sm text-amber-100">Clientes Satisfechos</div>
                  <div className="text-xs text-amber-200 mt-1">+3% vs mes anterior</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progreso del objetivo mensual</span>
                  <span>87%</span>
                </div>
                <div className="w-full bg-amber-400 bg-opacity-30 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{width: '87%'}}></div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'recetas':
        return <CoffeeRecipesManager />
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
        return <ComandasManager />
      case 'afiliados':
        return <Afiliados />
      case 'equipo':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Equipo</h1>
            <p className="text-gray-600">Administra tu equipo de trabajo.</p>
          </div>
        )
      case 'ajustes':
        return <Settings />
      
      // Secciones de Más de Bourbon
      case 'bourbon-app':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Bourbon App</h1>
              <p className="text-gray-600">Aplicación móvil para gestión de cafeterías</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="text-lg font-semibold">App para Clientes</h3>
                </div>
                <p className="text-gray-600 mb-4">Permite a tus clientes hacer pedidos, ver el menú y gestionar su cuenta desde su teléfono.</p>
                <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
                  Descargar para Clientes
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👨‍💼</span>
                  </div>
                  <h3 className="text-lg font-semibold">App para Personal</h3>
                </div>
                <p className="text-gray-600 mb-4">Herramienta para que tu equipo gestione pedidos, inventario y tareas desde cualquier lugar.</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Descargar para Personal
                </button>
              </div>
            </div>
          </div>
        )

      case 'comandas-app':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Comandas App</h1>
              <p className="text-gray-600">Sistema especializado para gestión de comandas y pedidos</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Sistema de Comandas Profesional</h2>
              <p className="mb-6">Optimiza el flujo de trabajo de tu cocina con nuestro sistema especializado de comandas.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="font-semibold">Rápido</div>
                  <div className="text-sm opacity-90">Gestión en tiempo real</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="font-semibold">Eficiente</div>
                  <div className="text-sm opacity-90">Reduce tiempos de espera</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💡</div>
                  <div className="font-semibold">Inteligente</div>
                  <div className="text-sm opacity-90">Analytics integrados</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'app-comunidad':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">App Comunidad</h1>
              <p className="text-gray-600">Conecta con otros profesionales del café y la gastronomía</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  Red de Profesionales
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Conecta con baristas y chefs profesionales
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Comparte recetas y técnicas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Participa en eventos y competencias
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-2xl">📚</span>
                  Centro de Conocimiento
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Cursos especializados
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Biblioteca de recursos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Certificaciones profesionales
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )

      // Secciones de Soporte
      case 'software-medida':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Software a Medida</h1>
              <p className="text-gray-600">Desarrollo personalizado para tu negocio gastronómico</p>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4">¿Necesitas algo específico?</h2>
              <p className="mb-6">Desarrollamos soluciones tecnológicas personalizadas para restaurantes, cafeterías y negocios gastronómicos.</p>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Solicitar Cotización
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-3xl mb-4">🖥️</div>
                <h3 className="font-semibold mb-2">Sistemas POS</h3>
                <p className="text-gray-600 text-sm">Puntos de venta personalizados</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-3xl mb-4">📱</div>
                <h3 className="font-semibold mb-2">Apps Móviles</h3>
                <p className="text-gray-600 text-sm">Aplicaciones nativas para tu marca</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-3xl mb-4">🌐</div>
                <h3 className="font-semibold mb-2">Plataformas Web</h3>
                <p className="text-gray-600 text-sm">Sitios web y sistemas online</p>
              </div>
            </div>
          </div>
        )

      case 'soporte':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Soporte Técnico</h1>
              <p className="text-gray-600">Estamos aquí para ayudarte con cualquier problema técnico</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <span>💬</span>
                  </div>
                  <h3 className="text-lg font-semibold text-green-800">Chat en Vivo</h3>
                </div>
                <p className="text-green-700 mb-4">Disponible 24/7 para resolver tus dudas inmediatamente</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Iniciar Chat
                </button>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <span>📧</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800">Soporte por Email</h3>
                </div>
                <p className="text-blue-700 mb-4">Envíanos tu consulta y te responderemos en menos de 2 horas</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Enviar Email
                </button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Estado del Sistema</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">Todos los servicios funcionando correctamente</span>
              </div>
              <p className="text-gray-500 text-sm">Última verificación: hace 2 minutos</p>
            </div>
          </div>
        )

      case 'centro-ayuda':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Centro de Ayuda</h1>
              <p className="text-gray-600">Encuentra respuestas a las preguntas más frecuentes</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <input 
                  type="text" 
                  placeholder="¿Qué necesitas saber?"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                  Buscar
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="font-semibold mb-2">Primeros Pasos</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Configuración inicial</li>
                  <li>• Crear tu primera receta</li>
                  <li>• Gestionar inventario</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-3xl mb-4">⚙️</div>
                <h3 className="font-semibold mb-2">Configuración</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Personalizar colores</li>
                  <li>• Configurar facturación</li>
                  <li>• Gestionar usuarios</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-3xl mb-4">🔧</div>
                <h3 className="font-semibold mb-2">Solución de Problemas</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Problemas de login</li>
                  <li>• Errores comunes</li>
                  <li>• Recuperar datos</li>
                </ul>
              </div>
            </div>
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