<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add role_id field if it doesn't exist
            if (!Schema::hasColumn('users', 'role_id')) {
                $table->enum('role_id', ['doctor', 'patient'])->nullable();
            }
            
            // Add profile_photo_path field if it doesn't exist
            if (!Schema::hasColumn('users', 'profile_photo_path')) {
                $table->string('profile_photo_path')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role_id', 'profile_photo_path']);
        });
    }
};
import { API_ENDPOINTS } from '@/config/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  userType: 'patient' | 'doctor';
}

export interface User {
  id: number;
  name: string;
  email: string;
  profile_photo_path?: string | null;
  user_type?: 'patient' | 'doctor';
  created_at?: string;
  updated_at?: string;
}

export const authService = {
  async csrf() {
    try {
      await fetch(API_ENDPOINTS.csrf, {
        credentials: 'include',
      });
    } catch (error) {
      console.error('CSRF error:', error);
    }
  },

  // Add this method to authService in auth.service.ts
  async updateProfilePhoto(file: File) {
    try {
      const formData = new FormData();
      formData.append('profile_photo', file);
      
      const response = await fetch(API_ENDPOINTS.profilePhoto, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });
  
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error('Update profile photo error:', error);
        throw new Error(error.message || 'Failed to update profile photo');
      }
  
      return response.json();
    } catch (error) {
      console.error('Update profile photo error:', error);
      throw error;
    }
  }
  // In frontend/src/config/api.ts
  export const API_ENDPOINTS = {
    // Existing endpoints...
    profilePhoto: `${API_BASE_URL}/profile/photo`,
  };
  async login(credentials: LoginCredentials) {
    try {
      await this.csrf();
      const response = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error('Login error:', error);
        throw new Error(error.message || 'Login failed');
      }

      return response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(data: RegisterData) {
    try {
      await this.csrf();
      const response = await fetch(API_ENDPOINTS.register, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          password: data.password,
          password_confirmation: data.password,
          user_type: data.userType,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error('Registration error:', error);
        throw new Error(error.message || 'Registration failed');
      }

      return response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      const response = await fetch(API_ENDPOINTS.logout, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error('Logout error:', error);
        throw new Error(error.message || 'Logout failed');
      }

      return response.json();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  async getUser(): Promise<User> {
    try {
      const response = await fetch(API_ENDPOINTS.user, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        // Si le statut est 401 (non autorisé), l'utilisateur n'est probablement pas connecté
        if (response.status === 401) {
          console.warn('User not authenticated');
          throw new Error('Not authenticated');
        }
        
        const error = await response.json().catch(() => ({}));
        console.error('Get user error:', error);
        throw new Error(error.message || 'Failed to fetch user');
      }

      const userData = await response.json();
      console.log('User data retrieved:', userData);
      return userData;
    } catch (error) {
      console.error('Get user error:', error);
      // Renvoyer un utilisateur par défaut en cas d'erreur
      return {
        id: 0,
        name: 'Utilisateur',
        email: '',
        profile_photo_path: null
      };
    }
  },
  
  // Vérifie si l'utilisateur est connecté
  async isAuthenticated(): Promise<boolean> {
    try {
      const user = await this.getUser();
      return user.id !== 0;
    } catch (error) {
      return false;
    }
  }
};
