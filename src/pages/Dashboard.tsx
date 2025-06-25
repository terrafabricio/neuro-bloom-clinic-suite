
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Plus } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral da sua clínica multidisciplinar
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Próximas Consultas</CardTitle>
            <CardDescription>
              Agendamentos para hoje e próximos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "09:00",
                  patient: "João Silva",
                  professional: "Dra. Maria Santos",
                  specialty: "Psicologia",
                  status: "Confirmado"
                },
                {
                  time: "10:30",
                  patient: "Ana Costa",
                  professional: "Dr. Pedro Lima",
                  specialty: "Musicoterapia",
                  status: "Aguardando"
                },
                {
                  time: "14:00",
                  patient: "Carlos Mendes",
                  professional: "Dra. Julia Ferreira",
                  specialty: "Nutrição",
                  status: "Confirmado"
                }
              ].map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-4">
                    <div className="font-medium">{appointment.time}</div>
                    <div>
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.professional} • {appointment.specialty}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    appointment.status === 'Confirmado' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesso rápido às principais funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Agendar Consulta
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Cadastrar Paciente
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Registrar Atendimento
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
