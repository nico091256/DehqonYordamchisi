'use client';

import { motion } from 'framer-motion';
import { UserPlus, Search, ShoppingCart, Truck, Sprout, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus size={32} />,
    title: "Ro'yxatdan o'ting",
    desc: "Xaridor yoki Dehqon sifatida tezda ro'yxatdan o'ting va o'z profilingizni yarating.",
    color: "bg-blue-500"
  },
  {
    icon: <Search size={32} />,
    title: "Mahsulotni toping",
    desc: "Bozordan o'zingizga kerakli yangi va tabiiy mahsulotlarni qulay filtrlar orqali toping.",
    color: "bg-green-500"
  },
  {
    icon: <ShoppingCart size={32} />,
    title: "Buyurtma bering",
    desc: "Tanlagan mahsulotingizni savatga qo'shing va to'g'ridan-to'g'ri dehqon bilan bog'laning.",
    color: "bg-orange-500"
  },
  {
    icon: <Truck size={32} />,
    title: "Yetkazib berish",
    desc: "Mahsulotni kelishilgan vaqtda va joyda qabul qilib oling. Sifat kafolatlangan!",
    color: "bg-purple-500"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#F9FBFA]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#2D5A27] font-black uppercase tracking-widest text-xs mb-4 block">Qo'llanma</span>
            <h2 className="text-4xl font-black mb-6">Platforma qanday ishlaydi?</h2>
            <p className="text-gray-500 font-medium">
              DehqonYordamchisi orqali savdo qilish juda oson va qulay. 
              Bor-yo'g'i bir necha qadamda o'z savdongizni boshlang.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
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
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D5A27] text-white rounded-2xl font-bold hover:bg-[#1f3d1a] transition-all shadow-lg shadow-[#2D5A27]/20">
            Hoziroq boshlash <Sprout size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
