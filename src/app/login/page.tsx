'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/user/model/authStore';
import api from '@/shared/api/api';
import { Phone, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/lib/schemas';
import toast from 'react-hot-toast';
import { useAuth } from '@/shared/hooks/useAuth';
import { cn } from '@/shared/lib/utils';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  
  useAuth(false); // Redirect if already logged in

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', data);
      const { token, user } = response.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
      }
      setUser(user);
      toast.success('Muvaffaqiyatli kirdingiz!');
      router.push('/');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Kirishda xatolik yuz berdi';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-[#2D5A27] transition-colors font-semibold">
        <ArrowLeft size={20} /> Bosh sahifa
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#2D5A27]/10 rounded-2xl flex items-center justify-center text-[#2D5A27] mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black mb-3">Xush kelibsiz!</h1>
          <p className="text-gray-400 font-medium">Platformaga kirish uchun ma'lumotlaringizni kiriting</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Telefon raqam</label>
            <div className="relative group">
              <div className={cn(
                "absolute left-0 inset-y-0 w-12 flex items-center justify-center pointer-events-none transition-colors z-10",
                errors.phone ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#2D5A27]'
              )}>
                <Phone size={20} />
              </div>
              <input 
                {...register('phone')}
                type="tel" 
                placeholder="+998 90 123 45 67"
                className={cn(
                  "input-field pl-12 pr-4",
                  errors.phone ? "border-red-200 bg-red-50/30" : "bg-gray-50/50"
                )}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Parol</label>
            <div className="relative group">
              <div className={cn(
                "absolute left-0 inset-y-0 w-12 flex items-center justify-center pointer-events-none transition-colors z-10",
                errors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#2D5A27]'
              )}>
                <Lock size={20} />
              </div>
              <input 
                {...register('password')}
                type="password" 
                placeholder="••••••••"
                className={cn(
                  "input-field pl-12 pr-4",
                  errors.password ? "border-red-200 bg-red-50/30" : "bg-gray-50/50"
                )}
              />
            </div>
            {errors.password && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.password.message}</p>}
          </div>

          <div className="text-right">
            <Link href="/forgot-password" className="text-sm font-bold text-[#2D5A27] hover:underline transition-all">
              Parolni unutdingizmi?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full h-16 flex items-center justify-center gap-3 text-lg mt-4 shadow-lg shadow-[#2D5A27]/20"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Tizimga kirish'}
          </button>
        </form>

        <div className="mt-10 text-center text-gray-500 font-medium">
          Hisobingiz yo'qmi? <br />
          <Link href="/register" className="font-black text-[#E67E22] hover:underline decoration-2 underline-offset-4">Yangi hisob yaratish</Link>
        </div>
      </motion.div>
    </main>
  );
}
