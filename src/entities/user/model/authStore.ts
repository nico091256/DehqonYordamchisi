import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/shared/api/api';

interface User {
  id: string;
  name: string;
  phone?: string;
  role: 'FARMER' | 'BUYER' | 'ADMIN';
  region?: string;
  image?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user });
      },
      logout: async () => {
        set({ user: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        try {
          await api.post('/api/auth/logout');
        } catch (err) {
          console.error('Logout error', err);
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
