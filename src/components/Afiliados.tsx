import { useState } from 'react'
import { 
  UserCheck, 
  QrCode, 
  Scan, 
  Gift, 
  TrendingUp,
  Users,
  Award,
  Search,
  Eye,
  Edit,
  Trash2,
  Download
} from 'lucide-react'

interface Affiliate {
  id: string
  name: string
  email: string
  phone: string
  joinDate: string
  totalPoints: number
  currentLevel: string
  totalSpent: number
  lastVisit: string
  visits: number
  status: 'active' | 'inactive' | 'vip'
  avatar?: string
}

const mockAffiliates: Affiliate[] = [
  {
    id: '1',
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+54 11 1234-5678',
    joinDate: '2024-01-15',
    totalPoints: 1250,
    currentLevel: 'Gold',
    totalSpent: 2840,
    lastVisit: '2024-09-12',
    visits: 47,
    status: 'vip'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    phone: '+54 11 2345-6789',
    joinDate: '2024-02-20',
    totalPoints: 890,
    currentLevel: 'Silver',
    totalSpent: 1680,
    lastVisit: '2024-09-10',
    visits: 32,
    status: 'active'
  },
  {
    id: '3',
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '+54 11 3456-7890',
    joinDate: '2024-03-10',
    totalPoints: 2150,
    currentLevel: 'Platinum',
    totalSpent: 4320,
    lastVisit: '2024-09-13',
    visits: 68,
    status: 'vip'
  },
  {
    id: '4',
    name: 'Diego López',
    email: 'diego.lopez@email.com',
    phone: '+54 11 4567-8901',
    joinDate: '2024-04-05',
    totalPoints: 450,
    currentLevel: 'Bronze',
    totalSpent: 890,
    lastVisit: '2024-09-08',
    visits: 18,
    status: 'active'
  },
  {
    id: '5',
    name: 'Laura Fernández',
    email: 'laura.fernandez@email.com',
    phone: '+54 11 5678-9012',
    joinDate: '2024-05-12',
    totalPoints: 320,
    currentLevel: 'Bronze',
    totalSpent: 640,
    lastVisit: '2024-08-30',
    visits: 12,
    status: 'inactive'
  }
]

export function Afiliados() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('all')
  // const [showQRScanner, setShowQRScanner] = useState(false)

  const filteredAffiliates = mockAffiliates.filter(affiliate => {
    const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterLevel === 'all' || affiliate.currentLevel.toLowerCase() === filterLevel.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return 'bg-purple-100 text-purple-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'platinum': return 'bg-gray-800 text-white'
      case 'gold': return 'bg-yellow-500 text-white'
      case 'silver': return 'bg-gray-400 text-white'
      case 'bronze': return 'bg-amber-600 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">+12.3%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">1,247</div>
          <div className="text-sm text-gray-600">Total Afiliados</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">+8.7%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">342</div>
          <div className="text-sm text-gray-600">Miembros VIP</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+15.2%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">$18,420</div>
          <div className="text-sm text-gray-600">Gasto Promedio</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-amber-600" />
            </div>
            <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">+22.1%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">89,450</div>
          <div className="text-sm text-gray-600">Puntos Canjeados</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Actividad Reciente</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Nuevo afiliado registrado</div>
              <div className="text-sm text-gray-500">Ana Martínez se unió al programa - Hace 2 horas</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Nivel actualizado</div>
              <div className="text-sm text-gray-500">María González alcanzó nivel Gold - Hace 4 horas</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-amber-50 rounded-lg">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Gift className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Puntos canjeados</div>
              <div className="text-sm text-gray-500">Carlos Rodríguez canjeó 500 puntos - Hace 6 horas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAffiliatesList = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar afiliados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">Todos los niveles</option>
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Affiliates Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Afiliado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puntos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gasto Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Visita</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAffiliates.map((affiliate) => (
                <tr key={affiliate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {affiliate.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                        <div className="text-sm text-gray-500">{affiliate.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(affiliate.currentLevel)}`}>
                      {affiliate.currentLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {affiliate.totalPoints.toLocaleString()} pts
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${affiliate.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(affiliate.lastVisit).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(affiliate.status)}`}>
                      {affiliate.status === 'vip' ? 'VIP' : affiliate.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderQRScanner = () => (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Scan className="w-12 h-12 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Escanear QR de Cliente</h3>
        <p className="text-gray-600 mb-8">Apunta la cámara al código QR del cliente para registrar puntos o canjear recompensas</p>
        
        {/* Mock Camera View */}
        <div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg p-8 mb-6">
          <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center relative">
            <div className="w-48 h-48 border-2 border-white rounded-lg flex items-center justify-center">
              <QrCode className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0 border-4 border-amber-500 rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
            Activar Cámara
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Ingresar Código Manual
          </button>
        </div>
      </div>
    </div>
  )

  const renderMyQR = () => (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Mi Código QR</h3>
          <p className="text-gray-600">Los clientes pueden escanear este código para unirse al programa de fidelización</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* QR Code */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-xl p-4 flex items-center justify-center">
              <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                <QrCode className="w-32 h-32 text-white" />
              </div>
            </div>
            <div className="text-center mt-4">
              <div className="text-sm font-medium text-gray-900">Bourbon Café</div>
              <div className="text-xs text-gray-500">ID: BCF-2024-001</div>
            </div>
          </div>
          
          {/* QR Info */}
          <div className="flex-1 space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">¿Cómo funciona?</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div className="text-sm text-gray-700">El cliente escanea tu código QR con su teléfono</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div className="text-sm text-gray-700">Se registra automáticamente en tu programa de fidelización</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div className="text-sm text-gray-700">Comienza a acumular puntos con cada compra</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-blue-700">Registros este mes</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-green-700">Tasa de conversión</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Descargar QR
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Compartir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Afiliados</h1>
          <p className="text-gray-600">Gestiona tu programa de fidelización y recompensas</p>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-lg">
          <div className="text-sm font-medium">Programa Activo</div>
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            1,247 miembros
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        <div className="flex space-x-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'affiliates', label: 'Lista de Afiliados', icon: Users },
            { id: 'scanner', label: 'Escanear QR', icon: Scan },
            { id: 'myqr', label: 'Mi QR', icon: QrCode }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-100 text-amber-700 font-medium'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'affiliates' && renderAffiliatesList()}
      {activeTab === 'scanner' && renderQRScanner()}
      {activeTab === 'myqr' && renderMyQR()}
    </div>
  )
}
