'use client';

import { useAuthStore } from '@/entities/user/model/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const useAuth = (requireAuth: boolean = true) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (requireAuth && !user) {
      router.push('/login');
    }
    
    if (!requireAuth && user && (pathname === '/login' || pathname === '/register')) {
      router.push('/');
    }
  }, [user, requireAuth, router, pathname]);

  return { user, isAuthenticated: !!user };
};
