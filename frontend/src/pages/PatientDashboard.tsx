import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Star, Search, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/DashboardLayout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { patientService, PatientStats, PatientProfile } from '@/services/patient.service';
import { Appointment } from '@/services/appointment.service';
import { authService, User } from '@/services/auth.service';

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<PatientStats | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<PatientProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Charger les données utilisateur
        const userData = await authService.getUser();
        console.log('User data loaded:', userData);
        setUser(userData);
        
        // Charger le profil du patient
        try {
          const patientProfileData = await patientService.getProfile();
          console.log('Patient profile loaded:', patientProfileData);
          setProfile(patientProfileData);
        } catch (profileErr) {
          console.error('Error fetching patient profile:', profileErr);
          // Continuer même si le profil n'a pas pu être chargé
        }
        
        // Charger les statistiques du tableau de bord
        const dashboardStats = await patientService.getDashboardStats();
        console.log('Dashboard stats loaded:', dashboardStats);
        setStats(dashboardStats);
        
        // Charger les rendez-vous à venir
        const patientAppointments = await patientService.getAppointments();
        console.log('Appointments loaded:', patientAppointments);
        
        // Filtrer pour n'obtenir que les rendez-vous à venir
        const upcomingAppointments = patientAppointments.filter(
          (appointment: Appointment) => new Date(appointment.date) >= new Date()
        );
        setAppointments(upcomingAppointments);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Aucune fonction supplémentaire n'est nécessaire pour l'affichage du nom de l'utilisateur

  return (
    <DashboardLayout userType="patient">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name ? user.name.split(' ')[0] : 'User'}!</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search doctors..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button className="ml-2">Find Doctor</Button>
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
                {loading ? (
                  <p className="text-sm text-gray-400">Loading...</p>
                ) : (
                  <h4 className="text-2xl font-bold text-gray-900">{stats?.upcomingAppointments || 0}</h4>
                )}
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
                {loading ? (
                  <p className="text-sm text-gray-400">Loading...</p>
                ) : (
                  <h4 className="text-2xl font-bold text-gray-900">{stats?.pastAppointments || 0}</h4>
                )}
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
                {loading ? (
                  <p className="text-sm text-gray-400">Loading...</p>
                ) : (
                  <h4 className="text-2xl font-bold text-gray-900">{stats?.reviewsGiven || 0}</h4>
                )}
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
                {loading ? (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">Loading appointments...</p>
                  </div>
                ) : error ? (
                  <div className="py-8 text-center">
                    <p className="text-red-500">{error}</p>
                    <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                      Retry
                    </Button>
                  </div>
                ) : appointments.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {appointments.map((appointment) => (
                      <li 
                        key={appointment.id} 
                        className="py-4 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{appointment.doctorName}</p>
                            <p className="text-sm text-gray-500">{appointment.specialty}</p>
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
                  {loading ? (
                    <div className="py-4 text-center">
                      <p className="text-gray-500">Loading profile data...</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{stats?.profileCompletion || 0}%</span>
                        </div>
                        <Progress value={stats?.profileCompletion || 0} className="h-2" />
                      </div>
                      
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <div className={`h-4 w-4 rounded-full ${user?.name ? 'bg-primary' : 'bg-gray-200'} mr-2`}></div>
                          <span className={user?.name ? 'text-gray-700' : 'text-gray-500'}>
                            Personal information {user?.name ? 'complete' : 'pending'}
                          </span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className={`h-4 w-4 rounded-full ${profile?.phone || profile?.address ? 'bg-primary' : 'bg-gray-200'} mr-2`}></div>
                          <span className={profile?.phone || profile?.address ? 'text-gray-700' : 'text-gray-500'}>
                            Contact details {profile?.phone || profile?.address ? 'verified' : 'pending'}
                          </span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className={`h-4 w-4 rounded-full ${profile?.medicalHistory ? 'bg-primary' : 'bg-gray-200'} mr-2`}></div>
                          <span className={profile?.medicalHistory ? 'text-gray-700' : 'text-gray-500'}>
                            Medical history {profile?.medicalHistory ? 'complete' : 'pending'}
                          </span>
                        </li>
                        <li className="flex items-center text-sm">
                          <div className={`h-4 w-4 rounded-full ${stats?.profileCompletion === 100 ? 'bg-primary' : 'bg-gray-200'} mr-2`}></div>
                          <span className={stats?.profileCompletion === 100 ? 'text-gray-700' : 'text-gray-500'}>
                            Payment details {stats?.profileCompletion === 100 ? 'complete' : 'pending'}
                          </span>
                        </li>
                      </ul>
                      
                      <Button className="w-full mt-4" asChild>
                        <Link to="/profile">
                          Complete Profile
                        </Link>
                      </Button>
                    </>
                  )}
                  
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
