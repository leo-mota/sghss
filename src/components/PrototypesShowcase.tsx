import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Layout,
  Users,
  Calendar,
  FileText,
  Video,
  TestTube,
  Pill,
  Home,
  DollarSign,
  Settings,
  HelpCircle,
  UserCircle,
  BedDouble,
  BarChart3,
  Shield,
  Sparkles,
  Eye,
  Layers
} from 'lucide-react';

export function PrototypesShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const prototypes = [
    {
      id: 'onboarding',
      name: 'Tela de Boas-Vindas',
      category: 'Autenticação',
      icon: Sparkles,
      color: 'blue',
      description: 'Tutorial interativo para novos usuários com apresentação do sistema',
      features: ['4 etapas guiadas', 'Barra de progresso', 'Navegação intuitiva']
    },
    {
      id: 'login',
      name: 'Login',
      category: 'Autenticação',
      icon: UserCircle,
      color: 'purple',
      description: 'Tela de autenticação com diferentes perfis de usuário',
      features: ['Múltiplos perfis', 'Recuperação de senha', 'Autenticação segura']
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      category: 'Principal',
      icon: Layout,
      color: 'green',
      description: 'Painel principal com visão geral e métricas importantes',
      features: ['KPIs em tempo real', 'Gráficos interativos', 'Resumo personalizado']
    },
    {
      id: 'patients',
      name: 'Gestão de Pacientes',
      category: 'Cadastros',
      icon: Users,
      color: 'blue',
      description: 'Cadastro completo de pacientes com histórico médico',
      features: ['Busca avançada', 'Filtros múltiplos', 'Dados completos']
    },
    {
      id: 'professionals',
      name: 'Profissionais de Saúde',
      category: 'Cadastros',
      icon: Users,
      color: 'green',
      description: 'Gestão de médicos, enfermeiros e equipe multidisciplinar',
      features: ['Agendas individuais', 'Especialidades', 'Escalas de trabalho']
    },
    {
      id: 'appointments',
      name: 'Agendamentos',
      category: 'Atendimento',
      icon: Calendar,
      color: 'orange',
      description: 'Sistema completo de agendamento de consultas',
      features: ['Agenda visual', 'Lista de espera', 'Lembretes automáticos']
    },
    {
      id: 'schedule',
      name: 'Minha Agenda',
      category: 'Atendimento',
      icon: Calendar,
      color: 'purple',
      description: 'Agenda personalizada para profissionais de saúde',
      features: ['Calendário mensal', 'Compromissos do dia', 'Sincronização']
    },
    {
      id: 'medical-records',
      name: 'Prontuário Eletrônico',
      category: 'Clínico',
      icon: FileText,
      color: 'blue',
      description: 'Prontuário médico digital completo',
      features: ['Histórico completo', 'Anexos de exames', 'Evolução médica']
    },
    {
      id: 'prescriptions',
      name: 'Prescrições Médicas',
      category: 'Clínico',
      icon: FileText,
      color: 'green',
      description: 'Prescrições digitais com múltiplos medicamentos',
      features: ['Prescrição digital', 'Impressão de receitas', 'Histórico']
    },
    {
      id: 'telemedicine',
      name: 'Telemedicina',
      category: 'Atendimento',
      icon: Video,
      color: 'purple',
      description: 'Consultas por videochamada com segurança',
      features: ['Videochamada HD', 'Chat integrado', 'Gravação de consultas']
    },
    {
      id: 'laboratory',
      name: 'Laboratório Clínico',
      category: 'Serviços',
      icon: TestTube,
      color: 'blue',
      description: 'Gestão de exames laboratoriais e resultados',
      features: ['Solicitação de exames', 'Resultados online', 'Faixas de referência']
    },
    {
      id: 'pharmacy',
      name: 'Farmácia e Estoque',
      category: 'Serviços',
      icon: Pill,
      color: 'green',
      description: 'Controle de medicamentos e dispensação',
      features: ['Controle de estoque', 'Alertas de validade', 'Dispensação']
    },
    {
      id: 'home-care',
      name: 'Home Care',
      category: 'Serviços',
      icon: Home,
      color: 'orange',
      description: 'Gestão de atendimento domiciliar',
      features: ['Agenda de visitas', 'Navegação GPS', 'Sinais vitais']
    },
    {
      id: 'beds',
      name: 'Gestão de Leitos',
      category: 'Administrativo',
      icon: BedDouble,
      color: 'purple',
      description: 'Controle de ocupação hospitalar',
      features: ['Mapa de leitos', 'Status em tempo real', 'Transferências']
    },
    {
      id: 'billing',
      name: 'Faturamento',
      category: 'Administrativo',
      icon: DollarSign,
      color: 'green',
      description: 'Gestão financeira e cobranças',
      features: ['Faturas detalhadas', 'Múltiplas formas de pagamento', 'Relatórios']
    },
    {
      id: 'reports',
      name: 'Relatórios',
      category: 'Administrativo',
      icon: BarChart3,
      color: 'blue',
      description: 'Relatórios gerenciais e estatísticos',
      features: ['Gráficos diversos', 'Exportação PDF/Excel', 'Filtros avançados']
    },
    {
      id: 'audit',
      name: 'Auditoria',
      category: 'Segurança',
      icon: Shield,
      color: 'red',
      description: 'Registro de acessos e conformidade LGPD',
      features: ['Log de acessos', 'Rastreabilidade', 'Conformidade LGPD']
    },
    {
      id: 'profile',
      name: 'Perfil do Usuário',
      category: 'Configurações',
      icon: UserCircle,
      color: 'blue',
      description: 'Gestão de dados pessoais e preferências',
      features: ['Dados pessoais', 'Segurança', 'Notificações', 'Privacidade']
    },
    {
      id: 'settings',
      name: 'Configurações do Sistema',
      category: 'Configurações',
      icon: Settings,
      color: 'gray',
      description: 'Configurações globais do sistema',
      features: ['Hospital', 'Usuários', 'Segurança', 'Integrações']
    },
    {
      id: 'help',
      name: 'Ajuda e Suporte',
      category: 'Suporte',
      icon: HelpCircle,
      color: 'orange',
      description: 'Central de ajuda com FAQ e tutoriais',
      features: ['FAQ completo', 'Vídeos tutoriais', 'Canais de atendimento']
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', count: prototypes.length },
    { id: 'Autenticação', name: 'Autenticação', count: prototypes.filter(p => p.category === 'Autenticação').length },
    { id: 'Principal', name: 'Principal', count: prototypes.filter(p => p.category === 'Principal').length },
    { id: 'Cadastros', name: 'Cadastros', count: prototypes.filter(p => p.category === 'Cadastros').length },
    { id: 'Atendimento', name: 'Atendimento', count: prototypes.filter(p => p.category === 'Atendimento').length },
    { id: 'Clínico', name: 'Clínico', count: prototypes.filter(p => p.category === 'Clínico').length },
    { id: 'Serviços', name: 'Serviços', count: prototypes.filter(p => p.category === 'Serviços').length },
    { id: 'Administrativo', name: 'Administrativo', count: prototypes.filter(p => p.category === 'Administrativo').length },
    { id: 'Segurança', name: 'Segurança', count: prototypes.filter(p => p.category === 'Segurança').length },
    { id: 'Configurações', name: 'Configurações', count: prototypes.filter(p => p.category === 'Configurações').length },
    { id: 'Suporte', name: 'Suporte', count: prototypes.filter(p => p.category === 'Suporte').length },
  ];

  const filteredPrototypes = selectedCategory === 'all' 
    ? prototypes 
    : prototypes.filter(p => p.category === selectedCategory);

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      gray: 'bg-gray-100 text-gray-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Layers className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1>Protótipos do Sistema VidaPlus</h1>
            <p className="text-muted-foreground">
              Galeria completa de todas as telas e funcionalidades implementadas
            </p>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-4">
            <Eye className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="mb-2">Sistema Completo Implementado</h3>
              <p className="text-muted-foreground">
                Este showcase apresenta <strong>{prototypes.length} telas funcionais</strong> do Sistema de Gestão 
                Hospitalar e de Serviços de Saúde (SGHSS) VidaPlus. Todas as interfaces estão 100% implementadas 
                e prontas para uso, faltando apenas a integração com o backend Supabase para persistência de dados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-blue-600">{prototypes.length}</h2>
              <p className="text-muted-foreground">Telas Totais</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-green-600">{categories.length - 1}</h2>
              <p className="text-muted-foreground">Categorias</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-purple-600">100%</h2>
              <p className="text-muted-foreground">Implementado</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-orange-600">React</h2>
              <p className="text-muted-foreground">TypeScript</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="gap-2"
                >
                  {cat.name}
                  <Badge variant="secondary">{cat.count}</Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prototypes Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredPrototypes.map(prototype => {
          const Icon = prototype.icon;
          return (
            <Card key={prototype.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-3 rounded-lg ${getColorClass(prototype.color)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline">{prototype.category}</Badge>
                </div>
                <CardTitle>{prototype.name}</CardTitle>
                <CardDescription>{prototype.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-muted-foreground mb-2">Recursos Principais:</p>
                    <div className="space-y-1">
                      {prototype.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full gap-2">
                    <Eye className="h-4 w-4" />
                    Visualizar Protótipo
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Resumo da Implementação</CardTitle>
          <CardDescription>
            Status completo do desenvolvimento do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3>Frontend Completo</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>Componentes React</span>
                  <Badge className="bg-green-500">✓ Implementado</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>TypeScript</span>
                  <Badge className="bg-green-500">✓ Implementado</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>Tailwind CSS</span>
                  <Badge className="bg-green-500">✓ Implementado</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>UI Components (shadcn)</span>
                  <Badge className="bg-green-500">✓ Implementado</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>Responsividade</span>
                  <Badge className="bg-green-500">✓ Implementado</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3>Próxima Fase - Backend</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>Integração Supabase</span>
                  <Badge variant="outline">Pendente</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>Banco de Dados</span>
                  <Badge variant="outline">Pendente</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>Autenticação Real</span>
                  <Badge variant="outline">Pendente</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>APIs RESTful</span>
                  <Badge variant="outline">Pendente</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>Realtime Updates</span>
                  <Badge variant="outline">Pendente</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
