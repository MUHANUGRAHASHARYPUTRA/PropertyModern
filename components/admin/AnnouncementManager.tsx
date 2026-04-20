'use client';

import { useState } from 'react';
import { Megaphone, Save, Loader2, Sparkles } from 'lucide-react';
import { upsertAnnouncement } from '@/app/auth/actions';

interface AnnouncementManagerProps {
  initialData: any;
}

export default function AnnouncementManager({ initialData }: AnnouncementManagerProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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
    <div className="bg-white dark:bg-brand-dark-surface p-8 rounded-[2.5rem] border border-brand-charcoal/5 dark:border-brand-ivory/5 shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
          <Megaphone className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-serif dark:text-white">Kelola Promo & <span className="text-brand-gold italic">Pengumuman</span></h3>
          <p className="text-xs text-brand-charcoal/40 dark:text-brand-ivory/40">Tampilkan info promo spesial di bagian atas beranda utama.</p>
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
            <label htmlFor="is_active" className="text-xs font-bold text-brand-charcoal/60 dark:text-brand-ivory/60">Aktifkan Pengumuman</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Label Badge</label>
              <input name="badge" defaultValue={initialData?.badge || 'PROMO'} placeholder="PROMO / INFO / TERBATAS" className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Judul Singkat</label>
              <input name="title" defaultValue={initialData?.title} required placeholder="Promo Ramadhan 2024" className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
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
            className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-brand-gold dark:hover:bg-brand-gold hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Simpan & Publikasikan
        </button>
      </form>
    </div>
  );
}
