import { useState } from 'react';
import { User } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { UserCircle, Lock, Bell, Shield, Key, Mail, Phone, MapPin, Calendar, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProfileModuleProps {
  user: User;
}

export function ProfileModule({ user }: ProfileModuleProps) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123 - São Paulo/SP',
    birthDate: '1985-05-15',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    systemUpdates: true,
    marketingEmails: false,
  });

  const handleSave = () => {
    toast.success('Perfil atualizado com sucesso!');
    setEditMode(false);
  };

  const handleChangePassword = () => {
    toast.success('Instruções enviadas para seu e-mail!');
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('Preferências de notificação atualizadas');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-500';
      case 'doctor': return 'bg-blue-500';
      case 'nurse': return 'bg-green-500';
      case 'patient': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'doctor': return 'Médico';
      case 'nurse': return 'Enfermeiro';
      case 'patient': return 'Paciente';
      default: return role;
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1>Meu Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais, segurança e preferências
        </p>
      </div>

      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2>{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex gap-2 mt-2">
                <Badge className={getRoleBadgeColor(user.role)}>
                  {getRoleLabel(user.role)}
                </Badge>
                <Badge variant="outline">Conta Ativa</Badge>
              </div>
            </div>
            <Button onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Cancelar' : 'Editar Perfil'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal" className="gap-2">
            <UserCircle className="h-4 w-4" />
            Dados Pessoais
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Lock className="h-4 w-4" />
            Privacidade
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Atualize seus dados pessoais e informações de contato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!editMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!editMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Endereço Completo
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!editMode}
                />
              </div>

              {editMode && (
                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setEditMode(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave}>Salvar Alterações</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {user.role === 'doctor' && (
            <Card>
              <CardHeader>
                <CardTitle>Informações Profissionais</CardTitle>
                <CardDescription>
                  Dados profissionais e credenciais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Especialidade</Label>
                    <Input value="Cardiologia" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>CRM</Label>
                    <Input value="CRM/SP 123456" disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Horários de Atendimento
                  </Label>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Segunda-feira:</span>
                        <span>08:00 - 12:00, 14:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quarta-feira:</span>
                        <span>08:00 - 12:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sexta-feira:</span>
                        <span>14:00 - 18:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Senha e Autenticação</CardTitle>
              <CardDescription>
                Gerencie sua senha e métodos de autenticação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <Key className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p>Senha</p>
                    <p className="text-muted-foreground">
                      Última alteração há 45 dias
                    </p>
                  </div>
                </div>
                <Button onClick={handleChangePassword}>Alterar Senha</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Autenticação em Dois Fatores</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Autenticação por SMS</p>
                    <p className="text-muted-foreground">
                      Receba códigos via mensagem de texto
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Autenticação por E-mail</p>
                    <p className="text-muted-foreground">
                      Receba códigos via e-mail
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sessões Ativas</CardTitle>
              <CardDescription>
                Dispositivos conectados à sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p>Windows - Chrome</p>
                  <p className="text-muted-foreground">
                    São Paulo, Brasil • Ativo agora
                  </p>
                </div>
                <Badge variant="outline">Atual</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p>iPhone - Safari</p>
                  <p className="text-muted-foreground">
                    São Paulo, Brasil • Ativo há 2 horas
                  </p>
                </div>
                <Button variant="destructive" size="sm">Encerrar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Configure como e quando você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3>Canais de Comunicação</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Notificações por E-mail</p>
                    <p className="text-muted-foreground">
                      Receba atualizações importantes via e-mail
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Notificações por SMS</p>
                    <p className="text-muted-foreground">
                      Receba lembretes via mensagem de texto
                    </p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Tipos de Notificação</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Lembretes de Consultas</p>
                    <p className="text-muted-foreground">
                      Notificações 24h e 1h antes das consultas
                    </p>
                  </div>
                  <Switch
                    checked={notifications.appointmentReminders}
                    onCheckedChange={(checked) => handleNotificationChange('appointmentReminders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Atualizações do Sistema</p>
                    <p className="text-muted-foreground">
                      Novos recursos e manutenções programadas
                    </p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('systemUpdates', checked)}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>E-mails de Marketing</p>
                    <p className="text-muted-foreground">
                      Novidades, promoções e dicas de saúde
                    </p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacidade e Dados Pessoais</CardTitle>
              <CardDescription>
                Controle quem pode ver suas informações (LGPD)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3>Visibilidade do Perfil</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Perfil Público</p>
                    <p className="text-muted-foreground">
                      Permitir que outros profissionais vejam seu perfil
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Histórico de Consultas</p>
                    <p className="text-muted-foreground">
                      Compartilhar histórico com novos médicos
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Seus Dados</h3>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p>Baixar Meus Dados</p>
                      <p className="text-muted-foreground">
                        Solicitar uma cópia de todos os seus dados
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Solicitar</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Zona de Perigo</h3>
                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                  <div>
                    <p className="text-red-900">Excluir Conta</p>
                    <p className="text-red-700">
                      Excluir permanentemente sua conta e todos os dados
                    </p>
                  </div>
                  <Button variant="destructive">Excluir Conta</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consentimentos LGPD</CardTitle>
              <CardDescription>
                Gerencie seus consentimentos de uso de dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p>Uso de Dados para Tratamento</p>
                    <p className="text-muted-foreground">
                      Permitir o uso de dados pessoais para finalidades médicas
                    </p>
                  </div>
                  <Badge>Obrigatório</Badge>
                </div>
                <p className="text-muted-foreground">
                  Consentido em: 15/03/2024
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p>Pesquisas e Análises</p>
                    <p className="text-muted-foreground">
                      Uso anonimizado para pesquisas científicas
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <p className="text-muted-foreground">
                  Consentido em: 15/03/2024
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
