import {
  ChefHat,
  Home,
  Coffee,
  FileText,
  ClipboardList,
  Receipt,
  Settings,
  Users,
  Smartphone,
  Users2,
  Code,
  HelpCircle,
  LifeBuoy,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useSettings } from "@/contexts/SettingsContext"
import { useState } from "react"

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

  // Función para determinar el color de contraste
  const getContrastColor = (backgroundColor: string): string => {
    if (!backgroundColor || !backgroundColor.includes('#')) return '#000000'
    
    const hex = backgroundColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    
    // Calcular luminancia
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance < 0.5 ? '#ffffff' : '#000000'
  }
  
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
                e.currentTarget.nextElementSibling!.style.display = 'inline';
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
                    backgroundColor: activeSection === item.id ? 'var(--primary-color, #667eea)' : 'transparent',
                    color: activeSection === item.id ? 'var(--primary-contrast, #ffffff)' : 'rgba(255, 255, 255, 0.7)'
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
                    backgroundColor: activeSection === item.id ? 'var(--accent-color, #92400e)' : 'transparent',
                    color: activeSection === item.id ? 'var(--accent-contrast, #ffffff)' : 'rgba(255, 255, 255, 0.7)'
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
                    backgroundColor: activeSection === item.id ? 'var(--secondary-color, #f59e0b)' : 'transparent',
                    color: activeSection === item.id ? 'var(--secondary-contrast, #ffffff)' : 'rgba(255, 255, 255, 0.7)'
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
        <div className="profile-section">
          <div className="profile-header">
            <div className="profile-avatar">
              <Users className="h-4 w-4" />
            </div>
            <div className="profile-info">
              <div className="profile-name">{settings?.team_name || 'Mi Equipo'}</div>
              <div className="profile-status">
                <div className="status-dot"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            <button 
              onClick={() => onSectionChange('ajustes')}
              className={`profile-action-btn ${activeSection === 'ajustes' ? 'active' : ''}`}
              title="Ajustes"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}