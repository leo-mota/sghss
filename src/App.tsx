import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { OnboardingModule } from './components/OnboardingModule';
import { Sidebar } from './components/Sidebar';
import { DashboardModule } from './components/DashboardModule';
import { PatientsModule } from './components/PatientsModule';
import { ProfessionalsModule } from './components/ProfessionalsModule';
import { AppointmentsModule } from './components/AppointmentsModule';
import { ScheduleModule } from './components/ScheduleModule';
import { TelemedicineModule } from './components/TelemedicineModule';
import { BedsModule } from './components/BedsModule';
import { ReportsModule } from './components/ReportsModule';
import { NotificationsModule } from './components/NotificationsModule';
import { AuditModule } from './components/AuditModule';
import { MedicalRecordsModule } from './components/MedicalRecordsModule';
import { PrescriptionsModule } from './components/PrescriptionsModule';
import { LaboratoryModule } from './components/LaboratoryModule';
import { PharmacyModule } from './components/PharmacyModule';
import { HomeCareModule } from './components/HomeCareModule';
import { BillingModule } from './components/BillingModule';
import { ProfileModule } from './components/ProfileModule';
import { SettingsModule } from './components/SettingsModule';
import { HelpSupportModule } from './components/HelpSupportModule';
import { SystemInfoModule } from './components/SystemInfoModule';
import { PrototypesShowcase } from './components/PrototypesShowcase';
import { User } from './types';
import { getCurrentUser, logout } from './lib/auth';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      // Check if user has seen onboarding
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActiveModule('dashboard');
    // Show onboarding for new users
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setActiveModule('dashboard');
  };

  const handleCompleteOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (showOnboarding) {
    return <OnboardingModule onComplete={handleCompleteOnboarding} />;
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardModule user={currentUser} />;
      case 'patients':
        return <PatientsModule />;
      case 'professionals':
        return <ProfessionalsModule />;
      case 'appointments':
        return <AppointmentsModule />;
      case 'schedule':
        return <ScheduleModule user={currentUser} />;
      case 'telemedicine':
        return <TelemedicineModule user={currentUser} />;
      case 'beds':
        return <BedsModule />;
      case 'reports':
        return <ReportsModule />;
      case 'notifications':
        return <NotificationsModule user={currentUser} />;
      case 'audit':
        return <AuditModule />;
      case 'medical-records':
        return <MedicalRecordsModule />;
      case 'prescriptions':
        return <PrescriptionsModule />;
      case 'laboratory':
        return <LaboratoryModule />;
      case 'pharmacy':
        return <PharmacyModule />;
      case 'home-care':
        return <HomeCareModule />;
      case 'billing':
        return <BillingModule />;
      case 'profile':
        return <ProfileModule user={currentUser} />;
      case 'settings':
        return <SettingsModule />;
      case 'help':
        return <HelpSupportModule />;
      case 'system-info':
        return <SystemInfoModule />;
      case 'prototypes':
        return <PrototypesShowcase />;
      default:
        return <DashboardModule user={currentUser} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        user={currentUser}
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        onLogout={handleLogout}
      />
      <div className="flex-1 overflow-y-auto">
        {renderModule()}
      </div>
    </div>
  );
}