export type UserRole = 'patient' | 'professional' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cpf: string;
  phone: string;
  avatar?: string;
  specialty?: string; // Para profissionais
  crm?: string; // Para médicos
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  gender: 'M' | 'F' | 'Outro';
  phone: string;
  address: string;
  bloodType?: string;
  allergies?: string[];
  chronicConditions?: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Professional {
  id: string;
  name: string;
  email: string;
  cpf: string;
  specialty: string;
  crm: string;
  phone: string;
  avatar?: string;
  workSchedule: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  professionalId: string;
  professionalName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'consulta' | 'exame' | 'teleconsulta' | 'retorno';
  status: 'agendado' | 'confirmado' | 'em-andamento' | 'concluido' | 'cancelado';
  notes?: string;
  location?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  appointmentId: string;
  date: string;
  professionalId: string;
  professionalName: string;
  complaints: string;
  diagnosis: string;
  treatment: string;
  prescriptions: Prescription[];
  exams?: ExamRequest[];
  notes?: string;
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface ExamRequest {
  id: string;
  examType: string;
  requestDate: string;
  status: 'solicitado' | 'agendado' | 'realizado' | 'cancelado';
  scheduledDate?: string;
  result?: string;
  notes?: string;
}

export interface HospitalBed {
  id: string;
  number: string;
  wing: string;
  floor: number;
  type: 'uti' | 'enfermaria' | 'apartamento' | 'observacao';
  status: 'disponivel' | 'ocupado' | 'manutencao' | 'higienizacao';
  patientId?: string;
  patientName?: string;
  admissionDate?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'exam' | 'prescription' | 'alert' | 'system';
  read: boolean;
  date: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}
