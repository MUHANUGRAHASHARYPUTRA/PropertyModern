'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Menggunakan framer-motion agar konsisten
import { Download, X, ChevronLeft, ChevronRight, Grid2X2, ChevronUp } from 'lucide-react';
import Image from 'next/image';

const categories = ['Semua', 'Eksterior', 'Interior', 'Fasilitas', 'Lingkungan'];

const galleryData = [
  { id: 1, category: 'Eksterior', src: '/images/eksterior1.jpg', alt: 'Fasad Depan' },
  { id: 9, category: 'Eksterior', src: '/images/eksterior2.jpg', alt: 'Renovasi Modern' },
  { id: 2, category: 'Interior', src: '/images/interior.jpg', alt: 'Interior Komersil' },
  { id: 3, category: 'Fasilitas', src: '/images/fasilitas.jpg', alt: 'Gerbang' },
  { id: 4, category: 'Lingkungan', src: '/images/lingkungan.jpg', alt: 'Area Subsidi' },
  { id: 5, category: 'Eksterior', src: '/images/eksterior4.jpg', alt: 'Subsidi' },
  { id: 6, category: 'Interior', src: '/images/interior2.jpg', alt: 'Dapur' },
  { id: 7, category: 'Semua', src: '/images/dokumentasi.jpg', alt: 'Unit Cash' },
  { id: 8, category: 'Semua', src: '/images/dokumentasi2.jpg', alt: 'Unit Komersil' },
  { id: 12, category: 'Lingkungan', src: '/images/lingkungan3.jpg', alt: 'Area Komersil' },
  { id: 10, category: 'Lingkungan', src: '/images/lingkungan2.jpg', alt: 'Area Komersil' },
  { id: 11, category: 'Lingkungan', src: '/images/fasilitas2.jpg', alt: 'Masjid' },
  { id: 13, category: 'Fasilitas', src: '/images/fasilitas3.png', alt: 'Cctv' },
];

export default function Galeri() {
  const [activeTab, setActiveTab] = useState('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredData = activeTab === 'Semua' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeTab);

  // HANYA TAMPILKAN 3 FOTO DI AWAL
  const displayedData = showAll ? filteredData : filteredData.slice(0, 3);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <section id="galeri" className="py-24 bg-brand-offwhite dark:bg-brand-dark-surface">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-brand-ivory mb-4">
              galeri <span className="text-brand-gold italic">perumahan</span>
            </h2>
            <p className="text-brand-charcoal/70 dark:text-brand-ivory/70 max-w-xl">
              Sentuhan minimalis modern di setiap sudut hunian Alizah Property.
            </p>
          </div>
          <a 
            href="/brosuralizahproperty.pdf" 
            download
            className="flex items-center gap-2 px-6 py-3 border border-brand-charcoal/20 dark:border-brand-ivory/20 text-brand-charcoal dark:text-brand-ivory hover:bg-brand-gold hover:border-brand-gold hover:text-white transition-all font-medium text-xs tracking-widest uppercase"
          >
            <Download className="w-4 h-4" />
            Brosur PDF
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setShowAll(false);
              }}
              className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${
                activeTab === cat 
                  ? 'bg-brand-gold text-white' 
                  : 'bg-transparent border border-brand-charcoal/10 dark:border-brand-ivory/10 text-brand-charcoal/50 dark:text-brand-ivory/50 hover:text-brand-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Galeri */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {displayedData.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative group overflow-hidden rounded-2xl cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(index)}
              >
                <Image 
                  src={item.src} 
                  alt={item.alt} 
                  width={600} 
                  height={800} 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                   <p className="text-brand-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-1">{item.category}</p>
                   <h3 className="text-white font-serif text-lg">{item.alt}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Tombol Toggle (Lihat Semua / Sembunyikan) */}
        {filteredData.length > 3 && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => {
                if (showAll) {
                  setShowAll(false);
                  document.getElementById('galeri')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setShowAll(true);
                }
              }}
              className="group flex items-center gap-4 px-10 py-4 border border-brand-gold/30 hover:border-brand-gold rounded-full transition-all duration-500"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-5 h-5 text-brand-gold" />
                  <span className="font-medium tracking-widest uppercase text-xs text-brand-charcoal dark:text-brand-ivory">
                    Sembunyikan Gambar
                  </span>
                </>
              ) : (
                <>
                  <Grid2X2 className="w-5 h-5 text-brand-gold group-hover:rotate-90 transition-transform duration-500" />
                  <span className="font-medium tracking-widest uppercase text-xs text-brand-charcoal dark:text-brand-ivory">
                    Lihat Semua Foto ({filteredData.length})
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Lightbox tetap sama seperti sebelumnya */}
    </section>
  );
}