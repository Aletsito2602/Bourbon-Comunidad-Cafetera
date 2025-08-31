import { supabase } from './supabase'

export interface PlatformSettings {
  id?: string
  user_id?: string
  
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

export const defaultSettings: Omit<PlatformSettings, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
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

export class SettingsService {
  static async getSettings(): Promise<{ data: PlatformSettings | null; error: any }> {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        return { data: null, error: userError || new Error('Usuario no autenticado') }
      }

      const { data, error } = await supabase
        .from('platform_settings')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        return { data: null, error }
      }

      // Si no existe configuración, crear una por defecto
      if (!data) {
        const newSettings = { ...defaultSettings, user_id: user.id }
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
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        return { data: null, error: userError || new Error('Usuario no autenticado') }
      }

      const { data, error } = await supabase
        .from('platform_settings')
        .update({
          ...settings,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select()
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  static async createSettings(settings: Partial<PlatformSettings>): Promise<{ data: PlatformSettings | null; error: any }> {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        return { data: null, error: userError || new Error('Usuario no autenticado') }
      }

      const newSettings = { 
        ...defaultSettings,
        ...settings,
        user_id: user.id 
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
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        return { data: null, error: userError || new Error('Usuario no autenticado') }
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${type}_logo_${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage
        .from('settings-assets')
        .upload(fileName, file)

      if (error) {
        return { data: null, error }
      }

      const { data: urlData } = supabase.storage
        .from('settings-assets')
        .getPublicUrl(fileName)

      return { data: urlData.publicUrl, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
}