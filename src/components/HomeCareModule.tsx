import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Home, 
  MapPin, 
  Calendar, 
  User, 
  Clock, 
  Activity, 
  Pill, 
  Heart,
  Plus,
  Search,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Phone
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface HomeCareVisit {
  id: string;
  patientName: string;
  patientId: string;
  address: string;
  date: string;
  time: string;
  professionalName: string;
  serviceType: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'normal' | 'high' | 'urgent';
  observations?: string;
  procedures?: string[];
  vitalSigns?: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    oxygenSaturation: string;
  };
}

interface HomeCarePatient {
  id: string;
  name: string;
  age: number;
  address: string;
  condition: string;
  careLevel: 'basic' | 'intermediate' | 'intensive';
  startDate: string;
  frequency: string;
  responsibleDoctor: string;
  careTeam: string[];
}

export function HomeCareModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isNewVisitOpen, setIsNewVisitOpen] = useState(false);

  const mockVisits: HomeCareVisit[] = [
    {
      id: 'HC001',
      patientName: 'Maria Santos',
      patientId: 'p1',
      address: 'Rua das Flores, 123 - São Paulo/SP',
      date: '2024-12-07',
      time: '09:00',
      professionalName: 'Enf. Carla Lima',
      serviceType: 'Administração de Medicação',
      status: 'scheduled',
      priority: 'normal',
      procedures: ['Administração de Insulina', 'Verificação de Sinais Vitais'],
      observations: 'Paciente diabética, necessita acompanhamento de glicemia'
    },
    {
      id: 'HC002',
      patientName: 'João Pedro Silva',
      patientId: 'p2',
      address: 'Av. Paulista, 1000 - São Paulo/SP',
      date: '2024-12-07',
      time: '14:00',
      professionalName: 'Fisio. Roberto Alves',
      serviceType: 'Fisioterapia Respiratória',
      status: 'in-progress',
      priority: 'high',
      procedures: ['Fisioterapia Respiratória', 'Exercícios de Reabilitação'],
      vitalSigns: {
        bloodPressure: '120/80',
        heartRate: '72',
        temperature: '36.5',
        oxygenSaturation: '96'
      }
    },
    {
      id: 'HC003',
      patientName: 'Ana Paula Costa',
      patientId: 'p3',
      address: 'Rua Vergueiro, 500 - São Paulo/SP',
      date: '2024-12-06',
      time: '10:00',
      professionalName: 'Enf. Paula Santos',
      serviceType: 'Curativo',
      status: 'completed',
      priority: 'normal',
      procedures: ['Troca de Curativo', 'Limpeza de Ferida'],
      vitalSigns: {
        bloodPressure: '130/85',
        heartRate: '78',
        temperature: '36.8',
        oxygenSaturation: '98'
      },
      observations: 'Ferida em processo de cicatrização. Continuar tratamento.'
    }
  ];

  const mockPatients: HomeCarePatient[] = [
    {
      id: 'p1',
      name: 'Maria Santos',
      age: 68,
      address: 'Rua das Flores, 123 - São Paulo/SP',
      condition: 'Diabetes Mellitus Tipo 2',
      careLevel: 'intermediate',
      startDate: '2024-10-15',
      frequency: '3x por semana',
      responsibleDoctor: 'Dr. Carlos Silva',
      careTeam: ['Enf. Carla Lima', 'Aux. José Alves']
    },
    {
      id: 'p2',
      name: 'João Pedro Silva',
      age: 72,
      address: 'Av. Paulista, 1000 - São Paulo/SP',
      condition: 'Recuperação Pós-Cirúrgica',
      careLevel: 'intensive',
      startDate: '2024-11-20',
      frequency: 'Diário',
      responsibleDoctor: 'Dra. Ana Costa',
      careTeam: ['Fisio. Roberto Alves', 'Enf. Paula Santos', 'Aux. Maria Silva']
    }
  ];

  const [visits, setVisits] = useState<HomeCareVisit[]>(mockVisits);
  const [patients] = useState<HomeCarePatient[]>(mockPatients);

  const filteredVisits = visits.filter(visit => {
    const matchesSearch = 
      visit.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || visit.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" />Agendada</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500 gap-1"><Activity className="h-3 w-3" />Em Andamento</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 gap-1"><CheckCircle2 className="h-3 w-3" />Concluída</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="gap-1"><AlertCircle className="h-3 w-3" />Cancelada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgente</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">Alta</Badge>;
      case 'normal':
        return <Badge variant="outline">Normal</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getCareLevelBadge = (level: string) => {
    switch (level) {
      case 'intensive':
        return <Badge variant="destructive">Intensivo</Badge>;
      case 'intermediate':
        return <Badge className="bg-orange-500">Intermediário</Badge>;
      case 'basic':
        return <Badge className="bg-blue-500">Básico</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getStatistics = () => {
    const today = new Date().toISOString().split('T')[0];
    return {
      totalPatients: patients.length,
      todayVisits: visits.filter(v => v.date === today).length,
      inProgress: visits.filter(v => v.status === 'in-progress').length,
      scheduled: visits.filter(v => v.status === 'scheduled').length,
      urgent: visits.filter(v => v.priority === 'urgent').length
    };
  };

  const stats = getStatistics();

  const handleScheduleVisit = () => {
    toast.success('Visita domiciliar agendada com sucesso!');
    setIsNewVisitOpen(false);
  };

  const handleNavigate = (address: string) => {
    toast.success('Abrindo navegação no Google Maps');
  };

  const handleStartVisit = (visit: HomeCareVisit) => {
    toast.success('Visita iniciada');
  };

  const handleCompleteVisit = (visit: HomeCareVisit) => {
    toast.success('Visita concluída com sucesso');
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1>Home Care</h1>
          <p className="text-muted-foreground">
            Gestão de atendimento domiciliar e equipes de cuidado
          </p>
        </div>
        <Dialog open={isNewVisitOpen} onOpenChange={setIsNewVisitOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Agendar Visita
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agendar Visita Domiciliar</DialogTitle>
              <DialogDescription>
                Preencha os dados para agendar uma nova visita
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Paciente *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map(p => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name} - {p.address}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Serviço *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medicacao">Administração de Medicação</SelectItem>
                      <SelectItem value="curativo">Curativo</SelectItem>
                      <SelectItem value="fisioterapia">Fisioterapia</SelectItem>
                      <SelectItem value="enfermagem">Cuidados de Enfermagem</SelectItem>
                      <SelectItem value="coleta">Coleta de Exames</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Data *</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Horário *</Label>
                  <Input type="time" />
                </div>
                <div className="space-y-2">
                  <Label>Profissional *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enf1">Enf. Carla Lima</SelectItem>
                      <SelectItem value="enf2">Enf. Paula Santos</SelectItem>
                      <SelectItem value="fisio1">Fisio. Roberto Alves</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Prioridade *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea
                  placeholder="Informações adicionais sobre o atendimento..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setIsNewVisitOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleScheduleVisit}>
                  Agendar Visita
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Pacientes</p>
                <h2>{stats.totalPatients}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Hoje</p>
                <h2>{stats.todayVisits}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Em Andamento</p>
                <h2>{stats.inProgress}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Agendadas</p>
                <h2>{stats.scheduled}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Urgentes</p>
                <h2>{stats.urgent}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visits" className="w-full">
        <TabsList>
          <TabsTrigger value="visits">Visitas</TabsTrigger>
          <TabsTrigger value="patients">Pacientes em Home Care</TabsTrigger>
        </TabsList>

        {/* Visits Tab */}
        <TabsContent value="visits" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por paciente, endereço ou ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="scheduled">Agendada</SelectItem>
                    <SelectItem value="in-progress">Em Andamento</SelectItem>
                    <SelectItem value="completed">Concluída</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredVisits.map((visit) => (
                  <Card key={visit.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3>Visita #{visit.id}</h3>
                              {getStatusBadge(visit.status)}
                              {getPriorityBadge(visit.priority)}
                            </div>
                            <div className="flex items-center gap-4 text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {visit.patientName}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(visit.date).toLocaleDateString('pt-BR')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {visit.time}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={() => handleNavigate(visit.address)}
                            >
                              <Navigation className="h-4 w-4" />
                              Navegar
                            </Button>
                            {visit.status === 'scheduled' && (
                              <Button
                                size="sm"
                                onClick={() => handleStartVisit(visit)}
                              >
                                Iniciar Visita
                              </Button>
                            )}
                            {visit.status === 'in-progress' && (
                              <Button
                                size="sm"
                                className="bg-green-500"
                                onClick={() => handleCompleteVisit(visit)}
                              >
                                Concluir Visita
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-muted-foreground mb-1">Endereço</p>
                            <p className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              {visit.address}
                            </p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-muted-foreground mb-1">Profissional</p>
                            <p>{visit.professionalName}</p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-muted-foreground mb-1">Tipo de Serviço</p>
                            <p>{visit.serviceType}</p>
                          </div>
                        </div>

                        {/* Procedures */}
                        {visit.procedures && visit.procedures.length > 0 && (
                          <div>
                            <p className="text-muted-foreground mb-2">Procedimentos</p>
                            <div className="flex flex-wrap gap-2">
                              {visit.procedures.map((proc, index) => (
                                <Badge key={index} variant="outline">
                                  {proc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Vital Signs */}
                        {visit.vitalSigns && (
                          <div className="grid grid-cols-4 gap-4">
                            <div className="p-3 border rounded-lg">
                              <p className="text-muted-foreground mb-1">PA</p>
                              <p>{visit.vitalSigns.bloodPressure} mmHg</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <p className="text-muted-foreground mb-1">FC</p>
                              <p>{visit.vitalSigns.heartRate} bpm</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <p className="text-muted-foreground mb-1">Temp.</p>
                              <p>{visit.vitalSigns.temperature}°C</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <p className="text-muted-foreground mb-1">SpO2</p>
                              <p>{visit.vitalSigns.oxygenSaturation}%</p>
                            </div>
                          </div>
                        )}

                        {/* Observations */}
                        {visit.observations && (
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-muted-foreground mb-1">Observações</p>
                            <p>{visit.observations}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredVisits.length === 0 && (
                  <div className="text-center py-12">
                    <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="mb-2">Nenhuma visita encontrada</h3>
                    <p className="text-muted-foreground">
                      Tente ajustar os filtros ou agende uma nova visita
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Patients Tab */}
        <TabsContent value="patients" className="space-y-4">
          {patients.map((patient) => (
            <Card key={patient.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle>{patient.name}</CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span>{patient.age} anos</span>
                      <span>•</span>
                      <span>{patient.condition}</span>
                    </CardDescription>
                  </div>
                  {getCareLevelBadge(patient.careLevel)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground mb-1">Endereço</p>
                      <p className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        {patient.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Médico Responsável</p>
                      <p>{patient.responsibleDoctor}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Início do Tratamento</p>
                      <p>{new Date(patient.startDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Frequência</p>
                      <p>{patient.frequency}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2">Equipe de Cuidado</p>
                    <div className="flex flex-wrap gap-2">
                      {patient.careTeam.map((member, index) => (
                        <Badge key={index} variant="outline">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Contatar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Ver Agenda
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Prontuário
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
