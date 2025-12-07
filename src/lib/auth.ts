import { User } from '../types';

// Mock users para demonstração
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Carlos Silva',
    email: 'carlos.silva@vidaplus.com',
    role: 'professional',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
    specialty: 'Cardiologia',
    crm: 'CRM/SP 123456',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    role: 'patient',
    cpf: '987.654.321-00',
    phone: '(11) 91234-5678',
  },
  {
    id: '3',
    name: 'Admin Sistema',
    email: 'admin@vidaplus.com',
    role: 'admin',
    cpf: '111.222.333-44',
    phone: '(11) 3000-0000',
  },
];

export const login = (email: string, password: string): User | null => {
  // Mock login - aceita qualquer senha para demonstração
  const user = mockUsers.find(u => u.email === email);
  return user || null;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: User) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};
