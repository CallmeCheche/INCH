import { API_URL } from '@/config/api';

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviewCount: number;
  image: string | null;
  available: boolean;
  gender: string;
  bio?: string;
  education?: string;
  experience?: string;
}

export interface DoctorStats {
  upcomingAppointments: number;
  totalPatients: number;
  revenueThisMonth: number;
  currency: string;
}

export interface DoctorPatient {
  id: number;
  name: string;
  email: string;
  image: string | null;
  gender: string;
  age: number;
  phone: string;
}

export const doctorService = {
  async getDoctors() {
    const response = await fetch(`${API_URL}/api/doctors`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }

    return response.json() as Promise<Doctor[]>;
  },

  async getDoctor(id: number) {
    const response = await fetch(`${API_URL}/api/doctors/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch doctor');
    }

    return response.json() as Promise<Doctor>;
  },

  async getDashboardStats() {
    const response = await fetch(`${API_URL}/api/doctors/dashboard/stats`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }

    return response.json() as Promise<DoctorStats>;
  },

  async getAppointments() {
    const response = await fetch(`${API_URL}/api/doctors/appointments`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }

    return response.json();
  },

  async getPatients() {
    const response = await fetch(`${API_URL}/api/doctors/patients`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }

    return response.json() as Promise<DoctorPatient[]>;
  },
};
