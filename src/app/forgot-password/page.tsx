'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, Loader2, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/widgets/Navbar/ui/Navbar';
import Footer from '@/widgets/Footer/ui/Footer';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success('Parolni tiklash havolasi yuborildi!');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-4 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#2D5A27]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#2D5A27]">
              <KeyRound size={32} />
            </div>
            <h1 className="text-3xl font-black mb-3">Parolni unutdingizmi?</h1>
            <p className="text-gray-400 font-medium">Xavotir olmang! Ro'yxatdan o'tgan telefon raqamingiz yoki emailingizni kiriting.</p>
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email yoki Telefon</label>
                <div className="relative group">
                  <div className="absolute left-0 inset-y-0 w-12 flex items-center justify-center pointer-events-none text-gray-400 group-focus-within:text-[#2D5A27] transition-colors">
                    <Mail size={20} />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    className="input-field pl-12 pr-4 bg-gray-50/50"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full h-16 flex items-center justify-center gap-3 text-lg shadow-lg shadow-[#2D5A27]/20"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Yuborish'}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="p-6 bg-green-50 rounded-2xl border border-green-100 text-green-700 text-sm font-medium">
                Sizning so'rovingiz qabul qilindi. Tez orada ko'rsatmalar yuboriladi.
              </div>
              <Link href="/login" className="btn-secondary w-full h-16 flex items-center justify-center">
                Kirish sahifasiga qaytish
              </Link>
            </div>
          )}

          <div className="mt-10 text-center">
            <Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#2D5A27] transition-colors">
              <ArrowLeft size={16} /> Login sahifasiga qaytish
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
