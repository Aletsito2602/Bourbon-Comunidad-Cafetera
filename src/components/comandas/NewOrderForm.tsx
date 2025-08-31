import { useState, useEffect } from 'react'
import { Plus, Minus, Save, X, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { RestaurantTable, MenuItem, ProductCategory, NewOrderItem } from '@/types/comandas'
import { comandasService } from '@/lib/comandas-service'

interface NewOrderFormProps {
  selectedTable?: RestaurantTable | null
  onSuccess: () => void
  onCancel: () => void
}

interface CartItem extends NewOrderItem {
  menu_item: MenuItem
}

export function NewOrderForm({ selectedTable, onSuccess, onCancel }: NewOrderFormProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [customerName, setCustomerName] = useState('')
  const [customerNotes, setCustomerNotes] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [itemsData, categoriesData] = await Promise.all([
          comandasService.getMenuItems(),
          comandasService.getCategories()
        ])
        setMenuItems(itemsData)
        setCategories(categoriesData)
        if (categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].id)
        }
      } catch (error) {
        console.error('Error loading menu data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const addToCart = (menuItem: MenuItem) => {
    const existingItem = cart.find(item => item.menu_item_id === menuItem.id)
    
    if (existingItem) {
      setCart(prev => prev.map(item =>
        item.menu_item_id === menuItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart(prev => [...prev, {
        menu_item_id: menuItem.id,
        quantity: 1,
        unit_price: menuItem.price,
        menu_item: menuItem
      }])
    }
  }

  const updateQuantity = (menuItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prev => prev.filter(item => item.menu_item_id !== menuItemId))
    } else {
      setCart(prev => prev.map(item =>
        item.menu_item_id === menuItemId
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const updateSpecialInstructions = (menuItemId: string, instructions: string) => {
    setCart(prev => prev.map(item =>
      item.menu_item_id === menuItemId
        ? { ...item, special_instructions: instructions }
        : item
    ))
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.quantity * item.unit_price), 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (cart.length === 0) {
      alert('Agregue al menos un item al pedido')
      return
    }

    setIsSubmitting(true)

    try {
      const orderData = {
        table_id: selectedTable?.id,
        customer_name: customerName || undefined,
        customer_notes: customerNotes || undefined,
        is_takeaway: !selectedTable,
        items: cart.map(item => ({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          special_instructions: item.special_instructions
        }))
      }

      await comandasService.createOrder(orderData)
      alert('¡Pedido creado exitosamente!')
      onSuccess()
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Error al crear el pedido. Intente nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredItems = menuItems.filter(item => 
    !activeCategory || item.category_id === activeCategory
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Nueva Comanda
            {selectedTable && (
              <Badge variant="outline">
                Mesa {selectedTable.table_number}
              </Badge>
            )}
            {!selectedTable && (
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Take Away
              </Badge>
            )}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_name">Nombre del Cliente</Label>
              <Input
                id="customer_name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Opcional"
              />
            </div>
            <div>
              <Label htmlFor="customer_notes">Notas Especiales</Label>
              <Input
                id="customer_notes"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="Alergias, preferencias, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Menu Items */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Menú</h3>
              
              {/* Category Tabs */}
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              )}

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      {item.description && (
                        <div className="text-sm text-gray-600">{item.description}</div>
                      )}
                      <div className="text-sm font-medium text-green-600">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addToCart(item)}
                      disabled={!item.is_available}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {filteredItems.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    No hay productos en esta categoría
                  </p>
                )}
              </div>
            </div>

            {/* Cart */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pedido</h3>
              
              {cart.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <ShoppingCart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Carrito vacío</p>
                    <p className="text-sm text-gray-400">Agregue productos del menú</p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-4 space-y-3">
                    {cart.map((item) => (
                      <div key={item.menu_item_id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-medium">{item.menu_item.name}</div>
                            <div className="text-sm text-gray-600">
                              ${item.unit_price.toFixed(2)} c/u
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.menu_item_id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.menu_item_id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="font-medium w-20 text-right">
                            ${(item.quantity * item.unit_price).toFixed(2)}
                          </div>
                        </div>
                        
                        <Input
                          placeholder="Instrucciones especiales..."
                          value={item.special_instructions || ''}
                          onChange={(e) => updateSpecialInstructions(item.menu_item_id, e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    ))}
                    
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total:</span>
                        <span>${getTotalAmount().toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={cart.length === 0 || isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Creando...' : 'Crear Pedido'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}