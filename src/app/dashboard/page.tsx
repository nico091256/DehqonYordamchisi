'use client';

import { useAuthStore } from "@/entities/user/model/authStore";
import { 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  Users,
  ArrowUpRight,
  Loader2,
  Sparkles,
  Heart,
  CloudRain,
  Sprout,
  MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "@/shared/api/api";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const isFarmer = user?.role === 'FARMER';
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats', user?.role],
    queryFn: async () => {
      const endpoint = isFarmer ? '/api/products/farmer/stats' : '/api/users/buyer/stats';
      const { data } = await api.get(endpoint);
      return data;
    },
    enabled: !!user
  });

  if (!user) return null;

  if (statsLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#2D5A27]" size={48} />
        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Tizim yuklanmoqda...</p>
      </div>
    );
  }

  const orders = stats?.recentOrders || [];

  return (
    <div className="space-y-8 pb-10">
      {/* Top Header & Quick Actions */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2D5A27]/5 text-[#2D5A27] rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Operatsion Holat: Faol
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Salom, {user.name.split(' ')[0]}
          </h1>
          <p className="text-gray-500 font-medium tracking-tight text-sm">Platformadagi bugungi ko'rsatkichlaringiz va tezkor amallar.</p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <button 
            onClick={() => setIsAiModalOpen(true)}
            className="px-6 h-12 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 text-purple-600 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-md transition-all group"
          >
            <Sparkles size={16} className="group-hover:animate-spin" /> AI Yordamchi
          </button>
          
          {isFarmer ? (
            <Link 
              href="/dashboard/products/new" 
              className="px-6 h-12 bg-[#2D5A27] text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1f3d1a] transition-all shadow-lg shadow-[#2D5A27]/20"
            >
              <Package size={16} /> Yangi e'lon
            </Link>
          ) : (
            <Link 
              href="/products" 
              className="px-6 h-12 bg-[#2D5A27] text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1f3d1a] transition-all shadow-lg shadow-[#2D5A27]/20"
            >
              <ShoppingBag size={16} /> Bozorga o'tish
            </Link>
          )}
        </div>
      </header>

      {/* Analytics Overview Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isFarmer ? (
          <>
            <StatsCard title="Jami Mahsulotlar" value={`${stats?.productCount || 0}`} icon={<Package />} color="blue" />
            <StatsCard title="Faol Buyurtmalar" value={`${stats?.orderStats?.PENDING || 0}`} icon={<ShoppingBag />} color="orange" />
            <StatsCard title="Sof Daromad" value={`${(stats?.revenue || 0).toLocaleString()}`} icon={<TrendingUp />} color="green" suffix="so'm" />
            <StatsCard title="Mijozlar Bazasi" value={`${stats?.customers || 0}`} icon={<Users />} color="purple" />
          </>
        ) : (
          <>
            <StatsCard title="Mening Buyurtmalarim" value={`${stats?.orderCount || 0}`} icon={<ShoppingBag />} color="green" />
            <StatsCard title="Sevimlilar" value={`${stats?.favoriteCount || 0}`} icon={<Heart />} color="red" />
            <StatsCard title="Xaridlar (Oy)" value="0" icon={<TrendingUp />} color="blue" />
            <StatsCard title="Xabarlar" value="0" icon={<MessageSquare />} color="purple" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Management Widget */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-black text-gray-900">Oxirgi tranzaksiyalar</h2>
              <p className="text-xs text-gray-400 font-medium mt-1">Platformadagi so'nggi harakatlar</p>
            </div>
            <Link href="/dashboard/orders" className="text-[10px] font-black text-[#2D5A27] hover:underline uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-lg">
              Barchasi
            </Link>
          </div>
          
          <div className="flex-1 space-y-4">
            {orders.length > 0 ? (
              orders.map((order: any) => (
                <OrderItem 
                  key={order.id}
                  id={`#${order.id.slice(0, 6)}`} 
                  client={isFarmer ? (order.buyer?.name || "Noma'lum") : (order.product?.farmer?.name || "Dehqon")} 
                  status={order.status} 
                  amount={order.product?.price.toLocaleString()} 
                  date={new Date(order.createdAt).toLocaleDateString()} 
                />
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 font-medium bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <ShoppingBag size={32} className="mb-3 text-gray-300" />
                Hozircha ma'lumot yo'q
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Weather & AI Insights */}
        <div className="space-y-6">
          {/* Agronomic Weather Insight */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_70%)] rounded-full" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100 mb-1">Mintaqa: Toshkent</h3>
                  <div className="text-4xl font-black">+24°C</div>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center transform-gpu">
                  <CloudRain size={24} />
                </div>
              </div>
              <div className="bg-black/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 transform-gpu">
                <p className="text-xs font-medium leading-relaxed">
                  <span className="font-bold text-blue-100">AI Tahlil:</span> Bugun ekinlarni sug'orish uchun qulay ob-havo. Harorat o'rtacha saqlanadi.
                </p>
              </div>
            </div>
          </div>

          {/* System Insight / Tips */}
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
              <Sprout size={20} className="text-orange-500" />
            </div>
            <h3 className="text-sm font-black text-gray-900 mb-2">
              {isFarmer ? "Bozor tahlili" : "Mavsumiy tavsiya"}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              {isFarmer 
                ? "Hozirgi mavsumda gilos va o'rik mahsulotlariga talab 45% ga oshgan. Agar sizda mavjud bo'lsa, zudlik bilan e'lon joylang."
                : "Ayni damda Qashqadaryo tarvuzlari eng ko'p sotib olinmoqda. Sifatli va arzon narxlarda topishingiz mumkin."}
            </p>
          </div>
        </div>
      </div>

      {/* AI Assistant Sliding Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transform-gpu"
            onClick={() => setIsAiModalOpen(false)}
          />
          <motion.div 
            initial={{ x: '100%', boxShadow: '-20px 0 50px rgba(0,0,0,0)' }}
            animate={{ x: 0, boxShadow: '-20px 0 50px rgba(0,0,0,0.1)' }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
              <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Sparkles size={20} className="text-purple-500" /> Dehqon AI
              </h2>
              <p className="text-xs text-gray-500 mt-1">Sizning shaxsiy raqamli yordamchingiz</p>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-[#F9FBFA]">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-sm text-gray-600 rounded-tl-none">
                Salom! Bugun sizga qanday yordam bera olaman? Ekinlar, bozor narxlari yoki platforma bo'yicha savollaringiz bormi?
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Xabar yozing..." 
                  className="w-full h-12 bg-gray-50 border-none rounded-xl pl-4 pr-12 text-sm focus:ring-2 focus:ring-purple-500/20 outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function StatsCard({ title, value, icon, color, suffix }: any) {
  const colorStyles: any = {
    blue: "bg-blue-50 text-blue-500 border-blue-100",
    green: "bg-green-50 text-green-500 border-green-100",
    orange: "bg-orange-50 text-orange-500 border-orange-100",
    purple: "bg-purple-50 text-purple-500 border-purple-100",
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10" />
      <div className="flex justify-between items-start mb-6">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorStyles[color]}`}>
          {icon}
        </div>
        <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-gray-400">
          Ushbu oy <ArrowUpRight size={12} className="text-green-500" />
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-2xl font-black text-gray-900">{value}</h3>
          {suffix && <span className="text-xs font-bold text-gray-400">{suffix}</span>}
        </div>
      </div>
    </div>
  );
}

function OrderItem({ id, client, status, amount, date }: any) {
  const statusConfig: any = {
    "PENDING": { label: "Kutilmoqda", color: "bg-orange-50 text-orange-600" },
    "ACCEPTED": { label: "Tasdiqlandi", color: "bg-green-50 text-green-600" },
    "REJECTED": { label: "Bekor qilindi", color: "bg-red-50 text-red-600" },
  };

  const currentStatus = statusConfig[status] || statusConfig["PENDING"];

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white border border-gray-100 shadow-sm rounded-xl flex items-center justify-center text-gray-400 font-black text-[10px] uppercase group-hover:border-[#2D5A27]/20 group-hover:text-[#2D5A27] transition-colors">
          {id}
        </div>
        <div>
          <p className="font-bold text-sm text-gray-900 leading-tight">{client}</p>
          <p className="text-[10px] text-gray-400 font-bold tracking-wider mt-0.5">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-black text-sm text-gray-900">{amount} <span className="text-[10px] text-gray-400">UZS</span></p>
        <span className={`text-[9px] font-black px-2 py-1 rounded-lg inline-block mt-1 uppercase tracking-widest ${currentStatus.color}`}>
          {currentStatus.label}
        </span>
      </div>
    </div>
  );
}
