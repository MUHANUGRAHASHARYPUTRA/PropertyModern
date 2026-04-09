'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ShieldCheck, Award, Users, Home } from 'lucide-react';

const stats = [
  { id: 1, label: 'Unit Terjual', value: 850, suffix: '+', icon: Home },
  { id: 2, label: 'Tahun Berdiri', value: 15, suffix: '', icon: Award },
  { id: 3, label: 'Kepuasan Pelanggan', value: 98, suffix: '%', icon: Users },
  { id: 4, label: 'Mitra Bank', value: 12, suffix: '+', icon: ShieldCheck },
];

function Counter({ from, to, duration = 2, inView }: { from: number, to: number, duration?: number, inView: boolean }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * (to - from) + from));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [from, to, duration, inView]);

  return <span>{count}</span>;
}

export default function Statistik() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-brand-charcoal text-brand-ivory relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#C9A96E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center mb-6 text-brand-gold">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-4xl md:text-5xl font-serif font-bold mb-2 flex items-center justify-center">
                <Counter from={0} to={stat.value} inView={isInView} />
                <span className="text-brand-gold">{stat.suffix}</span>
              </div>
              <p className="text-brand-ivory/70 text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 pt-10 border-t border-brand-ivory/10 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
        >
          {/* Simulated Logos */}
          <div className="text-xl font-bold font-serif">PUPR</div>
          <div className="text-xl font-bold font-serif">TAPERA</div>
          <div className="text-xl font-bold font-serif">REI</div>
          <div className="text-xl font-bold font-serif flex items-center gap-2"><ShieldCheck className="w-5 h-5"/> SHM GUARANTEE</div>
        </motion.div>
      </div>
    </section>
  );
}
