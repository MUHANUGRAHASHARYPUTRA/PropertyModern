'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function FloatingAnnouncement() {
  const [activePromo, setActivePromo] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
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

  if (!activePromo) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 p-4 rounded-full bg-brand-charcoal text-brand-gold shadow-2xl hover:bg-opacity-90 transition-all z-50 ${(isOpen) ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Pengumuman"
      >
        <Bell size={24} />
        {/* Pulsing Dot */}
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-gold border border-brand-charcoal"></span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9, originX: 0, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="fixed bottom-6 left-6 w-72 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-brand-charcoal/10"
          >
            <div className="p-4 bg-brand-charcoal text-brand-gold flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-2">
                <Bell size={18} />
                <h3 className="font-serif font-semibold text-base tracking-wide">Info Terbaru</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-brand-gold/80 hover:text-brand-gold transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-3 bg-brand-ivory">
              <span className="self-start px-2.5 py-1 bg-brand-gold/15 text-brand-gold text-[10px] font-black uppercase tracking-wider rounded-md">
                {activePromo.badge}
              </span>
              <h4 className="font-bold text-brand-charcoal text-[15px] leading-snug">
                {activePromo.title}
              </h4>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                {activePromo.content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
