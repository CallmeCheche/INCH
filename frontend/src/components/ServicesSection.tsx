
import React from 'react';
import { Calendar, Video, Stethoscope, Users, CreditCard, Star } from 'lucide-react';

const services = [
  {
    icon: Calendar,
    title: "Online Booking",
    description: "Book appointments with your preferred doctors anytime, anywhere."
  },
  {
    icon: Video,
    title: "Teleconsultation",
    description: "Connect with healthcare professionals through secure video calls."
  },
  {
    icon: Stethoscope,
    title: "Specialist Referrals",
    description: "Get connected with specialists based on your health needs."
  },
  {
    icon: Users,
    title: "Family Accounts",
    description: "Manage healthcare for your entire family under one account."
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Secure and convenient payment options including mobile money."
  },
  {
    icon: Star,
    title: "Rating & Reviews",
    description: "Share your experience and help others find the best care."
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            HealthConnect offers a comprehensive range of services to make healthcare accessible and convenient.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-6 border border-gray-100 rounded-xl shadow-sm transition-all hover:shadow-md hover:border-primary/50"
            >
              <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
