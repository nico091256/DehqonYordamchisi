'use client';

import { motion } from 'framer-motion';
import { Heart, MapPin, Tag, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/entities/cart/model/cartStore';
import { useAuthStore } from '@/entities/user/model/authStore';
import { useFavoritesStore } from '@/entities/product/model/favoritesStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
  region: string;
  category: string;
  image?: string;
  isFavorite?: boolean;
}

export default function ProductCard({ id, title, price, quantity, region, category, image }: ProductCardProps) {
  const { user } = useAuthStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const router = useRouter();
  
  const isFav = isFavorite(id);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      className="card-premium group"
    >
      <Link href={`/products/${id}`} className="block relative aspect-[4/3] overflow-hidden rounded-t-[2.5rem]">
        <Image 
          src={image || `https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=400&auto=format&fit=crop`} 
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        
        {/* PC Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D5A27]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 backdrop-blur-[1px]">
          <span className="bg-white text-[#2D5A27] px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            Batafsil ko'rish
          </span>
        </div>

        <div className="absolute top-5 left-5 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-[#2D5A27] shadow-sm border border-white/20">
            {category}
          </span>
          {quantity < 10 && (
            <span className="bg-red-500 text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm">
              Sotuvda kam qoldi
            </span>
          )}
        </div>
        
        {user?.role !== 'FARMER' && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              if (!user) {
                toast.error('Avval tizimga kiring');
                router.push('/login');
                return;
              }
              toggleFavorite(id).catch(() => toast.error('Xatolik yuz berdi'));
            }}
            className={cn(
              "absolute top-5 right-5 w-11 h-11 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all shadow-sm active:scale-90 z-10 border border-white/20",
              isFav ? "text-red-500 scale-110" : "text-gray-400 hover:text-red-500"
            )}
          >
            <Heart size={20} fill={isFav ? "currentColor" : "none"} strokeWidth={2.5} />
          </button>
        )}
      </Link>

      <div className="p-8">
        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4">
          <div className="w-5 h-5 bg-gray-50 rounded-lg flex items-center justify-center text-[#2D5A27]">
            <MapPin size={12} />
          </div>
          {region}
        </div>
        
        <Link href={`/products/${id}`}>
          <h3 className="font-black text-xl mb-5 line-clamp-1 group-hover:text-[#2D5A27] transition-colors leading-tight tracking-tight">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-[#2D5A27] leading-none mb-1 tracking-tighter">
              {price.toLocaleString()}
            </span>
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">so'm / kg</span>
          </div>
          <div className="text-[10px] font-black text-[#2D5A27] bg-[#F9FBFA] px-4 py-2.5 rounded-2xl border border-[#2D5A27]/5">
            {quantity} kg mavjud
          </div>
        </div>

        {user?.role !== 'FARMER' && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              if (!user) {
                toast.error('Savatga qo\'shish uchun avval tizimga kiring');
                return;
              }
              useCartStore.getState().addItem({ id, title, price, quantity, region, category, image });
              toast.success('Savatga qo\'shildi 🛒');
            }}
            className="w-full py-5 bg-[#F9FBFA] text-[#2D5A27] font-black text-[10px] uppercase tracking-widest rounded-2xl border-2 border-transparent hover:border-[#2D5A27] hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-2 group/btn"
          >
            <ShoppingCart size={18} className="group-hover/btn:-translate-y-0.5 transition-transform" />
            Savatga qo'shish
          </button>
        )}
      </div>
    </motion.div>
  );
}
