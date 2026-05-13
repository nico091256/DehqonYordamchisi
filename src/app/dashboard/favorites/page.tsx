'use client';

import { useQuery } from "@tanstack/react-query";
import api from "@/shared/api/api";
import { Heart, Loader2, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/entities/product/ui/ProductCard";
import { useFavoritesStore } from "@/entities/product/model/favoritesStore";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function DashboardFavoritesPage() {
  const { favoriteIds, toggleFavorite } = useFavoritesStore();

  const { data: favorites, isLoading, refetch } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data } = await api.get('/api/favorites');
      return data || [];
    }
  });

  useEffect(() => {
    refetch();
  }, [favoriteIds, refetch]);

  const handleRemove = async (productId: string) => {
    try {
      await toggleFavorite(productId);
      toast.success('Sevimlilardan olib tashlandi');
    } catch (err) {
      toast.error('Xatolik yuz berdi');
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-black text-gray-900 mb-2">Sevimlilar</h1>
        <p className="text-gray-500 font-medium text-lg">Siz saqlab qo'ygan va tanlab olingan sara mahsulotlar</p>
      </header>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-[#2D5A27]" size={48} />
          <p className="text-gray-400 font-black text-xs uppercase tracking-widest">Yuklanmoqda...</p>
        </div>
      ) : !favorites || favorites.length === 0 ? (
        <div className="py-32 bg-white rounded-[3rem] border border-gray-100 shadow-sm text-center">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 text-red-500">
            <Heart size={48} fill="currentColor" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Sevimlilar ro'yxati bo'sh</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-10 font-medium leading-relaxed">
            Sizga yoqqan mahsulotlarni yurakcha tugmasini bosish orqali shu yerda saqlashingiz mumkin.
          </p>
          <Link href="/products" className="btn-primary inline-flex items-center gap-3 h-16 px-10">
            <ShoppingBag size={24} /> Bozorga borish
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((fav: any) => {
            const product = fav.product || fav;
            return (
              <div key={product.id} className="relative group">
                <ProductCard 
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  quantity={product.quantity}
                  region={product.region}
                  category={product.category}
                  image={product.image}
                />
                <button 
                  onClick={() => handleRemove(product.id)}
                  className="absolute top-6 left-6 w-12 h-12 bg-white shadow-2xl rounded-2xl flex items-center justify-center text-red-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10 border border-red-50"
                  title="Olib tashlash"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
