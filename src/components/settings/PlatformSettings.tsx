import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SettingsService, type PlatformSettings as SettingsType } from '@/lib/settings-simple'
import { useSettings } from '@/contexts/SettingsContext'
import { Upload, Loader2, Palette, Save, Eye, RotateCcw } from 'lucide-react'

interface PlatformSettingsProps {
  settings: SettingsType
  onUpdate: (settings: SettingsType) => void
}

export function PlatformSettings({ settings, onUpdate }: PlatformSettingsProps) {
  const { applyTheme } = useSettings()
  const [formData, setFormData] = useState({
    platform_name: settings.platform_name || 'Bourbon Web',
    team_name: settings.team_name || 'Mi Equipo',
    primary_color: settings.primary_color || '#d97706',
    secondary_color: settings.secondary_color || '#f59e0b',
    accent_color: settings.accent_color || '#92400e'
  })
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.platform_logo_url || null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  // Efecto para limpiar preview al desmontar el componente
  useEffect(() => {
    return () => {
      if (isPreviewMode) {
        // Restaurar colores originales al desmontar
        const root = document.documentElement
        root.style.setProperty('--primary-color', settings.primary_color)
        root.style.setProperty('--secondary-color', settings.secondary_color)
        root.style.setProperty('--accent-color', settings.accent_color)
        root.style.setProperty('--sidebar-background', darkenColor(settings.primary_color, 0.7))
        root.style.setProperty('--sidebar-border', darkenColor(settings.primary_color, 0.5))
      }
    }
  }, [isPreviewMode, settings])

  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    
    // Si es un color y está en modo preview, aplicar inmediatamente
    if (isPreviewMode && (field === 'primary_color' || field === 'secondary_color' || field === 'accent_color')) {
      applyPreviewColors(newFormData)
    }
  }

  const applyPreviewColors = (data: typeof formData) => {
    // Aplicar colores temporalmente al DOM
    const root = document.documentElement
    root.style.setProperty('--primary-color', data.primary_color)
    root.style.setProperty('--secondary-color', data.secondary_color) 
    root.style.setProperty('--accent-color', data.accent_color)
    
    // Aplicar colores RGB para efectos con transparencia
    root.style.setProperty('--primary-color-rgb', hexToRgb(data.primary_color))
    root.style.setProperty('--secondary-color-rgb', hexToRgb(data.secondary_color))
    root.style.setProperty('--accent-color-rgb', hexToRgb(data.accent_color))
    
    // Aplicar colores de contraste automáticos
    root.style.setProperty('--primary-contrast', getContrastColor(data.primary_color))
    root.style.setProperty('--secondary-contrast', getContrastColor(data.secondary_color))
    root.style.setProperty('--accent-contrast', getContrastColor(data.accent_color))
    
    // Aplicar variaciones de colores para el sidebar (más oscuros para el fondo)
    root.style.setProperty('--sidebar-background', darkenColor(data.primary_color, 0.7))
    root.style.setProperty('--sidebar-border', darkenColor(data.primary_color, 0.5))
  }

  const darkenColor = (hex: string, opacity: number): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return '#2a2d3a'
    
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    
    // Crear una versión más oscura mezclando con un color base oscuro
    const darkR = Math.round(r * opacity + 42 * (1 - opacity)) // 42 = #2a
    const darkG = Math.round(g * opacity + 45 * (1 - opacity)) // 45 = #2d  
    const darkB = Math.round(b * opacity + 58 * (1 - opacity)) // 58 = #3a
    
    return `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`
  }

  // Función para calcular contraste WCAG
  const getContrastRatio = (color1: string, color2: string): number => {
    const getLuminance = (hex: string): number => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      if (!result) return 0
      
      const [r, g, b] = [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
      ]
      
      const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
    }
    
    const lum1 = getLuminance(color1)
    const lum2 = getLuminance(color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    
    return (brightest + 0.05) / (darkest + 0.05)
  }

  const getAccessibilityBadge = (primaryColor: string): { level: string; color: string; text: string } => {
    const contrastWithWhite = getContrastRatio(primaryColor, '#ffffff')
    const contrastWithBlack = getContrastRatio(primaryColor, '#000000')
    const bestContrast = Math.max(contrastWithWhite, contrastWithBlack)
    
    if (bestContrast >= 7) {
      return { level: 'AAA', color: 'bg-green-100 text-green-800', text: 'Excelente contraste' }
    } else if (bestContrast >= 4.5) {
      return { level: 'AA', color: 'bg-blue-100 text-blue-800', text: 'Buen contraste' }
    } else if (bestContrast >= 3) {
      return { level: 'A', color: 'bg-yellow-100 text-yellow-800', text: 'Contraste básico' }
    } else {
      return { level: 'X', color: 'bg-red-100 text-red-800', text: 'Contraste bajo' }
    }
  }

  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return '217, 119, 6' // fallback
    
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    
    return `${r}, ${g}, ${b}`
  }

  const togglePreview = () => {
    if (!isPreviewMode) {
      // Activar modo preview
      setIsPreviewMode(true)
      applyPreviewColors(formData)
    } else {
      // Desactivar modo preview y restaurar colores originales
      setIsPreviewMode(false)
      const root = document.documentElement
      root.style.setProperty('--primary-color', settings.primary_color)
      root.style.setProperty('--secondary-color', settings.secondary_color)
      root.style.setProperty('--accent-color', settings.accent_color)
      root.style.setProperty('--primary-color-rgb', hexToRgb(settings.primary_color))
      root.style.setProperty('--secondary-color-rgb', hexToRgb(settings.secondary_color))
      root.style.setProperty('--accent-color-rgb', hexToRgb(settings.accent_color))
      root.style.setProperty('--primary-contrast', getContrastColor(settings.primary_color))
      root.style.setProperty('--secondary-contrast', getContrastColor(settings.secondary_color))
      root.style.setProperty('--accent-contrast', getContrastColor(settings.accent_color))
      root.style.setProperty('--sidebar-background', darkenColor(settings.primary_color, 0.7))
      root.style.setProperty('--sidebar-border', darkenColor(settings.primary_color, 0.5))
      
      // Aplicar tema completo para asegurar consistencia
      setTimeout(() => {
        applyTheme()
      }, 100)
    }
  }

  const resetColors = () => {
    const defaultColors = {
      primary_color: '#d97706',
      secondary_color: '#f59e0b', 
      accent_color: '#92400e'
    }
    
    setFormData(prev => ({ ...prev, ...defaultColors }))
    
    if (isPreviewMode) {
      applyPreviewColors({ ...formData, ...defaultColors })
    }
  }

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    
    try {
      let logoUrl = settings.platform_logo_url
      
      // Subir logo si se seleccionó uno nuevo
      if (logoFile) {
        console.log('Starting logo upload process...')
        setUploading(true)
        const { data: uploadedUrl, error: uploadError } = await SettingsService.uploadLogo(logoFile, 'platform')
        
        if (uploadError) {
          console.error('Upload error in handleSave:', uploadError)
          throw new Error(uploadError.message || 'Error al subir la imagen')
        }
        
        if (!uploadedUrl) {
          throw new Error('No se pudo obtener la URL de la imagen subida')
        }
        
        logoUrl = uploadedUrl
        console.log('Logo uploaded successfully:', logoUrl)
        setUploading(false)
      }

      // Actualizar configuraciones
      const updatedSettings = {
        ...formData,
        platform_logo_url: logoUrl
      }

      console.log('Updating settings:', updatedSettings)
      const { data, error } = await SettingsService.updateSettings(updatedSettings)
      
      if (error) {
        console.error('Settings update error:', error)
        throw new Error(error.message || 'Error al guardar la configuración')
      }
      
      if (data) {
        onUpdate(data)
        // Reset logo file after successful save
        setLogoFile(null)
        // Desactivar modo preview ya que los cambios están guardados
        setIsPreviewMode(false)
        alert('Configuración guardada exitosamente')
      }
    } catch (error) {
      console.error('Error al guardar configuración:', error)
      const errorMessage = (error as Error).message || 'Error desconocido'
      alert('Error al guardar configuración: ' + errorMessage)
    } finally {
      setSaving(false)
      setUploading(false)
    }
  }

  const getContrastColor = (backgroundColor: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(backgroundColor)
    if (!result) return '#ffffff'
    
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance < 0.5 ? '#ffffff' : '#000000'
  }

  const presetColors = [
    { 
      name: 'Amber Clásico', 
      primary: '#d97706', 
      secondary: '#f59e0b', 
      accent: '#92400e',
      description: 'Cálido y profesional, ideal para cafeterías'
    },
    { 
      name: 'Azul Océano', 
      primary: '#1e40af', 
      secondary: '#3b82f6', 
      accent: '#1e3a8a',
      description: 'Confiable y moderno, perfecto para negocios'
    },
    { 
      name: 'Verde Bosque', 
      primary: '#065f46', 
      secondary: '#059669', 
      accent: '#064e3b',
      description: 'Natural y orgánico, ideal para productos eco-friendly'
    },
    { 
      name: 'Violeta Real', 
      primary: '#6d28d9', 
      secondary: '#8b5cf6', 
      accent: '#581c87',
      description: 'Elegante y premium, para experiencias de lujo'
    },
    { 
      name: 'Rojo Pasión', 
      primary: '#b91c1c', 
      secondary: '#ef4444', 
      accent: '#991b1b',
      description: 'Energético y vibrante, llama la atención'
    },
    { 
      name: 'Turquesa Tropical', 
      primary: '#0f766e', 
      secondary: '#14b8a6', 
      accent: '#134e4a',
      description: 'Fresco y moderno, inspirado en el mar'
    },
    { 
      name: 'Dorado Elegante', 
      primary: '#b45309', 
      secondary: '#d97706', 
      accent: '#92400e',
      description: 'Sofisticado y lujoso, para marcas premium'
    },
    { 
      name: 'Carbón Minimalista', 
      primary: '#374151', 
      secondary: '#6b7280', 
      accent: '#1f2937',
      description: 'Neutro y profesional, diseño minimalista'
    }
  ]

  const applyColorPreset = (preset: typeof presetColors[0]) => {
    const newColors = {
      primary_color: preset.primary,
      secondary_color: preset.secondary,
      accent_color: preset.accent
    }
    
    setFormData(prev => ({
      ...prev,
      ...newColors
    }))
    
    // Si está en modo preview, aplicar inmediatamente
    if (isPreviewMode) {
      applyPreviewColors({ ...formData, ...newColors })
    }
  }

  return (
    <div className="space-y-6">
      {/* Información básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="platform_name">Nombre de la Plataforma</Label>
          <Input
            id="platform_name"
            value={formData.platform_name}
            onChange={(e) => handleInputChange('platform_name', e.target.value)}
            placeholder="Bourbon Web"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="team_name">Nombre del Equipo</Label>
          <Input
            id="team_name"
            value={formData.team_name}
            onChange={(e) => handleInputChange('team_name', e.target.value)}
            placeholder="Mi Equipo"
          />
        </div>
      </div>

      {/* Logo del sidebar */}
      <div className="space-y-4">
        <Label>Logo del Sidebar</Label>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {logoPreview ? (
              <div className="w-20 h-20 border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={logoPreview} 
                  alt="Logo preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500">
              Formatos soportados: PNG, JPG, SVG. Tamaño recomendado: 200x200px
            </p>
          </div>
        </div>
      </div>

      {/* Paleta de colores */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <Label>Paleta de Colores</Label>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={togglePreview}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              {isPreviewMode ? 'Desactivar Vista Previa' : 'Vista Previa'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetColors}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Resetear
            </Button>
          </div>
        </div>
        
        {isPreviewMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-blue-800">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">Modo Vista Previa Activo</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Los cambios de color se aplican en tiempo real. Haz clic en "Guardar Cambios" para confirmar.
            </p>
          </div>
        )}
        
        {/* Presets de colores */}
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Paletas de Colores Optimizadas</p>
            <p className="text-xs text-gray-500">Selecciona una paleta que refleje la personalidad de tu marca</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presetColors.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyColorPreset(preset)}
                className="group flex flex-col items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200 bg-white hover:bg-gray-50"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div 
                        className="w-5 h-5 rounded-lg shadow-sm border border-white" 
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div 
                        className="w-5 h-5 rounded-lg shadow-sm border border-white" 
                        style={{ backgroundColor: preset.secondary }}
                      />
                      <div 
                        className="w-5 h-5 rounded-lg shadow-sm border border-white" 
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">
                        {preset.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {(() => {
                          const accessibility = getAccessibilityBadge(preset.primary)
                          return (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${accessibility.color}`}>
                              WCAG {accessibility.level}
                            </span>
                          )
                        })()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 text-left leading-relaxed">
                  {preset.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Colores personalizados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primary_color">Color Primario</Label>
            <div className="flex items-center gap-2">
              <Input
                id="primary_color"
                type="color"
                value={formData.primary_color}
                onChange={(e) => handleInputChange('primary_color', e.target.value)}
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <Input
                value={formData.primary_color}
                onChange={(e) => handleInputChange('primary_color', e.target.value)}
                placeholder="#d97706"
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondary_color">Color Secundario</Label>
            <div className="flex items-center gap-2">
              <Input
                id="secondary_color"
                type="color"
                value={formData.secondary_color}
                onChange={(e) => handleInputChange('secondary_color', e.target.value)}
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <Input
                value={formData.secondary_color}
                onChange={(e) => handleInputChange('secondary_color', e.target.value)}
                placeholder="#f59e0b"
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accent_color">Color de Acento</Label>
            <div className="flex items-center gap-2">
              <Input
                id="accent_color"
                type="color"
                value={formData.accent_color}
                onChange={(e) => handleInputChange('accent_color', e.target.value)}
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <Input
                value={formData.accent_color}
                onChange={(e) => handleInputChange('accent_color', e.target.value)}
                placeholder="#92400e"
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Vista previa de colores con información de accesibilidad */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium">Vista previa de colores:</p>
            {(() => {
              const accessibility = getAccessibilityBadge(formData.primary_color)
              return (
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${accessibility.color}`}>
                    WCAG {accessibility.level}
                  </span>
                  <span className="text-xs text-gray-500">
                    {accessibility.text}
                  </span>
                </div>
              )
            })()}
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div 
                className="px-4 py-3 rounded-lg text-white text-sm font-medium mb-2 shadow-sm"
                style={{ backgroundColor: formData.primary_color }}
              >
                Primario
              </div>
              <div className="text-xs text-gray-600">
                Contraste: {getContrastRatio(formData.primary_color, '#ffffff').toFixed(1)}:1
              </div>
            </div>
            
            <div className="text-center">
              <div 
                className="px-4 py-3 rounded-lg text-white text-sm font-medium mb-2 shadow-sm"
                style={{ backgroundColor: formData.secondary_color }}
              >
                Secundario
              </div>
              <div className="text-xs text-gray-600">
                Contraste: {getContrastRatio(formData.secondary_color, '#ffffff').toFixed(1)}:1
              </div>
            </div>
            
            <div className="text-center">
              <div 
                className="px-4 py-3 rounded-lg text-white text-sm font-medium mb-2 shadow-sm"
                style={{ backgroundColor: formData.accent_color }}
              >
                Acento
              </div>
              <div className="text-xs text-gray-600">
                Contraste: {getContrastRatio(formData.accent_color, '#ffffff').toFixed(1)}:1
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 mb-2">
              <strong>Referencia WCAG:</strong>
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                AAA: ≥7:1 (Excelente)
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                AA: ≥4.5:1 (Bueno)
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                A: ≥3:1 (Básico)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Botón guardar */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={saving || uploading}
          className="flex items-center gap-2"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {uploading ? 'Subiendo imagen...' : saving ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>
    </div>
  )
}