import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/auth/actions'
import { LayoutDashboard, Home, Users, LogOut, ArrowLeft, Phone, Mail, Calendar, Search } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AdminUsers() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single()
  if (profile?.role !== 'admin') redirect('/')

  const { data: registrations } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })

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
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-brand-gold transition-colors text-xs font-bold uppercase tracking-widest">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/admin/properties" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-brand-gold transition-colors text-xs font-bold uppercase tracking-widest">
            <Home className="w-4 h-4" />
            Properti
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 bg-brand-gold/10 text-brand-gold rounded-xl border border-brand-gold/20 text-xs font-bold uppercase tracking-widest">
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
            <div className="flex items-center gap-3 mb-2">
                <Link href="/admin/dashboard" className="text-brand-gold p-1 hover:bg-brand-gold/10 rounded-full transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <h1 className="text-3xl font-serif text-brand-charcoal dark:text-brand-ivory">Manajemen <span className="italic text-brand-gold">Pengguna</span></h1>
            </div>
            <p className="text-brand-charcoal/60 dark:text-brand-ivory/60 text-sm">Lihat data pendaftaran dan kontak WhatsApp calon pembeli.</p>
          </div>
          
          <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/20" />
              <input 
                placeholder="Cari Nama / No WhatsApp..." 
                className="pl-12 pr-6 py-3 bg-white dark:bg-brand-dark-surface border border-brand-charcoal/5 dark:border-brand-ivory/5 rounded-full text-xs outline-none focus:ring-1 focus:ring-brand-gold min-w-[300px]"
              />
          </div>
        </header>

        <div className="bg-white dark:bg-brand-dark-surface rounded-[2.5rem] border border-brand-charcoal/5 dark:border-brand-ivory/5 shadow-sm overflow-hidden">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-brand-offwhite/50 dark:bg-brand-dark/20 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 dark:text-brand-ivory/40">
                        <th className="px-8 py-4">Nama Lengkap</th>
                        <th className="px-8 py-4">Kontak WhatsApp</th>
                        <th className="px-8 py-4">Status / Role</th>
                        <th className="px-8 py-4">Tanggal Gabung</th>
                        <th className="px-8 py-4">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-brand-charcoal/5 dark:divide-brand-ivory/5">
                    {registrations?.map((reg) => (
                        <tr key={reg.id} className="text-sm group hover:bg-brand-gold/[0.02] transition-colors">
                            <td className="px-8 py-6">
                                <span className="font-medium dark:text-white">{reg.full_name || 'Anonymous'}</span>
                            </td>
                            <td className="px-8 py-6">
                                <a 
                                  href={`https://wa.me/${reg.phone_number?.replace(/[^0-9]/g, '')}`} 
                                  target="_blank"
                                  className="flex items-center gap-2 text-brand-gold font-bold hover:underline"
                                >
                                    <Phone className="w-3 h-3" />
                                    <span>{reg.phone_number || '-'}</span>
                                </a>
                            </td>
                            <td className="px-8 py-6">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${reg.role === 'admin' ? 'bg-brand-gold/10 text-brand-gold' : 'bg-brand-charcoal/10 text-brand-charcoal/60 dark:text-brand-ivory/60 font-medium'}`}>
                                    {reg.role}
                                </span>
                            </td>
                            <td className="px-8 py-6 text-brand-charcoal/40 dark:text-brand-ivory/40">
                                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(reg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <button className="text-brand-gold text-[10px] font-bold uppercase tracking-widest hover:underline">Kelola</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </main>
    </div>
  )
}
