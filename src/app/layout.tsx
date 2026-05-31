import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/QueryProvider";
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "DehqonYordamchisi | Zamonaviy Qishloq Xo'jaligi Bozori",
  description: "O'zbekiston dehqonlari va xaridorlari uchun professional savdo platformasi",
};

import Navbar from "@/widgets/Navbar/ui/Navbar";
import BottomNav from "@/widgets/Navbar/ui/BottomNav";
import AuthProvider from "@/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-[#F9FBFA] text-[#1A1A1A] pb-16 lg:pb-0`}>
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <BottomNav />
            <Toaster position="top-center" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
