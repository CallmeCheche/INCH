
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Mic, MicOff, VideoOff, Phone, MessageSquare, Share2, Users, Settings, ChevronDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

enum CallStatus {
  NotStarted,
  Connecting,
  InProgress,
  Ended
}

const TeleconsultationPage: React.FC = () => {
  const { toast } = useToast();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.NotStarted);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  
  // Mock messages for the chat
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'doctor', 
      name: 'Dr. Amara Nwosu',
      text: 'Hello! How are you feeling today?',
      time: '10:02 AM'
    },
    { 
      id: 2, 
      sender: 'patient', 
      name: 'You',
      text: 'I\'ve been experiencing some chest pain and shortness of breath.',
      time: '10:03 AM'
    },
    { 
      id: 3, 
      sender: 'doctor', 
      name: 'Dr. Amara Nwosu',
      text: 'I see. When did these symptoms start? And do you have any history of heart problems?',
      time: '10:04 AM'
    }
  ]);

  const startCall = () => {
    setCallStatus(CallStatus.Connecting);
    setTimeout(() => {
      setCallStatus(CallStatus.InProgress);
      toast({
        title: "Connected!",
        description: "You are now in a consultation with Dr. Amara Nwosu.",
      });
    }, 2000);
  };

  const endCall = () => {
    setCallStatus(CallStatus.Ended);
    toast({
      title: "Call Ended",
      description: "Your teleconsultation has ended. A summary will be sent to your email.",
    });
  };

  const toggleMic = () => setIsMicOn(!isMicOn);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'patient',
        name: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      
      // Simulate doctor reply
      setTimeout(() => {
        const doctorReply = {
          id: messages.length + 2,
          sender: 'doctor',
          name: 'Dr. Amara Nwosu',
          text: 'Thank you for that information. Let me note that down.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, doctorReply]);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="bg-primary py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-2">
            <Link to="/dashboard" className="text-white/90 hover:text-white flex items-center">
              <ChevronDown className="h-4 w-4 mr-1" /> Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white">Teleconsultation</h1>
          <p className="text-white/90">
            Appointment with Dr. Amara Nwosu • Today at 10:00 AM
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid grid-cols-1 ${isChatOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-6`}>
          {/* Main Video Area */}
          <div className={`bg-gray-900 rounded-xl overflow-hidden ${isChatOpen ? 'lg:col-span-2' : ''} relative`}>
            <div className="aspect-video w-full">
              {/* Doctor Video */}
              <div className="absolute inset-0 flex items-center justify-center">
                {callStatus === CallStatus.NotStarted && (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <User className="h-12 w-12 text-primary-light" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Dr. Amara Nwosu</h2>
                    <p className="text-gray-300 mb-6">Cardiologist</p>
                    <Button onClick={startCall} size="lg" className="animate-pulse">
                      <Video className="mr-2 h-5 w-5" /> Start Consultation
                    </Button>
                  </div>
                )}
                
                {callStatus === CallStatus.Connecting && (
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-700 animate-pulse mb-4 mx-auto flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">AN</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-4">Connecting to Dr. Amara Nwosu...</h2>
                    <div className="flex justify-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}
                
                {callStatus === CallStatus.InProgress && (
                  <div className="bg-gray-800 h-full w-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-gray-700 mb-4 mx-auto flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">AN</span>
                      </div>
                      <h2 className="text-xl font-bold text-white">Dr. Amara Nwosu</h2>
                    </div>
                  </div>
                )}
                
                {callStatus === CallStatus.Ended && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Call Ended</h2>
                    <p className="text-gray-300 mb-6">
                      Your consultation with Dr. Amara Nwosu has ended.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="outline" className="text-white border-white hover:bg-white/10">
                        View Summary
                      </Button>
                      <Button asChild>
                        <Link to="/dashboard">Return to Dashboard</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Self-view (Your video) */}
              {callStatus === CallStatus.InProgress && (
                <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
                  {isVideoOn ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white font-bold">YOU</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <VideoOff className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
              )}
              
              {/* Call Controls */}
              {callStatus === CallStatus.InProgress && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-gray-800/80 px-4 py-2 rounded-full">
                  <button 
                    className={`p-3 rounded-full ${isMicOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'}`}
                    onClick={toggleMic}
                  >
                    {isMicOn ? <Mic className="h-6 w-6 text-white" /> : <MicOff className="h-6 w-6 text-white" />}
                  </button>
                  <button 
                    className={`p-3 rounded-full ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'}`}
                    onClick={toggleVideo}
                  >
                    {isVideoOn ? <Video className="h-6 w-6 text-white" /> : <VideoOff className="h-6 w-6 text-white" />}
                  </button>
                  <button 
                    className="p-3 rounded-full bg-red-500 hover:bg-red-600"
                    onClick={endCall}
                  >
                    <Phone className="h-6 w-6 text-white" />
                  </button>
                  <button 
                    className={`p-3 rounded-full ${isChatOpen ? 'bg-primary hover:bg-primary/90' : 'bg-gray-700 hover:bg-gray-600'}`}
                    onClick={toggleChat}
                  >
                    <MessageSquare className="h-6 w-6 text-white" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
                    <Share2 className="h-6 w-6 text-white" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
                    <Settings className="h-6 w-6 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Chat Area */}
          {isChatOpen && (
            <div className="bg-white rounded-xl border h-[600px] flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-bold">Consultation Chat</h3>
                <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'patient' 
                          ? 'bg-primary text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <div className="text-xs mb-1">
                        {message.sender === 'patient' ? 'You' : 'Dr. Amara Nwosu'} • {message.time}
                      </div>
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <form onSubmit={sendMessage} className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button type="submit" className="rounded-l-none">Send</Button>
                </form>
              </div>
            </div>
          )}
        </div>
        
        {/* Consultation Info */}
        {callStatus !== CallStatus.Ended && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-4">Consultation Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-medium">Dr. Amara Nwosu</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialty:</span>
                  <span>Cardiologist</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Scheduled Time:</span>
                  <span>10:00 AM - 10:30 AM</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-4">Your Appointment Reason</h3>
              <p className="text-gray-700">
                Chest pain and shortness of breath for the past 3 days, especially when climbing stairs or during physical activity.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-4">Technical Support</h3>
              <p className="text-gray-700 mb-4">
                Having issues with your video call? Try these troubleshooting steps:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Check your internet connection</li>
                <li>Make sure camera permissions are enabled</li>
                <li>Try refreshing the page</li>
              </ul>
              <Button variant="outline" className="mt-4 w-full">
                Contact Support
              </Button>
            </div>
          </div>
        )}
        
        {/* Post-Call Summary (only shown after call ends) */}
        {callStatus === CallStatus.Ended && (
          <div className="mt-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-4">Consultation Summary</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Doctor's Notes</h4>
                  <p className="text-gray-700">
                    Patient presented with chest pain and shortness of breath. Recommended an ECG and blood work to rule out any cardiac issues. In the meantime, advised to rest and avoid strenuous activities.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Schedule an ECG and blood test at a local laboratory within 48 hours</li>
                    <li>Take prescribed medication as directed</li>
                    <li>Follow up in one week after test results</li>
                    <li>Call emergency services if chest pain becomes severe</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Prescription</h4>
                  <div className="bg-white border p-4 rounded-lg">
                    <p className="font-medium">Nitroglycerin 0.4mg</p>
                    <p className="text-gray-600">Take 1 tablet under the tongue as needed for chest pain. Do not exceed 3 tablets within 15 minutes.</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button>Download Summary</Button>
                  <Button variant="outline">Schedule Follow-up</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {callStatus !== CallStatus.InProgress && <Footer />}
    </div>
  );
};

export default TeleconsultationPage;
