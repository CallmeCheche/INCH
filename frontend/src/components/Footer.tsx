
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and company info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Logo />
              <span className="ml-2 font-bold text-xl text-white">
                HEALTHCONNECT
              </span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Your trusted medical appointment platform connecting patients with healthcare providers across Africa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-light">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-light">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-light">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/doctors" className="text-gray-400 hover:text-primary-light">Find Doctors</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary-light">Our Services</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-light">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-light">Contact Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary-light">Health Blog</Link>
              </li>
            </ul>
          </div>
          
          {/* For Patients & Doctors */}
          <div>
            <h3 className="font-bold text-lg mb-4">For Users</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-400 hover:text-primary-light">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-primary-light">Register</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-primary-light">Patient Dashboard</Link>
              </li>
              <li>
                <Link to="/doctor-dashboard" className="text-gray-400 hover:text-primary-light">Doctor Dashboard</Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-primary-light">Help & Support</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-primary-light" />
                <span className="text-gray-400">123 Main Street, Yaoundé, Cameroon</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary-light" />
                <span className="text-gray-400">+237 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary-light" />
                <span className="text-gray-400">contact@healthconnect-africa.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} HealthConnect Africa. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/terms" className="text-gray-400 hover:text-primary-light text-sm">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-primary-light text-sm">
                Privacy Policy
              </Link>
              <Link to="/faq" className="text-gray-400 hover:text-primary-light text-sm">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
