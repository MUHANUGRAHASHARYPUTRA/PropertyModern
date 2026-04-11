'use client';

import { motion } from 'framer-motion';

// DATA TESTIMONI
const youtubeTestimonials = [
  { id: 1, name: 'AlizahProperty', unit: 'Commercial', ytId: '7IUIQtTuhGE' },
  
];

const instagramTestimonials = [
  { id: 1, name: '@alizah_property', unit: 'Progress Cluster', postCode: 'DIqYWkIRVwh' },
];

const tiktokTestimonials = [
  { id: 1, name: 'alizah.property', unit: 'Promo Hunian', videoId: '7506838238745726215' },
];

export default function SocialTestimonials() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 bg-brand-offwhite dark:bg-brand-dark-surface">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-brand-ivory mb-4 lowercase tracking-tight">
            social <span className="text-brand-gold italic">testimoni</span>
          </h2>
          <p className="text-brand-charcoal/70 dark:text-brand-ivory/70">
            Cerita nyata dari mereka yang telah menemukan hunian impian bersama kami.
          </p>
        </div>

        {/* GRID UTAMA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* KOLOM YOUTUBE */}
          <div className="space-y-8">
            <h3 className="text-xl font-serif text-brand-gold mb-6 uppercase tracking-widest border-b border-brand-gold/20 pb-2">YouTube</h3>
            {youtubeTestimonials.map((item) => (
              <motion.div 
                key={item.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants}
                className="bg-white dark:bg-brand-dark rounded-2xl overflow-hidden shadow-xl border border-brand-charcoal/5"
              >
                <div className="relative pb-[56.25%] bg-black">
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${item.ytId}?rel=0`}
                    allowFullScreen
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-lg text-brand-charcoal dark:text-brand-ivory">{item.name}</h4>
                  <p className="text-xs text-brand-gold font-bold uppercase">{item.unit}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* KOLOM INSTAGRAM */}
          <div className="space-y-8">
            <h3 className="text-xl font-serif text-brand-gold mb-6 uppercase tracking-widest border-b border-brand-gold/20 pb-2">Instagram</h3>
            {instagramTestimonials.map((item) => (
              <motion.div 
                key={item.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants}
                className="bg-white dark:bg-brand-dark rounded-2xl overflow-hidden shadow-xl border border-brand-charcoal/5"
              >
                <div className="w-full aspect-[4/5] bg-brand-offwhite">
                  <iframe
                    src={`https://www.instagram.com/p/${item.postCode}/embed`}
                    className="w-full h-full border-0"
                    allowTransparency
                  ></iframe>
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-lg text-brand-charcoal dark:text-brand-ivory">{item.name}</h4>
                  <p className="text-xs text-brand-gold font-bold uppercase">{item.unit}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* KOLOM TIKTOK */}
          <div className="space-y-8">
            <h3 className="text-xl font-serif text-brand-gold mb-6 uppercase tracking-widest border-b border-brand-gold/20 pb-2">TikTok</h3>
            {tiktokTestimonials.map((item) => (
              <motion.div 
                key={item.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants}
                className="bg-white dark:bg-brand-dark rounded-2xl overflow-hidden shadow-xl border border-brand-charcoal/5"
              >
                <div className="w-full aspect-[9/16] bg-black">
                  <iframe
                    src={`https://www.tiktok.com/embed/v2/${item.videoId}`}
                    className="w-full h-full border-0"
                    allow="fullscreen"
                  ></iframe>
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-lg text-brand-charcoal dark:text-brand-ivory">{item.name}</h4>
                  <p className="text-xs text-brand-gold font-bold uppercase">{item.unit}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}