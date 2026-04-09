'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Building2, Percent, Calendar } from 'lucide-react';

const banks = [
  { name: 'BTN', rate: 6.99, type: 'Komersil (Fix 2 Thn)' },
  { name: 'BRI', rate: 6.50, type: 'Komersil' },
  { name: 'BNI', rate: 6.75, type: 'Komersil' },
  { name: 'Mandiri', rate: 6.50, type: 'Komersil' },
  { name: 'BSI', rate: 5.00, type: 'Syariah' },
  { name: 'Bank Kalsel', rate: 7.00, type: 'Komersil' },
];

export default function Kpr() {
  const [harga, setHarga] = useState(380000000);
  const [dpAmount, setDpAmount] = useState(5500000);
  const [tenor, setTenor] = useState(15);
  const [bunga, setBunga] = useState(6.99);

  const pokokKredit = harga - dpAmount;
  const bungaPerBulan = bunga / 100 / 12;
  const totalBulan = tenor * 12;
  
  // Rumus Anuitas: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  const cicilan = pokokKredit * (bungaPerBulan * Math.pow(1 + bungaPerBulan, totalBulan)) / (Math.pow(1 + bungaPerBulan, totalBulan) - 1);

  const formatRupiah = (angka: number) => {
    return `Rp ${Math.round(angka).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const handleAjukanKPR = () => {
    const text = `Halo Grand Estate, saya ingin mengajukan KPR dengan rincian simulasi berikut:\n\n- Harga Properti: ${formatRupiah(harga)}\n- Uang Muka (DP): ${formatRupiah(dpAmount)}\n- Pokok Kredit: ${formatRupiah(pokokKredit)}\n- Tenor: ${tenor} Tahun\n- Suku Bunga: ${bunga}% per tahun\n- Estimasi Cicilan: ${formatRupiah(cicilan)} per bulan\n\nMohon informasi lebih lanjut mengenai persyaratannya. Terima kasih.`;
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/62895403047867?text=${encodedText}`;
    
    window.open(waUrl, '_blank');
  };

  return (
    <section id="kpr" className="py-24 bg-brand-ivory dark:bg-brand-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-brand-ivory mb-4">
            simulasi <span className="text-brand-gold italic">kpr</span>
          </h2>
          <p className="text-brand-charcoal/70 dark:text-brand-ivory/70">
            Hitung estimasi cicilan bulanan Anda. Kami bekerja sama dengan bank terkemuka untuk memberikan suku bunga terbaik.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Kalkulator Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white dark:bg-brand-dark-surface p-8 rounded-2xl shadow-xl border border-brand-charcoal/5 dark:border-brand-ivory/5"
          >
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-charcoal/10 dark:border-brand-ivory/10">
              <div className="p-3 bg-brand-gold/10 rounded-xl">
                <Calculator className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="text-2xl font-serif">Kalkulator KPR</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-sm font-medium mb-2">
                  <span>Harga Properti</span>
                  <span className="text-brand-gold">{formatRupiah(harga)}</span>
                </label>
                <input 
                  type="range" 
                  min="162000000" 
                  max="3000000000" 
                  step="1000000"
                  value={harga} 
                  onChange={(e) => setHarga(Number(e.target.value))}
                  className="w-full accent-brand-gold h-2 bg-brand-charcoal/10 dark:bg-brand-ivory/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex justify-between text-sm font-medium mb-2">
                    <span>Uang Muka (DP)</span>
                    <span className="text-brand-gold">{formatRupiah(dpAmount)}</span>
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max={harga * 0.5} 
                    step="500000"
                    value={dpAmount} 
                    onChange={(e) => setDpAmount(Number(e.target.value))}
                    className="w-full accent-brand-gold h-2 bg-brand-charcoal/10 dark:bg-brand-ivory/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-brand-charcoal/50 dark:text-brand-ivory/50 mt-2">{((dpAmount / harga) * 100).toFixed(1)}% dari harga</p>
                </div>

                <div>
                  <label className="flex justify-between text-sm font-medium mb-2">
                    <span>Tenor</span>
                    <span className="text-brand-gold">{tenor} Tahun</span>
                  </label>
                  <input 
                    type="range" 
                    min="5" 
                    max="30" 
                    step="1"
                    value={tenor} 
                    onChange={(e) => setTenor(Number(e.target.value))}
                    className="w-full accent-brand-gold h-2 bg-brand-charcoal/10 dark:bg-brand-ivory/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium mb-2">
                  <span>Suku Bunga (% per tahun)</span>
                  <span className="text-brand-gold">{bunga}%</span>
                </label>
                <input 
                  type="range" 
                  min="3" 
                  max="12" 
                  step="0.1"
                  value={bunga} 
                  onChange={(e) => setBunga(Number(e.target.value))}
                  className="w-full accent-brand-gold h-2 bg-brand-charcoal/10 dark:bg-brand-ivory/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </motion.div>

          {/* Hasil & Bank */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Hasil Card */}
            <div className="bg-brand-charcoal text-brand-ivory p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl -mr-10 -mt-10" />
              
              <h4 className="text-brand-ivory/70 text-sm font-medium mb-2">Estimasi Cicilan per Bulan</h4>
              <p className="text-4xl md:text-5xl font-serif text-brand-gold mb-6">{formatRupiah(cicilan)}</p>
              
              <div className="space-y-3 text-sm border-t border-brand-ivory/10 pt-6 mb-8">
                <div className="flex justify-between">
                  <span className="text-brand-ivory/70">Pokok Kredit</span>
                  <span className="font-medium">{formatRupiah(pokokKredit)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-ivory/70">Uang Muka</span>
                  <span className="font-medium">{formatRupiah(dpAmount)}</span>
                </div>
              </div>

              <button 
                onClick={handleAjukanKPR}
                className="w-full py-4 bg-brand-gold text-white font-medium hover:bg-brand-gold/90 transition-colors"
              >
                Ajukan KPR Online
              </button>
            </div>

            {/* Bank Partners */}
            <div className="bg-white dark:bg-brand-dark-surface p-6 rounded-2xl shadow-md border border-brand-charcoal/5 dark:border-brand-ivory/5">
              <h4 className="font-serif text-xl mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-gold" />
                Bank Partner
              </h4>
              <div className="space-y-3">
                {banks.map((bank) => (
                  <div key={bank.name} className="flex justify-between items-center p-3 hover:bg-brand-offwhite dark:hover:bg-brand-dark rounded-lg transition-colors cursor-pointer" onClick={() => setBunga(bank.rate)}>
                    <div>
                      <p className="font-medium">{bank.name}</p>
                      <p className="text-xs text-brand-charcoal/50 dark:text-brand-ivory/50">{bank.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-brand-gold font-bold">{bank.rate.toFixed(2)}%</p>
                      <p className="text-xs text-brand-charcoal/50 dark:text-brand-ivory/50">p.a</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
