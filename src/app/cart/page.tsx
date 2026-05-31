'use client';

import { useCartStore } from "@/entities/cart/model/cartStore";
import { useAuthStore } from "@/entities/user/model/authStore";
import Navbar from "@/widgets/Navbar/ui/Navbar";
import Footer from "@/widgets/Footer/ui/Footer";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Loader2,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import api from "@/shared/api/api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Buyurtma berish uchun avval tizimga kiring');
      return;
    }

    setLoading(true);
    try {
      // Create separate orders for each item in the cart
      // In a real app, this might be a single "bulk order" endpoint
      const orderPromises = items.map(item => 
        api.post('/api/orders', { productId: item.id, amount: item.quantity })
      );

      await Promise.all(orderPromises);
      
      clearCart();
      setIsSuccess(true);
      toast.success('Barcha buyurtmalar muvaffaqiyatli qabul qilindi! 🎉');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Buyurtma berishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#F9FBFA] flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4 pt-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl shadow-gray-200/50 border border-gray-100"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-4">Buyurtma qabul qilindi!</h1>
            <p className="text-gray-500 font-medium mb-10 leading-relaxed">
              Xaridingiz uchun rahmat! Dehqonlar tez orada siz bilan bog'lanishadi. Buyurtmalaringizni dashboard orqali kuzatib borishingiz mumkin.
            </p>
            <div className="flex flex-col gap-4">
              <Link href="/dashboard/orders" className="btn-primary h-16 flex items-center justify-center gap-3">
                Buyurtmalarni ko'rish <ArrowRight size={20} />
              </Link>
              <Link href="/products" className="text-sm font-black text-gray-400 hover:text-[#2D5A27] transition-colors uppercase tracking-widest">
                Bozorga qaytish
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9FBFA] flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 pt-32 pb-24">
        <header className="mb-12">
          <Link href="/products" className="flex items-center gap-2 text-gray-400 hover:text-[#2D5A27] transition-colors font-bold text-sm mb-6">
            <ArrowLeft size={16} /> Bozorga qaytish
          </Link>
          <h1 className="text-4xl font-black text-gray-900">Savatdagi mahsulotlar</h1>
          <p className="text-gray-500 font-medium mt-2">Siz tanlagan tabiiy va sifatli ne'matlar</p>
        </header>

        {items.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gray-50 text-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Savatingiz hozircha bo'sh</h2>
            <p className="text-gray-500 font-medium mb-10">Bozorimizdan o'zingizga ma'qul mahsulotlarni tanlang!</p>
            <Link href="/products" className="btn-primary px-10 py-5 inline-flex items-center gap-3">
              Bozorga borish <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-xl hover:shadow-gray-100 transition-all"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden flex-shrink-0 bg-gray-50">
                      <img 
                        src={item.image || `/products/olma.svg`} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-black text-lg text-gray-900 truncate">{item.title}</h3>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.category} • {item.region}</p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                        <div className="flex items-center gap-4 bg-gray-50 p-1 rounded-2xl border border-gray-100 w-fit">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-[#2D5A27] transition-all"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-black text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, Math.min(item.availableQuantity, item.quantity + 1))}
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-[#2D5A27] transition-all"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Jami:</p>
                          <p className="font-black text-xl text-[#2D5A27] whitespace-nowrap">{(item.price * item.quantity).toLocaleString()} so'm</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/20 sticky top-32">
                <h2 className="text-2xl font-black text-gray-900 mb-8">Buyurtma xulosasi</h2>
                
                <div className="space-y-4 mb-8 pb-8 border-b border-gray-100">
                  <div className="flex justify-between text-gray-500 font-bold">
                    <span>Mahsulotlar soni</span>
                    <span>{items.reduce((acc, curr) => acc + curr.quantity, 0)} ta</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-bold">
                    <span>Yetkazib berish</span>
                    <span className="text-green-600">Dehqon orqali</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-10">
                  <div className="text-xs font-black uppercase tracking-widest text-gray-400">Umumiy summa:</div>
                  <div className="text-4xl font-black text-[#2D5A27] break-all sm:break-normal">
                    {getTotalPrice().toLocaleString()} <span className="text-xl">so'm</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full h-20 bg-[#2D5A27] text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-[#1f3d1a] transition-all shadow-2xl shadow-[#2D5A27]/20 disabled:opacity-50 active:scale-[0.98]"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Buyurtma berish <ArrowRight size={22} /></>}
                </button>
                
                <p className="text-[10px] text-gray-400 font-bold text-center mt-6 uppercase tracking-wider leading-relaxed">
                  Tugmani bosish orqali siz xarid qilish shartlariga rozilik bildirasiz
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
