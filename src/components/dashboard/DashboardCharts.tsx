
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dados mock para demonstração
const monthlyAppointments = [
  { month: 'Jan', agendamentos: 65, concluidos: 58 },
  { month: 'Fev', agendamentos: 78, concluidos: 72 },
  { month: 'Mar', agendamentos: 90, concluidos: 85 },
  { month: 'Abr', agendamentos: 85, concluidos: 80 },
  { month: 'Mai', agendamentos: 95, concluidos: 88 },
  { month: 'Jun', agendamentos: 102, concluidos: 96 }
];

const revenueData = [
  { month: 'Jan', receita: 15240 },
  { month: 'Fev', receita: 18350 },
  { month: 'Mar', receita: 22100 },
  { month: 'Abr', receita: 19800 },
  { month: 'Mai', receita: 24600 },
  { month: 'Jun', receita: 28750 }
];

const specialtyData = [
  { name: 'Psicologia', value: 35, color: '#3B82F6' },
  { name: 'Nutrição', value: 25, color: '#10B981' },
  { name: 'Musicoterapia', value: 20, color: '#F59E0B' },
  { name: 'Psicopedagogia', value: 15, color: '#8B5CF6' },
  { name: 'Assistência Social', value: 5, color: '#EF4444' }
];

const professionalPerformance = [
  { name: 'Dr. Ana Silva', atendimentos: 28, satisfacao: 4.8 },
  { name: 'Dr. João Santos', atendimentos: 32, satisfacao: 4.9 },
  { name: 'Dra. Maria Costa', atendimentos: 25, satisfacao: 4.7 },
  { name: 'Dr. Pedro Lima', atendimentos: 30, satisfacao: 4.6 }
];

export function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      {/* Agendamentos Mensais */}
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-neuro-blue-700">Agendamentos Mensais</CardTitle>
          <CardDescription>
            Comparação entre agendamentos realizados e concluídos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyAppointments}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="agendamentos" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Agendamentos"
              />
              <Line 
                type="monotone" 
                dataKey="concluidos" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="Concluídos"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Receita Mensal */}
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-neuro-blue-700">Receita Mensal</CardTitle>
          <CardDescription>
            Evolução da receita ao longo dos meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Receita']}
              />
              <Area 
                type="monotone" 
                dataKey="receita" 
                stroke="#10B981" 
                fill="url(#revenueGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Distribuição por Especialidade */}
      <Card>
        <CardHeader>
          <CardTitle className="text-neuro-blue-700">Distribuição por Especialidade</CardTitle>
          <CardDescription>
            Percentual de atendimentos por área
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={specialtyData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {specialtyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance dos Profissionais */}
      <Card>
        <CardHeader>
          <CardTitle className="text-neuro-blue-700">Performance dos Profissionais</CardTitle>
          <CardDescription>
            Atendimentos realizados no mês atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={professionalPerformance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" stroke="#6B7280" />
              <YAxis dataKey="name" type="category" stroke="#6B7280" width={120} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="atendimentos" 
                fill="#3B82F6"
                radius={[0, 4, 4, 0]}
                name="Atendimentos"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
