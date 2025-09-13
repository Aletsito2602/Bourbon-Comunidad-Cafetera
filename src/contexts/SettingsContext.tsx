import React, { createContext, useContext, useEffect, useState } from 'react'
import { SettingsService, type PlatformSettings, defaultSettings } from '@/lib/settings-simple'
import { useAuth } from './AuthContext'

interface SettingsContextType {
  settings: PlatformSettings | null
  loading: boolean
  updateSettings: (newSettings: Partial<PlatformSettings>) => Promise<void>
  applyTheme: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<PlatformSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadSettings()
    } else {
      setSettings(null)
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (settings) {
      applyTheme()
    }
  }, [settings])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const { data, error } = await SettingsService.getSettings()
      if (error) {
        console.error('Error loading settings:', error)
        // Si hay error, usar configuraciones por defecto
        setSettings({ ...defaultSettings, id: '' })
      } else {
        setSettings(data)
      }
    } catch (error) {
      console.error('Error loading settings:', error)
      setSettings({ ...defaultSettings, id: '' })
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async (newSettings: Partial<PlatformSettings>) => {
    try {
      const { data, error } = await SettingsService.updateSettings(newSettings)
      if (error) {
        throw error
      }
      if (data) {
        setSettings(data)
      }
    } catch (error) {
      console.error('Error updating settings:', error)
      throw error
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

  const isColorDark = (hex: string): boolean => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return false
    
    const r = parseInt(result[1], 16)
    const g = parseInt(result[2], 16)
    const b = parseInt(result[3], 16)
    
    // Calcular luminancia usando la fórmula estándar
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance < 0.5
  }

  const getContrastColor = (backgroundColor: string): string => {
    return isColorDark(backgroundColor) ? '#ffffff' : '#000000'
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

  const applyTheme = () => {
    if (!settings) return

    const root = document.documentElement

    // Aplicar colores CSS custom properties
    root.style.setProperty('--primary-color', settings.primary_color)
    root.style.setProperty('--secondary-color', settings.secondary_color)
    root.style.setProperty('--accent-color', settings.accent_color)

    // Aplicar colores RGB para efectos con transparencia
    root.style.setProperty('--primary-color-rgb', hexToRgb(settings.primary_color))
    root.style.setProperty('--secondary-color-rgb', hexToRgb(settings.secondary_color))
    root.style.setProperty('--accent-color-rgb', hexToRgb(settings.accent_color))

    // Aplicar colores de contraste para texto
    root.style.setProperty('--primary-contrast', getContrastColor(settings.primary_color))
    root.style.setProperty('--secondary-contrast', getContrastColor(settings.secondary_color))
    root.style.setProperty('--accent-contrast', getContrastColor(settings.accent_color))

    // Aplicar colores específicos de Tailwind usando CSS variables
    root.style.setProperty('--color-primary', settings.primary_color)
    root.style.setProperty('--color-primary-foreground', '#ffffff')
    
    // Aplicar colores del sidebar (versión oscura del color primario)
    root.style.setProperty('--sidebar-background', darkenColor(settings.primary_color, 0.7))
    root.style.setProperty('--sidebar-border', darkenColor(settings.primary_color, 0.5))
    
    // También podemos aplicar el tema (light/dark) si es necesario
    if (settings.theme) {
      root.setAttribute('data-theme', settings.theme)
    }

    // Actualizar el título de la página
    if (settings.platform_name) {
      document.title = settings.platform_name
    }

    // Aplicar colores al sidebar dinámicamente
    const sidebarElements = document.querySelectorAll('.sidebar-menu-item-hover')
    sidebarElements.forEach(element => {
      const el = element as HTMLElement
      el.style.setProperty('--hover-color', `rgba(${hexToRgb(settings.primary_color)}, 0.08)`)
    })
  }

  const value: SettingsContextType = {
    settings,
    loading,
    updateSettings,
    applyTheme
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}