import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  CheckCircle2,
  Shield,
  Zap,
  Users,
  Globe,
  Lock,
  Activity,
  TrendingUp,
  Server,
  Code
} from 'lucide-react';

export function SystemInfoModule() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1>Sistema VidaPlus - SGHSS</h1>
        <p className="text-muted-foreground">
          Sistema de Gestão Hospitalar e de Serviços de Saúde
        </p>
      </div>

      {/* System Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sobre o Sistema</CardTitle>
          <CardDescription>
            Plataforma completa para gestão de instituições de saúde
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              O SGHSS VidaPlus é uma solução integrada desenvolvida para administrar hospitais, 
              clínicas de bairro, laboratórios e equipes de home care. O sistema centraliza o 
              cadastro e atendimento de pacientes, gestão de profissionais de saúde, administração 
              hospitalar, telemedicina e controles de segurança com conformidade LGPD.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Zap className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="mb-1">Alto Desempenho</h3>
                <p className="text-muted-foreground">99.5% de disponibilidade</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <Shield className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="mb-1">Segurança Garantida</h3>
                <p className="text-muted-foreground">Conforme LGPD</p>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="mb-1">Multi-unidade</h3>
                <p className="text-muted-foreground">Escalável</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Funcionalidades</TabsTrigger>
          <TabsTrigger value="tech">Tecnologias</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="compliance">Conformidade</TabsTrigger>
        </TabsList>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Módulos Principais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p>Dashboard Analítico</p>
                    <p className="text-muted-foreground">
                      Visão geral com métricas e KPIs em tempo real
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p>Gestão de Pacientes</p>
                    <p className="text-muted-foreground">
                      Cadastro completo com histórico médico
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p>Agendamento Inteligente</p>
                    <p className="text-muted-foreground">
                      Sistema de agenda com lista de espera
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p>Prontuário Eletrônico</p>
                    <p className="text-muted-foreground">
                      Histórico completo e prescrições digitais
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p>Telemedicina</p>
                    <p className="text-muted-foreground">
                      Consultas por videochamada segura
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Módulos Administrativos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p>Laboratório Clínico</p>
                    <p className="text-muted-foreground">
                      Gestão de exames e resultados
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p>Farmácia e Estoque</p>
                    <p className="text-muted-foreground">
                      Controle de medicamentos e dispensação
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p>Home Care</p>
                    <p className="text-muted-foreground">
                      Gestão de atendimento domiciliar
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p>Gestão de Leitos</p>
                    <p className="text-muted-foreground">
                      Controle de ocupação hospitalar
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p>Faturamento</p>
                    <p className="text-muted-foreground">
                      Gestão financeira e cobranças
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Technology Tab */}
        <TabsContent value="tech" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stack Tecnológico</CardTitle>
              <CardDescription>
                Tecnologias modernas e robustas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <h3 className="mb-4 flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-500" />
                    Frontend
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge>React 18</Badge>
                      <span className="text-muted-foreground">UI Framework</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>TypeScript</Badge>
                      <span className="text-muted-foreground">Type Safety</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Tailwind CSS</Badge>
                      <span className="text-muted-foreground">Styling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>shadcn/ui</Badge>
                      <span className="text-muted-foreground">Components</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 flex items-center gap-2">
                    <Server className="h-5 w-5 text-green-500" />
                    Backend (Próxima Fase)
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Supabase</Badge>
                      <span className="text-muted-foreground">Database</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">PostgreSQL</Badge>
                      <span className="text-muted-foreground">RDBMS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Row Level Security</Badge>
                      <span className="text-muted-foreground">Auth</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-purple-500" />
                    Padrões
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-500">W3C</Badge>
                      <span className="text-muted-foreground">Acessibilidade</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-500">WCAG 2.1</Badge>
                      <span className="text-muted-foreground">Guidelines</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-500">Responsive</Badge>
                      <span className="text-muted-foreground">Design</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Arquitetura</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-2">Component-Based Architecture</h3>
                  <p className="text-muted-foreground">
                    Modularização completa com componentes reutilizáveis e manuteníveis
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-2">Responsive Design</h3>
                  <p className="text-muted-foreground">
                    Interface adaptável para desktop, tablet e mobile
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-2">Scalable Infrastructure</h3>
                  <p className="text-muted-foreground">
                    Preparado para crescimento com múltiplas unidades
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Segurança da Informação
              </CardTitle>
              <CardDescription>
                Proteção em múltiplas camadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <Lock className="h-8 w-8 text-blue-500 mb-3" />
                  <h3 className="mb-2">Criptografia</h3>
                  <p className="text-muted-foreground">
                    Dados criptografados em repouso (AES-256) e em trânsito (TLS 1.3)
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Shield className="h-8 w-8 text-green-500 mb-3" />
                  <h3 className="mb-2">Autenticação</h3>
                  <p className="text-muted-foreground">
                    Sistema de autenticação com suporte a 2FA e sessões seguras
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Activity className="h-8 w-8 text-purple-500 mb-3" />
                  <h3 className="mb-2">Auditoria</h3>
                  <p className="text-muted-foreground">
                    Registro completo de acessos e modificações de dados
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <TrendingUp className="h-8 w-8 text-orange-500 mb-3" />
                  <h3 className="mb-2">Monitoramento</h3>
                  <p className="text-muted-foreground">
                    Detecção de anomalias e tentativas de acesso não autorizado
                  </p>
                </div>
              </div>

              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="mb-2">Disponibilidade Garantida</h3>
                    <p className="text-muted-foreground">
                      SLA de 99.5% de uptime com backup automático e redundância de dados
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conformidade Regulatória</CardTitle>
              <CardDescription>
                Atendimento às normas e legislações vigentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
                  <h3 className="mb-2">LGPD - Lei Geral de Proteção de Dados</h3>
                  <p className="text-muted-foreground mb-3">
                    100% conforme a Lei nº 13.709/2018
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Consentimento explícito para tratamento de dados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Direito ao acesso, correção e exclusão de dados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Portabilidade de dados pessoais</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Auditoria completa de acessos</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-l-4 border-l-green-500 bg-green-50">
                  <h3 className="mb-2">CFM - Conselho Federal de Medicina</h3>
                  <p className="text-muted-foreground mb-3">
                    Resolução CFM nº 1.821/2007 - Prontuário Eletrônico
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Integridade e autenticidade de registros</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Confidencialidade médico-paciente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Assinatura digital em prescrições</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-l-4 border-l-purple-500 bg-purple-50">
                  <h3 className="mb-2">Acessibilidade Digital</h3>
                  <p className="text-muted-foreground mb-3">
                    W3C/WCAG 2.1 Level AA
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Interface responsiva e adaptável</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Suporte a leitores de tela</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Navegação por teclado</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Version Info */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Versão do Sistema</p>
              <p>1.0.0 (Build 2024.12)</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Operacional</span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Uptime</p>
              <p>99.8%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
