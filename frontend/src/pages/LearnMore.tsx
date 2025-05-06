
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LearnMorePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-primary py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">How HealthConnect Works</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Discover how our platform is transforming healthcare access and delivery across Africa.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Platform Overview */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Your All-in-One Healthcare Solution</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500">[Placeholder: Platform overview image]</p>
              </div>
            </div>
            <div>
              <p className="text-lg text-gray-700 mb-6">
                HealthConnect is an innovative digital health platform that connects patients with healthcare providers across Africa, making quality healthcare more accessible and convenient.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our platform addresses key challenges in healthcare access by enabling:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Online booking with verified healthcare professionals</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Secure teleconsultations from any location</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Digital health records management</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Convenient mobile money payment options</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Community health resources and education</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* For Patients */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12">For Patients</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-xl text-primary">1</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Create Your Account</h3>
              <p className="text-gray-600 mb-4">
                Sign up in minutes with your basic information. Your personal data is secure and protected by our privacy policies.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Simple registration process</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Create family profiles</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Secure data handling</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-xl text-primary">2</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Find Healthcare Providers</h3>
              <p className="text-gray-600 mb-4">
                Search for doctors by specialty, location, language, gender, and availability. Read reviews from other patients.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Advanced search filters</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Verified practitioner profiles</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Patient reviews and ratings</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-xl text-primary">3</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Book & Receive Care</h3>
              <p className="text-gray-600 mb-4">
                Schedule in-person visits or teleconsultations. Access your medical records and manage your health journey.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Flexible appointment booking</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Secure video consultations</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Digital prescriptions</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button asChild className="mt-4">
              <Link to="/register">Register as a Patient <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>
        
        {/* For Practitioners */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12">For Healthcare Providers</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                HealthConnect empowers healthcare providers to expand their reach, streamline practice management, and focus more on patient care.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Expand Your Practice</h3>
                    <p className="text-gray-600">Reach more patients across your region through our digital platform.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Efficient Scheduling</h3>
                    <p className="text-gray-600">Manage your calendar, appointments, and availability in one place.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Teleconsultation Tools</h3>
                    <p className="text-gray-600">Conduct secure video appointments with integrated clinical documentation.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Simplified Payments</h3>
                    <p className="text-gray-600">Receive payments directly through our secure platform.</p>
                  </div>
                </li>
              </ul>
              <Button asChild className="mt-6">
                <Link to="/register?type=provider">Join as a Healthcare Provider <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500">[Placeholder: Provider dashboard image]</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Platform Benefits */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose HealthConnect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-gray-100 rounded-xl">
              <h3 className="font-bold text-xl text-gray-900 mb-3">Local Focus</h3>
              <p className="text-gray-600">
                Built specifically for the African healthcare context, addressing unique challenges and needs.
              </p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl">
              <h3 className="font-bold text-xl text-gray-900 mb-3">Security & Privacy</h3>
              <p className="text-gray-600">
                Advanced encryption and strict privacy protocols keep your medical information safe.
              </p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl">
              <h3 className="font-bold text-xl text-gray-900 mb-3">Inclusive Design</h3>
              <p className="text-gray-600">
                Platform works across various devices and connection speeds to ensure accessibility for all.
              </p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl">
              <h3 className="font-bold text-xl text-gray-900 mb-3">Support Team</h3>
              <p className="text-gray-600">
                Dedicated customer service representatives ready to assist in multiple languages.
              </p>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-primary text-white p-12 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Healthcare Experience?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of patients and healthcare providers already using HealthConnect. Sign up today and take control of your health journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold text-white border-white hover:bg-white/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default LearnMorePage;
