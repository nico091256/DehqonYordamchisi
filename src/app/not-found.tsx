import Link from 'next/link';
import { ArrowLeft, Sprout } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F9FBFA] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-24 h-24 bg-[#2D5A27]/10 rounded-[2rem] flex items-center justify-center mb-8 mx-auto">
        <Sprout size={48} className="text-[#2D5A27]" />
      </div>

      <p className="text-[#E67E22] font-black uppercase tracking-widest text-sm mb-4">404 — Sahifa topilmadi</p>
      <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6">
        Voy, yo'qoldi!
      </h1>
      <p className="text-gray-500 font-medium text-lg max-w-md mx-auto mb-12">
        Siz qidirayotgan sahifa mavjud emas yoki o'chirilgan. Bosh sahifaga qayting.
      </p>

      <Link 
        href="/"
        className="inline-flex items-center gap-3 px-10 py-5 bg-[#2D5A27] text-white rounded-2xl font-black hover:bg-[#1f3d1a] transition-all shadow-xl shadow-[#2D5A27]/20"
      >
        <ArrowLeft size={20} /> Bosh sahifaga qaytish
      </Link>
    </main>
  );
}
