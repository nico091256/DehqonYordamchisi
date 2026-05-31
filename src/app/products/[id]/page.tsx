import Footer from "@/widgets/Footer/ui/Footer";
import ProductCard from "@/entities/product/ui/ProductCard";
import { ArrowLeft, MapPin, User, ShieldCheck, Phone, Sparkles, Package } from "lucide-react";
import ProductActions from "@/entities/product/ui/ProductActions";
import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`;

async function getProduct(id: string) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data; // The API returns the product directly based on controller
  } catch (err) {
    console.error("Product detail fetch error:", err);
    return null;
  }
}

async function getRelatedProducts(category: string, excludeId: string) {
  try {
    const res = await fetch(`${API_URL}?category=${category}&limit=5`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products.filter((p: any) => p.id !== excludeId).slice(0, 4);
  } catch (err) {
    return [];
  }
}

import Image from "next/image";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);

  return (
    <main className="min-h-screen bg-[#F9FBFA] selection:bg-[#2D5A27] selection:text-white">
      
      <div className="container mx-auto px-4 pt-32 pb-24">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-12 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-[#2D5A27] transition-all">Asosiy</Link>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <Link href="/products" className="hover:text-[#2D5A27] transition-all">Bozor</Link>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <Link href={`/products?category=${product.category}`} className="hover:text-[#2D5A27] transition-all">{product.category}</Link>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-[#2D5A27]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-32 items-start">
          {/* Left: Image (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-32 rounded-[4rem] overflow-hidden bg-white aspect-square relative shadow-[0_50px_100px_-20px_rgba(45,90,39,0.1)] border-[12px] border-white group">
            <Image 
              src={product.image || `https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=800&auto=format&fit=crop`} 
              alt={product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
            />
            <div className="absolute top-8 left-8 flex flex-col gap-3">
              <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#2D5A27] shadow-xl border border-white/20">
                Premium Sifat
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col pt-4">
            <div className="flex items-center gap-3 mb-10">
              <span className="bg-[#2D5A27] text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#2D5A27]/20">
                {product.category}
              </span>
              <span className="bg-white text-gray-400 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-gray-100 shadow-sm">
                <MapPin size={14} className="text-[#2D5A27]" /> {product.region}
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black mb-10 leading-[1.1] text-gray-900 tracking-tighter">
              {product.title}
            </h1>

            <p className="text-xl text-gray-500/80 leading-relaxed mb-12 font-medium tracking-tight">
              {product.description || "Ushbu mahsulot haqida qo'shimcha ma'lumot berilmagan. Sifati kafolatlangan va dehqon tomonidan tavsiya etiladi."}
            </p>

            <div className="flex items-end gap-4 mb-12 pb-10 border-b border-gray-100">
              <span className="text-6xl font-black text-[#2D5A27] tracking-tighter">
                {product.price.toLocaleString()}
              </span>
              <span className="text-xl text-gray-400 font-black uppercase tracking-widest mb-2">so'm / kg</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-500">
                <div className="w-12 h-12 bg-[#2D5A27]/5 rounded-2xl flex items-center justify-center text-[#2D5A27] mb-6">
                  <Package size={24} />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Mavjud miqdor</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight">{product.quantity} kg</p>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-500">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6">
                  <User size={24} />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Dehqon</p>
                <p className="text-2xl font-black text-gray-900 truncate tracking-tight">{product.farmer?.name || "Noma'lum"}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 mb-12">
              <ProductActions product={product} />
              <a 
                href={`tel:${product.farmer?.phone}`} 
                className="flex-1 h-20 bg-white border-2 border-[#2D5A27]/20 text-[#2D5A27] rounded-[2rem] flex items-center justify-center gap-4 text-xs font-black uppercase tracking-widest hover:border-[#2D5A27] hover:bg-[#2D5A27]/5 transition-all active:scale-95 shadow-sm"
              >
                <Phone size={22} strokeWidth={2.5} /> Bog'lanish
              </a>
            </div>

            <div className="flex items-center gap-4 p-7 rounded-[2.5rem] border border-[#2D5A27]/10 bg-white text-sm font-bold text-gray-500 shadow-sm">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#2D5A27] shrink-0">
                <ShieldCheck size={28} />
              </div>
              <p className="leading-tight">Xavfsiz savdo kafolatlangan. Mahsulot sifatiga platforma tomonidan e'tibor qaratilgan.</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pt-32 border-t border-gray-100">
            <div className="flex items-end justify-between mb-16">
              <div>
                <div className="flex items-center gap-2 text-[#E67E22] font-black uppercase tracking-[0.25em] text-[10px] mb-4">
                  <div className="w-6 h-[2px] bg-[#E67E22]" />
                  Tavsiya etiladi
                </div>
                <h2 className="text-5xl font-black text-gray-900 tracking-tighter">O'xshash mahsulotlar</h2>
              </div>
              <Link href={`/products?category=${product.category}`} className="text-sm font-black uppercase tracking-widest text-[#2D5A27] hover:underline decoration-2 underline-offset-8">
                Barchasini ko'rish
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {relatedProducts.map((p: any) => (
                <ProductCard 
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  quantity={p.quantity}
                  region={p.region}
                  category={p.category}
                  image={p.image}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
