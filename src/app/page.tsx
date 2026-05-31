import Hero from "@/widgets/Hero/ui/Hero";
import HowItWorks from "@/widgets/HowItWorks/ui/HowItWorks";
import Footer from "@/widgets/Footer/ui/Footer";
import ProductCard from "@/entities/product/ui/ProductCard";
import { ArrowRight, LayoutGrid, Sparkles } from "lucide-react";
import Link from "next/link";

import { mockProducts } from "@/app/api/mockData";

async function getRecentProducts() {
  return [...mockProducts].slice(0, 4);
}

export default async function Home() {
  const recentProducts = await getRecentProducts();

  return (
    <main className="min-h-screen pt-16 md:pt-20">
      <Hero />
      
      {/* Recent Products Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 md:mb-12">
            <div>
              <div className="flex items-center gap-2 text-[#E67E22] font-black uppercase tracking-widest text-[9px] md:text-[10px] mb-1 md:mb-2">
                <Sparkles size={14} /> Yangi e'lonlar
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900">Yangi Mahsulotlar</h2>
            </div>
            <Link href="/products" className="group flex items-center gap-2 text-[#2D5A27] font-bold hover:underline text-sm md:text-base">
              Barcha mahsulotlar <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {recentProducts.map((product: any) => (
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
          
          {recentProducts.length === 0 && (
            <div className="text-center py-10 text-gray-400 font-medium">
              Hozircha mahsulotlar yo'q
            </div>
          )}
        </div>
      </section>

      {/* Category Section */}
      <section className="py-12 md:py-24 bg-[#F9FBFA]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-4">Kategoriyalar</h2>
            <p className="text-gray-500 font-medium text-sm md:text-base">O'zingizga kerakli mahsulot turini tanlang va dehqonlar bilan bevosita savdo qiling</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
            <CategoryCard title="Mevalar" icon="🍎" count={120} value="MEVA" />
            <CategoryCard title="Sabzavotlar" icon="🥦" count={85} value="SABZAVOT" />
            <CategoryCard title="Poliz" icon="🍉" count={45} value="POLIZ" />
            <CategoryCard title="Donli" icon="🌾" count={60} value="DONLI" />
            <CategoryCard title="Boshqalar" icon="📦" count={30} value="BOSHQA" />
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Stats Section */}
      <section className="py-14 md:py-24 bg-[#2D5A27] text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <LayoutGrid size={400} className="absolute -top-40 -left-40" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
            <StatItem count="10k+" label="Foydalanuvchilar" />
            <StatItem count="500+" label="Dehqonlar" />
            <StatItem count="25k+" label="Savdolar" />
            <StatItem count="15+" label="Viloyatlar" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function CategoryCard({ title, icon, count, value }: { title: string, icon: string, count: number, value: string }) {
  return (
    <Link href={`/products?category=${value}`} className="group p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-white border border-gray-100 hover:border-[#2D5A27]/20 hover:shadow-xl hover:shadow-gray-200/50 transition-all text-center">
      <div className="text-3xl md:text-5xl mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <h3 className="font-black text-sm md:text-xl mb-1 md:mb-2 text-gray-900">{title}</h3>
      <p className="text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest">{count} ta e'lon</p>
    </Link>
  );
}

function StatItem({ count, label }: { count: string, label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-5xl lg:text-6xl font-black mb-1 md:mb-3">{count}</div>
      <div className="text-[#F1C40F] font-black uppercase tracking-widest text-[8px] md:text-[10px]">{label}</div>
    </div>
  );
}
