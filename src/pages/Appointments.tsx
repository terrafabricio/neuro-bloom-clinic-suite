
import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AppointmentForm } from '@/components/appointments/AppointmentForm';

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patients(full_name),
          profiles(full_name),
          specialties(name),
          rooms(name)
        `)
        .order('appointment_date', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no_show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredAppointments = appointments?.filter(appointment => {
    const matchesSearch = appointment.patients?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Agendamentos</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Agendamento</DialogTitle>
            </DialogHeader>
            <AppointmentForm onSuccess={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Hoje</p>
                <p className="text-2xl font-bold">
                  {appointments?.filter(a => a.appointment_date === new Date().toISOString().split('T')[0]).length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Confirmados</p>
                <p className="text-2xl font-bold">
                  {appointments?.filter(a => a.status === 'confirmed').length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Concluídos</p>
                <p className="text-2xl font-bold">
                  {appointments?.filter(a => a.status === 'completed').length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold">
                  {appointments?.filter(a => a.status === 'scheduled').length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Agendamentos</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por paciente ou profissional..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="scheduled">Agendado</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
                <SelectItem value="no_show">Não compareceu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments?.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold">{appointment.patients?.full_name}</h3>
                      <p className="text-sm text-gray-600">{appointment.profiles?.full_name}</p>
                    </div>
                    <div>
                      <p className="text-sm">{appointment.specialties?.name}</p>
                      <p className="text-sm text-gray-600">{appointment.rooms?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm">{new Date(appointment.appointment_date).toLocaleDateString('pt-BR')}</p>
                      <p className="text-sm text-gray-600">{appointment.start_time} - {appointment.end_time}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status === 'scheduled' && 'Agendado'}
                    {appointment.status === 'confirmed' && 'Confirmado'}
                    {appointment.status === 'completed' && 'Concluído'}
                    {appointment.status === 'cancelled' && 'Cancelado'}
                    {appointment.status === 'no_show' && 'Não compareceu'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
