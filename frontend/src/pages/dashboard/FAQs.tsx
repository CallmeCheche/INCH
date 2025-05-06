
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import DashboardLayout from '@/components/DashboardLayout';
import { Link } from 'react-router-dom';

// FAQ categories and questions
const faqCategories = [
  {
    id: 'general',
    name: 'General',
    questions: [
      {
        id: 'q1',
        question: 'What is HealthConnect?',
        answer: 'HealthConnect is a telehealth platform that connects patients with healthcare professionals. Our platform offers virtual consultations, appointment booking, and healthcare management services to provide accessible healthcare solutions.'
      },
      {
        id: 'q2',
        question: 'How do I create an account?',
        answer: 'To create an account, click on the "Register" button in the top right corner of the homepage. Fill in your personal information, create a password, and agree to the terms of service. Once registered, you can log in to access our services.'
      },
      {
        id: 'q3',
        question: 'Is my personal information secure?',
        answer: 'Yes, we take the security and privacy of your personal information seriously. We use industry-standard encryption and security measures to protect your data. Our platform complies with healthcare data protection regulations.'
      },
      {
        id: 'q4',
        question: 'What devices can I use to access HealthConnect?',
        answer: 'HealthConnect is accessible via any device with an internet connection, including desktop computers, laptops, tablets, and smartphones. We recommend using the latest version of Chrome, Firefox, Safari, or Edge browsers for the best experience.'
      }
    ]
  },
  {
    id: 'appointments',
    name: 'Appointments & Consultations',
    questions: [
      {
        id: 'q5',
        question: 'How do I book an appointment?',
        answer: 'To book an appointment, navigate to the "Doctors" page, select a healthcare provider, and click "Book Appointment." Choose your preferred date, time, and consultation type, then confirm your booking. You\'ll receive a confirmation email with details.'
      },
      {
        id: 'q6',
        question: 'Can I cancel or reschedule my appointment?',
        answer: 'Yes, you can cancel or reschedule appointments up to 24 hours before the scheduled time without any penalty. Go to the "Appointments" section in your dashboard, find the appointment, and click on "Reschedule" or "Cancel".'
      },
      {
        id: 'q7',
        question: 'What types of consultations do you offer?',
        answer: 'We offer various consultation types including video calls, phone calls, and in-person visits. The availability of these options may vary depending on the healthcare provider and their practice.'
      },
      {
        id: 'q8',
        question: 'How long are typical consultations?',
        answer: 'The duration of consultations varies depending on the type and complexity of the medical issue. Generally, initial consultations last about 30 minutes, while follow-up consultations may be shorter.'
      }
    ]
  },
  {
    id: 'technical',
    name: 'Technical Support',
    questions: [
      {
        id: 'q9',
        question: 'What do I need for a video consultation?',
        answer: 'For a video consultation, you need a device with a camera and microphone (smartphone, tablet, or computer), a stable internet connection, and a private, well-lit space. We recommend testing your equipment before your appointment.'
      },
      {
        id: 'q10',
        question: 'Why can\'t I join my video consultation?',
        answer: 'If you\'re having trouble joining a video consultation, check your internet connection, ensure your camera and microphone permissions are enabled in your browser, and try refreshing the page. If problems persist, contact our technical support.'
      },
      {
        id: 'q11',
        question: 'How can I test my equipment before a consultation?',
        answer: 'You can test your equipment by clicking on the "Test Equipment" button in your dashboard before your appointment. This will check your camera, microphone, and internet connection to ensure everything is working properly.'
      },
      {
        id: 'q12',
        question: 'What should I do if I experience technical issues during a consultation?',
        answer: 'If you experience technical issues during a consultation, try refreshing your browser or restarting the application. If problems persist, you can message the doctor through the chat function or call our technical support number for immediate assistance.'
      }
    ]
  },
  {
    id: 'billing',
    name: 'Billing & Insurance',
    questions: [
      {
        id: 'q13',
        question: 'What payment methods do you accept?',
        answer: 'We accept various payment methods including credit/debit cards, mobile money services, and bank transfers. In some regions, we also accept health insurance for covered services.'
      },
      {
        id: 'q14',
        question: 'Does insurance cover telehealth consultations?',
        answer: 'Many insurance providers now cover telehealth consultations, but coverage varies by provider and plan. We recommend checking with your insurance provider before booking an appointment to confirm coverage.'
      },
      {
        id: 'q15',
        question: 'When am I charged for a consultation?',
        answer: 'You\'re charged for a consultation at the time of booking. If you cancel more than 24 hours before the appointment, you\'ll receive a full refund. For late cancellations, our refund policy applies as outlined in our terms of service.'
      },
      {
        id: 'q16',
        question: 'How do I get a receipt for my consultation?',
        answer: 'Receipts are automatically generated and sent to your registered email address after the consultation is completed. You can also access and download your receipts from the "Payments" section in your dashboard.'
      }
    ]
  }
];

const FAQsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  
  // Filter questions based on search term
  const filteredFAQs = searchTerm
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(q =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;

  return (
    <DashboardLayout userType="patient">
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find answers to common questions about our services</p>
        </div>
        
        {/* Search bar */}
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {searchTerm ? (
          // Search results
          <div className="space-y-6">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map(category => (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription>
                      Found {category.questions.length} result{category.questions.length !== 1 ? 's' : ''} in this category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map(faq => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left font-medium">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-700">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No results found for "{searchTerm}"</p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        ) : (
          // Regular FAQ categories
          <div className="grid grid-cols-1 gap-6">
            {/* Category tabs */}
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {faqCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 whitespace-nowrap rounded-md ${
                    activeCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Active category content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {faqCategories.find(c => c.id === activeCategory)?.name}
                </CardTitle>
                <CardDescription>
                  Find answers to common questions about {faqCategories.find(c => c.id === activeCategory)?.name.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqCategories
                    .find(c => c.id === activeCategory)
                    ?.questions.map(faq => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </CardContent>
            </Card>
            
            {/* Contact support card */}
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Still have questions?</h3>
                  <p className="text-gray-600 mb-4">
                    If you can't find the answer you're looking for, please contact our support team.
                  </p>
                  <Button asChild>
                    <Link to="/dashboard/contact-support">Contact Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FAQsPage;
