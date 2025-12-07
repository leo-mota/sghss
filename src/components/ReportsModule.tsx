import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockAppointments, mockPatients, mockProfessionals, mockHospitalBeds } from '../lib/mockData';
import { BarChart3, TrendingUp, Users, Calendar, Download, FileText } from 'lucide-react';

export function ReportsModule() {
  const stats = {
    totalPacientes: mockPatients.length,
    totalProfissionais: mockProfessionals.length,
    totalConsultas: mockAppointments.length,
    taxaOcupacao: Math.round((mockHospitalBeds.filter(b => b.status === 'ocupado').length / mockHospitalBeds.length) * 100),
  };

  const appointmentsByMonth = [
    { month: 'Jul', count: 245 },
    { month: 'Ago', count: 312 },
    { month: 'Set', count: 289 },
    { month: 'Out', count: 356 },
    { month: 'Nov', count: 398 },
    { month: 'Dez', count: 287 },
  ];

  const appointmentsBySpecialty = [
    { specialty: 'Cardiologia', count: 156 },
    { specialty: 'Dermatologia', count: 98 },
    { specialty: 'Clínica Geral', count: 234 },
    { specialty: 'Pediatria', count: 123 },
    { specialty: 'Ortopedia', count: 87 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Relatórios e Indicadores</h1>
          <p className="text-gray-600">Análise de desempenho e estatísticas</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="current-month">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Mês Atual</SelectItem>
              <SelectItem value="last-month">Mês Anterior</SelectItem>
              <SelectItem value="quarter">Último Trimestre</SelectItem>
              <SelectItem value="year">Ano Atual</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Pacientes</p>
                <p className="text-gray-900">{stats.totalPacientes}</p>
                <p className="text-xs text-green-600 mt-1">+12% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Profissionais</p>
                <p className="text-gray-900">{stats.totalProfissionais}</p>
                <p className="text-xs text-green-600 mt-1">+5% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Consultas Realizadas</p>
                <p className="text-gray-900">{stats.totalConsultas}</p>
                <p className="text-xs text-green-600 mt-1">+18% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Taxa de Ocupação</p>
                <p className="text-gray-900">{stats.taxaOcupacao}%</p>
                <p className="text-xs text-orange-600 mt-1">-3% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Consultas por Mês</CardTitle>
            <CardDescription>Evolução dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointmentsByMonth.map((item, index) => {
                const maxCount = Math.max(...appointmentsByMonth.map(i => i.count));
                const percentage = (item.count / maxCount) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{item.month}</span>
                      <span className="text-gray-900">{item.count} consultas</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consultas por Especialidade</CardTitle>
            <CardDescription>Distribuição no mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointmentsBySpecialty.map((item, index) => {
                const total = appointmentsBySpecialty.reduce((sum, i) => sum + i.count, 0);
                const percentage = (item.count / total) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{item.specialty}</span>
                      <span className="text-gray-900">{item.count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Relatórios Disponíveis</CardTitle>
            <CardDescription>Documentos para download</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Relatório Financeiro - Novembro
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Indicadores de Qualidade - Novembro
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Produtividade por Profissional
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Análise de Satisfação
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Indicadores de Qualidade</CardTitle>
            <CardDescription>Métricas de desempenho</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm">Satisfação dos Pacientes</span>
              <span className="text-green-700">94%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm">Taxa de Adesão ao Tratamento</span>
              <span className="text-blue-700">87%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm">Tempo Médio de Espera</span>
              <span className="text-purple-700">18 min</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-sm">Taxa de Retorno</span>
              <span className="text-orange-700">76%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financeiro</CardTitle>
            <CardDescription>Resumo do mês</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">Receita Total</p>
              <p className="text-gray-900">R$ 287.450,00</p>
              <p className="text-xs text-green-600 mt-1">+15% vs mês anterior</p>
            </div>
            <div className="pt-3 border-t">
              <p className="text-sm text-gray-600 mb-1">Despesas Operacionais</p>
              <p className="text-gray-900">R$ 156.230,00</p>
              <p className="text-xs text-red-600 mt-1">+8% vs mês anterior</p>
            </div>
            <div className="pt-3 border-t">
              <p className="text-sm text-gray-600 mb-1">Lucro Líquido</p>
              <p className="text-gray-900">R$ 131.220,00</p>
              <p className="text-xs text-green-600 mt-1">+23% vs mês anterior</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
