'use client';


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
    <div className="card-premium group transform-gpu hover:-translate-y-2 transition-transform duration-300">
      <Link href={`/products/${id}`} className="block relative aspect-[4/3] overflow-hidden rounded-t-xl md:rounded-t-[2.5rem]">
        <Image 
          src={image || `/products/olma.svg`} 
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        
        {/* PC Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D5A27]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-end justify-center pb-8 backdrop-blur-sm transform-gpu">
          <span className="bg-white text-[#2D5A27] px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            Batafsil ko'rish
          </span>
        </div>

        <div className="absolute top-2 left-2 md:top-5 md:left-5 flex flex-col gap-1.5 md:gap-2">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl text-[7px] md:text-[9px] font-black uppercase tracking-widest text-[#2D5A27] shadow-sm border border-white/20 transform-gpu">
            {category}
          </span>
          {quantity < 10 && (
            <span className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl text-[7px] md:text-[9px] font-black uppercase tracking-widest shadow-sm">
              Kam qoldi
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
              "absolute top-2 right-2 md:top-5 md:right-5 w-8 h-8 md:w-11 md:h-11 bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center transition-all shadow-sm active:scale-90 z-10 border border-white/20 transform-gpu",
              isFav ? "text-red-500 scale-110" : "text-gray-400 hover:text-red-500"
            )}
          >
            <Heart size={14} className="md:w-5 md:h-5" fill={isFav ? "currentColor" : "none"} strokeWidth={2.5} />
          </button>
        )}
      </Link>

      <div className="p-3 md:p-8">
        <div className="flex items-center gap-1.5 md:gap-2 text-gray-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-2 md:mb-4">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-gray-50 rounded-md md:rounded-lg flex items-center justify-center text-[#2D5A27]">
            <MapPin size={10} className="md:w-3 md:h-3" />
          </div>
          <span className="truncate">{region}</span>
        </div>
        
        <Link href={`/products/${id}`}>
          <h3 className="font-black text-sm md:text-xl mb-2 md:mb-5 line-clamp-1 group-hover:text-[#2D5A27] transition-colors leading-tight tracking-tight">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-3 md:mb-8">
          <div className="flex flex-col">
            <span className="text-base md:text-2xl font-black text-[#2D5A27] leading-none mb-0.5 md:mb-1 tracking-tighter">
              {price.toLocaleString()}
            </span>
            <span className="text-[7px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest">so'm / kg</span>
          </div>
          <div className="text-[7px] md:text-[10px] font-black text-[#2D5A27] bg-[#F9FBFA] px-2 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-2xl border border-[#2D5A27]/5 hidden sm:block">
            {quantity} kg
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
            className="w-full py-3 md:py-5 bg-[#F9FBFA] text-[#2D5A27] font-black text-[8px] md:text-[10px] uppercase tracking-widest rounded-xl md:rounded-2xl border-2 border-transparent hover:border-[#2D5A27] hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-1.5 md:gap-2 group/btn"
          >
            <ShoppingCart size={14} className="md:w-[18px] md:h-[18px] group-hover/btn:-translate-y-0.5 transition-transform" />
            <span className="hidden sm:inline">Savatga qo'shish</span>
            <span className="sm:hidden">Qo'shish</span>
          </button>
        )}
      </div>
    </div>
  );
}
