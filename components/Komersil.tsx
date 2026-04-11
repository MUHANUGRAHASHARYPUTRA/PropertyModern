'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize, Bed, Bath, ArrowRight, Video, X, ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useCompareStore } from '@/lib/store';

const komersilData = [
  {
    id: 'k1',
    name: 'Komersil Blok D11',
    price: 'Rp 380.000.000 (Free Biaya Akad KPR)',
    type: 'komersil' as const,
    luasTanah: 84,
    luasBangunan: 51,
    kamarTidur: 2,
    kamarMandi: 1,
    badge: 'Commercial',
    image: '/images/komersil1.jpg',
    video: '/videos/komersil1.MOV', // Pastikan file ada di public/images/
    gallery: [
      '/images/komersil1.jpg',
      '/images/gallery1.jpg',
      '/images/gallery2.jpg',
      '/images/gallery3.jpg',
      '/images/gallery4.jpg',
      '/images/gallery5.jpg',
      '/images/gallery6.jpg',
    ],
    deskripsi: 'Hunian eksklusif dengan desain modern, dilengkapi dengan system keamanan lengkap dan sirkulasi udara optimal.',
    fasilitas: ['Pintu Import Baja', 'Carport Mobil', 'Taman Depan', 'Dapur Bersih']
  },
  {
    id: 'k2',
    name: 'Komersil Blok D12',
    price: 'Rp 380.000.000 (Free Biaya Akad KPR)',
    type: 'komersil' as const,
    luasTanah: 84,
    luasBangunan: 51,
    kamarTidur: 2,
    kamarMandi: 1,
    badge: 'Commercial',
    image: '/images/komersil2.jpg',
    video: '/videos/komersil2.MOV', // Pastikan file ada di public/images/
    gallery: [
      '/images/komersil2.jpg',
      '/images/gallerykomersil1.png',
      '/images/gallerykomersil2.jpg',
      '/images/gallerykomersil3.png',
      '/images/gallerykomersil4.png',
      
    ],
    deskripsi: 'Nikmati kemewahan hidup di rumah bergaya modern. Dirancang khusus dengan sirkulasi udara yang cerdas agar rumah selalu sejuk.',
    fasilitas: ['Pintu Import Baja', 'Carport Mobil', 'Taman Depan', 'Dapur Bersih']
  }
];

