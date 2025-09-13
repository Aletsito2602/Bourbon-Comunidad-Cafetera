import { supabase } from './supabase'

export interface PlatformSettings {
  id?: string
  user_email?: string
  
  // Configuración de plataforma
  platform_name: string
  platform_logo_url?: string
  primary_color: string
  secondary_color: string
  accent_color: string
  
  // Configuración de cafetería
  coffee_shop_name?: string
  coffee_shop_logo_url?: string
  coffee_shop_address?: string
  coffee_shop_phone?: string
  coffee_shop_email?: string
  coffee_shop_description?: string
  team_name: string
  
  // Configuración de facturación
  currency: string
  tax_rate: number
  invoice_prefix: string
  invoice_counter: number
  business_tax_id?: string
  billing_address?: string
  
  // Configuración adicional
  timezone: string
  language: string
  theme: string
  
  created_at?: string
  updated_at?: string
}

export const defaultSettings: Omit<PlatformSettings, 'id' | 'user_email' | 'created_at' | 'updated_at'> = {
  platform_name: 'Bourbon Web',
  primary_color: '#d97706',
  secondary_color: '#f59e0b', 
  accent_color: '#92400e',
  team_name: 'Mi Equipo',
  currency: 'USD',
  tax_rate: 0.21,
  invoice_prefix: 'INV',
  invoice_counter: 1000,
  timezone: 'UTC',
  language: 'es',
  theme: 'light'
}

// Email temporal para pruebas - cambiar por autenticación real después
const TEMP_USER_EMAIL = 'test@bourbon.com'

export class SettingsService {
  // private static isOfflineMode = false
  
  // static setOfflineMode(offline: boolean) {
  //   this.isOfflineMode = offline
  // }
  static async getSettings(): Promise<{ data: PlatformSettings | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('platform_settings')
        .select('*')
        .eq('user_email', TEMP_USER_EMAIL)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        return { data: null, error }
      }

      // Si no existe configuración, crear una por defecto
      if (!data) {
        const newSettings = { ...defaultSettings, user_email: TEMP_USER_EMAIL }
        const { data: created, error: createError } = await supabase
          .from('platform_settings')
          .insert([newSettings])
          .select()
          .single()
        
        return { data: created, error: createError }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  static async updateSettings(settings: Partial<PlatformSettings>): Promise<{ data: PlatformSettings | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('platform_settings')
        .update({
          ...settings,
          updated_at: new Date().toISOString()
        })
        .eq('user_email', TEMP_USER_EMAIL)
        .select()
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  static async createSettings(settings: Partial<PlatformSettings>): Promise<{ data: PlatformSettings | null; error: any }> {
    try {
      const newSettings = { 
        ...defaultSettings,
        ...settings,
        user_email: TEMP_USER_EMAIL 
      }

      const { data, error } = await supabase
        .from('platform_settings')
        .insert([newSettings])
        .select()
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  static async uploadLogo(file: File, type: 'platform' | 'coffeeshop'): Promise<{ data: string | null; error: any }> {
    try {
      console.log('Starting upload for file:', file.name, 'Size:', file.size)
      
      // Check if file is valid
      if (!file || file.size === 0) {
        throw new Error('Archivo inválido o vacío')
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('El archivo es demasiado grande. Máximo 5MB permitido.')
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Tipo de archivo no soportado. Use PNG, JPG, SVG, GIF o WebP.')
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${TEMP_USER_EMAIL}/${type}_logo_${Date.now()}.${fileExt}`

      console.log('Uploading to:', fileName)

      // First check if bucket exists
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
      console.log('Available buckets:', buckets)
      
      if (bucketsError) {
        console.error('Error checking buckets:', bucketsError)
        // Fallback: try to create a data URL for preview purposes
        console.log('Falling back to data URL for preview')
        return this.createDataUrlFallback(file)
      }

      const settingsBucket = buckets?.find(b => b.name === 'settings-assets')
      if (!settingsBucket) {
        console.warn('Storage bucket not found, using fallback method')
        // Fallback: create a data URL for preview
        return this.createDataUrlFallback(file)
      }

      // Upload the file
      const { data, error } = await supabase.storage
        .from('settings-assets')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Upload error:', error)
        console.log('Falling back to data URL due to upload error')
        return this.createDataUrlFallback(file)
      }

      console.log('Upload successful:', data)

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('settings-assets')
        .getPublicUrl(fileName)

      console.log('Public URL generated:', urlData.publicUrl)

      return { data: urlData.publicUrl, error: null }
    } catch (error) {
      console.error('Upload function error:', error)
      // Final fallback
      return this.createDataUrlFallback(file)
    }
  }

  private static createDataUrlFallback(file: File): Promise<{ data: string | null; error: any }> {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        console.log('Using data URL fallback for file preview')
        resolve({ data: e.target?.result as string, error: null })
      }
      reader.onerror = () => {
        resolve({ data: null, error: new Error('Error al procesar la imagen') })
      }
      reader.readAsDataURL(file)
    })
  }
}