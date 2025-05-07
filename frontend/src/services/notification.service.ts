import { API_URL } from '@/config/api';

export interface Notification {
  id: number;
  type: 'appointment_request' | 'appointment_approved' | 'appointment_rejected';
  message: string;
  data?: any;
  read: boolean;
  created_at: string;
}

class NotificationService {
  private socket: WebSocket | null = null;
  private listeners: ((notification: Notification) => void)[] = [];

  connect(userId: number, userType: 'patient' | 'doctor') {
    this.socket = new WebSocket(`${API_URL.replace('http', 'ws')}/ws/notifications/${userId}?type=${userType}`);

    this.socket.onmessage = (event) => {
      const notification = JSON.parse(event.data) as Notification;
      this.listeners.forEach(listener => listener(notification));
    };

    this.socket.onclose = () => {
      // Tentative de reconnexion après 5 secondes
      setTimeout(() => this.connect(userId, userType), 5000);
    };
  }

  addListener(callback: (notification: Notification) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  async getNotifications() {
    const response = await fetch(`${API_URL}/api/notifications`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    return response.json() as Promise<Notification[]>;
  }

  async markAsRead(notificationId: number) {
    const response = await fetch(`${API_URL}/api/notifications/${notificationId}/read`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }

    return response.json();
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export const notificationService = new NotificationService();
