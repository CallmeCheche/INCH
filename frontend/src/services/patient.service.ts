import { API_URL, API_ENDPOINTS } from '@/config/api';

export interface PatientStats {
  upcomingAppointments: number;
  pastAppointments: number;
  reviewsGiven: number;
  profileCompletion: number;
}

export interface PatientProfile {
  id: number;
  name: string;
  email: string;
  image: string | null;
  gender: string;
  age: number;
  phone: string;
  address: string;
  medicalHistory: string;
  profileCompletion: number;
}

export interface ProfileUpdateData {
  name?: string;
  gender?: string;
  age?: number;
  phone?: string;
  address?: string;
  medicalHistory?: string;
}

export const patientService = {
  async getDashboardStats() {
    try {
      const response = await fetch(API_ENDPOINTS.patientDashboardStats, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Dashboard stats error:', errorData);
        throw new Error(errorData.message || 'Failed to fetch dashboard stats');
      }

      return response.json() as Promise<PatientStats>;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Renvoyer des données par défaut en cas d'erreur pour éviter de bloquer l'interface
      return {
        upcomingAppointments: 0,
        pastAppointments: 0,
        reviewsGiven: 0,
        profileCompletion: 0
      } as PatientStats;
    }
  },

  async getAppointments() {
    try {
      const response = await fetch(API_ENDPOINTS.patientAppointments, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Appointments error:', errorData);
        throw new Error(errorData.message || 'Failed to fetch appointments');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // Renvoyer un tableau vide en cas d'erreur
      return [];
    }
  },

  async getProfile() {
    try {
      const response = await fetch(API_ENDPOINTS.patientProfile, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Profile error:', errorData);
        throw new Error(errorData.message || 'Failed to fetch profile');
      }

      return response.json() as Promise<PatientProfile>;
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Renvoyer un profil par défaut en cas d'erreur
      return {
        id: 0,
        name: 'Utilisateur',
        email: '',
        image: null,
        gender: '',
        age: 0,
        phone: '',
        address: '',
        medicalHistory: '',
        profileCompletion: 0
      } as PatientProfile;
    }
  },

  async updateProfile(data: ProfileUpdateData) {
    try {
      const response = await fetch(API_ENDPOINTS.updatePatientProfile, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Update profile error:', errorData);
        throw new Error(errorData.message || 'Failed to update profile');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
  
  async uploadProfilePhoto(file: File) {
    try {
      const formData = new FormData();
      formData.append('profile_photo', file);
      
      const response = await fetch(`${API_URL}/api/user/profile-photo`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Upload profile photo error:', errorData);
        throw new Error(errorData.message || 'Failed to upload profile photo');
      }

      return response.json();
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      throw error;
    }
  },
};
