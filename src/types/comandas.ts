export type OrderStatus = 
  | 'pending'
  | 'confirmed' 
  | 'preparing'
  | 'ready'
  | 'served'
  | 'paid'
  | 'cancelled'

export interface RestaurantTable {
  id: string
  user_id: string
  table_number: number
  table_name?: string
  seats: number
  position_x: number
  position_y: number
  width: number
  height: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Waiter {
  id: string
  user_id: string
  name: string
  email?: string
  phone?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductCategory {
  id: string
  user_id: string
  name: string
  description?: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MenuItem {
  id: string
  user_id: string
  category_id?: string
  name: string
  description?: string
  price: number
  cost: number
  preparation_time: number
  is_available: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  category?: ProductCategory
}

export interface Order {
  id: string
  user_id: string
  table_id?: string
  waiter_id?: string
  order_number: number
  customer_name?: string
  customer_notes?: string
  status: OrderStatus
  subtotal: number
  tax_amount: number
  discount_amount: number
  total_amount: number
  payment_method?: string
  is_takeaway: boolean
  created_at: string
  updated_at: string
  served_at?: string
  paid_at?: string
  table?: RestaurantTable
  waiter?: Waiter
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  menu_item_id: string
  quantity: number
  unit_price: number
  subtotal: number
  special_instructions?: string
  created_at: string
  updated_at: string
  menu_item?: MenuItem
}

export interface NewTable {
  table_number: number
  table_name?: string
  seats?: number
  position_x?: number
  position_y?: number
  width?: number
  height?: number
}

export interface NewWaiter {
  name: string
  email?: string
  phone?: string
}

export interface NewMenuItem {
  category_id?: string
  name: string
  description?: string
  price: number
  cost?: number
  preparation_time?: number
}

export interface NewOrder {
  table_id?: string
  waiter_id?: string
  customer_name?: string
  customer_notes?: string
  is_takeaway?: boolean
  items: NewOrderItem[]
}

export interface NewOrderItem {
  menu_item_id: string
  quantity: number
  unit_price: number
  special_instructions?: string
}

export interface TableLayout {
  tables: RestaurantTable[]
  canvasWidth: number
  canvasHeight: number
}

export type OrderStatusUpdate = {
  status: OrderStatus
  served_at?: string
  paid_at?: string
}

export interface OrderFilters {
  status?: OrderStatus[]
  table_id?: string
  waiter_id?: string
  is_takeaway?: boolean
  date_from?: string
  date_to?: string
}

export interface DashboardStats {
  total_orders: number
  pending_orders: number
  revenue_today: number
  average_order_value: number
  popular_items: {
    item_name: string
    quantity_sold: number
  }[]
  orders_by_hour: {
    hour: number
    count: number
  }[]
}