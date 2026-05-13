'use client';

import Navbar from "@/widgets/Navbar/ui/Navbar";
import Footer from "@/widgets/Footer/ui/Footer";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Xabaringiz muvaffaqiyatli yuborildi!");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#F9FBFA]">
      <Navbar />

      <header className="pt-48 pb-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <span className="text-[#2D5A27] font-black uppercase tracking-widest text-[10px] mb-4 block">Aloqa</span>
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-8">Biz bilan bog'laning</h1>
          <p className="max-w-2xl mx-auto text-gray-500 font-medium">
            Savollaringiz bormi? Bizga xabar qoldiring yoki to'g'ridan-to'g'ri bog'laning. 
            Sizga yordam berishdan hamisha xursandmiz.
          </p>
        </div>
      </header>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <ContactCard 
                icon={<Phone className="text-[#2D5A27]" size={24} />}
                title="Telefon raqam"
                info="+998 (90) 123-45-67"
                desc="Dushanba-Shanba, 9:00 - 18:00"
              />
              <ContactCard 
                icon={<Mail className="text-[#E67E22]" size={24} />}
                title="Email"
                info="info@dehqon.uz"
                desc="Istalgan vaqtda yozing"
              />
              <ContactCard 
                icon={<MapPin className="text-[#2D5A27]" size={24} />}
                title="Manzil"
                info="Toshkent shahri"
                desc="Yunusobod tumani, 4-kvartal"
              />
              
              <div className="p-8 rounded-[2.5rem] bg-[#2D5A27] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full -mr-16 -mt-16" />
                <h4 className="text-xl font-black mb-4">Ijtimoiy tarmoqlar</h4>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                    <MessageCircle size={24} />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                    <Send size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-gray-100 shadow-sm shadow-gray-200/50">
                <div className="mb-10">
                  <div className="flex items-center gap-2 text-[#E67E22] font-black uppercase tracking-widest text-[10px] mb-2">
                    <Sparkles size={14} /> Xabar yuborish
                  </div>
                  <h2 className="text-3xl font-black text-gray-900">Sizga qanday yordam bera olamiz?</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">To'liq ismingiz</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Ali Valiyev"
                        className="input-field bg-gray-50/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Telefon raqamingiz</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+998 90 123 45 67"
                        className="input-field bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Mavzu</label>
                    <select className="input-field bg-gray-50/50 appearance-none">
                      <option value="Xarid bo'yicha">Xarid bo'yicha</option>
                      <option value="Hamkorlik">Hamkorlik</option>
                      <option value="Texnik yordam">Texnik yordam</option>
                      <option value="Boshqa">Boshqa</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Xabaringiz</label>
                    <textarea 
                      required
                      placeholder="Xabaringizni bu yerga yozing..."
                      className="input-field bg-gray-50/50 min-h-[180px] py-4"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn-primary w-full h-16 flex items-center justify-center gap-3 text-lg mt-8 shadow-xl shadow-[#2D5A27]/20"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : (
                      <>Xabarni yuborish <Send size={20} /></>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactCard({ icon, title, info, desc }: any) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm group hover:shadow-xl hover:shadow-gray-200/50 transition-all">
      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">{title}</h4>
      <p className="text-xl font-black text-gray-900 mb-1">{info}</p>
      <p className="text-xs text-gray-500 font-medium">{desc}</p>
    </div>
  );
}
