import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  CheckCircle2,
  Calendar,
  Video,
  Heart,
  FileText,
  Bell,
  Shield,
  Home,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface OnboardingModuleProps {
  onComplete: () => void;
}

export function OnboardingModule({ onComplete }: OnboardingModuleProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Bem-vindo ao VidaPlus!',
      description: 'Sistema de Gestão Hospitalar e de Serviços de Saúde',
      icon: <Sparkles className="h-16 w-16 text-blue-500" />,
      content: (
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="p-8 bg-blue-100 rounded-full">
              <Home className="h-24 w-24 text-blue-600" />
            </div>
          </div>
          <h1>Seja bem-vindo(a) ao VidaPlus!</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            O Sistema de Gestão Hospitalar e de Serviços de Saúde mais completo do Brasil. 
            Gerencie hospitais, clínicas, laboratórios e equipes de home care em uma única plataforma.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
            <div className="p-4 bg-muted rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p>Conforme LGPD</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p>100% Seguro</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p>Focado em Saúde</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Principais Funcionalidades',
      description: 'Tudo que você precisa em um só lugar',
      icon: <Heart className="h-16 w-16 text-red-500" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-center mb-8">Conheça nossos módulos</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Agendamentos</CardTitle>
                    <CardDescription>Gestão completa de consultas</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Agenda inteligente
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Lembretes automáticos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Lista de espera
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Video className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Telemedicina</CardTitle>
                    <CardDescription>Consultas por videochamada</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Videochamadas seguras
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Compartilhamento de tela
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Gravação de consultas
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Prontuário Eletrônico</CardTitle>
                    <CardDescription>Histórico médico completo</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Acesso centralizado
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Prescrições digitais
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Histórico de exames
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Home className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Home Care</CardTitle>
                    <CardDescription>Atendimento domiciliar</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Gestão de visitas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Equipes especializadas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Navegação GPS
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      title: 'Segurança e Privacidade',
      description: 'Seus dados estão seguros conosco',
      icon: <Shield className="h-16 w-16 text-green-500" />,
      content: (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-8 bg-green-100 rounded-full">
                <Shield className="h-24 w-24 text-green-600" />
              </div>
            </div>
            <h2 className="mb-4">Proteção de Dados Garantida</h2>
            <p className="text-muted-foreground">
              Seguimos rigorosamente todas as normas da LGPD e utilizamos tecnologias 
              de ponta para garantir a segurança das suas informações
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 border rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="mb-2">Criptografia de Ponta a Ponta</h3>
              <p className="text-muted-foreground">
                Todos os dados sensíveis são criptografados em repouso e em trânsito
              </p>
            </div>

            <div className="p-6 border rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="mb-2">Conformidade LGPD</h3>
              <p className="text-muted-foreground">
                100% conforme a Lei Geral de Proteção de Dados
              </p>
            </div>

            <div className="p-6 border rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="mb-2">Auditoria Completa</h3>
              <p className="text-muted-foreground">
                Registro detalhado de todos os acessos aos dados
              </p>
            </div>

            <div className="p-6 border rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="mb-2">Autenticação 2FA</h3>
              <p className="text-muted-foreground">
                Camada extra de segurança para sua conta
              </p>
            </div>
          </div>

          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-4">
              <Bell className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="mb-2">Você tem o controle</h3>
                <p className="text-muted-foreground">
                  Gerencie suas preferências de privacidade, veja quem acessou seus dados 
                  e solicite a exclusão de informações a qualquer momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Tudo Pronto!',
      description: 'Comece a usar o sistema agora',
      icon: <CheckCircle2 className="h-16 w-16 text-green-500" />,
      content: (
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-8 bg-green-100 rounded-full">
              <CheckCircle2 className="h-24 w-24 text-green-600" />
            </div>
          </div>
          <h1>Você está pronto para começar!</h1>
          <p className="text-muted-foreground">
            Explore todas as funcionalidades do sistema e descubra como o VidaPlus pode 
            transformar a gestão da sua instituição de saúde.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="mb-2">Documentação</h3>
                <p className="text-muted-foreground">
                  Acesse nossos guias
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Video className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                <h3 className="mb-2">Tutoriais</h3>
                <p className="text-muted-foreground">
                  Vídeos explicativos
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Bell className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                <h3 className="mb-2">Suporte</h3>
                <p className="text-muted-foreground">
                  Ajuda 24/7
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg mt-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h3>Dica Profissional</h3>
            </div>
            <p className="text-muted-foreground">
              Personalize suas notificações e configure sua agenda na seção de Perfil 
              para aproveitar ao máximo o sistema!
            </p>
          </div>
        </div>
      )
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-muted-foreground">
              Passo {currentStep + 1} de {steps.length}
            </p>
            <Button variant="ghost" onClick={handleSkip}>
              Pular Tutorial
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content Card */}
        <Card className="border-2">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              {steps[currentStep].icon}
            </div>
            <CardTitle className="text-3xl">{steps[currentStep].title}</CardTitle>
            <CardDescription className="text-lg">
              {steps[currentStep].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            {steps[currentStep].content}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>

          <div className="flex gap-2">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStep
                    ? 'w-8 bg-blue-600'
                    : idx < currentStep
                    ? 'w-2 bg-green-500'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? (
              <>
                Começar
                <Sparkles className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Próximo
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