export default function Komersil() {
  const { toggleProperty, selectedProperties } = useCompareStore();
  const [selectedDetail, setSelectedDetail] = useState<typeof komersilData[0] | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openDetail = (item: typeof komersilData[0]) => {
    setSelectedDetail(item);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedDetail) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedDetail.gallery.length);
    }
  };

  const prevImage = () => {
    if (selectedDetail) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedDetail.gallery.length) % selectedDetail.gallery.length);
    }
  };

  return (
    <section id="komersil" className="py-32 bg-brand-ivory dark:bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-brand-ivory mb-4">
            properti <span className="text-brand-gold italic">komersil</span>
          </h2>
          <p className="text-brand-charcoal/70 dark:text-brand-ivory/70 max-w-xl">
            Koleksi hunian premium dengan desain arsitektur modern, material berkualitas tinggi, dan privasi maksimal.
          </p>
        </div>
        <div className="flex items-center gap-2 text-brand-gold text-sm font-medium animate-pulse bg-brand-gold/10 px-4 py-2 rounded-full shrink-0">
          <MoveHorizontal className="w-4 h-4" />
          <span>Geser lihat lainnya</span>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="w-full overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12">
        <div className="flex gap-8 w-max px-6 md:px-12">
          {komersilData.map((item, index) => {
            const isSelected = selectedProperties.some(p => p.id === item.id);
            const isSoldOut = item.badge === 'SOLD OUT';

            return (
              <motion.div 
                key={item.id}
                className="w-[85vw] md:w-[480px] shrink-0 snap-center group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl mb-6">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isSoldOut ? 'grayscale' : ''}`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-6 left-6 bg-brand-charcoal text-brand-gold text-xs font-bold px-4 py-1.5 tracking-widest uppercase">
                    {item.badge}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div>
                      <h3 className="text-3xl font-serif text-white mb-2">{item.name}</h3>
                      <p className="text-brand-gold font-medium text-xl">{item.price}</p>
                    </div>
                    <button 
                      onClick={() => openDetail(item)}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-gold transition-colors z-10"
                    >
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-brand-charcoal/70 dark:text-brand-ivory/70 line-clamp-2 mb-3">
                    {item.deskripsi}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.fasilitas.map((fasilitas, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider bg-brand-charcoal/5 dark:bg-brand-ivory/5 px-2 py-1 rounded-sm text-brand-charcoal/60 dark:text-brand-ivory/60">
                        {fasilitas}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-brand-charcoal/10 dark:border-brand-ivory/10">
                  <div className="flex gap-6 text-sm text-brand-charcoal/70 dark:text-brand-ivory/70">
                    <div className="flex items-center gap-2">
                      <Maximize className="w-4 h-4" />
                      <span>{item.luasBangunan}/{item.luasTanah}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4" />
                      <span>{item.kamarTidur}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-4 h-4" />
                      <span>{item.kamarMandi}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setActiveVideo(item.video)}
                      className="p-2 border border-brand-charcoal/20 dark:border-brand-ivory/20 rounded-full hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-colors" 
                      title="Virtual Tour 360"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                    {!isSoldOut && (
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-brand-gold"
                          checked={isSelected}
                          onChange={() => toggleProperty(item)}
                          disabled={!isSelected && selectedProperties.length >= 3}
                        />
                        Bandingkan
                      </label>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Compare Floating Bar */}
      <AnimatePresence>
        {selectedProperties.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-brand-charcoal text-brand-ivory p-4 shadow-2xl border-t border-brand-gold/30"
          >
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="font-serif text-xl">Bandingkan ({selectedProperties.length}/3)</span>
                <div className="flex gap-2">
                  {selectedProperties.map(p => (
                    <div key={p.id} className="text-xs bg-brand-ivory/10 px-3 py-1 rounded-full flex items-center gap-2">
                      {p.name}
                      <button onClick={() => toggleProperty(p)} className="hover:text-brand-gold"><X className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => useCompareStore.getState().clearCompare()}
                  className="px-4 py-2 text-sm text-brand-ivory/70 hover:text-brand-ivory"
                >
                  Hapus Semua
                </button>
                <button 
                  onClick={() => useCompareStore.getState().setCompareModalOpen(true)}
                  className="flex-1 md:flex-none px-6 py-2 bg-brand-gold text-white font-medium hover:bg-brand-gold/90 transition-colors disabled:opacity-50"
                  disabled={selectedProperties.length < 2}
                >
                  Bandingkan Sekarang
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Photo Gallery Modal */}
      <AnimatePresence>
        {selectedDetail && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-charcoal/90 backdrop-blur-sm"
            onClick={() => setSelectedDetail(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-brand-ivory dark:bg-brand-dark w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Left: Image Gallery */}
              <div className="w-full md:w-3/5 bg-black relative flex flex-col">
                <div className="relative flex-1 min-h-[300px] md:min-h-[500px]">
                  <Image 
                    src={selectedDetail.gallery[currentImageIndex]} 
                    alt={`${selectedDetail.name} - Photo ${currentImageIndex + 1}`} 
                    fill 
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                  
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-brand-gold transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-brand-gold transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="h-24 bg-brand-charcoal flex gap-2 p-2 overflow-x-auto no-scrollbar">
                  {selectedDetail.gallery.map((img, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`relative h-full aspect-video shrink-0 rounded-md overflow-hidden border-2 transition-colors ${i === currentImageIndex ? 'border-brand-gold' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <Image src={img} alt="Thumbnail" fill className="object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Details */}
              <div className="w-full md:w-2/5 p-6 md:p-8 overflow-y-auto flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-brand-gold mb-2">
                      {selectedDetail.badge}
                    </div>
                    <h3 className="text-3xl font-serif mb-2 text-brand-charcoal dark:text-brand-ivory">{selectedDetail.name}</h3>
                    <p className="text-2xl font-medium text-brand-gold">{selectedDetail.price}</p>
                  </div>
                  <button onClick={() => setSelectedDetail(null)} className="p-2 hover:bg-brand-charcoal/5 dark:hover:bg-brand-ivory/5 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 py-6 border-y border-brand-charcoal/10 dark:border-brand-ivory/10 mb-6">
                  <div className="text-center">
                    <Maximize className="w-6 h-6 mx-auto mb-2 text-brand-charcoal/50 dark:text-brand-ivory/50" />
                    <p className="text-sm font-medium">{selectedDetail.luasBangunan}/{selectedDetail.luasTanah}</p>
                    <p className="text-xs text-brand-charcoal/50 dark:text-brand-ivory/50">LB/LT (m²)</p>
                  </div>
                  <div className="text-center border-x border-brand-charcoal/10 dark:border-brand-ivory/10">
                    <Bed className="w-6 h-6 mx-auto mb-2 text-brand-charcoal/50 dark:text-brand-ivory/50" />
                    <p className="text-sm font-medium">{selectedDetail.kamarTidur}</p>
                    <p className="text-xs text-brand-charcoal/50 dark:text-brand-ivory/50">Kamar Tidur</p>
                  </div>
                  <div className="text-center">
                    <Bath className="w-6 h-6 mx-auto mb-2 text-brand-charcoal/50 dark:text-brand-ivory/50" />
                    <p className="text-sm font-medium">{selectedDetail.kamarMandi}</p>
                    <p className="text-xs text-brand-charcoal/50 dark:text-brand-ivory/50">Kamar Mandi</p>
                  </div>
                </div>

                <div className="mb-8 flex-1">
                  <h4 className="font-serif text-xl mb-3">Deskripsi</h4>
                  <p className="text-sm text-brand-charcoal/70 dark:text-brand-ivory/70 leading-relaxed mb-6">
                    {selectedDetail.deskripsi}
                  </p>

                  <h4 className="font-serif text-xl mb-3">Fasilitas Unit</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedDetail.fasilitas.map((fasilitas, i) => (
                      <li key={i} className="text-sm flex items-center gap-2 text-brand-charcoal/70 dark:text-brand-ivory/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                        {fasilitas}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => {
                    const text = `Halo Alizah Property, saya tertarik dengan unit ${selectedDetail.name} (${selectedDetail.price}). Mohon info lebih lanjut.`;
                    window.open(`https://wa.me/62895403047867?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="w-full py-4 bg-brand-gold text-white font-medium hover:bg-brand-gold/90 transition-colors rounded-xl"
                >
                  Hubungi Marketing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-brand-charcoal/95 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <video 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              >
                <source src={activeVideo} type="video/mp4" />
                Browser Anda tidak mendukung tag video.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}