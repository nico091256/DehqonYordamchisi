'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingCart, Heart, User, Wheat } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/entities/cart/model/cartStore';
import { useAuthStore } from '@/entities/user/model/authStore';

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const cartItemCount = useCartStore((state) => state.getItemCount)();

  // Hide bottom nav on dashboard pages or desktop
  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  const navItems = [
    { name: 'Asosiy', href: '/', icon: <Home size={22} /> },
    { name: 'Bozor', href: '/products', icon: <Wheat size={22} /> },
    { 
      name: 'Savat', 
      href: '/cart', 
      icon: (
        <div className="relative">
          <ShoppingCart size={22} />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] bg-[#E67E22] text-white text-[9px] font-black rounded-full flex items-center justify-center px-0.5 border border-white shadow-sm">
              {cartItemCount > 9 ? '9+' : cartItemCount}
            </span>
          )}
        </div>
      )
    },
    { name: 'Sevimlilar', href: '/favorites', icon: <Heart size={22} /> },
    { 
      name: 'Profil', 
      href: user ? '/dashboard' : '/login', 
      icon: user ? (
        <div className="w-6 h-6 bg-[#2D5A27] rounded-full flex items-center justify-center text-white text-[10px] font-bold border border-white/50">
          {user.name.charAt(0)}
        </div>
      ) : (
        <User size={22} />
      )
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pb-safe transform-gpu">
      <div className="absolute inset-0 bg-white/90 backdrop-blur-md border-t border-gray-200/50 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]" />
      <nav className="relative flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 py-1 transition-all duration-300",
                isActive ? "text-[#2D5A27] scale-110" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {/* Active Indicator Bubble */}
              {isActive && (
                <span className="absolute inset-0 bg-[#2D5A27]/10 rounded-2xl -z-10 animate-in zoom-in duration-300" />
              )}
              
              <div className={cn(
                "mb-1 transition-transform duration-300",
                isActive ? "-translate-y-0.5" : ""
              )}>
                {item.icon}
              </div>
              <span className={cn(
                "text-[9px] font-bold tracking-wide transition-all duration-300",
                isActive ? "opacity-100" : "opacity-0 h-0"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
