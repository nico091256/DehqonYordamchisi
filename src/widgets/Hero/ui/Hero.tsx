'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, ArrowRight, Sprout, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-56 lg:pb-40 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 w-[40%] h-full bg-gradient-to-l from-[#2D5A27]/10 to-transparent blur-[120px] rounded-full translate-x-1/4" />
      <div className="absolute bottom-0 left-0 -z-10 w-[30%] h-1/2 bg-gradient-to-tr from-[#E67E22]/10 to-transparent blur-[100px] rounded-full -translate-x-1/4" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 w-full h-full bg-[radial-gradient(circle_at_center,rgba(45,90,39,0.03)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-20 xl:gap-32">
          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white shadow-xl shadow-[#2D5A27]/5 text-[#2D5A27] text-[10px] font-black uppercase tracking-[0.25em] mb-10 border border-[#2D5A27]/5">
                <div className="w-2 h-2 rounded-full bg-[#2D5A27] animate-pulse" />
                O'zbekistonning #1 Qishloq Xo'jaligi Platformasi
              </span>
              
              <h1 className="text-6xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-10 leading-[0.95] text-gray-900">
                Daladan <br /> 
                <span className="text-[#2D5A27] relative">
                  Dasturxongacha
                  <svg className="absolute -bottom-4 left-0 w-full h-4 text-[#E67E22]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>
              </h1>
              
              <p className="max-w-xl mx-auto lg:mx-0 text-xl text-gray-500/80 mb-14 leading-relaxed font-medium tracking-tight">
                Dehqonlar uchun eng qulay bozor, xaridorlar uchun eng yangi va tabiiy mahsulotlar markazi. 
                Sifat va ishonchni birlashtirgan zamonaviy marketplace.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-5 mb-20 lg:mb-0">
                <Link href="/products" className="btn-primary flex items-center justify-center gap-3 h-20 px-12 group/btn">
                  Bozorni ko'rish 
                  <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
                <Link href="/register?role=FARMER" className="h-20 px-12 text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 hover:text-[#2D5A27] transition-all flex items-center justify-center rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-100 group/link">
                  Sotuvchi bo'lish
                  <div className="ml-3 w-8 h-[2px] bg-gray-100 group-hover:w-12 group-hover:bg-[#2D5A27] transition-all duration-500" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Visual Element */}
          <div className="flex-1 relative w-full max-w-2xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square"
            >
              {/* Main Image with Premium Frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2D5A27]/20 to-[#E67E22]/20 rounded-[5rem] -rotate-6 scale-95 blur-2xl opacity-50" />
              <div className="relative w-full h-full rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(45,90,39,0.2)] border-[12px] border-white group">
                <Image 
                  src="https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=1200&auto=format&fit=crop" 
                  alt="Fresh Harvest"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Info Badge */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl flex items-center justify-between border border-white/20"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E67E22] mb-2">Mavsumiy mahsulot</p>
                    <p className="text-2xl font-black text-gray-900 truncate tracking-tight">Sarhil O'riklar</p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2D5A27] to-[#1E3D1A] rounded-[1.5rem] flex items-center justify-center text-white font-black shadow-xl shadow-[#2D5A27]/30 border border-white/10 shrink-0">
                    +15t
                  </div>
                </motion.div>
              </div>

              {/* Smaller Floating Elements */}
              <motion.div 
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 w-40 h-40 bg-white rounded-[3rem] shadow-2xl p-6 flex flex-col items-center justify-center text-center z-10 border border-gray-50"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-4">
                  <Zap size={24} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 leading-tight">Tezkor<br/>Yetkazish</p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 30, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-12 -left-12 w-44 h-44 bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-2xl p-8 flex flex-col items-start justify-center z-10 border border-white/20"
              >
                <div className="w-12 h-12 bg-[#2D5A27]/10 rounded-2xl flex items-center justify-center text-[#2D5A27] mb-4">
                  <ShieldCheck size={24} />
                </div>
                <p className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-900 leading-tight">100% Tabiiy<br/>Kafolat</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-48 relative">
          <FeatureCard 
            icon={<ShieldCheck className="text-[#2D5A27]" size={36} />}
            title="Xavfsiz Savdo"
            desc="Har bir bitim va dehqon tekshirilgan, xavfsizlik biz uchun ustuvor."
            color="bg-green-50"
          />
          <FeatureCard 
            icon={<Zap className="text-[#E67E22]" size={36} />}
            title="Tezkor Aloqa"
            desc="Sotuvchi va xaridor o'rtasida to'g'ridan-to'g'ri va tezkor aloqa."
            color="bg-orange-50"
          />
          <FeatureCard 
            icon={<Sprout className="text-[#2D5A27]" size={36} />}
            title="Tabiiy Toza"
            desc="Faqat yangi, daladan endigina uzilgan tabiiy mahsulotlar."
            color="bg-green-50"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -15 }}
      className="p-10 rounded-[3rem] bg-white shadow-soft border border-gray-100/50 text-left transition-all duration-500 hover:shadow-strong group"
    >
      <div className={cn("w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500", color)}>
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 tracking-tight text-gray-900">{title}</h3>
      <p className="text-gray-500 font-medium leading-relaxed tracking-tight">{desc}</p>
    </motion.div>
  );
}
