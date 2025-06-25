
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface ProfessionalFormProps {
  onSuccess: () => void;
}

export function ProfessionalForm({ onSuccess }: ProfessionalFormProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    specialty: '',
    professional_license: ''
  });

  const queryClient = useQueryClient();

  const createProfessional = useMutation({
    mutationFn: async (data: typeof formData) => {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: 'temp123456', // Temporary password
        options: {
          data: {
            full_name: data.full_name,
            role: 'professional'
          }
        }
      });

      if (authError) throw authError;

      // Then create the profile
      if (authData.user) {
        const { error: profileError } = await supabase.from('profiles').insert([{
          id: authData.user.id,
          full_name: data.full_name,
          email: data.email,
          phone: data.phone || null,
          role: 'professional',
          specialty: data.specialty || null,
          professional_license: data.professional_license || null
        }]);

        if (profileError) throw profileError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionals'] });
      toast({ 
        title: 'Profissional cadastrado com sucesso!',
        description: 'Uma senha temporária foi enviada por email.'
      });
      onSuccess();
    },
    onError: (error) => {
      toast({ 
        title: 'Erro ao cadastrar profissional', 
        description: error.message, 
        variant: 'destructive' 
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProfessional.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>

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
        <Label htmlFor="specialty">Especialidade</Label>
        <Select value={formData.specialty} onValueChange={(value) => setFormData(prev => ({ ...prev, specialty: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a especialidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Psicologia">Psicologia</SelectItem>
            <SelectItem value="Nutrição">Nutrição</SelectItem>
            <SelectItem value="Musicoterapia">Musicoterapia</SelectItem>
            <SelectItem value="Psicopedagogia">Psicopedagogia</SelectItem>
            <SelectItem value="Assistência Social">Assistência Social</SelectItem>
            <SelectItem value="Fisioterapia">Fisioterapia</SelectItem>
            <SelectItem value="Fonoaudiologia">Fonoaudiologia</SelectItem>
            <SelectItem value="Terapia Ocupacional">Terapia Ocupacional</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="professional_license">Registro Profissional</Label>
        <Input
          id="professional_license"
          value={formData.professional_license}
          onChange={(e) => setFormData(prev => ({ ...prev, professional_license: e.target.value }))}
          placeholder="CRP, CRN, etc."
        />
      </div>

      <Button type="submit" className="w-full" disabled={createProfessional.isPending}>
        {createProfessional.isPending ? 'Cadastrando...' : 'Cadastrar Profissional'}
      </Button>
    </form>
  );
}
