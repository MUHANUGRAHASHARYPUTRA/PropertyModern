'use client'

import { useState } from 'react'
import { X, Loader2, Save } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { updateProperty } from '@/app/auth/actions'

interface EditPropertyModalProps {
  property: any
  isOpen: boolean
  onClose: () => void
}

export default function EditPropertyModal({ property, isOpen, onClose }: EditPropertyModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await updateProperty(property.id, formData)
    setLoading(false)
    if (result?.error) {
      setError(result.error)
    } else {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-charcoal/40 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-brand-dark w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-brand-charcoal/5 dark:border-brand-ivory/5 flex justify-between items-center bg-brand-gold/5">
              <div>
                <h3 className="text-xl font-serif text-brand-charcoal dark:text-brand-ivory">Edit <span className="italic text-brand-gold">Properti</span></h3>
                <p className="text-[10px] text-brand-charcoal/40 dark:text-brand-ivory/40 uppercase tracking-widest font-bold mt-1">ID: {property.id}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-brand-charcoal/5 dark:hover:bg-brand-ivory/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-brand-charcoal/40" />
              </button>
            </div>

            <form action={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Nama Properti</label>
                  <input name="name" defaultValue={property.name} required className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Harga</label>
                  <input name="price" defaultValue={property.price} required className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Kategori</label>
                  <select name="category" defaultValue={property.category} className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white">
                    <option value="subsidi">Subsidi</option>
                    <option value="komersil">Komersil</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Status</label>
                  <select name="status" defaultValue={property.status} className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white">
                    <option value="AVAILABLE">Tersedia</option>
                    <option value="SOLD OUT">Terjual (Sold Out)</option>
                    <option value="BOOKED">Dipesan (Booked)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Deskripsi</label>
                <textarea name="description" defaultValue={property.description} rows={3} className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white resize-none" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">L. Tanah</label>
                  <input name="luas_tanah" type="number" defaultValue={property.luas_tanah} className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">L. Bangunan</label>
                  <input name="luas_bangunan" type="number" defaultValue={property.luas_bangunan} className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Kamar Tidur</label>
                  <input name="kamar_tidur" type="number" defaultValue={property.kamar_tidur} className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">K. Mandi</label>
                  <input name="kamar_mandi" type="number" defaultValue={property.kamar_mandi} className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">URL Gambar</label>
                  <input name="image_url" defaultValue={property.image_url} className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">URL Video</label>
                  <input name="video_url" defaultValue={property.video_url} className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">URL Galeri Foto (Pisahkan dengan koma)</label>
                <textarea name="gallery_urls" defaultValue={property.gallery_urls?.join(', ')} rows={2} placeholder="/images/gallery1.jpg, /images/gallery2.jpg, ..." className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white resize-none"></textarea>
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 border border-brand-charcoal/10 dark:border-brand-ivory/10 text-brand-charcoal/60 dark:text-brand-ivory/60 text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-brand-charcoal/5 transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-[2] py-4 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-brand-charcoal transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
