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
    price: 'Rp 380.000.000',
    priceDetail: 'Gratis Biaya Akad KPR',
    type: 'komersil' as const,
    luasTanah: 84,
    luasBangunan: 51,
    kamarTidur: 2,
    kamarMandi: 1,
    badge: 'Commercial',
    image: '/images/komersil1.jpg',
    video: '/videos/komersil1.MOV',
    gallery: [
      '/images/komersil1.jpg',
      '/images/gallery1.jpg',
      '/images/gallery2.jpg',
      '/images/gallery3.jpg',
      '/images/gallery4.jpg',
      '/images/gallery5.jpg',
      '/images/gallery6.jpg',
    ],
    deskripsi: 'Hunian eksklusif dengan desain modern minimalis, dilengkapi dengan sistem keamanan lengkap dan tata ruang sirkulasi udara optimal untuk kenyamanan keluarga.',
    fasilitas: ['Pintu Import Baja', 'Carport Mobil', 'Taman Depan', 'Dapur Bersih']
  },
  {
    id: 'k2',
    name: 'Komersil Blok D12',
    price: 'Rp 380.000.000',
    priceDetail: 'Gratis Biaya Akad KPR',
    type: 'komersil' as const,
    luasTanah: 84,
    luasBangunan: 51,
    kamarTidur: 2,
    kamarMandi: 1,
    badge: 'Commercial',
    image: '/images/komersil2.jpg',
    video: '/videos/komersil2.MOV',
    gallery: [
      '/images/komersil2.jpg',
      '/images/gallerykomersil1.png',
      '/images/gallerykomersil2.jpg',
      '/images/gallerykomersil3.png',
      '/images/gallerykomersil4.png',
    ],
    deskripsi: 'Nikmati kemewahan hidup di rumah bergaya modern. Dirancang khusus dengan estetika minimalis dan pemilihan material premium yang tahan lama.',
    fasilitas: ['Pintu Import Baja', 'Carport Mobil', 'Taman Depan', 'Dapur Bersih']
  }
];

