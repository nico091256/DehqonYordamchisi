import { ProductSkeleton } from "@/shared/ui/Skeleton";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F9FBFA] flex flex-col pt-20">
      
      {/* Mobile Top Header */}
      <header className="pt-32 pb-12 bg-white border-b border-gray-100 lg:hidden">
        <div className="container mx-auto px-4">
          <div className="h-4 w-32 bg-gray-100 rounded mb-4 animate-pulse" />
          <div className="h-10 w-64 bg-gray-200 rounded-xl mb-8 animate-pulse" />
          <div className="h-14 w-full bg-gray-50 rounded-2xl animate-pulse" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Side Loading (Hidden on Mobile) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 space-y-8">
              <div className="h-8 w-32 bg-gray-200 rounded-xl animate-pulse" />
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                    <div className="h-10 w-full bg-gray-50 rounded-xl animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area Loading */}
          <section className="flex-grow">
            <div className="flex items-center justify-between mb-8">
              <div className="h-6 w-48 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-4 w-24 bg-gray-50 rounded-lg animate-pulse" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
