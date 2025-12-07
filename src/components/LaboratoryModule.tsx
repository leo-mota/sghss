import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TestTube, 
  Search, 
  Calendar, 
  User, 
  FileText, 
  Download, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Activity,
  Beaker,
  Microscope
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LabExam {
  id: string;
  patientName: string;
  patientId: string;
  examType: string;
  category: string;
  requestDate: string;
  collectionDate?: string;
  resultDate?: string;
  status: 'pending' | 'collected' | 'processing' | 'completed' | 'urgent';
  requestedBy: string;
  results?: {
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    status: 'normal' | 'high' | 'low' | 'critical';
  }[];
  observations?: string;
}

export function LaboratoryModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isNewExamOpen, setIsNewExamOpen] = useState(false);

  const mockExams: LabExam[] = [
    {
      id: 'LAB001',
      patientName: 'Maria Santos',
      patientId: 'p1',
      examType: 'Hemograma Completo',
      category: 'Hematologia',
      requestDate: '2024-12-05',
      collectionDate: '2024-12-06',
      resultDate: '2024-12-06',
      status: 'completed',
      requestedBy: 'Dr. Carlos Silva',
      results: [
        { parameter: 'Hemácias', value: '4.8', unit: 'milhões/mm³', referenceRange: '4.5-5.9', status: 'normal' },
        { parameter: 'Hemoglobina', value: '14.2', unit: 'g/dL', referenceRange: '12.0-16.0', status: 'normal' },
        { parameter: 'Hematócrito', value: '42', unit: '%', referenceRange: '37-47', status: 'normal' },
        { parameter: 'Leucócitos', value: '7.5', unit: 'mil/mm³', referenceRange: '4.0-10.0', status: 'normal' },
        { parameter: 'Plaquetas', value: '250', unit: 'mil/mm³', referenceRange: '150-400', status: 'normal' }
      ]
    },
    {
      id: 'LAB002',
      patientName: 'João Pedro Silva',
      patientId: 'p2',
      examType: 'Glicemia em Jejum',
      category: 'Bioquímica',
      requestDate: '2024-12-06',
      collectionDate: '2024-12-07',
      status: 'processing',
      requestedBy: 'Dr. Roberto Alves'
    },
    {
      id: 'LAB003',
      patientName: 'Ana Paula Costa',
      patientId: 'p3',
      examType: 'Perfil Lipídico',
      category: 'Bioquímica',
      requestDate: '2024-12-07',
      collectionDate: '2024-12-07',
      resultDate: '2024-12-07',
      status: 'completed',
      requestedBy: 'Dr. Carlos Silva',
      results: [
        { parameter: 'Colesterol Total', value: '240', unit: 'mg/dL', referenceRange: '<200', status: 'high' },
        { parameter: 'HDL', value: '45', unit: 'mg/dL', referenceRange: '>40', status: 'normal' },
        { parameter: 'LDL', value: '160', unit: 'mg/dL', referenceRange: '<130', status: 'high' },
        { parameter: 'Triglicerídeos', value: '175', unit: 'mg/dL', referenceRange: '<150', status: 'high' }
      ],
      observations: 'Paciente deve iniciar controle dietético e atividade física. Reavaliação em 3 meses.'
    },
    {
      id: 'LAB004',
      patientName: 'Maria Santos',
      patientId: 'p1',
      examType: 'Urina Tipo I',
      category: 'Urinálise',
      requestDate: '2024-12-07',
      status: 'collected',
      requestedBy: 'Dra. Ana Costa'
    },
    {
      id: 'LAB005',
      patientName: 'João Pedro Silva',
      patientId: 'p2',
      examType: 'PCR',
      category: 'Imunologia',
      requestDate: '2024-12-07',
      status: 'urgent',
      requestedBy: 'Dr. Roberto Alves'
    }
  ];

  const [exams, setExams] = useState<LabExam[]>(mockExams);

  const filteredExams = exams.filter(exam => {
    const matchesSearch = 
      exam.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.examType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || exam.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || exam.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" />Pendente</Badge>;
      case 'collected':
        return <Badge className="bg-blue-500 gap-1"><Beaker className="h-3 w-3" />Coletado</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-500 gap-1"><Activity className="h-3 w-3" />Processando</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 gap-1"><CheckCircle2 className="h-3 w-3" />Concluído</Badge>;
      case 'urgent':
        return <Badge variant="destructive" className="gap-1"><AlertCircle className="h-3 w-3" />Urgente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getResultStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600';
      case 'high':
      case 'low':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return '';
    }
  };

  const getResultStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'high':
      case 'low':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatistics = () => {
    return {
      total: exams.length,
      pending: exams.filter(e => e.status === 'pending').length,
      processing: exams.filter(e => e.status === 'processing' || e.status === 'collected').length,
      completed: exams.filter(e => e.status === 'completed').length,
      urgent: exams.filter(e => e.status === 'urgent').length
    };
  };

  const stats = getStatistics();

  const handleRequestExam = () => {
    toast.success('Solicitação de exame enviada ao laboratório');
    setIsNewExamOpen(false);
  };

  const handleDownloadResult = (exam: LabExam) => {
    toast.success(`Resultado do exame ${exam.id} baixado em PDF`);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1>Laboratório Clínico</h1>
          <p className="text-muted-foreground">
            Gestão de exames laboratoriais e resultados
          </p>
        </div>
        <Dialog open={isNewExamOpen} onOpenChange={setIsNewExamOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Solicitar Exame
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nova Solicitação de Exame</DialogTitle>
              <DialogDescription>
                Preencha os dados para solicitar um novo exame laboratorial
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
                      <SelectItem value="p1">Maria Santos</SelectItem>
                      <SelectItem value="p2">João Pedro Silva</SelectItem>
                      <SelectItem value="p3">Ana Paula Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Categoria *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hematologia">Hematologia</SelectItem>
                      <SelectItem value="bioquimica">Bioquímica</SelectItem>
                      <SelectItem value="urinálise">Urinálise</SelectItem>
                      <SelectItem value="imunologia">Imunologia</SelectItem>
                      <SelectItem value="microbiologia">Microbiologia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tipo de Exame *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o exame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hemograma">Hemograma Completo</SelectItem>
                    <SelectItem value="glicemia">Glicemia em Jejum</SelectItem>
                    <SelectItem value="lipidico">Perfil Lipídico</SelectItem>
                    <SelectItem value="hepatico">Função Hepática</SelectItem>
                    <SelectItem value="renal">Função Renal</SelectItem>
                    <SelectItem value="tireoide">Função Tireoidiana</SelectItem>
                    <SelectItem value="urina">Urina Tipo I</SelectItem>
                    <SelectItem value="pcr">PCR - Proteína C Reativa</SelectItem>
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
                    <SelectItem value="routine">Rotina</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                    <SelectItem value="emergency">Emergência</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Observações Clínicas</Label>
                <Input placeholder="Informações adicionais para o laboratório" />
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setIsNewExamOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleRequestExam}>
                  Enviar Solicitação
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
                <TestTube className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Total</p>
                <h2>{stats.total}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Clock className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Pendentes</p>
                <h2>{stats.pending}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Activity className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Em Processo</p>
                <h2>{stats.processing}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Concluídos</p>
                <h2>{stats.completed}</h2>
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

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por paciente, tipo de exame ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Categorias</SelectItem>
                <SelectItem value="Hematologia">Hematologia</SelectItem>
                <SelectItem value="Bioquímica">Bioquímica</SelectItem>
                <SelectItem value="Urinálise">Urinálise</SelectItem>
                <SelectItem value="Imunologia">Imunologia</SelectItem>
                <SelectItem value="Microbiologia">Microbiologia</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="collected">Coletado</SelectItem>
                <SelectItem value="processing">Processando</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Exams List */}
      <div className="space-y-4">
        {filteredExams.map((exam) => (
          <Card key={exam.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle>Exame #{exam.id}</CardTitle>
                    {getStatusBadge(exam.status)}
                  </div>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {exam.patientName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Microscope className="h-4 w-4" />
                      {exam.examType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(exam.requestDate).toLocaleDateString('pt-BR')}
                    </span>
                  </CardDescription>
                </div>
                {exam.status === 'completed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleDownloadResult(exam)}
                  >
                    <Download className="h-4 w-4" />
                    Baixar Resultado
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info" className="w-full">
                <TabsList>
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  {exam.results && <TabsTrigger value="results">Resultados</TabsTrigger>}
                </TabsList>
                
                <TabsContent value="info" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground mb-1">Categoria</p>
                      <p>{exam.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Solicitado por</p>
                      <p>{exam.requestedBy}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Data da Solicitação</p>
                      <p>{new Date(exam.requestDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    {exam.collectionDate && (
                      <div>
                        <p className="text-muted-foreground mb-1">Data da Coleta</p>
                        <p>{new Date(exam.collectionDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                    )}
                    {exam.resultDate && (
                      <div>
                        <p className="text-muted-foreground mb-1">Data do Resultado</p>
                        <p>{new Date(exam.resultDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                    )}
                  </div>
                  {exam.observations && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-muted-foreground mb-1">Observações</p>
                      <p>{exam.observations}</p>
                    </div>
                  )}
                </TabsContent>

                {exam.results && (
                  <TabsContent value="results">
                    <div className="space-y-3">
                      {exam.results.map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getResultStatusIcon(result.status)}
                              <p>{result.parameter}</p>
                            </div>
                            <p className="text-muted-foreground">
                              Referência: {result.referenceRange}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-xl ${getResultStatusColor(result.status)}`}>
                              {result.value} {result.unit}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>
        ))}

        {filteredExams.length === 0 && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <TestTube className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="mb-2">Nenhum exame encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros ou solicite um novo exame
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
