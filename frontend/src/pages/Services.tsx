
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Video, Stethoscope, Users, CreditCard, Star, MessageSquare, FileText, HeartPulse, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: Calendar,
    title: "Online Booking",
    description: "Book appointments with your preferred doctors anytime, anywhere. Our simple booking system allows you to select dates and times that work for your schedule.",
    link: "/book-appointments"
  },
  {
    icon: Video,
    title: "Teleconsultation",
    description: "Connect with healthcare professionals through secure video calls. Get medical advice from the comfort of your home without traveling to a clinic.",
    link: "/teleconsultation"
  },
  {
    icon: Stethoscope,
    title: "Specialist Referrals",
    description: "Get connected with specialists based on your health needs. Our platform helps match you with the right healthcare provider for your condition.",
    link: "/doctors"
  },
  {
    icon: Users,
    title: "Family Accounts",
    description: "Manage healthcare for your entire family under one account. Schedule appointments for dependents and keep all medical records in one place.",
    link: "/register"
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Secure and convenient payment options including mobile money such as MoMo, Orange Money, and bank transfers through UBA and Western Union.",
    link: "/payments"
  },
  {
    icon: Star,
    title: "Rating & Reviews",
    description: "Share your experience and help others find the best care. Read authentic reviews from patients to make informed healthcare decisions.",
    link: "/reviews"
  },
  {
    icon: MessageSquare,
    title: "Secure Messaging",
    description: "Communicate directly with your healthcare provider through our secure messaging system for follow-up questions and clarifications.",
    link: "/messaging"
  },
  {
    icon: FileText,
    title: "Digital Health Records",
    description: "Access your medical history, prescriptions, and test results in one place. Share records securely with healthcare providers as needed.",
    link: "/records"
  },
  {
    icon: HeartPulse,
    title: "Preventive Care",
    description: "Receive reminders for regular check-ups and screenings. Stay proactive about your health with our preventive care recommendations.",
    link: "/preventive-care"
  },
  {
    icon: Activity,
    title: "Health Monitoring",
    description: "Track your vital signs and health metrics over time. Monitor chronic conditions and share data with your healthcare provider.",
    link: "/monitoring"
  }
];

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-primary py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Discover how HealthConnect is transforming healthcare access and delivery across Africa with our comprehensive suite of services.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border border-gray-100 hover:border-primary/50 transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button asChild variant="link" className="p-0 h-auto text-primary font-medium">
                  <Link to={service.link}>Learn More &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* How It Works Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">How Our Services Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Register an Account</h3>
              <p className="text-gray-600">Create your free account in minutes and set up your health profile with relevant medical information.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Find Your Provider</h3>
              <p className="text-gray-600">Search for healthcare providers by specialty, location, and availability that meet your needs.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Care</h3>
              <p className="text-gray-600">Book appointments, participate in teleconsultations, and manage your health journey all in one place.</p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 bg-gray-50 p-8 rounded-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Better Healthcare?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of patients and healthcare providers already using HealthConnect to transform their healthcare experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/register">Sign Up Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
