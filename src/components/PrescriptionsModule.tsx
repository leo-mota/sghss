import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, Search, FileText, Clock, Check, X, Pill, Calendar, User, Download, Printer } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  date: string;
  status: 'active' | 'completed' | 'cancelled';
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  diagnosis: string;
  notes?: string;
}

export function PrescriptionsModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isNewPrescriptionOpen, setIsNewPrescriptionOpen] = useState(false);

  const mockPrescriptions: Prescription[] = [
    {
      id: 'rx001',
      patientName: 'Maria Santos',
      patientId: 'p1',
      doctorName: 'Dr. Carlos Silva',
      date: '2024-12-05',
      status: 'active',
      diagnosis: 'Hipertensão Arterial',
      medications: [
        {
          name: 'Losartana',
          dosage: '50mg',
          frequency: '1x ao dia',
          duration: '30 dias',
          instructions: 'Tomar pela manhã, em jejum'
        },
        {
          name: 'Hidroclorotiazida',
          dosage: '25mg',
          frequency: '1x ao dia',
          duration: '30 dias',
          instructions: 'Tomar junto com a Losartana'
        }
      ],
      notes: 'Retornar em 30 dias para reavaliação. Manter dieta com restrição de sal.'
    },
    {
      id: 'rx002',
      patientName: 'João Pedro Silva',
      patientId: 'p2',
      doctorName: 'Dra. Ana Costa',
      date: '2024-12-03',
      status: 'active',
      diagnosis: 'Dermatite Atópica',
      medications: [
        {
          name: 'Betametasona Creme',
          dosage: '0,1%',
          frequency: '2x ao dia',
          duration: '14 dias',
          instructions: 'Aplicar fina camada nas áreas afetadas'
        },
        {
          name: 'Hidroxizina',
          dosage: '25mg',
          frequency: '1x ao dia',
          duration: '14 dias',
          instructions: 'Tomar à noite para alívio do prurido'
        }
      ]
    },
    {
      id: 'rx003',
      patientName: 'Ana Paula Costa',
      patientId: 'p3',
      doctorName: 'Dr. Roberto Alves',
      date: '2024-11-28',
      status: 'completed',
      diagnosis: 'Infecção Respiratória',
      medications: [
        {
          name: 'Amoxicilina',
          dosage: '500mg',
          frequency: '3x ao dia',
          duration: '7 dias',
          instructions: 'Tomar de 8 em 8 horas com alimento'
        }
      ],
      notes: 'Tratamento completo. Paciente apresentou melhora.'
    }
  ];

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    diagnosis: '',
    medications: [{
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    }],
    notes: ''
  });

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = 
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || prescription.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Ativa</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Concluída</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAddMedication = () => {
    setNewPrescription({
      ...newPrescription,
      medications: [
        ...newPrescription.medications,
        { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
      ]
    });
  };

  const handleRemoveMedication = (index: number) => {
    const updatedMedications = newPrescription.medications.filter((_, i) => i !== index);
    setNewPrescription({ ...newPrescription, medications: updatedMedications });
  };

  const handleSavePrescription = () => {
    const prescription: Prescription = {
      id: `rx${String(prescriptions.length + 1).padStart(3, '0')}`,
      patientName: newPrescription.patientName,
      patientId: 'p' + (prescriptions.length + 1),
      doctorName: 'Dr. Carlos Silva',
      date: new Date().toISOString().split('T')[0],
      status: 'active',
      diagnosis: newPrescription.diagnosis,
      medications: newPrescription.medications,
      notes: newPrescription.notes
    };

    setPrescriptions([prescription, ...prescriptions]);
    toast.success('Prescrição criada com sucesso!');
    setIsNewPrescriptionOpen(false);
    setNewPrescription({
      patientName: '',
      diagnosis: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
      notes: ''
    });
  };

  const handlePrintPrescription = (prescription: Prescription) => {
    toast.success('Prescrição enviada para impressão');
  };

  const handleDownloadPrescription = (prescription: Prescription) => {
    toast.success('Prescrição baixada em PDF');
  };

  const getStatistics = () => {
    return {
      total: prescriptions.length,
      active: prescriptions.filter(p => p.status === 'active').length,
      completed: prescriptions.filter(p => p.status === 'completed').length,
      thisMonth: prescriptions.filter(p => {
        const prescDate = new Date(p.date);
        const now = new Date();
        return prescDate.getMonth() === now.getMonth() && prescDate.getFullYear() === now.getFullYear();
      }).length
    };
  };

  const stats = getStatistics();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1>Prescrições Médicas</h1>
          <p className="text-muted-foreground">
            Gerencie prescrições e receitas médicas digitais
          </p>
        </div>
        <Dialog open={isNewPrescriptionOpen} onOpenChange={setIsNewPrescriptionOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Prescrição
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nova Prescrição Médica</DialogTitle>
              <DialogDescription>
                Preencha os dados da prescrição. Todos os campos são obrigatórios.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Paciente *</Label>
                  <Select
                    value={newPrescription.patientName}
                    onValueChange={(value) => setNewPrescription({ ...newPrescription, patientName: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                      <SelectItem value="João Pedro Silva">João Pedro Silva</SelectItem>
                      <SelectItem value="Ana Paula Costa">Ana Paula Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnóstico *</Label>
                  <Input
                    id="diagnosis"
                    placeholder="Ex: Hipertensão Arterial"
                    value={newPrescription.diagnosis}
                    onChange={(e) => setNewPrescription({ ...newPrescription, diagnosis: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Medicamentos *</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddMedication}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Medicamento
                  </Button>
                </div>

                {newPrescription.medications.map((med, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3>Medicamento {index + 1}</h3>
                          {newPrescription.medications.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveMedication(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Nome do Medicamento</Label>
                            <Input
                              placeholder="Ex: Losartana"
                              value={med.name}
                              onChange={(e) => {
                                const updated = [...newPrescription.medications];
                                updated[index].name = e.target.value;
                                setNewPrescription({ ...newPrescription, medications: updated });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Dosagem</Label>
                            <Input
                              placeholder="Ex: 50mg"
                              value={med.dosage}
                              onChange={(e) => {
                                const updated = [...newPrescription.medications];
                                updated[index].dosage = e.target.value;
                                setNewPrescription({ ...newPrescription, medications: updated });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Frequência</Label>
                            <Input
                              placeholder="Ex: 1x ao dia"
                              value={med.frequency}
                              onChange={(e) => {
                                const updated = [...newPrescription.medications];
                                updated[index].frequency = e.target.value;
                                setNewPrescription({ ...newPrescription, medications: updated });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Duração</Label>
                            <Input
                              placeholder="Ex: 30 dias"
                              value={med.duration}
                              onChange={(e) => {
                                const updated = [...newPrescription.medications];
                                updated[index].duration = e.target.value;
                                setNewPrescription({ ...newPrescription, medications: updated });
                              }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Instruções de Uso</Label>
                          <Textarea
                            placeholder="Ex: Tomar pela manhã, em jejum"
                            value={med.instructions}
                            onChange={(e) => {
                              const updated = [...newPrescription.medications];
                              updated[index].instructions = e.target.value;
                              setNewPrescription({ ...newPrescription, medications: updated });
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações Adicionais</Label>
                <Textarea
                  id="notes"
                  placeholder="Instruções gerais, orientações para retorno, etc."
                  rows={4}
                  value={newPrescription.notes}
                  onChange={(e) => setNewPrescription({ ...newPrescription, notes: e.target.value })}
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setIsNewPrescriptionOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSavePrescription}>
                  Salvar Prescrição
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
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
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Ativas</p>
                <h2>{stats.active}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Check className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Concluídas</p>
                <h2>{stats.completed}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Este Mês</p>
                <h2>{stats.thisMonth}</h2>
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
                placeholder="Buscar por paciente, médico ou ID da prescrição..."
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
                <SelectItem value="active">Ativas</SelectItem>
                <SelectItem value="completed">Concluídas</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions List */}
      <Card>
        <CardHeader>
          <CardTitle>Prescrições Recentes</CardTitle>
          <CardDescription>
            {filteredPrescriptions.length} prescrição(ões) encontrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <Card key={prescription.id} className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3>Prescrição #{prescription.id}</h3>
                          {getStatusBadge(prescription.status)}
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {prescription.patientName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(prescription.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePrintPrescription(prescription)}
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadPrescription(prescription)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Diagnosis */}
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-muted-foreground mb-1">Diagnóstico</p>
                      <p>{prescription.diagnosis}</p>
                    </div>

                    {/* Medications */}
                    <div>
                      <p className="text-muted-foreground mb-3">Medicamentos Prescritos</p>
                      <div className="space-y-3">
                        {prescription.medications.map((med, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                            <Pill className="h-5 w-5 text-blue-500 mt-1" />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p>{med.name}</p>
                                  <p className="text-muted-foreground">
                                    {med.dosage} • {med.frequency} • {med.duration}
                                  </p>
                                </div>
                              </div>
                              <p className="text-muted-foreground">
                                {med.instructions}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {prescription.notes && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-muted-foreground mb-1">Observações</p>
                        <p>{prescription.notes}</p>
                      </div>
                    )}

                    {/* Doctor Info */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-muted-foreground">
                        Prescrito por: {prescription.doctorName}
                      </div>
                      {prescription.status === 'active' && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Renovar
                          </Button>
                          <Button variant="destructive" size="sm">
                            Cancelar
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredPrescriptions.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="mb-2">Nenhuma prescrição encontrada</h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros ou crie uma nova prescrição
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
