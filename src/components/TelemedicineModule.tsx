import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Alert, AlertDescription } from './ui/alert';
import { mockAppointments } from '../lib/mockData';
import { User as UserType } from '../types';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  Monitor,
  Calendar,
  Clock,
  User,
  FileText,
  CheckCircle
} from 'lucide-react';

interface TelemedicineModuleProps {
  user: UserType;
}

export function TelemedicineModule({ user }: TelemedicineModuleProps) {
  const [inCall, setInCall] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  const teleconsults = mockAppointments.filter(
    apt => apt.type === 'teleconsulta' && 
    (apt.patientId === user.id || apt.professionalId === user.id)
  );

  const upcomingTeleconsults = teleconsults.filter(
    apt => apt.status !== 'concluido' && apt.status !== 'cancelado'
  );

  const startCall = () => {
    setInCall(true);
  };

  const endCall = () => {
    setInCall(false);
    setVideoEnabled(true);
    setAudioEnabled(true);
    setScreenSharing(false);
  };

  if (inCall) {
    return (
      <div className="h-screen bg-gray-900 flex flex-col">
        <div className="flex-1 relative">
          {/* Video principal */}
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-16 h-16 text-white" />
              </div>
              <p className="text-white text-xl mb-2">
                {user.role === 'patient' ? 'Dr. Carlos Silva' : 'Maria Santos'}
              </p>
              <p className="text-gray-400">Teleconsulta em andamento</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white text-sm">15:34</span>
              </div>
            </div>
          </div>

          {/* Vídeo local (preview) */}
          <div className="absolute top-4 right-4 w-64 h-48 bg-gray-700 rounded-lg overflow-hidden border-2 border-white shadow-lg">
            <div className="w-full h-full flex items-center justify-center">
              {videoEnabled ? (
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              ) : (
                <div className="text-center">
                  <VideoOff className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Câmera desligada</p>
                </div>
              )}
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-sm truncate">{user.name}</p>
            </div>
          </div>

          {/* Chat lateral */}
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-white border-l shadow-lg hidden lg:flex flex-col">
            <div className="p-4 border-b">
              <h3 className="text-gray-900">Chat</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-900">Olá, como está se sentindo?</p>
                <p className="text-xs text-gray-500 mt-1">Dr. Carlos Silva • 10:32</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3 ml-auto max-w-[80%]">
                <p className="text-sm text-gray-900">Estou melhor, obrigada!</p>
                <p className="text-xs text-gray-500 mt-1">Você • 10:33</p>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Digite uma mensagem..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
                <Button size="sm">Enviar</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="p-6 bg-gray-900 border-t border-gray-700">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={audioEnabled ? 'secondary' : 'destructive'}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setAudioEnabled(!audioEnabled)}
            >
              {audioEnabled ? (
                <Mic className="w-6 h-6" />
              ) : (
                <MicOff className="w-6 h-6" />
              )}
            </Button>
            <Button
              variant={videoEnabled ? 'secondary' : 'destructive'}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setVideoEnabled(!videoEnabled)}
            >
              {videoEnabled ? (
                <Video className="w-6 h-6" />
              ) : (
                <VideoOff className="w-6 h-6" />
              )}
            </Button>
            <Button
              variant={screenSharing ? 'default' : 'secondary'}
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={() => setScreenSharing(!screenSharing)}
            >
              <Monitor className="w-6 h-6" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full w-14 h-14"
            >
              <MessageSquare className="w-6 h-6" />
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={endCall}
            >
              <PhoneOff className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Telemedicina</h1>
        <p className="text-gray-600">Consultas e atendimentos online</p>
      </div>

      <Alert>
        <Video className="w-4 h-4" />
        <AlertDescription>
          Todas as teleconsultas são realizadas de forma segura e em conformidade com as 
          regulamentações do CFM e LGPD.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Teleconsultas Agendadas</p>
                <p className="text-gray-900">{upcomingTeleconsults.length}</p>
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
                <p className="text-sm text-gray-600 mb-1">Hoje</p>
                <p className="text-gray-900">
                  {upcomingTeleconsults.filter(
                    apt => apt.date === new Date().toISOString().split('T')[0]
                  ).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Concluídas</p>
                <p className="text-gray-900">
                  {teleconsults.filter(apt => apt.status === 'concluido').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximas Teleconsultas</CardTitle>
          <CardDescription>Atendimentos online agendados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingTeleconsults.length > 0 ? (
              upcomingTeleconsults.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {(user.role === 'patient' 
                            ? appointment.professionalName 
                            : appointment.patientName
                          ).split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1">
                          {user.role === 'patient' 
                            ? appointment.professionalName 
                            : appointment.patientName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {user.role === 'patient' && `${appointment.specialty}`}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(appointment.date).toLocaleDateString('pt-BR')}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {appointment.time}
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-700">
                            <Video className="w-3 h-3 mr-1" />
                            Online
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {appointment.status === 'confirmado' && (
                        <Button onClick={startCall}>
                          <Video className="w-4 h-4 mr-2" />
                          Iniciar
                        </Button>
                      )}
                      {appointment.status === 'agendado' && (
                        <Button variant="outline">Confirmar</Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Nenhuma teleconsulta agendada</p>
                {user.role === 'patient' && (
                  <Button variant="outline" className="mt-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Teleconsulta
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Teleconsultas</CardTitle>
          <CardDescription>Atendimentos online anteriores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {teleconsults
              .filter(apt => apt.status === 'concluido')
              .slice(0, 5)
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gray-200">
                        {(user.role === 'patient' 
                          ? appointment.professionalName 
                          : appointment.patientName
                        ).split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-gray-900">
                        {user.role === 'patient' 
                          ? appointment.professionalName 
                          : appointment.patientName}
                      </p>
                      <p className="text-xs text-gray-600">
                        {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Prontuário
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
