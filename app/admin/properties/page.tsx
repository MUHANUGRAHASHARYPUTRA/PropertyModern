import { createClient } from '@/lib/supabase/server'
import { signOut, deleteProperty } from '@/app/auth/actions'
import { LayoutDashboard, Home, Users, LogOut, ArrowLeft, Trash2, Edit, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import AddPropertyModal from '@/components/admin/AddPropertyModal'
import PropertyGridAdmin from '@/components/admin/PropertyGridAdmin'

export default async function AdminProperties() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single()
  if (profile?.role !== 'admin') redirect('/')

  const { data: properties } = await supabase.from('properties').select('*').order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-brand-offwhite dark:bg-brand-dark flex">
      {/* Sidebar (Identical to Dashboard for Consistency) */}
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
          <Link href="/admin/properties" className="flex items-center gap-3 px-4 py-3 bg-brand-gold/10 text-brand-gold rounded-xl border border-brand-gold/20 text-xs font-bold uppercase tracking-widest">
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
            <div className="flex items-center gap-3 mb-2">
                <Link href="/admin/dashboard" className="text-brand-gold p-1 hover:bg-brand-gold/10 rounded-full transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <h1 className="text-3xl font-serif text-brand-charcoal dark:text-brand-ivory">Manajemen <span className="italic text-brand-gold">Properti</span></h1>
            </div>
            <p className="text-brand-charcoal/60 dark:text-brand-ivory/60 text-sm">Kelola daftar unit rumah, harga, dan status ketersediaan.</p>
          </div>
          <AddPropertyModal />
        </header>

        <PropertyGridAdmin properties={properties || []} />
      </main>
    </div>
  )
}
