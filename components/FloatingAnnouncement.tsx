'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

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
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="relative w-full max-w-[85vw] md:max-w-md flex flex-col items-center justify-center cursor-default bg-transparent"
            onClick={(e) => e.stopPropagation()} // Jangan tutup kalau modal diklik
          >
            {/* Tombol Close Mengambang di luar bingkai */}
            <button 
              onClick={handleDismiss}
              className="absolute -top-12 right-0 md:-right-8 w-10 h-10 z-50 flex items-center justify-center bg-white/10 hover:bg-white/30 border border-white/20 text-white rounded-full backdrop-blur-md transition-all shadow-xl"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center w-full gap-4 relative">
              
              {/* Gambar / Video Banner (Tanpa Bingkai) */}
              {activePromo.image_url ? (
                <div className="w-full relative flex justify-center drop-shadow-2xl">
                  <img 
                    src={activePromo.image_url} 
                    alt={activePromo.title} 
                    className="w-full max-h-[55vh] object-contain drop-shadow-2xl"
                  />
                </div>
              ) : (
                <div className="w-full h-32 rounded-3xl bg-gradient-to-r from-brand-gold to-yellow-600 flex items-center justify-center shadow-2xl">
                  <span className="text-white font-serif text-2xl tracking-widest uppercase drop-shadow-lg">Special Promo</span>
                </div>
              )}

              {/* Konten Teks (Glassmorphism Transparan) */}
              <div className="w-full p-5 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 text-center text-white shadow-2xl flex flex-col items-center">
                <span className="px-4 py-1.5 bg-brand-gold text-brand-charcoal text-[10px] font-black uppercase tracking-widest rounded-full mb-3 shadow-lg">
                  {activePromo.badge}
                </span>
                
                <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight mb-2 drop-shadow-md">
                  {activePromo.title}
                </h3>
                
                {activePromo.content && (
                  <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-5 drop-shadow-sm">
                    {activePromo.content}
                  </p>
                )}
                
                <button 
                  onClick={() => {
                    handleDismiss();
                    const el = document.getElementById('komersil');
                    if(el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-4 bg-gradient-to-r from-brand-gold to-yellow-500 text-brand-charcoal rounded-2xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/30"
                >
                  Cek Sekarang <ArrowRight size={14} className="animate-bounce-x" />
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
