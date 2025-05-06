import { API_URL } from '@/config/api';

export interface Appointment {
  id: number;
  date: string;
  time: string;
  type: string;
  status: string;
  notes?: string;
  fee?: number;
  doctorName?: string;
  doctorImage?: string;
  doctorId?: number;
  specialty?: string;
  patientName?: string;
  patientImage?: string;
  patientId?: number;
}

export interface AppointmentCreateData {
  doctor_id: number;
  date: string;
  time: string;
  type: string;
  notes?: string;
  fee?: number;
}

export const appointmentService = {
  async getAppointments(filters?: { date?: string; status?: string; type?: string }) {
    const queryParams = new URLSearchParams();
    
    if (filters?.date) queryParams.append('date', filters.date);
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.type) queryParams.append('type', filters.type);
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    const response = await fetch(`${API_URL}/api/appointments${queryString}`, {
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

  async getAppointment(id: number) {
    const response = await fetch(`${API_URL}/api/appointments/${id}`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch appointment');
    }

    return response.json();
  },

  async createAppointment(data: AppointmentCreateData) {
    const response = await fetch(`${API_URL}/api/appointments`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create appointment');
    }

    return response.json();
  },

  async updateAppointment(id: number, data: Partial<Appointment>) {
    const response = await fetch(`${API_URL}/api/appointments/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update appointment');
    }

    return response.json();
  },

  async deleteAppointment(id: number) {
    const response = await fetch(`${API_URL}/api/appointments/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete appointment');
    }

    return true;
  },
};
