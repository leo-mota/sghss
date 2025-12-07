import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  DollarSign, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  Calendar,
  User,
  Download,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Receipt
} from 'lucide-react';

interface Invoice {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  paymentMethod?: string;
  services: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

export function BillingModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('this-month');

  const mockInvoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      patientName: 'Maria Santos',
      patientId: 'p1',
      date: '2024-12-01',
      dueDate: '2024-12-15',
      amount: 1250.00,
      status: 'paid',
      paymentMethod: 'Cartão de Crédito',
      services: [
        { description: 'Consulta Cardiologia', quantity: 1, unitPrice: 350.00, total: 350.00 },
        { description: 'Eletrocardiograma', quantity: 1, unitPrice: 150.00, total: 150.00 },
        { description: 'Ecocardiograma', quantity: 1, unitPrice: 750.00, total: 750.00 }
      ]
    },
    {
      id: 'INV-2024-002',
      patientName: 'João Pedro Silva',
      patientId: 'p2',
      date: '2024-12-03',
      dueDate: '2024-12-17',
      amount: 580.00,
      status: 'pending',
      services: [
        { description: 'Consulta Dermatologia', quantity: 1, unitPrice: 300.00, total: 300.00 },
        { description: 'Biópsia de Pele', quantity: 1, unitPrice: 280.00, total: 280.00 }
      ]
    },
    {
      id: 'INV-2024-003',
      patientName: 'Ana Paula Costa',
      patientId: 'p3',
      date: '2024-11-20',
      dueDate: '2024-12-04',
      amount: 2100.00,
      status: 'overdue',
      services: [
        { description: 'Consulta Clínica Geral', quantity: 2, unitPrice: 250.00, total: 500.00 },
        { description: 'Exames Laboratoriais', quantity: 1, unitPrice: 450.00, total: 450.00 },
        { description: 'Ressonância Magnética', quantity: 1, unitPrice: 1150.00, total: 1150.00 }
      ]
    },
    {
      id: 'INV-2024-004',
      patientName: 'Carlos Mendes',
      patientId: 'p4',
      date: '2024-12-05',
      dueDate: '2024-12-19',
      amount: 4500.00,
      status: 'pending',
      services: [
        { description: 'Internação (3 dias)', quantity: 3, unitPrice: 800.00, total: 2400.00 },
        { description: 'Procedimento Cirúrgico', quantity: 1, unitPrice: 1800.00, total: 1800.00 },
        { description: 'Medicamentos', quantity: 1, unitPrice: 300.00, total: 300.00 }
      ]
    },
    {
      id: 'INV-2024-005',
      patientName: 'Patricia Oliveira',
      patientId: 'p5',
      date: '2024-12-06',
      dueDate: '2024-12-20',
      amount: 850.00,
      status: 'paid',
      paymentMethod: 'PIX',
      services: [
        { description: 'Fisioterapia (5 sessões)', quantity: 5, unitPrice: 120.00, total: 600.00 },
        { description: 'Consulta Ortopedia', quantity: 1, unitPrice: 250.00, total: 250.00 }
      ]
    }
  ];

  const [invoices] = useState<Invoice[]>(mockInvoices);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500 gap-1"><CheckCircle2 className="h-3 w-3" />Pago</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 gap-1"><Clock className="h-3 w-3" />Pendente</Badge>;
      case 'overdue':
        return <Badge variant="destructive" className="gap-1"><AlertCircle className="h-3 w-3" />Vencido</Badge>;
      case 'cancelled':
        return <Badge variant="outline">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatistics = () => {
    const totalRevenue = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((acc, inv) => acc + inv.amount, 0);
    
    const pendingRevenue = invoices
      .filter(inv => inv.status === 'pending')
      .reduce((acc, inv) => acc + inv.amount, 0);
    
    const overdueRevenue = invoices
      .filter(inv => inv.status === 'overdue')
      .reduce((acc, inv) => acc + inv.amount, 0);

    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const monthlyRevenue = invoices
      .filter(inv => {
        const invDate = new Date(inv.date);
        return invDate.getMonth() === thisMonth && 
               invDate.getFullYear() === thisYear && 
               inv.status === 'paid';
      })
      .reduce((acc, inv) => acc + inv.amount, 0);

    return {
      totalRevenue,
      pendingRevenue,
      overdueRevenue,
      monthlyRevenue,
      totalInvoices: invoices.length,
      paidInvoices: invoices.filter(inv => inv.status === 'paid').length,
      pendingInvoices: invoices.filter(inv => inv.status === 'pending').length,
      overdueInvoices: invoices.filter(inv => inv.status === 'overdue').length
    };
  };

  const stats = getStatistics();

  const handleDownloadInvoice = (invoice: Invoice) => {
    alert(`Baixando fatura ${invoice.id}`);
  };

  const handleSendInvoice = (invoice: Invoice) => {
    alert(`Fatura ${invoice.id} enviada para ${invoice.patientName}`);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1>Faturamento e Financeiro</h1>
        <p className="text-muted-foreground">
          Gestão de faturas, pagamentos e relatórios financeiros
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Receita Total</p>
                <h2>{formatCurrency(stats.totalRevenue)}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Este Mês</p>
                <h2>{formatCurrency(stats.monthlyRevenue)}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-muted-foreground">A Receber</p>
                <h2>{formatCurrency(stats.pendingRevenue)}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Vencidos</p>
                <h2>{formatCurrency(stats.overdueRevenue)}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList>
          <TabsTrigger value="invoices">Faturas</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
        </TabsList>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por paciente ou número da fatura..."
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
                    <SelectItem value="paid">Pago</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="overdue">Vencido</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-month">Este Mês</SelectItem>
                    <SelectItem value="last-month">Mês Passado</SelectItem>
                    <SelectItem value="this-quarter">Este Trimestre</SelectItem>
                    <SelectItem value="this-year">Este Ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredInvoices.map((invoice) => (
                  <Card key={invoice.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3>{invoice.id}</h3>
                              {getStatusBadge(invoice.status)}
                            </div>
                            <div className="flex items-center gap-4 text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {invoice.patientName}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Emissão: {new Date(invoice.date).toLocaleDateString('pt-BR')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Vencimento: {new Date(invoice.dueDate).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-muted-foreground">Valor Total</p>
                            <h2 className="text-green-600">{formatCurrency(invoice.amount)}</h2>
                          </div>
                        </div>

                        {/* Services */}
                        <div>
                          <p className="text-muted-foreground mb-3">Serviços</p>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Descrição</TableHead>
                                <TableHead className="text-right">Qtd</TableHead>
                                <TableHead className="text-right">Valor Unit.</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {invoice.services.map((service, index) => (
                                <TableRow key={index}>
                                  <TableCell>{service.description}</TableCell>
                                  <TableCell className="text-right">{service.quantity}</TableCell>
                                  <TableCell className="text-right">{formatCurrency(service.unitPrice)}</TableCell>
                                  <TableCell className="text-right">{formatCurrency(service.total)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>

                        {/* Payment Info */}
                        {invoice.paymentMethod && (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-green-600" />
                              <p className="text-green-900">
                                Pago via {invoice.paymentMethod}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 justify-end pt-4 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadInvoice(invoice)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Baixar PDF
                          </Button>
                          {invoice.status !== 'paid' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSendInvoice(invoice)}
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                Enviar por E-mail
                              </Button>
                              <Button size="sm">
                                Registrar Pagamento
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredInvoices.length === 0 && (
                  <div className="text-center py-12">
                    <Receipt className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="mb-2">Nenhuma fatura encontrada</h3>
                    <p className="text-muted-foreground">
                      Tente ajustar os filtros de busca
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumo Financeiro</CardTitle>
                <CardDescription>Visão geral do período</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-muted-foreground">Faturas Emitidas</p>
                    <h3>{stats.totalInvoices}</h3>
                  </div>
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-muted-foreground">Faturas Pagas</p>
                    <h3>{stats.paidInvoices}</h3>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-muted-foreground">Faturas Pendentes</p>
                    <h3>{stats.pendingInvoices}</h3>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-muted-foreground">Faturas Vencidas</p>
                    <h3>{stats.overdueInvoices}</h3>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Receitas por Categoria</CardTitle>
                <CardDescription>Distribuição de serviços</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-muted-foreground">Consultas</p>
                    <h3>R$ 8.450,00</h3>
                  </div>
                  <Badge>45%</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-muted-foreground">Exames</p>
                    <h3>R$ 5.280,00</h3>
                  </div>
                  <Badge>28%</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-muted-foreground">Procedimentos</p>
                    <h3>R$ 3.890,00</h3>
                  </div>
                  <Badge>21%</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-muted-foreground">Internações</p>
                    <h3>R$ 1.150,00</h3>
                  </div>
                  <Badge>6%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
              <CardDescription>Formas de pagamento aceitas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-6 border rounded-lg text-center">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <h3>Cartão de Crédito</h3>
                  <p className="text-muted-foreground">Visa, Master, Elo</p>
                </div>
                <div className="p-6 border rounded-lg text-center">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3>PIX</h3>
                  <p className="text-muted-foreground">Pagamento instantâneo</p>
                </div>
                <div className="p-6 border rounded-lg text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  <h3>Boleto</h3>
                  <p className="text-muted-foreground">Vencimento flexível</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
