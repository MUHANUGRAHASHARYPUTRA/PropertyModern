'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const filteredData = activeTab === 'Semua' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeTab);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredData.length);
    }
  };
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredData.length) % filteredData.length);
    }
  };

  return (
    <section id="galeri" className="py-24 bg-brand-offwhite dark:bg-brand-dark-surface">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-brand-ivory mb-4">
              galeri <span className="text-brand-gold italic">perumahan</span>
            </h2>
            <p className="text-brand-charcoal/70 dark:text-brand-ivory/70 max-w-xl">
              Jelajahi setiap sudut kawasan Panaikang Residence melalui galeri foto eksklusif kami.
            </p>
          </div>
          <a 
            href="/brosuralizahproperty.pdf" 
            download="Brosur-Alizah-Property.pdf"
            className="flex items-center gap-2 px-6 py-3 bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal hover:bg-brand-gold dark:hover:bg-brand-gold hover:text-white transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            Brosur PDF
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === cat 
                  ? 'bg-brand-gold text-white shadow-md' 
                  : 'bg-transparent border border-brand-charcoal/20 dark:border-brand-ivory/20 text-brand-charcoal/70 dark:text-brand-ivory/70 hover:border-brand-gold hover:text-brand-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid (simulated with CSS columns) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group overflow-hidden rounded-xl cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(index)}
              >
                <Image 
                  src={item.src} 
                  alt={item.alt} 
                  width={800} 
                  height={800} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium tracking-wider uppercase text-sm border border-white/50 px-4 py-2 backdrop-blur-sm">
                    {item.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-charcoal/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2" onClick={closeLightbox}>
              <X className="w-8 h-8" />
            </button>
            
            <button className="absolute left-6 text-white/70 hover:text-white p-4" onClick={prevImage}>
              <ChevronLeft className="w-10 h-10" />
            </button>

            <motion.div 
              key={lightboxIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative w-full max-w-5xl max-h-[80vh] aspect-video mx-20"
              onClick={e => e.stopPropagation()}
            >
              <Image 
                src={filteredData[lightboxIndex].src} 
                alt={filteredData[lightboxIndex].alt}
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-[-40px] left-0 right-0 text-center text-white/80">
                {filteredData[lightboxIndex].alt} — {lightboxIndex + 1} / {filteredData.length}
              </div>
            </motion.div>

            <button className="absolute right-6 text-white/70 hover:text-white p-4" onClick={nextImage}>
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
