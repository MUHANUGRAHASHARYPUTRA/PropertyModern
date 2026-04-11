'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Menu, X, Home, Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mencegah error hidrasi pada Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: 'Subsidi', href: '#subsidi' },
    { name: 'Komersil', href: '#komersil' },
    { name: 'Galeri', href: '#galeri' },
    { name: 'KPR', href: '#kpr' },
    { name: 'Lokasi', href: '#lokasi' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Tutup menu mobile terlebih dahulu
    setIsMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    
    if (targetId === 'home' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Berikan sedikit delay agar menu mobile tertutup sempurna sebelum scroll
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80; // Sesuaikan dengan tinggi navbar Anda
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback jika getElementById gagal, coba pakai querySelector
        const fallback = document.querySelector(href);
        if (fallback) {
          fallback.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
  };

  return (
    <motion.nav
      // Menggunakan style zIndex manual untuk memastikan berada di atas CustomCursor
      style={{ zIndex: 99999 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 bg-brand-ivory/80 dark:bg-brand-dark/80 backdrop-blur-md shadow-sm' 
          : 'py-6 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, '#home')} 
          className="flex items-center gap-2 group cursor-pointer"
        >
          <Home className="w-6 h-6 text-brand-gold group-hover:scale-110 transition-transform" />
          <span className="font-serif text-2xl font-medium tracking-wide text-brand-charcoal dark:text-brand-ivory">
            Alizah Property
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium hover:text-brand-gold transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-brand-charcoal/5 dark:hover:bg-brand-ivory/10 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-brand-gold" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          
          <a 
            href="#kontak"
            onClick={(e) => scrollToSection(e, '#kontak')}
            className="px-6 py-2.5 bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal text-sm font-medium rounded-full hover:bg-brand-gold transition-all cursor-pointer shadow-md"
          >
            Hubungi Kami
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-brand-gold" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-brand-charcoal dark:text-brand-ivory"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 bg-brand-ivory dark:bg-brand-dark border-t border-brand-charcoal/10 dark:border-brand-ivory/10 shadow-2xl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-lg font-medium py-3 border-b border-brand-charcoal/5 dark:border-brand-ivory/5 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <a 
  href="https://wa.me/62895403047867" // Ganti dengan nomor WhatsApp Anda
  target="_blank" 
  rel="noopener noreferrer"
  onClick={(e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Tutup menu mobile
    
    // Pesan otomatis yang akan muncul di chat
    const message = encodeURIComponent("Halo Alizah Property, saya ingin bertanya mengenai unit yang tersedia.");
    window.open(`https://wa.me/62895403047867?text=${message}`, '_blank');
  }}
  className="mt-4 px-6 py-4 bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal text-center font-medium rounded-xl cursor-pointer active:scale-95 transition-transform"
>
  Hubungi Kami via WhatsApp
</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}