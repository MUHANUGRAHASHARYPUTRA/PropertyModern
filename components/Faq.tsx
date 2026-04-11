'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Apa saja syarat pengajuan KPR Subsidi?',
    a: 'Syarat utama meliputi: WNI usia min 21 tahun/sudah menikah, belum pernah memiliki rumah, gaji pokok maksimal Rp 8 juta/bulan, masa kerja min 1 tahun, dan memiliki NPWP.'
  },
  {
    q: 'Berapa lama proses persetujuan KPR?',
    a: 'Proses persetujuan bank biasanya memakan waktu 7-14 hari kerja setelah seluruh dokumen persyaratan dinyatakan lengkap.'
  },
  {
    q: 'Apakah bisa menggunakan BPJS Ketenagakerjaan untuk DP?',
    a: 'Ya, Anda bisa menggunakan fasilitas MLT (Manfaat Layanan Tambahan) BPJS Ketenagakerjaan untuk bantuan Uang Muka perumahan.'
  },
  {
    q: 'Apa perbedaan unit Subsidi dan Komersil?',
    a: 'Unit subsidi ditujukan untuk MBR (Masyarakat Berpenghasilan Rendah) dengan harga dan bunga yang ditetapkan pemerintah. Unit komersil memiliki spesifikasi bangunan lebih tinggi, luasan lebih besar, dan harga mengikuti pasar.'
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-brand-ivory dark:bg-brand-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-brand-ivory mb-6">
              pertanyaan <span className="text-brand-gold italic">umum</span>
            </h2>
            <p className="text-brand-charcoal/70 dark:text-brand-ivory/70 mb-8">
              Temukan jawaban untuk pertanyaan yang sering diajukan seputar proses pembelian rumah, KPR, dan fasilitas Bukit Panaikang Residence.
            </p>
            
            <div className="bg-brand-offwhite dark:bg-brand-dark-surface p-6 rounded-2xl border border-brand-charcoal/5 dark:border-brand-ivory/5">
              <h4 className="font-serif text-xl mb-2">Masih punya pertanyaan?</h4>
              <p className="text-sm text-brand-charcoal/70 dark:text-brand-ivory/70 mb-6">Tim konsultan kami siap membantu Anda 24/7.</p>
              <a 
  href="https://wa.me/62895403047867?text=Halo%20Alizah%20Property%2C%20saya%20ingin%20bertanya%20mengenai%20perumahan%20Bukit%20Panaikang%20Residence."
  target="_blank" 
  rel="noopener noreferrer"
  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20bd5a] transition-all hover:scale-[1.02] shadow-sm"
>
  <MessageCircle className="w-5 h-5" />
  Chat WhatsApp
</a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-colors ${
                  openIndex === index 
                    ? 'border-brand-gold bg-brand-gold/5' 
                    : 'border-brand-charcoal/10 dark:border-brand-ivory/10 bg-white dark:bg-brand-dark-surface'
                }`}
              >
                <button
                  className="w-full px-6 py-5 flex justify-between items-center text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium text-lg pr-8">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 ${openIndex === index ? 'text-brand-gold' : 'text-brand-charcoal/50 dark:text-brand-ivory/50'}`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-brand-charcoal/70 dark:text-brand-ivory/70 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
