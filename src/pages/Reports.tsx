
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon, 
  Users, 
  TrendingUp, 
  DollarSign,
  Clock,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';

export default function Reports() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date()
  });
  const [selectedReport, setSelectedReport] = useState('');

  const reportTypes = [
    {
      id: 'attendance',
      title: 'Relatório de Assiduidade',
      description: 'Frequência de comparecimento dos pacientes',
      icon: Users,
      color: 'bg-neuro-blue-500',
      category: 'Pacientes'
    },
    {
      id: 'productivity',
      title: 'Produtividade dos Profissionais',
      description: 'Número de atendimentos e horas trabalhadas',
      icon: Clock,
      color: 'bg-neuro-green-500',
      category: 'Profissionais'
    },
    {
      id: 'financial',
      title: 'Relatório Financeiro',
      description: 'Receitas, despesas e análise de fluxo de caixa',
      icon: DollarSign,
      color: 'bg-neuro-yellow-500',
      category: 'Financeiro'
    },
    {
      id: 'patient-evolution',
      title: 'Evolução dos Pacientes',
      description: 'Progresso e evolução clínica dos pacientes',
      icon: TrendingUp,
      color: 'bg-purple-500',
      category: 'Clínico'
    },
    {
      id: 'appointments-summary',
      title: 'Resumo de Agendamentos',
      description: 'Estatísticas de agendamentos por período',
      icon: CalendarIcon,
      color: 'bg-orange-500',
      category: 'Agendamentos'
    },
    {
      id: 'specialty-analysis',
      title: 'Análise por Especialidade',
      description: 'Performance e demanda por especialidade',
      icon: BarChart3,
      color: 'bg-indigo-500',
      category: 'Especialidades'
    }
  ];

  const predefinedReports = [
    {
      name: 'Relatório Mensal - Junho 2024',
      type: 'Financeiro',
      date: '2024-06-30',
      status: 'ready',
      size: '2.3 MB'
    },
    {
      name: 'Assiduidade - 2º Trimestre 2024',
      type: 'Pacientes',
      date: '2024-06-30',
      status: 'ready',
      size: '1.8 MB'
    },
    {
      name: 'Produtividade Profissionais - Maio 2024',
      type: 'Profissionais',
      date: '2024-05-31',
      status: 'ready',
      size: '1.2 MB'
    },
    {
      name: 'Evolução Pacientes - Semestre 1',
      type: 'Clínico',
      date: '2024-06-30',
      status: 'processing',
      size: '-'
    }
  ];

  const handleGenerateReport = () => {
    if (!selectedReport) {
      toast({
        title: "Erro",
        description: "Selecione um tipo de relatório",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Relatório em processamento",
      description: "Seu relatório está sendo gerado e estará disponível em breve."
    });
  };

  const handleDownloadReport = (reportName: string) => {
    toast({
      title: "Download iniciado",
      description: `O relatório "${reportName}" está sendo baixado.`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-neuro-green-100 text-neuro-green-800 border-neuro-green-200';
      case 'processing': return 'bg-neuro-yellow-100 text-neuro-yellow-800 border-neuro-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ready': return 'Pronto';
      case 'processing': return 'Processando';
      case 'error': return 'Erro';
      default: return 'Desconhecido';
    }
  };

  const groupedReports = reportTypes.reduce((acc, report) => {
    if (!acc[report.category]) {
      acc[report.category] = [];
    }
    acc[report.category].push(report);
    return acc;
  }, {} as Record<string, typeof reportTypes>);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-neuro-blue-100 rounded-xl">
            <FileText className="h-8 w-8 text-neuro-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold tracking-tight text-neuro-blue-700">
              Relatórios
            </h1>
            <p className="text-neuro-blue-500 mt-1">
              Gere e gerencie relatórios da sua clínica
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Gerador de Relatórios */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-neuro-blue-700">Gerar Novo Relatório</CardTitle>
            <CardDescription>
              Selecione o tipo de relatório e período desejado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Tipos de Relatório</Label>
              <div className="grid gap-3 md:grid-cols-2">
                {Object.entries(groupedReports).map(([category, reports]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-700 border-b pb-1">{category}</h4>
                    {reports.map((report) => {
                      const Icon = report.icon;
                      return (
                        <div
                          key={report.id}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            selectedReport === report.id
                              ? 'border-neuro-blue-500 bg-neuro-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedReport(report.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${report.color} text-white`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm">{report.title}</h3>
                              <p className="text-xs text-gray-600 mt-1">{report.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Data Inicial</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "dd/MM/yyyy", { locale: ptBR }) : "Selecione"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => date && setDateRange(prev => ({ ...prev, from: date }))}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Data Final</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "dd/MM/yyyy", { locale: ptBR }) : "Selecione"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => date && setDateRange(prev => ({ ...prev, to: date }))}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button 
              onClick={handleGenerateReport}
              className="w-full bg-neuro-blue-500 hover:bg-neuro-blue-600"
              disabled={!selectedReport}
            >
              <FileText className="h-4 w-4 mr-2" />
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>

        {/* Relatórios Predefinidos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-neuro-blue-700">Relatórios Rápidos</CardTitle>
            <CardDescription>
              Relatórios predefinidos prontos para download
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-neuro-green-500 hover:bg-neuro-green-600">
              <PieChart className="h-4 w-4 mr-2" />
              Resumo do Mês Atual
            </Button>
            <Button variant="outline" className="w-full">
              <LineChart className="h-4 w-4 mr-2" />
              Tendências Trimestrais
            </Button>
            <Button variant="outline" className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              Comparativo Anual
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Relatórios Gerados */}
      <Card>
        <CardHeader>
          <CardTitle className="text-neuro-blue-700">Relatórios Gerados</CardTitle>
          <CardDescription>
            Histórico de relatórios gerados anteriormente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predefinedReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:border-neuro-blue-200 transition-colors">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="p-2 bg-neuro-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-neuro-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{report.name}</h3>
                    <p className="text-sm text-gray-600">
                      {report.type} • Gerado em {new Date(report.date).toLocaleDateString('pt-BR')}
                    </p>
                    {report.size !== '-' && (
                      <p className="text-xs text-gray-500">Tamanho: {report.size}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${getStatusColor(report.status)} border`}>
                    {getStatusLabel(report.status)}
                  </Badge>
                  {report.status === 'ready' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleDownloadReport(report.name)}
                      className="bg-neuro-green-500 hover:bg-neuro-green-600"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
