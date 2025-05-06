
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import Profile from "./pages/Profile";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LearnMore from "./pages/LearnMore";
import BookAppointments from "./pages/BookAppointments";
import Teleconsultation from "./pages/Teleconsultation";
import AdminDashboard from "./pages/AdminDashboard";
import PractitionerDashboard from "./pages/PractitionerDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import DatabaseStructure from "./pages/DatabaseStructure";

// New dashboard pages
import Consultations from "./pages/dashboard/Consultations";
import Appointments from "./pages/dashboard/Appointments";
import ContactSupport from "./pages/dashboard/ContactSupport";
import FAQs from "./pages/dashboard/FAQs";
import Records from "./pages/dashboard/Records";
import Settings from "./pages/dashboard/Settings";

import "./i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorProfile />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/book-appointments" element={<BookAppointments />} />
            <Route path="/book/:id" element={<BookAppointments />} />
            <Route path="/teleconsultation" element={<Teleconsultation />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/practitioner-dashboard" element={<PractitionerDashboard />} />
            <Route path="/database-structure" element={<DatabaseStructure />} />
            
            {/* Doctor dashboard routes */}
            <Route path="/doctor-dashboard/:id" element={<DoctorDashboard />} />
            
            {/* Patient dashboard routes */}
            <Route path="/dashboard/consultations" element={<Consultations />} />
            <Route path="/dashboard/appointments" element={<Appointments />} />
            <Route path="/dashboard/contact-support" element={<ContactSupport />} />
            <Route path="/dashboard/faqs" element={<FAQs />} />
            <Route path="/dashboard/records" element={<Records />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </I18nextProvider>
);

export default App;
