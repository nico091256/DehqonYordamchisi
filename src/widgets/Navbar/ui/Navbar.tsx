'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/entities/user/model/authStore';
import { 
  Menu, 
  X, 
  Heart, 
  ShoppingCart, 
  Bell, 
  Search, 
  Sprout, 
  CloudSun, 
  Globe, 
  LayoutDashboard,
  ChevronDown,
  Wheat,
  Sparkles,
  BarChart3,
  Users2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/entities/cart/model/cartStore';
import { useFavoritesStore } from '@/entities/product/model/favoritesStore';
import UserMenu from './UserMenu';
import DashboardSidebar from '@/widgets/Sidebar/ui/Sidebar';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuthStore();
  const pathname = usePathname();
  const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user, fetchFavorites]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Marketplace', href: '/products', icon: <ShoppingBag size={18} /> },
    { name: 'Mahsulotlar', href: '/products', icon: <Wheat size={18} /> },
    { name: 'Kategoriyalar', href: '/#categories', icon: <Sprout size={18} /> },
    { name: 'Fermerlar', href: '/farmers', icon: <Users2 size={18} /> },
    { name: 'AI Yordamchi', href: '/ai-assistant', icon: <Sparkles size={18} /> },
    { name: 'Statistikalar', href: '/stats', icon: <BarChart3 size={18} /> },
  ];

  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        isScrolled 
          ? "py-3 bg-white/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(45,90,39,0.08)] border-b border-white/20" 
          : "py-6 bg-transparent"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Logo */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <button 
                className="lg:hidden p-3 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl text-[#2D5A27] shadow-sm active:scale-90 transition-all"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={20} />
              </button>
              
              <Link href="/" className="flex items-center gap-3 group relative">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2D5A27] rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-[#2D5A27]/20 group-hover:rotate-6 transition-transform duration-500 overflow-hidden">
                    <Wheat size={24} strokeWidth={2.5} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-[#E67E22] rounded-full border-2 border-white"
                  />
                </div>
                <div className="flex flex-col whitespace-nowrap hidden sm:flex">
                  <span className="text-sm md:text-lg font-black tracking-tighter text-gray-900 leading-none">
                    DEHQON
                  </span>
                  <span className="text-[8px] md:text-[10px] font-black tracking-[0.3em] text-[#2D5A27] leading-none mt-1">
                    YORDAMCHISI
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden lg:flex items-center bg-gray-50/50 backdrop-blur-md p-1.5 rounded-[2rem] border border-gray-100/50 overflow-hidden">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={cn(
                    "px-3 xl:px-5 py-2.5 rounded-[1.5rem] text-[10px] xl:text-[11px] font-black uppercase tracking-widest transition-all duration-500 relative group whitespace-nowrap",
                    pathname === link.href 
                      ? "text-white bg-[#2D5A27] shadow-lg shadow-[#2D5A27]/20" 
                      : "text-gray-400 hover:text-gray-900"
                  )}
                >
                  {link.name}
                  {pathname !== link.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#2D5A27] rounded-full group-hover:w-4 transition-all duration-500" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Tools */}
            <div className="flex items-center gap-2 xl:gap-3 shrink-0">
              {/* Weather Widget */}
              <div className="hidden xl:flex items-center gap-3 px-4 py-2.5 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-sm whitespace-nowrap">
                <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                  <CloudSun size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-gray-900 leading-none">+24°C</p>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Toshkent</p>
                </div>
              </div>

              {/* Search Toggle */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#2D5A27] hover:border-[#2D5A27]/20 transition-all shadow-sm"
              >
                <Search size={18} strokeWidth={2.5} />
              </button>

              {/* Language Switcher */}
              <div className="hidden sm:flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2.5 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-sm cursor-pointer group">
                <Globe size={14} className="text-gray-400 group-hover:text-[#2D5A27] transition-colors md:w-4 md:h-4" />
                <span className="text-[9px] md:text-[10px] font-black text-gray-900 uppercase tracking-widest">UZ</span>
                <ChevronDown size={10} className="text-gray-400 md:w-3 md:h-3" />
              </div>

              {/* Notifications */}
              <button className="relative w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#2D5A27] hover:border-[#2D5A27]/20 transition-all shadow-sm">
                <Bell size={18} strokeWidth={2.5} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-[#E67E22] rounded-full border-2 border-white shadow-lg animate-pulse" />
              </button>

              <div className="hidden md:block h-8 w-px bg-gray-100 mx-1 rounded-full" />

              {/* User Profile / Dashboard CTA */}
              {user ? (
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="hidden lg:block">
                    <UserMenu />
                  </div>
                  <Link 
                    href="/dashboard" 
                    className="hidden lg:flex items-center gap-2 bg-[#2D5A27] hover:bg-[#1f3d1a] text-white px-4 xl:px-6 h-10 xl:h-12 rounded-2xl text-[9px] xl:text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#2D5A27]/20 transition-all active:scale-95 whitespace-nowrap"
                  >
                    <LayoutDashboard size={14} className="xl:w-4 xl:h-4" /> Dashboard
                  </Link>
                  {/* Mobile Avatar */}
                  <div className="lg:hidden w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#2D5A27] to-[#1E3D1A] rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-[#2D5A27]/20 border border-white/10 text-sm md:text-base">
                    {user.name.charAt(0)}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 md:gap-3 whitespace-nowrap">
                  <Link href="/login" className="px-4 py-3 text-[9px] xl:text-[10px] font-black text-gray-400 hover:text-[#2D5A27] transition-all uppercase tracking-widest">Kirish</Link>
                  <Link href="/register" className="h-10 xl:h-12 flex items-center bg-[#2D5A27] text-white px-4 xl:px-6 rounded-2xl text-[9px] xl:text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#2D5A27]/20">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Global Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-gray-900/40 backdrop-blur-2xl flex items-start justify-center pt-32 px-4"
          >
            <motion.div 
              initial={{ y: -20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -20, scale: 0.95 }}
              className="w-full max-w-3xl bg-white rounded-[3rem] p-4 shadow-2xl border border-white/20"
            >
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Mahsulot yoki dehqonlarni qidiring..."
                  className="w-full h-20 bg-gray-50 border-none rounded-[2rem] pl-16 pr-24 text-xl font-medium focus:ring-4 focus:ring-[#2D5A27]/5 outline-none"
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 px-5 h-12 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                >
                  Yopish (ESC)
                </button>
              </div>
            </motion.div>
            <div className="absolute inset-0 -z-10" onClick={() => setIsSearchOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Navigation */}
      <DashboardSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        mode="mobile-only"
      />
    </>
  );
}

function ShoppingBag(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
