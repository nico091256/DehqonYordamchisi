'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#1A1A1A',
            borderRadius: '1rem',
            fontSize: '14px',
            fontWeight: '600',
            padding: '16px 24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          },
          success: {
            iconTheme: {
              primary: '#2D5A27',
              secondary: '#fff',
            },
          },
        }}
      />
      {children}
    </QueryClientProvider>
  );
}
