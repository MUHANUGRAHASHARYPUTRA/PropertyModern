'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Hapus Home dari sini

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

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
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    
    if (targetId === 'home' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <motion.nav
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
          className="flex items-center gap-3 group cursor-pointer"
        >
          {/* LOGO PERUSAHAAN GANTIKAN IKON HOME */}
          <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
            <img 
              src="images/logo.png" // Pastikan path file benar di folder public
              alt="Alizah Property Logo"
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
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
          
          <a 
            href="#kontak"
            onClick={(e) => scrollToSection(e, '#kontak')}
            className="px-6 py-2.5 bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal text-sm font-medium rounded-full hover:bg-brand-gold transition-all cursor-pointer shadow-md"
          >
            Hubungi Kami
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-brand-charcoal dark:text-brand-ivory"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Sama seperti sebelumnya) */}
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
                href="https://wa.me/62895403047867"
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
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