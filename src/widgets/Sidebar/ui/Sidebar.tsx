'use client';

import { cn } from '@/shared/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut,
  ChevronRight,
  X,
  Users,
  Info,
  ChevronLeft,
  Wheat
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/entities/user/model/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const farmerMenu = [
  { href: '/dashboard', label: 'Boshqaruv', icon: LayoutDashboard },
  { href: '/dashboard/products', label: 'Mahsulotlarim', icon: Package },
  { href: '/dashboard/orders', label: 'Buyurtmalar', icon: ShoppingBag },
  { href: '/dashboard/settings', label: 'Sozlamalar', icon: Settings },
];

const buyerMenu = [
  { href: '/dashboard', label: 'Boshqaruv', icon: LayoutDashboard },
  { href: '/dashboard/orders', label: 'Buyurtmalarim', icon: ShoppingBag },
  { href: '/dashboard/favorites', label: 'Sevimlilar', icon: Heart },
  { href: '/dashboard/settings', label: 'Sozlamalar', icon: Settings },
];


interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  mode?: 'sidebar' | 'mobile-only';
}

export default function DashboardSidebar({ isOpen, onClose, mode = 'sidebar' }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = user?.role === 'FARMER' ? farmerMenu : buyerMenu;

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60] lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "bg-white border-r border-gray-100 flex flex-col transition-all duration-300 z-[70]",
        mode === 'sidebar' 
          ? `hidden lg:flex flex-shrink-0 h-screen ${isCollapsed ? 'w-20' : 'w-72'}`
          : "h-screen fixed top-0 left-0 w-72 lg:hidden shadow-2xl",
        mode === 'mobile-only' && (isOpen ? "translate-x-0" : "-translate-x-full")
      )}>
        {/* Header / Logo */}
        <div className={cn(
          "flex items-center h-20 px-6 border-b border-gray-50",
          isCollapsed ? "justify-center px-0" : "justify-between"
        )}>
          {!isCollapsed ? (
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-[#2D5A27] rounded-lg flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform">
                <Wheat size={18} strokeWidth={2.5} />
              </div>
              <span className="text-sm font-black uppercase tracking-tighter text-[#2D5A27]">
                Dehqon<span className="text-[#E67E22]">OS</span>
              </span>
            </Link>
          ) : (
            <Link href="/" className="w-10 h-10 bg-[#2D5A27] rounded-xl flex items-center justify-center text-white shadow-md hover:rotate-6 transition-transform">
              <Wheat size={20} strokeWidth={2.5} />
            </Link>
          )}

          {/* Mobile Close Button */}
          {mode === 'mobile-only' && (
            <button onClick={onClose} className="p-2 lg:hidden hover:bg-gray-100 rounded-lg text-gray-500">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 no-scrollbar">
          {!isCollapsed && (
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 ml-2">
              Menu
            </div>
          )}
          
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link 
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (mode === 'mobile-only' && onClose) onClose();
                  }}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    "group flex items-center rounded-xl transition-all relative overflow-hidden",
                    isCollapsed ? "justify-center h-12 w-12 mx-auto" : "px-4 py-3 gap-3",
                    isActive 
                      ? "bg-[#2D5A27]/5 text-[#2D5A27]" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active-indicator"
                      className="absolute left-0 top-0 w-1 h-full bg-[#2D5A27] rounded-r-full"
                    />
                  )}
                  <Icon size={18} className={cn("transition-transform group-hover:scale-110", isActive && "text-[#2D5A27]")} />
                  {!isCollapsed && (
                    <span className={cn("font-bold text-[12px] uppercase tracking-wider", isActive && "text-[#2D5A27]")}>
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={() => {
              logout();
              if (onClose) onClose();
            }}
            title={isCollapsed ? "Chiqish" : undefined}
            className={cn(
              "flex items-center rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-[11px] uppercase tracking-widest group",
              isCollapsed ? "justify-center h-12 w-12 mx-auto" : "w-full px-4 py-3 gap-3"
            )}
          >
            <LogOut size={18} className="group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span>Tizimdan chiqish</span>}
          </button>
        </div>

        {/* Collapse Toggle (Desktop Only) */}
        {mode === 'sidebar' && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3.5 top-24 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm z-10 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </aside>
    </>
  );
}
