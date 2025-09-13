import {
  Home,
  Coffee,
  FileText,
  ClipboardList,
  Settings,
  Smartphone,
  Receipt,
  Users2,
  Code,
  LifeBuoy,
  HelpCircle,
  Users,
  UserCheck,
  ChefHat,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { useSettings } from "@/contexts/SettingsContext"

// Menu items organizados por categorías
const mainItems = [
  {
    id: "home",
    title: "Dashboard",
    icon: Home,
  },
  {
    id: "recetas",
    title: "Recetas",
    icon: ChefHat,
  },
  {
    id: "stock",
    title: "Stock",
    icon: Coffee,
  },
  {
    id: "mi-carta",
    title: "Mi Carta",
    icon: FileText,
  },
  {
    id: "comandas",
    title: "Comandas",
    icon: ClipboardList,
  },
  {
    id: "afiliados",
    title: "Afiliados",
    icon: UserCheck,
  },
]

const bourbonItems = [
  {
    id: "bourbon-app",
    title: "Bourbon App",
    icon: Smartphone,
  },
  {
    id: "comandas-app",
    title: "Comandas",
    icon: Receipt,
  },
  {
    id: "app-comunidad",
    title: "App Comunidad",
    icon: Users2,
  },
  {
    id: "software-medida",
    title: "Software a Medida",
    icon: Code,
  },
]

const supportItems = [
  {
    id: "soporte",
    title: "Soporte",
    icon: LifeBuoy,
  },
  {
    id: "centro-ayuda",
    title: "Centro de Ayuda",
    icon: HelpCircle,
  },
]

interface AppSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  const { settings } = useSettings()
  
  return (
    <Sidebar variant="inset" className="modern-sidebar">
      <SidebarHeader>
        <SidebarGroup>
          {/* Logo section */}
          <div className="logo-section">
            <img 
              src="/bourbonn.png" 
              alt="Bourbon Logo" 
              className="logo-favicon"
              onError={(e) => {
                // Fallback to emoji if favicon doesn't exist
                e.currentTarget.style.display = 'none';
                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                if (nextElement) nextElement.style.display = 'inline';
              }}
            />
            <span className="logo-fallback" style={{ display: 'none' }}>🥃</span>
            <div className="logo-text">
              <div className="brand-name">Bourbon</div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent className="sidebar-content">
        {/* Sección Principal - Gestión */}
        <div className="nav-section">
          <div className="section-header">
            Gestión
          </div>
          <div className="nav-items">
            {mainItems.map((item) => (
              <div key={item.id} className="nav-item-wrapper">
                <button 
                  onClick={() => onSectionChange(item.id)}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  style={{
                    backgroundColor: activeSection === item.id ? '#d97706' : 'transparent',
                    color: activeSection === item.id ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  <div className="nav-icon">
                    <item.icon size={20} />
                  </div>
                  <span className="nav-label">{item.title}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Espaciador */}
        <div className="h-4"></div>

        {/* Sección Soporte */}
        <div className="nav-section">
          <div className="section-header">
            Support
          </div>
          <div className="nav-items">
            {supportItems.map((item) => (
              <div key={item.id} className="nav-item-wrapper">
                <button 
                  onClick={() => onSectionChange(item.id)}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  style={{
                    backgroundColor: activeSection === item.id ? '#d97706' : 'transparent',
                    color: activeSection === item.id ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  <div className="nav-icon">
                    <item.icon size={20} />
                  </div>
                  <span className="nav-label">{item.title}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Espaciador */}
        <div className="h-4"></div>

        {/* Sección Más de Bourbon */}
        <div className="nav-section">
          <div className="section-header">
            Más de Bourbon
          </div>
          <div className="nav-items">
            {bourbonItems.map((item) => (
              <div key={item.id} className="nav-item-wrapper">
                <button 
                  onClick={() => onSectionChange(item.id)}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  style={{
                    backgroundColor: activeSection === item.id ? '#d97706' : 'transparent',
                    color: activeSection === item.id ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  <div className="nav-icon">
                    <item.icon size={20} />
                  </div>
                  <span className="nav-label">{item.title}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="profile-section-compact">
          <div className="profile-compact-content">
            <div className="profile-avatar-small">
              <Users className="h-3 w-3" />
            </div>
            <div className="profile-info-compact">
              <div className="profile-name-compact">{settings?.team_name || 'Mi Equipo'}</div>
              <div className="profile-status-compact">
                <div className="status-dot-small"></div>
                <span>Online</span>
              </div>
            </div>
            <button 
              onClick={() => onSectionChange('ajustes')}
              className={`profile-action-btn-compact ${activeSection === 'ajustes' ? 'active' : ''}`}
              title="Ajustes"
            >
              <Settings className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}