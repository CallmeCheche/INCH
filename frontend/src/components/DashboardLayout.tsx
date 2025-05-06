
import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Clock, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X,
  Home,
  Bell,
  MessageSquare,
  CreditCard,
  Star
} from 'lucide-react';
import { Button } from './ui/button';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface DashboardLayoutProps {
  children: ReactNode;
  userType?: 'patient' | 'doctor';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userType = 'patient' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const patientMenuItems = [
    { name: 'Overview', href: '/dashboard', icon: Home },
    { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
    { name: 'Consultations', href: '/dashboard/consultations', icon: MessageSquare },
    { name: 'Medical Records', href: '/dashboard/records', icon: Clock },
    { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
    { name: 'Reviews', href: '/dashboard/reviews', icon: Star },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'FAQs', href: '/dashboard/faqs', icon: User },
    { name: 'Contact Support', href: '/dashboard/contact-support', icon: MessageSquare },
  ];

  const doctorMenuItems = [
    { name: 'Overview', href: '/doctor-dashboard', icon: Home },
    { name: 'Appointments', href: '/doctor-dashboard/appointments', icon: Calendar },
    { name: 'Patients', href: '/doctor-dashboard/patients', icon: User },
    { name: 'Schedule', href: '/doctor-dashboard/schedule', icon: Clock },
    { name: 'Consultations', href: '/doctor-dashboard/consultations', icon: MessageSquare },
    { name: 'Payments', href: '/doctor-dashboard/payments', icon: CreditCard },
    { name: 'Reviews', href: '/doctor-dashboard/reviews', icon: Star },
    { name: 'Settings', href: '/doctor-dashboard/settings', icon: Settings }
  ];

  const menuItems = userType === 'patient' ? patientMenuItems : doctorMenuItems;

  const isActive = (path: string) => location.pathname === path;
  
  // Patient image
  const patientImage = "/lovable-uploads/010e08bf-88d1-4962-a1a1-1454d7f1416c.png";
  const userName = userType === 'patient' ? 'Ama Mensah' : 'Dr. Mensah';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top navbar */}
      <header className="bg-white shadow-sm z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {isMobile && (
                <button 
                  onClick={toggleSidebar}
                  className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <Menu className="h-6 w-6" />
                </button>
              )}
              <Link to="/" className="flex items-center">
                <Logo />
                <span className="ml-2 font-bold text-xl text-primary">
                  HEALTHCONNECT
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none">
                <Bell className="h-5 w-5" />
              </button>
              <div className="relative">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    {userType === 'patient' ? (
                      <AvatarImage src={patientImage} alt="Ama Mensah" />
                    ) : (
                      <AvatarFallback className="bg-primary text-white">AM</AvatarFallback>
                    )}
                  </Avatar>
                  {!isMobile && (
                    <>
                      <span className="ml-2 text-sm font-medium text-gray-700">{userName}</span>
                      <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-white shadow-sm w-64 flex-shrink-0 transition-all duration-300 ease-in-out z-20",
            isMobile ? "fixed inset-y-0 left-0 transform" : "",
            isMobile && !sidebarOpen ? "-translate-x-full" : "",
            isMobile && sidebarOpen ? "translate-x-0" : ""
          )}
        >
          {isMobile && (
            <div className="p-4 flex justify-end">
              <button onClick={closeSidebar} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
          )}
          <div className="py-6 px-4">
            <div className="mb-10">
              <div className="flex items-center justify-center mb-4">
                <Avatar className="h-20 w-20">
                  {userType === 'patient' ? (
                    <AvatarImage src={patientImage} alt="Ama Mensah" className="object-cover" />
                  ) : (
                    <AvatarFallback className="bg-primary text-white text-2xl font-medium">AM</AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900">{userName}</h3>
                <p className="text-sm text-gray-500">
                  {userType === 'patient' ? 'Patient' : 'Healthcare Provider'}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive(item.href)
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={isMobile ? closeSidebar : undefined}
                >
                  <item.icon className={cn("h-5 w-5 mr-3", isActive(item.href) ? "text-white" : "text-gray-500")} />
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Sidebar overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-x-auto">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
