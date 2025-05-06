
import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Grace Osei",
    role: "Patient",
    content: "HealthConnect made it incredibly easy to find a specialist near me. The booking process was smooth, and I love that I can see doctors' ratings before choosing.",
    image: "/placeholders/testimonial-1.jpg"
  },
  {
    name: "Dr. Kofi Mensah",
    role: "Cardiologist",
    content: "As a doctor, HealthConnect has helped me organize my schedule and connect with patients more efficiently. The platform is intuitive and streamlines the administrative aspects.",
    image: "/placeholders/testimonial-2.jpg"
  },
  {
    name: "Amina Diop",
    role: "Parent",
    content: "I manage healthcare appointments for my entire family through HealthConnect. The teleconsultation feature has been a game-changer, especially for minor check-ups.",
    image: "/placeholders/testimonial-3.jpg"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say About Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from patients and healthcare providers who use our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-gray-200" />
              <div className="mb-6">
                <div className="h-12 w-12 rounded-full bg-gray-300 mb-4 flex items-center justify-center overflow-hidden">
                  {/* Image placeholder */}
                  <span className="text-sm font-medium text-gray-600">
                    {testimonial.name.split(' ').map(word => word[0]).join('')}
                  </span>
                </div>
                <h4 className="font-bold text-lg text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
              <p className="text-gray-600 italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
