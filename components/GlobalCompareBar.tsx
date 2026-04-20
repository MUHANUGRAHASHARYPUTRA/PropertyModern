'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useCompareStore } from '@/lib/store';

export default function GlobalCompareBar() {
  const { selectedProperties, toggleProperty, clearCompare, setCompareModalOpen } = useCompareStore();
  
  if (selectedProperties.length === 0) return null;

  return (
    <AnimatePresence>
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
                <div key={p.id} className="w-12 h-12 rounded-full border-2 border-brand-charcoal overflow-hidden relative group">
                    <Image src={p.image_url || '/images/komersil1.jpg'} alt="Unit" fill className="object-cover" />
                    <button onClick={() => toggleProperty(p)} className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>
              ))}
            </div>
            <p className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-brand-ivory/40">Unit terpilih untuk dibanding</p>
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
              className="flex-1 md:flex-none px-10 py-3 bg-brand-gold text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-charcoal transition-all disabled:opacity-30 rounded-full shadow-lg shadow-brand-gold/20"
              disabled={selectedProperties.length < 2}
            >
              Bandingkan ({selectedProperties.length})
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
