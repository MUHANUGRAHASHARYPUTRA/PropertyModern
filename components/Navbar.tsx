'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { signOut } from '@/app/auth/actions';
import Link from 'next/link';
import { Bell, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [activePromo, setActivePromo] = useState<any>(null);
  const { scrollY } = useScroll();
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      // Fetch user & profile
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(profile);
      }

      // Fetch active announcement
      const { data: promo } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      setActivePromo(promo);
    };
    getData();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(profile);
      } else {
        setProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  const navLinks = [
    { name: 'Subsidi', href: '#subsidi' },
    { name: 'Komersil', href: '#komersil' },
    { name: 'Galeri', href: '#galeri' },
    { name: 'KPR', href: '#kpr' },
    { name: 'Lokasi', href: '#lokasi' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, href: string) => {
    if (!href.startsWith('#')) return; // Allow normal links
    
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
      } else {
          // If element not found (e.g. on dashboard), go to home first then scroll? 
          // For now just navigate if it's not on the main page
          window.location.href = '/' + href;
      }
    }, 100);
  };

  return (
    <motion.nav
      style={{ zIndex: 99999 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'py-3 bg-brand-ivory/10 dark:bg-brand-dark/10 backdrop-blur-md shadow-sm border-b border-brand-gold/5' 
          : 'bg-transparent border-b border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      {/* Integrated Promo Banner */}
      <AnimatePresence>
        {activePromo && !isScrolled && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-brand-charcoal text-white py-2 px-6 overflow-hidden border-b border-brand-gold/10"
          >
            <div className="container mx-auto flex items-center justify-center gap-4 text-center">
              <span className="px-1.5 py-0.5 bg-brand-gold text-brand-charcoal text-[8px] font-black uppercase rounded">
                {activePromo.badge}
              </span>
              <p className="text-[10px] md:text-xs font-medium truncate">
                <span className="text-brand-gold font-bold">{activePromo.title}</span> {activePromo.content}
              </p>
              <ArrowRight className="w-3 h-3 text-brand-gold animate-bounce-x" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`container mx-auto px-6 md:px-12 flex justify-between items-center ${isScrolled ? '' : 'py-4'}`}>
        {/* Logo & Brand */}
        <Link 
          href="/" 
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
        </Link>

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
          
          {user ? (
              <div className="flex items-center gap-4 border-l border-brand-charcoal/10 dark:border-brand-ivory/10 pl-8">
                  <Link 
                    href={profile?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-brand-charcoal dark:hover:text-brand-ivory transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <form action={signOut}>
                      <button type="submit" className="text-brand-charcoal/40 dark:text-brand-ivory/40 hover:text-red-500 transition-colors">
                          <LogOut className="w-5 h-5" />
                      </button>
                  </form>
              </div>
          ) : (
            <Link 
              href="/login"
              className={`transition-all duration-500 font-medium rounded-full shadow-md ${
                isScrolled 
                  ? 'px-6 py-2 bg-brand-gold text-white text-xs' 
                  : 'px-8 py-2.5 bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal text-sm'
              }`}
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {user && (
              <Link href={profile?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} className="text-brand-gold">
                  <UserIcon className="w-6 h-6" />
              </Link>
          )}
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
              
              {!user ? (
                  <Link 
                    href="/login" 
                    className="mt-4 px-6 py-4 bg-brand-gold text-white text-center font-bold rounded-xl"
                  >
                    Login / Register
                  </Link>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                    <Link 
                      href={profile?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}
                      className="px-6 py-4 bg-brand-gold text-white text-center font-bold rounded-xl"
                    >
                      Dashboard
                    </Link>
                    <form action={signOut} className="w-full">
                        <button type="submit" className="w-full px-6 py-4 bg-red-500/10 text-red-500 font-bold rounded-xl">
                            Log Out
                        </button>
                    </form>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}