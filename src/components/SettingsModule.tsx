import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Settings, 
  Building2, 
  Users, 
  Shield, 
  Database,
  Bell,
  Palette,
  Globe,
  FileText,
  Save
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function SettingsModule() {
  const [settings, setSettings] = useState({
    // General
    systemName: 'VidaPlus - SGHSS',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY',
    currency: 'BRL',
    
    // Hospital
    hospitalName: 'Hospital VidaPlus',
    cnpj: '12.345.678/0001-90',
    phone: '(11) 3000-0000',
    email: 'contato@vidaplus.com.br',
    address: 'Av. Paulista, 1000 - São Paulo/SP',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    systemAlerts: true,
    
    // Security
    sessionTimeout: '30',
    passwordExpiry: '90',
    mfa: true,
    
    // Features
    telemedicineEnabled: true,
    labIntegration: true,
    pharmacyIntegration: true,
    homeCareEnabled: true,
    
    // Appearance
    theme: 'light',
    compactMode: false
  });

  const handleSave = (section: string) => {
    toast.success(`Configurações de ${section} salvas com sucesso!`);
  };

  const handleExport = () => {
    toast.success('Configurações exportadas com sucesso!');
  };

  const handleImport = () => {
    toast.success('Configurações importadas com sucesso!');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1>Configurações do Sistema</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações globais do SGHSS VidaPlus
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            Exportar
          </Button>
          <Button variant="outline" onClick={handleImport}>
            Importar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="gap-2">
            <Settings className="h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="hospital" className="gap-2">
            <Building2 className="h-4 w-4" />
            Hospital
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Database className="h-4 w-4" />
            Integrações
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Aparência
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configurações básicas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="systemName">Nome do Sistema</Label>
                  <Input
                    id="systemName"
                    value={settings.systemName}
                    onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Idioma
                    </Label>
                    <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
                      <SelectTrigger id="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Select value={settings.timezone} onValueChange={(value) => setSettings({ ...settings, timezone: value })}>
                      <SelectTrigger id="timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                        <SelectItem value="America/Manaus">Manaus (GMT-4)</SelectItem>
                        <SelectItem value="America/Rio_Branco">Rio Branco (GMT-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Formato de Data</Label>
                    <Select value={settings.dateFormat} onValueChange={(value) => setSettings({ ...settings, dateFormat: value })}>
                      <SelectTrigger id="dateFormat">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <Select value={settings.currency} onValueChange={(value) => setSettings({ ...settings, currency: value })}>
                      <SelectTrigger id="currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">Real (R$)</SelectItem>
                        <SelectItem value="USD">Dólar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave('Geral')}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hospital Settings */}
        <TabsContent value="hospital" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Hospital</CardTitle>
              <CardDescription>
                Dados cadastrais da instituição
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hospitalName">Nome do Hospital</Label>
                    <Input
                      id="hospitalName"
                      value={settings.hospitalName}
                      onChange={(e) => setSettings({ ...settings, hospitalName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={settings.cnpj}
                      onChange={(e) => setSettings({ ...settings, cnpj: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Unidades e Clínicas</h3>
                <div className="space-y-2">
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div>
                      <p>Hospital Central VidaPlus</p>
                      <p className="text-muted-foreground">Av. Paulista, 1000 - São Paulo/SP</p>
                    </div>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div>
                      <p>Clínica de Bairro - Zona Norte</p>
                      <p className="text-muted-foreground">Rua das Flores, 500 - São Paulo/SP</p>
                    </div>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </div>
                <Button variant="outline">
                  <Building2 className="h-4 w-4 mr-2" />
                  Adicionar Unidade
                </Button>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave('Hospital')}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Settings */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Usuários</CardTitle>
              <CardDescription>
                Configurações de perfis e permissões
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3>Perfis de Acesso</h3>
                <div className="space-y-2">
                  {['Administrador', 'Médico', 'Enfermeiro', 'Recepcionista', 'Paciente'].map((role) => (
                    <div key={role} className="p-4 border rounded-lg flex items-center justify-between">
                      <div>
                        <p>{role}</p>
                        <p className="text-muted-foreground">
                          {role === 'Administrador' && 'Acesso completo ao sistema'}
                          {role === 'Médico' && 'Acesso a prontuários, prescrições e agendamentos'}
                          {role === 'Enfermeiro' && 'Acesso a prontuários e administração de medicamentos'}
                          {role === 'Recepcionista' && 'Acesso a agendamentos e cadastro de pacientes'}
                          {role === 'Paciente' && 'Acesso ao portal do paciente'}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Configurar</Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Política de Senhas</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Complexidade de Senha</p>
                    <p className="text-muted-foreground">
                      Mínimo 8 caracteres, letras maiúsculas, minúsculas e números
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Histórico de Senhas</p>
                    <p className="text-muted-foreground">
                      Impedir reutilização das últimas 5 senhas
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave('Usuários')}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança e Privacidade</CardTitle>
              <CardDescription>
                Configurações de segurança e conformidade LGPD
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3>Sessões de Usuário</h3>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Tempo de Inatividade (minutos)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                  />
                  <p className="text-muted-foreground">
                    Usuários serão desconectados após este período de inatividade
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Autenticação</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Autenticação em Dois Fatores (2FA)</p>
                    <p className="text-muted-foreground">
                      Obrigar 2FA para todos os usuários administrativos
                    </p>
                  </div>
                  <Switch
                    checked={settings.mfa}
                    onCheckedChange={(checked) => setSettings({ ...settings, mfa: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Expiração de Senha (dias)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={settings.passwordExpiry}
                    onChange={(e) => setSettings({ ...settings, passwordExpiry: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Conformidade LGPD</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Auditoria de Acesso</p>
                    <p className="text-muted-foreground">
                      Registrar todos os acessos a dados sensíveis
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Criptografia de Dados</p>
                    <p className="text-muted-foreground">
                      Criptografar dados sensíveis em repouso
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Retenção de Dados</p>
                    <p className="text-muted-foreground">
                      Período: 5 anos (conforme legislação)
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave('Segurança')}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrações e Módulos</CardTitle>
              <CardDescription>
                Habilite ou desabilite funcionalidades do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3>Módulos do Sistema</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Telemedicina</p>
                    <p className="text-muted-foreground">
                      Consultas por videochamada
                    </p>
                  </div>
                  <Switch
                    checked={settings.telemedicineEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, telemedicineEnabled: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Laboratório</p>
                    <p className="text-muted-foreground">
                      Gestão de exames laboratoriais
                    </p>
                  </div>
                  <Switch
                    checked={settings.labIntegration}
                    onCheckedChange={(checked) => setSettings({ ...settings, labIntegration: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Farmácia</p>
                    <p className="text-muted-foreground">
                      Controle de estoque e dispensação
                    </p>
                  </div>
                  <Switch
                    checked={settings.pharmacyIntegration}
                    onCheckedChange={(checked) => setSettings({ ...settings, pharmacyIntegration: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Home Care</p>
                    <p className="text-muted-foreground">
                      Atendimento domiciliar
                    </p>
                  </div>
                  <Switch
                    checked={settings.homeCareEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, homeCareEnabled: checked })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Integrações Externas</h3>
                <div className="p-4 border rounded-lg flex items-center justify-between">
                  <div>
                    <p>DATASUS</p>
                    <p className="text-muted-foreground">Integração com o Sistema Único de Saúde</p>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
                <div className="p-4 border rounded-lg flex items-center justify-between">
                  <div>
                    <p>ANS</p>
                    <p className="text-muted-foreground">Agência Nacional de Saúde Suplementar</p>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave('Integrações')}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>
                Personalize a interface do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3>Tema</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`p-6 border-2 rounded-lg cursor-pointer ${settings.theme === 'light' ? 'border-blue-500' : 'border-gray-200'}`}
                    onClick={() => setSettings({ ...settings, theme: 'light' })}
                  >
                    <div className="h-20 bg-white rounded mb-4"></div>
                    <p className="text-center">Claro</p>
                  </div>
                  <div
                    className={`p-6 border-2 rounded-lg cursor-pointer ${settings.theme === 'dark' ? 'border-blue-500' : 'border-gray-200'}`}
                    onClick={() => setSettings({ ...settings, theme: 'dark' })}
                  >
                    <div className="h-20 bg-gray-800 rounded mb-4"></div>
                    <p className="text-center">Escuro</p>
                  </div>
                  <div
                    className={`p-6 border-2 rounded-lg cursor-pointer ${settings.theme === 'auto' ? 'border-blue-500' : 'border-gray-200'}`}
                    onClick={() => setSettings({ ...settings, theme: 'auto' })}
                  >
                    <div className="h-20 bg-gradient-to-r from-white to-gray-800 rounded mb-4"></div>
                    <p className="text-center">Automático</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3>Densidade da Interface</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Modo Compacto</p>
                    <p className="text-muted-foreground">
                      Reduz espaçamentos para mostrar mais informações
                    </p>
                  </div>
                  <Switch
                    checked={settings.compactMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, compactMode: checked })}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave('Aparência')}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
