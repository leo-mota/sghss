import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockProfessionals } from '../lib/mockData';
import { Search, Plus, Stethoscope, Mail, Phone, Calendar, Clock } from 'lucide-react';

export function ProfessionalsModule() {
  const [professionals] = useState(mockProfessionals);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfessionals = professionals.filter(prof =>
    prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.crm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDayName = (day: number) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[day];
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Profissionais de Saúde</h1>
          <p className="text-gray-600">Gerencie médicos, enfermeiros e especialistas</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Profissional
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Profissional</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Nome do profissional" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="email@vidaplus.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiologia">Cardiologia</SelectItem>
                      <SelectItem value="dermatologia">Dermatologia</SelectItem>
                      <SelectItem value="clinica-geral">Clínica Geral</SelectItem>
                      <SelectItem value="pediatria">Pediatria</SelectItem>
                      <SelectItem value="ortopedia">Ortopedia</SelectItem>
                      <SelectItem value="ginecologia">Ginecologia</SelectItem>
                      <SelectItem value="psiquiatria">Psiquiatria</SelectItem>
                      <SelectItem value="neurologia">Neurologia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crm">CRM</Label>
                  <Input id="crm" placeholder="CRM/UF 000000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Horário de Trabalho</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Dia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Segunda</SelectItem>
                        <SelectItem value="2">Terça</SelectItem>
                        <SelectItem value="3">Quarta</SelectItem>
                        <SelectItem value="4">Quinta</SelectItem>
                        <SelectItem value="5">Sexta</SelectItem>
                        <SelectItem value="6">Sábado</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input type="time" className="w-32" placeholder="Início" />
                    <span>até</span>
                    <Input type="time" className="w-32" placeholder="Fim" />
                    <Button type="button" variant="outline" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">Cancelar</Button>
                <Button type="submit">Cadastrar</Button>
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
              placeholder="Buscar por nome, especialidade ou CRM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredProfessionals.map((professional) => (
              <div
                key={professional.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">{professional.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{professional.specialty}</Badge>
                        <Badge variant="outline">{professional.crm}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ver Agenda</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{professional.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{professional.phone}</span>
                  </div>
                </div>

                {professional.workSchedule.length > 0 && (
                  <div className="pt-3 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Horários de Atendimento</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {professional.workSchedule.map((schedule, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {getDayName(schedule.dayOfWeek)}: {schedule.startTime} - {schedule.endTime}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredProfessionals.length === 0 && (
              <div className="text-center py-8">
                <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Nenhum profissional encontrado</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Profissionais</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">{professionals.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Especialidades</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">
              {new Set(professionals.map(p => p.specialty)).size}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ativos Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">
              {professionals.filter(p => 
                p.workSchedule.some(s => s.dayOfWeek === new Date().getDay())
              ).length}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
