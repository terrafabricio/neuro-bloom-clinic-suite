
import { useState } from 'react';
import { Users, Plus, Search, Calendar, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PatientForm } from '@/components/patients/PatientForm';

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('patients')
        .select(`
          *,
          profiles:responsible_id(full_name)
        `)
        .order('full_name');
      
      if (error) throw error;
      return data;
    }
  });

  const filteredPatients = patients?.filter(patient =>
    patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf?.includes(searchTerm) ||
    patient.phone?.includes(searchTerm)
  );

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

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
        <h1 className="text-3xl font-bold">Pacientes</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Novo Paciente</DialogTitle>
            </DialogHeader>
            <PatientForm onSuccess={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total de Pacientes</p>
                <p className="text-2xl font-bold">{patients?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Ativos</p>
                <p className="text-2xl font-bold">
                  {patients?.filter(p => p.is_active).length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Menores</p>
                <p className="text-2xl font-bold">
                  {patients?.filter(p => calculateAge(p.birth_date) < 18).length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Adultos</p>
                <p className="text-2xl font-bold">
                  {patients?.filter(p => calculateAge(p.birth_date) >= 18).length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, CPF ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients?.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold">{patient.full_name}</h3>
                      <p className="text-sm text-gray-600">
                        {calculateAge(patient.birth_date)} anos • {new Date(patient.birth_date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">{patient.cpf}</p>
                      <p className="text-sm text-gray-600">{patient.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm">{patient.profiles?.full_name || 'Sem responsável'}</p>
                      <p className="text-sm text-gray-600">{patient.emergency_contact}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={patient.is_active ? "default" : "secondary"}>
                    {patient.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
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
