
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface AppointmentFormProps {
  onSuccess: () => void;
}

export function AppointmentForm({ onSuccess }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patient_id: '',
    professional_id: '',
    specialty_id: '',
    room_id: '',
    appointment_date: '',
    start_time: '',
    end_time: '',
    notes: '',
    price: ''
  });

  const queryClient = useQueryClient();

  const { data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const { data, error } = await supabase.from('patients').select('id, full_name').eq('is_active', true);
      if (error) throw error;
      return data;
    }
  });

  const { data: professionals } = useQuery({
    queryKey: ['professionals'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('id, full_name').eq('role', 'professional');
      if (error) throw error;
      return data;
    }
  });

  const { data: specialties } = useQuery({
    queryKey: ['specialties'],
    queryFn: async () => {
      const { data, error } = await supabase.from('specialties').select('id, name, default_price').eq('is_active', true);
      if (error) throw error;
      return data;
    }
  });

  const { data: rooms } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const { data, error } = await supabase.from('rooms').select('id, name').eq('is_active', true);
      if (error) throw error;
      return data;
    }
  });

  const createAppointment = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('appointments').insert([{
        patient_id: data.patient_id,
        professional_id: data.professional_id,
        specialty_id: data.specialty_id,
        room_id: data.room_id || null,
        appointment_date: data.appointment_date,
        start_time: data.start_time,
        end_time: data.end_time,
        notes: data.notes || null,
        price: data.price ? parseFloat(data.price) : null
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({ title: 'Agendamento criado com sucesso!' });
      onSuccess();
    },
    onError: (error) => {
      toast({ title: 'Erro ao criar agendamento', description: error.message, variant: 'destructive' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAppointment.mutate(formData);
  };

  const handleSpecialtyChange = (specialtyId: string) => {
    setFormData(prev => ({ ...prev, specialty_id: specialtyId }));
    const specialty = specialties?.find(s => s.id === specialtyId);
    if (specialty?.default_price) {
      setFormData(prev => ({ ...prev, price: specialty.default_price.toString() }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="patient_id">Paciente</Label>
        <Select value={formData.patient_id} onValueChange={(value) => setFormData(prev => ({ ...prev, patient_id: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o paciente" />
          </SelectTrigger>
          <SelectContent>
            {patients?.map((patient) => (
              <SelectItem key={patient.id} value={patient.id}>
                {patient.full_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="professional_id">Profissional</Label>
        <Select value={formData.professional_id} onValueChange={(value) => setFormData(prev => ({ ...prev, professional_id: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o profissional" />
          </SelectTrigger>
          <SelectContent>
            {professionals?.map((professional) => (
              <SelectItem key={professional.id} value={professional.id}>
                {professional.full_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="specialty_id">Especialidade</Label>
        <Select value={formData.specialty_id} onValueChange={handleSpecialtyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a especialidade" />
          </SelectTrigger>
          <SelectContent>
            {specialties?.map((specialty) => (
              <SelectItem key={specialty.id} value={specialty.id}>
                {specialty.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="room_id">Sala</Label>
        <Select value={formData.room_id} onValueChange={(value) => setFormData(prev => ({ ...prev, room_id: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a sala" />
          </SelectTrigger>
          <SelectContent>
            {rooms?.map((room) => (
              <SelectItem key={room.id} value={room.id}>
                {room.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="appointment_date">Data</Label>
          <Input
            id="appointment_date"
            type="date"
            value={formData.appointment_date}
            onChange={(e) => setFormData(prev => ({ ...prev, appointment_date: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="price">Valor</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start_time">Hora Início</Label>
          <Input
            id="start_time"
            type="time"
            value={formData.start_time}
            onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="end_time">Hora Fim</Label>
          <Input
            id="end_time"
            type="time"
            value={formData.end_time}
            onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Observações</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Observações sobre o agendamento..."
        />
      </div>

      <Button type="submit" className="w-full" disabled={createAppointment.isPending}>
        {createAppointment.isPending ? 'Criando...' : 'Criar Agendamento'}
      </Button>
    </form>
  );
}
