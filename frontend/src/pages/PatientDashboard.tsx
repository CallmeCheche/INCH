
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Star, Search, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Sample data
const upcomingAppointments = [
  {
    id: 1,
    doctorName: "Dr. Ngozi Okonkwo",
    specialty: "Dermatologist",
    date: "2025-04-12",
    time: "10:00 AM",
    type: "In-person",
    image: "/lovable-uploads/e37679a1-94a0-4d90-ab16-ad62bd683ef8.png"
  },
  {
    id: 2,
    doctorName: "Dr. Kwame Nkrumah",
    specialty: "Pediatrician",
    date: "2025-04-15",
    time: "2:30 PM",
    type: "Video Call",
    image: "/lovable-uploads/c43c2f96-c9fe-401b-b4de-adf0dba7af98.png"
  }
];

const PatientDashboard = () => {
  return (
    <DashboardLayout userType="patient">
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Ama!</p>
          </div>
          
          <div className="flex space-x-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search doctors..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button asChild>
              <Link to="/doctors">Find Doctor</Link>
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
                <h4 className="text-2xl font-bold text-gray-900">2</h4>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary/10 mr-4">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Past Appointments</p>
                <h4 className="text-2xl font-bold text-gray-900">5</h4>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-yellow-500/10 mr-4">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Reviews Given</p>
                <h4 className="text-2xl font-bold text-gray-900">3</h4>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming appointments & profile completion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0.5">
                  <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled appointments</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard/appointments">
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {upcomingAppointments.map((appointment) => (
                      <li 
                        key={appointment.id} 
                        className="py-4 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={appointment.image} alt={appointment.doctorName} />
                              <AvatarFallback className="bg-gray-200 text-gray-500">
                                {appointment.doctorName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{appointment.doctorName}</p>
                              <p className="text-sm text-gray-500">{appointment.specialty}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {new Date(appointment.date).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.time} • {appointment.type}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No upcoming appointments</p>
                    <Button asChild className="mt-4">
                      <Link to="/doctors">Book an Appointment</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Recent Consultations</CardTitle>
                <CardDescription>Your recent online consultations</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No recent consultations</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/dashboard/consultations">Start a Consultation</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Profile Completion</CardTitle>
                <CardDescription>Complete your profile for better recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full bg-primary mr-2"></div>
                      <span className="text-gray-700">Personal information complete</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full bg-primary mr-2"></div>
                      <span className="text-gray-700">Contact details verified</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full bg-gray-200 mr-2"></div>
                      <span className="text-gray-500">Medical history pending</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <div className="h-4 w-4 rounded-full bg-gray-200 mr-2"></div>
                      <span className="text-gray-500">Payment details pending</span>
                    </li>
                  </ul>
                  
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/dashboard/settings">Complete Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Need Help?</CardTitle>
                <CardDescription>Get support from our team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="secondary" className="w-full" asChild>
                  <Link to="/dashboard/contact-support">Contact Support</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/dashboard/faqs">Browse FAQs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
