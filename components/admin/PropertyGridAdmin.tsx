'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Edit, Trash2, ExternalLink, Home } from 'lucide-react'
import { deleteProperty } from '@/app/auth/actions'
import EditPropertyModal from '@/components/admin/EditPropertyModal'

export default function PropertyGridAdmin({ properties }: { properties: any[] }) {
  const [editingProperty, setEditingProperty] = useState<any | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {properties?.map((prop) => (
          <div key={prop.id} className="bg-white dark:bg-brand-dark-surface rounded-[2.5rem] border border-brand-charcoal/5 dark:border-brand-ivory/5 shadow-sm overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <Image src={prop.image_url || '/images/subsidi1.jpg'} alt={prop.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-brand-charcoal/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                {prop.category}
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-serif dark:text-white leading-tight">{prop.name}</h3>
                  <p className="text-brand-gold font-bold">{prop.price}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${prop.status === 'SOLD OUT' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                  {prop.status}
                </span>
              </div>
              <div className="flex gap-4 mb-8 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 dark:text-brand-ivory/40">
                <span>{prop.luas_bangunan}/{prop.luas_tanah} m²</span>
                <span>{prop.kamar_tidur} Bed</span>
                <span>{prop.kamar_mandi} Bath</span>
              </div>
              
              <div className="flex gap-3 pt-6 border-t border-brand-charcoal/5 dark:border-brand-ivory/5">
                <button 
                  onClick={() => setEditingProperty(prop)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-offwhite dark:bg-brand-dark/50 text-brand-charcoal/60 dark:text-brand-ivory/60 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-brand-gold hover:text-white transition-all"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
                <form action={async () => {
                  if (confirm('Hapus properti ini?')) {
                    await deleteProperty(prop.id)
                  }
                }} className="shrink-0">
                  <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
                <Link href={`/#${prop.category}`} className="p-3 bg-brand-offwhite dark:bg-brand-dark/50 text-brand-charcoal/30 hover:text-brand-gold rounded-xl transition-all">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {!properties?.length && (
          <div className="col-span-full py-20 text-center bg-white dark:bg-brand-dark-surface rounded-[2.5rem] border border-dashed border-brand-charcoal/10">
            <Home className="w-12 h-12 text-brand-charcoal/10 mx-auto mb-4" />
            <p className="text-brand-charcoal/40 font-medium">Belum ada properti terdaftar.</p>
          </div>
        )}
      </div>

      {editingProperty && (
        <EditPropertyModal 
          property={editingProperty} 
          isOpen={!!editingProperty} 
          onClose={() => setEditingProperty(null)} 
        />
      )}
    </>
  )
}
