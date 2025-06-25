
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, Phone } from 'lucide-react'
import { NeuroClinicLogo } from '@/components/brand/NeuroClinicLogo'

export default function Dashboard() {
  // Mock data para próximas consultas
  const upcomingAppointments = [
    {
      id: 1,
      time: "09:00",
      patient: "João Silva Santos",
      age: 8,
      professional: "Dra. Maria Santos",
      specialty: "Psicologia",
      status: "confirmed",
      phone: "(11) 99999-9999",
      room: "Sala 1"
    },
    {
      id: 2,
      time: "10:30",
      patient: "Ana Costa Oliveira",
      age: 12,
      professional: "Dr. Pedro Lima",
      specialty: "Musicoterapia",
      status: "pending",
      phone: "(11) 88888-8888",
      room: "Sala de Música"
    },
    {
      id: 3,
      time: "14:00",
      patient: "Carlos Mendes Junior",
      age: 6,
      professional: "Dra. Julia Ferreira",
      specialty: "Nutrição",
      status: "confirmed",
      phone: "(11) 77777-7777",
      room: "Sala 2"
    },
    {
      id: 4,
      time: "15:30",
      patient: "Beatriz Almeida Silva",
      age: 10,
      professional: "Dr. Roberto Andrade",
      specialty: "Psicopedagogia",
      status: "confirmed",
      phone: "(11) 66666-6666",
      room: "Sala 3"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-neuro-green-100 text-neuro-green-800 border-neuro-green-200';
      case 'pending': return 'bg-neuro-yellow-100 text-neuro-yellow-800 border-neuro-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header com branding */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <NeuroClinicLogo size="lg" />
          <div>
            <h1 className="text-3xl font-heading font-bold tracking-tight text-neuro-blue-700">
              Dashboard
            </h1>
            <p className="text-neuro-blue-500 mt-1">
              Visão geral da sua clínica multidisciplinar
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-lg font-semibold text-neuro-blue-700">
            {new Date().toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Próximas Consultas - 2 colunas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-neuro-blue-700 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Próximas Consultas
                </CardTitle>
                <CardDescription>
                  Agendamentos para hoje • {upcomingAppointments.length} consultas
                </CardDescription>
              </div>
              <Button size="sm" className="bg-neuro-blue-500 hover:bg-neuro-blue-600">
                Ver Agenda Completa
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-neuro-blue-200 hover:shadow-sm transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex flex-col items-center bg-neuro-blue-50 rounded-lg p-3 min-w-[70px]">
                      <Clock className="h-4 w-4 text-neuro-blue-600 mb-1" />
                      <span className="font-bold text-neuro-blue-700 text-sm">{appointment.time}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-semibold text-gray-900">{appointment.patient}</span>
                        <span className="text-sm text-gray-500">({appointment.age} anos)</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {appointment.professional} • {appointment.specialty}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>📍 {appointment.room}</span>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {appointment.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${getStatusColor(appointment.status)} border`}>
                      {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      Detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas - 1 coluna */}
        <QuickActions userRole="admin" />
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-heading font-semibold text-neuro-blue-700">
            Análises e Relatórios
          </h2>
          <Button variant="outline" className="border-neuro-blue-200 text-neuro-blue-600 hover:bg-neuro-blue-50">
            Ver Todos os Relatórios
          </Button>
        </div>
        <DashboardCharts />
      </div>
    </div>
  )
}
