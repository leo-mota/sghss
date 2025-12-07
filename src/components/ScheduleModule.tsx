import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockAppointments } from '../lib/mockData';
import { User as UserType } from '../types';
import { Calendar, Clock, Video, User, FileText, CheckCircle } from 'lucide-react';

interface ScheduleModuleProps {
  user: UserType;
}

export function ScheduleModule({ user }: ScheduleModuleProps) {
  const professionalAppointments = mockAppointments.filter(
    apt => apt.professionalId === user.id
  );

  const todayAppointments = professionalAppointments.filter(
    apt => apt.date === new Date().toISOString().split('T')[0]
  );

  const getStatusColor = (status: string) => {
    const colors = {
      'agendado': 'bg-blue-100 text-blue-700',
      'confirmado': 'bg-green-100 text-green-700',
      'em-andamento': 'bg-purple-100 text-purple-700',
      'concluido': 'bg-gray-100 text-gray-700',
      'cancelado': 'bg-red-100 text-red-700',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'agendado': 'Agendado',
      'confirmado': 'Confirmado',
      'em-andamento': 'Em Andamento',
      'concluido': 'Concluído',
      'cancelado': 'Cancelado',
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Minha Agenda</h1>
        <p className="text-gray-600">Atendimentos de {new Date().toLocaleDateString('pt-BR')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Hoje</p>
                <p className="text-gray-900">{todayAppointments.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Confirmados</p>
                <p className="text-gray-900">
                  {todayAppointments.filter(a => a.status === 'confirmado').length}
                </p>
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
                <p className="text-sm text-gray-600 mb-1">Concluídos</p>
                <p className="text-gray-900">
                  {todayAppointments.filter(a => a.status === 'concluido').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Teleconsultas</p>
                <p className="text-gray-900">
                  {todayAppointments.filter(a => a.type === 'teleconsulta').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Atendimentos de Hoje</CardTitle>
          <CardDescription>
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayAppointments.length > 0 ? (
              todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 mb-1">{appointment.patientName}</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusLabel(appointment.status)}
                          </Badge>
                          {appointment.type === 'teleconsulta' && (
                            <Badge variant="outline">
                              <Video className="w-3 h-3 mr-1" />
                              Teleconsulta
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {appointment.status === 'confirmado' && (
                        <Button size="sm">Iniciar Atendimento</Button>
                      )}
                      {appointment.status === 'em-andamento' && (
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          Prontuário
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                    {appointment.location && (
                      <div className="flex items-center gap-1">
                        <span>{appointment.location}</span>
                      </div>
                    )}
                  </div>

                  {appointment.notes && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Observações:</span> {appointment.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Nenhum atendimento agendado para hoje</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Próximas Semanas</CardTitle>
          <CardDescription>Agendamentos futuros</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {professionalAppointments
              .filter(apt => new Date(apt.date) > new Date())
              .slice(0, 5)
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{appointment.patientName}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{getStatusLabel(appointment.status)}</Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
