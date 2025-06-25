
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Calendar, 
  Users, 
  FileText, 
  DollarSign, 
  Clock, 
  GraduationCap,
  Settings,
  Menu,
  X,
  UserCheck,
  Building
} from 'lucide-react'

interface SidebarProps {
  userRole: 'admin' | 'professional' | 'receptionist' | 'responsible'
}

const navigationItems = {
  admin: [
    { name: 'Dashboard', href: '/dashboard', icon: Building },
    { name: 'Agendamentos', href: '/appointments', icon: Calendar },
    { name: 'Pacientes', href: '/patients', icon: Users },
    { name: 'Profissionais', href: '/professionals', icon: UserCheck },
    { name: 'Financeiro', href: '/financial', icon: DollarSign },
    { name: 'Relatórios', href: '/reports', icon: FileText },
    { name: 'Eventos', href: '/events', icon: GraduationCap },
    { name: 'Configurações', href: '/settings', icon: Settings },
  ],
  professional: [
    { name: 'Meus Atendimentos', href: '/my-appointments', icon: Calendar },
    { name: 'Prontuários', href: '/medical-records', icon: FileText },
    { name: 'Horas Trabalhadas', href: '/work-hours', icon: Clock },
    { name: 'Meu Perfil', href: '/profile', icon: UserCheck },
  ],
  receptionist: [
    { name: 'Agendamentos', href: '/appointments', icon: Calendar },
    { name: 'Pacientes', href: '/patients', icon: Users },
    { name: 'Check-in', href: '/checkin', icon: UserCheck },
    { name: 'Financeiro', href: '/financial', icon: DollarSign },
  ],
  responsible: [
    { name: 'Meus Filhos', href: '/my-children', icon: Users },
    { name: 'Agendamentos', href: '/appointments', icon: Calendar },
    { name: 'Evolução', href: '/evolution', icon: FileText },
    { name: 'Documentos', href: '/documents', icon: FileText },
  ]
}

export function Sidebar({ userRole }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const items = navigationItems[userRole] || []

  return (
    <div className={cn(
      "flex flex-col border-r bg-background transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!isCollapsed && (
          <h2 className="text-xl font-semibold text-primary">
            NeuroClinic
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {items.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant={location.pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isCollapsed && "px-2"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
