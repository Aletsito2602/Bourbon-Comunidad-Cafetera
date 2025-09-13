import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SettingsService, type PlatformSettings as SettingsType } from '@/lib/settings-simple'
import { Upload, Loader2, Coffee, Save, MapPin, Phone, Mail, FileText } from 'lucide-react'

interface CoffeeshopSettingsProps {
  settings: SettingsType
  onUpdate: (settings: SettingsType) => void
}

export function CoffeeshopSettings({ settings, onUpdate }: CoffeeshopSettingsProps) {
  const [formData, setFormData] = useState({
    coffee_shop_name: settings.coffee_shop_name || '',
    coffee_shop_address: settings.coffee_shop_address || '',
    coffee_shop_phone: settings.coffee_shop_phone || '',
    coffee_shop_email: settings.coffee_shop_email || '',
    coffee_shop_description: settings.coffee_shop_description || ''
  })
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.coffee_shop_logo_url || null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
      let logoUrl = settings.coffee_shop_logo_url
      
      // Subir logo si se seleccionó uno nuevo
      if (logoFile) {
        setUploading(true)
        const { data: uploadedUrl, error: uploadError } = await SettingsService.uploadLogo(logoFile, 'coffeeshop')
        
        if (uploadError) {
          throw uploadError
        }
        
        logoUrl = uploadedUrl || undefined
        setUploading(false)
      }

      // Actualizar configuraciones
      const updatedSettings = {
        ...formData,
        coffee_shop_logo_url: logoUrl
      }

      const { data, error } = await SettingsService.updateSettings(updatedSettings)
      
      if (error) {
        throw error
      }
      
      if (data) {
        onUpdate(data)
        // Mostrar mensaje de éxito
        alert('Configuración de cafetería guardada exitosamente')
      }
    } catch (error) {
      console.error('Error al guardar configuración:', error)
      alert('Error al guardar configuración: ' + (error as Error).message)
    } finally {
      setSaving(false)
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Información básica de la cafetería */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="coffee_shop_name" className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            Nombre de la Cafetería
          </Label>
          <Input
            id="coffee_shop_name"
            value={formData.coffee_shop_name}
            onChange={(e) => handleInputChange('coffee_shop_name', e.target.value)}
            placeholder="Ej: Bourbon Coffee House"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="coffee_shop_email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email de Contacto
          </Label>
          <Input
            id="coffee_shop_email"
            type="email"
            value={formData.coffee_shop_email}
            onChange={(e) => handleInputChange('coffee_shop_email', e.target.value)}
            placeholder="info@tucoffe.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="coffee_shop_phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Teléfono
          </Label>
          <Input
            id="coffee_shop_phone"
            value={formData.coffee_shop_phone}
            onChange={(e) => handleInputChange('coffee_shop_phone', e.target.value)}
            placeholder="+1 234 567 8900"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="coffee_shop_address" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Dirección
          </Label>
          <Input
            id="coffee_shop_address"
            value={formData.coffee_shop_address}
            onChange={(e) => handleInputChange('coffee_shop_address', e.target.value)}
            placeholder="123 Coffee Street, Ciudad"
          />
        </div>
      </div>

      {/* Logo de la cafetería */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <Coffee className="h-4 w-4" />
          Logo de la Cafetería
        </Label>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {logoPreview ? (
              <div className="w-20 h-20 border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={logoPreview} 
                  alt="Coffee shop logo preview" 
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
              Logo que aparecerá en cartas digitales y facturación. Formatos: PNG, JPG, SVG. Tamaño recomendado: 300x300px
            </p>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor="coffee_shop_description" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Descripción de la Cafetería
        </Label>
        <textarea
          id="coffee_shop_description"
          value={formData.coffee_shop_description}
          onChange={(e) => handleInputChange('coffee_shop_description', e.target.value)}
          placeholder="Breve descripción de tu cafetería, especialidad, ambiente, etc..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
        />
        <p className="text-sm text-gray-500">
          Esta descripción aparecerá en tu carta digital y material promocional
        </p>
      </div>

      {/* Vista previa de información */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <Coffee className="h-4 w-4" />
          Vista Previa
        </h3>
        <div className="space-y-2">
          {formData.coffee_shop_name && (
            <div className="flex items-center gap-2">
              <Coffee className="h-4 w-4 text-amber-600" />
              <span className="font-medium">{formData.coffee_shop_name}</span>
            </div>
          )}
          {formData.coffee_shop_address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{formData.coffee_shop_address}</span>
            </div>
          )}
          {formData.coffee_shop_phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{formData.coffee_shop_phone}</span>
            </div>
          )}
          {formData.coffee_shop_email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{formData.coffee_shop_email}</span>
            </div>
          )}
          {formData.coffee_shop_description && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">{formData.coffee_shop_description}</p>
            </div>
          )}
          
          {!formData.coffee_shop_name && !formData.coffee_shop_address && !formData.coffee_shop_phone && !formData.coffee_shop_email && (
            <p className="text-sm text-gray-500 italic">
              Completa los campos arriba para ver la vista previa de tu información
            </p>
          )}
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
          {uploading ? 'Subiendo imagen...' : saving ? 'Guardando...' : 'Guardar Información'}
        </Button>
      </div>
    </div>
  )
}