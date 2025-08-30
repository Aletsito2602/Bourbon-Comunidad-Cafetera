import {
  ChefHat,
  Home,
  Wine,
  FileText,
  Receipt,
  Settings,
  Users,
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

// Menu items.
const items = [
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
    icon: Wine,
  },
  {
    id: "mi-carta",
    title: "Mi Carta",
    icon: FileText,
  },
  {
    id: "comandas",
    title: "Comandas",
    icon: Receipt,
  },
  {
    id: "equipo",
    title: "Equipo",
    icon: Users,
  },
  {
    id: "ajustes",
    title: "Ajustes",
    icon: Settings,
  },
]

interface AppSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>🥃 Bourbon Web</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={activeSection === item.id}
                    tooltip={item.title}
                  >
                    <button onClick={() => onSectionChange(item.id)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Sistema de Gestión Gastronómica</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}