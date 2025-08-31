-- ================================
-- SISTEMA DE COMANDAS PRESENCIALES
-- ================================

-- Extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de mesas
CREATE TABLE IF NOT EXISTS restaurant_tables (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    table_number INTEGER NOT NULL,
    table_name VARCHAR(50),
    seats INTEGER DEFAULT 4,
    position_x REAL DEFAULT 0,
    position_y REAL DEFAULT 0,
    width REAL DEFAULT 100,
    height REAL DEFAULT 100,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, table_number)
);

-- Tabla de mozos/personal
CREATE TABLE IF NOT EXISTS waiters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de categorías de productos
CREATE TABLE IF NOT EXISTS product_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de productos/items del menú
CREATE TABLE IF NOT EXISTS menu_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES product_categories(id) ON DELETE SET NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    cost DECIMAL(10,2) DEFAULT 0,
    preparation_time INTEGER DEFAULT 10, -- en minutos
    is_available BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Estados de pedidos
CREATE TYPE order_status AS ENUM (
    'pending',      -- Pendiente (recién creado)
    'confirmed',    -- Confirmado
    'preparing',    -- En preparación
    'ready',        -- Listo para servir
    'served',       -- Servido
    'paid',         -- Pagado
    'cancelled'     -- Cancelado
);

-- Tabla de comandas/pedidos
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    table_id UUID REFERENCES restaurant_tables(id) ON DELETE SET NULL,
    waiter_id UUID REFERENCES waiters(id) ON DELETE SET NULL,
    order_number SERIAL,
    customer_name VARCHAR(100),
    customer_notes TEXT,
    status order_status DEFAULT 'pending',
    subtotal DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) DEFAULT 0,
    payment_method VARCHAR(50),
    is_takeaway BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    served_at TIMESTAMP WITH TIME ZONE,
    paid_at TIMESTAMP WITH TIME ZONE
);

-- Tabla de items del pedido
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    special_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_restaurant_tables_user_id ON restaurant_tables(user_id);
CREATE INDEX IF NOT EXISTS idx_restaurant_tables_active ON restaurant_tables(is_active) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_waiters_user_id ON waiters(user_id);
CREATE INDEX IF NOT EXISTS idx_waiters_active ON waiters(is_active) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_product_categories_user_id ON product_categories(user_id);
CREATE INDEX IF NOT EXISTS idx_product_categories_order ON product_categories(display_order);

CREATE INDEX IF NOT EXISTS idx_menu_items_user_id ON menu_items(user_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(is_available) WHERE is_available = true;

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_table_id ON orders(table_id);
CREATE INDEX IF NOT EXISTS idx_orders_waiter_id ON orders(waiter_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_menu_item ON order_items(menu_item_id);

-- Triggers para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_restaurant_tables_updated_at 
    BEFORE UPDATE ON restaurant_tables 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_waiters_updated_at 
    BEFORE UPDATE ON waiters 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_categories_updated_at 
    BEFORE UPDATE ON product_categories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at 
    BEFORE UPDATE ON menu_items 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_items_updated_at 
    BEFORE UPDATE ON order_items 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) Policies
ALTER TABLE restaurant_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE waiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Políticas para restaurant_tables
CREATE POLICY "Users can manage their own tables" ON restaurant_tables
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para waiters
CREATE POLICY "Users can manage their own waiters" ON waiters
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para product_categories
CREATE POLICY "Users can manage their own categories" ON product_categories
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para menu_items
CREATE POLICY "Users can manage their own menu items" ON menu_items
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para orders
CREATE POLICY "Users can manage their own orders" ON orders
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para order_items (verificar a través de la orden)
CREATE POLICY "Users can manage items from their own orders" ON order_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- Función para calcular totales de órdenes automáticamente
CREATE OR REPLACE FUNCTION calculate_order_totals()
RETURNS TRIGGER AS $$
BEGIN
    -- Calcular subtotal basado en los items
    UPDATE orders 
    SET 
        subtotal = (
            SELECT COALESCE(SUM(subtotal), 0) 
            FROM order_items 
            WHERE order_id = CASE 
                WHEN TG_OP = 'DELETE' THEN OLD.order_id 
                ELSE NEW.order_id 
            END
        ),
        total_amount = (
            SELECT COALESCE(SUM(subtotal), 0) 
            FROM order_items 
            WHERE order_id = CASE 
                WHEN TG_OP = 'DELETE' THEN OLD.order_id 
                ELSE NEW.order_id 
            END
        ) + COALESCE(tax_amount, 0) - COALESCE(discount_amount, 0)
    WHERE id = CASE 
        WHEN TG_OP = 'DELETE' THEN OLD.order_id 
        ELSE NEW.order_id 
    END;
    
    RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END;
$$ LANGUAGE plpgsql;

-- Trigger para recalcular totales cuando se modifican items
CREATE TRIGGER trigger_calculate_order_totals
    AFTER INSERT OR UPDATE OR DELETE ON order_items
    FOR EACH ROW EXECUTE FUNCTION calculate_order_totals();

-- Datos de ejemplo para development
INSERT INTO product_categories (user_id, name, description, display_order) 
VALUES 
    ((SELECT auth.uid()), 'Bebidas Calientes', 'Café, té y bebidas calientes', 1),
    ((SELECT auth.uid()), 'Bebidas Frías', 'Jugos, refrescos y bebidas frías', 2),
    ((SELECT auth.uid()), 'Desayunos', 'Opciones para el desayuno', 3),
    ((SELECT auth.uid()), 'Postres', 'Dulces y postres', 4)
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (user_id, category_id, name, description, price, preparation_time)
SELECT 
    auth.uid(),
    (SELECT id FROM product_categories WHERE name = 'Bebidas Calientes' AND user_id = auth.uid() LIMIT 1),
    'Espresso',
    'Café expreso tradicional',
    3.50,
    3
WHERE auth.uid() IS NOT NULL
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (user_id, category_id, name, description, price, preparation_time)
SELECT 
    auth.uid(),
    (SELECT id FROM product_categories WHERE name = 'Bebidas Calientes' AND user_id = auth.uid() LIMIT 1),
    'Cappuccino',
    'Espresso con leche vaporizada',
    4.50,
    5
WHERE auth.uid() IS NOT NULL
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (user_id, category_id, name, description, price, preparation_time)
SELECT 
    auth.uid(),
    (SELECT id FROM product_categories WHERE name = 'Bebidas Frías' AND user_id = auth.uid() LIMIT 1),
    'Jugo de Naranja',
    'Jugo natural de naranja',
    3.00,
    2
WHERE auth.uid() IS NOT NULL
ON CONFLICT DO NOTHING;