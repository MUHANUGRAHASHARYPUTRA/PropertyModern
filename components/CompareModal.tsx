'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import Image from 'next/image';
import { useCompareStore } from '@/lib/store';

export default function CompareModal() {
  const { isCompareModalOpen, setCompareModalOpen, selectedProperties, toggleProperty } = useCompareStore();

  if (!isCompareModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-brand-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
        onClick={() => setCompareModalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-brand-ivory dark:bg-brand-dark w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        >
          <div className="sticky top-0 z-10 bg-brand-ivory dark:bg-brand-dark border-b border-brand-charcoal/10 dark:border-brand-ivory/10 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-serif text-brand-charcoal dark:text-brand-ivory">Perbandingan Properti</h2>
            <button 
              onClick={() => setCompareModalOpen(false)}
              className="p-2 hover:bg-brand-charcoal/5 dark:hover:bg-brand-ivory/5 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {selectedProperties.map((property) => (
                <div key={property.id} className="relative bg-white dark:bg-brand-dark-surface rounded-xl overflow-hidden border border-brand-charcoal/10 dark:border-brand-ivory/10">
                  <button 
                    onClick={() => {
                      toggleProperty(property);
                      if (selectedProperties.length <= 2) setCompareModalOpen(false);
                    }}
                    className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="relative h-48 w-full">
                    <Image 
                      src={property.image} 
                      alt={property.name} 
                      fill 
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-xl mb-1">{property.name}</h3>
                    <p className="text-brand-gold font-medium mb-4">{property.price}</p>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-brand-charcoal/5 pb-2">
                        <span className="text-brand-charcoal/60 dark:text-brand-ivory/60">Tipe</span>
                        <span className="font-medium capitalize">{property.type}</span>
                      </div>
                      <div className="flex justify-between border-b border-brand-charcoal/5 pb-2">
                        <span className="text-brand-charcoal/60 dark:text-brand-ivory/60">Luas Tanah</span>
                        <span className="font-medium">{property.luasTanah} m²</span>
                      </div>
                      <div className="flex justify-between border-b border-brand-charcoal/5 pb-2">
                        <span className="text-brand-charcoal/60 dark:text-brand-ivory/60">Luas Bangunan</span>
                        <span className="font-medium">{property.luasBangunan} m²</span>
                      </div>
                      <div className="flex justify-between border-b border-brand-charcoal/5 pb-2">
                        <span className="text-brand-charcoal/60 dark:text-brand-ivory/60">Kamar Tidur</span>
                        <span className="font-medium">{property.kamarTidur}</span>
                      </div>
                      <div className="flex justify-between border-b border-brand-charcoal/5 pb-2">
                        <span className="text-brand-charcoal/60 dark:text-brand-ivory/60">Kamar Mandi</span>
                        <span className="font-medium">{property.kamarMandi}</span>
                      </div>
                      <div className="flex justify-between border-b border-brand-charcoal/5 pb-2">
                        <span className="text-brand-charcoal/60 dark:text-brand-ivory/60">Carport</span>
                        <span className="font-medium flex items-center"><Check className="w-4 h-4 text-[#1D9E75] mr-1" /> Ya</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span className="text-brand-charcoal/60 dark:text-brand-ivory/60">Dapur</span>
                        <span className="font-medium flex items-center">
                          {property.type === 'komersil' ? <Check className="w-4 h-4 text-[#1D9E75] mr-1" /> : <X className="w-4 h-4 text-red-500 mr-1" />}
                          {property.type === 'komersil' ? 'Ya' : 'Tidak'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
