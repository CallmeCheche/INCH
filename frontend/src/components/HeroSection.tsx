
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Video } from 'lucide-react';
import { Button } from './ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-secondary-dark via-secondary to-primary-light h-[80vh] min-h-[600px] flex items-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-in">
            Your Health, Our Priority
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl animate-slide-in" style={{animationDelay: '0.2s'}}>
            Connect with the best healthcare providers across Africa. 
            Book appointments, attend virtual consultations, and manage your health journey with ease.
          </p>
          <div className="flex flex-wrap gap-4 animate-slide-in" style={{animationDelay: '0.4s'}}>
            <Button asChild size="lg" className="text-lg">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="text-lg">
              <Link to="/doctors">Find Doctors</Link>
            </Button>
          </div>
          
          {/* Features highlight */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in" style={{animationDelay: '0.6s'}}>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 flex">
              <Search className="h-8 w-8 text-white mr-4" />
              <div>
                <h3 className="font-bold text-white text-lg">Find Specialists</h3>
                <p className="text-white/80">Search for doctors based on specialty and location</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 flex">
              <Calendar className="h-8 w-8 text-white mr-4" />
              <div>
                <h3 className="font-bold text-white text-lg">Book Appointments</h3>
                <p className="text-white/80">Schedule your visits online at your convenience</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 flex">
              <Video className="h-8 w-8 text-white mr-4" />
              <div>
                <h3 className="font-bold text-white text-lg">Virtual Consultations</h3>
                <p className="text-white/80">Connect with doctors from the comfort of your home</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
