import Navbar from "@/widgets/Navbar/ui/Navbar";
import Footer from "@/widgets/Footer/ui/Footer";
import { Sprout, Users, ShieldCheck, TrendingUp, Heart } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-48 pb-24 bg-[#F9FBFA] relative overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-[#2D5A27]/5 blur-3xl rounded-full" />
        <div className="container mx-auto px-4 text-center">
          <span className="text-[#2D5A27] font-black uppercase tracking-widest text-xs mb-4 block">Biz haqimizda</span>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
            Qishloq xo'jaligini <br /> <span className="text-[#2D5A27]">raqamlashtiramiz</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 font-medium leading-relaxed">
            Bizning maqsadimiz — dehqonlar va iste'molchilar o'rtasida to'g'ridan-to'g'ri, 
            ishonchli va shaffof aloqani o'rnatish orqali O'zbekiston agrosanoatini yangi bosqichga olib chiqish.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl shadow-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop" 
                alt="Agriculture work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D5A27]/60 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <p className="text-2xl font-black italic">"Biz dehqonning mehnatini qadrlaymiz va uni dunyoga ko'rsatishni istaymiz."</p>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-6">Bizning missiyamiz</h2>
                <p className="text-gray-500 font-medium leading-relaxed">
                  DehqonYordamchisi — bu shunchaki e'lonlar doskasi emas. Bu dehqonlarga o'z mahsulotlarini 
                  haqqoniy narxlarda sotishga, xaridorlarga esa eng yangi va sifatli mahsulotlarni 
                  osongina topishga yordam beradigan ekotizimdir.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ValueCard 
                  icon={<ShieldCheck size={32} className="text-[#2D5A27]" />}
                  title="Ishonch"
                  desc="Har bir foydalanuvchi va mahsulot sifatini nazorat qilamiz."
                />
                <ValueCard 
                  icon={<TrendingUp size={32} className="text-[#E67E22]" />}
                  title="Rivojlanish"
                  desc="Dehqonlarimizga bizneslarini kengaytirishda yordam beramiz."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section (Reused Style) */}
      <section className="py-24 bg-[#2D5A27] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl font-black mb-2">2024</div>
              <p className="text-[#F1C40F] font-black uppercase tracking-widest text-xs">Tashkil etilgan yil</p>
            </div>
            <div>
              <div className="text-6xl font-black mb-2">5000+</div>
              <p className="text-[#F1C40F] font-black uppercase tracking-widest text-xs">Muvaffaqiyatli bitimlar</p>
            </div>
            <div>
              <div className="text-6xl font-black mb-2">Uzbekistan</div>
              <p className="text-[#F1C40F] font-black uppercase tracking-widest text-xs">Bizning qamrovimiz</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Community Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-16">Bizning qadriyatlarimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureItem 
              icon={<Sprout size={40} />}
              title="Tabiiylik"
              desc="Biz faqat ekologik toza va tabiiy yo'llar bilan yetishtirilgan mahsulotlarni qo'llab-quvvatlaymiz."
            />
            <FeatureItem 
              icon={<Users size={40} />}
              title="Hamjamiyat"
              desc="Dehqonlar va xaridorlar o'rtasida mustahkam professional hamjamiyatni shakllantiramiz."
            />
            <FeatureItem 
              icon={<Heart size={40} />}
              title="Sadoqat"
              desc="Mijozlarimiz va hamkorlarimiz ishonchini oqlash bizning eng oliy maqsadimizdir."
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ValueCard({ icon, title, desc }: any) {
  return (
    <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-black mb-2">{title}</h3>
      <p className="text-sm text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: any) {
  return (
    <div className="space-y-6 group">
      <div className="w-20 h-20 bg-[#2D5A27]/5 text-[#2D5A27] rounded-[2rem] flex items-center justify-center mx-auto group-hover:bg-[#2D5A27] group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="text-gray-500 font-medium leading-relaxed max-w-xs mx-auto">{desc}</p>
    </div>
  );
}
