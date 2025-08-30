import { 
  Home,
  ChefHat,
  Wine,
  FileText,
  Receipt,
  Users,
  Settings
} from 'lucide-react'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: 'home', label: 'Dashboard', icon: Home, description: 'Panel Principal' },
  { id: 'recetas', label: 'Recetas', icon: ChefHat, description: 'Gestión de Cócteles' },
  { id: 'stock', label: 'Inventario', icon: Wine, description: 'Control de Stock' },
  { id: 'mi-carta', label: 'Mi Carta', icon: FileText, description: 'Diseño Web' },
  { id: 'comandas', label: 'Comandas', icon: Receipt, description: 'Órdenes & Pedidos' },
  { id: 'equipo', label: 'Equipo', icon: Users, description: 'Staff & Usuarios' },
  { id: 'ajustes', label: 'Configuración', icon: Settings, description: 'Ajustes del Sistema' },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>🍸 Bourbon Web</h1>
        <div className="sidebar-subtitle">Sistema de Gestión</div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={activeSection === item.id ? 'active' : ''}
                  title={item.description}
                >
                  <Icon />
                  <span>{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-footer-text">
          "Cada trago cuenta una historia"
        </div>
      </div>
    </div>
  )
}