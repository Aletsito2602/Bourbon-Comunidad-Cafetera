import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { AuthService } from '../lib/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: any }>
  signUp: (email: string, password: string) => Promise<{ user: User | null; error: any }>
  signOut: () => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener sesión inicial
    AuthService.getSession().then((session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Escuchar cambios en el estado de autenticación
    const { data: { subscription } } = AuthService.onAuthStateChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const result = await AuthService.signIn(email, password)
    if (result.user) {
      setUser(result.user)
    }
    return result
  }

  const signUp = async (email: string, password: string) => {
    const result = await AuthService.signUp(email, password)
    if (result.user) {
      setUser(result.user)
    }
    return result
  }

  const signOut = async () => {
    const result = await AuthService.signOut()
    if (!result.error) {
      setUser(null)
    }
    return result
  }

  const resetPassword = async (email: string) => {
    return await AuthService.resetPassword(email)
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}