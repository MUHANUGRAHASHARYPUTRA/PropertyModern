'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-brand-ivory dark:bg-brand-dark overflow-hidden"
        >
          {/* Garis Dekoratif - Delay dipercepat ke 0.1s */}
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: "circOut", delay: 0.1 }}
            className="absolute left-1/2 w-[1px] h-32 bg-brand-gold/20 -translate-x-1/2 top-0"
          />

          <div className="relative flex flex-col items-center">
            {/* Logo Icon - Delay dipercepat ke 0.1s agar langsung muncul */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              className="relative mb-8"
            >
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 100 100" 
                fill="none" 
                className="text-brand-gold"
              >
                <motion.path
                  d="M20 80V30L50 10L80 30V80"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                />
                <motion.path
                  d="M20 50H80"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ delay: 0.6, duration: 1 }}
                />
              </svg>
            </motion.div>

            {/* Nama Brand - Muncul lebih awal (delay 0.3s) tapi gerakan tetap lambat */}
            <div className="overflow-hidden">
              <motion.h1 
                className="text-4xl md:text-5xl font-serif tracking-widest text-brand-charcoal dark:text-brand-ivory uppercase"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
              >
                Alizah
              </motion.h1>
            </div>

            {/* Sub-teks - Delay dipercepat ke 0.7s */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="mt-2 flex items-center gap-4"
            >
              <div className="h-[1px] w-8 bg-brand-gold"></div>
              <p className="text-xs tracking-[0.3em] font-light text-brand-gold uppercase">
                Property
              </p>
              <div className="h-[1px] w-8 bg-brand-gold"></div>
            </motion.div>
          </div>

          {/* Garis Dekoratif Bawah */}
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: "circOut", delay: 0.1 }}
            className="absolute left-1/2 w-[1px] h-32 bg-brand-gold/20 -translate-x-1/2 bottom-0"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}