'use client';

import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Loader2, CheckCircle } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import api from '@/shared/api/api';
import toast from 'react-hot-toast';
import { useCartStore } from '@/entities/cart/model/cartStore';
import { useFavoritesStore } from '@/entities/product/model/favoritesStore';
import { useAuthStore } from '@/entities/user/model/authStore';
import { useRouter } from 'next/navigation';

interface ProductActionsProps {
  product: any;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const productId = product.id;
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { user } = useAuthStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const router = useRouter();

  const isFav = isFavorite(productId);

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error('Avval tizimga kiring');
      router.push('/login');
      return;
    }

    setFavoriteLoading(true);
    try {
      await toggleFavorite(productId);
      if (isFav) {
        toast.success('Sevimlilardan o\'chirildi');
      } else {
        toast.success('Sevimlilarga qo\'shildi ❤️');
      }
    } catch (err) {
      toast.error('Xatolik yuz berdi');
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleOrder = async () => {
    if (!user) {
      toast.error('Savatga qo\'shish uchun avval tizimga kiring');
      router.push('/login');
      return;
    }

    if (user.role === 'FARMER') {
      toast.error('Dehqonlar savatga mahsulot qo\'sha olmaydi');
      return;
    }

    useCartStore.getState().addItem(product);
    setOrderPlaced(true);
    toast.success('Savatga qo\'shildi! 🛒');
    
    // Reset state after 2 seconds to allow adding again
    setTimeout(() => setOrderPlaced(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {user?.role !== 'FARMER' && (
        <button
          className={cn(
            "flex-1 h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl",
            orderPlaced
              ? "bg-green-500 text-white shadow-green-500/20 cursor-default"
              : "bg-[#2D5A27] text-white shadow-[#2D5A27]/20 hover:bg-[#1f3d1a] active:scale-95"
          )}
          onClick={handleOrder}
          disabled={orderLoading || orderPlaced}
        >
          {orderLoading ? (
            <Loader2 className="animate-spin" size={22} />
          ) : orderPlaced ? (
            <><CheckCircle size={22} /> Savatga qo'shildi</>
          ) : (
            <><ShoppingCart size={22} /> Savatga qo'shish</>
          )}
        </button>
      )}

      {user?.role !== 'FARMER' && (
        <button
          onClick={handleToggleFavorite}
          disabled={favoriteLoading}
          className={cn(
            "w-full h-14 rounded-2xl border-2 font-bold flex items-center justify-center gap-3 transition-all",
            isFav
              ? "bg-red-50 border-red-500 text-red-500"
              : "bg-white border-gray-100 text-gray-500 hover:border-red-200 hover:text-red-500"
          )}
        >
          {favoriteLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <Heart size={20} fill={isFav ? "currentColor" : "none"} />
              {isFav ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
            </>
          )}
        </button>
      )}
    </div>
  );
}
