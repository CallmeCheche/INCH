
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Search, MapPin, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Sample appointments data
const upcomingAppointments = [
  {
    id: 1,
    doctorName: "Dr. Ngozi Okonkwo",
    specialty: "Dermatologist",
    location: "Skin Care Clinic, Bamenda",
    date: "2025-04-25",
    time: "10:00 AM",
    type: "In-person",
    status: "confirmed",
    image: "/lovable-uploads/e37679a1-94a0-4d90-ab16-ad62bd683ef8.png"
  },
  {
    id: 2,
    doctorName: "Dr. Kwame Nkrumah",
    specialty: "Pediatrician",
    location: "Kumasi Children's Hospital",
    date: "2025-04-28",
    time: "2:30 PM",
    type: "Video Call",
    status: "confirmed",
    image: "/lovable-uploads/c43c2f96-c9fe-401b-b4de-adf0dba7af98.png"
  },
  {
    id: 3,
    doctorName: "Dr. Nadia Mensah",
    specialty: "Oncologist",
    location: "Cancer Care Center, Douala",
    date: "2025-05-02",
    time: "11:15 AM",
    type: "In-person",
    status: "pending",
    image: "/lovable-uploads/d6031b29-4bab-40d8-bea1-3889b19c7fcc.png"
  }
];

const pastAppointments = [
  {
    id: 4,
    doctorName: "Dr. Amara Nwosu",
    specialty: "Cardiologist",
    location: "Accra Medical Center",
    date: "2025-04-10",
    time: "9:45 AM",
    type: "In-person",
    status: "completed",
    image: "/lovable-uploads/5589a94f-7d68-42e6-9c01-09851bb50108.png"
  },
  {
    id: 5,
    doctorName: "Dr. Ibrahim Toure",
    specialty: "Gynecologist",
    location: "Women's Health Center",
    date: "2025-03-22",
    time: "3:00 PM",
    type: "In-person",
    status: "completed",
    image: "/lovable-uploads/758fe8aa-6f60-48b8-a5ae-2657946468ac.png"
  },
  {
    id: 6,
    doctorName: "Dr. Samuel Koffi",
    specialty: "Psychiatrist",
    location: "Mental Health Center",
    date: "2025-03-15",
    time: "1:30 PM",
    type: "Video Call",
    status: "completed",
    image: "/lovable-uploads/0e8da55c-994b-4fe9-8e36-4cdc660efd8f.png"
  },
  {
    id: 7,
    doctorName: "Dr. Chijioke Okonkwo",
    specialty: "Neurologist",
    location: "Neurology Center",
    date: "2025-02-28",
    time: "11:00 AM",
    type: "In-person",
    status: "cancelled",
    image: "/lovable-uploads/f9489664-1212-48d0-89af-7e7a0043fb76.png"
  }
];

const AppointmentsPage: React.FC = () => {
  return (
    <DashboardLayout userType="patient">
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600">View and manage all your appointments</p>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search appointments..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button asChild>
              <Link to="/doctors">
                <Plus className="mr-2 h-4 w-4" />
                Book New
              </Link>
            </Button>
          </div>
        </div>

        {/* Appointments tabs */}
        <Card>
          <Tabs defaultValue="upcoming">
            <CardHeader className="pb-0">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
            </CardHeader>
            
            <TabsContent value="upcoming">
              <CardContent className="pt-6">
                {upcomingAppointments.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {upcomingAppointments.map((appointment) => (
                      <li key={appointment.id} className="py-6 first:pt-0 last:pb-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start md:items-center">
                            <Avatar className="h-12 w-12 mr-4 mt-1 md:mt-0">
                              <AvatarImage src={appointment.image} alt={appointment.doctorName} />
                              <AvatarFallback className="bg-gray-200 text-gray-500">
                                {appointment.doctorName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-gray-900">{appointment.doctorName}</h3>
                              <p className="text-sm text-gray-500">{appointment.specialty}</p>
                              <div className="flex flex-wrap gap-y-1 mt-1">
                                <div className="flex items-center mr-3">
                                  <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                                  <span className="text-sm text-gray-500">
                                    {new Date(appointment.date).toLocaleDateString('en-US', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center mr-3">
                                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                                  <span className="text-sm text-gray-500">{appointment.time}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                  <span className="text-sm text-gray-500">{appointment.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 md:ml-auto mt-2 md:mt-0">
                            <Badge className={appointment.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}>
                              {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                              <Button variant="destructive" size="sm">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Calendar className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No upcoming appointments</h3>
                    <p className="text-gray-500 mb-6">Schedule an appointment with one of our healthcare professionals.</p>
                    <Button asChild>
                      <Link to="/doctors">Book an Appointment</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="past">
              <CardContent className="pt-6">
                {pastAppointments.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {pastAppointments.map((appointment) => (
                      <li key={appointment.id} className="py-6 first:pt-0 last:pb-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start md:items-center">
                            <Avatar className="h-12 w-12 mr-4 mt-1 md:mt-0">
                              <AvatarImage src={appointment.image} alt={appointment.doctorName} />
                              <AvatarFallback className="bg-gray-200 text-gray-500">
                                {appointment.doctorName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-gray-900">{appointment.doctorName}</h3>
                              <p className="text-sm text-gray-500">{appointment.specialty}</p>
                              <div className="flex flex-wrap gap-y-1 mt-1">
                                <div className="flex items-center mr-3">
                                  <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                                  <span className="text-sm text-gray-500">
                                    {new Date(appointment.date).toLocaleDateString('en-US', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center mr-3">
                                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                                  <span className="text-sm text-gray-500">{appointment.time}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                  <span className="text-sm text-gray-500">{appointment.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 md:ml-auto mt-2 md:mt-0">
                            <Badge className={
                              appointment.status === 'completed' 
                                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }>
                              {appointment.status === 'completed' ? 'Completed' : 'Cancelled'}
                            </Badge>
                            <div className="flex gap-2">
                              {appointment.status === 'completed' && (
                                <Button variant="outline" size="sm">
                                  Leave Review
                                </Button>
                              )}
                              <Button variant="secondary" size="sm">
                                Book Again
                              </Button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No past appointments</h3>
                    <p className="text-gray-500">Your appointment history will appear here.</p>
                  </div>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
        
        {/* Additional info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Appointment Guidelines</CardTitle>
              <CardDescription>Important information for your visit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">For In-person Visits:</h4>
                <ul className="space-y-1 text-gray-600 text-sm pl-5 list-disc">
                  <li>Please arrive 15 minutes before your scheduled time</li>
                  <li>Bring your ID and insurance information</li>
                  <li>Bring a list of current medications</li>
                  <li>Reschedule if you have fever or respiratory symptoms</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">For Video Consultations:</h4>
                <ul className="space-y-1 text-gray-600 text-sm pl-5 list-disc">
                  <li>Test your device's camera and microphone beforehand</li>
                  <li>Ensure you have a stable internet connection</li>
                  <li>Find a quiet, private space for your appointment</li>
                  <li>Join the call 5 minutes before the scheduled time</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cancellation Policy</CardTitle>
              <CardDescription>Please read before cancelling appointments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                You can reschedule or cancel your appointment up to 24 hours before your scheduled time
                without any penalty. Late cancellations or no-shows may incur a fee.
              </p>
              <div className="bg-yellow-50 p-4 rounded-md">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> For specialist appointments, a 48-hour notice is required for cancellations.
                  Please contact our support team if you have an emergency situation.
                </p>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/dashboard/contact-support">
                  Contact Support
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentsPage;
