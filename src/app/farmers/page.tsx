'use client';

import Navbar from "@/widgets/Navbar/ui/Navbar";
import Footer from "@/widgets/Footer/ui/Footer";
import { User, MapPin, Star, ShieldCheck, Sprout, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/shared/api/api";
import { motion } from "framer-motion";

export default function FarmersPage() {
  const { data: farmers, isLoading } = useQuery({
    queryKey: ['farmers'],
    queryFn: async () => {
      const { data } = await api.get('/api/users/farmers');
      return data;
    }
  });

  return (
    <main className="min-h-screen bg-[#F9FBFA]">
      <Navbar />

      <header className="pt-48 pb-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <span className="text-[#2D5A27] font-black uppercase tracking-widest text-[10px] mb-4 block">Hamjamiyat</span>
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-8">Bizning Dehqonlarimiz</h1>
          <p className="max-w-2xl mx-auto text-gray-500 font-medium">
            O'zbekistonning barcha viloyatlaridan eng tajribali va halol dehqonlar 
            o'z mahsulotlarini platformamiz orqali sizga yetkazib berishadi.
          </p>
        </div>
      </header>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            <TrustCard 
              icon={<ShieldCheck className="text-[#2D5A27]" size={32} />}
              title="Tekshirilgan profil"
              desc="Har bir dehqon ro'yxatdan o'tishda o'z shaxsini va hududini tasdiqlaydi."
            />
            <TrustCard 
              icon={<Star className="text-[#F1C40F]" size={32} />}
              title="Reyting tizimi"
              desc="Xaridorlar dehqonlar faoliyatini baholab borishadi, bu esa sifatni kafolatlaydi."
            />
            <TrustCard 
              icon={<Sprout className="text-[#2D5A27]" size={32} />}
              title="Tabiiy mahsulotlar"
              desc="Bizning dehqonlarimiz an'anaviy va toza usullarda yetishtirishga e'tibor berishadi."
            />
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">Tajribali dehqonlar</h2>
            <p className="text-gray-500 font-medium">Platformadagi faol va ishonchli dehqonlarimiz bilan tanishing</p>
          </div>

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-[#2D5A27]" size={48} />
              <p className="text-gray-400 font-black text-xs uppercase tracking-widest">Dehqonlar ro'yxati yuklanmoqda...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {farmers?.map((farmer: any) => (
                <FarmerCard 
                  key={farmer.id}
                  id={farmer.id}
                  name={farmer.name} 
                  region={farmer.region} 
                  products={farmer._count.products} 
                  rating={5.0} 
                  image={farmer.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop"}
                />
              ))}
            </div>
          )}

          <div className="mt-32 p-12 lg:p-20 rounded-[4rem] bg-[#2D5A27] text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full -mr-48 -mt-48" />
            <h2 className="text-3xl lg:text-5xl font-black mb-8 relative z-10">Siz ham dehqonmisiz?</h2>
            <p className="max-w-2xl mx-auto text-white/70 font-medium text-lg mb-12 relative z-10 leading-relaxed">
              O'z mahsulotlaringizni butun O'zbekistonga taniting va xaridorlarni oson toping. 
              Bugun ro'yxatdan o'ting va o'z savdo do'koningizni oching!
            </p>
            <Link href="/register?role=FARMER" className="inline-flex items-center gap-3 px-12 py-6 bg-white text-[#2D5A27] rounded-3xl font-black hover:bg-gray-100 transition-all shadow-2xl shadow-black/20 relative z-10">
              Ro'yxatdan o'tish <ShoppingBag size={24} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function TrustCard({ icon, title, desc }: any) {
  return (
    <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all text-center group">
      <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-[#2D5A27]/5 transition-all">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4">{title}</h3>
      <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function FarmerCard({ id, name, region, products, rating, image }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all group"
    >
      <div className="relative h-72 overflow-hidden bg-gray-100">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-sm">
          <Star size={14} className="text-[#F1C40F] fill-[#F1C40F]" /> {rating} Reyting
        </div>
      </div>
      <div className="p-10">
        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
          <MapPin size={14} className="text-[#E67E22]" /> {region}
        </div>
        <h3 className="text-3xl font-black text-gray-900 mb-8">{name}</h3>
        <div className="flex items-center justify-between pt-8 border-t border-gray-100">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">E'lonlar</p>
            <p className="text-2xl font-black text-[#2D5A27]">{products} ta</p>
          </div>
          <Link href={`/farmers/${id}`} className="px-8 py-4 bg-gray-50 text-[#2D5A27] rounded-2xl font-black text-sm hover:bg-[#2D5A27] hover:text-white transition-all shadow-sm">
            Profilni ko'rish
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
