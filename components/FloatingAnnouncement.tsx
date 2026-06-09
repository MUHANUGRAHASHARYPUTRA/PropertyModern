'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

export default function FloatingAnnouncement() {
  const [activePromo, setActivePromo] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchPromo = async () => {
      const { data: promo } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      setActivePromo(promo);
    };

    fetchPromo();
  }, []);

  useEffect(() => {
    if (!activePromo || isDismissed) return;

    // Muncul setelah 3.5 detik (menunggu PageLoader selesai)
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    return () => clearTimeout(initialTimer);
  }, [activePromo, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true); // Jangan muncul lagi di sesi ini
  };

  if (!activePromo) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-brand-charcoal/80 backdrop-blur-sm"
          onClick={handleDismiss} // Tutup jika area luar diklik
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()} // Jangan tutup kalau modal diklik
          >
            {/* Tombol Close Mengambang di atas gambar */}
            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 w-8 h-8 z-10 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors"
            >
              <X size={16} />
            </button>

            {/* Gambar Banner */}
            {activePromo.image_url ? (
              <div className="relative w-full aspect-[4/3] bg-brand-offwhite">
                <Image 
                  src={activePromo.image_url} 
                  alt={activePromo.title} 
                  fill 
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-32 bg-brand-gold flex items-center justify-center">
                <span className="text-white font-serif text-2xl tracking-widest uppercase">Special Promo</span>
              </div>
            )}

            {/* Konten Text */}
            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              <span className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                {activePromo.badge}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-brand-charcoal leading-tight mb-3">
                {activePromo.title}
              </h3>
              <p className="text-sm text-brand-charcoal/60 leading-relaxed mb-6">
                {activePromo.content}
              </p>
              
              <button 
                onClick={() => {
                  handleDismiss();
                  const el = document.getElementById('komersil');
                  if(el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 bg-brand-charcoal text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors flex items-center justify-center gap-2"
              >
                Lihat Penawaran Sekarang <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
