-- ================================
-- DATOS DE EJEMPLO PARA RECETAS DE CAFÉ DE ESPECIALIDAD
-- ================================

-- Nota: Los UUIDs de user_id deben reemplazarse por IDs reales de usuarios registrados
-- Estos son solo ejemplos con UUIDs ficticios

-- Función para generar un UUID consistente basado en un string
CREATE OR REPLACE FUNCTION generate_uuid_from_string(input_string TEXT)
RETURNS UUID AS $$
BEGIN
    RETURN md5(input_string)::uuid;
END;
$$ LANGUAGE plpgsql;

-- Insertar recetas de ejemplo (usando UUID ficticios para demo)
-- IMPORTANTE: En producción, reemplazar los user_id con IDs reales

-- Receta 1: Espresso House Blend
INSERT INTO coffee_recipes (
    id, user_id, name, description, origin, process, altitude, roast_level, roast_date,
    brewing_method, brewing_technique, coffee_dose, water_amount, extraction_time, 
    water_temperature, grind_size, pressure, tds, extraction_yield, strength,
    fragrance_aroma, flavor, aftertaste, acidity, body, balance, uniformity, 
    clean_cup, sweetness, overall_score, tasting_notes, brewing_protocol,
    coffee_cost, total_cost, suggested_price, is_favorite, difficulty_level
) VALUES (
    generate_uuid_from_string('espresso-house-blend'),
    generate_uuid_from_string('demo-user-1'), -- Reemplazar con user_id real
    'Espresso House Blend',
    'Blend equilibrado de Brasil Santos y Colombia Huila, perfecto para espresso base',
    'Brasil Santos + Colombia Huila',
    'Semi-washed',
    1200,
    'Medium',
    CURRENT_DATE - INTERVAL '7 days',
    'Espresso',
    'Standard',
    18.5,
    37.0,
    28,
    93.0,
    'Fine',
    9.0,
    10.8,
    20.2,
    10.8,
    8.25, 8.0, 7.75, 7.5, 8.5, 8.0, 10.0, 10.0, 10.0, 84.5,
    'Chocolate amargo, nuez tostada, final dulce. Cuerpo cremoso con acidez balanceada.',
    'Pre-infusión 3s → Extracción constante 9 bar → Tiempo total 28s → Ratio 1:2.0',
    1.20, 1.75, 4.50, true, 3
);

-- Receta 2: Etiopía Yirgacheffe V60
INSERT INTO coffee_recipes (
    id, user_id, name, description, origin, process, altitude, roast_level, roast_date,
    brewing_method, brewing_technique, coffee_dose, water_amount, extraction_time, 
    water_temperature, grind_size, tds, extraction_yield, strength,
    fragrance_aroma, flavor, aftertaste, acidity, body, balance, uniformity, 
    clean_cup, sweetness, overall_score, tasting_notes, brewing_protocol,
    coffee_cost, total_cost, suggested_price, difficulty_level
) VALUES (
    generate_uuid_from_string('ethiopia-yirgacheffe-v60'),
    generate_uuid_from_string('demo-user-1'),
    'Etiopía Yirgacheffe',
    'Café de origen único procesado natural, perfil floral y frutal',
    'Etiopía Yirgacheffe',
    'Natural Process',
    1800,
    'Light-Medium',
    CURRENT_DATE - INTERVAL '5 days',
    'V60',
    'Standard',
    22.0,
    350.0,
    200, -- 3:20 en segundos
    94.0,
    'Medium',
    1.42,
    21.5,
    1.42,
    8.75, 8.5, 8.25, 9.0, 7.5, 8.75, 10.0, 10.0, 10.0, 88.0,
    'Bergamota, té negro, chocolate blanco. Acidez brillante, cuerpo medio, final floral.',
    'Bloom 44g/30s → 150g/1:15 → 250g/2:10 → 350g/2:45. Agitación suave post-bloom.',
    1.80, 2.20, 5.50, true, 4
);

