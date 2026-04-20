'use client';

import { useState } from 'react';
import { X, Plus, Loader2 } from 'lucide-react';
import { addProperty } from '@/app/auth/actions';

export default function AddPropertyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviews: string[] = [];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await addProperty(formData);
    
    if (result.success) {
      setIsOpen(false);
      window.location.reload(); // Refresh to see new property
    } else {
      setError(result.error || 'Gagal menambahkan properti');
    }
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-brand-charcoal transition-all shadow-lg shadow-brand-gold/20"
      >
        <Plus className="w-4 h-4" />
        Tambah Properti
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-brand-charcoal/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-brand-dark-surface rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-brand-charcoal/5 dark:border-brand-ivory/5 flex justify-between items-center bg-brand-offwhite/50 dark:bg-brand-dark/20">
              <h3 className="text-xl font-serif dark:text-white">Tambah Properti <span className="text-brand-gold italic">Baru</span></h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-brand-charcoal/5 rounded-full transition-colors">
                <X className="w-5 h-5 text-brand-charcoal/40" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto space-y-6 scrollbar-hide">
              {error && (
                <div className="p-4 bg-red-50 text-red-500 rounded-xl text-xs border border-red-100 italic">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Nama Properti</label>
                  <input name="name" required placeholder="Cluster Alizah Signature" className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Harga (IDR)</label>
                  <input name="price" required placeholder="Rp 500.000.000" className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
                {/* ... other fields remains the same ... */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Kategori</label>
                  <select name="category" required className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white">
                    <option value="subsidi">Subsidi</option>
                    <option value="komersil">Komersil</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Status</label>
                  <select name="status" className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white">
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="SOLD OUT">SOLD OUT</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Luas Bangunan (m²)</label>
                  <input name="luas_bangunan" type="number" required placeholder="36" className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Luas Tanah (m²)</label>
                  <input name="luas_tanah" type="number" required placeholder="60" className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Kamar Tidur</label>
                  <input name="kamar_tidur" type="number" required placeholder="2" className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Kamar Mandi</label>
                  <input name="kamar_mandi" type="number" required placeholder="1" className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Unggah Gambar Utama</label>
                  <div className="relative group">
                    <input 
                       type="file" 
                       name="image_file" 
                       accept="image/*"
                       onChange={handleImageChange}
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div className="w-full h-32 border-2 border-dashed border-brand-gold/20 rounded-2xl flex flex-center flex-col items-center justify-center bg-brand-offwhite/50 dark:bg-brand-dark/50 group-hover:bg-brand-gold/5 transition-all">
                      {imagePreview ? (
                        <img src={imagePreview} className="h-full w-full object-cover rounded-2xl" alt="Preview" />
                      ) : (
                        <>
                          <Plus className="w-6 h-6 text-brand-gold/40 mb-2" />
                          <span className="text-[10px] font-bold text-brand-charcoal/40 dark:text-brand-ivory/40 uppercase tracking-widest">Pilih Gambar Utama</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">URL Video (YouTube/MP4)</label>
                        <input name="video_url" placeholder="https://youtube.com/watch?v=..." className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Unggah Galeri Foto</label>
                        <input 
                            type="file" 
                            name="gallery_files" 
                            multiple 
                            accept="image/*"
                            onChange={handleGalleryChange}
                            className="w-full text-xs text-brand-charcoal/40 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-brand-gold file:text-white hover:file:bg-brand-charcoal cursor-pointer" 
                        />
                    </div>
                </div>
                
                {galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                        {galleryPreviews.map((src, idx) => (
                            <div key={idx} className="relative h-16 rounded-lg overflow-hidden border border-brand-gold/20">
                                <img src={src} className="w-full h-full object-cover" alt="Gallery Preview" />
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Deskripsi Singkat</label>
                    <textarea name="description" rows={3} placeholder="Hunian minimalis di lokasi strategis..." className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white resize-none"></textarea>
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 py-4 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-brand-charcoal transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Properti'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-4 border border-brand-charcoal/10 dark:border-brand-ivory/10 text-brand-charcoal/40 dark:text-brand-ivory/40 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-brand-charcoal hover:text-white transition-all font-bold"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
