import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockHospitalBeds } from '../lib/mockData';
import { BedDouble, Filter, AlertCircle, CheckCircle, Clock, Wrench } from 'lucide-react';

export function BedsModule() {
  const [beds] = useState(mockHospitalBeds);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredBeds = beds.filter(bed => {
    const matchesType = filterType === 'all' || bed.type === filterType;
    const matchesStatus = filterStatus === 'all' || bed.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'disponivel': 'bg-green-100 text-green-700',
      'ocupado': 'bg-red-100 text-red-700',
      'manutencao': 'bg-orange-100 text-orange-700',
      'higienizacao': 'bg-blue-100 text-blue-700',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'disponivel': CheckCircle,
      'ocupado': AlertCircle,
      'manutencao': Wrench,
      'higienizacao': Clock,
    };
    return icons[status as keyof typeof icons] || AlertCircle;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'disponivel': 'Disponível',
      'ocupado': 'Ocupado',
      'manutencao': 'Manutenção',
      'higienizacao': 'Higienização',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      'uti': 'UTI',
      'enfermaria': 'Enfermaria',
      'apartamento': 'Apartamento',
      'observacao': 'Observação',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const stats = {
    total: beds.length,
    disponivel: beds.filter(b => b.status === 'disponivel').length,
    ocupado: beds.filter(b => b.status === 'ocupado').length,
    taxaOcupacao: Math.round((beds.filter(b => b.status === 'ocupado').length / beds.length) * 100),
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Gestão de Leitos</h1>
        <p className="text-gray-600">Controle de ocupação e disponibilidade</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Leitos</p>
                <p className="text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <BedDouble className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Disponíveis</p>
                <p className="text-gray-900">{stats.disponivel}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ocupados</p>
                <p className="text-gray-900">{stats.ocupado}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
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
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <BedDouble className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Mapa de Leitos</CardTitle>
              <CardDescription>Visualização por ala e status</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="uti">UTI</SelectItem>
                  <SelectItem value="enfermaria">Enfermaria</SelectItem>
                  <SelectItem value="apartamento">Apartamento</SelectItem>
                  <SelectItem value="observacao">Observação</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="disponivel">Disponível</SelectItem>
                  <SelectItem value="ocupado">Ocupado</SelectItem>
                  <SelectItem value="manutencao">Manutenção</SelectItem>
                  <SelectItem value="higienizacao">Higienização</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBeds.map((bed) => {
              const StatusIcon = getStatusIcon(bed.status);
              return (
                <div
                  key={bed.id}
                  className="p-4 border-2 rounded-lg transition-colors"
                  style={{
                    borderColor: bed.status === 'disponivel' ? '#10b981' : 
                                bed.status === 'ocupado' ? '#ef4444' : 
                                bed.status === 'manutencao' ? '#f97316' : '#3b82f6'
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900">Leito {bed.number}</h3>
                        <Badge variant="outline">{getTypeLabel(bed.type)}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{bed.wing} - {bed.floor}º Andar</p>
                    </div>
                    <StatusIcon 
                      className="w-5 h-5"
                      style={{
                        color: bed.status === 'disponivel' ? '#10b981' : 
                              bed.status === 'ocupado' ? '#ef4444' : 
                              bed.status === 'manutencao' ? '#f97316' : '#3b82f6'
                      }}
                    />
                  </div>

                  <Badge className={getStatusColor(bed.status)}>
                    {getStatusLabel(bed.status)}
                  </Badge>

                  {bed.status === 'ocupado' && bed.patientName && (
                    <div className="mt-3 pt-3 border-t space-y-1">
                      <p className="text-sm text-gray-900">Paciente:</p>
                      <p className="text-sm text-gray-600">{bed.patientName}</p>
                      {bed.admissionDate && (
                        <p className="text-xs text-gray-500">
                          Internado em {new Date(bed.admissionDate).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-3 flex gap-2">
                    {bed.status === 'disponivel' && (
                      <Button variant="outline" size="sm" className="flex-1">
                        Internar Paciente
                      </Button>
                    )}
                    {bed.status === 'ocupado' && (
                      <>
                        <Button variant="outline" size="sm" className="flex-1">
                          Ver Detalhes
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Alta
                        </Button>
                      </>
                    )}
                    {(bed.status === 'manutencao' || bed.status === 'higienizacao') && (
                      <Button variant="outline" size="sm" className="flex-1">
                        Liberar
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ocupação por Tipo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {['uti', 'enfermaria', 'apartamento', 'observacao'].map(type => {
              const total = beds.filter(b => b.type === type).length;
              const ocupados = beds.filter(b => b.type === type && b.status === 'ocupado').length;
              const taxa = total > 0 ? Math.round((ocupados / total) * 100) : 0;
              
              return (
                <div key={type} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{getTypeLabel(type)}</span>
                    <span className="text-gray-600">{ocupados}/{total} ({taxa}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${taxa}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ocupação por Ala</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {['Ala A', 'Ala B', 'Ala C'].map(wing => {
              const total = beds.filter(b => b.wing === wing).length;
              const ocupados = beds.filter(b => b.wing === wing && b.status === 'ocupado').length;
              const taxa = total > 0 ? Math.round((ocupados / total) * 100) : 0;
              
              return (
                <div key={wing} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{wing}</span>
                    <span className="text-gray-600">{ocupados}/{total} ({taxa}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${taxa}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
