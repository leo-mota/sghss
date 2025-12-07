import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  HelpCircle, 
  MessageSquare, 
  BookOpen, 
  Video, 
  Phone,
  Mail,
  Send,
  Search,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function HelpSupportModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const faqItems = [
    {
      category: 'Geral',
      questions: [
        {
          question: 'Como faço para redefinir minha senha?',
          answer: 'Você pode redefinir sua senha acessando a página de login e clicando em "Esqueci minha senha". Você receberá um e-mail com instruções para criar uma nova senha.'
        },
        {
          question: 'Como atualizo meus dados cadastrais?',
          answer: 'Acesse o menu "Perfil" no canto superior direito da tela, clique em "Editar Perfil" e atualize suas informações. Não esqueça de salvar as alterações.'
        },
        {
          question: 'O sistema está disponível 24 horas?',
          answer: 'Sim, o SGHSS VidaPlus está disponível 24 horas por dia, 7 dias por semana. Realizamos manutenções programadas que são comunicadas com antecedência.'
        }
      ]
    },
    {
      category: 'Agendamentos',
      questions: [
        {
          question: 'Como agendar uma consulta?',
          answer: 'Acesse o módulo "Agendamentos", clique em "Nova Consulta", selecione o profissional, especialidade, data e horário disponível. Confirme o agendamento e você receberá uma confirmação por e-mail.'
        },
        {
          question: 'Posso cancelar ou reagendar uma consulta?',
          answer: 'Sim, você pode cancelar ou reagendar consultas até 24 horas antes do horário marcado. Acesse "Meus Agendamentos", selecione a consulta e escolha a opção desejada.'
        },
        {
          question: 'Como funciona a lista de espera?',
          answer: 'Quando não há horários disponíveis, você pode entrar na lista de espera. Caso haja um cancelamento, você será notificado automaticamente e terá prioridade no agendamento.'
        }
      ]
    },
    {
      category: 'Telemedicina',
      questions: [
        {
          question: 'Quais são os requisitos técnicos para telemedicina?',
          answer: 'Você precisa de um dispositivo com câmera e microfone, conexão de internet estável (mínimo 2 Mbps) e um navegador atualizado (Chrome, Firefox, Safari ou Edge).'
        },
        {
          question: 'Como funciona a consulta por videochamada?',
          answer: 'No horário da consulta, acesse o módulo "Telemedicina" e clique em "Entrar na Sala". O sistema testará seu áudio e vídeo antes de conectar com o profissional.'
        },
        {
          question: 'Posso gravar a consulta?',
          answer: 'Por questões de privacidade e LGPD, as consultas não podem ser gravadas pelos pacientes. Apenas o profissional pode fazer anotações no prontuário eletrônico.'
        }
      ]
    },
    {
      category: 'Prontuário e Exames',
      questions: [
        {
          question: 'Como acesso meu prontuário médico?',
          answer: 'Acesse o módulo "Prontuário Médico" para visualizar todo seu histórico de consultas, diagnósticos, prescrições e exames. Você também pode baixar relatórios em PDF.'
        },
        {
          question: 'Quando os resultados de exames ficam disponíveis?',
          answer: 'O prazo varia conforme o tipo de exame. Você receberá uma notificação assim que o resultado estiver disponível. Exames simples costumam ficar prontos em 24-48 horas.'
        },
        {
          question: 'Posso compartilhar meu prontuário com outro médico?',
          answer: 'Sim, você pode gerar um código de acesso temporário no módulo "Prontuário" e compartilhar com outros profissionais de saúde.'
        }
      ]
    },
    {
      category: 'Segurança e Privacidade',
      questions: [
        {
          question: 'Meus dados estão seguros?',
          answer: 'Sim, utilizamos criptografia de ponta a ponta para todos os dados sensíveis e seguimos rigorosamente as normas da LGPD. Nossos servidores são auditados regularmente.'
        },
        {
          question: 'Quem pode acessar meu prontuário?',
          answer: 'Apenas você e os profissionais de saúde diretamente envolvidos no seu atendimento têm acesso ao seu prontuário. Todos os acessos são registrados e auditados.'
        },
        {
          question: 'Como solicito a exclusão dos meus dados?',
          answer: 'Você pode solicitar a exclusão dos seus dados acessando "Perfil" > "Privacidade" > "Excluir Conta". Note que alguns dados precisam ser mantidos por exigência legal.'
        }
      ]
    }
  ];

  const tutorials = [
    {
      title: 'Primeiros Passos no Sistema',
      duration: '5 min',
      type: 'video',
      url: '#'
    },
    {
      title: 'Como Agendar sua Primeira Consulta',
      duration: '3 min',
      type: 'video',
      url: '#'
    },
    {
      title: 'Guia Completo de Telemedicina',
      duration: '8 min',
      type: 'video',
      url: '#'
    },
    {
      title: 'Acessando Resultados de Exames',
      duration: '4 min',
      type: 'video',
      url: '#'
    }
  ];

  const documentation = [
    {
      title: 'Manual do Usuário',
      description: 'Guia completo de todas as funcionalidades',
      pages: 45
    },
    {
      title: 'Política de Privacidade',
      description: 'Informações sobre tratamento de dados pessoais',
      pages: 12
    },
    {
      title: 'Termos de Uso',
      description: 'Condições para utilização do sistema',
      pages: 8
    }
  ];

  const filteredFAQ = faqItems.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const handleSubmitTicket = () => {
    if (!ticketSubject || !ticketMessage) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    toast.success('Ticket de suporte criado com sucesso! Você receberá uma resposta em até 24 horas.');
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1>Ajuda e Suporte</h1>
        <p className="text-muted-foreground">
          Encontre respostas, tutoriais e entre em contato com nossa equipe
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="cursor-pointer hover:border-blue-500 transition-colors">
          <CardContent className="pt-6 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3>Chat Online</h3>
            <p className="text-muted-foreground">
              Atendimento imediato
            </p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-green-500 transition-colors">
          <CardContent className="pt-6 text-center">
            <Phone className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h3>0800 123 4567</h3>
            <p className="text-muted-foreground">
              Seg-Sex, 8h às 18h
            </p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-purple-500 transition-colors">
          <CardContent className="pt-6 text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-purple-500" />
            <h3>E-mail</h3>
            <p className="text-muted-foreground">
              suporte@vidaplus.com
            </p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-orange-500 transition-colors">
          <CardContent className="pt-6 text-center">
            <Video className="h-12 w-12 mx-auto mb-4 text-orange-500" />
            <h3>Tutoriais</h3>
            <p className="text-muted-foreground">
              Vídeos explicativos
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq" className="gap-2">
            <HelpCircle className="h-4 w-4" />
            Perguntas Frequentes
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="gap-2">
            <Video className="h-4 w-4" />
            Tutoriais
          </TabsTrigger>
          <TabsTrigger value="docs" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Documentação
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Contato
          </TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Encontre respostas rápidas para as dúvidas mais comuns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar perguntas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {filteredFAQ.map((category, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge>{category.category}</Badge>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, qIdx) => (
                      <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              {filteredFAQ.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="mb-2">Nenhuma pergunta encontrada</h3>
                  <p className="text-muted-foreground">
                    Tente buscar com outras palavras ou entre em contato com o suporte
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tutorials Tab */}
        <TabsContent value="tutorials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tutoriais em Vídeo</CardTitle>
              <CardDescription>
                Aprenda a usar o sistema com nossos guias em vídeo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {tutorials.map((tutorial, idx) => (
                  <Card key={idx} className="cursor-pointer hover:border-blue-500 transition-colors">
                    <CardContent className="pt-6">
                      <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                        <Video className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="mb-2">{tutorial.title}</h3>
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Video className="h-4 w-4" />
                          Vídeo
                        </span>
                        <span>{tutorial.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="docs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentação</CardTitle>
              <CardDescription>
                Manuais e documentos importantes do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentation.map((doc, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <FileText className="h-8 w-8 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="mb-2">{doc.title}</h3>
                            <p className="text-muted-foreground mb-2">{doc.description}</p>
                            <p className="text-muted-foreground">{doc.pages} páginas</p>
                          </div>
                        </div>
                        <Button variant="outline">
                          Baixar PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Abrir Ticket de Suporte</CardTitle>
                <CardDescription>
                  Nossa equipe responderá em até 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto *</Label>
                  <Input
                    id="subject"
                    placeholder="Ex: Problema ao agendar consulta"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    placeholder="Descreva seu problema ou dúvida em detalhes..."
                    rows={8}
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                  />
                </div>
                <Button onClick={handleSubmitTicket} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Ticket
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Canais de Atendimento</CardTitle>
                  <CardDescription>
                    Escolha o canal mais conveniente para você
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <Phone className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h3>Telefone</h3>
                      <p className="text-muted-foreground mb-2">0800 123 4567</p>
                      <p className="text-muted-foreground">
                        Segunda a Sexta: 8h às 18h<br />
                        Sábados: 8h às 12h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <Mail className="h-6 w-6 text-purple-500 mt-1" />
                    <div>
                      <h3>E-mail</h3>
                      <p className="text-muted-foreground mb-2">suporte@vidaplus.com.br</p>
                      <p className="text-muted-foreground">
                        Resposta em até 24 horas úteis
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <MessageSquare className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h3>Chat Online</h3>
                      <p className="text-muted-foreground mb-2">Atendimento imediato</p>
                      <Button className="mt-2">Iniciar Chat</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status do Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Todos os sistemas operacionais</span>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Última atualização: há 5 minutos
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
