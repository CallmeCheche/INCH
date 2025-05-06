
import React from 'react';
import { MessageSquare, Phone, Mail, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ContactSupportPage: React.FC = () => {
  return (
    <DashboardLayout userType="patient">
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Support</h1>
          <p className="text-gray-600">Our team is here to help with any questions or issues</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Send us a message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="issueType">Issue type</Label>
                    <Select>
                      <SelectTrigger id="issueType">
                        <SelectValue placeholder="Select an issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="appointment">Appointment Problem</SelectItem>
                        <SelectItem value="account">Account Management</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please describe your issue in detail..." 
                      rows={6}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Submit Request
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact information sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
                <CardDescription>Reach us directly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone Support</p>
                    <p className="text-gray-900">+123 456 7890</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 8am-6pm</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email Support</p>
                    <p className="text-gray-900">support@healthconnect.com</p>
                    <p className="text-sm text-gray-500">24/7 response</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Live Chat</p>
                    <p className="text-gray-900">Chat with our support team</p>
                    <p className="text-sm text-gray-500">Available 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">How do I reschedule an appointment?</h4>
                  <p className="text-sm text-gray-600">
                    You can reschedule from the Appointments page up to 24 hours before your scheduled time.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">How do video consultations work?</h4>
                  <p className="text-sm text-gray-600">
                    Our platform uses secure video technology. Simply join the call at your appointment time.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">What payment methods do you accept?</h4>
                  <p className="text-sm text-gray-600">
                    We accept credit/debit cards, mobile money, and health insurance.
                  </p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/dashboard/faqs">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    View All FAQs
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactSupportPage;
