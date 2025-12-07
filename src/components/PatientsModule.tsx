import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { mockPatients, mockMedicalRecords } from '../lib/mockData';
import { Patient } from '../types';
import { Search, Plus, User, Phone, Mail, MapPin, Heart, AlertCircle, Calendar, FileText } from 'lucide-react';

export function PatientsModule() {
  const [patients] = useState(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const patientRecords = selectedPatient
    ? mockMedicalRecords.filter(r => r.patientId === selectedPatient.id)
    : [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Gestão de Pacientes</h1>
          <p className="text-gray-600">Cadastro e acompanhamento de pacientes</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Nome do paciente" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input id="birthDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gênero</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Feminino</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" placeholder="Rua, número - Bairro, Cidade/UF" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Tipo Sanguíneo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Contato de Emergência - Nome</Label>
                  <Input id="emergencyName" placeholder="Nome do contato" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Contato de Emergência - Telefone</Label>
                  <Input id="emergencyPhone" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelation">Parentesco</Label>
                  <Input id="emergencyRelation" placeholder="Ex: Mãe, Pai, Cônjuge" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">Cancelar</Button>
                <Button type="submit">Cadastrar Paciente</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, CPF ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900">{patient.name}</h3>
                        <Badge variant="outline">{patient.bloodType}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {patient.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {patient.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(patient.birthDate).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {patient.address.split('-')[1]?.trim() || 'São Paulo/SP'}
                        </div>
                      </div>
                      {(patient.allergies && patient.allergies.length > 0) && (
                        <div className="flex items-center gap-1 mt-2">
                          <AlertCircle className="w-3 h-3 text-orange-600" />
                          <span className="text-xs text-orange-600">
                            Alergias: {patient.allergies.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ver Detalhes</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedPatient} onOpenChange={(open) => !open && setSelectedPatient(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPatient && (
            <>
              <DialogHeader>
                <DialogTitle>Prontuário do Paciente</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="records">Histórico Clínico</TabsTrigger>
                  <TabsTrigger value="documents">Documentos</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Dados Pessoais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Nome Completo</p>
                          <p className="text-gray-900">{selectedPatient.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">CPF</p>
                          <p className="text-gray-900">{selectedPatient.cpf}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Data de Nascimento</p>
                          <p className="text-gray-900">
                            {new Date(selectedPatient.birthDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Tipo Sanguíneo</p>
                          <p className="text-gray-900">{selectedPatient.bloodType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">E-mail</p>
                          <p className="text-gray-900">{selectedPatient.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Telefone</p>
                          <p className="text-gray-900">{selectedPatient.phone}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600">Endereço</p>
                          <p className="text-gray-900">{selectedPatient.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Informações Médicas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedPatient.allergies && selectedPatient.allergies.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Alergias</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedPatient.allergies.map((allergy, i) => (
                              <Badge key={i} variant="destructive">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                {allergy}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedPatient.chronicConditions && selectedPatient.chronicConditions.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Condições Crônicas</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedPatient.chronicConditions.map((condition, i) => (
                              <Badge key={i} variant="secondary">
                                <Heart className="w-3 h-3 mr-1" />
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Contato de Emergência</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Nome</p>
                          <p className="text-gray-900">{selectedPatient.emergencyContact.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Telefone</p>
                          <p className="text-gray-900">{selectedPatient.emergencyContact.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Parentesco</p>
                          <p className="text-gray-900">{selectedPatient.emergencyContact.relationship}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="records" className="space-y-4">
                  {patientRecords.length > 0 ? (
                    patientRecords.map((record) => (
                      <Card key={record.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{new Date(record.date).toLocaleDateString('pt-BR')}</CardTitle>
                              <CardDescription>{record.professionalName}</CardDescription>
                            </div>
                            <Badge>Atendimento</Badge>
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
                              <p className="text-sm text-gray-600 mb-2">Prescrições</p>
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
                          {record.notes && (
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Observações</p>
                              <p className="text-gray-900">{record.notes}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Nenhum histórico clínico registrado</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <Card>
                    <CardContent className="p-8 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Nenhum documento anexado</p>
                      <Button variant="outline" className="mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Documento
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
