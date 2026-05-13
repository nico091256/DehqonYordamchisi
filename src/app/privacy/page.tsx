import Navbar from "@/widgets/Navbar/ui/Navbar";
import Footer from "@/widgets/Footer/ui/Footer";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F9FBFA] flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 pt-48 pb-24">
        <header className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">Maxfiylik siyosati</h1>
          <p className="text-gray-500 font-medium text-lg">Sizning ma'lumotlaringiz xavfsizligi bizning ustuvor vazifamizdir.</p>
        </header>

        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-10 lg:p-20 border border-gray-100 shadow-sm space-y-16 text-gray-600 leading-relaxed">
          <section className="space-y-6">
            <div className="flex items-center gap-4 text-gray-900 mb-8">
              <div className="w-12 h-12 bg-[#2D5A27]/10 rounded-2xl flex items-center justify-center text-[#2D5A27]">
                <Shield size={24} />
              </div>
              <h2 className="text-2xl font-black">Ma'lumotlar yig'ilishi</h2>
            </div>
            <p>
              DehqonYordamchisi platformasi foydalanuvchilarga xizmat ko'rsatish sifatini oshirish va xavfsizlikni ta'minlash maqsadida quyidagi ma'lumotlarni to'playdi:
            </p>
            <ul className="list-disc list-inside space-y-4 pl-4 font-medium">
              <li>Ism va familiya (shaxsni tasdiqlash uchun)</li>
              <li>Telefon raqami (bog'lanish va login uchun)</li>
              <li>Hudud (mahsulotlarni filtrlash uchun)</li>
              <li>Sotuvdagi mahsulotlar ma'lumotlari</li>
            </ul>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4 text-gray-900 mb-8">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#E67E22]">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-black">Ma'lumotlarni himoya qilish</h2>
            </div>
            <p>
              Biz sizning shaxsiy ma'lumotlaringizni ruxsatsiz kirish, o'zgartirish yoki yo'q qilishdan himoya qilish uchun zamonaviy xavfsizlik choralarini qo'llaymiz. Parollaringiz shifrlangan holda saqlanadi.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4 text-gray-900 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-black">Uchinchi shaxslarga berilmaslik</h2>
            </div>
            <p>
              Sizning shaxsiy ma'lumotlaringiz uchinchi shaxslarga sotilmaydi yoki ijaraga berilmaydi. Faqat xaridor dehqon bilan bog'lanishi uchun dehqonning telefon raqami ochiq holda ko'rsatiladi.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
