'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useTheme } from 'next-themes';
import { Menu, X, Home, Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setMounted(true), []);

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
    const element = document.querySelector(href);
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
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 bg-brand-ivory/80 dark:bg-brand-dark/80 backdrop-blur-md shadow-sm' 
          : 'py-6 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-2 group">
          <Home className="w-6 h-6 text-brand-gold group-hover:scale-110 transition-transform" />
          <span className="font-serif text-2xl font-medium tracking-wide text-brand-charcoal dark:text-brand-ivory">
            grand estate
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium hover:text-brand-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-brand-charcoal/5 dark:hover:bg-brand-ivory/10 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          
          <a 
            href="#kontak"
            onClick={(e) => scrollToSection(e, '#kontak')}
            className="px-6 py-2.5 bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal text-sm font-medium rounded-full hover:bg-brand-gold dark:hover:bg-brand-gold hover:text-white transition-colors"
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
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`md:hidden absolute top-full left-0 right-0 bg-brand-ivory dark:bg-brand-dark border-t border-brand-charcoal/10 dark:border-brand-ivory/10 overflow-hidden`}
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
      >
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-lg font-medium py-2 border-b border-brand-charcoal/5 dark:border-brand-ivory/5"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#kontak"
            onClick={(e) => scrollToSection(e, '#kontak')}
            className="mt-4 px-6 py-3 bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal text-center font-medium"
          >
            Hubungi Kami
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}
