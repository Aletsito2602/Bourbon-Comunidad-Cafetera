import { useState } from 'react'
import { Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)

  const { signIn, signUp, resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && password.trim()) {
      setIsLoading(true)
      setError(null)
      setMessage(null)

      try {
        if (isSignUp) {
          const { error } = await signUp(email, password)
          if (error) {
            setError('Error al crear la cuenta. Por favor verifica tus datos e intenta nuevamente.')
            setShowErrorModal(true)
          } else {
            setMessage('¡Cuenta creada exitosamente! Revisa tu email para confirmar tu cuenta.')
            setShowMessageModal(true)
          }
        } else {
          const { error } = await signIn(email, password)
          if (error) {
            setError('Credenciales inválidas. Por favor verifica tu email y contraseña.')
            setShowErrorModal(true)
          }
        }
      } catch (err) {
        setError('Ocurrió un error inesperado. Por favor intenta nuevamente.')
        setShowErrorModal(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      setError('Por favor ingresa tu email para restablecer la contraseña')
      setShowErrorModal(true)
      return
    }

    setIsLoading(true)
    setError(null)
    
    const { error } = await resetPassword(email)
    if (error) {
      setError('Error al enviar el enlace. Por favor verifica tu email.')
      setShowErrorModal(true)
    } else {
      setMessage('Se ha enviado un enlace de restablecimiento a tu email')
      setShowMessageModal(true)
    }
    setIsLoading(false)
  }

  return (
    <>
      <div className={`min-h-screen w-full bg-gradient-to-b from-cyan-500 via-cyan-200 to-white flex items-center justify-center p-4 relative transition-all duration-300 ${showErrorModal || showMessageModal ? 'blur-md' : ''}`}>
        {/* Coffee background elements */}
        <div className="coffee-bg coffee-bg-1"></div>
        <div className="coffee-bg coffee-bg-2"></div>
        <div className="coffee-bg coffee-bg-3"></div>
        
        <div className="w-full max-w-lg relative z-10">
        {/* Logo y Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-4">
            <img 
              src="/bourbon logo png.png" 
              alt="Bourbon Web Logo"
              className="w-24 h-24 object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bourbon Web</h1>
          <p className="text-gray-600">Sistema de Gestión Gastronómica</p>
        </div>

        {/* Formulario */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/30">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {isSignUp ? 'Crear cuenta' : 'Bienvenido de vuelta'}
            </h2>
            <p className="text-gray-600 text-sm">
              {isSignUp ? 'Crea tu cuenta para comenzar' : 'Inicia sesión para acceder a tu panel'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  placeholder="Ingresa tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 bg-white/90"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 bg-white/90"
                  required
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 focus:ring-2 mr-2" />
                  <span className="text-gray-600">Recordarme</span>
                </label>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={isLoading}
                  className="text-cyan-600 hover:text-cyan-700 font-medium disabled:opacity-50"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-cyan-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white mr-3"></div>
                  <span className="text-white/90">
                    {isSignUp ? 'Creando cuenta...' : 'Iniciando sesión...'}
                  </span>
                </div>
              ) : (
                <span className="font-bold">
                  {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
              </p>
              <button 
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError(null)
                  setMessage(null)
                }}
                className="text-cyan-600 hover:text-cyan-700 font-medium text-sm hover:underline"
              >
                {isSignUp ? 'Inicia sesión aquí' : 'Crear cuenta'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            © 2025 Bourbon Web. Sistema de gestión para cafeterías de especialidad.
          </p>
        </div>
        </div>
      </div>

      {/* Modal de Error */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50 animate-in fade-in duration-500">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] max-w-xs w-full animate-in zoom-in-90 slide-in-from-bottom-8 duration-500 border border-white/20">
            <div className="p-6 text-center relative">
              {/* Decorative circles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-red-200 rounded-full opacity-60"></div>
              <div className="absolute top-6 right-8 w-1 h-1 bg-red-300 rounded-full opacity-40"></div>
              
              <div className="relative mb-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-red-400 to-red-500 rounded-full mb-4 shadow-lg shadow-red-500/30">
                  <AlertCircle className="h-8 w-8 text-white drop-shadow-sm" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full blur-xl"></div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                ¡Ups! Error de Acceso
              </h3>
              
              <p className="text-gray-600 text-sm mb-6 leading-relaxed px-2">
                {error}
              </p>
              
              <button
                onClick={() => {
                  setShowErrorModal(false)
                  setError(null)
                }}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-3 px-4 rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-500/30 border border-red-400/20"
              >
                Entendido ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Éxito */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50 animate-in fade-in duration-500">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] max-w-xs w-full animate-in zoom-in-90 slide-in-from-bottom-8 duration-500 border border-white/20">
            <div className="p-6 text-center relative">
              {/* Decorative circles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-200 rounded-full opacity-60"></div>
              <div className="absolute top-6 right-8 w-1 h-1 bg-cyan-300 rounded-full opacity-40"></div>
              
              <div className="relative mb-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full mb-4 shadow-lg shadow-cyan-500/30">
                  <CheckCircle className="h-8 w-8 text-white drop-shadow-sm" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-teal-500/20 rounded-full blur-xl"></div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                ¡Perfecto!
              </h3>
              
              <p className="text-gray-600 text-sm mb-6 leading-relaxed px-2">
                {message}
              </p>
              
              <button
                onClick={() => {
                  setShowMessageModal(false)
                  setMessage(null)
                }}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-medium py-3 px-4 rounded-2xl hover:from-cyan-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/30 border border-cyan-400/20"
              >
                Continuar →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}