-- ================================
-- CONFIGURACIÓN DE STORAGE PARA IMÁGENES DE RECETAS
-- ================================

-- Crear bucket para imágenes de recetas de café
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
    'coffee-recipe-images', 
    'coffee-recipe-images', 
    true, 
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ================================
-- POLÍTICAS DE STORAGE
-- ================================

-- Permitir acceso público de lectura a las imágenes
CREATE POLICY "Public Access for Recipe Images" ON storage.objects
FOR SELECT USING (bucket_id = 'coffee-recipe-images');

-- Permitir que usuarios autenticados suban imágenes
CREATE POLICY "Allow authenticated users to upload recipe images" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'coffee-recipe-images' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Permitir que usuarios actualicen sus propias imágenes
CREATE POLICY "Allow users to update their own recipe images" ON storage.objects
FOR UPDATE USING (
    bucket_id = 'coffee-recipe-images' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Permitir que usuarios eliminen sus propias imágenes
CREATE POLICY "Allow users to delete their own recipe images" ON storage.objects
FOR DELETE USING (
    bucket_id = 'coffee-recipe-images' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ================================
-- FUNCIÓN PARA GENERAR URL DE IMAGEN
-- ================================

CREATE OR REPLACE FUNCTION get_recipe_image_url(image_path TEXT)
RETURNS TEXT AS $$
BEGIN
    IF image_path IS NULL OR image_path = '' THEN
        RETURN NULL;
    END IF;
    
    RETURN 'https://your-supabase-url.supabase.co/storage/v1/object/public/coffee-recipe-images/' || image_path;
END;
$$ LANGUAGE plpgsql;

-- ================================
-- FUNCIÓN PARA LIMPIAR IMÁGENES HUÉRFANAS
-- ================================

CREATE OR REPLACE FUNCTION cleanup_orphaned_recipe_images()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER := 0;
    img_record RECORD;
BEGIN
    -- Encontrar imágenes en storage que no están referenciadas en coffee_recipes
    FOR img_record IN 
        SELECT name 
        FROM storage.objects 
        WHERE bucket_id = 'coffee-recipe-images'
        AND name NOT IN (
            SELECT SUBSTRING(image_url FROM '[^/]+$') 
            FROM coffee_recipes 
            WHERE image_url IS NOT NULL
        )
    LOOP
        -- Eliminar imagen huérfana
        DELETE FROM storage.objects 
        WHERE bucket_id = 'coffee-recipe-images' 
        AND name = img_record.name;
        
        deleted_count := deleted_count + 1;
    END LOOP;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- ================================
-- TRIGGERS PARA MANEJO AUTOMÁTICO DE IMÁGENES
-- ================================

-- Función para limpiar imagen anterior cuando se actualiza una receta
CREATE OR REPLACE FUNCTION handle_recipe_image_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Si se está cambiando la imagen, eliminar la anterior
    IF OLD.image_url IS NOT NULL 
       AND NEW.image_url IS DISTINCT FROM OLD.image_url THEN
        
        DELETE FROM storage.objects 
        WHERE bucket_id = 'coffee-recipe-images' 
        AND name = SUBSTRING(OLD.image_url FROM '[^/]+$');
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Función para limpiar imagen cuando se elimina una receta
CREATE OR REPLACE FUNCTION handle_recipe_image_delete()
RETURNS TRIGGER AS $$
BEGIN
    -- Eliminar imagen asociada si existe
    IF OLD.image_url IS NOT NULL THEN
        DELETE FROM storage.objects 
        WHERE bucket_id = 'coffee-recipe-images' 
        AND name = SUBSTRING(OLD.image_url FROM '[^/]+$');
    END IF;
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Crear triggers
CREATE TRIGGER recipe_image_update_trigger
    AFTER UPDATE ON coffee_recipes
    FOR EACH ROW
    EXECUTE FUNCTION handle_recipe_image_update();

CREATE TRIGGER recipe_image_delete_trigger
    AFTER DELETE ON coffee_recipes
    FOR EACH ROW
    EXECUTE FUNCTION handle_recipe_image_delete();