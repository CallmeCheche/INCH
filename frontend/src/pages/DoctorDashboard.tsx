
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, User, Star, MessageSquare, CreditCard, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

// Sample doctors data - this matches the data from other pages
const doctorsData = [
  {
    id: 1,
    name: "Dr. Amara Nwosu",
    specialty: "Cardiologist",
    location: "Yaoundé",
    rating: 4.9,
    reviewCount: 124,
    image: "/lovable-uploads/5589a94f-7d68-42e6-9c01-09851bb50108.png",
    available: true,
    gender: "female",
    upcomingAppointments: 5,
    totalPatients: 152,
    revenueThisMonth: 12500,
    currency: "GHS"
  },
  {
    id: 2,
    name: "Dr. Kwame Osei",
    specialty: "Pediatrician",
    location: "Douala",
    rating: 4.8,
    reviewCount: 96,
    image: "/lovable-uploads/c43c2f96-c9fe-401b-b4de-adf0dba7af98.png",
    available: true,
    gender: "male",
    upcomingAppointments: 8,
    totalPatients: 187,
    revenueThisMonth: 15800,
    currency: "GHS"
  },
  {
    id: 3,
    name: "Dr. Fatima Diallo",
    specialty: "Dermatologist",
    location: "Bamenda",
    rating: 4.7,
    reviewCount: 87,
    image: "/lovable-uploads/e37679a1-94a0-4d90-ab16-ad62bd683ef8.png",
    available: false,
    gender: "female",
    upcomingAppointments: 3,
    totalPatients: 110,
    revenueThisMonth: 9200,
    currency: "XAF"
  },
  {
    id: 4,
    name: "Dr. Chijioke Okonkwo",
    specialty: "Neurologist",
    location: "Yaoundé",
    rating: 4.9,
    reviewCount: 112,
    image: "/lovable-uploads/f9489664-1212-48d0-89af-7e7a0043fb76.png",
    available: true,
    gender: "male",
    upcomingAppointments: 6,
    totalPatients: 135,
    revenueThisMonth: 14200,
    currency: "XAF"
  },
  {
    id: 5,
    name: "Dr. Nadia Mensah",
    specialty: "Oncologist",
    location: "Douala",
    rating: 4.8,
    reviewCount: 78,
    image: "/lovable-uploads/d6031b29-4bab-40d8-bea1-3889b19c7fcc.png",
    available: true,
    gender: "female",
    upcomingAppointments: 4,
    totalPatients: 98,
    revenueThisMonth: 17500,
    currency: "XAF"
  },
  {
    id: 6,
    name: "Dr. Ibrahim Toure",
    specialty: "Gynecologist",
    location: "Bafoussam",
    rating: 4.6,
    reviewCount: 92,
    image: "/lovable-uploads/758fe8aa-6f60-48b8-a5ae-2657946468ac.png",
    available: true,
    gender: "male",
    upcomingAppointments: 7,
    totalPatients: 163,
    revenueThisMonth: 13800,
    currency: "XAF"
  },
  {
    id: 7,
    name: "Dr. Esther Adeyemi",
    specialty: "Orthopedic Surgeon",
    location: "Yaoundé",
    rating: 4.7,
    reviewCount: 103,
    image: "/lovable-uploads/f52a7b7f-975f-40e2-95e8-79d5f5994ffe.png",
    available: false,
    gender: "female",
    upcomingAppointments: 2,
    totalPatients: 87,
    revenueThisMonth: 11200,
    currency: "XAF"
  },
  {
    id: 8,
    name: "Dr. Samuel Koffi",
    specialty: "Psychiatrist",
    location: "Douala",
    rating: 4.8,
    reviewCount: 89,
    image: "/lovable-uploads/0e8da55c-994b-4fe9-8e36-4cdc660efd8f.png",
    available: true,
    gender: "male",
    upcomingAppointments: 5,
    totalPatients: 112,
    revenueThisMonth: 10800,
    currency: "XAF"
  }
];

