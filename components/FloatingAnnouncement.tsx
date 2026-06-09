'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X } from 'lucide-react';
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
    <div className="fixed top-24 left-0 right-0 flex justify-center z-[60] pointer-events-none px-4">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="bg-brand-charcoal text-white rounded-full shadow-xl border border-brand-gold/20 flex items-center p-1.5 pr-2 pointer-events-auto cursor-pointer max-w-full"
            onClick={() => {
              const el = document.getElementById('komersil');
              if(el) el.scrollIntoView({ behavior: 'smooth' });
              setIsVisible(false);
            }}
          >
            {/* Ikon Lonceng di dalam lingkaran */}
            <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-charcoal flex items-center justify-center shrink-0">
              <Bell size={14} className="animate-pulse" />
            </div>

            {/* Teks Singkat */}
            <div className="ml-3 mr-4 flex flex-col justify-center">
              <span className="text-[9px] text-brand-gold font-bold uppercase tracking-widest leading-none mb-1">
                {activePromo.badge}
              </span>
              <span className="text-xs font-medium truncate max-w-[180px] md:max-w-[250px] leading-tight">
                {activePromo.title}
              </span>
            </div>

            {/* Tombol Tutup */}
            <button 
              onClick={(e) => { e.stopPropagation(); handleDismiss(); }} 
              className="p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors ml-auto"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
