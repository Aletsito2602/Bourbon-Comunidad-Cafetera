import { supabase } from './supabase'
import type {
  RestaurantTable,
  Waiter,
  MenuItem,
  Order,
  OrderItem,
  ProductCategory,
  NewTable,
  NewWaiter,
  NewMenuItem,
  NewOrder,
  NewOrderItem,
  OrderStatus,
  OrderFilters,
  DashboardStats
} from '@/types/comandas'

class ComandasService {
  // ================================
  // MESAS / TABLES
  // ================================
  
  async getTables(): Promise<RestaurantTable[]> {
    const { data, error } = await supabase
      .from('restaurant_tables')
      .select('*')
      .eq('is_active', true)
      .order('table_number')
    
    if (error) throw error
    return data || []
  }

  async createTable(table: NewTable): Promise<RestaurantTable> {
    const { data, error } = await supabase
      .from('restaurant_tables')
      .insert([{
        ...table,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async updateTable(id: string, table: Partial<RestaurantTable>): Promise<RestaurantTable> {
    const { data, error } = await supabase
      .from('restaurant_tables')
      .update(table)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async deleteTable(id: string): Promise<void> {
    const { error } = await supabase
      .from('restaurant_tables')
      .update({ is_active: false })
      .eq('id', id)
    
    if (error) throw error
  }

  async updateTablePositions(tables: { id: string; position_x: number; position_y: number }[]): Promise<void> {
    const updates = tables.map(table => ({
      id: table.id,
      position_x: table.position_x,
      position_y: table.position_y
    }))

    const { error } = await supabase
      .from('restaurant_tables')
      .upsert(updates)
    
    if (error) throw error
  }

  // ================================
  // MOZOS / WAITERS
  // ================================
  
  async getWaiters(): Promise<Waiter[]> {
    const { data, error } = await supabase
      .from('waiters')
      .select('*')
      .eq('is_active', true)
      .order('name')
    
    if (error) throw error
    return data || []
  }

  async createWaiter(waiter: NewWaiter): Promise<Waiter> {
    const { data, error } = await supabase
      .from('waiters')
      .insert([{
        ...waiter,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async updateWaiter(id: string, waiter: Partial<Waiter>): Promise<Waiter> {
    const { data, error } = await supabase
      .from('waiters')
      .update(waiter)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async deleteWaiter(id: string): Promise<void> {
    const { error } = await supabase
      .from('waiters')
      .update({ is_active: false })
      .eq('id', id)
    
    if (error) throw error
  }

  // ================================
  // CATEGORÍAS
  // ================================
  
  async getCategories(): Promise<ProductCategory[]> {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
    
    if (error) throw error
    return data || []
  }

  async createCategory(category: Omit<ProductCategory, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<ProductCategory> {
    const { data, error } = await supabase
      .from('product_categories')
      .insert([{
        ...category,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // ================================
  // ITEMS DEL MENÚ
  // ================================
  
  async getMenuItems(): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        category:product_categories(*)
      `)
      .eq('is_active', true)
      .order('name')
    
    if (error) throw error
    return data || []
  }

  async createMenuItem(item: NewMenuItem): Promise<MenuItem> {
    const { data, error } = await supabase
      .from('menu_items')
      .insert([{
        ...item,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }])
      .select(`
        *,
        category:product_categories(*)
      `)
      .single()
    
    if (error) throw error
    return data
  }

  async updateMenuItem(id: string, item: Partial<MenuItem>): Promise<MenuItem> {
    const { data, error } = await supabase
      .from('menu_items')
      .update(item)
      .eq('id', id)
      .select(`
        *,
        category:product_categories(*)
      `)
      .single()
    
    if (error) throw error
    return data
  }

  async deleteMenuItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('menu_items')
      .update({ is_active: false })
      .eq('id', id)
    
    if (error) throw error
  }

  // ================================
  // PEDIDOS / ORDERS
  // ================================
  
  async getOrders(filters?: OrderFilters): Promise<Order[]> {
    let query = supabase
      .from('orders')
      .select(`
        *,
        table:restaurant_tables(*),
        waiter:waiters(*),
        items:order_items(
          *,
          menu_item:menu_items(*)
        )
      `)
      .order('created_at', { ascending: false })

    if (filters?.status && filters.status.length > 0) {
      query = query.in('status', filters.status)
    }
    
    if (filters?.table_id) {
      query = query.eq('table_id', filters.table_id)
    }
    
    if (filters?.waiter_id) {
      query = query.eq('waiter_id', filters.waiter_id)
    }
    
    if (filters?.is_takeaway !== undefined) {
      query = query.eq('is_takeaway', filters.is_takeaway)
    }
    
    if (filters?.date_from) {
      query = query.gte('created_at', filters.date_from)
    }
    
    if (filters?.date_to) {
      query = query.lte('created_at', filters.date_to)
    }

    const { data, error } = await query
    
    if (error) throw error
    return data || []
  }

  async getOrderById(id: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        table:restaurant_tables(*),
        waiter:waiters(*),
        items:order_items(
          *,
          menu_item:menu_items(*)
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') return null // No rows returned
      throw error
    }
    return data
  }

  async createOrder(order: NewOrder): Promise<Order> {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) throw new Error('Usuario no autenticado')

    // Crear la orden
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: user.id,
        table_id: order.table_id,
        waiter_id: order.waiter_id,
        customer_name: order.customer_name,
        customer_notes: order.customer_notes,
        is_takeaway: order.is_takeaway || false,
        status: 'pending'
      }])
      .select()
      .single()
    
    if (orderError) throw orderError

    // Crear los items de la orden
    if (order.items && order.items.length > 0) {
      const orderItems = order.items.map(item => ({
        order_id: orderData.id,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        subtotal: item.quantity * item.unit_price,
        special_instructions: item.special_instructions
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)
      
      if (itemsError) throw itemsError
    }

    // Obtener la orden completa con relaciones
    const fullOrder = await this.getOrderById(orderData.id)
    if (!fullOrder) throw new Error('Error al obtener la orden creada')
    
    return fullOrder
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const updateData: any = { status }
    
    if (status === 'served') {
      updateData.served_at = new Date().toISOString()
    } else if (status === 'paid') {
      updateData.paid_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        table:restaurant_tables(*),
        waiter:waiters(*),
        items:order_items(
          *,
          menu_item:menu_items(*)
        )
      `)
      .single()
    
    if (error) throw error
    return data
  }

  async updateOrder(id: string, order: Partial<Order>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update(order)
      .eq('id', id)
      .select(`
        *,
        table:restaurant_tables(*),
        waiter:waiters(*),
        items:order_items(
          *,
          menu_item:menu_items(*)
        )
      `)
      .single()
    
    if (error) throw error
    return data
  }

  async addItemToOrder(orderId: string, item: NewOrderItem): Promise<void> {
    const { error } = await supabase
      .from('order_items')
      .insert([{
        order_id: orderId,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        subtotal: item.quantity * item.unit_price,
        special_instructions: item.special_instructions
      }])
    
    if (error) throw error
  }

  async updateOrderItem(id: string, item: Partial<OrderItem>): Promise<void> {
    if (item.quantity && item.unit_price) {
      item.subtotal = item.quantity * item.unit_price
    }

    const { error } = await supabase
      .from('order_items')
      .update(item)
      .eq('id', id)
    
    if (error) throw error
  }

  async removeOrderItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('order_items')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  async cancelOrder(id: string): Promise<Order> {
    return this.updateOrderStatus(id, 'cancelled')
  }

  // ================================
  // DASHBOARD & ANALYTICS
  // ================================
  
  async getDashboardStats(dateFrom?: string, dateTo?: string): Promise<DashboardStats> {
    const today = new Date()
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

    // Total orders today
    const { data: ordersToday, error: ordersError } = await supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .gte('created_at', dateFrom || startOfDay)
      .lte('created_at', dateTo || endOfDay)
    
    if (ordersError) throw ordersError

    // Pending orders
    const pendingOrders = ordersToday?.filter(order => 
      ['pending', 'confirmed', 'preparing'].includes(order.status)
    ) || []

    // Revenue calculation
    const revenue = ordersToday?.reduce((sum, order) => sum + order.total_amount, 0) || 0

    // Average order value
    const avgOrderValue = ordersToday?.length ? revenue / ordersToday.length : 0

    // Popular items
    const itemCounts: { [key: string]: { name: string; count: number } } = {}
    ordersToday?.forEach(order => {
      order.items?.forEach((item: any) => {
        const key = item.menu_item_id
        if (!itemCounts[key]) {
          itemCounts[key] = { name: item.menu_item?.name || 'Unknown', count: 0 }
        }
        itemCounts[key].count += item.quantity
      })
    })

    const popularItems = Object.values(itemCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(item => ({
        item_name: item.name,
        quantity_sold: item.count
      }))

    // Orders by hour
    const hourCounts = new Array(24).fill(0)
    ordersToday?.forEach(order => {
      const hour = new Date(order.created_at).getHours()
      hourCounts[hour]++
    })

    const ordersByHour = hourCounts.map((count, hour) => ({
      hour,
      count
    }))

    return {
      total_orders: ordersToday?.length || 0,
      pending_orders: pendingOrders.length,
      revenue_today: revenue,
      average_order_value: avgOrderValue,
      popular_items: popularItems,
      orders_by_hour: ordersByHour
    }
  }

  // ================================
  // UTILIDADES
  // ================================
  
  async getTablesWithActiveOrders(): Promise<(RestaurantTable & { active_orders: number })[]> {
    const { data, error } = await supabase
      .from('restaurant_tables')
      .select(`
        *,
        orders!inner(id, status)
      `)
      .eq('is_active', true)
      .in('orders.status', ['pending', 'confirmed', 'preparing', 'ready'])
    
    if (error) throw error

    // Transform data to include active orders count
    const tablesMap = new Map()
    
    data?.forEach((row: any) => {
      const tableId = row.id
      if (!tablesMap.has(tableId)) {
        tablesMap.set(tableId, {
          ...row,
          active_orders: 0
        })
        delete tablesMap.get(tableId).orders
      }
      tablesMap.get(tableId).active_orders++
    })

    return Array.from(tablesMap.values())
  }

  async getOrderStatusCounts(): Promise<Record<OrderStatus, number>> {
    const { data, error } = await supabase
      .from('orders')
      .select('status')
      .gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString())
    
    if (error) throw error

    const counts: Record<OrderStatus, number> = {
      pending: 0,
      confirmed: 0,
      preparing: 0,
      ready: 0,
      served: 0,
      paid: 0,
      cancelled: 0
    }

    data?.forEach(order => {
      counts[order.status as OrderStatus]++
    })

    return counts
  }
}

export const comandasService = new ComandasService()
export default comandasService