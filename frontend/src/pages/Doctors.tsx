
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Sample specialties for the filter
const specialties = [
  "All Specialties",
  "Cardiology",
  "Pediatrics",
  "Dermatology",
  "Neurology",
  "Oncology",
  "Gynecology",
  "Orthopedics",
  "Psychiatry",
  "Ophthalmology",
  "Dentistry"
];

// Sample locations for the filter
const locations = [
  "All Locations",
  "Yaoundé",
  "Douala",
  "Bamenda",
  "Bafoussam",
  "Garoua",
  "Maroua",
  "Ngaoundéré",
  "Bertoua",
  "Limbe",
  "Kumba"
];

// Updated doctors data with images
const doctorsData = [
  {
    id: 1,
    name: "Dr. Amara Nwosu",
    specialty: "Cardiologist",
    location: "Yaoundé",
    rating: 4.9,
    reviewCount: 124,
    image: "/lovable-uploads/5589a94f-7d68-42e6-9c01-09851bb50108.png",
    available: true,
    gender: "female"
  },
  {
    id: 2,
    name: "Dr. Kwame Osei",
    specialty: "Pediatrician",
    location: "Douala",
    rating: 4.8,
    reviewCount: 96,
    image: "/lovable-uploads/c43c2f96-c9fe-401b-b4de-adf0dba7af98.png",
    available: true,
    gender: "male"
  },
  {
    id: 3,
    name: "Dr. Fatima Diallo",
    specialty: "Dermatologist",
    location: "Bamenda",
    rating: 4.7,
    reviewCount: 87,
    image: "/lovable-uploads/e37679a1-94a0-4d90-ab16-ad62bd683ef8.png",
    available: false,
    gender: "female"
  },
  {
    id: 4,
    name: "Dr. Chijioke Okonkwo",
    specialty: "Neurologist",
    location: "Yaoundé",
    rating: 4.9,
    reviewCount: 112,
    image: "/lovable-uploads/f9489664-1212-48d0-89af-7e7a0043fb76.png",
    available: true,
    gender: "male"
  },
  {
    id: 5,
    name: "Dr. Nadia Mensah",
    specialty: "Oncologist",
    location: "Douala",
    rating: 4.8,
    reviewCount: 78,
    image: "/lovable-uploads/d6031b29-4bab-40d8-bea1-3889b19c7fcc.png",
    available: true,
    gender: "female"
  },
  {
    id: 6,
    name: "Dr. Ibrahim Toure",
    specialty: "Gynecologist",
    location: "Bafoussam",
    rating: 4.6,
    reviewCount: 92,
    image: "/lovable-uploads/758fe8aa-6f60-48b8-a5ae-2657946468ac.png",
    available: true,
    gender: "male"
  },
  {
    id: 7,
    name: "Dr. Esther Adeyemi",
    specialty: "Orthopedic Surgeon",
    location: "Yaoundé",
    rating: 4.7,
    reviewCount: 103,
    image: "/lovable-uploads/f52a7b7f-975f-40e2-95e8-79d5f5994ffe.png",
    available: false,
    gender: "female"
  },
  {
    id: 8,
    name: "Dr. Samuel Koffi",
    specialty: "Psychiatrist",
    location: "Douala",
    rating: 4.8,
    reviewCount: 89,
    image: "/lovable-uploads/0e8da55c-994b-4fe9-8e36-4cdc660efd8f.png",
    available: true,
    gender: "male"
  }
];

const DoctorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  
  // Filter doctors based on search term and filters
  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === 'All Locations' || doctor.location === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="bg-primary py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Find the Right Doctor for You</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Browse our network of experienced healthcare providers and book appointments with the specialists you need.
          </p>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-gray-50 py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Specialty Filter */}
            <div className="w-full md:w-64">
              <select
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 focus:outline-none focus:ring-primary focus:border-primary"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Location Filter */}
            <div className="w-full md:w-64">
              <select
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 focus:outline-none focus:ring-primary focus:border-primary"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredDoctors.length} Doctors Found
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sort by:</span>
            <select className="border border-gray-300 rounded-md shadow-sm py-1 pl-2 pr-8 focus:outline-none focus:ring-primary focus:border-primary text-sm">
              <option>Relevance</option>
              <option>Rating: High to Low</option>
              <option>Experience: High to Low</option>
            </select>
          </div>
        </div>
        
        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-all">
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                  <Avatar className="h-24 w-24 rounded-full">
                    <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
                    <AvatarFallback className="text-2xl font-semibold text-gray-500 bg-gray-300">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardContent className="p-6 flex-1">
                  <div className="flex flex-col h-full">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{doctor.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{doctor.specialty}</p>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="flex items-center mt-3">
                        <div className={`h-3 w-3 rounded-full ${doctor.available ? 'bg-primary' : 'bg-gray-300'} mr-2`}></div>
                        <span className="text-sm text-gray-500">
                          {doctor.available ? 'Available Today' : 'Not Available'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2 mt-auto">
                      <Button asChild variant="outline" className="w-full">
                        <Link to={`/doctors/${doctor.id}`}>View Profile</Link>
                      </Button>
                      <Button asChild className="w-full" disabled={!doctor.available}>
                        <Link to={`/book/${doctor.id}`}>Book Now</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-white">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <span className="px-2">...</span>
            <Button variant="outline" size="sm">
              8
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </nav>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DoctorsPage;
