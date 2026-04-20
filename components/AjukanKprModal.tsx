'use client'

import { useState } from 'react'
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { submitInquiry } from '@/app/auth/actions'

interface AjukanKprModalProps {
  isOpen: boolean
  onClose: () => void
  kprData: {
    harga: string
    dp: string
    cicilan: string
    tenor: string
  }
}

export default function AjukanKprModal({ isOpen, onClose, kprData }: AjukanKprModalProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    
    const inquiryData = new FormData()
    inquiryData.append('name', name)
    inquiryData.append('phone', phone)
    inquiryData.append('email', '-')
    inquiryData.append('message', `[PENGAJUAN KPR] 
Harga: ${kprData.harga}
DP: ${kprData.dp}
Estimasi Cicilan: ${kprData.cicilan}
Tenor: ${kprData.tenor}`)

    const result = await submitInquiry(inquiryData)
    setLoading(false)

    if (!result?.error) {
      setSubmitted(true)
      // WhatsApp Redirection
      const text = `Halo Alizah Property, saya ${name} ingin mengajukan KPR:\n\n- Harga: ${kprData.harga}\n- DP: ${kprData.dp}\n- Cicilan: ${kprData.cicilan}\n- Tenor: ${kprData.tenor}`
      const encodedText = encodeURIComponent(text)
      setTimeout(() => {
        window.open(`https://wa.me/62895403047867?text=${encodedText}`, '_blank')
        onClose()
      }, 2000)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-brand-dark w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 relative overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-brand-charcoal/5 rounded-full transition-colors"><X className="w-5 h-5"/></button>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-brand-gold animate-bounce" />
                </div>
                <h3 className="text-2xl font-serif">Pengajuan Terkirim!</h3>
                <p className="text-sm text-brand-charcoal/60">Data Anda telah masuk ke sistem kami. Menghubungi admin via WhatsApp...</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-serif mb-2">Lengkapi <span className="text-brand-gold italic">Data Diri</span></h3>
                  <p className="text-sm text-brand-charcoal/60">Silakan isi data Anda untuk memproses pengajuan KPR ke dashboard admin kami.</p>
                </div>

                <div className="bg-brand-gold/5 p-4 rounded-2xl mb-8 space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-charcoal/40">
                        <span>Unit Harga:</span>
                        <span>{kprData.harga}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-gold">
                        <span>Estimasi Cicilan:</span>
                        <span>{kprData.cicilan}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-2 block">Nama Lengkap</label>
                    <input name="name" required placeholder="Cth: Ahmad Syarif" className="w-full bg-brand-offwhite px-4 py-3 rounded-xl border border-brand-charcoal/10 outline-none focus:border-brand-gold transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-2 block">Nomor WhatsApp</label>
                    <input name="phone" required placeholder="Cth: 0812..." className="w-full bg-brand-offwhite px-4 py-3 rounded-xl border border-brand-charcoal/10 outline-none focus:border-brand-gold transition-colors text-sm" />
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full py-4 bg-brand-gold text-white font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-brand-charcoal transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Kirim ke Admin
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
