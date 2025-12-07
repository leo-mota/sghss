import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { mockMedicalRecords, mockPatients } from '../lib/mockData';
import { Search, Plus, FileText, Calendar, User, Pill } from 'lucide-react';

export function MedicalRecordsModule() {
  const [records] = useState(mockMedicalRecords);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = records.filter(record => {
    const patient = mockPatients.find(p => p.id === record.patientId);
    return (
      patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.professionalName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Prontuários Médicos</h1>
          <p className="text-gray-600">Histórico e registros clínicos</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Prontuário
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Registro Médico</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Paciente</Label>
                <Input id="patient" placeholder="Selecione ou busque o paciente" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complaints">Queixa Principal</Label>
                <Textarea id="complaints" placeholder="Descreva a queixa do paciente" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnóstico</Label>
                <Textarea id="diagnosis" placeholder="Diagnóstico clínico" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="treatment">Tratamento Proposto</Label>
                <Textarea id="treatment" placeholder="Descreva o tratamento" rows={3} />
              </div>

              <div className="space-y-2">
                <Label>Prescrição</Label>
                <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Medicamento" />
                    <Input placeholder="Dosagem" />
                    <Input placeholder="Frequência" />
                    <Input placeholder="Duração" />
                  </div>
                  <Button type="button" variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Medicamento
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea id="notes" placeholder="Observações adicionais" rows={2} />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">Cancelar</Button>
                <Button type="submit">Salvar Prontuário</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por paciente, diagnóstico ou médico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => {
              const patient = mockPatients.find(p => p.id === record.patientId);
              
              return (
                <Card key={record.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-5 h-5" />
                          {patient?.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(record.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span>•</span>
                          <span>{record.professionalName}</span>
                        </CardDescription>
                      </div>
                      <Badge>Prontuário</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Queixa</p>
                      <p className="text-gray-900">{record.complaints}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Diagnóstico</p>
                      <p className="text-gray-900">{record.diagnosis}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Tratamento</p>
                      <p className="text-gray-900">{record.treatment}</p>
                    </div>

                    {record.prescriptions.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                          <Pill className="w-4 h-4" />
                          Prescrições
                        </p>
                        <div className="space-y-2">
                          {record.prescriptions.map((presc) => (
                            <div key={presc.id} className="p-3 bg-blue-50 rounded-lg">
                              <p className="text-gray-900">{presc.medication}</p>
                              <p className="text-sm text-gray-600">
                                {presc.dosage} - {presc.frequency} - {presc.duration}
                              </p>
                              {presc.instructions && (
                                <p className="text-xs text-gray-500 mt-1">{presc.instructions}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {record.exams && record.exams.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          Exames Solicitados
                        </p>
                        <div className="space-y-2">
                          {record.exams.map((exam) => (
                            <div key={exam.id} className="p-3 bg-green-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <p className="text-gray-900">{exam.examType}</p>
                                <Badge variant="outline">{exam.status}</Badge>
                              </div>
                              {exam.result && (
                                <p className="text-sm text-gray-600 mt-1">{exam.result}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {record.notes && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Observações</p>
                        <p className="text-gray-900">{record.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Imprimir
                      </Button>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {filteredRecords.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Nenhum prontuário encontrado</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
