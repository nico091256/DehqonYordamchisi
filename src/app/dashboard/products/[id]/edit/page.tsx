'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/shared/api/api';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Loader2, 
  Package, 
  Tag, 
  MapPin, 
  DollarSign, 
  Layers 
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';

const productSchema = z.object({
  title: z.string().min(3, 'Nom kamida 3 ta belgidan iborat bo\'lishi kerak'),
  price: z.number().min(100, 'Narx 100 so\'mdan kam bo\'lmasligi kerak'),
  quantity: z.number().min(1, 'Kamida 1 kg/dona bo\'lishi kerak'),
  category: z.enum(['MEVA', 'SABZAVOT', 'POLIZ', 'DONLI', 'BOSHQA']),
  region: z.string().min(1, 'Viloyatni tanlang'),
  image: z.string().optional(),
});

type ProductForm = z.infer<typeof productSchema>;

export default function EditProductPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    api.get(`/api/products/${productId}`).then(({ data }) => {
      reset({
        title: data.title,
        price: data.price,
        quantity: data.quantity,
        category: data.category,
        region: data.region,
        image: data.image || '',
      });
      if (data.image) setPreviewImage(data.image);
    }).catch(() => {
      toast.error('Mahsulot topilmadi');
      router.push('/dashboard/products');
    }).finally(() => setFetching(false));
  }, [productId]);

  const onSubmit = async (data: ProductForm) => {
    setLoading(true);
    try {
      await api.put(`/api/products/${productId}`, data);
      toast.success('Mahsulot muvaffaqiyatli yangilandi!');
      router.push('/dashboard/products');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewImage(base64);
        setValue('image', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  if (fetching) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#2D5A27]" size={48} />
        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex items-center gap-4">
        <Link 
          href="/dashboard/products" 
          className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-gray-500 hover:text-[#2D5A27] hover:shadow-md transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900">Mahsulotni tahrirlash</h1>
          <p className="text-gray-500 font-medium">Ma'lumotlarni yangilang va saqlang</p>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">Mahsulot rasmi</label>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 group hover:border-[#2D5A27]/30 transition-colors">
              {previewImage ? (
                <>
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => { setPreviewImage(null); setValue('image', ''); }}
                    className="absolute top-4 right-4 p-2 bg-white rounded-xl shadow-lg text-red-500 hover:scale-110 transition-transform"
                  >
                    <X size={20} />
                  </button>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-8 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-400 mb-4 group-hover:text-[#2D5A27]">
                    <Upload size={32} />
                  </div>
                  <p className="text-sm font-bold text-gray-700">Rasm yuklash</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">PNG, JPG formatlar</p>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Mahsulot nomi</label>
              <div className="relative group">
                <div className="absolute left-0 inset-y-0 w-12 flex items-center justify-center pointer-events-none text-gray-400 group-focus-within:text-[#2D5A27]">
                  <Package size={20} />
                </div>
                <input 
                  {...register('title')}
                  className={cn("input-field pl-12 pr-4 bg-gray-50/50", errors.title && "border-red-200")}
                />
              </div>
              {errors.title && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Narxi (so'm/kg)</label>
                <div className="relative group">
                  <div className="absolute left-0 inset-y-0 w-12 flex items-center justify-center pointer-events-none text-gray-400 group-focus-within:text-[#2D5A27]">
                    <DollarSign size={20} />
                  </div>
                  <input {...register('price', { valueAsNumber: true })} type="number" className={cn("input-field pl-12 pr-4 bg-gray-50/50", errors.price && "border-red-200")} />
                </div>
                {errors.price && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.price.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Miqdor (kg)</label>
                <div className="relative group">
                  <div className="absolute left-0 inset-y-0 w-12 flex items-center justify-center pointer-events-none text-gray-400 group-focus-within:text-[#2D5A27]">
                    <Layers size={20} />
                  </div>
                  <input {...register('quantity', { valueAsNumber: true })} type="number" className={cn("input-field pl-12 pr-4 bg-gray-50/50", errors.quantity && "border-red-200")} />
                </div>
                {errors.quantity && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.quantity.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Kategoriya</label>
                <div className="relative group">
                  <div className="absolute left-0 inset-y-0 w-12 flex items-center justify-center pointer-events-none text-gray-400 group-focus-within:text-[#2D5A27]">
                    <Tag size={20} />
                  </div>
                  <select {...register('category')} className={cn("input-field pl-12 pr-4 bg-gray-50/50 appearance-none", errors.category && "border-red-200")}>
                    <option value="MEVA">Mevalar</option>
                    <option value="SABZAVOT">Sabzavotlar</option>
                    <option value="POLIZ">Poliz ekinlari</option>
                    <option value="DONLI">Don mahsulotlari</option>
                    <option value="BOSHQA">Boshqa</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Viloyat</label>
                <div className="relative group">
                  <div className="absolute left-0 inset-y-0 w-12 flex items-center justify-center pointer-events-none text-gray-400 group-focus-within:text-[#2D5A27]">
                    <MapPin size={20} />
                  </div>
                  <select {...register('region')} className={cn("input-field pl-12 pr-4 bg-gray-50/50 appearance-none", errors.region && "border-red-200")}>
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
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full h-16 flex items-center justify-center gap-3 text-lg mt-4 shadow-xl shadow-[#2D5A27]/20"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'O\'zgarishlarni saqlash'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