-- Receta 3: Cold Brew Concentrate
INSERT INTO coffee_recipes (
    id, user_id, name, description, origin, process, altitude, roast_level, roast_date,
    brewing_method, brewing_technique, coffee_dose, water_amount, extraction_time, 
    water_temperature, grind_size, tds, extraction_yield, strength,
    fragrance_aroma, flavor, aftertaste, acidity, body, balance, uniformity, 
    clean_cup, sweetness, overall_score, tasting_notes, brewing_protocol,
    coffee_cost, total_cost, suggested_price, difficulty_level
) VALUES (
    generate_uuid_from_string('cold-brew-concentrate'),
    generate_uuid_from_string('demo-user-1'),
    'Cold Brew Concentrate',
    'Concentrado para preparación en lotes, base para múltiples bebidas frías',
    'Guatemala Antigua + Brasil Cerrado',
    'Washed + Semi-washed',
    1400,
    'Medium-Dark',
    CURRENT_DATE - INTERVAL '3 days',
    'Cold Brew',
    'Immersion',
    500.0,
    3000.0,
    64800, -- 18 horas en segundos
    20.0, -- Temperatura ambiente
    'Coarse',
    3.8,
    22.8,
    3.8,
    7.5, 8.0, 8.25, 6.5, 9.0, 8.5, 10.0, 10.0, 10.0, 82.0,
    'Chocolate dulce, caramelo, notas a nuez. Cuerpo full, baja acidez.',
    'Molienda gruesa (800-900μm). Inmersión total 18h. Filtrado doble: malla gruesa + papel.',
    12.50, 15.00, 4.00, false, 2
);

-- Receta 4: Perú Amazonas Aeropress
INSERT INTO coffee_recipes (
    id, user_id, name, description, origin, process, altitude, roast_level, roast_date,
    brewing_method, brewing_technique, coffee_dose, water_amount, extraction_time, 
    water_temperature, grind_size, tds, extraction_yield, strength,
    fragrance_aroma, flavor, aftertaste, acidity, body, balance, uniformity, 
    clean_cup, sweetness, overall_score, tasting_notes, brewing_protocol,
    coffee_cost, total_cost, suggested_price, difficulty_level
) VALUES (
    generate_uuid_from_string('peru-amazonas-aeropress'),
    generate_uuid_from_string('demo-user-1'),
    'Perú Amazonas',
    'Café de cooperativa, método invertido para resaltar origen',
    'Perú Amazonas',
    'Washed Process',
    1600,
    'Medium',
    CURRENT_DATE - INTERVAL '10 days',
    'Aeropress',
    'Invertido',
    17.0,
    250.0,
    150, -- 2:30 en segundos
    87.0,
    'Medium-Fine',
    1.28,
    19.8,
    1.28,
    8.0, 7.75, 7.5, 8.25, 8.0, 7.75, 10.0, 10.0, 9.0, 81.5,
    'Cítricos suaves, chocolate con leche, final limpio.',
    'Invertido: 100g bloom 30s → 200g agitar → 250g 1:30 → voltear → press 30s',
    1.50, 1.95, 4.25, false, 3
);

-- Insertar ingredientes adicionales para algunas recetas
INSERT INTO recipe_ingredients (recipe_id, ingredient_name, ingredient_type, amount, unit, optional) VALUES
(generate_uuid_from_string('espresso-house-blend'), 'Leche', 'Dairy', 150, 'ml', true),
(generate_uuid_from_string('espresso-house-blend'), 'Azúcar', 'Sweetener', 1, 'tsp', true),
(generate_uuid_from_string('cold-brew-concentrate'), 'Hielo', 'Ice', 100, 'g', false),
(generate_uuid_from_string('cold-brew-concentrate'), 'Agua', 'Dilution', 150, 'ml', true),
(generate_uuid_from_string('cold-brew-concentrate'), 'Leche de Almendra', 'Plant Milk', 50, 'ml', true);

-- Insertar etiquetas para las recetas
INSERT INTO recipe_tags (recipe_id, tag) VALUES
(generate_uuid_from_string('espresso-house-blend'), 'espresso'),
(generate_uuid_from_string('espresso-house-blend'), 'blend'),
(generate_uuid_from_string('espresso-house-blend'), 'daily-special'),
(generate_uuid_from_string('espresso-house-blend'), 'beginner-friendly'),

(generate_uuid_from_string('ethiopia-yirgacheffe-v60'), 'v60'),
(generate_uuid_from_string('ethiopia-yirgacheffe-v60'), 'single-origin'),
(generate_uuid_from_string('ethiopia-yirgacheffe-v60'), 'floral'),
(generate_uuid_from_string('ethiopia-yirgacheffe-v60'), 'specialty'),
(generate_uuid_from_string('ethiopia-yirgacheffe-v60'), 'advanced'),

(generate_uuid_from_string('cold-brew-concentrate'), 'cold-brew'),
(generate_uuid_from_string('cold-brew-concentrate'), 'batch'),
(generate_uuid_from_string('cold-brew-concentrate'), 'concentrate'),
(generate_uuid_from_string('cold-brew-concentrate'), 'summer'),

