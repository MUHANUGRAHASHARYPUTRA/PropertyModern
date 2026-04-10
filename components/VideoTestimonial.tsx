'use client';

import { motion } from 'motion/react';

const videoTestimonials = [
  {
    id: 1,
    name: 'Keluarga Pratama',
    unit: 'The Signature Villa',
    youtubeId: 'LXb3EKWsInQ', // Placeholder YouTube ID
  },
  {
    id: 2,
    name: 'Sarah & Budi',
    unit: 'Cluster Asri 1',
    youtubeId: 'aqz-KE-bpKQ', // Placeholder YouTube ID
  },
  {
    id: 3,
    name: 'Andi Wijaya',
    unit: 'Grand Boulevard',
    youtubeId: 'tgbNymZ7vqY', // Placeholder YouTube ID
  }
];

export default function VideoTestimonial() {
  return (
    <section className="py-24 bg-brand-offwhite dark:bg-brand-dark-surface">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-brand-ivory mb-4">
            video <span className="text-brand-gold italic">testimoni</span>
          </h2>
          <p className="text-brand-charcoal/70 dark:text-brand-ivory/70">
            Tonton langsung pengalaman nyata dari para penghuni yang telah mempercayakan hunian mereka kepada Grand Estate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoTestimonials.map((testi, index) => (
            <motion.div 
              key={testi.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-brand-dark rounded-2xl overflow-hidden shadow-lg border border-brand-charcoal/5 dark:border-brand-ivory/5"
            >
              <div className="relative aspect-video w-full bg-black">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${testi.youtubeId}`} 
                  title={`Testimoni ${testi.name}`} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="p-6">
                <h4 className="font-serif text-xl mb-1">{testi.name}</h4>
                <p className="text-sm text-brand-gold font-medium">{testi.unit}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
