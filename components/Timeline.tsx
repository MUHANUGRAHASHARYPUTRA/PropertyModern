'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Calendar, Send } from 'lucide-react';

const timeline = [
  { phase: 'Perencanaan', date: 'Jan 2018', status: 'completed', desc: 'Desain arsitektur dan masterplan kawasan.' },
  { phase: 'Perizinan', date: 'Mar 2019', status: 'completed', desc: 'Persetujuan legalitas dan IMB.' },
  { phase: 'Konstruksi', date: 'Jun 2020-2026', status: 'completed', desc: 'Pembangunan infrastruktur dan unit.' },
  { phase: 'Serah Terima', date: 'Des 2020-2026', status: 'current', desc: 'Penyerahan kunci kepada pemilik.' },
];

export default function Timeline() {
  const [email, setEmail] = useState('');
  const targetEmail = "anugrahasharyabubakar@gmail.com"; 

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Langganan Update Progres Properti");
    const body = encodeURIComponent(`Halo Tim Bukit Panaikang,\n\nSaya ingin berlangganan update progres pembangunan terbaru.\n\nEmail saya: ${email}\n\nTerima kasih.`);
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-16 md:py-24 bg-brand-ivory dark:bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-5 md:px-12">
        
        {/* HEADER - Lebih responsif */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-serif text-brand-charcoal dark:text-brand-ivory mb-4 lowercase tracking-tight"
          >
            progress <span className="text-brand-gold italic">pembangunan</span>
          </motion.h2>
          <p className="text-sm md:text-base text-brand-charcoal/70 dark:text-brand-ivory/70 leading-relaxed">
            Transparansi adalah komitmen kami. Pantau perkembangan proyek Perumahan Bukit Panaikang Residence secara berkala.
          </p>
        </div>

        {/* TIMELINE SECTION */}
        <div className="relative max-w-4xl mx-auto">
          {/* Garis Tengah - Disesuaikan untuk mobile (tetap di kiri) */}
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[1px] bg-brand-charcoal/10 dark:bg-brand-ivory/10 transform md:-translate-x-1/2" />

          <div className="space-y-10 md:space-y-16">
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Icon Status - Ukuran lebih proporsional di mobile */}
                <div className="absolute left-0 md:left-1/2 w-9 h-9 md:w-12 md:h-12 rounded-full border-2 border-brand-ivory dark:border-brand-dark bg-white dark:bg-brand-dark-surface flex items-center justify-center transform -translate-x-0 md:-translate-x-1/2 z-10 shadow-sm">
                  {item.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#1D9E75]" />
                  ) : item.status === 'current' ? (
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-brand-gold animate-pulse" />
                  ) : (
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-brand-charcoal/30 dark:text-brand-ivory/30" />
                  )}
                </div>

                {/* Content Card - Padding & Text disesuaikan */}
                <div className={`pl-12 md:pl-0 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}>
                  <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${
                    item.status === 'current' 
                      ? 'border-brand-gold bg-brand-gold/5 shadow-lg shadow-brand-gold/5' 
                      : 'border-brand-charcoal/5 dark:border-brand-ivory/5 bg-white/50 dark:bg-brand-dark-surface/50 backdrop-blur-sm'
                  }`}>
                    <span className={`text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1 block ${
                      item.status === 'completed' ? 'text-[#1D9E75]' : item.status === 'current' ? 'text-brand-gold' : 'text-brand-charcoal/40'
                    }`}>
                      {item.date}
                    </span>
                    <h4 className="text-lg md:text-xl font-serif mb-1.5 text-brand-charcoal dark:text-brand-ivory lowercase">
                      {item.phase}
                    </h4>
                    <p className="text-xs md:text-sm text-brand-charcoal/60 dark:text-brand-ivory/60 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FORM SECTION - Diperbaiki untuk Mobile agar tidak overflow */}
        <div className="mt-20 md:mt-28 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block w-full max-w-xl"
          >
            <form 
              onSubmit={handleSubscribe}
              className="flex flex-col md:flex-row items-center gap-3 bg-white dark:bg-brand-dark-surface p-2 md:p-2 rounded-3xl md:rounded-full shadow-xl border border-brand-charcoal/5"
            >
              <div className="flex-1 w-full flex flex-col md:flex-row items-center pl-4 pr-2">
                <span className="text-[11px] md:text-sm font-medium text-brand-charcoal/50 dark:text-brand-ivory/50 whitespace-nowrap mb-2 md:mb-0 md:mr-4 lowercase">
                  update via email
                </span>
                <input 
                  type="email" 
                  required 
                  placeholder="Email Anda" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-brand-offwhite dark:bg-brand-dark px-5 py-3 md:py-2.5 rounded-full md:bg-transparent border-none outline-none w-full text-sm text-brand-charcoal dark:text-brand-ivory placeholder:text-brand-charcoal/30" 
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full md:w-auto bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal px-8 py-3.5 md:py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-gold dark:hover:bg-brand-gold hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                Subscribe
              </button>
            </form>
            
            <p className="mt-6 text-[9px] md:text-[10px] text-brand-charcoal/40 dark:text-brand-ivory/40 uppercase tracking-[0.2em]">
              *Membuka aplikasi email default perangkat anda
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}