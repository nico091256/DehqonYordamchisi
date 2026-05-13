import Link from 'next/link';
import { MessageSquare, Share2, Globe, Mail, Phone, MapPin, Sprout } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#2D5A27] rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12">
                <Sprout size={24} />
              </div>
              <span className="text-xl font-black tracking-tight">
                Dehqon<span className="text-[#2D5A27]">Yordamchisi</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              O'zbekiston dehqonlari va xaridorlari uchun eng qulay va zamonaviy qishloq xo'jaligi bozori. Biz sifat va ishonchni birlashtiramiz.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Globe size={20} />} href="#" color="hover:text-[#2D5A27] hover:bg-[#2D5A27]/10" />
              <SocialLink icon={<MessageSquare size={20} />} href="#" color="hover:text-blue-500 hover:bg-blue-50" />
              <SocialLink icon={<Share2 size={20} />} href="#" color="hover:text-blue-600 hover:bg-blue-50" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6">Platforma</h4>
            <ul className="space-y-4">
              <FooterLink href="/products">Bozor</FooterLink>
              <FooterLink href="/farmers">Dehqonlar</FooterLink>
              <FooterLink href="/about">Biz haqimizda</FooterLink>
              <FooterLink href="/contact">Aloqa</FooterLink>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6">Kategoriyalar</h4>
            <ul className="space-y-4">
              <FooterLink href="/products?category=Mevalar">Mevalar</FooterLink>
              <FooterLink href="/products?category=Sabzavotlar">Sabzavotlar</FooterLink>
              <FooterLink href="/products?category=Poliz">Poliz ekinlari</FooterLink>
              <FooterLink href="/products?category=Donli">Don mahsulotlari</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6">Bog'lanish</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-500 text-sm group">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#2D5A27] group-hover:bg-[#2D5A27] group-hover:text-white transition-colors">
                  <Phone size={16} />
                </div>
                <span>+998 (90) 123-45-67</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm group">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#2D5A27] group-hover:bg-[#2D5A27] group-hover:text-white transition-colors">
                  <Mail size={16} />
                </div>
                <span>info@dehqon.uz</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm group">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#2D5A27] group-hover:bg-[#2D5A27] group-hover:text-white transition-colors">
                  <MapPin size={16} />
                </div>
                <span>Toshkent, O'zbekiston</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <p>© 2026 DehqonYordamchisi. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-[#2D5A27] transition-colors">Maxfiylik siyosati</Link>
            <Link href="/terms" className="hover:text-[#2D5A27] transition-colors">Foydalanish shartlari</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-500 text-sm hover:text-[#2D5A27] hover:translate-x-1 transition-all inline-block font-medium">
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ icon, href, color }: { icon: React.ReactNode, href: string, color: string }) {
  return (
    <Link 
      href={href} 
      className={`w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center transition-all ${color} hover:scale-110`}
    >
      {icon}
    </Link>
  );
}
