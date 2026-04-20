import { login } from '@/app/auth/actions'
import Link from 'next/link'
import { ArrowLeft, Lock, Mail } from 'lucide-react'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>
}) {
  const { error, success } = await searchParams;

  return (
    <div className="min-h-screen bg-brand-offwhite dark:bg-brand-dark flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-brand-charcoal/40 dark:text-brand-ivory/40 hover:text-brand-gold transition-colors mb-12 text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-serif text-brand-charcoal dark:text-brand-ivory mb-3">
            Selamat <span className="text-brand-gold italic">Datang</span>
          </h1>
          <p className="text-brand-charcoal/60 dark:text-brand-ivory/60 text-sm">
            Masuk ke akun Anda untuk melihat status properti dan konsultasi.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-brand-dark-surface p-8 rounded-[2.5rem] shadow-xl border border-brand-charcoal/5 dark:border-brand-ivory/5">
          <form action={login} className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="text-[10px] font-bold uppercase tracking-widest text-brand-gold"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/30 dark:text-brand-ivory/30" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label 
                  htmlFor="password" 
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-gold"
                >
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 dark:text-brand-ivory/40 hover:text-brand-gold transition-colors"
                >
                  Lupa?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/30 dark:text-brand-ivory/30" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-brand-offwhite dark:bg-brand-dark/50 border border-brand-charcoal/10 dark:border-brand-ivory/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-xs text-center">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-brand-charcoal dark:bg-brand-ivory text-brand-ivory dark:text-brand-charcoal text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-brand-gold dark:hover:bg-brand-gold hover:text-white transition-all active:scale-95 shadow-lg shadow-brand-charcoal/10"
            >
              Masuk Sekarang
            </button>
          </form>

          <div className="mt-8 text-center pt-8 border-t border-brand-charcoal/5 dark:border-brand-ivory/5">
            <p className="text-xs text-brand-charcoal/40 dark:text-brand-ivory/40">
              Belum punya akun?{' '}
              <Link 
                href="/register" 
                className="text-brand-gold font-bold uppercase tracking-widest hover:underline"
              >
                Daftar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
