'use client';

import Navbar from "@/widgets/Navbar/ui/Navbar";
import Footer from "@/widgets/Footer/ui/Footer";
import ProductCard from "@/entities/product/ui/ProductCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/shared/api/api";
import { Heart, Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/shared/hooks/useAuth";
import { useFavoritesStore } from "@/entities/product/model/favoritesStore";
import { useEffect } from "react";

export default function FavoritesPage() {
  useAuth(true); // require login
  const queryClient = useQueryClient();
  const { favoriteIds } = useFavoritesStore();

  const { data: favorites, isLoading, refetch } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data } = await api.get('/api/favorites');
      return data || [];
    }
  });

  // Refetch when favoriteIds change to keep the list updated
  useEffect(() => {
    refetch();
  }, [favoriteIds, refetch]);

  return (
    <main className="min-h-screen bg-[#F9FBFA]">
      <Navbar />
      
      <header className="pt-48 pb-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shadow-sm shadow-red-100">
              <Heart size={28} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900">Sevimlilar</h1>
              <p className="text-gray-500 font-medium">Sizga yoqqan va tanlab olingan sara mahsulotlar.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="py-32 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-[#2D5A27]" size={48} />
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Sevimlilar yuklanmoqda...</p>
            </div>
          ) : !favorites || favorites.length === 0 ? (
            <div className="py-32 text-center bg-white rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200">
                <Heart size={48} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">Sevimlilar ro'yxati bo'sh</h2>
              <p className="text-gray-500 mb-12 max-w-sm mx-auto font-medium leading-relaxed">
                Hali hech qanday mahsulotni sevimlilarga qo'shmadingiz. 
                Bozordan o'zingizga ma'qul mahsulotlarni tanlang!
              </p>
              <Link href="/products" className="btn-primary px-12 py-5 inline-flex items-center gap-3">
                <ShoppingBag size={24} /> Bozorga borish
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {favorites.map((fav: any) => {
                const product = fav.product || fav;
                return (
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
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
