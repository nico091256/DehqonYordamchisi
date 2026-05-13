'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, MapPin, Tag, X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const categories = [
  { label: 'Mevalar', value: 'MEVA' },
  { label: 'Sabzavotlar', value: 'SABZAVOT' },
  { label: 'Poliz', value: 'POLIZ' },
  { label: 'Donli', value: 'DONLI' },
  { label: 'Boshqalar', value: 'BOSHQA' },
];
const regions = [
  'Toshkent', 'Samarqand', 'Buxoro', 'Andijon', 'Farg\'ona', 
  'Namangan', 'Qashqadaryo', 'Surxondaryo', 'Jizzax', 
  'Sirdaryo', 'Xorazm', 'Navoiy', 'Qoraqalpog\'iston'
];

export default function ProductFilters({ layout = 'horizontal' }: { layout?: 'horizontal' | 'vertical' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || '');

  // Update filters when URL changes
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || '');
    setSelectedRegion(searchParams.get('region') || '');
  }, [searchParams]);

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchTerm });
  };

  if (layout === 'vertical') {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
            <Search size={14} /> Qidiruv
          </h3>
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Masalan: Olma..."
              className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#2D5A27]/20 outline-none transition-all"
            />
          </form>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
            <Tag size={14} /> Kategoriyalar
          </h3>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => updateFilters({ category: '' })}
              className={cn(
                "text-left px-4 py-3 rounded-xl text-sm font-bold transition-all",
                !selectedCategory ? "bg-[#2D5A27] text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"
              )}
            >
              Barcha turlar
            </button>
            {categories.map((c) => (
              <button 
                key={c.value}
                onClick={() => updateFilters({ category: c.value })}
                className={cn(
                  "text-left px-4 py-3 rounded-xl text-sm font-bold transition-all",
                  selectedCategory === c.value ? "bg-[#2D5A27] text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
            <MapPin size={14} /> Hududlar
          </h3>
          <select 
            value={selectedRegion}
            onChange={(e) => updateFilters({ region: e.target.value })}
            className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-[#2D5A27]/20 transition-all cursor-pointer"
          >
            <option value="">Barcha hududlar</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>
    );
  }

  const hasFilters = searchParams.get('search') || searchParams.get('category') || searchParams.get('region');
  const activeCategory = categories.find(c => c.value === searchParams.get('category'))?.label;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <form onSubmit={handleSearch} className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Qidiruv (masalan: Olma, Pomidor...)"
            className="input-field pl-12 h-14 bg-white border-gray-100 shadow-sm focus:border-[#2D5A27] transition-all"
          />
        </form>
        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none min-w-[160px]">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <select 
              value={selectedRegion}
              onChange={(e) => updateFilters({ region: e.target.value })}
              className="w-full h-14 pl-12 pr-4 bg-white border border-gray-100 rounded-xl font-bold appearance-none shadow-sm focus:border-[#2D5A27] outline-none transition-all cursor-pointer"
            >
              <option value="">Barcha hududlar</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="relative flex-1 lg:flex-none min-w-[160px]">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <select 
              value={selectedCategory}
              onChange={(e) => updateFilters({ category: e.target.value })}
              className="w-full h-14 pl-12 pr-4 bg-white border border-gray-100 rounded-xl font-bold appearance-none shadow-sm focus:border-[#2D5A27] outline-none transition-all cursor-pointer"
            >
              <option value="">Barcha turlar</option>
              {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>
      </div>
      {hasFilters && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">Filtrlar:</span>
          {searchParams.get('search') && (
            <FilterBadge label={`Qidiruv: ${searchParams.get('search')}`} onClear={() => updateFilters({ search: '' })} />
          )}
          {searchParams.get('category') && activeCategory && (
            <FilterBadge label={activeCategory} onClear={() => updateFilters({ category: '' })} />
          )}
          {searchParams.get('region') && (
            <FilterBadge label={searchParams.get('region')!} onClear={() => updateFilters({ region: '' })} />
          )}
          <button onClick={() => router.push('/products')} className="text-xs font-bold text-red-500 hover:underline ml-2">Tozalash</button>
        </div>
      )}
    </div>
  );
}

function FilterBadge({ label, onClear }: { label: string, onClear: () => void }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-[#2D5A27]/10 text-[#2D5A27] rounded-full text-xs font-bold">
      {label}
      <button onClick={onClear} className="hover:text-red-500">
        <X size={14} />
      </button>
    </div>
  );
}
