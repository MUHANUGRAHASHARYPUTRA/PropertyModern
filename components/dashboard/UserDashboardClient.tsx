'use client';

import { useState } from 'react';
import { User, Home, MessageSquare, LogOut, Heart, ArrowLeft, Loader2, Save, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, updateProfile, toggleWishlist } from '@/app/auth/actions';

interface UserDashboardClientProps {
  initialProfile: any;
  user: any;
  wishlist: any[];
  inquiries: any[];
}

export default function UserDashboardClient({ initialProfile, user, wishlist: initialWishlist, inquiries: initialInquiries }: UserDashboardClientProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(initialProfile);
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    const result = await updateProfile(formData);
    
    if (result.success) {
      setProfile({ 
        ...profile, 
        full_name: formData.get('fullName') as string,
        phone_number: formData.get('phoneNumber') as string 
      });
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Gagal memperbarui profil' });
    }
    setLoading(false);
  };

  const handleRemoveWishlist = async (id: string) => {
    setWishlist(wishlist.filter(item => item.properties.id !== id));
    await toggleWishlist(id);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white dark:bg-brand-dark-surface p-10 rounded-[2.5rem] border border-brand-charcoal/5 dark:border-brand-ivory/5 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-serif dark:text-white">Informasi <span className="text-brand-gold italic">Pribadi</span></h2>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:underline"
                >
                  Edit Profil
                </button>
              )}
            </div>

            {message && (
              <div className={`mb-8 p-4 rounded-xl text-xs text-center border ${
                message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
              }`}>
                {message.text}
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Nama Lengkap</label>
                    <input 
                      name="fullName"
                      defaultValue={profile?.full_name}
                      required
                      className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Nomor WhatsApp/HP</label>
                    <input 
                      name="phoneNumber"
                      defaultValue={profile?.phone_number}
                      required
                      placeholder="08123456789"
                      className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-gold outline-none dark:text-white"
                    />
                  </div>
                  <div className="space-y-2 opacity-50">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Email Address (Locked)</label>
                    <input 
                      disabled
                      value={user?.email}
                      className="w-full bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-xl px-4 py-3 text-sm dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-brand-charcoal transition-all flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                    Simpan Perubahan
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-3 border border-brand-charcoal/10 dark:border-brand-ivory/10 text-brand-charcoal/40 dark:text-brand-ivory/40 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-red-50/50 hover:text-red-500 transition-all font-bold"
                  >
                    Batal
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Nama Lengkap</p>
                  <p className="text-lg dark:text-white font-medium">{profile?.full_name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Email Address</p>
                  <p className="text-lg dark:text-white font-medium">{user?.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Nomor WhatsApp/HP</p>
                  <p className="text-lg dark:text-white font-medium">{profile?.phone_number || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Role Akun</p>
                  <p className="text-lg dark:text-white uppercase tracking-widest text-xs font-bold">{profile?.role}</p>
                </div>
              </div>
            )}
          </div>
        );
      case 'favorites':
        return (
          <div className="space-y-6">
             <h2 className="text-2xl font-serif dark:text-white">Unit <span className="text-brand-gold italic">Favorit</span></h2>
             
             {wishlist.length > 0 ? (
               <div className="grid grid-cols-1 gap-6">
                 {wishlist.map((item) => (
                   <div key={item.id} className="bg-white dark:bg-brand-dark-surface p-6 rounded-3xl border border-brand-charcoal/5 dark:border-brand-ivory/5 shadow-sm flex flex-col md:flex-row gap-8 items-center group">
                      <div className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                         <Image src={item.properties.image_url || '/images/subsidi1.jpg'} alt={item.properties.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-1">
                         <Link href={`/#${item.properties.category}`} className="text-lg font-serif dark:text-white hover:text-brand-gold transition-colors">{item.properties.name}</Link>
                         <p className="text-brand-gold font-bold text-sm mt-1">{item.properties.price}</p>
                         <div className="flex gap-4 mt-4 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 dark:text-brand-ivory/40">
                             <span>{item.properties.luas_bangunan}/{item.properties.luas_tanah} m²</span>
                             <span>{item.properties.kamar_tidur} Kamar</span>
                         </div>
                      </div>
                      <div className="flex gap-3">
                         <button 
                           onClick={() => handleRemoveWishlist(item.properties.id)}
                           className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                           title="Hapus dari favorit"
                         >
                           <Trash2 className="w-5 h-5" />
                         </button>
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="bg-white dark:bg-brand-dark-surface p-20 rounded-[2.5rem] border border-brand-charcoal/5 dark:border-brand-ivory/5 text-center">
                  <Heart className="w-12 h-12 text-brand-charcoal/10 dark:text-brand-ivory/10 mx-auto mb-6" />
                  <p className="text-brand-charcoal/40 dark:text-brand-ivory/40 text-sm font-medium">Belum ada unit yang disimpan.</p>
                  <Link href="/#subsidi" className="mt-8 inline-block text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:underline">Jelajahi Properti</Link>
               </div>
             )}
          </div>
        );
      case 'consultation':
        return (
          <div className="space-y-8">
             <h2 className="text-2xl font-serif dark:text-white">Konsultasi <span className="text-brand-gold italic">Marketing</span></h2>
             
             <div className="bg-white dark:bg-brand-dark-surface p-10 rounded-[2.5rem] border border-brand-charcoal/5 dark:border-brand-ivory/5 shadow-sm text-center">
                <MessageSquare className="w-16 h-16 text-brand-gold mx-auto mb-8 opacity-20" />
                <h3 className="text-xl font-serif dark:text-white mb-4">Butuh panduan memilih hunian?</h3>
                <p className="text-brand-charcoal/60 dark:text-brand-ivory/60 text-sm max-w-md mx-auto leading-relaxed mb-10">
                  Konsultasikan kebutuhan hunian, perhitungan KPR, hingga proses akad secara gratis dengan tim profesional kami.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                   <button 
                     onClick={() => window.open(`https://wa.me/62895403047867?text=Halo Marketing Alizah Property, saya ${profile?.full_name} ingin konsultasi mengenai hunian.`, '_blank')}
                     className="w-full py-5 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-brand-charcoal transition-all flex items-center justify-center gap-3"
                   >
                     Chat WhatsApp
                     <ExternalLink className="w-4 h-4" />
                   </button>
                   <button 
                     disabled
                     className="w-full py-5 border border-brand-charcoal/10 dark:border-brand-ivory/10 text-brand-charcoal/30 dark:text-brand-ivory/30 text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl cursor-not-allowed"
                   >
                     E-Mail Inquiry (Soon)
                   </button>
                </div>
             </div>
          </div>
        );
      case 'kpr':
         return (
          <div className="space-y-8">
            <h2 className="text-2xl font-serif dark:text-white">Riwayat <span className="text-brand-gold italic">Pengajuan & Pesan</span></h2>
            
            {inquiries.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-white dark:bg-brand-dark-surface p-8 rounded-3xl border border-brand-charcoal/5 dark:border-brand-ivory/5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {inquiry.message.includes('[PENGAJUAN KPR]') ? 'KPR Online' : 'Konsultasi'}
                      </div>
                      <span className="text-[10px] text-brand-charcoal/40 font-bold uppercase tracking-widest">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-brand-charcoal/80 dark:text-brand-ivory/80 text-sm italic mb-4 whitespace-pre-line leading-relaxed">
                      "{inquiry.message.replace('[PENGAJUAN KPR]', '').trim()}"
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse"></div>
                      Status: Menunggu Konfirmasi Admin
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-brand-dark-surface p-20 rounded-[2.5rem] border border-brand-charcoal/5 dark:border-brand-ivory/5 text-center">
                 <Home className="w-12 h-12 text-brand-charcoal/10 dark:text-brand-ivory/10 mx-auto mb-6" />
                 <p className="text-brand-charcoal/40 dark:text-brand-ivory/40 text-sm font-medium">Belum ada pengajuan KPR yang terdaftar.</p>
                 <p className="text-xs text-brand-charcoal/30 dark:text-brand-ivory/30 mt-2">Hubungi admin untuk memulai simulasi KPR.</p>
              </div>
            )}
          </div>
         );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-offwhite dark:bg-brand-dark">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-brand-dark-surface border-b border-brand-charcoal/5 dark:border-brand-ivory/5 px-6 md:px-12 py-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-serif text-brand-charcoal dark:text-brand-ivory">
            Property<span className="text-brand-gold italic">Modern</span>
          </Link>
          <Link 
            href="/" 
            className="hidden md:flex items-center gap-2 text-brand-charcoal/40 dark:text-brand-ivory/40 hover:text-brand-gold text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold">
               {profile?.full_name?.charAt(0)}
             </div>
             <div className="hidden sm:flex flex-col">
                <span className="text-sm font-medium dark:text-white leading-tight">{profile?.full_name}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold opacity-60">Role: {profile?.role}</span>
             </div>
          </div>
          <button 
            onClick={() => signOut()}
            className="text-brand-charcoal/40 dark:text-brand-ivory/40 hover:text-red-500 transition-colors"
            title="Keluar"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            {[
              { id: 'profile', label: 'Profil Saya', icon: User, count: null },
              { id: 'favorites', label: 'Unit Favorit', icon: Heart, count: wishlist.length },
              { id: 'consultation', label: 'Konsultasi', icon: MessageSquare, count: null },
              { id: 'kpr', label: 'Riwayat KPR', icon: Home, count: inquiries.length },
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === item.id ? 'bg-brand-gold text-white shadow-lg shadow-brand-gold/20' : 'text-brand-charcoal/40 dark:text-brand-ivory/40 hover:bg-brand-gold/5 hover:text-brand-gold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
                {item.count !== null && item.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[8px] ${activeTab === item.id ? 'bg-white text-brand-gold' : 'bg-brand-gold text-white'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}

            <Link 
              href="/" 
              className="md:hidden flex items-center gap-3 px-6 py-4 text-brand-charcoal/40 dark:text-brand-ivory/40 text-[10px] font-bold uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" />
              Beranda
            </Link>
          </aside>

          {/* Content Area */}
          <div className="flex-1 space-y-8 min-h-[500px]">
            {renderContent()}

            <div className="bg-brand-gold/5 border border-brand-gold/20 p-8 rounded-[2.5rem]">
               <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                 <div>
                   <h3 className="text-xl font-serif text-brand-charcoal dark:text-white mb-2">Butuh Bantuan?</h3>
                   <p className="text-brand-charcoal/60 dark:text-brand-ivory/60 text-sm">Tim marketing kami siap membantu proses pengajuan KPR Anda secara gratis.</p>
                 </div>
                 <button 
                   onClick={() => window.open('https://wa.me/62895403047867', '_blank')}
                   className="px-8 py-4 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-brand-charcoal transition-all whitespace-nowrap"
                 >
                   Hubungi Admin
                 </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
