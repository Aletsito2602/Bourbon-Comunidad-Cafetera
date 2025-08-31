import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ClipboardList, 
  MapPin, 
  Users, 
  Plus, 
  Coffee, 
  TrendingUp,
  Clock
} from 'lucide-react'
import { TablesSetup } from './TablesSetup'
import { OrdersManager } from './OrdersManager'
import { NewOrderForm } from './NewOrderForm'
import type { RestaurantTable, Order, OrderStatus, DashboardStats } from '@/types/comandas'
import { comandasService } from '@/lib/comandas-service'

export function ComandasManager() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null)
  const [showNewOrderForm, setShowNewOrderForm] = useState(false)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      const [statsData, ordersData] = await Promise.all([
        comandasService.getDashboardStats(),
        comandasService.getOrders({ 
          status: ['pending', 'confirmed', 'preparing', 'ready'] 
        })
      ])
      setStats(statsData)
      setRecentOrders(ordersData.slice(0, 10))
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const handleTableSelect = (table: RestaurantTable) => {
    setSelectedTable(table)
    setShowNewOrderForm(true)
  }

  const handleNewOrderSuccess = () => {
    setShowNewOrderForm(false)
    setSelectedTable(null)
    loadDashboardData()
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-orange-100 text-orange-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'served': return 'bg-gray-100 text-gray-800'
      case 'paid': return 'bg-emerald-100 text-emerald-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'Pendiente'
      case 'confirmed': return 'Confirmado'
      case 'preparing': return 'En Preparación'
      case 'ready': return 'Listo'
      case 'served': return 'Servido'
      case 'paid': return 'Pagado'
      case 'cancelled': return 'Cancelado'
      default: return status
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sistema de Comandas</h1>
          <p className="text-gray-600">Gestiona pedidos presenciales y take away</p>
        </div>
        <Button 
          onClick={() => setActiveTab('nueva-comanda')}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Comanda
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">
            <TrendingUp className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="pedidos">
            <ClipboardList className="h-4 w-4 mr-2" />
            Pedidos
          </TabsTrigger>
          <TabsTrigger value="nueva-comanda">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Comanda
          </TabsTrigger>
          <TabsTrigger value="mesas">
            <MapPin className="h-4 w-4 mr-2" />
            Mesas
          </TabsTrigger>
          <TabsTrigger value="personal">
            <Users className="h-4 w-4 mr-2" />
            Personal
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {stats && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pedidos Hoy</p>
                        <p className="text-2xl font-bold">{stats.total_orders}</p>
                      </div>
                      <ClipboardList className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pendientes</p>
                        <p className="text-2xl font-bold text-orange-600">{stats.pending_orders}</p>
                      </div>
                      <Clock className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Ingresos Hoy</p>
                        <p className="text-2xl font-bold text-green-600">
                          ${stats.revenue_today.toFixed(2)}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Ticket Promedio</p>
                        <p className="text-2xl font-bold">
                          ${stats.average_order_value.toFixed(2)}
                        </p>
                      </div>
                      <Coffee className="h-8 w-8 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders and Popular Items */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Pedidos Recientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentOrders.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No hay pedidos recientes</p>
                      ) : (
                        recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">
                                Orden #{order.order_number}
                                {order.table && ` - Mesa ${order.table.table_number}`}
                              </div>
                              <div className="text-sm text-gray-600">
                                {order.customer_name || 'Sin nombre'} • ${order.total_amount.toFixed(2)}
                              </div>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusLabel(order.status)}
                            </Badge>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Productos Populares
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stats.popular_items.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No hay datos suficientes</p>
                      ) : (
                        stats.popular_items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-sm font-bold text-amber-700">
                                {index + 1}
                              </div>
                              <span className="font-medium">{item.item_name}</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {item.quantity_sold} vendidos
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="pedidos">
          <OrdersManager onRefreshDashboard={loadDashboardData} />
        </TabsContent>

        {/* New Order Tab */}
        <TabsContent value="nueva-comanda" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nueva Comanda</CardTitle>
              <p className="text-gray-600">Selecciona una opción para comenzar</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Presencial */}
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MapPin className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Presencial</h3>
                    <p className="text-gray-600 text-sm">Pedido para mesa en el restaurante</p>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => setActiveTab('seleccionar-mesa')}
                  >
                    Seleccionar Mesa
                  </Button>
                </div>

                {/* Take Away */}
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Coffee className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Take Away</h3>
                    <p className="text-gray-600 text-sm">Pedido para llevar</p>
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setSelectedTable(null)
                      setShowNewOrderForm(true)
                    }}
                  >
                    Crear Pedido
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Show Order Form */}
          {showNewOrderForm && (
            <NewOrderForm
              selectedTable={selectedTable}
              onSuccess={handleNewOrderSuccess}
              onCancel={() => {
                setShowNewOrderForm(false)
                setSelectedTable(null)
              }}
            />
          )}
        </TabsContent>

        {/* Table Selection Tab */}
        <TabsContent value="seleccionar-mesa">
          <Card>
            <CardHeader>
              <CardTitle>Seleccionar Mesa</CardTitle>
            </CardHeader>
            <CardContent>
              <TablesSetup
                isViewOnly={true}
                onTableSelect={handleTableSelect}
                selectedTableId={selectedTable?.id}
              />
              {selectedTable && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mesa seleccionada: {selectedTable.table_number}</p>
                      {selectedTable.table_name && (
                        <p className="text-sm text-gray-600">{selectedTable.table_name}</p>
                      )}
                      <p className="text-sm text-gray-600">
                        Capacidad: {selectedTable.seats} personas
                      </p>
                    </div>
                    <Button onClick={() => setShowNewOrderForm(true)}>
                      Continuar con Pedido
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Show Order Form */}
          {showNewOrderForm && selectedTable && (
            <NewOrderForm
              selectedTable={selectedTable}
              onSuccess={handleNewOrderSuccess}
              onCancel={() => {
                setShowNewOrderForm(false)
                setSelectedTable(null)
              }}
            />
          )}
        </TabsContent>

        {/* Tables Tab */}
        <TabsContent value="mesas">
          <TablesSetup />
        </TabsContent>

        {/* Staff Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gestión de Personal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Gestión de mozos y personal próximamente</p>
                <p className="text-sm text-gray-500">
                  Por ahora, los pedidos se pueden crear sin asignar mozo específico
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}