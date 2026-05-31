'use client';

import { motion } from 'framer-motion';
import { UserPlus, Search, ShoppingCart, Truck, Sprout, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus size={24} />,
    title: "Ro'yxatdan o'ting",
    desc: "Xaridor yoki Dehqon sifatida tezda ro'yxatdan o'ting va o'z profilingizni yarating.",
    color: "bg-blue-500"
  },
  {
    icon: <Search size={24} />,
    title: "Mahsulotni toping",
    desc: "Bozordan o'zingizga kerakli yangi va tabiiy mahsulotlarni qulay filtrlar orqali toping.",
    color: "bg-green-500"
  },
  {
    icon: <ShoppingCart size={24} />,
    title: "Buyurtma bering",
    desc: "Tanlagan mahsulotingizni savatga qo'shing va to'g'ridan-to'g'ri dehqon bilan bog'laning.",
    color: "bg-orange-500"
  },
  {
    icon: <Truck size={24} />,
    title: "Yetkazib berish",
    desc: "Mahsulotni kelishilgan vaqtda va joyda qabul qilib oling. Sifat kafolatlangan!",
    color: "bg-purple-500"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-12 md:py-24 bg-[#F9FBFA]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-20">
          <div className="transform-gpu transition-all duration-500">
            <span className="text-[#2D5A27] font-black uppercase tracking-widest text-[10px] md:text-xs mb-2 md:mb-4 block">Qo'llanma</span>
            <h2 className="text-2xl md:text-4xl font-black mb-3 md:mb-6">Platforma qanday ishlaydi?</h2>
            <p className="text-gray-500 font-medium text-sm md:text-base">
              DehqonYordamchisi orqali savdo qilish juda oson va qulay. 
              Bor-yo'g'i bir necha qadamda o'z savdongizni boshlang.
            </p>
          </div>
        </div>

        {/* Mobile: Vertical timeline, Desktop: Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative transform-gpu hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group h-full">
                <div className={`w-16 h-16 ${step.color} bg-opacity-10 rounded-2xl flex items-center justify-center ${step.color.replace('bg-', 'text-')} mb-8 group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-black mb-4">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{step.desc}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 text-gray-200 z-10">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-0">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex gap-4 transform-gpu"
            >
              {/* Timeline line & dot */}
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-12 h-12 ${step.color} bg-opacity-10 rounded-xl flex items-center justify-center ${step.color.replace('bg-', 'text-')} shrink-0 relative z-10`}>
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gray-100 my-1" />
                )}
              </div>

              {/* Content */}
              <div className="pb-6 pt-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Qadam {index + 1}</span>
                </div>
                <h3 className="text-base font-black mb-1 text-gray-900">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-medium">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-20 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#2D5A27] text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base hover:bg-[#1f3d1a] transition-all shadow-lg shadow-[#2D5A27]/20 active:scale-95">
            Hoziroq boshlash <Sprout size={18} className="md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
