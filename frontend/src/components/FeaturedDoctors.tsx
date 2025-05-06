
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

// Updated doctor data with proper image paths
const doctors = [
  {
    id: 1,
    name: "Dr. Ama Mensah",
    specialty: "Cardiologist",
    rating: 4.9,
    reviewCount: 124,
    image: "/lovable-uploads/5589a94f-7d68-42e6-9c01-09851bb50108.png",
    available: true,
    gender: "female"
  },
  {
    id: 2,
    name: "Dr. Kwame Nkrumah",
    specialty: "Pediatrician",
    rating: 4.8,
    reviewCount: 96,
    image: "/lovable-uploads/c43c2f96-c9fe-401b-b4de-adf0dba7af98.png",
    available: true,
    gender: "male"
  },
  {
    id: 3,
    name: "Dr. Ngozi Okonkwo",
    specialty: "Dermatologist",
    rating: 4.7,
    reviewCount: 87,
    image: "/lovable-uploads/e37679a1-94a0-4d90-ab16-ad62bd683ef8.png",
    available: false,
    gender: "female"
  },
  {
    id: 4,
    name: "Dr. Fatima Diallo",
    specialty: "Neurologist",
    rating: 4.9,
    reviewCount: 112,
    image: "/lovable-uploads/f9489664-1212-48d0-89af-7e7a0043fb76.png",
    available: true,
    gender: "female"
  }
];

const FeaturedDoctors: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Featured Specialists</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with our top-rated healthcare professionals committed to providing excellent care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="aspect-square relative">
                <Avatar className="h-full w-full rounded-none">
                  <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
                  <AvatarFallback className="text-2xl font-semibold text-gray-500 bg-gray-300 rounded-none">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialty}</p>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <div className={`h-3 w-3 rounded-full ${doctor.available ? 'bg-primary' : 'bg-gray-300'} mr-2`}></div>
                  <span className="text-sm text-gray-500">
                    {doctor.available ? 'Available Today' : 'Not Available'}
                  </span>
                </div>
                <div className="mt-4">
                  <Link to={`/doctors/${doctor.id}`}>
                    <Button variant="outline" className="w-full">View Profile</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild>
            <Link to="/doctors">View All Doctors</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
