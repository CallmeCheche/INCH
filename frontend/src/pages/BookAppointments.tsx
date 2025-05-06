
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, MapPin, CreditCard, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Sample doctor profile (would come from an API in a real app)
const doctorProfile = {
  id: "1",
  name: "Dr. Amara Nwosu",
  specialty: "Cardiologist",
  location: "Heart Center, Medical Plaza, Yaoundé",
  image: "/placeholders/doctor-1.jpg",
  rating: 4.9,
  reviewCount: 124,
  bio: "Dr. Amara Nwosu is a board-certified cardiologist with over 15 years of experience in treating cardiovascular conditions. She specializes in preventive cardiology and heart failure management.",
  consultationFee: 25000, // in CFA francs
  availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
};

// Sample time slots
const generateTimeSlots = () => {
  const slots = [];
  let hour = 8; // Start at 8 AM
  while (hour < 17) { // End at 5 PM
    for (let min of [0, 30]) {
      const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      const availability = Math.random() > 0.3; // 70% chance of being available
      slots.push({ time, available: availability });
    }
    hour++;
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// Sample insurance providers
const insuranceProviders = [
  "National Health Insurance",
  "MediCover Health",
  "AfriCare Insurance",
  "Universal Health Plan",
  "None / Self-pay"
];

const BookAppointmentsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'teleconsultation'>('in-person');
  const [insuranceProvider, setInsuranceProvider] = useState("None / Self-pay");
  const [reason, setReason] = useState("");
  const [step, setStep] = useState(1);
  
  // Handle date selection logic
  const isDateAvailable = (date: Date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    return doctorProfile.availableDays.includes(day);
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      setDate(date);
      setSelectedTimeSlot(null); // Reset time slot when date changes
    }
  };
  
  // Handle booking submission
  const handleBookAppointment = () => {
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${doctorProfile.name} on ${date?.toLocaleDateString()} at ${selectedTimeSlot} has been confirmed.`,
    });
    
    // In a real app, you would send this to an API
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);
  };
  
  const nextStep = () => {
    if (step === 1 && (!date || !selectedTimeSlot)) {
      toast({
        title: "Please complete your selection",
        description: "You must select both a date and time to proceed.",
        variant: "destructive"
      });
      return;
    }
    setStep(step + 1);
  };
  
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="bg-primary py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-2">
            <Link to="/doctors" className="text-white/90 hover:text-white flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Doctors
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white">Book an Appointment</h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className={`flex items-center flex-col ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                <CalendarIcon className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm">Select Date & Time</span>
            </div>
            <div className={`w-20 h-1 mx-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center flex-col ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                <Clock className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm">Appointment Details</span>
            </div>
            <div className={`w-20 h-1 mx-1 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center flex-col ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                <CreditCard className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm">Confirm & Pay</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Changes based on step) */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                {/* Step 1: Select Date and Time */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Select a Date</h3>
                        <div className="border rounded-md p-2">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            disabled={(date) => {
                              // Disable past dates, unavailable days, and weekends
                              const day = date.getDay();
                              const now = new Date();
                              now.setHours(0, 0, 0, 0);
                              return (
                                date < now ||
                                !isDateAvailable(date)
                              );
                            }}
                            className="rounded-md border"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Dr. Nwosu is available on Monday, Tuesday, Thursday and Friday.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Select a Time</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((slot, index) => (
                            <button
                              key={index}
                              className={`p-2 rounded-md text-center transition-colors ${
                                slot.available 
                                  ? selectedTimeSlot === slot.time
                                    ? 'bg-primary text-white'
                                    : 'border hover:border-primary'
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              }`}
                              onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
                              disabled={!slot.available}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          All times are in West Africa Time (WAT).
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Appointment Details */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Appointment Details</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Appointment Type</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button 
                            className={`p-4 border rounded-md flex items-start ${
                              appointmentType === 'in-person' ? 'border-primary bg-primary/5' : ''
                            }`}
                            onClick={() => setAppointmentType('in-person')}
                          >
                            <div className="mr-3 mt-1">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                appointmentType === 'in-person' ? 'border-primary' : 'border-gray-300'
                              }`}>
                                {appointmentType === 'in-person' && (
                                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium">In-Person Visit</h4>
                              <p className="text-sm text-gray-500">Visit the doctor at their office location</p>
                            </div>
                          </button>
                          
                          <button 
                            className={`p-4 border rounded-md flex items-start ${
                              appointmentType === 'teleconsultation' ? 'border-primary bg-primary/5' : ''
                            }`}
                            onClick={() => setAppointmentType('teleconsultation')}
                          >
                            <div className="mr-3 mt-1">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                appointmentType === 'teleconsultation' ? 'border-primary' : 'border-gray-300'
                              }`}>
                                {appointmentType === 'teleconsultation' && (
                                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium">Teleconsultation</h4>
                              <p className="text-sm text-gray-500">Video call with the doctor from anywhere</p>
                            </div>
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Insurance Provider</h3>
                        <select
                          className="w-full p-2 border rounded-md"
                          value={insuranceProvider}
                          onChange={(e) => setInsuranceProvider(e.target.value)}
                        >
                          {insuranceProviders.map((provider, index) => (
                            <option key={index} value={provider}>{provider}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Reason for Visit</h3>
                        <textarea
                          className="w-full p-3 border rounded-md h-32"
                          placeholder="Please describe your symptoms or reason for this appointment..."
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Confirm and Pay */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Confirm & Pay</h2>
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-medium mb-3">Appointment Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Doctor:</span>
                            <span className="font-medium">{doctorProfile.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Specialty:</span>
                            <span>{doctorProfile.specialty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span>{date?.toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Time:</span>
                            <span>{selectedTimeSlot} WAT</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Appointment Type:</span>
                            <span>{appointmentType === 'in-person' ? 'In-Person Visit' : 'Teleconsultation'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Insurance:</span>
                            <span>{insuranceProvider}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Payment Method</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <button className="p-3 border rounded-md text-center hover:border-primary">
                            Mobile Money (MoMo)
                          </button>
                          <button className="p-3 border rounded-md text-center hover:border-primary">
                            Orange Money
                          </button>
                          <button className="p-3 border rounded-md text-center hover:border-primary">
                            UBA Bank
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-medium mb-3">Payment Summary</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Consultation Fee</span>
                            <span>{doctorProfile.consultationFee.toLocaleString()} FCFA</span>
                          </div>
                          {appointmentType === 'teleconsultation' && (
                            <div className="flex justify-between">
                              <span>Platform Fee</span>
                              <span>1,000 FCFA</span>
                            </div>
                          )}
                          <div className="border-t pt-2 mt-2 font-medium flex justify-between">
                            <span>Total Amount</span>
                            <span>
                              {(doctorProfile.consultationFee + (appointmentType === 'teleconsultation' ? 1000 : 0)).toLocaleString()} FCFA
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mt-1 mr-2">
                          <div className="w-5 h-5 border rounded flex items-center justify-center">
                            <Check className="h-4 w-4" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and acknowledge that a cancellation fee may apply for appointments cancelled with less than 24 hours notice.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <Button onClick={nextStep}>
                  Continue <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleBookAppointment}>
                  Confirm and Pay
                </Button>
              )}
            </div>
          </div>
          
          {/* Doctor Information Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Doctor Information</h3>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-semibold text-gray-600">
                      {doctorProfile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{doctorProfile.name}</h4>
                    <p className="text-gray-600">{doctorProfile.specialty}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-start mb-2">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{doctorProfile.location}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                      <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium ml-1">{doctorProfile.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({doctorProfile.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-1">About</h4>
                  <p className="text-gray-600 text-sm">{doctorProfile.bio}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Available Days</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                      <span 
                        key={day} 
                        className={`px-3 py-1 rounded-full text-sm ${
                          doctorProfile.availableDays.includes(day) 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4">
              <Link to={`/doctors/${doctorProfile.id}`} className="text-primary hover:underline text-sm">
                View Full Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookAppointmentsPage;
