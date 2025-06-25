
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Users, DollarSign, Clock } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  description: string
  icon: any
  trend?: string
}

function StatsCard({ title, value, description, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {trend && <span className="text-green-600">{trend}</span>} {description}
        </p>
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  const stats = [
    {
      title: "Consultas Hoje",
      value: 12,
      description: "próximas consultas agendadas",
      icon: Calendar,
      trend: "+2"
    },
    {
      title: "Pacientes Ativos",
      value: 89,
      description: "pacientes em acompanhamento",
      icon: Users,
      trend: "+5"
    },
    {
      title: "Receita Mensal",
      value: "R$ 45.231",
      description: "faturamento do mês atual",
      icon: DollarSign,
      trend: "+12%"
    },
    {
      title: "Horas Trabalhadas",
      value: 156,
      description: "horas registradas este mês",
      icon: Clock,
      trend: "+8h"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  )
}
