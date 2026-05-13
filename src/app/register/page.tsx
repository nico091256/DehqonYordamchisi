'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/entities/user/model/authStore';
import api from '@/shared/api/api';
import { User, Phone, Lock, MapPin, ArrowLeft, Loader2, Wheat, ShoppingBag } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '@/lib/schemas';
import toast from 'react-hot-toast';
import { useAuth } from '@/shared/hooks/useAuth';
import { cn } from '@/shared/lib/utils';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  useAuth(false); // Redirect if already logged in

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'BUYER'
    }
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/register', data);
      setUser(response.data.user);
      toast.success('Ro\'yxatdan muvaffaqiyatli o\'tdingiz!');
      router.push('/');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ro\'yxatdan o\'tishda xato yuz berdi';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-16">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-[#2D5A27] transition-colors font-semibold">
        <ArrowLeft size={20} /> Bosh sahifa
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black mb-3">Ro'yxatdan o'tish</h1>
          <p className="text-gray-400 font-medium">Platformaga qo'shiling va barakali savdoni boshlang</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RoleSelector 
              selected={selectedRole === 'BUYER'} 
              onClick={() => setValue('role', 'BUYER')}
              icon={<ShoppingBag size={24} />}
              title="Xaridor"
              desc="Mahsulot sotib olish uchun"
            />
            <RoleSelector 
              selected={selectedRole === 'FARMER'} 
              onClick={() => setValue('role', 'FARMER')}
              icon={<Wheat size={24} />}
              title="Dehqon"
              desc="O'z hosilini sotish uchun"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              label="To'liq ismingiz" 
              icon={<User size={20} />} 
              error={errors.name?.message}
            >
              <input 
                {...register('name')}
                type="text" 
                placeholder="Ali Valiyev"
                className={cn(
                  "input-field pl-12 pr-4",
                  errors.name ? "border-red-200 bg-red-50/30" : "bg-gray-50/50"
                )}
              />
            </FormField>

            <FormField 
              label="Telefon raqam" 
              icon={<Phone size={20} />} 
              error={errors.phone?.message}
            >
              <input 
                {...register('phone')}
                type="tel" 
                placeholder="+998 90 123 45 67"
                className={cn(
                  "input-field pl-12 pr-4",
                  errors.phone ? "border-red-200 bg-red-50/30" : "bg-gray-50/50"
                )}
              />
            </FormField>

            <FormField 
              label="Hudud (Viloyat)" 
              icon={<MapPin size={20} />} 
              error={errors.region?.message}
            >
              <select 
                {...register('region')}
                className={cn(
                  "input-field pl-12 pr-4 appearance-none",
                  errors.region ? "border-red-200 bg-red-50/30" : "bg-gray-50/50"
                )}
              >
                <option value="">Tanlang</option>
                <option value="Toshkent">Toshkent</option>
                <option value="Samarqand">Samarqand</option>
                <option value="Buxoro">Buxoro</option>
                <option value="Andijon">Andijon</option>
                <option value="Farg'ona">Farg'ona</option>
                <option value="Namangan">Namangan</option>
                <option value="Qashqadaryo">Qashqadaryo</option>
                <option value="Surxondaryo">Surxondaryo</option>
                <option value="Jizzax">Jizzax</option>
                <option value="Sirdaryo">Sirdaryo</option>
                <option value="Xorazm">Xorazm</option>
                <option value="Navoiy">Navoiy</option>
                <option value="Qoraqalpog'iston">Qoraqalpog'iston</option>
              </select>
            </FormField>

            <FormField 
              label="Parol yaratish" 
              icon={<Lock size={20} />} 
              error={errors.password?.message}
            >
              <input 
                {...register('password')}
                type="password" 
                placeholder="••••••••"
                className={cn(
                  "input-field pl-12 pr-4",
                  errors.password ? "border-red-200 bg-red-50/30" : "bg-gray-50/50"
                )}
              />
            </FormField>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full h-16 flex items-center justify-center gap-3 text-lg mt-4 shadow-lg shadow-[#2D5A27]/20"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Ro\'yxatdan o\'tish'}
          </button>
        </form>

        <div className="mt-10 text-center text-gray-500 font-medium">
          Akkauntingiz bormi? <br />
          <Link href="/login" className="font-black text-[#E67E22] hover:underline decoration-2 underline-offset-4">Tizimga kirish</Link>
        </div>
      </motion.div>
    </main>
  );
}

function FormField({ label, icon, children, error }: any) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
      <div className="relative group">
        <div className={cn(
          "absolute left-0 inset-y-0 w-12 flex items-center justify-center pointer-events-none transition-colors z-10",
          error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#2D5A27]'
        )}>
          {icon}
        </div>
        {children}
      </div>
      {error && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{error}</p>}
    </div>
  );
}

function RoleSelector({ selected, onClick, icon, title, desc }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-[1.5rem] border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-3 relative overflow-hidden group ${
        selected ? 'border-[#2D5A27] bg-[#2D5A27]/5 shadow-inner' : 'border-gray-100 hover:border-gray-200 bg-white'
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
        selected ? 'bg-[#2D5A27] text-white scale-110 shadow-lg shadow-[#2D5A27]/30' : 'bg-gray-50 text-gray-400 group-hover:scale-105'
      }`}>
        {icon}
      </div>
      <div>
        <h3 className={`font-black ${selected ? 'text-[#2D5A27]' : 'text-gray-700'}`}>{title}</h3>
        <p className="text-[10px] text-gray-400 mt-1 font-bold leading-tight">{desc}</p>
      </div>
    </div>
  );
}
