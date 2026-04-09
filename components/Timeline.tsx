'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Calendar } from 'lucide-react';

const timeline = [
  { phase: 'Perencanaan', date: 'Jan 2025', status: 'completed', desc: 'Desain arsitektur dan masterplan kawasan.' },
  { phase: 'Perizinan', date: 'Mar 2025', status: 'completed', desc: 'Persetujuan legalitas dan IMB.' },
  { phase: 'Konstruksi', date: 'Jun 2025', status: 'current', desc: 'Pembangunan infrastruktur dan unit tahap 1.' },
  { phase: 'Serah Terima', date: 'Des 2025', status: 'upcoming', desc: 'Penyerahan kunci kepada pemilik.' },
];

export default function Timeline() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const text = `Halo Grand Estate, saya ingin berlangganan notifikasi update progres pembangunan. Email saya: ${email}`;
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/62895403047867?text=${encodedText}`;
    
    window.open(waUrl, '_blank');
    setEmail(''); // Reset form
  };

  return (
    <section className="py-24 bg-brand-ivory dark:bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-brand-ivory mb-4">
            progress <span className="text-brand-gold italic">pembangunan</span>
          </h2>
          <p className="text-brand-charcoal/70 dark:text-brand-ivory/70">
            Transparansi adalah komitmen kami. Pantau perkembangan proyek Grand Estate secara real-time.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-charcoal/10 dark:bg-brand-ivory/10 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Icon */}
                <div className="absolute left-0 md:left-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-brand-ivory dark:border-brand-dark bg-white dark:bg-brand-dark-surface flex items-center justify-center transform -translate-x-0 md:-translate-x-1/2 z-10 shadow-sm mt-4 md:mt-0">
                  {item.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#1D9E75]" />
                  ) : item.status === 'current' ? (
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-brand-gold animate-pulse" />
                  ) : (
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-brand-charcoal/30 dark:text-brand-ivory/30" />
                  )}
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                  <div className={`p-6 rounded-2xl border ${item.status === 'current' ? 'border-brand-gold bg-brand-gold/5 shadow-md' : 'border-brand-charcoal/5 dark:border-brand-ivory/5 bg-white dark:bg-brand-dark-surface'}`}>
                    <span className={`text-xs font-bold tracking-wider uppercase mb-2 block ${item.status === 'completed' ? 'text-[#1D9E75]' : item.status === 'current' ? 'text-brand-gold' : 'text-brand-charcoal/50 dark:text-brand-ivory/50'}`}>
                      {item.date}
                    </span>
                    <h4 className="text-xl font-serif mb-2">{item.phase}</h4>
                    <p className="text-sm text-brand-charcoal/70 dark:text-brand-ivory/70">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <form 
            onSubmit={handleSubscribe}
            className="inline-flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-brand-dark-surface p-2 pr-2 md:pr-2 pl-6 rounded-3xl md:rounded-full shadow-md border border-brand-charcoal/5 dark:border-brand-ivory/5"
          >
            <span className="text-sm font-medium text-brand-charcoal/70 dark:text-brand-ivory/70 py-2 md:py-0">Dapatkan notifikasi update via email</span>
            <div className="flex w-full md:w-auto bg-brand-offwhite dark:bg-brand-dark rounded-full p-1">
              <input 
                type="email" 
                required 
                placeholder="Email Anda" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none outline-none px-4 py-2 w-full md:w-48 text-sm" 
              />
              <button type="submit" className="bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal px-6 py-2 rounded-full text-sm font-medium hover:bg-brand-gold dark:hover:bg-brand-gold hover:text-white transition-colors">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
