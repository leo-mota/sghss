# Sistema de Gestão Hospitalar e de Serviços de Saúde (SGHSS) - VidaPlus

## 📋 Visão Geral
O **SGHSS VidaPlus** é um sistema completo de gestão hospitalar desenvolvido para administrar hospitais, clínicas de bairro, laboratórios e equipes de home care. A plataforma centraliza o cadastro e atendimento de pacientes, gestão de profissionais de saúde, administração hospitalar, telemedicina e controles de segurança com conformidade LGPD.

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação e Onboarding
- **LoginPage**: Sistema de login com múltiplos perfis (Admin, Médico, Paciente)
- **OnboardingModule**: Tutorial interativo de boas-vindas para novos usuários

### 📊 Módulos Principais
1. **DashboardModule**: Painel principal com métricas e KPIs
2. **PatientsModule**: Gestão completa de pacientes
3. **ProfessionalsModule**: Cadastro de profissionais de saúde
4. **AppointmentsModule**: Sistema de agendamentos
5. **ScheduleModule**: Agenda pessoal para profissionais
6. **MedicalRecordsModule**: Prontuário eletrônico

### 🏥 Módulos Clínicos
7. **PrescriptionsModule**: Prescrições médicas digitais
8. **LaboratoryModule**: Gestão de exames laboratoriais
9. **TelemedicineModule**: Videochamadas para consultas remotas

### 🏢 Módulos Administrativos
10. **PharmacyModule**: Controle de estoque de medicamentos
11. **HomeCareModule**: Gestão de atendimento domiciliar
12. **BedsModule**: Gestão de leitos hospitalares
13. **BillingModule**: Faturamento e controle financeiro
14. **ReportsModule**: Relatórios gerenciais

### ⚙️ Módulos de Sistema
15. **ProfileModule**: Perfil do usuário com configurações
16. **SettingsModule**: Configurações globais do sistema
17. **NotificationsModule**: Centro de notificações
18. **AuditModule**: Auditoria e logs de acesso (LGPD)
19. **HelpSupportModule**: Central de ajuda e suporte
20. **SystemInfoModule**: Informações técnicas do sistema
21. **PrototypesShowcase**: Galeria de todos os protótipos

## 🏗️ Arquitetura Técnica

### Frontend (✅ Implementado)
- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes
- **Lucide React** para ícones
- **Recharts** para gráficos
- Design responsivo e acessível (WCAG 2.1)

### Backend (⏳ Próxima Fase)
- **Supabase** para banco de dados
- **PostgreSQL** para persistência
- **Row Level Security** para segurança
- APIs RESTful
- Realtime subscriptions

## 📁 Estrutura de Arquivos
```
/
├── components/
│   ├── ui/                          # Componentes UI base (shadcn)
│   ├── LoginPage.tsx                # Tela de login
│   ├── OnboardingModule.tsx         # Tutorial de boas-vindas
│   ├── Sidebar.tsx                  # Menu lateral
│   ├── DashboardModule.tsx          # Dashboard principal
│   ├── PatientsModule.tsx           # Gestão de pacientes
│   ├── ProfessionalsModule.tsx      # Gestão de profissionais
│   ├── AppointmentsModule.tsx       # Agendamentos
│   ├── ScheduleModule.tsx           # Agenda pessoal
│   ├── MedicalRecordsModule.tsx     # Prontuário eletrônico
│   ├── PrescriptionsModule.tsx      # Prescrições médicas
│   ├── LaboratoryModule.tsx         # Laboratório clínico
│   ├── PharmacyModule.tsx           # Farmácia e estoque
│   ├── HomeCareModule.tsx           # Home care
│   ├── TelemedicineModule.tsx       # Telemedicina
│   ├── BedsModule.tsx               # Gestão de leitos
│   ├── BillingModule.tsx            # Faturamento
│   ├── ReportsModule.tsx            # Relatórios
│   ├── ProfileModule.tsx            # Perfil do usuário
│   ├── SettingsModule.tsx           # Configurações
│   ├── NotificationsModule.tsx      # Notificações
│   ├── AuditModule.tsx              # Auditoria
│   ├── HelpSupportModule.tsx        # Ajuda e suporte
│   ├── SystemInfoModule.tsx         # Info do sistema
│   └── PrototypesShowcase.tsx       # Showcase de protótipos
├── lib/
│   ├── auth.ts                      # Sistema de autenticação
│   └── mockData.ts                  # Dados mock
├── types/
│   └── index.ts                     # Definições TypeScript
├── styles/
│   └── globals.css                  # Estilos globais
├── App.tsx                          # Componente principal
└── README.md                        # Esta documentação
```

## 👥 Perfis de Usuário
- **Administrador**: Acesso completo, gestão de usuários, relatórios e auditoria
- **Profissional de Saúde**: Agenda, prontuários, prescrições, telemedicina
- **Paciente**: Visualização de agendamentos, prontuário e consultas online

## 🔒 Segurança e Conformidade
- **LGPD**: Consentimento, direito ao acesso e exclusão, auditoria completa
- **Segurança**: Autenticação com múltiplos perfis, controle de acesso, logs
- **Conformidade**: CFM, WCAG 2.1, interface responsiva

## 🚀 Próximos Passos
- Integração com Supabase
- Autenticação real
- Upload de arquivos e assinatura digital
- Integração com APIs externas
- Deploy em produção

## 🛠️ Como Usar
- Clone o repositório:
```bash
git clone https://github.com/seu-usuario/SGHSS-VidaPlus.git
```
- Instale as dependências:
```bash
npm install
```
- Execute o projeto:
```bash
npm run dev
```
### Login

Use um dos seguintes perfis para testar:

**Administrador:**

- Email: admin@vidaplus.com
- Senha: admin123

**Médico:**

- Email: doctor@vidaplus.com
- Senha: doctor123

**Paciente:**

- Email: patient@vidaplus.com
- Senha: patient123

### Navegação

- Use o menu lateral para acessar diferentes módulos
- Cada perfil tem acesso a módulos específicos
- O dashboard adapta-se ao perfil do usuário

## 📝 Observações Importantes

1. **Dados Mock**: Atualmente o sistema utiliza dados fictícios armazenados em `/lib/mockData.ts`. Na fase 2, estes serão substituídos por dados reais do Supabase.

2. **Autenticação**: A autenticação atual é simulada. A integração com Supabase Auth será implementada na fase 2.

3. **Videochamadas**: A funcionalidade de telemedicina está com interface pronta, mas a integração com WebRTC será implementada posteriormente.

4. **Upload de Arquivos**: A interface para upload está pronta, mas a integração com Supabase Storage será implementada na fase 2.
   
## 📝 Observações Finais
Este projeto foi desenvolvido por **Leonardo Mota RU 4539148** como trabalho final do curso de **Análise e Desenvolvimento de Sistemas - UNINTER**.

  
