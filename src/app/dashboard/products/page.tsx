'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/shared/api/api';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Package,
  Loader2,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function DashboardProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['my-products'],
    queryFn: async () => {
      const { data } = await api.get('/api/products/my-products');
      return data.products;
    }
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Haqiqatan ham ushbu mahsulotni o\'chirmoqchimisiz?')) return;
    
    try {
      await api.delete(`/api/products/${id}`);
      toast.success('Mahsulot muvaffaqiyatli o\'chirildi');
      refetch();
    } catch (err) {
      toast.error('O\'chirishda xatolik yuz berdi');
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1">Mening Mahsulotlarim</h1>
          <p className="text-gray-500 font-medium">Bozorga chiqarilgan barcha e'lonlaringiz</p>
        </div>
        <Link 
          href="/dashboard/products/new" 
          className="btn-primary flex items-center justify-center gap-2 h-14 px-8 shadow-xl shadow-[#2D5A27]/20"
        >
          <Plus size={20} /> Yangi mahsulot
        </Link>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Nomi bo'yicha qidirish..."
            className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-[#2D5A27]/10 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 h-12 bg-white border border-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-colors shadow-sm">
          <Filter size={18} /> Saralash
        </button>
      </div>

      {/* Products Table/Grid */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-[#2D5A27]" size={40} />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Yuklanmoqda...</p>
          </div>
        ) : data?.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-6">
              <Package size={40} />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Hali mahsulot qo'shmagansiz</h3>
            <p className="text-gray-400 mb-8 max-w-xs mx-auto">Sotuvni boshlash uchun birinchi mahsulotingizni qo'shing!</p>
            <Link href="/dashboard/products/new" className="btn-secondary">
              Birinchi mahsulotni qo'shish
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Mahsulot</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Kategoriya</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Narxi</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Miqdori</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Harakat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data?.map((product: any) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                          <img src={product.image || 'https://via.placeholder.com/100'} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-[#2D5A27] transition-colors">{product.title}</p>
                          <p className="text-[10px] text-gray-400 font-bold">{product.region}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-black text-gray-900">
                      {product.price.toLocaleString()} <span className="text-[10px] text-gray-400 ml-1">so'm</span>
                    </td>
                    <td className="px-8 py-5 font-bold text-gray-500">
                      {product.quantity} kg
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <Link href={`/products/${product.id}`} className="p-2 text-gray-400 hover:text-[#2D5A27] hover:bg-[#2D5A27]/5 rounded-lg transition-all" title="Ko'rish">
                          <ExternalLink size={18} />
                        </Link>
                        <Link href={`/dashboard/products/${product.id}/edit`} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="Tahrirlash">
                          <Edit2 size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" 
                          title="O'chirish"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
