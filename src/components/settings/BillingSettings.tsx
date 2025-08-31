import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SettingsService, type PlatformSettings as SettingsType } from '@/lib/settings-simple'
import { Loader2, Receipt, Save, DollarSign, Hash, FileText, Building, Crown, CreditCard, Calendar, CheckCircle } from 'lucide-react'

interface BillingSettingsProps {
  settings: SettingsType
  onUpdate: (settings: SettingsType) => void
}

export function BillingSettings({ settings, onUpdate }: BillingSettingsProps) {
  const [formData, setFormData] = useState({
    currency: settings.currency || 'USD',
    tax_rate: (settings.tax_rate * 100) || 21, // Convertir a porcentaje para mostrar
    invoice_prefix: settings.invoice_prefix || 'INV',
    invoice_counter: settings.invoice_counter || 1000,
    business_tax_id: settings.business_tax_id || '',
    billing_address: settings.billing_address || ''
  })
  const [saving, setSaving] = useState(false)

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    
    try {
      // Convertir tax_rate de porcentaje a decimal
      const updatedSettings = {
        ...formData,
        tax_rate: formData.tax_rate / 100 // Convertir porcentaje a decimal para guardar
      }

      const { data, error } = await SettingsService.updateSettings(updatedSettings)
      
      if (error) {
        throw error
      }
      
      if (data) {
        onUpdate(data)
        alert('Configuración de facturación guardada exitosamente')
      }
    } catch (error) {
      console.error('Error al guardar configuración:', error)
      alert('Error al guardar configuración: ' + (error as Error).message)
    } finally {
      setSaving(false)
    }
  }

  const currencies = [
    { code: 'USD', name: 'Dólar Estadounidense', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'Libra Esterlina', symbol: '£' },
    { code: 'COP', name: 'Peso Colombiano', symbol: '$' },
    { code: 'MXN', name: 'Peso Mexicano', symbol: '$' },
    { code: 'ARS', name: 'Peso Argentino', symbol: '$' },
    { code: 'CLP', name: 'Peso Chileno', symbol: '$' },
    { code: 'PEN', name: 'Sol Peruano', symbol: 'S/' },
    { code: 'BRL', name: 'Real Brasileño', symbol: 'R$' }
  ]

  const selectedCurrency = currencies.find(c => c.code === formData.currency) || currencies[0]

  // Datos simulados de membresía (en una implementación real, estos vendrían de una API)
  const membershipData = {
    plan: 'Pro',
    status: 'Activa',
    startDate: '2024-01-15',
    nextBilling: '2024-09-15',
    price: '$29.99',
    features: ['Configuración completa', 'Storage ilimitado', 'Apps móviles', 'Soporte prioritario'],
    paymentMethod: '**** **** **** 1234',
    billingCycle: 'Mensual'
  }

  return (
    <div className="space-y-6">
      {/* Sección de Membresía */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Mi Membresía</h3>
            <p className="text-gray-600">Plan {membershipData.plan} - {membershipData.status}</p>
          </div>
          <div className="ml-auto">
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-700 text-sm font-medium">{membershipData.status}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-600">Precio</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{membershipData.price}</div>
            <div className="text-xs text-gray-500">{membershipData.billingCycle}</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-600">Próximo Cobro</span>
            </div>
            <div className="text-lg font-bold text-gray-800">
              {new Date(membershipData.nextBilling).toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}
            </div>
            <div className="text-xs text-gray-500">Renovación automática</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-600">Método de Pago</span>
            </div>
            <div className="text-sm font-bold text-gray-800">{membershipData.paymentMethod}</div>
            <div className="text-xs text-gray-500">Visa</div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-600">Desde</span>
            </div>
            <div className="text-sm font-bold text-gray-800">
              {new Date(membershipData.startDate).toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}
            </div>
            <div className="text-xs text-gray-500">Miembro desde</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-amber-200 mb-6">
          <h4 className="font-semibold mb-3 text-gray-800">Características incluidas en tu plan:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {membershipData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Cambiar Método de Pago
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Ver Historial de Facturas
          </Button>
          <Button className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2">
            <Crown className="h-4 w-4" />
            Actualizar Plan
          </Button>
        </div>
      </div>
      {/* Configuración de moneda */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="currency" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Moneda
          </Label>
          <select
            id="currency"
            value={formData.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tax_rate" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Tasa de Impuesto (%)
          </Label>
          <Input
            id="tax_rate"
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={formData.tax_rate}
            onChange={(e) => handleInputChange('tax_rate', parseFloat(e.target.value) || 0)}
            placeholder="21.00"
          />
          <p className="text-sm text-gray-500">
            Porcentaje de impuestos aplicado a las ventas (ej: IVA, IGV, etc.)
          </p>
        </div>
      </div>

      {/* Configuración de facturación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="invoice_prefix" className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Prefijo de Factura
          </Label>
          <Input
            id="invoice_prefix"
            value={formData.invoice_prefix}
            onChange={(e) => handleInputChange('invoice_prefix', e.target.value.toUpperCase())}
            placeholder="INV"
            maxLength={10}
          />
          <p className="text-sm text-gray-500">
            Prefijo para la numeración de facturas (ej: INV, FAC, etc.)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoice_counter" className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Próximo Número
          </Label>
          <Input
            id="invoice_counter"
            type="number"
            min="1"
            value={formData.invoice_counter}
            onChange={(e) => handleInputChange('invoice_counter', parseInt(e.target.value) || 1000)}
            placeholder="1000"
          />
          <p className="text-sm text-gray-500">
            Próximo número de factura a generar
          </p>
        </div>
      </div>

      {/* Información fiscal */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Building className="h-5 w-5" />
          Información Fiscal
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="business_tax_id" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              NIT / RUT / Tax ID
            </Label>
            <Input
              id="business_tax_id"
              value={formData.business_tax_id}
              onChange={(e) => handleInputChange('business_tax_id', e.target.value)}
              placeholder="123456789-0"
            />
            <p className="text-sm text-gray-500">
              Número de identificación tributaria de tu negocio
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="billing_address" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Dirección Fiscal
            </Label>
            <textarea
              id="billing_address"
              value={formData.billing_address}
              onChange={(e) => handleInputChange('billing_address', e.target.value)}
              placeholder="Dirección completa para facturación..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
            <p className="text-sm text-gray-500">
              Dirección que aparecerá en las facturas emitidas
            </p>
          </div>
        </div>
      </div>

      {/* Vista previa de factura */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <Receipt className="h-4 w-4" />
          Vista Previa de Numeración
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-white rounded border">
            <span className="text-sm text-gray-600">Próxima factura:</span>
            <span className="font-mono font-medium">
              {formData.invoice_prefix}-{String(formData.invoice_counter).padStart(6, '0')}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-white rounded border">
            <span className="text-sm text-gray-600">Siguiente factura:</span>
            <span className="font-mono text-gray-500">
              {formData.invoice_prefix}-{String(formData.invoice_counter + 1).padStart(6, '0')}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-white rounded border">
            <span className="text-sm text-gray-600">Impuesto configurado:</span>
            <span className="font-medium">
              {formData.tax_rate}%
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-white rounded border">
            <span className="text-sm text-gray-600">Moneda:</span>
            <span className="font-medium">
              {selectedCurrency.symbol} {selectedCurrency.name}
            </span>
          </div>
        </div>
      </div>

      {/* Ejemplo de cálculo */}
      <div className="border border-amber-200 rounded-lg p-4 bg-amber-50">
        <h3 className="font-medium mb-3 text-amber-800">Ejemplo de Cálculo</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>100.00 {selectedCurrency.symbol}</span>
          </div>
          <div className="flex justify-between">
            <span>Impuesto ({formData.tax_rate}%):</span>
            <span>{(100 * formData.tax_rate / 100).toFixed(2)} {selectedCurrency.symbol}</span>
          </div>
          <div className="flex justify-between font-medium border-t border-amber-200 pt-1">
            <span>Total:</span>
            <span>{(100 + (100 * formData.tax_rate / 100)).toFixed(2)} {selectedCurrency.symbol}</span>
          </div>
        </div>
      </div>

      {/* Botón guardar */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? 'Guardando...' : 'Guardar Configuración'}
        </Button>
      </div>
    </div>
  )
}