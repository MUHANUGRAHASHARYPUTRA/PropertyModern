'use client'

import { Trash2 } from 'lucide-react'
import { deleteInquiry } from '@/app/auth/actions'
import { useRouter } from 'next/navigation'

export default function DeleteInquiryButton({ id }: { id: string }) {
  const router = useRouter()

  return (
    <button 
      onClick={async () => {
        if (window.confirm('Hapus pesan ini secara permanen?')) {
          const result = await deleteInquiry(id)
          if (result?.error) {
            alert('Gagal menghapus: ' + result.error)
          } else {
            router.refresh()
          }
        }
      }}
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
      title="Hapus Pesan"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
