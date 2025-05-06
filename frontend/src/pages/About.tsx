
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Award, Globe, Target, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Team members data
const teamMembers = [
  {
    name: "Dr. Nnamdi Okafor",
    role: "Founder & CEO",
    bio: "Dr. Okafor founded HealthConnect with the vision to make quality healthcare accessible across Africa. With over 15 years of experience in healthcare management and digital health innovation.",
    image: "/placeholders/team-1.jpg"
  },
  {
    name: "Amina Diallo",
    role: "Chief Technology Officer",
    bio: "With a background in computer science and 10+ years of experience building digital platforms, Amina leads our technology team to create innovative healthcare solutions.",
    image: "/placeholders/team-2.jpg"
  },
  {
    name: "Dr. Kofi Mensah",
    role: "Medical Director",
    bio: "Dr. Mensah oversees medical standards and practitioner onboarding. His expertise in public health ensures that HealthConnect maintains high clinical standards.",
    image: "/placeholders/team-3.jpg"
  },
  {
    name: "Zainab Nkosi",
    role: "Operations Director",
    bio: "Zainab brings over 12 years of experience in healthcare operations and ensures smooth functioning of all HealthConnect services across different regions.",
    image: "/placeholders/team-4.jpg"
  }
];

// Values data
const companyValues = [
  {
    icon: Heart,
    title: "Patient-Centered",
    description: "We put patients at the center of everything we do, designing our services around their needs, preferences, and experiences."
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "We uphold the highest standards of data protection and privacy to ensure all medical information is secure and confidential."
  },
  {
    icon: Award,
    title: "Healthcare Excellence",
    description: "We are committed to connecting patients with high-quality healthcare providers who meet our rigorous standards."
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "We strive to make quality healthcare accessible to all Africans, regardless of location or economic status."
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously innovate to improve healthcare delivery and overcome the unique challenges of African healthcare systems."
  },
  {
    icon: Users,
    title: "Community",
    description: "We foster a supportive community of patients and healthcare providers working together for better health outcomes."
  }
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-primary py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About HealthConnect</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Our mission is to transform healthcare access and delivery across Africa through innovative digital solutions.
          </p>
        </div>
      </div>
      
      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-4">
              HealthConnect was founded in 2019 with a simple but powerful vision: to make quality healthcare accessible to everyone across Africa, regardless of location or economic status.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Our founder, Dr. Nnamdi Okafor, experienced firsthand the challenges of healthcare delivery in rural communities and urban centers alike. He recognized that technology could bridge many gaps in healthcare access if implemented thoughtfully.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              What began as a small telemedicine project in Cameroon has grown into a comprehensive digital health platform connecting thousands of patients with healthcare providers across multiple African countries.
            </p>
            <p className="text-lg text-gray-700">
              Today, HealthConnect is leading the digital health revolution in Africa, but our core mission remains unchanged: putting patients first and making healthcare simpler for everyone.
            </p>
          </div>
          <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">[Image placeholder: Office or team photo]</p>
            </div>
          </div>
        </div>
        
        {/* Our Values */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Our Team */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-4">Our Leadership Team</h2>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Meet the dedicated professionals working to make healthcare more accessible across Africa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-gray-900">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Impact Section */}
        <div className="mt-20 bg-gray-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <p className="text-lg text-gray-700">Patients Served</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">2,000+</div>
              <p className="text-lg text-gray-700">Healthcare Providers</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <p className="text-lg text-gray-700">African Countries</p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Be part of the healthcare revolution in Africa. Whether you're a patient seeking care or a provider wanting to expand your reach, HealthConnect is here for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/register">Sign Up Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
