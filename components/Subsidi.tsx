'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, MoveHorizontal, ArrowRight, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import WishlistButton from './WishlistButton';
import { useCompareStore } from '@/lib/store';

export default function Subsidi() {
  const { toggleProperty, selectedProperties } = useCompareStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subsidiData, setSubsidiData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const supabase = createClient();

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedDetail?.gallery_urls?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedDetail.gallery_urls.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedDetail?.gallery_urls?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedDetail.gallery_urls.length) % selectedDetail.gallery_urls.length);
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('category', 'subsidi')
        .order('created_at', { ascending: false });

      if (data) {
        setSubsidiData(data);
      }
      setLoading(false);
    };

    fetchProperties();
  }, []);

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
            <div className="hidden md:flex items-center gap-3 text-brand-gold text-[10px] font-bold tracking-[0.3em] uppercase bg-brand-gold/5 px-6 py-3 rounded-full border border-brand-gold/10">
              <MoveHorizontal className="w-4 h-4" />
              <span>geser kesamping</span>
            </div>
          </div>
        </div>

        {/* Property Grid / Scroll Area */}
        <div className="w-full overflow-x-auto md:overflow-x-auto snap-x snap-mandatory no-scrollbar pb-16">
          <div className="grid grid-cols-1 md:flex gap-10 w-full md:w-max px-2 md:px-0">
            {loading ? (
              <div className="w-full md:w-[500px] flex items-center justify-center h-[500px]">
                <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
              </div>
            ) : subsidiData.length > 0 ? (
              subsidiData.map((item, index) => {
                const isSoldOut = item.status === 'SOLD OUT';

                return (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="w-full md:w-[500px] shrink-0 snap-center group"
                  >
                    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-[2rem] mb-8 shadow-xl transition-all duration-700">
                      <Image 
                        src={item.image_url || '/images/subsidi1.jpg'} 
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

                      {!isSoldOut && (
                        <div className="absolute top-8 right-8 z-30">
                          <WishlistButton propertyId={item.id} />
                        </div>
                      )}

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
                            <p className="text-white/50 text-[10px] tracking-widest uppercase mt-1">*{item.price_detail}</p>
                          </div>
                            <button 
                                onClick={() => {
                                    setSelectedDetail(item);
                                    setCurrentImageIndex(0);
                                }}
                                className="w-12 h-12 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-gold transition-all duration-500"
                            >
                              <ArrowRight className="w-5 h-5 -rotate-45" />
                            </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`px-2 transition-opacity duration-500 ${isSoldOut ? 'opacity-40' : 'opacity-100'}`}>
                      <p className="text-sm text-brand-charcoal/70 dark:text-brand-ivory/70 line-clamp-2 mb-6 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-brand-charcoal/10 dark:border-brand-ivory/10">
                        <div className="flex gap-8">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1">Luas</span>
                            <span className="text-sm font-medium">{item.luas_bangunan}/{item.luas_tanah} m²</span>
                          </div>
                          <div className="w-px h-8 bg-brand-charcoal/10 dark:bg-brand-ivory/10"></div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1">Beds</span>
                            <span className="text-sm font-medium">{item.kamar_tidur} Kamar</span>
                          </div>
                          <div className="w-px h-8 bg-brand-charcoal/10 dark:bg-brand-ivory/10"></div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mb-1">Mandi</span>
                            <span className="text-sm font-medium">{item.kamar_mandi} Mandi</span>
                          </div>
                        </div>
                        
                        <button 
                            onClick={() => {
                                setSelectedDetail(item);
                                setCurrentImageIndex(0);
                            }}
                            className="text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:underline"
                        >
                            Lihat Detail
                        </button>
                      </div>

                      {!isSoldOut && (
                        <div className="mt-4 pt-4 border-t border-brand-charcoal/5 dark:border-brand-ivory/5">
                             <label className="inline-flex items-center gap-3 cursor-pointer group/label">
                                <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${selectedProperties.some(p => p.id === item.id) ? 'bg-brand-gold border-brand-gold' : 'border-brand-charcoal/20 dark:border-white/20'}`}>
                                    {selectedProperties.some(p => p.id === item.id) && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                    <input 
                                        type="checkbox" 
                                        className="hidden"
                                        checked={selectedProperties.some(p => p.id === item.id)}
                                        onChange={() => toggleProperty(item)}
                                        disabled={!selectedProperties.some(p => p.id === item.id) && selectedProperties.length >= 3}
                                    />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 dark:text-brand-ivory/40 group-hover/label:text-brand-gold transition-colors">Bandingkan Unit</span>
                            </label>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
                <div className="w-full flex justify-center py-20">
                    <p className="text-brand-charcoal/40 dark:text-brand-ivory/40 uppercase tracking-widest text-xs font-bold">Belum ada unit subsidi yang tersedia.</p>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDetail && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-brand-charcoal/95 backdrop-blur-md"
            onClick={() => {
                setSelectedDetail(null);
                setCurrentImageIndex(0);
            }}
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
                  {selectedDetail.gallery_urls && selectedDetail.gallery_urls.length > 0 ? (
                      <>
                        <Image src={selectedDetail.gallery_urls[currentImageIndex]} alt="Galeri" fill className="object-contain p-4" />
                        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between z-10">
                            <button onClick={prevImage} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-brand-gold transition-all"><ChevronLeft /></button>
                            <button onClick={nextImage} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-brand-gold transition-all"><ChevronRight /></button>
                        </div>
                      </>
                  ) : (
                    <Image src={selectedDetail.image_url || '/images/subsidi1.jpg'} alt="Unit" fill className="object-contain p-4" />
                  )}
                </div>
                {selectedDetail.gallery_urls && selectedDetail.gallery_urls.length > 1 && (
                    <div className="h-24 bg-brand-charcoal/40 flex gap-2 p-3 overflow-x-auto no-scrollbar justify-center">
                    {selectedDetail.gallery_urls.map((img: string, i: number) => (
                        <button key={i} onClick={() => setCurrentImageIndex(i)} className={`relative h-full aspect-video rounded-lg overflow-hidden border-2 transition-all ${i === currentImageIndex ? 'border-brand-gold scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                        <Image src={img} alt="thumb" fill className="object-cover" />
                        </button>
                    ))}
                    </div>
                )}
              </div>
              <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col bg-white dark:bg-brand-dark">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-serif dark:text-white leading-tight mb-2">{selectedDetail.name}</h3>
                    <p className="text-2xl text-brand-gold font-bold">{selectedDetail.price}</p>
                  </div>
                  <button onClick={() => setSelectedDetail(null)} className="p-3 text-brand-charcoal/20 hover:text-brand-charcoal dark:hover:text-white transition-all"><X /></button>
                </div>
                
                <div className="space-y-8">
                    <p className="text-sm dark:text-brand-ivory/70 leading-relaxed italic">{selectedDetail.description}</p>
                    
                    <div className="grid grid-cols-2 gap-6 bg-brand-gold/5 p-6 rounded-3xl border border-brand-gold/10">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1">Luas Tanah</span>
                            <span className="text-xl font-medium dark:text-white">{selectedDetail.luas_tanah} m²</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1">Luas Bangunan</span>
                            <span className="text-xl font-medium dark:text-white">{selectedDetail.luas_bangunan} m²</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1">Kamar Tidur</span>
                            <span className="text-xl font-medium dark:text-white">{selectedDetail.kamar_tidur} Bed</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1">Kamar Mandi</span>
                            <span className="text-xl font-medium dark:text-white">{selectedDetail.kamar_mandi} Bath</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => window.open(`https://wa.me/62895403047867?text=Halo Marketing Alizah Property, saya tertarik dengan unit ${selectedDetail.name}`, '_blank')} 
                        className="w-full py-5 bg-brand-gold text-white font-bold text-[10px] uppercase tracking-[0.25em] rounded-2xl hover:bg-brand-charcoal transition-all shadow-xl shadow-brand-gold/20"
                    >
                        Konsultasi Unit Sekarang
                    </button>
                    
                    <p className="text-[10px] text-center text-brand-charcoal/40 dark:text-brand-ivory/40 uppercase tracking-widest font-bold">Unit Subsidi Terbatas</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  ].map((syarat: string, i: number) => (
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