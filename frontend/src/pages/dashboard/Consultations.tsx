
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Video, Search, ChevronRight, User, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/components/DashboardLayout';

const Consultations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data - in a real app, this would come from an API
  const upcomingConsultations = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2025-05-15',
      time: '10:00 AM',
      type: 'Video',
      avatar: '/placeholder.svg',
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      date: '2025-05-18',
      time: '2:30 PM',
      type: 'Video',
      avatar: '/placeholder.svg',
    },
  ];
  
  const pastConsultations = [
    {
      id: 3,
      doctorName: 'Dr. Emily Wilson',
      specialty: 'Neurologist',
      date: '2025-05-01',
      time: '11:15 AM',
      type: 'Video',
      avatar: '/placeholder.svg',
      summary: 'Discussed migraine symptoms and treatment options. Prescribed preventive medication.',
    },
    {
      id: 4,
      doctorName: 'Dr. James Rodriguez',
      specialty: 'General Practitioner',
      date: '2025-04-22',
      time: '9:00 AM',
      type: 'Video',
      avatar: '/placeholder.svg',
      summary: 'Annual check-up. All vitals normal. Recommended continued exercise and healthy diet.',
    },
    {
      id: 5,
      doctorName: 'Dr. Aisha Patel',
      specialty: 'Pulmonologist',
      date: '2025-04-10',
      time: '3:45 PM',
      type: 'Video',
      avatar: '/placeholder.svg',
      summary: 'Follow-up for asthma management. Adjusted medication dosage.',
    },
  ];
  
  const filteredUpcoming = upcomingConsultations.filter(consult => 
    consult.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    consult.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredPast = pastConsultations.filter(consult => 
    consult.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    consult.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">My Consultations</h1>
          <p className="text-gray-500 mt-1">Manage your telemedicine appointments</p>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <Input
            placeholder="Search consultations by doctor name or specialty..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming
              {filteredUpcoming.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {filteredUpcoming.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="past">
              Past Consultations
              {filteredPast.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {filteredPast.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {filteredUpcoming.length > 0 ? (
              filteredUpcoming.map(consultation => (
                <Card key={consultation.id} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="p-6 flex-1">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={consultation.avatar} alt={consultation.doctorName} />
                          <AvatarFallback>{consultation.doctorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{consultation.doctorName}</h3>
                          <p className="text-sm text-gray-500">{consultation.specialty}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                          <span>{new Date(consultation.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-5 w-5 text-gray-500" />
                          <span>{consultation.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Video className="mr-2 h-5 w-5 text-gray-500" />
                          <span>{consultation.type} Consultation</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 md:w-64 flex flex-col items-center justify-center space-y-3">
                      <Button className="w-full">
                        Join Consultation
                      </Button>
                      <Button variant="outline" className="w-full">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <Calendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Upcoming Consultations</h3>
                  <p className="text-center text-gray-500 mb-6">
                    You don't have any upcoming telemedicine appointments.
                  </p>
                  <Button asChild>
                    <Link to="/doctors">
                      Find a Doctor
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {filteredPast.length > 0 ? (
              filteredPast.map(consultation => (
                <Card key={consultation.id} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="p-6 flex-1">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={consultation.avatar} alt={consultation.doctorName} />
                          <AvatarFallback>{consultation.doctorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{consultation.doctorName}</h3>
                          <p className="text-sm text-gray-500">{consultation.specialty}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                          <span>{new Date(consultation.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-5 w-5 text-gray-500" />
                          <span>{consultation.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Video className="mr-2 h-5 w-5 text-gray-500" />
                          <span>{consultation.type} Consultation</span>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div>
                        <h4 className="font-medium mb-2">Consultation Summary</h4>
                        <p className="text-gray-600">{consultation.summary}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 md:w-64 flex flex-col items-center justify-center space-y-3">
                      <Button variant="outline" className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message Doctor
                      </Button>
                      <Button variant="outline" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        View Doctor Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <div className="rounded-full bg-gray-100 p-3 mb-4">
                    <Clock className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Past Consultations</h3>
                  <p className="text-center text-gray-500 mb-6">
                    You haven't had any telemedicine consultations yet.
                  </p>
                  <Button asChild>
                    <Link to="/contact-support">
                      Contact Support
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Consultations;
