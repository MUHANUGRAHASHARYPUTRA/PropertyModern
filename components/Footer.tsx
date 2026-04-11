'use client';

import { Instagram, Facebook, Youtube, Send } from 'lucide-react';

export default function Footer() {
  const targetEmail = "anugrahasharyabubakar@gmail.com"; 

  return (
    <footer className="bg-brand-charcoal text-brand-ivory pt-20 pb-10 border-t-4 border-brand-gold">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {/* PERBAIKAN DI SINI */}
              <img 
                src="images/logo.png" 
                alt="Logo Alizah Property"
                className="w-10 h-10 object-contain" 
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/40x40?text=A"; // Fallback jika link mati
                }}
              />
              <span className="font-serif text-3xl font-medium tracking-wide">
  Alizah <span className="text-brand-gold italic">Property</span>
</span>
            </div>
            <p className="text-brand-ivory/70 text-sm leading-relaxed">
              Hunian Impian, Harga Nyata. Mengembangkan kawasan hunian modern terpadu dengan fasilitas lengkap dan lingkungan asri untuk keluarga Anda.
            </p>
          </div>

          {/* ... Col 2 & 3 tetap sama ... */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-brand-gold">Navigasi Cepat</h4>
            <ul className="space-y-3 text-sm text-brand-ivory/70">
              <li><a href="#subsidi" className="hover:text-brand-gold transition-colors">Properti Subsidi</a></li>
              <li><a href="#komersil" className="hover:text-brand-gold transition-colors">Properti Komersil</a></li>
              <li><a href="#galeri" className="hover:text-brand-gold transition-colors">Galeri Perumahan</a></li>
              <li><a href="#kpr" className="hover:text-brand-gold transition-colors">Simulasi KPR</a></li>
              <li><a href="#lokasi" className="hover:text-brand-gold transition-colors">Lokasi & Akses</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-brand-gold">Bantuan</h4>
            <ul className="space-y-3 text-sm text-brand-ivory/70">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#kpr" className="hover:text-brand-gold transition-colors">FAQ KPR</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Karir</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Social */}
          <div>
            <h4 className="font-serif text-xl mb-6 text-brand-gold">Newsletter</h4>
            <form action={`https://formsubmit.co/${targetEmail}`} method="POST" className="flex mb-8">
              <input type="text" name="_honey" style={{ display: 'none' }} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="email" name="email" placeholder="Email Anda" required className="bg-brand-ivory/10 border border-brand-ivory/20 px-4 py-2 w-full focus:outline-none focus:border-brand-gold text-sm rounded-l-md text-brand-ivory" />
              <button type="submit" className="bg-brand-gold px-4 py-2 text-white text-sm font-medium rounded-r-md hover:bg-brand-gold/90 transition-all flex items-center gap-2">
                <Send className="w-4 h-4" />
                Daftar
              </button>
            </form>

            <div className="flex gap-4">
              {/* Instagram */}
              <a href="https://www.instagram.com/alizah_property" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-ivory/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:scale-110 transition-all group">
                <Instagram className="w-5 h-5 text-brand-ivory group-hover:text-white" />
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/share/17LqMkgJ8t/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-ivory/10 flex items-center justify-center hover:bg-[#1877F2] hover:scale-110 transition-all group">
                <Facebook className="w-5 h-5 text-brand-ivory group-hover:text-white" />
              </a>
              {/* YouTube */}
              <a href="https://youtube.com/@anggaa7683?si=d0paRyDQt2l2gY27" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-ivory/10 flex items-center justify-center hover:bg-[#FF0000] hover:scale-110 transition-all group">
                <Youtube className="w-5 h-5 text-brand-ivory group-hover:text-white" />
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@alizah.property" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-ivory/10 flex items-center justify-center hover:bg-black hover:scale-110 transition-all group">
                <svg className="w-5 h-5 text-brand-ivory group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-ivory/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-ivory/50">
          <p>&copy; {new Date().getFullYear()} AlizahProperty. All rights reserved.</p>
          <p className="tracking-widest uppercase">Designed with precision.</p>
        </div>
      </div>
    </footer>
  );
}