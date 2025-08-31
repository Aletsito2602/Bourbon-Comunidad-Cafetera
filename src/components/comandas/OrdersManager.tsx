import { useState, useEffect } from 'react'
import { RefreshCw, Eye, CheckCircle, MapPin, Coffee, ClipboardList, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Order, OrderStatus, OrderFilters } from '@/types/comandas'
import { comandasService } from '@/lib/comandas-service'

interface OrdersManagerProps {
  onRefreshDashboard?: () => void
}

export function OrdersManager({ onRefreshDashboard }: OrdersManagerProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filters, setFilters] = useState<OrderFilters>({})

  const loadOrders = async () => {
    try {
      setIsLoading(true)
      const ordersData = await comandasService.getOrders(filters)
      setOrders(ordersData)
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [filters])

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await comandasService.updateOrderStatus(orderId, newStatus)
      await loadOrders()
      onRefreshDashboard?.()
      
      if (selectedOrder?.id === orderId) {
        const updatedOrder = await comandasService.getOrderById(orderId)
        setSelectedOrder(updatedOrder)
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Error al actualizar el estado del pedido')
    }
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

  const getNextStatus = (status: OrderStatus): OrderStatus | null => {
    switch (status) {
      case 'pending': return 'confirmed'
      case 'confirmed': return 'preparing'
      case 'preparing': return 'ready'
      case 'ready': return 'served'
      case 'served': return 'paid'
      default: return null
    }
  }

  const getNextStatusLabel = (status: OrderStatus): string => {
    const next = getNextStatus(status)
    if (!next) return ''
    return getStatusLabel(next)
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Pedidos</h2>
          <p className="text-gray-600">Administra el estado de las comandas</p>
        </div>
        <Button onClick={loadOrders} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
      </div>

      {/* Quick Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!filters.status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({})}
            >
              Todos
            </Button>
            <Button
              variant={filters.status?.includes('pending') ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ status: ['pending'] })}
            >
              Pendientes
            </Button>
            <Button
              variant={filters.status?.includes('preparing') ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ status: ['preparing'] })}
            >
              En Preparación
            </Button>
            <Button
              variant={filters.status?.includes('ready') ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ status: ['ready'] })}
            >
              Listos
            </Button>
            <Button
              variant={filters.is_takeaway === true ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ is_takeaway: true })}
            >
              Take Away
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2 space-y-4">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No hay pedidos que mostrar</p>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card 
                key={order.id}
                className={`cursor-pointer transition-all ${
                  selectedOrder?.id === order.id ? 'ring-2 ring-amber-500' : ''
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-bold">#{order.order_number}</div>
                      {order.table ? (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Mesa {order.table.table_number}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="flex items-center gap-1 bg-green-100 text-green-800">
                          <Coffee className="h-3 w-3" />
                          Take Away
                        </Badge>
                      )}
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${order.total_amount.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">
                        {formatTime(order.created_at)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {order.customer_name && (
                        <p className="text-sm font-medium">{order.customer_name}</p>
                      )}
                      <p className="text-sm text-gray-600">
                        {order.items?.length || 0} items
                      </p>
                    </div>
                    
                    {getNextStatus(order.status) && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          const nextStatus = getNextStatus(order.status)
                          if (nextStatus) {
                            handleStatusChange(order.id, nextStatus)
                          }
                        }}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {getNextStatusLabel(order.status)}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Order Details */}
        <div>
          {selectedOrder ? (
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Pedido #{selectedOrder.order_number}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Info */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Estado:</span>
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {getStatusLabel(selectedOrder.status)}
                    </Badge>
                  </div>
                  
                  {selectedOrder.table && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Mesa:</span>
                      <span className="text-sm font-medium">
                        {selectedOrder.table.table_number}
                        {selectedOrder.table.table_name && ` (${selectedOrder.table.table_name})`}
                      </span>
                    </div>
                  )}
                  
                  {selectedOrder.customer_name && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cliente:</span>
                      <span className="text-sm font-medium">{selectedOrder.customer_name}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Hora:</span>
                    <span className="text-sm">{formatTime(selectedOrder.created_at)}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-medium mb-2">Items del Pedido</h4>
                  <div className="space-y-2">
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="flex justify-between items-start text-sm">
                        <div className="flex-1">
                          <div className="font-medium">{item.menu_item?.name}</div>
                          {item.special_instructions && (
                            <div className="text-gray-600 text-xs italic">
                              {item.special_instructions}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div>{item.quantity}x ${item.unit_price.toFixed(2)}</div>
                          <div className="font-medium">${item.subtotal.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${selectedOrder.total_amount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Customer Notes */}
                {selectedOrder.customer_notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notas del Cliente</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {selectedOrder.customer_notes}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  {getNextStatus(selectedOrder.status) && (
                    <Button
                      className="w-full"
                      onClick={() => {
                        const nextStatus = getNextStatus(selectedOrder.status)
                        if (nextStatus) {
                          handleStatusChange(selectedOrder.id, nextStatus)
                        }
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Marcar como {getNextStatusLabel(selectedOrder.status)}
                    </Button>
                  )}
                  
                  {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'paid' && (
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        if (confirm('¿Está seguro de cancelar este pedido?')) {
                          handleStatusChange(selectedOrder.id, 'cancelled')
                        }
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar Pedido
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Eye className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Selecciona un pedido para ver los detalles</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}