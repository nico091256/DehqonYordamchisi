'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/entities/user/model/authStore';
import api from '@/shared/api/api';
import toast from 'react-hot-toast';
import { 
  User, 
  MapPin, 
  Phone, 
  Shield, 
  Camera, 
  Loader2, 
  Save,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    region: user?.region || '',
    image: user?.image || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        region: user.region,
        image: user.image || ''
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/api/users/profile', formData);
      setUser(data);
      toast.success('Profil muvaffaqiyatli yangilandi');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    try {
      await api.patch('/api/users/change-password', passwordData);
      toast.success('Parol muvaffaqiyatli o\'zgartirildi');
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Xatolik yuz berdi');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <header>
        <h1 className="text-3xl font-black text-gray-900 mb-1">Sozlamalar</h1>
        <p className="text-gray-500 font-medium">Shaxsiy ma'lumotlar va xavfsizlik</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black mb-8 flex items-center gap-2">
              <User size={24} className="text-[#2D5A27]" /> Shaxsiy ma'lumotlar
            </h2>
            
            <form onSubmit={handleProfileSubmit} className="space-y-8">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-[2rem] bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center">
                    {formData.image ? (
                      <img src={formData.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={48} className="text-gray-300" />
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#2D5A27] text-white rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                    <Camera size={20} />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
                <div>
                  <h3 className="font-black text-gray-900 mb-1">Profil rasmi</h3>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed">
                    Yuzingiz aniq ko'ringan rasm xaridorlarda <br /> ko'proq ishonch uyg'otadi.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">F.I.SH</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field bg-gray-50/50" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Viloyat</label>
                  <select 
                    value={formData.region}
                    onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                    className="input-field bg-gray-50/50 appearance-none"
                  >
                    <option value="Toshkent">Toshkent</option>
                    <option value="Samarqand">Samarqand</option>
                    <option value="Buxoro">Buxoro</option>
                    <option value="Andijon">Andijon</option>
                    <option value="Farg'ona">Farg'ona</option>
                    <option value="Namangan">Namangan</option>
                    <option value="Qashqadaryo">Qashqadaryo</option>
                    <option value="Surxondaryo">Surxondaryo</option>
                    <option value="Jizzax">Jizzax</option>
                    <option value="Sirdaryo">Sirdaryo</option>
                    <option value="Xorazm">Xorazm</option>
                    <option value="Navoiy">Navoiy</option>
                    <option value="Qoraqalpog'iston">Qoraqalpog'iston</option>
                  </select>
                </div>
              </div>

              <button disabled={loading} className="btn-primary w-full h-16 flex items-center justify-center gap-3 shadow-xl shadow-[#2D5A27]/20">
                {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Saqlash</>}
              </button>
            </form>
          </section>

          <section className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-black mb-8 flex items-center gap-2">
              <Shield size={24} className="text-[#E67E22]" /> Xavfsizlik
            </h2>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Joriy parol</label>
                <div className="relative">
                  <input 
                    type={showCurrentPass ? "text" : "password"} 
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="input-field bg-gray-50/50 pr-12" 
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showCurrentPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Yangi parol</label>
                <div className="relative">
                  <input 
                    type={showNewPass ? "text" : "password"} 
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="input-field bg-gray-50/50 pr-12" 
                    placeholder="Kamida 8 ta belgi"
                  />
                  <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button disabled={passwordLoading} className="h-16 px-10 bg-gray-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-black transition-all w-full md:w-auto">
                {passwordLoading ? <Loader2 className="animate-spin" /> : <><Lock size={20} /> Parolni yangilash</>}
              </button>
            </form>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="p-8 rounded-[2.5rem] bg-[#2D5A27] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_70%)] rounded-full -mr-16 -mt-16" />
            <div className="relative z-10">
              <Phone className="mb-6 opacity-50" size={32} />
              <h4 className="text-xl font-black mb-4">Hisob holati</h4>
              <p className="text-white/70 text-sm font-medium leading-relaxed mb-6">
                Sizning hisobingiz tasdiqlangan. Barcha funksiyalardan to'liq foydalanishingiz mumkin.
              </p>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 bg-white/10 rounded-xl w-fit">
                <Shield size={14} className="text-[#F1C40F]" /> Faol sotuvchi
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm">
            <h4 className="text-sm font-black mb-4">Yordam kerakmi?</h4>
            <p className="text-gray-500 text-xs font-medium leading-relaxed mb-6">
              Agar hisobingiz bilan bog'liq muammo bo'lsa, qo'llab-quvvatlash xizmati bilan bog'laning.
            </p>
            <button className="text-[#2D5A27] font-black text-xs uppercase tracking-widest hover:underline">
              Aloqa markazi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
