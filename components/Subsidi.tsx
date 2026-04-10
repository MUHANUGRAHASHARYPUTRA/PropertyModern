'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Maximize, Bed, Bath, MoveHorizontal } from 'lucide-react';
import Image from 'next/image';

const subsidiData = [
  {
    id: 's1',
    name: 'Cluster Asri 1',
    price: 'Rp 162.000.000',
    luasTanah: 60,
    luasBangunan: 30,
    kamarTidur: 2,
    kamarMandi: 1,
    status: 'SOLD OUT',
    image: 'https://picsum.photos/seed/house1/600/400'
  },
  {
    id: 's2',
    name: 'Cluster Asri 2',
    price: 'Rp 162.000.000',
    luasTanah: 60,
    luasBangunan: 30,
    kamarTidur: 2,
    kamarMandi: 1,
    status: 'SOLD OUT',
    image: 'https://picsum.photos/seed/house2/600/400'
  }
];

export default function Subsidi() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="subsidi" className="py-24 bg-brand-offwhite dark:bg-brand-dark-surface">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-brand-ivory mb-4">
              properti <span className="text-brand-gold italic">subsidi</span>
            </h2>
            <p className="text-brand-charcoal/70 dark:text-brand-ivory/70 max-w-xl">
              Wujudkan rumah impian dengan program KPR FLPP. Cicilan ringan, syarat mudah, dan kualitas bangunan terjamin.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white transition-colors rounded-none font-medium whitespace-nowrap tracking-wide"
            >
              Cek Syarat KPR Subsidi
            </button>
            <div className="flex items-center gap-2 text-brand-gold text-sm font-medium animate-pulse bg-brand-gold/10 px-4 py-2 rounded-full shrink-0">
              <MoveHorizontal className="w-4 h-4" />
              <span>Geser ke samping</span>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="w-full overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12">
          <div className="flex gap-8 w-max px-6 md:px-12">
            {subsidiData.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-[85vw] md:w-[480px] shrink-0 snap-center bg-brand-ivory dark:bg-brand-dark rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              >
              <div className="relative h-72 overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#1D9E75] text-white text-xs font-bold px-4 py-1.5 tracking-wider uppercase">
                  Bersubsidi
                </div>
                <div className={`absolute top-4 right-4 backdrop-blur-sm text-white text-xs px-4 py-1.5 tracking-wider uppercase ${item.status === 'SOLD OUT' ? 'bg-red-600/90' : 'bg-brand-charcoal/80'}`}>
                  {item.status}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-serif mb-2">{item.name}</h3>
                <p className="text-brand-gold font-medium text-xl mb-6">{item.price}</p>
                
                <div className="grid grid-cols-3 gap-4 border-t border-brand-charcoal/10 dark:border-brand-ivory/10 pt-6 mt-6">
                  <div className="flex items-center gap-2 text-sm text-brand-charcoal/70 dark:text-brand-ivory/70">
                    <Maximize className="w-4 h-4" />
                    <span>{item.luasBangunan}/{item.luasTanah}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-charcoal/70 dark:text-brand-ivory/70">
                    <Bed className="w-4 h-4" />
                    <span>{item.kamarTidur}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-charcoal/70 dark:text-brand-ivory/70">
                    <Bath className="w-4 h-4" />
                    <span>{item.kamarMandi}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>

      {/* Modal Syarat */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-charcoal/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-brand-ivory dark:bg-brand-dark w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-brand-charcoal/10 dark:border-brand-ivory/10">
                <h3 className="text-2xl font-serif">Syarat KPR Subsidi FLPP</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-brand-charcoal/5 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <ul className="space-y-4">
                  {[
                    'Warga Negara Indonesia (WNI) dan berdomisili di Indonesia.',
                    'Telah berusia 21 tahun atau telah menikah.',
                    'Penerima belum pernah memiliki rumah dan belum pernah menerima subsidi pemerintah untuk pemilikan rumah.',
                    'Gaji/penghasilan pokok tidak melebihi Rp 8.000.000,- per bulan.',
                    'Memiliki masa kerja atau usaha minimal 1 tahun.',
                    'Memiliki Nomor Pokok Wajib Pajak (NPWP) atau Surat Pemberitahuan (SPT) Tahunan Pajak Penghasilan (PPh) orang pribadi.'
                  ].map((syarat, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="mt-1 bg-brand-gold/20 p-1 rounded-full shrink-0">
                        <Check className="w-4 h-4 text-brand-gold" />
                      </div>
                      <span className="text-brand-charcoal/80 dark:text-brand-ivory/80">{syarat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
