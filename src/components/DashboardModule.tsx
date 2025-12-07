import { User } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Calendar, Users, FileText, Video, BedDouble, TrendingUp, Activity, Clock } from 'lucide-react';

interface DashboardModuleProps {
  user: User;
}

export function DashboardModule({ user }: DashboardModuleProps) {
  const getPatientStats = () => [
    { title: 'Próximas Consultas', value: '3', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Exames Pendentes', value: '2', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Prescrições Ativas', value: '4', icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Teleconsultas', value: '1', icon: Video, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const getProfessionalStats = () => [
    { title: 'Consultas Hoje', value: '12', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Pacientes Ativos', value: '89', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Prontuários Pendentes', value: '3', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Teleconsultas', value: '5', icon: Video, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const getAdminStats = () => [
    { title: 'Total de Pacientes', value: '1,234', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Profissionais Ativos', value: '156', icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Taxa de Ocupação', value: '87%', icon: BedDouble, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Consultas do Mês', value: '3,456', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const getStats = () => {
    if (user.role === 'patient') return getPatientStats();
    if (user.role === 'professional') return getProfessionalStats();
    return getAdminStats();
  };

  const getUpcomingItems = () => {
    if (user.role === 'patient') {
      return [
        { title: 'Consulta - Cardiologia', time: 'Hoje, 14:00', doctor: 'Dr. Carlos Silva' },
        { title: 'Exame de Sangue', time: 'Amanhã, 08:00', doctor: 'Laboratório Central' },
        { title: 'Teleconsulta - Dermatologia', time: '03/12, 10:00', doctor: 'Dra. Ana Costa' },
      ];
    }
    if (user.role === 'professional') {
      return [
        { title: 'João Pedro Silva', time: '10:00 - 10:30', type: 'Consulta' },
        { title: 'Maria Santos', time: '10:30 - 11:00', type: 'Retorno' },
        { title: 'Carlos Alberto', time: '11:00 - 11:30', type: 'Teleconsulta' },
        { title: 'Ana Paula', time: '14:00 - 14:30', type: 'Consulta' },
      ];
    }
    return [
      { title: 'Reunião Administrativa', time: '10:00', type: 'Gestão' },
      { title: 'Análise de Indicadores', time: '14:00', type: 'Relatórios' },
      { title: 'Auditoria LGPD', time: '16:00', type: 'Compliance' },
    ];
  };

  const stats = getStats();
  const upcomingItems = getUpcomingItems();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Bem-vindo, {user.name.split(' ')[0]}!</h1>
        <p className="text-gray-600">
          {user.role === 'patient' && 'Gerencie suas consultas, exames e acompanhe seu histórico médico.'}
          {user.role === 'professional' && 'Visualize sua agenda e gerencie seus pacientes.'}
          {user.role === 'admin' && 'Acompanhe os indicadores e gerencie o sistema hospitalar.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {user.role === 'patient' && 'Próximos Compromissos'}
              {user.role === 'professional' && 'Agenda de Hoje'}
              {user.role === 'admin' && 'Atividades Programadas'}
            </CardTitle>
            <CardDescription>
              {user.role === 'patient' && 'Suas próximas consultas e exames'}
              {user.role === 'professional' && 'Atendimentos agendados para hoje'}
              {user.role === 'admin' && 'Reuniões e tarefas do dia'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-600">
                      {item.time} • {user.role === 'patient' ? item.doctor : item.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas atualizações do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.role === 'patient' && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-900">Consulta confirmada</p>
                      <p className="text-xs text-gray-600">Cardiologia - Hoje às 14:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-900">Prescrição disponível</p>
                      <p className="text-xs text-gray-600">Receita médica emitida</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-900">Exame agendado</p>
                      <p className="text-xs text-gray-600">Hemograma completo - Amanhã</p>
                    </div>
                  </div>
                </>
              )}
              {user.role === 'professional' && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-900">Prontuário atualizado</p>
                      <p className="text-xs text-gray-600">Paciente: João Pedro Silva</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-900">Prescrição emitida</p>
                      <p className="text-xs text-gray-600">Paciente: Maria Santos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-900">Nova teleconsulta</p>
                      <p className="text-xs text-gray-600">Agendada para hoje às 11:00</p>
                    </div>
                  </div>
                </>
              )}
              {user.role === 'admin' && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-900">Novo profissional cadastrado</p>
                      <p className="text-xs text-gray-600">Dra. Mariana Costa - Pediatria</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-900">Leito liberado</p>
                      <p className="text-xs text-gray-600">Ala B - Leito 204</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-900">Relatório gerado</p>
                      <p className="text-xs text-gray-600">Indicadores mensais disponíveis</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
