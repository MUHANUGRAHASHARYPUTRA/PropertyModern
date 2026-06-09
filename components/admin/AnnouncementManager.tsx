'use client';

import { useState } from 'react';
import { Megaphone, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import { upsertAnnouncement } from '@/app/auth/actions';

interface AnnouncementManagerProps {
  initialData: any;
}

export default function AnnouncementManager({ initialData }: AnnouncementManagerProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.image_url || null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await upsertAnnouncement(formData);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Pengumuman berhasil diperbarui!' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Gagal memperbarui pengumuman' });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white  p-8 rounded-[2.5rem] border border-brand-charcoal/5  shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
          <Megaphone className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-serif ">Kelola Promo & <span className="text-brand-gold italic">Pengumuman</span></h3>
          <p className="text-xs text-brand-charcoal/40 ">Tampilkan info promo spesial di bagian atas beranda utama.</p>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl text-[10px] uppercase font-bold tracking-widest text-center border ${
          message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
            <input 
              type="checkbox" 
              name="is_active" 
              id="is_active" 
              defaultChecked={initialData?.is_active}
              className="w-4 h-4 accent-brand-gold"
            />
            <label htmlFor="is_active" className="text-xs font-bold text-brand-charcoal/60 ">Aktifkan Pengumuman</label>
        </div>

        <div className="space-y-4 mb-6">
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Gambar / Banner Promo</label>
            
            <div className="relative w-full aspect-video md:aspect-[3/1] bg-brand-offwhite rounded-2xl border-2 border-dashed border-brand-charcoal/10 flex flex-col items-center justify-center overflow-hidden hover:border-brand-gold/50 transition-colors">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-brand-charcoal/40 p-6 text-center">
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-xs">Klik untuk mengunggah gambar promosi (Opsional)</span>
                </div>
              )}
              <input 
                type="file" 
                name="image_file" 
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setPreviewImage(URL.createObjectURL(file));
                }}
              />
              <input type="hidden" name="existing_image_url" value={initialData?.image_url || ''} />
            </div>
            {previewImage && (
               <button 
                type="button" 
                onClick={() => setPreviewImage(null)}
                className="text-xs text-red-500 hover:underline"
               >
                 Hapus Gambar
               </button>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Label Badge</label>
              <input name="badge" defaultValue={initialData?.badge || 'PROMO'} placeholder="PROMO / INFO / TERBATAS" className="w-full bg-brand-offwhite  border border-brand-charcoal/10  rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none " />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Judul Singkat</label>
              <input name="title" defaultValue={initialData?.title} required placeholder="Promo Ramadhan 2024" className="w-full bg-brand-offwhite  border border-brand-charcoal/10  rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none " />
            </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Isi Pengumuman</label>
          <textarea 
            name="content" 
            defaultValue={initialData?.content}
            required 
            rows={2} 
            placeholder="Dapatkan diskon DP hngga 0% dan gratis biaya akad untuk semua unit cluster..." 
            className="w-full bg-brand-offwhite  border border-brand-charcoal/10  rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none "
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-brand-charcoal  text-brand-ivory  text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-brand-gold  hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Simpan & Publikasikan
        </button>
      </form>
    </div>
  );
}
