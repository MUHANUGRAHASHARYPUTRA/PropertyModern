import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/auth/actions'
import { LayoutDashboard, Home, Users, Settings, LogOut, Plus, Phone, Mail, Calendar, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import AnnouncementManager from '@/components/admin/AnnouncementManager'
import DeleteInquiryButton from '@/components/admin/DeleteInquiryButton'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // Fetch profile and check role
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/')
  }

  // Fetch all properties
  const { data: properties } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })

  // Fetch all user profiles (registrations)
  const { data: registrations } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  // Fetch all inquiries
  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  // Fetch announcement
  const { data: announcement } = await supabase
    .from('announcements')
    .select('*')
    .limit(1)
    .single()

  return (
    <div className="min-h-screen bg-brand-offwhite dark:bg-brand-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-charcoal text-brand-ivory flex flex-col p-6 fixed h-full z-50">
        <div className="mb-12">
          <Link href="/">
            <h2 className="text-2xl font-serif text-brand-gold italic">Admin<span className="text-white not-italic">Panel</span></h2>
          </Link>
        </div>

        <nav className="flex-1 space-y-4">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-brand-gold/10 text-brand-gold rounded-xl border border-brand-gold/20 text-xs font-bold uppercase tracking-widest">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/admin/properties" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-brand-gold transition-colors text-xs font-bold uppercase tracking-widest">
            <Home className="w-4 h-4" />
            Properti
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-brand-gold transition-colors text-xs font-bold uppercase tracking-widest">
            <Users className="w-4 h-4" />
            Pengguna
          </Link>
        </nav>

        <form action={signOut}>
          <button className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-widest w-full">
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif text-brand-charcoal dark:text-brand-ivory">Dashboard <span className="italic text-brand-gold">Ringkasan</span></h1>
            <p className="text-brand-charcoal/60 dark:text-brand-ivory/60 text-sm mt-1">Selamat datang kembali, {profile?.full_name} ({profile?.role})</p>
          </div>
          <Link href="/admin/properties" className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-brand-charcoal transition-all">
            <Plus className="w-4 h-4" />
            Kelola Properti
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Total Properti', value: properties?.length || 0, color: 'bg-brand-gold' },
            { label: 'Unit Terjual', value: properties?.filter(p => p.status === 'SOLD OUT').length || 0, color: 'bg-emerald-500' },
            { label: 'Total User', value: registrations?.length || 0, color: 'bg-blue-500' },
            { label: 'Total Pesan', value: inquiries?.length || 0, color: 'bg-purple-500' }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-brand-dark-surface p-8 rounded-[2rem] border border-brand-charcoal/5 dark:border-brand-ivory/5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40 dark:text-brand-ivory/40 mb-2">{stat.label}</p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-serif text-brand-charcoal dark:text-brand-ivory">{stat.value}</span>
                <div className={`w-2 h-2 rounded-full mb-2 ${stat.color}`}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-12">
            {/* Announcement Manager */}
            <AnnouncementManager initialData={announcement} />

            {/* Inquiries Table */}
            <div className="bg-white dark:bg-brand-dark-surface rounded-[2.5rem] border border-brand-charcoal/5 dark:border-brand-ivory/5 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-brand-charcoal/5 dark:border-brand-ivory/5 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-serif text-brand-charcoal dark:text-white">Pesan & <span className="italic text-brand-gold">Konsultasi</span></h3>
                        <p className="text-xs text-brand-charcoal/40 dark:text-brand-ivory/40 mt-1">Daftar pengunjung yang mengisi form di beranda.</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-offwhite/50 dark:bg-brand-dark/20 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 dark:text-brand-ivory/40">
                                <th className="px-8 py-4">Nama</th>
                                <th className="px-8 py-4">Kontak</th>
                                <th className="px-8 py-4">Pesan</th>
                                <th className="px-8 py-4">Tgl Masuk</th>
                                <th className="px-8 py-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-charcoal/5 dark:divide-brand-ivory/5">
                            {inquiries?.map((item) => (
                                <tr key={item.id} className="group hover:bg-brand-gold/5 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="font-medium dark:text-white">{item.full_name}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-xs dark:text-brand-ivory/60">{item.phone}</div>
                                        <div className="text-[10px] text-brand-gold">{item.email}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm text-brand-charcoal/70 dark:text-brand-ivory/70 line-clamp-2 max-w-xs">{item.message}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-xs flex items-center gap-2 text-brand-charcoal/40">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <Link 
                                                href={`https://wa.me/${item.phone?.replace(/[^0-9]/g, '')}`} 
                                                target="_blank"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-[10px] font-bold uppercase rounded-lg hover:bg-emerald-600 transition-all font-sans"
                                            >
                                                <Phone className="w-3 h-3" />
                                                Balas WA
                                            </Link>
                                            <DeleteInquiryButton id={item.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-white dark:bg-brand-dark-surface rounded-[2.5rem] border border-brand-charcoal/5 dark:border-brand-ivory/5 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-brand-charcoal/5 dark:border-brand-ivory/5 flex justify-between items-center">
                    <h3 className="text-lg font-serif">Riwayat Pendaftaran User</h3>
                    <div className="px-4 py-1.5 bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase tracking-widest rounded-full border border-brand-gold/10">
                        {registrations?.length} Total
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-brand-offwhite/50 dark:bg-brand-dark/20 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 dark:text-brand-ivory/40">
                                <th className="px-8 py-4">Nama Lengkap</th>
                                <th className="px-8 py-4">Kontak / WA</th>
                                <th className="px-8 py-4">Role</th>
                                <th className="px-8 py-4">Terdaftar Pada</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-charcoal/5 dark:divide-brand-ivory/5">
                            {registrations?.map((reg) => (
                                <tr key={reg.id} className="text-sm group hover:bg-brand-gold/[0.02] transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-medium dark:text-white">{reg.full_name || 'No Name'}</span>
                                            <span className="text-[10px] text-brand-charcoal/40 dark:text-brand-ivory/40">{reg.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-brand-gold font-bold">
                                                <Phone className="w-3 h-3" />
                                                <span>{reg.phone_number || '-'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-brand-charcoal/40 dark:text-brand-ivory/40 text-xs">
                                                <Mail className="w-3 h-3" />
                                                {/* Note: Email is usually in auth.users, but we might have it in profiles if we added it there, or we can just show UID/Placeholder */}
                                                <span>User UID: {reg.id.substring(0, 8)}...</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${reg.role === 'admin' ? 'bg-brand-gold/10 text-brand-gold' : 'bg-brand-charcoal/10 text-brand-charcoal/60 dark:text-brand-ivory/60'}`}>
                                            {reg.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-brand-charcoal/40 dark:text-brand-ivory/40">
                                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(reg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Properties Table */}
            <div className="bg-white dark:bg-brand-dark-surface rounded-[2.5rem] border border-brand-charcoal/5 dark:border-brand-ivory/5 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-brand-charcoal/5 dark:border-brand-ivory/5">
                    <h3 className="text-lg font-serif">Monitoring Unit Properti</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                    <thead>
                        <tr className="bg-brand-offwhite/50 dark:bg-brand-dark/20 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 dark:text-brand-ivory/40">
                        <th className="px-8 py-4">Nama Properti</th>
                        <th className="px-8 py-4">Kategori</th>
                        <th className="px-8 py-4">Harga</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-charcoal/5 dark:divide-brand-ivory/5">
                        {properties?.map((prop) => (
                        <tr key={prop.id} className="text-sm">
                            <td className="px-8 py-6 font-medium dark:text-white">{prop.name}</td>
                            <td className="px-8 py-6 capitalize text-brand-charcoal/60 dark:text-brand-ivory/60">{prop.category}</td>
                            <td className="px-8 py-6 font-bold text-brand-gold">{prop.price}</td>
                            <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${prop.status === 'SOLD OUT' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                {prop.status}
                            </span>
                            </td>
                            <td className="px-8 py-6">
                            <button className="text-brand-gold hover:underline font-bold text-[10px] uppercase tracking-widest">Edit</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}
