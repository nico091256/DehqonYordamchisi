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
  Users2,
  Home,
  Package,
  ArrowRight
} from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/entities/cart/model/cartStore';
import { useFavoritesStore } from '@/entities/product/model/favoritesStore';
import UserMenu from './UserMenu';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuthStore();
  const pathname = usePathname();
  const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites);
  const cartItemCount = useCartStore((state) => state.getItemCount)();

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Mahsulotlar', href: '/products', icon: <Wheat size={20} /> },
    { name: 'Kategoriyalar', href: '/#categories', icon: <Sprout size={20} /> },
    { name: 'Fermerlar', href: '/farmers', icon: <Users2 size={20} /> },
    { name: 'AI Yordamchi', href: '/ai-assistant', icon: <Sparkles size={20} /> },
  ];

  const mobileNavLinks = [
    { name: 'Bosh sahifa', href: '/', icon: <Home size={22} /> },
    ...navLinks,
  ];

  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 transform-gpu",
        isScrolled 
          ? "py-2 md:py-3 bg-white/80 backdrop-blur-md shadow-[0_10px_30px_rgba(45,90,39,0.05)] border-b border-gray-100/50" 
          : "py-3 md:py-6 bg-transparent"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            
            {/* Left: Logo */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <Link href="/" className="flex items-center gap-2 md:gap-3 group relative">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 md:w-12 md:h-12 bg-[#2D5A27] rounded-xl md:rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-[#2D5A27]/20 group-hover:rotate-6 transition-transform duration-500 overflow-hidden">
                    <Wheat size={18} strokeWidth={2.5} className="md:w-6 md:h-6" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20" />
                  </div>
                  <div 
                    className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 md:w-4 md:h-4 bg-[#E67E22] rounded-full border-2 border-white animate-pulse"
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
            <div className="flex items-center gap-1.5 md:gap-2 xl:gap-3 shrink-0">
              {/* Weather Widget */}
              <div className="hidden xl:flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-100 rounded-2xl shadow-sm whitespace-nowrap">
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
                className="w-9 h-9 md:w-12 md:h-12 bg-white border border-gray-100 rounded-xl md:rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#2D5A27] hover:border-[#2D5A27]/20 transition-all shadow-sm"
              >
                <Search size={16} strokeWidth={2.5} className="md:w-[18px] md:h-[18px]" />
              </button>

              {/* Language Switcher */}
              <div className="hidden sm:flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2.5 bg-white border border-gray-100 rounded-xl md:rounded-2xl shadow-sm cursor-pointer group">
                <Globe size={14} className="text-gray-400 group-hover:text-[#2D5A27] transition-colors md:w-4 md:h-4" />
                <span className="text-[9px] md:text-[10px] font-black text-gray-900 uppercase tracking-widest">UZ</span>
                <ChevronDown size={10} className="text-gray-400 md:w-3 md:h-3" />
              </div>

              {/* Notifications */}
              <button className="relative w-9 h-9 md:w-12 md:h-12 bg-white border border-gray-100 rounded-xl md:rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#2D5A27] hover:border-[#2D5A27]/20 transition-all shadow-sm">
                <Bell size={16} strokeWidth={2.5} className="md:w-[18px] md:h-[18px]" />
                <span className="absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-[#E67E22] rounded-full border-2 border-white shadow-lg animate-pulse" />
              </button>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="relative hidden lg:flex w-9 h-9 md:w-12 md:h-12 bg-white border border-gray-100 rounded-xl md:rounded-2xl items-center justify-center text-gray-400 hover:text-[#2D5A27] hover:border-[#2D5A27]/20 transition-all shadow-sm"
              >
                <ShoppingCart size={16} strokeWidth={2.5} className="md:w-[18px] md:h-[18px]" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 min-w-[16px] md:min-w-[18px] h-[16px] md:h-[18px] bg-[#E67E22] text-white text-[8px] md:text-[9px] font-black rounded-full flex items-center justify-center px-1 border-2 border-white shadow-lg">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Link>

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
                </div>
              ) : (
                <div className="flex items-center gap-1 md:gap-3 whitespace-nowrap">
                  <Link href="/login" className="hidden sm:block px-3 md:px-4 py-3 text-[9px] xl:text-[10px] font-black text-gray-400 hover:text-[#2D5A27] transition-all uppercase tracking-widest">Kirish</Link>
                  <Link href="/register" className="h-9 md:h-10 xl:h-12 flex items-center bg-[#2D5A27] text-white px-3 md:px-4 xl:px-6 rounded-xl md:rounded-2xl text-[8px] md:text-[9px] xl:text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#2D5A27]/20">Ro'yxat</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Global Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-gray-900/40 flex items-start justify-center pt-20 md:pt-32 px-4 transform-gpu">
          <div className="w-full max-w-3xl bg-white rounded-2xl md:rounded-[3rem] p-3 md:p-4 shadow-2xl border border-gray-100">
            <form 
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const q = formData.get('search') as string;
                if (q?.trim()) {
                  window.location.href = `/products?search=${encodeURIComponent(q.trim())}`;
                }
                setIsSearchOpen(false);
              }}
            >
              <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                autoFocus
                name="search"
                type="text" 
                placeholder="Mahsulot yoki dehqonlarni qidiring..."
                className="w-full h-14 md:h-20 bg-gray-50 border-none rounded-xl md:rounded-[2rem] pl-12 md:pl-16 pr-20 md:pr-24 text-base md:text-xl font-medium focus:ring-4 focus:ring-[#2D5A27]/5 outline-none"
              />
              <button 
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 px-3 md:px-5 h-10 md:h-12 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all"
              >
                <span className="hidden md:inline">Yopish</span>
                <X size={18} className="md:hidden" />
              </button>
            </form>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setIsSearchOpen(false)} />
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-[60] lg:hidden transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[70] lg:hidden flex flex-col shadow-2xl transition-transform transform translate-x-0"
          >
            {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2.5 group">
                  <div className="w-10 h-10 bg-[#2D5A27] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
                    <Wheat size={20} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-black tracking-tighter text-gray-900 leading-none">DEHQON</span>
                    <span className="text-[8px] font-black tracking-[0.3em] text-[#2D5A27] leading-none mt-0.5">YORDAMCHISI</span>
                  </div>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Menu Navigation */}
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                <div className="space-y-1">
                  {mobileNavLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link 
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group",
                          isActive 
                            ? "bg-[#2D5A27]/5 text-[#2D5A27]" 
                            : "text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                          isActive ? "bg-[#2D5A27] text-white shadow-lg shadow-[#2D5A27]/20" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                        )}>
                          {link.icon}
                        </div>
                        <span className={cn(
                          "font-bold text-sm tracking-wide",
                          isActive && "text-[#2D5A27]"
                        )}>
                          {link.name}
                        </span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-[#2D5A27]" />
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Quick Actions */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 ml-4">Tezkor havolalar</p>
                  <div className="space-y-1">
                    <Link 
                      href="/favorites"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center">
                        <Heart size={20} />
                      </div>
                      <span className="font-bold text-sm">Sevimlilar</span>
                    </Link>
                    <Link 
                      href="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-400 flex items-center justify-center relative">
                        <ShoppingCart size={20} />
                        {cartItemCount > 0 && (
                          <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-[#E67E22] text-white text-[8px] font-black rounded-full flex items-center justify-center px-0.5 border-2 border-white">
                            {cartItemCount}
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-sm">Savat</span>
                    </Link>
                  </div>
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="p-4 border-t border-gray-100 space-y-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                      <div className="w-10 h-10 bg-[#2D5A27] rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-gray-900 truncate">{user.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user.role}</p>
                      </div>
                    </div>
                    <Link 
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full h-12 bg-[#2D5A27] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#2D5A27]/20 active:scale-95 transition-all"
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Link 
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 h-12 flex items-center justify-center border-2 border-gray-100 text-gray-600 rounded-xl font-black text-xs uppercase tracking-widest hover:border-[#2D5A27]/20 transition-all"
                    >
                      Kirish
                    </Link>
                    <Link 
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 h-12 flex items-center justify-center bg-[#2D5A27] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#2D5A27]/20 active:scale-95 transition-all"
                    >
                      Ro'yxat
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </>
        )}
    </>
  );
}
