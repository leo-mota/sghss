import { Patient, MedicalRecord, Appointment, Professional, HospitalBed, Notification, AuditLog } from '../types';

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    cpf: '987.654.321-00',
    birthDate: '1985-05-15',
    gender: 'F',
    phone: '(11) 91234-5678',
    address: 'Rua das Flores, 123 - São Paulo/SP',
    bloodType: 'O+',
    allergies: ['Penicilina', 'Lactose'],
    chronicConditions: ['Hipertensão'],
    emergencyContact: {
      name: 'João Santos',
      phone: '(11) 98765-4321',
      relationship: 'Esposo'
    }
  },
  {
    id: 'p2',
    name: 'João Pedro Silva',
    email: 'joao.silva@email.com',
    cpf: '123.456.789-99',
    birthDate: '1990-08-22',
    gender: 'M',
    phone: '(11) 99876-5432',
    address: 'Av. Paulista, 1000 - São Paulo/SP',
    bloodType: 'A+',
    allergies: [],
    chronicConditions: [],
    emergencyContact: {
      name: 'Ana Silva',
      phone: '(11) 97654-3210',
      relationship: 'Mãe'
    }
  },
  {
    id: 'p3',
    name: 'Ana Paula Costa',
    email: 'ana.costa@email.com',
    cpf: '456.789.123-00',
    birthDate: '1978-03-10',
    gender: 'F',
    phone: '(11) 96543-2109',
    address: 'Rua Vergueiro, 500 - São Paulo/SP',
    bloodType: 'B+',
    allergies: ['Dipirona'],
    chronicConditions: ['Diabetes Tipo 2'],
    emergencyContact: {
      name: 'Pedro Costa',
      phone: '(11) 95432-1098',
      relationship: 'Irmão'
    }
  }
];

export const mockProfessionals: Professional[] = [
  {
    id: 'prof1',
    name: 'Dr. Carlos Silva',
    email: 'carlos.silva@vidaplus.com',
    cpf: '123.456.789-00',
    specialty: 'Cardiologia',
    crm: 'CRM/SP 123456',
    phone: '(11) 98765-4321',
    workSchedule: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '12:00' },
      { dayOfWeek: 1, startTime: '14:00', endTime: '18:00' },
      { dayOfWeek: 3, startTime: '08:00', endTime: '12:00' },
      { dayOfWeek: 5, startTime: '14:00', endTime: '18:00' },
    ]
  },
  {
    id: 'prof2',
    name: 'Dra. Ana Costa',
    email: 'ana.costa@vidaplus.com',
    cpf: '987.654.321-11',
    specialty: 'Dermatologia',
    crm: 'CRM/SP 654321',
    phone: '(11) 97654-3210',
    workSchedule: [
      { dayOfWeek: 2, startTime: '08:00', endTime: '12:00' },
      { dayOfWeek: 4, startTime: '08:00', endTime: '12:00' },
      { dayOfWeek: 4, startTime: '14:00', endTime: '18:00' },
    ]
  },
  {
    id: 'prof3',
    name: 'Dr. Roberto Alves',
    email: 'roberto.alves@vidaplus.com',
    cpf: '456.123.789-22',
    specialty: 'Clínica Geral',
    crm: 'CRM/SP 789456',
    phone: '(11) 96543-2109',
    workSchedule: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '17:00' },
      { dayOfWeek: 2, startTime: '08:00', endTime: '17:00' },
      { dayOfWeek: 3, startTime: '08:00', endTime: '17:00' },
      { dayOfWeek: 4, startTime: '08:00', endTime: '17:00' },
      { dayOfWeek: 5, startTime: '08:00', endTime: '17:00' },
    ]
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt1',
    patientId: 'p1',
    patientName: 'Maria Santos',
    professionalId: 'prof1',
    professionalName: 'Dr. Carlos Silva',
    specialty: 'Cardiologia',
    date: '2024-12-01',
    time: '14:00',
    type: 'consulta',
    status: 'confirmado',
    location: 'Consultório 205 - Unidade Central'
  },
  {
    id: 'apt2',
    patientId: 'p1',
    patientName: 'Maria Santos',
    professionalId: 'prof2',
    professionalName: 'Dra. Ana Costa',
    specialty: 'Dermatologia',
    date: '2024-12-03',
    time: '10:00',
    type: 'teleconsulta',
    status: 'agendado'
  },
  {
    id: 'apt3',
    patientId: 'p2',
    patientName: 'João Pedro Silva',
    professionalId: 'prof1',
    professionalName: 'Dr. Carlos Silva',
    specialty: 'Cardiologia',
    date: '2024-12-01',
    time: '10:00',
    type: 'consulta',
    status: 'confirmado',
    location: 'Consultório 205 - Unidade Central'
  },
  {
    id: 'apt4',
    patientId: 'p3',
    patientName: 'Ana Paula Costa',
    professionalId: 'prof3',
    professionalName: 'Dr. Roberto Alves',
    specialty: 'Clínica Geral',
    date: '2024-12-01',
    time: '14:00',
    type: 'retorno',
    status: 'em-andamento',
    location: 'Consultório 101 - Unidade Central'
  }
];

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 'mr1',
    patientId: 'p1',
    appointmentId: 'apt1',
    date: '2024-11-15',
    professionalId: 'prof1',
    professionalName: 'Dr. Carlos Silva',
    complaints: 'Dor no peito e falta de ar aos esforços',
    diagnosis: 'Hipertensão arterial sistêmica',
    treatment: 'Ajuste de medicação anti-hipertensiva',
    prescriptions: [
      {
        id: 'presc1',
        medication: 'Losartana 50mg',
        dosage: '1 comprimido',
        frequency: '2x ao dia',
        duration: '30 dias',
        instructions: 'Tomar pela manhã e à noite'
      },
      {
        id: 'presc2',
        medication: 'Hidroclorotiazida 25mg',
        dosage: '1 comprimido',
        frequency: '1x ao dia',
        duration: '30 dias',
        instructions: 'Tomar pela manhã'
      }
    ],
    exams: [
      {
        id: 'exam1',
        examType: 'Eletrocardiograma',
        requestDate: '2024-11-15',
        status: 'realizado',
        scheduledDate: '2024-11-20',
        result: 'ECG normal, sem alterações significativas'
      }
    ],
    notes: 'Paciente orientada sobre dieta e atividade física. Retorno em 30 dias.'
  },
  {
    id: 'mr2',
    patientId: 'p1',
    appointmentId: 'apt2',
    date: '2024-10-10',
    professionalId: 'prof2',
    professionalName: 'Dra. Ana Costa',
    complaints: 'Manchas na pele',
    diagnosis: 'Melasma',
    treatment: 'Tratamento tópico e fotoproteção',
    prescriptions: [
      {
        id: 'presc3',
        medication: 'Hidroquinona 4%',
        dosage: 'Aplicação tópica',
        frequency: '1x ao dia',
        duration: '60 dias',
        instructions: 'Aplicar à noite nas áreas afetadas'
      }
    ],
    notes: 'Orientada sobre uso diário de protetor solar FPS 50+'
  }
];

