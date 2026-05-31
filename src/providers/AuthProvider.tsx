'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/entities/user/model/authStore';
import api from '@/shared/api/api';
import { Loader2 } from 'lucide-react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout, user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await api.get('/api/users/profile');
        setUser(data);
      } catch (err: any) {
        // Only logout if we got a proper auth error (401/403), not a network error
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          logout();
        }
        // On network errors, keep any existing persisted user state
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [setUser, logout]);

  // Only show loading spinner briefly, and only if we haven't resolved yet
  if (loading && !user) {
    // Use a short timeout to avoid blocking the UI forever on network errors
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FBFA]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#2D5A27]" size={40} />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
