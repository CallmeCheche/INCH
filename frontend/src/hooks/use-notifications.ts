import { useState, useEffect } from 'react';
import { notificationService, Notification } from '@/services/notification.service';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Charger les notifications existantes
    notificationService.getNotifications().then(setNotifications);

    // Se connecter au WebSocket pour les notifications en temps réel
    notificationService.connect(user.id, user.user_type!);

    // Écouter les nouvelles notifications
    const unsubscribe = notificationService.addListener((notification) => {
      setNotifications(prev => [notification, ...prev]);
      
      // Afficher un toast pour les nouvelles notifications
      toast({
        title: notification.type === 'appointment_request' ? 'Nouvelle demande de rendez-vous' :
               notification.type === 'appointment_approved' ? 'Rendez-vous approuvé' :
               'Rendez-vous rejeté',
        description: notification.message,
        variant: 'default',
      });
    });

    return () => {
      unsubscribe();
      notificationService.disconnect();
    };
  }, [user]);

  const markAsRead = async (notificationId: number) => {
    await notificationService.markAsRead(notificationId);
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  return {
    notifications,
    markAsRead,
    unreadCount: notifications.filter(n => !n.read).length,
  };
}
