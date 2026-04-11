'use client';

import { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Kontak() {
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
    email: '',
    minat: '',
    pesan: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nama, whatsapp, email, minat, pesan } = formData;
    
    if (!nama || !whatsapp || !pesan) {
      alert("Mohon lengkapi Nama, WhatsApp, dan Pesan.");
      return;
    }

    const text = `Halo Alizah Property, saya ${nama}.\n\nEmail: ${email}\nMinat: ${minat}\n\nPesan:\n${pesan}`;
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/62895403047867?text=${encodedText}`;
    
    window.open(waUrl, '_blank');
  };

  return (
    <section id="kontak" className="py-24 bg-brand-offwhite dark:bg-brand-dark-surface">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-brand-ivory mb-4">
            hubungi <span className="text-brand-gold italic">kami</span>
          </h2>
          <p className="text-brand-charcoal/70 dark:text-brand-ivory/70">
            Jadwalkan kunjungan survei lokasi atau konsultasikan kebutuhan properti Anda dengan tim ahli kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-brand-dark p-8 rounded-2xl shadow-lg border border-brand-charcoal/5 dark:border-brand-ivory/5">
              <h3 className="text-2xl font-serif mb-6">Informasi Kontak</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Kantor Pemasaran</h4>
                    <p className="text-brand-charcoal/70 dark:text-brand-ivory/70 text-sm leading-relaxed">
                      Jl. Borong Raya Inspeksi Kanal No. 2<br />
                      Kawasan Borong Raya<br />
                      Makassar, Sulawesi Selatan 90234
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Telepon & WhatsApp</h4>
                    <p className="text-brand-charcoal/70 dark:text-brand-ivory/70 text-sm">
                      +62 895 4030 47867<br />
                      0895403047867
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-brand-charcoal/70 dark:text-brand-ivory/70 text-sm">
                    ptanugrahayunalizah@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-gold/10 rounded-full text-brand-gold shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Jam Operasional</h4>
                    <p className="text-brand-charcoal/70 dark:text-brand-ivory/70 text-sm">
                      Senin - Sabtu: 08.00 - 17.00 WITA<br />
                      Minggu: Dengan Perjanjian
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-brand-dark p-8 rounded-2xl shadow-lg border border-brand-charcoal/5 dark:border-brand-ivory/5">
            <h3 className="text-2xl font-serif mb-6">Kirim Pesan</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    className="w-full px-4 py-3 bg-brand-offwhite dark:bg-brand-dark-surface border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl focus:outline-none focus:border-brand-gold transition-colors" 
                    placeholder="Cth: Budi Santoso" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nomor WhatsApp</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full px-4 py-3 bg-brand-offwhite dark:bg-brand-dark-surface border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl focus:outline-none focus:border-brand-gold transition-colors" 
                    placeholder="Cth: 0812..." 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-brand-offwhite dark:bg-brand-dark-surface border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl focus:outline-none focus:border-brand-gold transition-colors" 
                  placeholder="Cth: budi@email.com" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Minat Properti</label>
                <select 
                  value={formData.minat}
                  onChange={(e) => setFormData({...formData, minat: e.target.value})}
                  className="w-full px-4 py-3 bg-brand-offwhite dark:bg-brand-dark-surface border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl focus:outline-none focus:border-brand-gold transition-colors appearance-none"
                >
                  <option value="">Pilih Tipe Properti</option>
                  <option value="subsidi">Properti Subsidi</option>
                  <option value="komersil">Properti Komersil</option>
                  <option value="kpr">Konsultasi KPR</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Pesan</label>
                <textarea 
                  rows={4} 
                  required
                  value={formData.pesan}
                  onChange={(e) => setFormData({...formData, pesan: e.target.value})}
                  className="w-full px-4 py-3 bg-brand-offwhite dark:bg-brand-dark-surface border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl focus:outline-none focus:border-brand-gold transition-colors resize-none" 
                  placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                ></textarea>
              </div>

              <button className="w-full py-4 bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal font-medium rounded-xl hover:bg-brand-gold dark:hover:bg-brand-gold hover:text-white transition-colors flex items-center justify-center gap-2 mt-4">
                <Send className="w-4 h-4" />
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
