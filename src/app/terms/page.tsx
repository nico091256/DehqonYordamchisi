import Navbar from "@/widgets/Navbar/ui/Navbar";
import Footer from "@/widgets/Footer/ui/Footer";
import { FileText, CheckCircle, AlertCircle, Gavel } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F9FBFA] flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 pt-48 pb-24">
        <header className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">Foydalanish shartlari</h1>
          <p className="text-gray-500 font-medium text-lg">Platformamizdan foydalanish qoidalari va majburiyatlari.</p>
        </header>

        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-10 lg:p-20 border border-gray-100 shadow-sm space-y-16 text-gray-600 leading-relaxed">
          <section className="space-y-6">
            <div className="flex items-center gap-4 text-gray-900 mb-8">
              <div className="w-12 h-12 bg-[#2D5A27]/10 rounded-2xl flex items-center justify-center text-[#2D5A27]">
                <CheckCircle size={24} />
              </div>
              <h2 className="text-2xl font-black">Umumiy qoidalar</h2>
            </div>
            <p>
              DehqonYordamchisi platformasida ro'yxatdan o'tish orqali siz ushbu shartlarga to'liq rozilik bildirasiz. Platforma dehqonlar va xaridorlar o'rtasida ko'prik vazifasini o'taydi.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4 text-gray-900 mb-8">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#E67E22]">
                <AlertCircle size={24} />
              </div>
              <h2 className="text-2xl font-black">Dehqonlar majburiyatlari</h2>
            </div>
            <p>
              Dehqonlar o'z mahsulotlari haqida faqat haqqoniy ma'lumotlarni (narxi, miqdori, sifati) berishlari shart. Sifatsiz mahsulot yoki noto'g'ri narx ko'rsatilgan taqdirda, dehqon profili bloklanishi mumkin.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4 text-gray-900 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Gavel size={24} />
              </div>
              <h2 className="text-2xl font-black">Mas'uliyatni cheklash</h2>
            </div>
            <p>
              DehqonYordamchisi platformasi dehqon va xaridor o'rtasidagi to'g'ridan-to'g'ri kelishuvlarga, yetkazib berish jarayoniga yoki to'lov masalalariga javobgar emas. Biz faqat ma'lumot almashish uchun platforma taqdim etamiz.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