export const mockHospitalBeds: HospitalBed[] = [
  {
    id: 'bed1',
    number: '101',
    wing: 'Ala A',
    floor: 1,
    type: 'enfermaria',
    status: 'ocupado',
    patientId: 'p2',
    patientName: 'João Pedro Silva',
    admissionDate: '2024-11-28'
  },
  {
    id: 'bed2',
    number: '102',
    wing: 'Ala A',
    floor: 1,
    type: 'enfermaria',
    status: 'disponivel'
  },
  {
    id: 'bed3',
    number: '201',
    wing: 'Ala B',
    floor: 2,
    type: 'apartamento',
    status: 'ocupado',
    patientId: 'p3',
    patientName: 'Ana Paula Costa',
    admissionDate: '2024-11-25'
  },
  {
    id: 'bed4',
    number: '301',
    wing: 'Ala C',
    floor: 3,
    type: 'uti',
    status: 'disponivel'
  },
  {
    id: 'bed5',
    number: '302',
    wing: 'Ala C',
    floor: 3,
    type: 'uti',
    status: 'ocupado',
    patientName: 'Carlos Mendes',
    admissionDate: '2024-11-30'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'p1',
    title: 'Consulta Confirmada',
    message: 'Sua consulta com Dr. Carlos Silva foi confirmada para 01/12 às 14:00',
    type: 'appointment',
    read: false,
    date: '2024-11-30T10:00:00'
  },
  {
    id: 'notif2',
    userId: 'p1',
    title: 'Resultado de Exame',
    message: 'O resultado do seu eletrocardiograma está disponível',
    type: 'exam',
    read: true,
    date: '2024-11-20T14:30:00'
  },
  {
    id: 'notif3',
    userId: 'prof1',
    title: 'Nova Consulta Agendada',
    message: 'João Pedro Silva agendou consulta para 01/12 às 10:00',
    type: 'appointment',
    read: false,
    date: '2024-11-29T16:20:00'
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'log1',
    userId: 'prof1',
    userName: 'Dr. Carlos Silva',
    action: 'Visualização de Prontuário',
    module: 'Prontuários',
    details: 'Prontuário do paciente Maria Santos visualizado',
    timestamp: '2024-12-01T09:30:00',
    ipAddress: '192.168.1.10'
  },
  {
    id: 'log2',
    userId: '3',
    userName: 'Admin Sistema',
    action: 'Cadastro de Profissional',
    module: 'Gestão de Profissionais',
    details: 'Novo profissional cadastrado: Dra. Mariana Costa',
    timestamp: '2024-11-30T14:15:00',
    ipAddress: '192.168.1.5'
  },
  {
    id: 'log3',
    userId: 'prof1',
    userName: 'Dr. Carlos Silva',
    action: 'Emissão de Prescrição',
    module: 'Prescrições',
    details: 'Prescrição médica emitida para paciente Maria Santos',
    timestamp: '2024-11-15T11:45:00',
    ipAddress: '192.168.1.10'
  }
];
