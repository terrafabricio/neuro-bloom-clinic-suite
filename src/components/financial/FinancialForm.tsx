
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

interface FinancialFormProps {
  onSuccess: () => void;
}

export function FinancialForm({ onSuccess }: FinancialFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    amount: '',
    due_date: '',
    patient_id: '',
    category: '',
    payment_method: '',
    notes: ''
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

  const createAccount = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('accounts').insert([{
        name: data.name,
        type: data.type,
        description: data.description || null,
        amount: parseFloat(data.amount),
        due_date: data.due_date || null,
        patient_id: data.patient_id || null,
        category: data.category || null,
        payment_method: data.payment_method || null,
        notes: data.notes || null
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast({ title: 'Conta criada com sucesso!' });
      onSuccess();
    },
    onError: (error) => {
      toast({ title: 'Erro ao criar conta', description: error.message, variant: 'destructive' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAccount.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome da Conta *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="type">Tipo *</Label>
        <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="receivable">A Receber</SelectItem>
            <SelectItem value="payable">A Pagar</SelectItem>
            <SelectItem value="revenue">Receita</SelectItem>
            <SelectItem value="expense">Despesa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="amount">Valor *</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="due_date">Data de Vencimento</Label>
        <Input
          id="due_date"
          type="date"
          value={formData.due_date}
          onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="patient_id">Paciente</Label>
        <Select value={formData.patient_id} onValueChange={(value) => setFormData(prev => ({ ...prev, patient_id: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o paciente (opcional)" />
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
        <Label htmlFor="category">Categoria</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="consulta">Consulta</SelectItem>
            <SelectItem value="material">Material</SelectItem>
            <SelectItem value="aluguel">Aluguel</SelectItem>
            <SelectItem value="energia">Energia</SelectItem>
            <SelectItem value="agua">Água</SelectItem>
            <SelectItem value="internet">Internet</SelectItem>
            <SelectItem value="salario">Salário</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="payment_method">Forma de Pagamento</Label>
        <Select value={formData.payment_method} onValueChange={(value) => setFormData(prev => ({ ...prev, payment_method: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a forma de pagamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dinheiro">Dinheiro</SelectItem>
            <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
            <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
            <SelectItem value="pix">PIX</SelectItem>
            <SelectItem value="transferencia">Transferência</SelectItem>
            <SelectItem value="boleto">Boleto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Descrição da conta..."
        />
      </div>

      <div>
        <Label htmlFor="notes">Observações</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Observações adicionais..."
        />
      </div>

      <Button type="submit" className="w-full" disabled={createAccount.isPending}>
        {createAccount.isPending ? 'Criando...' : 'Criar Conta'}
      </Button>
    </form>
  );
}
