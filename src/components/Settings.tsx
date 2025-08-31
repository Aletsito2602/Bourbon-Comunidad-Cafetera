import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlatformSettings } from './settings/PlatformSettings'
import { CoffeeshopSettings } from './settings/CoffeeshopSettings'
import { BillingSettings } from './settings/BillingSettings'
import { TeamSettings } from './settings/TeamSettings'
import { SettingsService, type PlatformSettings as SettingsType } from '@/lib/settings-simple'
import { Palette, Coffee, Receipt, Users, Loader2 } from 'lucide-react'

export function Settings() {
  const [settings, setSettings] = useState<SettingsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    setError(null)
    
    const { data, error } = await SettingsService.getSettings()
    
    if (error) {
      setError('Error al cargar configuraciones: ' + error.message)
    } else {
      setSettings(data)
    }
    
    setLoading(false)
  }

  const handleSettingsUpdate = (updatedSettings: SettingsType) => {
    setSettings(updatedSettings)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Cargando configuraciones...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error}</p>
            <button 
              onClick={loadSettings}
              className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Reintentar
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Configuración</h1>
        <p className="text-muted-foreground">
          Personaliza tu plataforma, información de cafetería y configuración de facturación
        </p>
      </div>

      <Tabs defaultValue="platform" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="platform" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Plataforma
          </TabsTrigger>
          <TabsTrigger value="coffeeshop" className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            Cafetería
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Facturación
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Equipo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platform" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Plataforma</CardTitle>
              <CardDescription>
                Personaliza la apariencia y branding de tu plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              {settings && (
                <PlatformSettings 
                  settings={settings} 
                  onUpdate={handleSettingsUpdate}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coffeeshop" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de Cafetería</CardTitle>
              <CardDescription>
                Configura los datos de tu negocio y equipo
              </CardDescription>
            </CardHeader>
            <CardContent>
              {settings && (
                <CoffeeshopSettings 
                  settings={settings} 
                  onUpdate={handleSettingsUpdate}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Facturación</CardTitle>
              <CardDescription>
                Configura impuestos, numeración y datos fiscales
              </CardDescription>
            </CardHeader>
            <CardContent>
              {settings && (
                <BillingSettings 
                  settings={settings} 
                  onUpdate={handleSettingsUpdate}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Equipo</CardTitle>
              <CardDescription>
                Administra los miembros de tu equipo y sus roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              {settings && (
                <TeamSettings 
                  settings={settings} 
                  onUpdate={handleSettingsUpdate}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}