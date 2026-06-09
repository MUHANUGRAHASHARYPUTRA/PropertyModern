'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, ArrowRight } from 'lucide-react';
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

    // Muncul pertama kali setelah 3 detik
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
      
      // Hilang otomatis setelah 6 detik
      setTimeout(() => setIsVisible(false), 6000);
    }, 3000);

    // Looping: Muncul setiap 45 detik, dan hilang setelah 6 detik
    const intervalTimer = setInterval(() => {
      setIsVisible(true);
      
      setTimeout(() => {
        setIsVisible(false);
      }, 6000);
    }, 45000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [activePromo, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true); // Jika di-close manual, jangan dimunculkan lagi sesi ini
  };

  if (!activePromo) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="fixed bottom-28 left-6 md:bottom-6 md:left-6 w-[85vw] md:w-80 bg-white rounded-2xl shadow-2xl flex items-start overflow-hidden z-[60] border border-brand-gold/20 cursor-pointer group"
          onClick={() => {
            const el = document.getElementById('komersil');
            if(el) el.scrollIntoView({ behavior: 'smooth' });
            setIsVisible(false);
          }}
        >
          {/* Aksen kiri */}
          <div className="w-1.5 bg-brand-gold self-stretch"></div>

          <div className="flex-1 p-4 flex gap-4">
            {/* Ikon */}
            <div className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
              <Bell size={18} className="animate-pulse" />
            </div>

            {/* Konten Text */}
            <div className="flex flex-col flex-1 mt-0.5">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">
                  {activePromo.badge}
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDismiss(); }} 
                  className="text-brand-charcoal/30 hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
                >
                  <X size={14} />
                </button>
              </div>
              <h4 className="font-bold text-brand-charcoal text-sm leading-tight mb-1">
                {activePromo.title}
              </h4>
              <p className="text-xs text-brand-charcoal/60 leading-snug line-clamp-2">
                {activePromo.content}
              </p>
              
              <div className="mt-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-gold group-hover:translate-x-1 transition-transform">
                Lihat Detail <ArrowRight size={10} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
