import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SettingsService, type PlatformSettings as SettingsType } from '@/lib/settings-simple'
import { Users, UserPlus, Save, Loader2, Mail, Shield, Trash2 } from 'lucide-react'

interface TeamSettingsProps {
  settings: SettingsType
  onUpdate: (settings: SettingsType) => void
}

export function TeamSettings({ settings, onUpdate }: TeamSettingsProps) {
  const [formData, setFormData] = useState({
    team_name: settings.team_name || 'Mi Equipo'
  })
  const [saving, setSaving] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    
    try {
      const { data, error } = await SettingsService.updateSettings(formData)
      
      if (error) {
        throw error
      }
      
      if (data) {
        onUpdate(data)
        alert('Configuración del equipo guardada exitosamente')
      }
    } catch (error) {
      console.error('Error al guardar configuración:', error)
      alert('Error al guardar configuración: ' + (error as Error).message)
    } finally {
      setSaving(false)
    }
  }

  // Mock data para los miembros del equipo - en una implementación real vendría de una API
  const teamMembers = [
    {
      id: 1,
      name: 'Ana García',
      email: 'ana@bourbon.com',
      role: 'Administrador',
      status: 'Activo',
      avatar: null,
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Carlos López',
      email: 'carlos@bourbon.com', 
      role: 'Barista Senior',
      status: 'Activo',
      avatar: null,
      joinDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'María Rodríguez',
      email: 'maria@bourbon.com',
      role: 'Cajero',
      status: 'Activo',
      avatar: null,
      joinDate: '2024-03-10'
    }
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrador': return 'bg-purple-100 text-purple-800'
      case 'Barista Senior': return 'bg-blue-100 text-blue-800'
      case 'Cajero': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Configuración básica del equipo */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <Label>Información del Equipo</Label>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="team_name">Nombre del Equipo</Label>
          <Input
            id="team_name"
            value={formData.team_name}
            onChange={(e) => handleInputChange('team_name', e.target.value)}
            placeholder="Mi Equipo"
          />
          <p className="text-sm text-gray-500">
            Este nombre aparecerá en el sidebar y en los reportes del equipo
          </p>
        </div>
      </div>

      {/* Lista de miembros del equipo */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5" />
              Miembros del Equipo
            </h3>
            <p className="text-sm text-gray-500">Gestiona los miembros de tu equipo y sus roles</p>
          </div>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Invitar Miembro
          </Button>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
              <div className="col-span-4">Miembro</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Rol</div>
              <div className="col-span-2">Estado</div>
              <div className="col-span-1">Acciones</div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {teamMembers.map((member) => (
              <div key={member.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">
                          Desde {new Date(member.joinDate).toLocaleDateString('es-ES', { 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                      <Shield className="h-3 w-3" />
                      {member.role}
                    </span>
                  </div>
                  
                  <div className="col-span-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {member.status}
                    </span>
                  </div>
                  
                  <div className="col-span-1">
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estadísticas del equipo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">{teamMembers.length}</div>
              <div className="text-sm text-blue-600">Total Miembros</div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">1</div>
              <div className="text-sm text-green-600">Administradores</div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-900">2</div>
              <div className="text-sm text-amber-600">Personal Operativo</div>
            </div>
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
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>
    </div>
  )
}