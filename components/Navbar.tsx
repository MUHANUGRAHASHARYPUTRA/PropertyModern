'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Navbar bertransformasi setelah scroll lebih dari 10px
    setIsScrolled(latest > 10);
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

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <motion.nav
      style={{ zIndex: 99999 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'py-3 bg-brand-ivory/10 dark:bg-brand-dark/10 backdrop-blur-md shadow-sm border-b border-brand-gold/5' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo & Brand - Font asli tetap dipertahankan */}
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, '#home')} 
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <img 
              src="/images/logo.png"
              alt="Alizah Property Logo"
              className={`w-full h-full object-contain transition-transform duration-500 ${
                isScrolled ? 'scale-90' : 'scale-110'
              }`}
            />
          </div>
          
          <span className={`font-serif font-medium tracking-wide transition-all duration-500 ${
            isScrolled ? 'text-xl' : 'text-2xl'
          } text-brand-charcoal dark:text-brand-ivory`}>
            Alizah <span className="text-brand-gold italic">Property</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-brand-charcoal dark:text-brand-ivory">
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
            className={`transition-all duration-500 font-medium rounded-full shadow-md ${
              isScrolled 
                ? 'px-5 py-2 bg-brand-gold text-white text-xs' 
                : 'px-6 py-2.5 bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal text-sm'
            }`}
          >
            Hubungi Kami
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isScrolled 
                ? 'text-brand-charcoal dark:text-brand-ivory bg-transparent' 
                : 'text-brand-ivory bg-brand-charcoal/50 backdrop-blur-sm'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 bg-brand-ivory/95 dark:bg-brand-dark/95 backdrop-blur-xl border-t border-brand-charcoal/10 dark:border-brand-ivory/10 shadow-2xl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="flex flex-col p-6 gap-2 text-brand-charcoal dark:text-brand-ivory">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-lg font-medium py-3 border-b border-brand-charcoal/5 dark:border-brand-ivory/5"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => window.open('https://wa.me/62895403047867', '_blank')}
                className="mt-4 px-6 py-4 bg-brand-gold text-white text-center font-bold rounded-xl"
              >
                WhatsApp Sekarang
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}