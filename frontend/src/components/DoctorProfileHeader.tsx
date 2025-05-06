
import React from 'react';
import { MapPin, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface DoctorProfileHeaderProps {
  doctorData: any;
  expanded: boolean;
  toggleBio: () => void;
}

const DoctorProfileHeader: React.FC<DoctorProfileHeaderProps> = ({ doctorData, expanded, toggleBio }) => (
  <div className="flex flex-col md:flex-row">
    <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
      <Avatar className="h-48 w-48 rounded-full">
        <AvatarImage 
          src={doctorData.image} 
          alt={doctorData.name} 
          className="object-cover"
        />
        <AvatarFallback className="text-4xl font-semibold text-gray-500 bg-gray-200">
          {doctorData.name.split(' ').map((n: string) => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
    </div>
    <div className="md:w-3/4 md:pl-8">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{doctorData.name}</h1>
          <p className="text-lg text-gray-600">{doctorData.specialty}</p>
          <div className="flex items-center mt-1 text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {doctorData.location}
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="bg-yellow-50 px-3 py-1 rounded-full inline-flex items-center">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-medium">{doctorData.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({doctorData.reviewCount} reviews)</span>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className={`text-gray-700 ${expanded ? '' : 'line-clamp-3'}`}>
          {doctorData.bio}
        </p>
        <button 
          onClick={toggleBio} 
          className="text-secondary font-medium flex items-center mt-1"
        >
          {expanded ? (
            <>
              Read less
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Read more
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-primary">{doctorData.experience} Experience</span>
        </div>
        <div className="bg-secondary/10 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-secondary">{doctorData.available ? 'Available Today' : 'Not Available Today'}</span>
        </div>
        <div className="bg-gray-100 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-700">Speaks {doctorData.languages.join(", ")}</span>
        </div>
      </div>
    </div>
  </div>
);

export default DoctorProfileHeader;
