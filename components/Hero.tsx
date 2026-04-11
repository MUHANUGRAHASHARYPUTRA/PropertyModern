'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'motion/react';
import { Search, MapPin, ChevronDown, Home, Volume2, VolumeX } from 'lucide-react';
import { useCompareStore } from '@/lib/store';

export default function Hero() {
  const { searchQuery, setSearchQuery, searchType, setSearchType } = useCompareStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Menangani toggle suara secara manual
  const toggleAudio = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // Memastikan video tetap berjalan saat tombol ditekan
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  };

  const handleSearch = () => {
    const targetId = searchType === 'subsidi' ? '#subsidi' : searchType === 'komersil' ? '#komersil' : '#subsidi';
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover blur-[2px]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/40 to-transparent dark:from-brand-dark dark:via-brand-dark/60" />
      </motion.div>

      {/* Tombol Kontrol Suara Manual (Pojok Kanan Bawah) */}
      <div className="absolute bottom-8 left-8 z-30">
        <button
          onClick={toggleAudio}
          className="p-2 rounded-full bg-brand-ivory/10 backdrop-blur-md border border-brand-ivory/20 text-brand-ivory hover:bg-brand-gold hover:border-brand-gold transition-all duration-300 group"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          <AnimatePresence mode="wait">
            {isMuted ? (
              <motion.div
                key="muted"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <VolumeX className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="unmuted"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Volume2 className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Badge Unit */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/20 backdrop-blur-md border border-brand-gold/30 text-brand-ivory text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              Tersedia 120+ Unit
            </span>
          </motion.div>

          <motion.h1 
  variants={itemVariants} 
  className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-ivory mb-6 leading-[1.1] tracking-tight normal-case"
>
  Bukit Panaikang <br className="hidden md:block" />
  <span className="text-brand-gold italic font-light">Residence.</span>
</motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-brand-ivory/80 mb-12 max-w-2xl font-sans font-light tracking-wide">
            Temukan kenyamanan hidup di kawasan Moncongloe bebas banjir dan akses mudah ke pusat kota Makassar.
          </motion.p>

          {/* Search Bar */}
<motion.div 
  variants={itemVariants} 
  className="w-full max-w-3xl bg-white/10 backdrop-blur-xl dark:bg-black/20 p-4 md:p-2 rounded-3xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-4 md:gap-4 items-center border border-white/20"
>
  <div className="flex-1 flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 w-full border-b md:border-b-0 md:border-r border-white/10">
    <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
    <input 
      type="text" 
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Cari lokasi atau nama cluster..." 
      className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/60 font-medium"
    />
  </div>
  
  <div className="flex-1 flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 w-full">
    <Home className="w-5 h-5 text-brand-gold shrink-0" />
    <select 
      value={searchType}
      onChange={(e) => setSearchType(e.target.value)}
      className="w-full bg-transparent border-none outline-none text-white appearance-none cursor-pointer font-medium"
    >
      <option value="" className="text-brand-charcoal">Semua Tipe</option>
      <option value="subsidi" className="text-brand-charcoal">Subsidi</option>
      <option value="komersil" className="text-brand-charcoal">Komersil</option>
    </select>
    <ChevronDown className="w-4 h-4 text-white/60 shrink-0" />
  </div>

  <button 
    onClick={handleSearch}
    className="w-full md:w-auto px-8 py-4 bg-brand-gold text-white font-medium rounded-2xl md:rounded-full hover:bg-brand-gold/90 transition-all shadow-lg hover:shadow-brand-gold/20 flex items-center justify-center gap-2"
  >
    <Search className="w-5 h-5" />
    <span>Cari</span>
  </button>
</motion.div>
        </motion.div>
      </div>
    </section>
  );
}