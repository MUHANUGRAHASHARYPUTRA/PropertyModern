'use client';

import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'angga',
    unit: 'Subsidi',
    text: 'Proses KPR sangat dibantu oleh tim marketing. Lingkungannya asri dan tetangga ramah. Sangat cocok untuk keluarga muda seperti kami.',
    rating: 5,
    image: '/images/angga.png'
  },
  {
    id: 2,
    name: 'Ali',
    unit: 'Komersil',
    text: 'Kualitas bangunan premium dan desainnya sangat modern. Nilai investasi naik cukup signifikan dalam setahun terakhir. Sangat puas!',
    rating: 5,
    image: '/images/ali.jpg'
  },
  {
    id: 3,
    name: 'Keluarga Abubakar',
    unit: 'Subsidi & Komersil',
    text: 'Fasilitas lengkap, bebas banjir,dekat dengan sekolah anak dan pusat perbelanjaan.',
    rating: 4,
    image: '/images/abubakar.jpg'
  }
];

export default function Testimonial() {
  return (
    <section className="py-24 bg-brand-charcoal text-brand-ivory">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            cerita <span className="text-brand-gold italic">mereka</span>
          </h2>
          <p className="text-brand-ivory/70">
            Kebahagiaan penghuni adalah prioritas utama kami. Simak pengalaman mereka yang telah menjadi bagian dari keluarga Alizah Property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, index) => (
            <motion.div 
              key={testi.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-ivory/5 border border-brand-ivory/10 p-8 rounded-2xl relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-gold/20" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < testi.rating ? 'text-brand-gold fill-brand-gold' : 'text-brand-ivory/20'}`} />
                ))}
              </div>

              <p className="text-brand-ivory/80 mb-8 leading-relaxed italic">
                &quot;{testi.text}&quot;
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold">
                  <Image src={testi.image} alt={testi.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-medium">{testi.name}</h4>
                  <p className="text-xs text-brand-gold">{testi.unit}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
