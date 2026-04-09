'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize, Bed, Bath, ArrowRight, Video, X } from 'lucide-react';
import Image from 'next/image';
import { useCompareStore } from '@/lib/store';

const komersilData = [
  {
    id: 'k1',
    name: 'The Signature Villa',
    price: 'Rp 1.250.000.000',
    type: 'komersil' as const,
    luasTanah: 120,
    luasBangunan: 90,
    kamarTidur: 3,
    kamarMandi: 2,
    badge: 'EXCLUSIVE',
    image: 'https://picsum.photos/seed/villa1/800/600',
    deskripsi: 'Hunian eksklusif dengan desain tropis modern, dilengkapi dengan smart home system dan sirkulasi udara optimal.',
    fasilitas: ['Smart Home', 'Carport 2 Mobil', 'Taman Belakang', 'CCTV 24 Jam']
  },
  {
    id: 'k2',
    name: 'Grand Boulevard',
    price: 'Rp 850.000.000',
    type: 'komersil' as const,
    luasTanah: 90,
    luasBangunan: 70,
    kamarTidur: 3,
    kamarMandi: 2,
    badge: 'BEST SELLER',
    image: 'https://picsum.photos/seed/villa2/800/600',
    deskripsi: 'Rumah 2 lantai di jalan utama kawasan, akses langsung ke fasilitas komersial dan clubhouse.',
    fasilitas: ['One Gate System', 'Balkon Luas', 'High Ceiling', 'Clubhouse Access']
  },
  {
    id: 'k3',
    name: 'Royal Residence',
    price: 'Rp 2.100.000.000',
    type: 'komersil' as const,
    luasTanah: 200,
    luasBangunan: 150,
    kamarTidur: 4,
    kamarMandi: 3,
    badge: 'SOLD OUT',
    image: 'https://picsum.photos/seed/villa3/800/600',
    deskripsi: 'Mahakarya arsitektur dengan ruang keluarga yang luas, kolam renang pribadi opsional, dan material premium.',
    fasilitas: ['Private Pool (Opt)', 'Kamar Pembantu', 'Garasi 2 Mobil', 'Premium Material']
  }
];

export default function Komersil() {
  const { toggleProperty, selectedProperties } = useCompareStore();

  return (
    <section id="komersil" className="py-32 bg-brand-ivory dark:bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-brand-ivory mb-4">
          properti <span className="text-brand-gold italic">komersil</span>
        </h2>
        <p className="text-brand-charcoal/70 dark:text-brand-ivory/70 max-w-xl">
          Koleksi hunian premium dengan desain arsitektur modern, material berkualitas tinggi, dan privasi maksimal.
        </p>
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
                    <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-gold transition-colors">
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
                    <button className="p-2 border border-brand-charcoal/20 dark:border-brand-ivory/20 rounded-full hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-colors" title="Virtual Tour 360">
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
    </section>
  );
}
