'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/shared/api/api';
import { 
  ShoppingBag, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Phone, 
  User,
  Loader2,
  ExternalLink,
  Search,
  Sprout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useAuthStore } from '@/entities/user/model/authStore';

export default function DashboardOrdersPage() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState('ALL');

  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ['my-orders'],
    queryFn: async () => {
      const { data } = await api.get('/api/orders/my');
      return data;
    }
  });

  const handleStatusUpdate = async (id: string, status: 'ACCEPTED' | 'REJECTED') => {
    try {
      await api.patch(`/api/orders/${id}/status`, { status });
      toast.success(status === 'ACCEPTED' ? 'Buyurtma qabul qilindi' : 'Buyurtma rad etildi');
      refetch();
    } catch (err) {
      toast.error('Xatolik yuz berdi');
    }
  };

  const filteredOrders = orders?.filter((order: any) => {
    if (filter === 'ALL') return true;
    return order.status === filter;
  }) ?? [];

  const isFarmer = user?.role === 'FARMER';

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1">
            {isFarmer ? "Buyurtmalar" : "Mening buyurtmalarim"}
          </h1>
          <p className="text-gray-500 font-medium">
            {isFarmer ? "Sizning mahsulotlaringizga tushgan barcha buyurtmalar" : "Siz tomondan amalga oshirilgan xaridlar tarixi"}
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-gray-100/50 rounded-2xl w-fit">
        {['ALL', 'PENDING', 'ACCEPTED', 'REJECTED'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              filter === f 
                ? 'bg-[#2D5A27] text-white shadow-lg shadow-[#2D5A27]/20' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {f === 'ALL' ? 'Barchasi' : f === 'PENDING' ? 'Kutilmoqda' : f === 'ACCEPTED' ? 'Tasdiqlangan' : 'Rad etilgan'}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-[#2D5A27]" size={40} />
          <p className="text-gray-400 font-black text-xs uppercase tracking-widest">Yuklanmoqda...</p>
        </div>
      ) : filteredOrders?.length === 0 ? (
        <div className="py-32 bg-white rounded-[3rem] border border-gray-100 shadow-sm text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <ShoppingBag size={40} />
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">Buyurtmalar topilmadi</h3>
          <p className="text-gray-400 max-w-xs mx-auto">Hozircha bu bo'limda hech qanday ma'lumot yo'q.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredOrders.map((order: any) => {
              const partner = isFarmer ? order.buyer : order.product?.farmer;
              
              return (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[2.5rem] border border-gray-100 p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 group hover:shadow-xl hover:shadow-gray-100 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    {/* Product Info */}
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0">
                        <img src={order.product?.image || 'https://via.placeholder.com/150'} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[#E67E22] uppercase tracking-[0.2em] mb-1">Buyurtma #{order.id.slice(0, 6)}</p>
                        <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-[#2D5A27] transition-colors">{order.product?.title}</h3>
                        <p className="text-sm font-bold text-gray-400">{new Date(order.createdAt).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>

                    <div className="hidden lg:block w-px h-12 bg-gray-100" />

                    {/* Partner Info (Buyer or Farmer) */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                        {isFarmer ? <User size={20} /> : <Sprout size={20} />}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{isFarmer ? 'Xaridor' : 'Sotuvchi (Dehqon)'}</p>
                        <p className="text-sm font-black text-gray-900">{partner?.name || "Noma'lum"}</p>
                        <a href={`tel:${partner?.phone}`} className="text-xs font-bold text-[#2D5A27] flex items-center gap-1 hover:underline">
                          <Phone size={12} /> {partner?.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-12">
                    <div className="text-center sm:text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Narxi</p>
                      <p className="text-2xl font-black text-gray-900">{order.product?.price.toLocaleString()} <span className="text-xs text-gray-400 ml-1">so'm</span></p>
                    </div>

                    <div className="flex items-center gap-3">
                      {order.status === 'PENDING' && isFarmer ? (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(order.id, 'ACCEPTED')}
                            className="h-12 px-6 bg-[#2D5A27] text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#1f3d1a] transition-all shadow-lg shadow-[#2D5A27]/10"
                          >
                            <CheckCircle2 size={16} /> Qabul qilish
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(order.id, 'REJECTED')}
                            className="h-12 px-6 bg-red-50 text-red-500 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-red-100 transition-all"
                          >
                            <XCircle size={16} /> Rad etish
                          </button>
                        </>
                      ) : (
                        <div className={`px-6 py-3 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest ${
                          order.status === 'ACCEPTED' ? 'bg-green-50 text-green-600' : 
                          order.status === 'REJECTED' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400'
                        }`}>
                          {order.status === 'ACCEPTED' ? (
                            <><CheckCircle2 size={16} /> {isFarmer ? 'Qabul qilingan' : 'Tasdiqlangan'}</>
                          ) : order.status === 'REJECTED' ? (
                            <><XCircle size={16} /> Rad etilgan</>
                          ) : (
                            <><Clock size={16} /> Kutilmoqda</>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