(generate_uuid_from_string('peru-amazonas-aeropress'), 'aeropress'),
(generate_uuid_from_string('peru-amazonas-aeropress'), 'single-origin'),
(generate_uuid_from_string('peru-amazonas-aeropress'), 'cooperative'),
(generate_uuid_from_string('peru-amazonas-aeropress'), 'sustainable');

-- Insertar algunas variaciones de ejemplo
INSERT INTO recipe_variations (recipe_id, user_id, variation_name, notes, coffee_dose, water_amount, extraction_time, overall_score, improvement_notes) VALUES
(generate_uuid_from_string('espresso-house-blend'), generate_uuid_from_string('demo-user-1'), 'Dosis Aumentada', 'Probando con más café para mayor cuerpo', 19.0, 37.0, 26, 85.2, 'Mejor balance, ligeramente más intenso'),
(generate_uuid_from_string('ethiopia-yirgacheffe-v60'), generate_uuid_from_string('demo-user-1'), 'Temperatura Reducida', 'Menos temperatura para preservar florales', 22.0, 350.0, 210, 89.1, 'Notas florales más pronunciadas, excelente');

-- Crear una sesión de cupping de ejemplo
INSERT INTO cupping_sessions (id, user_id, session_name, session_date, cupper_name, environment_notes) VALUES
(generate_uuid_from_string('cupping-session-1'), generate_uuid_from_string('demo-user-1'), 'Evaluación Orígenes Sudamericanos', CURRENT_DATE, 'Master Cupper', 'Temperatura: 22°C, Humedad: 45%, Sin olores externos');

-- Insertar evaluaciones de cupping
INSERT INTO cupping_evaluations (
    cupping_session_id, recipe_id, dry_fragrance, wet_aroma, brightness, flavor, 
    aftertaste, acidity, body, balance, uniformity, clean_cup, sweetness, 
    overall_impression, final_score, notes
) VALUES
(
    generate_uuid_from_string('cupping-session-1'),
    generate_uuid_from_string('peru-amazonas-aeropress'),
    8.0, 8.25, 7.75, 7.75, 7.5, 8.25, 8.0, 7.75, 10, 10, 9, 8.0, 82.5,
    'Origen limpio con características típicas de Amazonas. Buena representación del terroir.'
);

-- ================================
-- FUNCIÓN PARA LIMPIAR DATOS DE EJEMPLO
-- ================================

CREATE OR REPLACE FUNCTION cleanup_sample_data()
RETURNS TEXT AS $$
BEGIN
    -- Eliminar datos de ejemplo en orden inverso por dependencias
    DELETE FROM cupping_evaluations WHERE cupping_session_id = generate_uuid_from_string('cupping-session-1');
    DELETE FROM cupping_sessions WHERE id = generate_uuid_from_string('cupping-session-1');
    DELETE FROM recipe_variations WHERE recipe_id IN (
        generate_uuid_from_string('espresso-house-blend'),
        generate_uuid_from_string('ethiopia-yirgacheffe-v60'),
        generate_uuid_from_string('cold-brew-concentrate'),
        generate_uuid_from_string('peru-amazonas-aeropress')
    );
    DELETE FROM recipe_tags WHERE recipe_id IN (
        generate_uuid_from_string('espresso-house-blend'),
        generate_uuid_from_string('ethiopia-yirgacheffe-v60'),
        generate_uuid_from_string('cold-brew-concentrate'),
        generate_uuid_from_string('peru-amazonas-aeropress')
    );
    DELETE FROM recipe_ingredients WHERE recipe_id IN (
        generate_uuid_from_string('espresso-house-blend'),
        generate_uuid_from_string('ethiopia-yirgacheffe-v60'),
        generate_uuid_from_string('cold-brew-concentrate'),
        generate_uuid_from_string('peru-amazonas-aeropress')
    );
    DELETE FROM coffee_recipes WHERE id IN (
        generate_uuid_from_string('espresso-house-blend'),
        generate_uuid_from_string('ethiopia-yirgacheffe-v60'),
        generate_uuid_from_string('cold-brew-concentrate'),
        generate_uuid_from_string('peru-amazonas-aeropress')
    );
    
    DROP FUNCTION IF EXISTS generate_uuid_from_string(TEXT);
    
    RETURN 'Datos de ejemplo eliminados correctamente';
END;
$$ LANGUAGE plpgsql;

-- Comentarios para recordar actualizar los UUIDs
COMMENT ON FUNCTION cleanup_sample_data IS 'Función para eliminar todos los datos de ejemplo. Usar: SELECT cleanup_sample_data();';

-- Para ejecutar después de tener usuarios reales:
-- UPDATE coffee_recipes SET user_id = 'uuid-real-del-usuario' WHERE user_id = generate_uuid_from_string('demo-user-1');