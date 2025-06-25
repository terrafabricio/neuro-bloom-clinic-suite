
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  FileText, 
  DollarSign, 
  GraduationCap,
  Stethoscope,
  Heart,
  Shield,
  ArrowRight,
  Code
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [developerMode, setDeveloperMode] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: "Agendamento Inteligente",
      description: "Gestão completa de consultas e horários por profissional"
    },
    {
      icon: FileText,
      title: "Prontuário Digital",
      description: "Registro detalhado da evolução de cada paciente"
    },
    {
      icon: DollarSign,
      title: "Controle Financeiro",
      description: "Fluxo de caixa, notas fiscais e relatórios automáticos"
    },
    {
      icon: Users,
      title: "Gestão de Equipe",
      description: "Controle de horas e pagamentos dos profissionais"
    },
    {
      icon: GraduationCap,
      title: "Eventos Educacionais",
      description: "Cursos, workshops e emissão de certificados"
    },
    {
      icon: Heart,
      title: "Portal dos Pais",
      description: "Acompanhamento da evolução dos filhos"
    }
  ];

  const toggleDeveloperMode = () => {
    setDeveloperMode(!developerMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Developer Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant={developerMode ? "destructive" : "outline"}
          size="sm"
          onClick={toggleDeveloperMode}
          className="gap-2"
        >
          <Code className="h-4 w-4" />
          {developerMode ? "Sair do Modo Dev" : "Modo Desenvolvedor"}
        </Button>
      </div>

      {/* Developer Mode Banner */}
      {developerMode && (
        <div className="bg-red-600 text-white py-2 px-4 text-center font-semibold">
          🔧 MODO DESENVOLVEDOR ATIVO - Acesso irrestrito ao sistema
        </div>
      )}

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Stethoscope className="h-12 w-12 text-blue-600" />
            <h1 className="text-5xl font-bold text-gray-900">NeuroClinic</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Sistema completo de gestão para clínicas multidisciplinares especializadas 
            no atendimento de crianças autistas e neurodiversas
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Shield className="h-4 w-4 mr-2" />
              100% Seguro
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Responsivo
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              Multi-usuário
            </Badge>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">Acesso ao Sistema</CardTitle>
              <CardDescription>
                Entre no sistema completo de gestão da clínica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard">
                <Button size="lg" className="w-full gap-2">
                  Entrar no Sistema
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {developerMode && (
            <Card className="border-2 border-red-200 hover:border-red-400 transition-colors bg-red-50">
              <CardHeader>
                <CardTitle className="text-2xl text-red-700">Modo Desenvolvedor</CardTitle>
                <CardDescription>
                  Acesso completo para testes e desenvolvimento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/dashboard">
                  <Button variant="destructive" size="lg" className="w-full gap-2">
                    Dashboard Completo
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/patients">
                    <Button variant="outline" size="sm" className="w-full">
                      Pacientes
                    </Button>
                  </Link>
                  <Link to="/appointments">
                    <Button variant="outline" size="sm" className="w-full">
                      Agendamentos
                    </Button>
                  </Link>
                  <Link to="/professionals">
                    <Button variant="outline" size="sm" className="w-full">
                      Profissionais
                    </Button>
                  </Link>
                  <Link to="/financial">
                    <Button variant="outline" size="sm" className="w-full">
                      Financeiro
                    </Button>
                  </Link>
                  <Link to="/events">
                    <Button variant="outline" size="sm" className="w-full">
                      Eventos
                    </Button>
                  </Link>
                  <Link to="/settings">
                    <Button variant="outline" size="sm" className="w-full">
                      Configurações
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Funcionalidades Principais
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Por que escolher o NeuroClinic?
          </h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Seguro e Confiável</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Disponibilidade</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">Multi</div>
              <div className="text-gray-600">Especialidades</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">∞</div>
              <div className="text-gray-600">Escalabilidade</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500">
          <p>© 2024 NeuroClinic - Sistema de Gestão Clínica</p>
          <p className="mt-2">Desenvolvido com ❤️ para o cuidado especializado</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
