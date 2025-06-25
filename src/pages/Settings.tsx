
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Stethoscope, 
  Home, 
  CreditCard, 
  Bell, 
  Shield, 
  Palette,
  Plus,
  Edit,
  Trash2,
  Save
} from 'lucide-react';
import { NeuroClinicLogo } from '@/components/brand/NeuroClinicLogo';
import { toast } from '@/hooks/use-toast';

export default function Settings() {
  const [clinicInfo, setClinicInfo] = useState({
    name: 'NeuroClinic',
    address: 'Rua das Flores, 123, Centro - São Paulo, SP',
    phone: '(11) 3333-4444',
    email: 'contato@neuroclinic.com.br',
    cnpj: '12.345.678/0001-90',
    description: 'Clínica multidisciplinar especializada no atendimento de crianças e adolescentes.'
  });

  const [specialties, setSpecialties] = useState([
    { id: 1, name: 'Psicologia', duration: 60, price: 150.00, active: true },
    { id: 2, name: 'Nutrição', duration: 45, price: 120.00, active: true },
    { id: 3, name: 'Musicoterapia', duration: 60, price: 130.00, active: true },
    { id: 4, name: 'Psicopedagogia', duration: 60, price: 140.00, active: true },
    { id: 5, name: 'Assistência Social', duration: 60, price: 100.00, active: true }
  ]);

  const [rooms, setRooms] = useState([
    { id: 1, name: 'Sala 1', capacity: 2, equipment: ['Mesa', 'Cadeiras', 'Quadro'], active: true },
    { id: 2, name: 'Sala 2', capacity: 2, equipment: ['Mesa', 'Cadeiras', 'Computador'], active: true },
    { id: 3, name: 'Sala de Música', capacity: 3, equipment: ['Piano', 'Instrumentos', 'Som'], active: true },
    { id: 4, name: 'Sala de Grupo', capacity: 8, equipment: ['Mesas', 'Cadeiras', 'Projetor'], active: true }
  ]);

  const [notifications, setNotifications] = useState({
    emailAppointments: true,
    smsReminders: true,
    reportAlerts: false,
    systemUpdates: true
  });

  const handleSaveClinicInfo = () => {
    toast({
      title: "Informações atualizadas",
      description: "As informações da clínica foram salvas com sucesso."
    });
  };

  const handleAddSpecialty = () => {
    const newSpecialty = {
      id: specialties.length + 1,
      name: 'Nova Especialidade',
      duration: 60,
      price: 0,
      active: true
    };
    setSpecialties([...specialties, newSpecialty]);
  };

  const handleAddRoom = () => {
    const newRoom = {
      id: rooms.length + 1,
      name: 'Nova Sala',
      capacity: 1,
      equipment: [],
      active: true
    };
    setRooms([...rooms, newRoom]);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-neuro-blue-100 rounded-xl">
            <Shield className="h-8 w-8 text-neuro-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold tracking-tight text-neuro-blue-700">
              Configurações
            </h1>
            <p className="text-neuro-blue-500 mt-1">
              Gerencie as configurações da sua clínica
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="clinic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
          <TabsTrigger value="clinic" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Clínica
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="specialties" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Especialidades
          </TabsTrigger>
          <TabsTrigger value="rooms" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Salas
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Faturação
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
        </TabsList>

        {/* Informações da Clínica */}
        <TabsContent value="clinic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-neuro-blue-700">
                <Building2 className="h-5 w-5" />
                Informações da Clínica
              </CardTitle>
              <CardDescription>
                Configure as informações básicas da sua clínica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <NeuroClinicLogo size="lg" />
                <Button variant="outline">
                  Alterar Logo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="clinic-name">Nome da Clínica</Label>
                  <Input
                    id="clinic-name"
                    value={clinicInfo.name}
                    onChange={(e) => setClinicInfo(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic-cnpj">CNPJ</Label>
                  <Input
                    id="clinic-cnpj"
                    value={clinicInfo.cnpj}
                    onChange={(e) => setClinicInfo(prev => ({ ...prev, cnpj: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic-phone">Telefone</Label>
                  <Input
                    id="clinic-phone"
                    value={clinicInfo.phone}
                    onChange={(e) => setClinicInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic-email">Email</Label>
                  <Input
                    id="clinic-email"
                    type="email"
                    value={clinicInfo.email}
                    onChange={(e) => setClinicInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinic-address">Endereço</Label>
                <Input
                  id="clinic-address"
                  value={clinicInfo.address}
                  onChange={(e) => setClinicInfo(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinic-description">Descrição</Label>
                <Textarea
                  id="clinic-description"
                  value={clinicInfo.description}
                  onChange={(e) => setClinicInfo(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <Button onClick={handleSaveClinicInfo} className="bg-neuro-blue-500 hover:bg-neuro-blue-600">
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Especialidades */}
        <TabsContent value="specialties" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-neuro-blue-700">
                    <Stethoscope className="h-5 w-5" />
                    Especialidades
                  </CardTitle>
                  <CardDescription>
                    Gerencie as especialidades oferecidas na clínica
                  </CardDescription>
                </div>
                <Button onClick={handleAddSpecialty} className="bg-neuro-green-500 hover:bg-neuro-green-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Especialidade
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {specialties.map((specialty) => (
                  <div key={specialty.id} className="flex items-center justify-between p-4 border rounded-lg hover:border-neuro-blue-200 transition-colors">
                    <div className="flex items-center space-x-4 flex-1">
                      <div>
                        <h3 className="font-semibold">{specialty.name}</h3>
                        <p className="text-sm text-gray-600">
                          {specialty.duration} min • R$ {specialty.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={specialty.active ? "default" : "secondary"}>
                        {specialty.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Salas */}
        <TabsContent value="rooms" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-neuro-blue-700">
                    <Home className="h-5 w-5" />
                    Salas
                  </CardTitle>
                  <CardDescription>
                    Gerencie as salas disponíveis na clínica
                  </CardDescription>
                </div>
                <Button onClick={handleAddRoom} className="bg-neuro-green-500 hover:bg-neuro-green-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Sala
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rooms.map((room) => (
                  <div key={room.id} className="flex items-center justify-between p-4 border rounded-lg hover:border-neuro-blue-200 transition-colors">
                    <div className="flex items-center space-x-4 flex-1">
                      <div>
                        <h3 className="font-semibold">{room.name}</h3>
                        <p className="text-sm text-gray-600">
                          Capacidade: {room.capacity} pessoas
                        </p>
                        <div className="flex gap-1 mt-1">
                          {room.equipment.map((eq, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {eq}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={room.active ? "default" : "secondary"}>
                        {room.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-neuro-blue-700">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure as preferências de notificação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-appointments">Notificações de Agendamento por Email</Label>
                    <p className="text-sm text-gray-600">Receba emails quando novos agendamentos forem criados</p>
                  </div>
                  <Switch
                    id="email-appointments"
                    checked={notifications.emailAppointments}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, emailAppointments: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-reminders">Lembretes por SMS</Label>
                    <p className="text-sm text-gray-600">Envie lembretes automáticos para pacientes</p>
                  </div>
                  <Switch
                    id="sms-reminders"
                    checked={notifications.smsReminders}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, smsReminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="report-alerts">Alertas de Relatórios</Label>
                    <p className="text-sm text-gray-600">Receba notificações sobre relatórios importantes</p>
                  </div>
                  <Switch
                    id="report-alerts"
                    checked={notifications.reportAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, reportAlerts: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-updates">Atualizações do Sistema</Label>
                    <p className="text-sm text-gray-600">Receba notificações sobre atualizações do sistema</p>
                  </div>
                  <Switch
                    id="system-updates"
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, systemUpdates: checked }))
                    }
                  />
                </div>
              </div>

              <Button className="bg-neuro-blue-500 hover:bg-neuro-blue-600">
                <Save className="h-4 w-4 mr-2" />
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder para outras abas */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Usuários</CardTitle>
              <CardDescription>Em desenvolvimento...</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Faturação</CardTitle>
              <CardDescription>Em desenvolvimento...</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
