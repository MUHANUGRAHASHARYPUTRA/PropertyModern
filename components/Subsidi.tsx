'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, MoveHorizontal, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const subsidiData = [
  {
    id: 's1',
    name: 'Subsidi Blok A',
    price: 'Rp 156.000.000',
    priceDetail: 'Program KPR FLPP',
    luasTanah: 60,
    luasBangunan: 36,
    kamarTidur: 2,
    kamarMandi: 1,
    status: 'SOLD OUT',
    image: '/images/subsidi1.jpg',
    deskripsi: 'Hunian nyaman dengan sirkulasi udara optimal di lingkungan yang asri dan strategis untuk keluarga muda.'
  },
  {
    id: 's2',
    name: 'Subsidi Blok B+',
    price: 'Rp 156.000.000',
    priceDetail: 'Program KPR FLPP',
    luasTanah: 60,
    luasBangunan: 36,
    kamarTidur: 2,
    kamarMandi: 1,
    status: 'SOLD OUT',
    image: '/images/subsidi2.jpg',
    deskripsi: 'Solusi cerdas bagi keluarga yang mendambakan rumah pertama dengan kualitas bangunan terjamin.'
  }
];

export default function Subsidi() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="subsidi" className="py-32 bg-brand-offwhite dark:bg-brand-dark-surface overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif text-brand-charcoal dark:text-brand-ivory mb-6 leading-tight tracking-tight">
              hunian <span className="text-brand-gold italic">subsidi</span>
            </h2>
            <div className="w-16 h-1 bg-brand-gold mb-6"></div>
            <p className="text-brand-charcoal/70 dark:text-brand-ivory/70 text-lg">
              Wujudkan mimpi memiliki rumah pertama dengan cicilan flat yang ringan dan proses yang transparan.
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative px-10 py-4 border border-brand-charcoal/20 dark:border-brand-ivory/20 text-brand-charcoal dark:text-brand-ivory text-[10px] font-bold tracking-[0.2em] uppercase rounded-full overflow-hidden transition-all duration-500 hover:border-brand-gold hover:text-brand-gold"
            >
              <span className="relative z-10">Cek Syarat KPR</span>
            </button>
            <div className="flex items-center gap-3 text-brand-gold text-[10px] font-bold tracking-[0.3em] uppercase bg-brand-gold/5 px-6 py-3 rounded-full border border-brand-gold/10">
              <MoveHorizontal className="w-4 h-4" />
              <span>geser kesamping</span>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="w-full overflow-x-auto snap-x snap-mandatory no-scrollbar pb-16">
          <div className="flex gap-10 w-max px-2">
            {subsidiData.map((item, index) => {
              const isSoldOut = item.status === 'SOLD OUT';

              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="w-[85vw] md:w-[500px] shrink-0 snap-center group"
                >
                  <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-[2rem] mb-8 shadow-xl transition-all duration-700">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className={`object-cover transition-transform duration-[1.5s] group-hover:scale-110 ${
                        isSoldOut ? 'grayscale contrast-125' : ''
                      }`}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/20 to-transparent opacity-80" />

                    <div className={`absolute top-8 left-8 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-5 py-2 tracking-[0.2em] uppercase rounded-full ${isSoldOut ? 'bg-red-500/20 text-red-100' : 'bg-emerald-500/20 text-emerald-100'}`}>
                      {item.status}
                    </div>

                    {isSoldOut && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                        <div className="border border-white/30 backdrop-blur-[2px] px-10 py-4 -rotate-12">
                          <span className="text-white text-5xl font-serif italic font-black tracking-tighter uppercase opacity-80">SOLD</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute bottom-8 left-8 right-8 z-10">
                      <div className="flex justify-between items-end">
                        <div className="text-white">
                          <h3 className="text-3xl font-serif mb-2 leading-tight">{item.name}</h3>
                          <p className="text-brand-gold font-medium text-2xl">{item.price}</p>
                          <p className="text-white/50 text-[10px] tracking-widest uppercase mt-1">*{item.priceDetail}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-brand-gold transition-all duration-500">
                          <ArrowRight className="w-5 h-5 -rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`px-2 transition-opacity duration-500 ${isSoldOut ? 'opacity-40' : 'opacity-100'}`}>
                    <p className="text-sm text-brand-charcoal/70 dark:text-brand-ivory/70 line-clamp-2 mb-6 leading-relaxed">
                      {item.deskripsi}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-brand-charcoal/10 dark:border-brand-ivory/10">
                      <div className="flex gap-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1">Luas</span>
                          <span className="text-sm font-medium">{item.luasBangunan}/{item.luasTanah} m²</span>
                        </div>
                        <div className="w-px h-8 bg-brand-charcoal/10 dark:bg-brand-ivory/10"></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1">Beds</span>
                          <span className="text-sm font-medium">{item.kamarTidur} Kamar</span>
                        </div>
                        <div className="w-px h-8 bg-brand-charcoal/10 dark:bg-brand-ivory/10"></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1">Mandi</span>
                          <span className="text-sm font-medium">{item.kamarMandi} Mandi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Syarat KPR Modal - Minimalist Version */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-brand-charcoal/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="bg-white dark:bg-brand-dark w-full max-w-lg rounded-[2rem] shadow-sm overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <p className="text-[10px] text-brand-gold font-bold tracking-[0.25em] uppercase mb-3">Persyaratan Dasar</p>
                    <h3 className="text-3xl font-serif text-brand-charcoal dark:text-brand-ivory">Program KPR <span className="italic">Subsidi</span></h3>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)} 
                    className="p-2 text-brand-charcoal/30 hover:text-brand-charcoal dark:text-brand-ivory/30 dark:hover:text-brand-ivory transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {[
                    'WNI berusia minimal 21 tahun atau telah menikah',
                    'Belum pernah memiliki rumah atau menerima subsidi',
                    'Penghasilan pokok maksimal Rp 8.000.000/bulan',
                    'Masa kerja atau usaha minimal 1 tahun',
                    'Memiliki NPWP dan SPT Tahunan PPh yang aktif',
                    'Lolos BI Checking (Slik OJK)'
                  ].map((syarat, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="mt-1 w-4 h-4 rounded-full border border-brand-gold/30 flex items-center justify-center shrink-0">
                        <Check className="w-2 h-2 text-brand-gold" />
                      </div>
                      <span className="text-brand-charcoal/60 dark:text-brand-ivory/60 text-sm leading-relaxed">{syarat}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-brand-charcoal/5 dark:border-brand-ivory/5 flex flex-col gap-4">
                  <button 
                    onClick={() => window.open('https://wa.me/62895403047867', '_blank')}
                    className="w-full py-4 bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-brand-gold dark:hover:bg-brand-gold hover:text-white transition-all active:scale-95"
                  >
                    Konsultasi Marketing
                  </button>
                  <p className="text-center text-[9px] text-brand-charcoal/30 dark:text-brand-ivory/30 uppercase tracking-widest">
                    Layanan bebas biaya konsultasi
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}