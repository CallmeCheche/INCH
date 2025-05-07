import { create } from 'zustand';
import { authService, User, LoginCredentials, RegisterData } from '@/services/auth.service';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      await authService.login(credentials);
      const user = await authService.getUser();
      set({ user });
      
      const redirectPath = user.user_type === 'doctor'
        ? '/dashboard/doctor'
        : '/dashboard/patient';

      if (typeof window !== 'undefined' && window.location.pathname === '/login') {
        window.location.href = redirectPath;
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Échec de la connexion';
      set({ error });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });
    try {
      await authService.register(data);
      const user = await authService.getUser();
      set({ user });

      const redirectPath = user.user_type === 'doctor'
        ? '/dashboard/doctor'
        : '/dashboard/patient';

      if (typeof window !== 'undefined') {
        window.location.href = redirectPath;
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : "Échec de l'inscription";
      set({ error });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
      set({ user: null });

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : "Échec de la déconnexion";
      set({ error });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const user = await authService.getUser();
      set({ user });
    } catch {
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
