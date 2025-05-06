import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Calendar, 
  MessageSquare, 
  Phone, 
  Video, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  User,
  ThumbsUp 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import DoctorProfileHeader from "@/components/DoctorProfileHeader";
import DoctorEducation from "@/components/DoctorEducation";
import DoctorReviews from "@/components/DoctorReviews";
import DoctorBookingSidebar from "@/components/DoctorBookingSidebar";

const doctorsData = [
  // Sample doctor data - we'll match this with the doctors from the Doctors page
  {
    id: 1,
    name: "Dr. Amara Nwosu",
    specialty: "Cardiologist",
    location: "Accra Medical Center, Accra, Ghana",
    bio: "Dr. Amara Nwosu is a board-certified cardiologist with over 12 years of experience in diagnosing and treating cardiovascular diseases. She specializes in preventive cardiology, heart failure management, and cardiac rehabilitation.",
    experience: "12 years",
    education: [
      { degree: "MD", institution: "University of Ghana Medical School", year: "2009" },
      { degree: "Residency in Internal Medicine", institution: "Korle-Bu Teaching Hospital", year: "2012" },
      { degree: "Fellowship in Cardiology", institution: "Lagos University Teaching Hospital", year: "2015" }
    ],
    specializations: [
      "Preventive Cardiology", 
      "Heart Failure Management",
      "Cardiac Rehabilitation",
      "Echocardiography",
      "Hypertension Management"
    ],
    languages: ["English", "Twi", "French"],
    rating: 4.9,
    reviewCount: 124,
    consultationFee: 200,
    currency: "GHS",
    available: true,
    image: "/lovable-uploads/5589a94f-7d68-42e6-9c01-09851bb50108.png",
    workingHours: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 1:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 5:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ],
    reviews: [
      {
        id: 1,
        name: "James Osei",
        date: "March 15, 2025",
        rating: 5,
        comment: "Dr. Nwosu was thorough and attentive. She explained everything clearly and made me feel comfortable throughout the consultation.",
        helpful: 12
      },
      {
        id: 2,
        name: "Abena Koranteng",
        date: "February 28, 2025",
        rating: 4,
        comment: "Very knowledgeable doctor who takes time to answer questions. The wait time was a bit long though.",
        helpful: 5
      }
    ]
  },
  {
    id: 2,
    name: "Dr. Kwame Osei",
    specialty: "Pediatrician",
    location: "Kumasi Children's Hospital, Kumasi, Ghana",
    bio: "Dr. Kwame Osei is a dedicated pediatrician with over 15 years of experience in children's healthcare. He specializes in childhood development, preventive care, and treating common childhood illnesses.",
    experience: "15 years",
    education: [
      { degree: "MD", institution: "University of Ibadan Medical School", year: "2006" },
      { degree: "Residency in Pediatrics", institution: "Komfo Anokye Teaching Hospital", year: "2010" },
      { degree: "Fellowship in Pediatric Critical Care", institution: "Red Cross Children's Hospital, Cape Town", year: "2012" }
    ],
    specializations: [
      "Child Development", 
      "Preventive Care",
      "Childhood Illnesses",
      "Pediatric Nutrition",
      "Vaccinations"
    ],
    languages: ["English", "Ashanti Twi", "Hausa"],
    rating: 4.8,
    reviewCount: 96,
    consultationFee: 180,
    currency: "GHS",
    available: true,
    image: "/lovable-uploads/c43c2f96-c9fe-401b-b4de-adf0dba7af98.png",
    workingHours: [
      { day: "Monday", hours: "8:30 AM - 4:30 PM" },
      { day: "Tuesday", hours: "8:30 AM - 4:30 PM" },
      { day: "Wednesday", hours: "8:30 AM - 12:30 PM" },
      { day: "Thursday", hours: "8:30 AM - 4:30 PM" },
      { day: "Friday", hours: "8:30 AM - 4:30 PM" },
      { day: "Saturday", hours: "9:00 AM - 1:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ],
    reviews: [
      {
        id: 1,
        name: "Akosua Mensah",
        date: "April 2, 2025",
        rating: 5,
        comment: "Dr. Osei is wonderful with children. My son who is usually afraid of doctors was very comfortable with him.",
        helpful: 18
      },
      {
        id: 2,
        name: "Kofi Boateng",
        date: "March 20, 2025",
        rating: 5,
        comment: "Excellent pediatrician. Very patient and thorough in his examination.",
        helpful: 7
      }
    ]
  },
  {
    id: 3,
    name: "Dr. Fatima Diallo",
    specialty: "Dermatologist",
    location: "Skin Care Clinic, Bamenda, Cameroon",
    bio: "Dr. Fatima Diallo is a board-certified dermatologist with expertise in treating various skin conditions and cosmetic dermatology. She has been practicing for over 10 years.",
    experience: "10 years",
    education: [
      { degree: "MD", institution: "University of Dakar Medical School", year: "2011" },
      { degree: "Residency in Dermatology", institution: "Yaoundé Central Hospital", year: "2015" },
      { degree: "Fellowship in Cosmetic Dermatology", institution: "Cairo University Hospital", year: "2017" }
    ],
    specializations: [
      "Medical Dermatology", 
      "Cosmetic Dermatology",
      "Skin Cancer Screening",
      "Acne Treatment",
      "Eczema Management"
    ],
    languages: ["English", "French", "Wolof"],
    rating: 4.7,
    reviewCount: 87,
    consultationFee: 250,
    currency: "XAF",
    available: false,
    image: "/lovable-uploads/e37679a1-94a0-4d90-ab16-ad62bd683ef8.png",
    workingHours: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 3:00 PM" },
      { day: "Saturday", hours: "Closed" },
      { day: "Sunday", hours: "Closed" }
    ],
    reviews: [
      {
        id: 1,
        name: "Marie Nkeng",
        date: "February 10, 2025",
        rating: 4,
        comment: "Dr. Diallo helped clear my chronic acne when other treatments failed. Very knowledgeable and professional.",
        helpful: 9
      },
      {
        id: 2,
        name: "Paul Biya",
        date: "January 5, 2025",
        rating: 5,
        comment: "Excellent dermatologist. She diagnosed my skin condition correctly and the treatment worked wonderfully.",
        helpful: 12
      }
    ]
  },
  {
    id: 4,
    name: "Dr. Chijioke Okonkwo",
    specialty: "Neurologist",
    location: "Neurology Center, Yaoundé, Cameroon",
    bio: "Dr. Chijioke Okonkwo is a highly qualified neurologist specializing in stroke management, epilepsy, and headache disorders. He combines traditional medical approaches with modern techniques.",
    experience: "14 years",
    education: [
      { degree: "MD", institution: "University of Lagos Medical School", year: "2007" },
      { degree: "Residency in Neurology", institution: "University College Hospital, Ibadan", year: "2012" },
      { degree: "Fellowship in Stroke Medicine", institution: "Groote Schuur Hospital, Cape Town", year: "2014" }
    ],
    specializations: [
      "Stroke Management", 
      "Epilepsy",
      "Headache Disorders",
      "Movement Disorders",
      "Neuromuscular Diseases"
    ],
    languages: ["English", "Igbo", "French"],
    rating: 4.9,
    reviewCount: 112,
    consultationFee: 270,
    currency: "XAF",
    available: true,
    image: "/lovable-uploads/f9489664-1212-48d0-89af-7e7a0043fb76.png",
    workingHours: [
      { day: "Monday", hours: "8:00 AM - 4:00 PM" },
      { day: "Tuesday", hours: "8:00 AM - 4:00 PM" },
      { day: "Wednesday", hours: "8:00 AM - 12:00 PM" },
      { day: "Thursday", hours: "8:00 AM - 4:00 PM" },
      { day: "Friday", hours: "8:00 AM - 4:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 1:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ],
    reviews: [
      {
        id: 1,
        name: "Chidi Eze",
        date: "March 25, 2025",
        rating: 5,
        comment: "Dr. Okonkwo is exceptional. His diagnosis was spot on and the treatment plan has significantly improved my condition.",
        helpful: 15
      },
      {
        id: 2,
        name: "Ngozi Adichie",
        date: "February 18, 2025",
        rating: 5,
        comment: "One of the best neurologists I've ever consulted. Very thorough and compassionate.",
        helpful: 10
      }
    ]
  },
  {
    id: 5,
    name: "Dr. Nadia Mensah",
    specialty: "Oncologist",
    location: "Cancer Care Center, Douala, Cameroon",
    bio: "Dr. Nadia Mensah is a compassionate oncologist with expertise in breast cancer, lymphoma, and palliative care. She adopts a patient-centered approach to cancer treatment.",
    experience: "11 years",
    education: [
      { degree: "MD", institution: "University of Cape Coast Medical School", year: "2010" },
      { degree: "Residency in Internal Medicine", institution: "37 Military Hospital, Accra", year: "2014" },
      { degree: "Fellowship in Oncology", institution: "Groote Schuur Hospital, Cape Town", year: "2017" }
    ],
    specializations: [
      "Breast Cancer", 
      "Lymphoma",
      "Palliative Care",
      "Cancer Screening",
      "Chemotherapy Management"
    ],
    languages: ["English", "Fante", "French"],
    rating: 4.8,
    reviewCount: 78,
    consultationFee: 300,
    currency: "XAF",
    available: true,
    image: "/lovable-uploads/d6031b29-4bab-40d8-bea1-3889b19c7fcc.png",
    workingHours: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 3:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 1:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ],
    reviews: [
      {
        id: 1,
        name: "Abena Owusu",
        date: "April 5, 2025",
        rating: 5,
        comment: "Dr. Mensah is not only professionally competent but also extremely compassionate. She made my cancer journey bearable.",
        helpful: 20
      },
      {
        id: 2,
        name: "Kwaku Manu",
        date: "March 12, 2025",
        rating: 4,
        comment: "Very knowledgeable and caring doctor. Explains everything in detail and is always available for questions.",
        helpful: 8
      }
    ]
  },
  {
    id: 6,
    name: "Dr. Ibrahim Toure",
    specialty: "Gynecologist",
    location: "Women's Health Center, Bafoussam, Cameroon",
    bio: "Dr. Ibrahim Toure is a skilled gynecologist specializing in women's reproductive health, prenatal care, and gynecological surgeries. He is known for his gentle approach and comprehensive care.",
    experience: "13 years",
    education: [
      { degree: "MD", institution: "University of Bamako Medical School", year: "2008" },
      { degree: "Residency in Obstetrics & Gynecology", institution: "Point G Hospital, Bamako", year: "2013" },
      { degree: "Fellowship in Gynecological Oncology", institution: "Institut Curie, Dakar", year: "2015" }
    ],
    specializations: [
      "Prenatal Care", 
      "Gynecological Surgery",
      "Reproductive Health",
      "Family Planning",
      "Menopause Management"
    ],
    languages: ["French", "English", "Bambara"],
    rating: 4.6,
    reviewCount: 92,
    consultationFee: 220,
    currency: "XAF",
    available: true,
    image: "/lovable-uploads/758fe8aa-6f60-48b8-a5ae-2657946468ac.png",
    workingHours: [
      { day: "Monday", hours: "8:30 AM - 4:30 PM" },
      { day: "Tuesday", hours: "8:30 AM - 4:30 PM" },
      { day: "Wednesday", hours: "8:30 AM - 12:30 PM" },
      { day: "Thursday", hours: "8:30 AM - 4:30 PM" },
      { day: "Friday", hours: "8:30 AM - 4:30 PM" },
      { day: "Saturday", hours: "9:00 AM - 12:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ],
    reviews: [
      {
        id: 1,
        name: "Aminata Diallo",
        date: "March 30, 2025",
        rating: 5,
        comment: "Dr. Toure made me feel comfortable during my prenatal visits. His expertise and care made my pregnancy journey smooth.",
        helpful: 14
      },
      {
        id: 2,
        name: "Fatou Sow",
        date: "February 22, 2025",
        rating: 4,
        comment: "Professional and respectful doctor. Takes time to explain everything clearly.",
        helpful: 7
      }
    ]
  },
  {
    id: 7,
    name: "Dr. Esther Adeyemi",
    specialty: "Orthopedic Surgeon",
    location: "Orthopedic Clinic, Yaoundé, Cameroon",
    bio: "Dr. Esther Adeyemi is an accomplished orthopedic surgeon specializing in joint replacement, sports injuries, and trauma surgery. She is dedicated to helping patients regain mobility and improve their quality of life.",
    experience: "9 years",
    education: [
      { degree: "MD", institution: "University of Ibadan Medical School", year: "2012" },
      { degree: "Residency in Orthopedic Surgery", institution: "University College Hospital, Ibadan", year: "2017" },
      { degree: "Fellowship in Joint Replacement", institution: "Groote Schuur Hospital, Cape Town", year: "2019" }
    ],
    specializations: [
      "Joint Replacement", 
      "Sports Injuries",
      "Trauma Surgery",
      "Arthroscopic Surgery",
      "Rehabilitation"
    ],
    languages: ["English", "Yoruba", "French"],
    rating: 4.7,
    reviewCount: 103,
    consultationFee: 280,
    currency: "XAF",
    available: false,
    image: "/lovable-uploads/f52a7b7f-975f-40e2-95e8-79d5f5994ffe.png",
    workingHours: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 3:00 PM" },
      { day: "Saturday", hours: "Closed" },
      { day: "Sunday", hours: "Closed" }
    ],
    reviews: [
      {
        id: 1,
        name: "Bisi Johnson",
        date: "April 8, 2025",
        rating: 5,
        comment: "Dr. Adeyemi performed my knee replacement surgery with exceptional skill. My recovery was faster than expected.",
        helpful: 16
      },
      {
        id: 2,
        name: "Tunde Okoro",
        date: "March 15, 2025",
        rating: 4,
        comment: "Very skilled surgeon. The arthroscopic surgery she performed on my shoulder was minimally invasive and effective.",
        helpful: 9
      }
    ]
  },
  {
    id: 8,
    name: "Dr. Samuel Koffi",
    specialty: "Psychiatrist",
    location: "Mental Health Center, Douala, Cameroon",
    bio: "Dr. Samuel Koffi is a compassionate psychiatrist specializing in mood disorders, anxiety, and addiction treatment. He takes a holistic approach to mental health, combining medication with therapy and lifestyle changes.",
    experience: "10 years",
    education: [
      { degree: "MD", institution: "University of Lomé Medical School", year: "2011" },
      { degree: "Residency in Psychiatry", institution: "Sylvanus Olympio University Hospital, Lomé", year: "2015" },
      { degree: "Fellowship in Addiction Psychiatry", institution: "University of Cape Town", year: "2017" }
    ],
    specializations: [
      "Mood Disorders", 
      "Anxiety Disorders",
      "Addiction Treatment",
      "Psychotherapy",
      "Child & Adolescent Psychiatry"
    ],
    languages: ["French", "English", "Ewe"],
    rating: 4.8,
    reviewCount: 89,
    consultationFee: 240,
    currency: "XAF",
    available: true,
    image: "/lovable-uploads/0e8da55c-994b-4fe9-8e36-4cdc660efd8f.png",
    workingHours: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 1:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 5:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ],
    reviews: [
      {
        id: 1,
        name: "Kossi Adebayor",
        date: "March 20, 2025",
        rating: 5,
        comment: "Dr. Koffi is an excellent psychiatrist who listens attentively and provides personalized treatment plans. He has helped me manage my anxiety effectively.",
        helpful: 18
      },
      {
        id: 2,
        name: "Ama Dede",
        date: "February 15, 2025",
        rating: 5,
        comment: "Compassionate and non-judgmental doctor. Made me feel comfortable discussing my mental health issues.",
        helpful: 12
      }
    ]
  }
];

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [expanded, setExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  const doctorId = parseInt(id || "1");
  const doctorData = doctorsData.find(doctor => doctor.id === doctorId) || doctorsData[0];
  
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayOfMonth: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    
    return dates;
  };
  
  const availableDates = generateDates();
  
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];
  
  const toggleBio = () => {
    setExpanded(!expanded);
  };
  
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };
  
  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-6">
            <CardContent className="p-6">
              <DoctorProfileHeader
                doctorData={doctorData}
                expanded={expanded}
                toggleBio={toggleBio}
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="about">
                <TabsList className="w-full">
                  <TabsTrigger value="about" className="flex-1">
                    About
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger value="location" className="flex-1">
                    Location
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="mt-6 space-y-6">
                  <DoctorEducation education={doctorData.education} />
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Specializations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {doctorData.specializations.map((spec, index) => (
                          <div key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                            <span className="text-sm text-gray-700">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Working Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="divide-y divide-gray-100">
                        {doctorData.workingHours.map((schedule, index) => (
                          <li key={index} className="py-2 flex justify-between">
                            <span className="font-medium text-gray-700">{schedule.day}</span>
                            <span className="text-gray-600">{schedule.hours}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <DoctorReviews doctorData={doctorData} />
                </TabsContent>
                
                <TabsContent value="location" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Practice Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-200 h-64 w-full mb-4 flex items-center justify-center">
                        <p className="text-gray-500">Map Location Placeholder</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {doctorData.location.split(",")[0]}
                        </h4>
                        <p className="text-gray-700 mb-4">
                          {doctorData.location}
                        </p>
                        <Button variant="outline" size="sm">
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <DoctorBookingSidebar
                doctorData={doctorData}
                availableDates={availableDates}
                selectedDate={selectedDate}
                selectedTimeSlot={selectedTimeSlot}
                timeSlots={timeSlots}
                handleDateSelect={handleDateSelect}
                handleTimeSlotSelect={handleTimeSlotSelect}
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DoctorProfile;
