'use client';

import { useAuthStore } from '@/entities/user/model/authStore';
import { CloudSun, Search, Bell, Menu, Sparkles } from 'lucide-react';
import UserMenu from '@/widgets/Navbar/ui/UserMenu';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface DashboardTopbarProps {
  onMenuClick: () => void;
}

export default function DashboardTopbar({ onMenuClick }: DashboardTopbarProps) {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-gray-100/50 flex items-center justify-between px-4 lg:px-8 h-20 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors lg:hidden"
        >
          <Menu size={20} />
        </button>
        
        {/* Dashboard Title / Breadcrumbs */}
        <div className="hidden md:flex flex-col">
          <h1 className="text-lg font-black text-gray-900 tracking-tight leading-none">
            {user?.role === 'FARMER' ? 'Dehqon Boshqaruvi' : 'Xaridor Paneli'}
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
            Xush kelibsiz, {user?.name.split(' ')[0]}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* AI Assistant Quick Shortcut */}
        <button className="hidden sm:flex items-center gap-2 px-4 h-11 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl text-purple-600 hover:bg-purple-500/20 transition-colors group">
          <Sparkles size={16} className="group-hover:animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">Sun'iy Intelekt</span>
        </button>

        {/* Global Search */}
        <div className="hidden lg:flex relative w-64 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D5A27] transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Qidirish..."
            className="w-full h-11 bg-gray-50 border-none rounded-2xl pl-11 pr-4 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-[#2D5A27]/5 outline-none transition-all"
          />
        </div>

        {/* Weather Widget */}
        <div className="hidden xl:flex items-center gap-3 px-4 h-11 bg-gray-50 rounded-2xl">
          <div className="w-6 h-6 bg-blue-100 text-blue-500 rounded-lg flex items-center justify-center">
            <CloudSun size={14} />
          </div>
          <div className="text-left">
            <p className="text-[11px] font-black text-gray-900 leading-none">+24°C</p>
          </div>
        </div>

        <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />

        {/* Notifications */}
        <button className="relative w-11 h-11 bg-gray-50 hover:bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 transition-colors">
          <Bell size={18} strokeWidth={2.5} />
          <span className="absolute top-2.5 right-3 w-2 h-2 bg-[#E67E22] rounded-full border-2 border-white" />
        </button>

        {/* User Profile */}
        <div className="ml-1">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
