'use client';

import Link from 'next/link';
import { ArrowRight, Sprout, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export default function Hero() {
  return (
    <section className="relative pt-16 pb-12 md:pt-24 md:pb-20 lg:pt-56 lg:pb-40 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 w-[60%] h-full bg-[radial-gradient(ellipse_at_top_right,rgba(45,90,39,0.08),transparent_60%)] translate-x-1/4" />
      <div className="absolute bottom-0 left-0 -z-10 w-[50%] h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,rgba(230,126,34,0.08),transparent_60%)] -translate-x-1/4" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 xl:gap-32">
          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left relative">
            <div>
              <span className="inline-flex items-center gap-2 md:gap-2.5 px-3.5 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl bg-white shadow-xl shadow-[#2D5A27]/5 text-[#2D5A27] text-[8px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.25em] mb-6 md:mb-10 border border-[#2D5A27]/5">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#2D5A27] animate-pulse" />
                O'zbekistonning #1 Platformasi
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-5 md:mb-10 leading-[0.95] text-gray-900">
                Daladan <br /> 
                <span className="text-[#2D5A27] relative">
                  Dasturxongacha
                  <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-4 text-[#E67E22]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>
              </h1>
              
              <p className="max-w-xl mx-auto lg:mx-0 text-sm md:text-xl text-gray-500/80 mb-8 md:mb-14 leading-relaxed font-medium tracking-tight">
                Dehqonlar uchun eng qulay bozor, xaridorlar uchun eng yangi va tabiiy mahsulotlar markazi. 
                Sifat va ishonchni birlashtirgan zamonaviy marketplace.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5 mb-10 lg:mb-0">
                <Link href="/products" className="btn-primary flex items-center justify-center gap-3 h-14 md:h-20 px-8 md:px-12 group/btn w-full sm:w-auto text-[9px] md:text-xs">
                  Bozorni ko'rish 
                  <ArrowRight size={18} className="md:w-[22px] md:h-[22px] group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
                <Link href="/register?role=FARMER" className="h-14 md:h-20 px-8 md:px-12 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 hover:text-[#2D5A27] transition-all flex items-center justify-center rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-100 group/link w-full sm:w-auto">
                  Sotuvchi bo'lish
                  <div className="ml-3 w-6 md:w-8 h-[2px] bg-gray-100 group-hover:w-10 md:group-hover:w-12 group-hover:bg-[#2D5A27] transition-all duration-500" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Visual Element */}
          <div className="flex-1 relative w-full max-w-md md:max-w-2xl lg:max-w-none">
            <div className="relative aspect-square">
              {/* Main Visual with Premium Frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2D5A27]/20 to-[#E67E22]/20 rounded-3xl md:rounded-[5rem] -rotate-6 scale-95 opacity-50 transform-gpu" />
              <div className="relative w-full h-full rounded-3xl md:rounded-[5rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(45,90,39,0.2)] border-[6px] md:border-[12px] border-white bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-[80px] md:text-[140px] mb-4">🌾</div>
                  <p className="text-[#2D5A27] font-black text-lg md:text-3xl tracking-tight">Yangi Hosil</p>
                  <p className="text-gray-400 font-bold text-xs md:text-base mt-2">Eng yaxshi mahsulotlar</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D5A27]/20 via-transparent to-transparent" />
                
                {/* Floating Info Badge */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 bg-white/95 p-4 md:p-8 rounded-2xl md:rounded-[3rem] shadow-2xl flex items-center justify-between border border-gray-100 transform-gpu">
                  <div className="min-w-0">
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-[#E67E22] mb-1 md:mb-2">Mavsumiy mahsulot</p>
                    <p className="text-base md:text-2xl font-black text-gray-900 truncate tracking-tight">Sarhil O'riklar</p>
                  </div>
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-[#2D5A27] to-[#1E3D1A] rounded-xl md:rounded-[1.5rem] flex items-center justify-center text-white font-black shadow-xl shadow-[#2D5A27]/30 border border-white/10 shrink-0 text-xs md:text-base">
                    +15t
                  </div>
                </div>
              </div>

              {/* Smaller Floating Elements - Hidden on small mobile */}
              <div className="absolute -top-6 -right-3 md:-top-12 md:-right-12 w-24 h-24 md:w-40 md:h-40 bg-white rounded-2xl md:rounded-[3rem] shadow-2xl p-3 md:p-6 hidden sm:flex flex-col items-center justify-center text-center z-10 border border-gray-50 transform-gpu">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-orange-50 rounded-xl md:rounded-2xl flex items-center justify-center text-orange-500 mb-2 md:mb-4">
                  <Zap size={16} className="md:w-6 md:h-6" />
                </div>
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] text-gray-400 leading-tight">Tezkor<br/>Yetkazish</p>
              </div>

              <div className="absolute -bottom-6 -left-3 md:-bottom-12 md:-left-12 w-28 h-28 md:w-44 md:h-44 bg-white rounded-2xl md:rounded-[3rem] shadow-2xl p-4 md:p-8 hidden sm:flex flex-col items-start justify-center z-10 border border-gray-50 transform-gpu">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-[#2D5A27]/10 rounded-xl md:rounded-2xl flex items-center justify-center text-[#2D5A27] mb-2 md:mb-4">
                  <ShieldCheck size={16} className="md:w-6 md:h-6" />
                </div>
                <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.05em] md:tracking-[0.1em] text-gray-900 leading-tight">100% Tabiiy<br/>Kafolat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 mt-16 md:mt-32 lg:mt-48 relative">
          <FeatureCard 
            icon={<ShieldCheck className="text-[#2D5A27]" size={28} />}
            title="Xavfsiz Savdo"
            desc="Har bir bitim va dehqon tekshirilgan, xavfsizlik biz uchun ustuvor."
            color="bg-green-50"
          />
          <FeatureCard 
            icon={<Zap className="text-[#E67E22]" size={28} />}
            title="Tezkor Aloqa"
            desc="Sotuvchi va xaridor o'rtasida to'g'ridan-to'g'ri va tezkor aloqa."
            color="bg-orange-50"
          />
          <FeatureCard 
            icon={<Sprout className="text-[#2D5A27]" size={28} />}
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
    <div className="p-6 md:p-10 rounded-2xl md:rounded-[3rem] bg-white shadow-soft border border-gray-100/50 text-left transition-all duration-300 hover:shadow-strong hover:-translate-y-2 group transform-gpu">
      <div className={cn("w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-[2rem] flex items-center justify-center mb-4 md:mb-8 transition-transform group-hover:scale-110 duration-500", color)}>
        {icon}
      </div>
      <h3 className="text-lg md:text-2xl font-black mb-2 md:mb-4 tracking-tight text-gray-900">{title}</h3>
      <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed tracking-tight">{desc}</p>
    </div>
  );
}
