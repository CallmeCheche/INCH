
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
export const API_ENDPOINTS = {
  // Authentification
  csrf: `${API_URL}/sanctum/csrf-cookie`,
  login: `${API_URL}/api/login`,
  register: `${API_URL}/api/register`,
  logout: `${API_URL}/api/logout`,
  user: `${API_URL}/api/user`,
  
  // Médecins
  doctors: `${API_URL}/api/doctors`,
  doctorDetail: (id: number) => `${API_URL}/api/doctors/${id}`,
  doctorDashboardStats: `${API_URL}/api/doctors/dashboard/stats`,
  doctorAppointments: `${API_URL}/api/doctors/appointments`,
  doctorPatients: `${API_URL}/api/doctors/patients`,
  
  // Patients
  patientDashboardStats: `${API_URL}/api/patients/dashboard/stats`,
  patientAppointments: `${API_URL}/api/patients/appointments`,
  patientProfile: `${API_URL}/api/patients/profile`,
  updatePatientProfile: `${API_URL}/api/patients/profile`,
  
  // Rendez-vous
  appointments: `${API_URL}/api/appointments`,
  appointmentDetail: (id: number) => `${API_URL}/api/appointments/${id}`,
};
