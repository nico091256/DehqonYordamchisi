'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings, LayoutDashboard, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/entities/user/model/authStore';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pr-4 bg-white border border-gray-100 rounded-full hover:shadow-md transition-all active:scale-95"
      >
        <div className="w-9 h-9 bg-[#2D5A27] rounded-full flex items-center justify-center text-white font-bold text-sm">
          {user.name.charAt(0)}
        </div>
        <div className="text-left hidden lg:block">
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-tighter leading-none mb-1">
            {user.role}
          </p>
          <p className="text-sm font-bold text-gray-700 leading-none">{user.name.split(' ')[0]}</p>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl shadow-gray-200 border border-gray-100 overflow-hidden py-2"
          >
            <div className="px-6 py-4 border-b border-gray-50 mb-2">
              <p className="text-sm font-black text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-400 font-medium">{user.phone || 'Telefon raqam yo\'q'}</p>
            </div>

            <MenuLink href="/dashboard" icon={<LayoutDashboard size={18} />} label="Boshqaruv paneli" />
            <MenuLink href="/dashboard" icon={<User size={18} />} label="Profil sozlamalari" />
            <MenuLink href="/dashboard/settings" icon={<Settings size={18} />} label="Xavfsizlik" />
            
            <div className="mt-2 pt-2 border-t border-gray-50">
              <button 
                onClick={() => {
                  logout();
                  setIsOpen(false);
                  router.push('/');
                }}
                className="w-full flex items-center gap-3 px-6 py-3 text-red-500 hover:bg-red-50 transition-colors font-bold text-sm"
              >
                <LogOut size={18} /> Chiqish
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#2D5A27] transition-all font-bold text-sm"
    >
      {icon} {label}
    </Link>
  );
}