// Sample appointment data
const sampleAppointments = [
  {
    id: 1,
    patientName: "Ama Mensah",
    patientImage: "/lovable-uploads/010e08bf-88d1-4962-a1a1-1454d7f1416c.png",
    date: "2025-04-23",
    time: "10:00 AM",
    type: "In-person",
    status: "confirmed"
  },
  {
    id: 2,
    patientName: "Kofi Annan",
    patientImage: null,
    date: "2025-04-23",
    time: "11:30 AM",
    type: "Video Call",
    status: "confirmed"
  },
  {
    id: 3,
    patientName: "Nana Akufo",
    patientImage: null,
    date: "2025-04-24",
    time: "9:00 AM",
    type: "In-person",
    status: "confirmed"
  }
];

const DoctorDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the doctor based on the ID from URL
  const doctorId = parseInt(id || "1");
  const doctorData = doctorsData.find(doctor => doctor.id === doctorId);
  
  // Redirect to the first doctor if ID is invalid
  if (!doctorData) {
    React.useEffect(() => {
      navigate('/doctor-dashboard/1');
    }, [navigate]);
    return null;
  }

  return (
    <DashboardLayout userType="doctor">
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-gray-600">Welcome back, {doctorData.name.split(' ')[1]}!</p>
          </div>
          
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button asChild>
              <Link to="/doctors">View Public Profile</Link>
            </Button>
          </div>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 mr-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming Appointments</p>
                <h4 className="text-2xl font-bold text-gray-900">{doctorData.upcomingAppointments}</h4>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary/10 mr-4">
                <User className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Patients</p>
                <h4 className="text-2xl font-bold text-gray-900">{doctorData.totalPatients}</h4>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-green-500/10 mr-4">
                <CreditCard className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenue this Month</p>
                <h4 className="text-2xl font-bold text-gray-900">{doctorData.currency} {doctorData.revenueThisMonth.toLocaleString()}</h4>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0.5">
                  <CardTitle className="text-xl">Today's Appointments</CardTitle>
                  <CardDescription>Manage your scheduled appointments</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/doctor-dashboard/appointments">
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {sampleAppointments.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {sampleAppointments.map((appointment) => (
                      <li 
                        key={appointment.id} 
                        className="py-4 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              {appointment.patientImage ? (
                                <AvatarImage src={appointment.patientImage} alt={appointment.patientName} />
                              ) : (
                                <AvatarFallback className="bg-gray-200 text-gray-500">
                                  {appointment.patientName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{appointment.patientName}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-3 w-3 mr-1" /> 
                                {appointment.time} • {appointment.type}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                            <Button size="sm">Start</Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No appointments scheduled for today</p>
                    <Button variant="outline" className="mt-4">
                      Set Availability
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Pending Consultations</CardTitle>
                <CardDescription>Respond to patient queries</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No pending consultations at the moment</p>
                <Button variant="outline" className="mt-4">Check Messages</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Profile Completion</CardTitle>
                <CardDescription>Complete your profile to attract more patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full bg-primary mr-2"></div>
                      <span className="text-gray-700">Professional information complete</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full bg-primary mr-2"></div>
                      <span className="text-gray-700">Qualifications verified</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full bg-primary mr-2"></div>
                      <span className="text-gray-700">Contact details verified</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full bg-gray-200 mr-2"></div>
                      <span className="text-gray-500">Payment details pending</span>
                    </li>
                  </ul>
                  
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/doctor-dashboard/settings">Complete Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Availability</CardTitle>
                <CardDescription>Manage your availability schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Today's status</span>
                  <div className={`px-3 py-1 rounded-full ${doctorData.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {doctorData.available ? 'Available' : 'Not Available'}
                  </div>
                </div>
                <Button variant="secondary" className="w-full">
                  Update Availability
                </Button>
                <Button variant="outline" className="w-full">
                  Manage Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
