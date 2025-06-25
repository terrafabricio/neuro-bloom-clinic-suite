
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Plus, FileText, DollarSign, Clock, UserPlus, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  userRole?: string;
}

export function QuickActions({ userRole = 'admin' }: QuickActionsProps) {
  const navigate = useNavigate();

  const getActionsForRole = () => {
    const commonActions = [
      {
        icon: Calendar,
        label: 'Agendar Consulta',
        description: 'Novo agendamento',
        action: () => navigate('/appointments'),
        color: 'bg-neuro-blue-500 hover:bg-neuro-blue-600'
      }
    ];

    switch (userRole) {
      case 'professional':
        return [
          ...commonActions,
          {
            icon: Clock,
            label: 'Próxima Sessão',
            description: 'Iniciar atendimento',
            action: () => navigate('/appointments'),
            color: 'bg-neuro-green-500 hover:bg-neuro-green-600'
          },
          {
            icon: FileText,
            label: 'Novo Prontuário',
            description: 'Registrar sessão',
            action: () => console.log('Novo prontuário'),
            color: 'bg-neuro-yellow-500 hover:bg-neuro-yellow-600'
          },
          {
            icon: Users,
            label: 'Meus Pacientes',
            description: 'Ver lista completa',
            action: () => navigate('/patients'),
            color: 'bg-purple-500 hover:bg-purple-600'
          }
        ];

      case 'receptionist':
        return [
          ...commonActions,
          {
            icon: UserPlus,
            label: 'Cadastrar Paciente',
            description: 'Novo registro',
            action: () => navigate('/patients'),
            color: 'bg-neuro-green-500 hover:bg-neuro-green-600'
          },
          {
            icon: DollarSign,
            label: 'Registrar Pagamento',
            description: 'Atualizar financeiro',
            action: () => navigate('/financial'),
            color: 'bg-emerald-500 hover:bg-emerald-600'
          },
          {
            icon: Calendar,
            label: 'Confirmar Agendamentos',
            description: 'Verificar agenda',
            action: () => navigate('/appointments'),
            color: 'bg-orange-500 hover:bg-orange-600'
          }
        ];

      case 'admin':
      default:
        return [
          ...commonActions,
          {
            icon: Users,
            label: 'Cadastrar Paciente',
            description: 'Novo registro',
            action: () => navigate('/patients'),
            color: 'bg-neuro-green-500 hover:bg-neuro-green-600'
          },
          {
            icon: Plus,
            label: 'Novo Profissional',
            description: 'Adicionar ao time',
            action: () => navigate('/professionals'),
            color: 'bg-neuro-yellow-500 hover:bg-neuro-yellow-600'
          },
          {
            icon: FileText,
            label: 'Gerar Relatório',
            description: 'Relatórios mensais',
            action: () => navigate('/reports'),
            color: 'bg-purple-500 hover:bg-purple-600'
          },
          {
            icon: Settings,
            label: 'Configurações',
            description: 'Gerir sistema',
            action: () => navigate('/settings'),
            color: 'bg-gray-500 hover:bg-gray-600'
          },
          {
            icon: DollarSign,
            label: 'Financeiro',
            description: 'Ver receitas/despesas',
            action: () => navigate('/financial'),
            color: 'bg-emerald-500 hover:bg-emerald-600'
          }
        ];
    }
  };

  const actions = getActionsForRole();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-neuro-blue-700">Ações Rápidas</CardTitle>
        <CardDescription>
          Acesso rápido às principais funcionalidades
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {actions.map((action, index) => (
          <Button 
            key={index}
            variant="outline" 
            className={`justify-start h-auto p-4 ${action.color} text-white border-0 shadow-sm hover:shadow-md transition-all duration-200`}
            onClick={action.action}
          >
            <action.icon className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">{action.label}</div>
              <div className="text-xs opacity-90">{action.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
