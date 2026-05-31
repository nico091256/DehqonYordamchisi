import Footer from "@/widgets/Footer/ui/Footer";
import ProductCard from "@/entities/product/ui/ProductCard";
import ProductFilters from "@/features/product-filters/ui/ProductFilters";
import { Sparkles } from "lucide-react";

import { mockProducts } from "@/app/api/mockData";

async function getProducts(searchParams: { [key: string]: string | string[] | undefined }) {
  let filtered = [...mockProducts];

  if (searchParams.search) {
    const search = String(searchParams.search).toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(search) || 
      p.region.toLowerCase().includes(search)
    );
  }
  if (searchParams.category) {
    filtered = filtered.filter(p => p.category === String(searchParams.category));
  }
  if (searchParams.region) {
    filtered = filtered.filter(p => p.region === String(searchParams.region));
  }

  return filtered.slice(0, 20);
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const products = await getProducts(resolvedParams);
  const hasFilters = !!(resolvedParams.search || resolvedParams.category || resolvedParams.region);

  return (
    <main className="min-h-screen bg-[#F9FBFA] flex flex-col pt-20">
      
      {/* Mobile Top Header (Hidden on PC Sidebar) */}
      <header className="pt-32 pb-12 bg-white border-b border-gray-100 lg:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-[#2D5A27] font-black uppercase tracking-widest text-[10px] mb-4">
            <Sparkles size={14} /> Umumiy bozor
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">Mahsulotlar Bozori</h1>
          <ProductFilters />
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Side Filters (Hidden on Mobile) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 space-y-8">
              <div>
                <div className="flex items-center gap-2 text-[#2D5A27] font-black uppercase tracking-widest text-[10px] mb-2">
                  <Sparkles size={14} /> Umumiy bozor
                </div>
                <h1 className="text-3xl font-black text-gray-900">Bozor</h1>
              </div>
              <ProductFilters layout="vertical" />
            </div>
          </aside>

          {/* Product Grid Area */}
          <section className="flex-grow">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-gray-900">
                {products.length > 0 ? "Barcha mahsulotlar" : "Mahsulotlar topilmadi"}
              </h2>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Jami: {products.length} ta
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product: any) => (
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

            {products.length === 0 && (
              <div className="py-24 text-center bg-white rounded-[3rem] border border-gray-100 shadow-sm">
                <div className="text-6xl mb-6">🔍</div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Hech narsa topilmadi</h2>
                <p className="text-gray-500 font-medium max-w-md mx-auto">
                  Qidiruv shartlarini o'zgartirib ko'ring yoki boshqa hududlarni tanlang.
                </p>
                {hasFilters && (
                  <a 
                    href="/products"
                    className="mt-8 inline-block px-6 py-3 bg-[#2D5A27] text-white rounded-xl font-bold hover:bg-[#1f3d1a] transition-all"
                  >
                    Filtrlarni tozalash
                  </a>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
