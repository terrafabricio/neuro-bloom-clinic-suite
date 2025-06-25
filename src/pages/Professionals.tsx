
import { useState } from 'react';
import { Users, Plus, Search, Star, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProfessionalForm } from '@/components/professionals/ProfessionalForm';

export default function Professionals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: professionals, isLoading } = useQuery({
    queryKey: ['professionals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'professional')
        .order('full_name');
      
      if (error) throw error;
      return data;
    }
  });

  const filteredProfessionals = professionals?.filter(professional =>
    professional.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professional.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professional.professional_license?.includes(searchTerm)
  );

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
        <h1 className="text-3xl font-bold">Profissionais</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Profissional
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Novo Profissional</DialogTitle>
            </DialogHeader>
            <ProfessionalForm onSuccess={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{professionals?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Ativos</p>
                <p className="text-2xl font-bold">
                  {professionals?.filter(p => p.is_active).length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Psicólogos</p>
                <p className="text-2xl font-bold">
                  {professionals?.filter(p => p.specialty?.includes('Psicolog')).length || 0}
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
                <p className="text-sm text-gray-600">Outros</p>
                <p className="text-2xl font-bold">
                  {professionals?.filter(p => !p.specialty?.includes('Psicolog')).length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Profissionais</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, especialidade ou registro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProfessionals?.map((professional) => (
              <div key={professional.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold">{professional.full_name}</h3>
                      <p className="text-sm text-gray-600">{professional.specialty || 'Especialidade não informada'}</p>
                    </div>
                    <div>
                      <p className="text-sm">{professional.professional_license || 'Registro não informado'}</p>
                      <p className="text-sm text-gray-600">{professional.phone || 'Telefone não informado'}</p>
                    </div>
                    <div>
                      <p className="text-sm">{professional.email}</p>
                      <p className="text-sm text-gray-600">
                        Cadastrado em {new Date(professional.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={professional.is_active ? "default" : "secondary"}>
                    {professional.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Ver Perfil
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
