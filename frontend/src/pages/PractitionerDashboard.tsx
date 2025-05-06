
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock,
  User,
  Users,
  Video,
  CreditCard,
  FileText,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
  MessageSquare,
  MapPin,
  ArrowRight,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock3,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Logo from '@/components/Logo';

// Sample data
const upcomingAppointments = [
  {
    id: 1,
    patientName: "Grace Osei",
    patientAge: 34,
    patientGender: "Female",
    time: "09:00 AM",
    date: "2025-04-04",
    type: "Teleconsultation",
    reason: "Follow-up on hypertension treatment"
  },
  {
    id: 2,
    patientName: "Kofi Mensah",
    patientAge: 45,
    patientGender: "Male",
    time: "10:30 AM",
    date: "2025-04-04",
    type: "In-Person",
    reason: "Chest pain and shortness of breath"
  },
  {
    id: 3,
    patientName: "Amina Diop",
    patientAge: 28,
    patientGender: "Female",
    time: "11:15 AM",
    date: "2025-04-04",
    type: "Teleconsultation",
    reason: "Skin rash consultation"
  }
];

const recentPatients = [
  {
    id: 1,
    name: "Ibrahim Toure",
    gender: "Male",
    age: 52,
    lastVisit: "2025-03-30",
    condition: "Diabetes"
  },
  {
    id: 2,
    name: "Zainab Nkosi",
    gender: "Female",
    age: 29,
    lastVisit: "2025-04-01",
    condition: "Pregnancy"
  },
  {
    id: 3,
    name: "Samuel Koffi",
    gender: "Male",
    age: 8,
    lastVisit: "2025-04-02",
    condition: "Tonsillitis"
  },
  {
    id: 4,
    name: "Fatima Kamara",
    gender: "Female",
    age: 64,
    lastVisit: "2025-04-03",
    condition: "Hypertension"
  }
];

// Navigation items
const navItems = [
  { icon: Calendar, label: "Appointments", active: true },
  { icon: Users, label: "Patients", active: false },
  { icon: FileText, label: "Medical Records", active: false },
  { icon: Video, label: "Teleconsultation", active: false },
  { icon: CreditCard, label: "Payments", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false }
];

const PractitionerDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-white shadow-sm fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 w-64 flex flex-col border-r`}
      >
        <div className="p-4 border-b flex items-center">
          <Logo />
          <span className="ml-2 font-bold text-xl text-primary">HEALTHCONNECT</span>
        </div>
        
        <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
              <span className="font-semibold text-white">AN</span>
            </div>
            <div>
              <div className="font-medium">Dr. Amara Nwosu</div>
              <div className="text-xs text-gray-500">Cardiologist</div>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`block px-4 py-2 rounded-md flex items-center ${
                    item.active 
                      ? 'bg-primary text-white font-medium'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-4 border-t">
            <div className="px-4 py-2">
              <div className="text-xs uppercase text-gray-500 font-semibold tracking-wider">
                Availability Status
              </div>
              <div className="mt-2 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Available</span>
                <button className="ml-auto text-xs text-primary">Change</button>
              </div>
            </div>
            
            <ul className="mt-4 space-y-1">
              <li>
                <a href="#" className="block px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 flex items-center">
                  Help & Support
                </a>
              </li>
              <li>
                <Link to="/" className="block px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 flex items-center">
                  Log Out
                </Link>
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
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Practitioner Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent md:w-64 w-40"
                />
              </div>
              <button className="relative p-2">
                <Bell className="w-6 h-6 text-gray-600" />
                <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  2
                </div>
              </button>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, Dr. Nwosu!</h2>
            <p className="text-gray-600">Here's what's happening with your practice today.</p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Today's Appointments</p>
                    <h3 className="text-3xl font-bold mt-1">8</h3>
                    <div className="mt-1 text-xs text-gray-500">3 in-person, 5 virtual</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Patients Seen</p>
                    <h3 className="text-3xl font-bold mt-1">154</h3>
                    <div className="mt-1 text-xs text-gray-500">This month</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Patient Rating</p>
                    <h3 className="text-3xl font-bold mt-1">4.9</h3>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Messages</p>
                    <h3 className="text-3xl font-bold mt-1">12</h3>
                    <div className="mt-1 text-xs text-gray-500">5 unread</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Calendar and Appointments */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Calendar */}
            <Card className="bg-white lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">April 2025</h3>
                  <div className="flex space-x-2">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* Days of the week */}
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className="py-1 text-xs font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                  
                  {/* Days grid - dynamically this would be generated */}
                  {Array(35).fill(null).map((_, i) => {
                    const day = i - 2; // Adjust for month start day
                    const isCurrentMonth = day > 0 && day <= 30;
                    const isToday = day === 4; // 4th of April
                    const hasAppointments = [4, 7, 12, 18, 23].includes(day);
                    
                    return (
                      <div 
                        key={i}
                        className={`
                          py-1 text-sm rounded-full
                          ${!isCurrentMonth ? 'text-gray-300' : ''}
                          ${isToday ? 'bg-primary text-white font-medium' : ''}
                          ${hasAppointments && !isToday ? 'border-2 border-primary text-primary font-medium' : ''}
                        `}
                      >
                        {isCurrentMonth ? day : ''}
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">Today</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full border-2 border-primary mr-2"></div>
                    <span className="text-sm">Has Appointments</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Today's Appointments */}
            <Card className="bg-white lg:col-span-2">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg">Today's Appointments</h3>
                  <Button variant="outline" size="sm">
                    View Full Schedule
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4 hover:border-primary">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">{appointment.patientName}</h4>
                            <div className="text-sm text-gray-500">
                              {appointment.patientAge} years, {appointment.patientGender}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{appointment.time}</div>
                          <div 
                            className={`text-xs px-2 py-1 rounded-full ${
                              appointment.type === 'Teleconsultation' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-purple-100 text-purple-700'
                            }`}
                          >
                            {appointment.type}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-sm text-gray-600">
                        <strong>Reason:</strong> {appointment.reason}
                      </div>
                      
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          View Records
                        </Button>
                        <Button size="sm">
                          {appointment.type === 'Teleconsultation' ? 'Join Call' : 'Check In'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {upcomingAppointments.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-primary mb-2">
                      <Calendar className="h-12 w-12 mx-auto opacity-50" />
                    </div>
                    <h4 className="text-lg font-medium mb-1">No More Appointments Today</h4>
                    <p className="text-gray-500 mb-4">You're all caught up for today!</p>
                    <Button variant="outline">Check Tomorrow's Schedule</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Patients & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Patients */}
            <Card className="bg-white lg:col-span-2">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg">Recent Patients</h3>
                  <Button variant="outline" size="sm">
                    View All Patients
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Age/Gender</th>
                        <th className="px-4 py-3">Last Visit</th>
                        <th className="px-4 py-3">Condition</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPatients.map((patient) => (
                        <tr key={patient.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{patient.name}</td>
                          <td className="px-4 py-3">
                            {patient.age} / {patient.gender.charAt(0)}
                          </td>
                          <td className="px-4 py-3">
                            {new Date(patient.lastVisit).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">{patient.condition}</td>
                          <td className="px-4 py-3">
                            <Button variant="link" className="p-0 h-auto text-primary">
                              View 
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Analytics Overview */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg">At a Glance</h3>
                  <button className="text-primary text-sm">This Week</button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-500">Appointment Status</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <div className="text-sm">Completed</div>
                        <div className="ml-auto font-medium">24</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <div className="text-sm">Upcoming</div>
                        <div className="ml-auto font-medium">18</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        <div className="text-sm">Cancelled</div>
                        <div className="ml-auto font-medium">5</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="text-sm">No-show</div>
                        <div className="ml-auto font-medium">3</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-500">Consultation Type</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                        <div className="text-sm">In-person</div>
                        <div className="ml-auto font-medium">65%</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>
                        <div className="text-sm">Teleconsultation</div>
                        <div className="ml-auto font-medium">35%</div>
                      </div>
                    </div>
                    <div className="mt-4 relative h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-purple-500 rounded-full" style={{width: '65%'}}></div>
                      <div className="absolute top-0 left-[65%] h-full bg-indigo-500 rounded-full" style={{width: '35%'}}></div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-gray-500">Upcoming Tasks</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="p-1 bg-amber-100 rounded-full mr-3">
                          <FileText className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Complete patient records</div>
                          <div className="text-xs text-gray-500">Due tomorrow</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-1 bg-blue-100 rounded-full mr-3">
                          <Video className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Medical conference call</div>
                          <div className="text-xs text-gray-500">April 6th, 3:00 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PractitionerDashboard;
