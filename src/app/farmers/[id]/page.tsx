'use client';

import Navbar from "@/widgets/Navbar/ui/Navbar";
import Footer from "@/widgets/Footer/ui/Footer";
import ProductCard from "@/entities/product/ui/ProductCard";
import { 
  MapPin, 
  Star, 
  Phone, 
  Loader2, 
  Sprout, 
  Package, 
  CheckCircle,
  ShoppingBag
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/shared/api/api";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function FarmerProfilePage() {
  const { id } = useParams();

  const { data: farmer, isLoading } = useQuery({
    queryKey: ['farmer-profile', id],
    queryFn: async () => {
      const { data } = await api.get(`/api/users/farmers/${id}`);
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F9FBFA]">
        <Loader2 className="animate-spin text-[#2D5A27]" size={48} />
        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Profil yuklanmoqda...</p>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FBFA]">
        <h1 className="text-2xl font-black text-gray-900 mb-4">Dehqon topilmadi</h1>
        <a href="/farmers" className="text-[#2D5A27] font-bold hover:underline">Orqaga qaytish</a>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9FBFA]">
      <Navbar />

      <header className="pt-40 pb-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            {/* Profile Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-48 h-48 lg:w-64 lg:h-64 rounded-[3rem] overflow-hidden bg-gray-50 border-8 border-gray-50 shadow-2xl"
            >
              <img 
                src={farmer.image || "/farmers/default.svg"}
                alt={farmer.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                <span className="bg-[#2D5A27] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#2D5A27]/20">
                  <CheckCircle size={14} /> Tasdiqlangan dehqon
                </span>
                <span className="bg-orange-50 text-[#E67E22] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Star size={14} className="fill-[#E67E22]" /> 5.0 Reyting
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">{farmer.name}</h1>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-gray-500 font-medium mb-10">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-[#2D5A27]" />
                  {farmer.region} viloyati
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={20} className="text-[#2D5A27]" />
                  {farmer.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Package size={20} className="text-[#2D5A27]" />
                  {farmer.products?.length || 0} ta faol e'lon
                </div>
              </div>

              <div className="flex gap-4 justify-center md:justify-start">
                <a 
                  href={`tel:${farmer.phone}`}
                  className="px-10 py-5 bg-[#2D5A27] text-white rounded-2xl font-black hover:bg-[#1f3d1a] transition-all shadow-xl shadow-[#2D5A27]/20 flex items-center gap-3"
                >
                  <Phone size={20} /> Aloqaga chiqish
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">Mahsulotlar</h2>
              <p className="text-gray-500 font-medium">{farmer.name} tomonidan yetishtirilgan tabiiy noz-ne'matlar</p>
            </div>
          </div>

          {!farmer.products || farmer.products.length === 0 ? (
            <div className="py-32 bg-white rounded-[3rem] border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <Package size={40} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Mahsulotlar topilmadi</h3>
              <p className="text-gray-400">Bu dehqon hozircha hech qanday e'lon bermagan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {farmer.products.map((product: any) => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  quantity={product.quantity}
                  region={product.region}
                  category={product.category}
                  image={product.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
