'use client'

import { useState } from 'react'
import { X, Loader2, Save, Plus } from 'lucide-react'
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
  const [imagePreview, setImagePreview] = useState<string | null>(property.image_url)
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(property.gallery_urls || [])
  const [newGalleryFiles, setNewGalleryFiles] = useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewGalleryFiles(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeExistingGallery = (url: string) => {
    setGalleryPreviews(prev => prev.filter(u => u !== url))
  }

  const removeNewGallery = (src: string) => {
    setNewGalleryFiles(prev => prev.filter(s => s !== src))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    // Pass current gallery URLs that weren't removed
    formData.set('gallery_urls', galleryPreviews.join(','))
    
    const result = await updateProperty(property.id, formData)
    setLoading(false)
    if (result?.error) {
      setError(result.error)
    } else {
      onClose()
      window.location.reload()
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

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar scrollbar-hide">
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

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Gambar Utama</label>
                  <div className="relative group h-40 w-full bg-brand-offwhite dark:bg-brand-dark/50 rounded-2xl overflow-hidden border-2 border-dashed border-brand-gold/10">
                    {imagePreview && (
                      <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                    )}
                    <div className="absolute inset-0 bg-brand-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col gap-2">
                      <input 
                        type="file" 
                        name="image_file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                      <Save className="w-6 h-6 text-white" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">Klik Ganti Gambar</span>
                    </div>
                    {/* Hidden input to keep old URL if no new file is uploaded */}
                    <input type="hidden" name="image_url" value={property.image_url} />
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

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Galeri Properti</label>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {/* Existing Images */}
                    {galleryPreviews.map((url, idx) => (
                      <div key={`old-${idx}`} className="relative h-16 rounded-lg overflow-hidden group">
                        <img src={url} className="w-full h-full object-cover" alt="Gallery" />
                        <button 
                          type="button"
                          onClick={() => removeExistingGallery(url)}
                          className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                    {/* New Previews */}
                    {newGalleryFiles.map((src, idx) => (
                      <div key={`new-${idx}`} className="relative h-16 rounded-lg overflow-hidden border border-brand-gold/40 group">
                        <img src={src} className="w-full h-full object-cover" alt="New Gallery" />
                        <button 
                          type="button"
                          onClick={() => removeNewGallery(src)}
                          className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                    {/* Add Button */}
                    <div className="relative h-16 border-2 border-dashed border-brand-gold/20 rounded-lg flex items-center justify-center hover:bg-brand-gold/5 transition-all">
                      <input 
                        type="file" 
                        name="gallery_files" 
                        multiple 
                        accept="image/*"
                        onChange={handleGalleryChange}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                      <Plus className="w-4 h-4 text-brand-gold/40" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">L. Tanah</label>
                    <input name="luas_tanah" type="number" defaultValue={property.luas_tanah} className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
                  </div>
                  {/* ... other fields remains the same ... */}
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

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">URL Video (Opsional)</label>
                    <input name="video_url" defaultValue={property.video_url} className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white" />
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
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
