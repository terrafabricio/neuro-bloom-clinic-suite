
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface PatientFormProps {
  onSuccess: () => void;
}

export function PatientForm({ onSuccess }: PatientFormProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    birth_date: '',
    cpf: '',
    rg: '',
    address: '',
    phone: '',
    emergency_contact: '',
    emergency_phone: '',
    medical_history: '',
    allergies: '',
    medications: '',
    responsible_id: ''
  });

  const queryClient = useQueryClient();

  const { data: responsibles } = useQuery({
    queryKey: ['responsibles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'responsible');
      if (error) throw error;
      return data;
    }
  });

  const createPatient = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('patients').insert([{
        full_name: data.full_name,
        birth_date: data.birth_date,
        cpf: data.cpf || null,
        rg: data.rg || null,
        address: data.address || null,
        phone: data.phone || null,
        emergency_contact: data.emergency_contact || null,
        emergency_phone: data.emergency_phone || null,
        medical_history: data.medical_history || null,
        allergies: data.allergies || null,
        medications: data.medications || null,
        responsible_id: data.responsible_id || null
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast({ title: 'Paciente cadastrado com sucesso!' });
      onSuccess();
    },
    onError: (error) => {
      toast({ title: 'Erro ao cadastrar paciente', description: error.message, variant: 'destructive' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPatient.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="full_name">Nome Completo *</Label>
          <Input
            id="full_name"
            value={formData.full_name}
            onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="birth_date">Data de Nascimento *</Label>
          <Input
            id="birth_date"
            type="date"
            value={formData.birth_date}
            onChange={(e) => setFormData(prev => ({ ...prev, birth_date: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            value={formData.cpf}
            onChange={(e) => setFormData(prev => ({ ...prev, cpf: e.target.value }))}
            placeholder="000.000.000-00"
          />
        </div>
        <div>
          <Label htmlFor="rg">RG</Label>
          <Input
            id="rg"
            value={formData.rg}
            onChange={(e) => setFormData(prev => ({ ...prev, rg: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Endereço</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="(00) 00000-0000"
          />
        </div>
        <div>
          <Label htmlFor="responsible_id">Responsável</Label>
          <Select value={formData.responsible_id} onValueChange={(value) => setFormData(prev => ({ ...prev, responsible_id: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um responsável" />
            </SelectTrigger>
            <SelectContent>
              {responsibles?.map((responsible) => (
                <SelectItem key={responsible.id} value={responsible.id}>
                  {responsible.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="emergency_contact">Contato de Emergência</Label>
          <Input
            id="emergency_contact"
            value={formData.emergency_contact}
            onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="emergency_phone">Telefone de Emergência</Label>
          <Input
            id="emergency_phone"
            value={formData.emergency_phone}
            onChange={(e) => setFormData(prev => ({ ...prev, emergency_phone: e.target.value }))}
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="medical_history">Histórico Médico</Label>
        <Textarea
          id="medical_history"
          value={formData.medical_history}
          onChange={(e) => setFormData(prev => ({ ...prev, medical_history: e.target.value }))}
          placeholder="Histórico médico relevante..."
        />
      </div>

      <div>
        <Label htmlFor="allergies">Alergias</Label>
        <Textarea
          id="allergies"
          value={formData.allergies}
          onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
          placeholder="Alergias conhecidas..."
        />
      </div>

      <div>
        <Label htmlFor="medications">Medicamentos</Label>
        <Textarea
          id="medications"
          value={formData.medications}
          onChange={(e) => setFormData(prev => ({ ...prev, medications: e.target.value }))}
          placeholder="Medicamentos em uso..."
        />
      </div>

      <Button type="submit" className="w-full" disabled={createPatient.isPending}>
        {createPatient.isPending ? 'Cadastrando...' : 'Cadastrar Paciente'}
      </Button>
    </form>
  );
}
