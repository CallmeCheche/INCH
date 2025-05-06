
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  Activity, 
  CreditCard, 
  LineChart, 
  Settings, 
  HelpCircle,
  Bell,
  Search,
  ChevronDown,
  Check,
  X,
  BarChart3,
  PieChart,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

// Sample data for the dashboard
const recentAppointments = [
  {
    id: 1,
    patientName: "Grace Osei",
    doctorName: "Dr. Amara Nwosu",
    date: "2025-04-04",
    time: "09:00 AM",
    type: "Teleconsultation",
    status: "Completed"
  },
  {
    id: 2,
    patientName: "Kofi Mensah",
    doctorName: "Dr. Kwame Osei",
    date: "2025-04-04",
    time: "10:30 AM",
    type: "In-Person",
    status: "No-Show"
  },
  {
    id: 3,
    patientName: "Amina Diop",
    doctorName: "Dr. Fatima Diallo",
    date: "2025-04-04",
    time: "11:15 AM",
    type: "Teleconsultation",
    status: "In-Progress"
  },
  {
    id: 4,
    patientName: "Ibrahim Toure",
    doctorName: "Dr. Chijioke Okonkwo",
    date: "2025-04-04",
    time: "02:00 PM",
    type: "In-Person",
    status: "Scheduled"
  },
  {
    id: 5,
    patientName: "Zainab Nkosi",
    doctorName: "Dr. Nadia Mensah",
    date: "2025-04-04",
    time: "03:30 PM",
    type: "Teleconsultation",
    status: "Scheduled"
  }
];

const recentDoctors = [
  {
    id: 1,
    name: "Dr. Samuel Kamau",
    specialty: "Orthopedic Surgeon",
    registrationDate: "2025-03-28",
    status: "Pending Verification"
  },
  {
    id: 2,
    name: "Dr. Aisha Mohammed",
    specialty: "Pediatrician",
    registrationDate: "2025-03-29",
    status: "Active"
  },
  {
    id: 3,
    name: "Dr. Emmanuel Okafor",
    specialty: "Dentist",
    registrationDate: "2025-03-30",
    status: "Active"
  }
];

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-gray-900 text-white fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 w-64 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center">
          <Logo />
          <span className="ml-2 font-bold text-xl">HEALTHCONNECT</span>
        </div>
        
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
              <span className="font-semibold text-white">A</span>
            </div>
            <div>
              <div className="font-medium">Admin User</div>
              <div className="text-xs text-gray-400">System Administrator</div>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <a href="#" className="block px-4 py-2 rounded-md bg-primary text-white font-medium flex items-center">
                <Activity className="w-5 h-5 mr-3" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 flex items-center">
                <Users className="w-5 h-5 mr-3" />
                Users Management
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 flex items-center">
                <UserPlus className="w-5 h-5 mr-3" />
                Provider Verification
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 flex items-center">
                <Calendar className="w-5 h-5 mr-3" />
                Appointments
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 flex items-center">
                <CreditCard className="w-5 h-5 mr-3" />
                Payments & Billing
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 flex items-center">
                <LineChart className="w-5 h-5 mr-3" />
                Analytics & Reports
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 flex items-center">
                <Settings className="w-5 h-5 mr-3" />
                System Settings
              </a>
            </li>
          </ul>
          
          <div className="mt-8 pt-4 border-t border-gray-800">
            <ul className="space-y-1">
              <li>
                <a href="#" className="block px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-3" />
                  Help & Support
                </a>
              </li>
              <li>
                <a href="/" className="block px-4 py-2 rounded-md text-gray-300 hover:bg-gray-800 flex items-center">
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top Navigation */}
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="lg:hidden mr-4 p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                />
              </div>
              <button className="relative p-2">
                <Bell className="w-6 h-6 text-gray-600" />
                <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </div>
              </button>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="p-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Total Users</p>
                  <h3 className="text-3xl font-bold mt-1">8,249</h3>
                  <div className="flex items-center mt-2 text-green-600">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">12.5% </span>
                    <span className="text-xs text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Appointments</p>
                  <h3 className="text-3xl font-bold mt-1">1,823</h3>
                  <div className="flex items-center mt-2 text-green-600">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">8.2% </span>
                    <span className="text-xs text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Revenue</p>
                  <h3 className="text-3xl font-bold mt-1">₿24.8M</h3>
                  <div className="flex items-center mt-2 text-red-600">
                    <ArrowDown className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">3.1% </span>
                    <span className="text-xs text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <CreditCard className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Providers</p>
                  <h3 className="text-3xl font-bold mt-1">482</h3>
                  <div className="flex items-center mt-2 text-green-600">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">4.6% </span>
                    <span className="text-xs text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <UserPlus className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Appointment Statistics</h2>
                <div className="flex items-center">
                  <button className="text-gray-500 hover:text-gray-700 flex items-center text-sm">
                    This Month <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="h-72 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Appointment trend chart would appear here</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Revenue Breakdown</h2>
                <div className="flex items-center">
                  <button className="text-gray-500 hover:text-gray-700 flex items-center text-sm">
                    This Quarter <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="h-72 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Revenue distribution chart would appear here</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Recent Appointments</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Doctor</th>
                    <th className="px-4 py-3">Date & Time</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">#{appointment.id}</td>
                      <td className="px-4 py-3 font-medium">{appointment.patientName}</td>
                      <td className="px-4 py-3">{appointment.doctorName}</td>
                      <td className="px-4 py-3">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </td>
                      <td className="px-4 py-3">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.type === 'Teleconsultation' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {appointment.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : appointment.status === 'No-Show' 
                                ? 'bg-red-100 text-red-800' 
                                : appointment.status === 'In-Progress'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-gray-500 hover:text-gray-700">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Provider Verification & User Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Pending Provider Verification</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentDoctors.map((doctor) => (
                  <div key={doctor.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{doctor.name}</div>
                      <div className="text-gray-500 text-sm">{doctor.specialty}</div>
                      <div className="text-gray-500 text-xs">Registered: {new Date(doctor.registrationDate).toLocaleDateString()}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {doctor.status === 'Pending Verification' ? (
                        <>
                          <button className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200">
                            <Check className="w-5 h-5" />
                          </button>
                          <button className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                            <X className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <span className="text-green-600 text-sm font-medium flex items-center">
                          <Check className="w-4 h-4 mr-1" /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">System Activity</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm">New user registered: <span className="font-medium">John Doe</span></div>
                    <div className="text-xs text-gray-500">Today, 09:14 AM</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <Settings className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm">System settings updated by <span className="font-medium">Admin</span></div>
                    <div className="text-xs text-gray-500">Today, 08:30 AM</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="text-sm">User account deleted: <span className="font-medium">user123@example.com</span></div>
                    <div className="text-xs text-gray-500">Yesterday, 05:45 PM</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm">Doctor verification completed: <span className="font-medium">Dr. James Smith</span></div>
                    <div className="text-xs text-gray-500">Yesterday, 03:22 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
