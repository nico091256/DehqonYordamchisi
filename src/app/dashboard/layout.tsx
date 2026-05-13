'use client';

import DashboardSidebar from "@/widgets/Sidebar/ui/Sidebar";
import DashboardTopbar from "@/widgets/DashboardTopbar/ui/DashboardTopbar";
import { useAuthStore } from "@/entities/user/model/authStore";
import { useState } from "react";
import DashboardTemplate from "./template";
import { AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-[#F9FBFA] overflow-hidden">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardTopbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8">
          <div className="container mx-auto max-w-7xl">
            <AnimatePresence mode="wait">
              <DashboardTemplate key="dashboard-template">
                {children}
              </DashboardTemplate>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