export default function Komersil() {
  const { toggleProperty, selectedProperties, setCompareModalOpen, clearCompare } = useCompareStore();
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
      {/* Header Section */}
      <div className="container mx-auto px-6 md:px-12 mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-serif text-brand-charcoal dark:text-brand-ivory mb-6 leading-tight tracking-tight">
            properti <span className="text-brand-gold italic">komersil</span>
          </h2>
          <div className="w-16 h-1 bg-brand-gold mb-6"></div>
          <p className="text-brand-charcoal/70 dark:text-brand-ivory/70 text-lg">
            Koleksi hunian eksklusif dengan sentuhan arsitektur modern kontemporer yang dirancang untuk kenyamanan jangka panjang.
          </p>
        </div>
        <div className="flex items-center gap-3 text-brand-gold text-[10px] font-bold tracking-[0.3em] uppercase bg-brand-gold/5 px-6 py-3 rounded-full border border-brand-gold/10">
          <MoveHorizontal className="w-4 h-4" />
          <span>Geser kesamping</span>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="w-full overflow-x-auto snap-x snap-mandatory no-scrollbar pb-16">
        <div className="flex gap-10 w-max px-6 md:px-12">
          {komersilData.map((item, index) => {
            const isSelected = selectedProperties.some(p => p.id === item.id);
            const isSoldOut = item.badge === 'TERJUAL';

            return (
              <motion.div 
                key={item.id}
                className="w-[85vw] md:w-[500px] shrink-0 snap-center group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {/* Image Card */}
                <div className="relative h-[450px] md:h-[550px] overflow-hidden rounded-[2rem] mb-8 shadow-2xl transition-all duration-700">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className={`object-cover transition-transform duration-[1.5s] group-hover:scale-110 ${isSoldOut ? 'grayscale contrast-125' : ''}`}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/20 to-transparent opacity-80 z-[1]" />
                  
                  <div className="absolute top-8 left-8 z-10 backdrop-blur-md bg-white/10 border border-white/20 text-white text-[10px] font-bold px-5 py-2 tracking-[0.2em] uppercase rounded-full">
                    {item.badge}
                  </div>

                  {/* Tombol Video (Kanan Atas) */}
                  <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setActiveVideo(item.video);
                    }}
                    className="absolute top-8 right-8 z-[30] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-brand-gold transition-all"
                  >
                    <Video className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-8 left-8 right-8 z-10">
                    <div className="flex justify-between items-end">
                      <div className="text-white">
                        <h3 className="text-3xl font-serif mb-2 leading-tight">{item.name}</h3>
                        <p className="text-brand-gold font-medium text-2xl">{item.price}</p>
                        <p className="text-white/50 text-[10px] tracking-widest uppercase mt-1">*{item.priceDetail}</p>
                      </div>
                      <button 
                        onClick={() => openDetail(item)}
                        className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold transition-all duration-500 transform group-hover:rotate-[-45deg]"
                      >
                        <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-2">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1">Luas</span>
                        <span className="text-sm font-medium dark:text-white">{item.luasBangunan}/{item.luasTanah} m²</span>
                      </div>
                      <div className="w-px h-8 bg-brand-charcoal/10 dark:bg-brand-ivory/10"></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1">Kamar</span>
                        <span className="text-sm font-medium dark:text-white">{item.kamarTidur} Kamar</span>
                      </div>
                      <div className="w-px h-8 bg-brand-charcoal/10 dark:bg-brand-ivory/10"></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1">Kamar Mandi</span>
                        <span className="text-sm font-medium dark:text-white">{item.kamarMandi} Mandi</span>
                      </div>
                    </div>
                  </div>

                  {!isSoldOut && (
                    <label className="inline-flex items-center gap-3 cursor-pointer group/label">
                      <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${isSelected ? 'bg-brand-gold border-brand-gold' : 'border-brand-charcoal/20 dark:border-white/20'}`}>
                        {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={isSelected}
                          onChange={() => toggleProperty(item)}
                          disabled={!isSelected && selectedProperties.length >= 3}
                        />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 dark:text-brand-ivory/40 group-hover/label:text-brand-gold transition-colors">Bandingkan Unit</span>
                    </label>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Compare Floating Bar (DIBALIKKAN LAGI) */}
      <AnimatePresence>
        {selectedProperties.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[100] bg-brand-charcoal/95 backdrop-blur-xl text-brand-ivory p-6 shadow-2xl border-t border-brand-gold/20"
          >
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="bg-brand-gold/10 px-4 py-2 rounded-lg border border-brand-gold/20">
                    <span className="font-serif text-xl text-brand-gold">{selectedProperties.length}<span className="text-sm text-brand-ivory/60">/3</span></span>
                </div>
                <div className="flex -space-x-4">
                  {selectedProperties.map(p => (
                    <div key={p.id} className="w-10 h-10 rounded-full border-2 border-brand-charcoal overflow-hidden relative group">
                        <Image src={p.image} alt="Unit" fill className="object-cover" />
                        <button onClick={() => toggleProperty(p)} className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <X className="w-4 h-4 text-white" />
                        </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => clearCompare()}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-brand-ivory/50 hover:text-white transition-colors"
                >
                  Hapus Semua
                </button>
                <button 
                  onClick={() => setCompareModalOpen(true)}
                  className="flex-1 md:flex-none px-10 py-3 bg-brand-gold text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-charcoal transition-all disabled:opacity-30 rounded-full"
                  disabled={selectedProperties.length < 2}
                >
                  Bandingkan Sekarang
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal & Video Modal tetap ada seperti sebelumnya */}
      <AnimatePresence>
        {selectedDetail && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-brand-charcoal/95 backdrop-blur-md"
            onClick={() => setSelectedDetail(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-brand-ivory dark:bg-brand-dark w-full max-w-6xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-full md:w-3/5 bg-black relative flex flex-col">
                <div className="relative flex-1 min-h-[350px]">
                  <Image src={selectedDetail.gallery[currentImageIndex]} alt="Galeri" fill className="object-contain p-4" />
                  <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between">
                    <button onClick={prevImage} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-brand-gold transition-all"><ChevronLeft /></button>
                    <button onClick={nextImage} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-brand-gold transition-all"><ChevronRight /></button>
                  </div>
                </div>
                <div className="h-24 bg-brand-charcoal/20 flex gap-2 p-3 overflow-x-auto no-scrollbar">
                  {selectedDetail.gallery.map((img, i) => (
                    <button key={i} onClick={() => setCurrentImageIndex(i)} className={`relative h-full aspect-video rounded-lg overflow-hidden border-2 ${i === currentImageIndex ? 'border-brand-gold' : 'border-transparent opacity-50'}`}>
                      <Image src={img} alt="thumb" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-2/5 p-8 overflow-y-auto flex flex-col">
                <div className="flex justify-between mb-4">
                  <h3 className="text-3xl font-serif dark:text-white">{selectedDetail.name}</h3>
                  <button onClick={() => setSelectedDetail(null)} className="p-2 dark:text-white hover:rotate-90 transition-transform"><X /></button>
                </div>
                <p className="text-2xl text-brand-gold mb-6 font-bold">{selectedDetail.price}</p>
                <p className="text-sm dark:text-brand-ivory/70 leading-relaxed mb-8">{selectedDetail.deskripsi}</p>
                <button onClick={() => window.open(`https://wa.me/62895403047867?text=Halo Alizah Property, saya tertarik dengan unit ${selectedDetail.name}`, '_blank')} className="mt-auto w-full py-5 bg-brand-charcoal text-white font-bold rounded-2xl hover:bg-brand-gold transition-all">Hubungi Marketing</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-brand-charcoal/98 backdrop-blur-2xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setActiveVideo(null)} className="absolute top-6 right-6 z-10 p-2 bg-white/20 hover:bg-red-500 text-white rounded-full transition-all"><X /></button>
              <video controls autoPlay className="w-full h-full"><source src={activeVideo} type="video/mp4" /></video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}