import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Pill, 
  Search, 
  Plus, 
  AlertTriangle, 
  Package, 
  TrendingDown, 
  ShoppingCart,
  FileText,
  Calendar,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: string;
  manufacturer: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  unitPrice: number;
  expiryDate: string;
  batchNumber: string;
  location: string;
  requiresPrescription: boolean;
}

interface Dispensation {
  id: string;
  patientName: string;
  medication: string;
  quantity: number;
  date: string;
  prescriptionId: string;
  dispensedBy: string;
}

export function PharmacyModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isNewMedicationOpen, setIsNewMedicationOpen] = useState(false);
  const [isDispenseOpen, setIsDispenseOpen] = useState(false);

  const mockMedications: Medication[] = [
    {
      id: 'MED001',
      name: 'Losartana Potássica',
      genericName: 'Losartana',
      category: 'Anti-hipertensivos',
      manufacturer: 'EMS',
      currentStock: 450,
      minStock: 100,
      maxStock: 1000,
      unit: 'comprimidos',
      unitPrice: 0.85,
      expiryDate: '2025-08-15',
      batchNumber: 'L2024A123',
      location: 'Prateleira A3',
      requiresPrescription: true
    },
    {
      id: 'MED002',
      name: 'Dipirona Sódica',
      genericName: 'Dipirona',
      category: 'Analgésicos',
      manufacturer: 'Medley',
      currentStock: 85,
      minStock: 150,
      maxStock: 800,
      unit: 'comprimidos',
      unitPrice: 0.35,
      expiryDate: '2025-03-20',
      batchNumber: 'D2024B456',
      location: 'Prateleira B1',
      requiresPrescription: false
    },
    {
      id: 'MED003',
      name: 'Amoxicilina',
      genericName: 'Amoxicilina',
      category: 'Antibióticos',
      manufacturer: 'Neo Química',
      currentStock: 280,
      minStock: 200,
      maxStock: 600,
      unit: 'cápsulas',
      unitPrice: 1.20,
      expiryDate: '2025-11-30',
      batchNumber: 'A2024C789',
      location: 'Prateleira C2',
      requiresPrescription: true
    },
    {
      id: 'MED004',
      name: 'Omeprazol',
      genericName: 'Omeprazol',
      category: 'Antiácidos',
      manufacturer: 'Eurofarma',
      currentStock: 320,
      minStock: 150,
      maxStock: 700,
      unit: 'cápsulas',
      unitPrice: 0.95,
      expiryDate: '2025-06-10',
      batchNumber: 'O2024D012',
      location: 'Prateleira D1',
      requiresPrescription: false
    },
    {
      id: 'MED005',
      name: 'Metformina',
      genericName: 'Metformina',
      category: 'Antidiabéticos',
      manufacturer: 'Glenmark',
      currentStock: 15,
      minStock: 100,
      maxStock: 500,
      unit: 'comprimidos',
      unitPrice: 0.75,
      expiryDate: '2025-01-15',
      batchNumber: 'M2024E345',
      location: 'Prateleira E3',
      requiresPrescription: true
    }
  ];

  const mockDispensations: Dispensation[] = [
    {
      id: 'DISP001',
      patientName: 'Maria Santos',
      medication: 'Losartana Potássica 50mg',
      quantity: 30,
      date: '2024-12-07',
      prescriptionId: 'RX001',
      dispensedBy: 'Farm. João Silva'
    },
    {
      id: 'DISP002',
      patientName: 'Ana Paula Costa',
      medication: 'Metformina 850mg',
      quantity: 60,
      date: '2024-12-06',
      prescriptionId: 'RX003',
      dispensedBy: 'Farm. Maria Costa'
    }
  ];

  const [medications, setMedications] = useState<Medication[]>(mockMedications);
  const [dispensations] = useState<Dispensation[]>(mockDispensations);

  const filteredMedications = medications.filter(med => {
    const matchesSearch = 
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const lowStockMedications = medications.filter(med => med.currentStock < med.minStock);
  const expiringMedications = medications.filter(med => {
    const expiryDate = new Date(med.expiryDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiryDate <= threeMonthsFromNow;
  });

  const getStockStatus = (med: Medication) => {
    if (med.currentStock < med.minStock) {
      return { label: 'Estoque Baixo', color: 'bg-red-500' };
    } else if (med.currentStock < med.minStock * 1.5) {
      return { label: 'Atenção', color: 'bg-yellow-500' };
    } else {
      return { label: 'Normal', color: 'bg-green-500' };
    }
  };

  const getStockPercentage = (med: Medication) => {
    return ((med.currentStock / med.maxStock) * 100).toFixed(0);
  };

  const getStatistics = () => {
    const totalValue = medications.reduce((acc, med) => acc + (med.currentStock * med.unitPrice), 0);
    return {
      totalItems: medications.length,
      lowStock: lowStockMedications.length,
      expiring: expiringMedications.length,
      totalValue: totalValue.toFixed(2),
      dispensationsToday: dispensations.filter(d => d.date === new Date().toISOString().split('T')[0]).length
    };
  };

  const stats = getStatistics();

  const handleDispenseMedication = () => {
    toast.success('Medicamento dispensado com sucesso!');
    setIsDispenseOpen(false);
  };

  const handleAddMedication = () => {
    toast.success('Medicamento adicionado ao estoque!');
    setIsNewMedicationOpen(false);
  };

  const handleReorderStock = (medication: Medication) => {
    toast.success(`Ordem de compra criada para ${medication.name}`);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1>Farmácia e Estoque</h1>
          <p className="text-muted-foreground">
            Gestão de medicamentos, dispensação e controle de estoque
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDispenseOpen} onOpenChange={setIsDispenseOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Dispensar Medicamento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dispensar Medicamento</DialogTitle>
                <DialogDescription>
                  Registre a dispensação de medicamento com receita
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>ID da Prescrição *</Label>
                  <Input placeholder="Ex: RX001" />
                </div>
                <div className="space-y-2">
                  <Label>Paciente *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p1">Maria Santos</SelectItem>
                      <SelectItem value="p2">João Pedro Silva</SelectItem>
                      <SelectItem value="p3">Ana Paula Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Medicamento *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o medicamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {medications.map(med => (
                        <SelectItem key={med.id} value={med.id}>
                          {med.name} - Estoque: {med.currentStock} {med.unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quantidade *</Label>
                  <Input type="number" placeholder="Ex: 30" />
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setIsDispenseOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleDispenseMedication}>
                    Confirmar Dispensação
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isNewMedicationOpen} onOpenChange={setIsNewMedicationOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Medicamento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Medicamento ao Estoque</DialogTitle>
                <DialogDescription>
                  Registre a entrada de um novo lote de medicamento
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome Comercial *</Label>
                    <Input placeholder="Ex: Losartana Potássica" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nome Genérico *</Label>
                    <Input placeholder="Ex: Losartana" />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anti-hipertensivos">Anti-hipertensivos</SelectItem>
                        <SelectItem value="analgesicos">Analgésicos</SelectItem>
                        <SelectItem value="antibioticos">Antibióticos</SelectItem>
                        <SelectItem value="antiácidos">Antiácidos</SelectItem>
                        <SelectItem value="antidiabéticos">Antidiabéticos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fabricante *</Label>
                    <Input placeholder="Ex: EMS" />
                  </div>
                  <div className="space-y-2">
                    <Label>Quantidade *</Label>
                    <Input type="number" placeholder="Ex: 500" />
                  </div>
                  <div className="space-y-2">
                    <Label>Unidade *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comprimidos">Comprimidos</SelectItem>
                        <SelectItem value="capsulas">Cápsulas</SelectItem>
                        <SelectItem value="ml">mL</SelectItem>
                        <SelectItem value="frascos">Frascos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Preço Unitário (R$) *</Label>
                    <Input type="number" step="0.01" placeholder="Ex: 0.85" />
                  </div>
                  <div className="space-y-2">
                    <Label>Data de Validade *</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Número do Lote *</Label>
                    <Input placeholder="Ex: L2024A123" />
                  </div>
                  <div className="space-y-2">
                    <Label>Localização *</Label>
                    <Input placeholder="Ex: Prateleira A3" />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setIsNewMedicationOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddMedication}>
                    Adicionar ao Estoque
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Pill className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Itens</p>
                <h2>{stats.totalItems}</h2>
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
                <p className="text-muted-foreground">Estoque Baixo</p>
                <h2>{stats.lowStock}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-muted-foreground">A Vencer</p>
                <h2>{stats.expiring}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Valor Total</p>
                <h2>R$ {stats.totalValue}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-muted-foreground">Dispensações Hoje</p>
                <h2>{stats.dispensationsToday}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList>
          <TabsTrigger value="inventory">Estoque</TabsTrigger>
          <TabsTrigger value="dispensations">Dispensações</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, genérico ou ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Categorias</SelectItem>
                    <SelectItem value="Anti-hipertensivos">Anti-hipertensivos</SelectItem>
                    <SelectItem value="Analgésicos">Analgésicos</SelectItem>
                    <SelectItem value="Antibióticos">Antibióticos</SelectItem>
                    <SelectItem value="Antiácidos">Antiácidos</SelectItem>
                    <SelectItem value="Antidiabéticos">Antidiabéticos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Medicamento</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedications.map((med) => {
                    const status = getStockStatus(med);
                    return (
                      <TableRow key={med.id}>
                        <TableCell>{med.id}</TableCell>
                        <TableCell>
                          <div>
                            <p>{med.name}</p>
                            <p className="text-muted-foreground">{med.genericName}</p>
                          </div>
                        </TableCell>
                        <TableCell>{med.category}</TableCell>
                        <TableCell>
                          <div>
                            <p>{med.currentStock} {med.unit}</p>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div
                                className={`h-1.5 rounded-full ${status.color}`}
                                style={{ width: `${getStockPercentage(med)}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={status.color}>{status.label}</Badge>
                        </TableCell>
                        <TableCell>{new Date(med.expiryDate).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{med.location}</TableCell>
                        <TableCell className="text-right">
                          {med.currentStock < med.minStock && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReorderStock(med)}
                            >
                              Repor
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dispensations Tab */}
        <TabsContent value="dispensations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Dispensações</CardTitle>
              <CardDescription>
                Registros de medicamentos dispensados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Medicamento</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Prescrição</TableHead>
                    <TableHead>Dispensado por</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dispensations.map((disp) => (
                    <TableRow key={disp.id}>
                      <TableCell>{disp.id}</TableCell>
                      <TableCell>{new Date(disp.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{disp.patientName}</TableCell>
                      <TableCell>{disp.medication}</TableCell>
                      <TableCell>{disp.quantity}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{disp.prescriptionId}</Badge>
                      </TableCell>
                      <TableCell>{disp.dispensedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Estoque Baixo
              </CardTitle>
              <CardDescription>
                Medicamentos que precisam de reposição urgente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockMedications.map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <p>{med.name}</p>
                      <p className="text-muted-foreground">
                        Estoque atual: {med.currentStock} {med.unit} | Mínimo: {med.minStock} {med.unit}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleReorderStock(med)}
                    >
                      Repor Estoque
                    </Button>
                  </div>
                ))}
                {lowStockMedications.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum medicamento com estoque baixo
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-yellow-600" />
                Medicamentos Próximos do Vencimento
              </CardTitle>
              <CardDescription>
                Validade nos próximos 3 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expiringMedications.map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                    <div>
                      <p>{med.name}</p>
                      <p className="text-muted-foreground">
                        Lote: {med.batchNumber} | Validade: {new Date(med.expiryDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Badge className="bg-yellow-500">
                      {med.currentStock} {med.unit}
                    </Badge>
                  </div>
                ))}
                {expiringMedications.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhum medicamento próximo do vencimento
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
