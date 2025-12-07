import { User } from '../types';
import { Button } from './ui/button';
import { 
  Hospital, 
  Users, 
  Calendar, 
  FileText, 
  Video, 
  BedDouble, 
  BarChart3, 
  Shield, 
  Bell,
  LogOut,
  Stethoscope,
  UserCircle,
  TestTube,
  Pill,
  Home,
  DollarSign,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

interface SidebarProps {
  user: User;
  activeModule: string;
  onModuleChange: (module: string) => void;
  onLogout: () => void;
}

export function Sidebar({ user, activeModule, onModuleChange, onLogout }: SidebarProps) {
  const getMenuItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'notifications', label: 'Notificações', icon: Bell },
    ];

    if (user.role === 'patient') {
      return [
        ...commonItems,
        { id: 'appointments', label: 'Minhas Consultas', icon: Calendar },
        { id: 'medical-records', label: 'Prontuário', icon: FileText },
        { id: 'prescriptions', label: 'Prescrições', icon: Stethoscope },
        { id: 'telemedicine', label: 'Telemedicina', icon: Video },
        { id: 'profile', label: 'Meu Perfil', icon: UserCircle },
        { id: 'help', label: 'Ajuda', icon: HelpCircle },
      ];
    }

    if (user.role === 'professional') {
      return [
        ...commonItems,
        { id: 'schedule', label: 'Minha Agenda', icon: Calendar },
        { id: 'patients', label: 'Pacientes', icon: Users },
        { id: 'medical-records', label: 'Prontuários', icon: FileText },
        { id: 'prescriptions', label: 'Prescrições', icon: Stethoscope },
        { id: 'telemedicine', label: 'Telemedicina', icon: Video },
        { id: 'laboratory', label: 'Laboratório', icon: TestTube },
        { id: 'home-care', label: 'Home Care', icon: Home },
        { id: 'profile', label: 'Meu Perfil', icon: UserCircle },
        { id: 'help', label: 'Ajuda', icon: HelpCircle },
      ];
    }

    if (user.role === 'admin') {
      return [
        ...commonItems,
        { id: 'patients', label: 'Pacientes', icon: Users },
        { id: 'professionals', label: 'Profissionais', icon: Stethoscope },
        { id: 'appointments', label: 'Agendamentos', icon: Calendar },
        { id: 'prescriptions', label: 'Prescrições', icon: Stethoscope },
        { id: 'laboratory', label: 'Laboratório', icon: TestTube },
        { id: 'pharmacy', label: 'Farmácia', icon: Pill },
        { id: 'home-care', label: 'Home Care', icon: Home },
        { id: 'beds', label: 'Gestão de Leitos', icon: BedDouble },
        { id: 'billing', label: 'Faturamento', icon: DollarSign },
        { id: 'reports', label: 'Relatórios', icon: BarChart3 },
        { id: 'audit', label: 'Auditoria', icon: Shield },
        { id: 'settings', label: 'Configurações', icon: Settings },
        { id: 'help', label: 'Ajuda', icon: HelpCircle },
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  const getRoleName = (role: string) => {
    const roles = {
      patient: 'Paciente',
      professional: 'Profissional de Saúde',
      admin: 'Administrador',
    };
    return roles[role as keyof typeof roles] || role;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Hospital className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-blue-900">VidaPlus</h2>
            <p className="text-xs text-gray-500">SGHSS</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Avatar>
            <AvatarFallback className="bg-blue-100 text-blue-700">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{user.name}</p>
            <p className="text-xs text-gray-500">{getRoleName(user.role)}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? 'secondary' : 'ghost'}
              className={`w-full justify-start mb-1 ${
                isActive ? 'bg-blue-50 text-blue-700' : ''
              }`}
              onClick={() => onModuleChange(item.id)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </div>
  );
}