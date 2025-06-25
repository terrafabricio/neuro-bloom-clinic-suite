
import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { FinancialForm } from '@/components/financial/FinancialForm';

export default function Financial() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: accounts, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('accounts')
        .select(`
          *,
          patients(full_name),
          profiles:created_by(full_name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'receivable': return 'bg-blue-100 text-blue-800';
      case 'revenue': return 'bg-green-100 text-green-800';
      case 'payable': return 'bg-orange-100 text-orange-800';
      case 'expense': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAccounts = accounts?.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.patients?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || account.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || account.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate totals
  const totalReceivables = accounts?.filter(a => a.type === 'receivable' && a.status !== 'cancelled')
    .reduce((sum, a) => sum + Number(a.amount), 0) || 0;
  
  const totalPayables = accounts?.filter(a => a.type === 'payable' && a.status !== 'cancelled')
    .reduce((sum, a) => sum + Number(a.amount), 0) || 0;
  
  const totalRevenue = accounts?.filter(a => a.type === 'revenue' && a.status === 'paid')
    .reduce((sum, a) => sum + Number(a.amount), 0) || 0;
  
  const totalExpenses = accounts?.filter(a => a.type === 'expense' && a.status === 'paid')
    .reduce((sum, a) => sum + Number(a.amount), 0) || 0;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Financeiro</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Conta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Conta</DialogTitle>
            </DialogHeader>
            <FinancialForm onSuccess={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">A Receber</p>
                <p className="text-2xl font-bold">R$ {totalReceivables.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">A Pagar</p>
                <p className="text-2xl font-bold">R$ {totalPayables.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Receitas</p>
                <p className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Despesas</p>
                <p className="text-2xl font-bold">R$ {totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contas</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="receivable">A Receber</SelectItem>
                <SelectItem value="payable">A Pagar</SelectItem>
                <SelectItem value="revenue">Receita</SelectItem>
                <SelectItem value="expense">Despesa</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
                <SelectItem value="overdue">Vencido</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAccounts?.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold">{account.name}</h3>
                      <p className="text-sm text-gray-600">{account.description}</p>
                    </div>
                    <div>
                      <p className="text-sm">{account.patients?.full_name || 'Sem paciente'}</p>
                      <p className="text-sm text-gray-600">{account.category}</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">R$ {Number(account.amount).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">
                        {account.due_date ? `Venc: ${new Date(account.due_date).toLocaleDateString('pt-BR')}` : 'Sem vencimento'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(account.type)}>
                    {account.type === 'receivable' && 'A Receber'}
                    {account.type === 'payable' && 'A Pagar'}
                    {account.type === 'revenue' && 'Receita'}
                    {account.type === 'expense' && 'Despesa'}
                  </Badge>
                  <Badge className={getStatusColor(account.status)}>
                    {account.status === 'pending' && 'Pendente'}
                    {account.status === 'paid' && 'Pago'}
                    {account.status === 'overdue' && 'Vencido'}
                    {account.status === 'cancelled' && 'Cancelado'}
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
