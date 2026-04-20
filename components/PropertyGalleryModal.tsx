'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'

interface PropertyGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  propertyName: string
}

export default function PropertyGalleryModal({ isOpen, onClose, images, propertyName }: PropertyGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  if (!images || images.length === 0) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-charcoal/95 backdrop-blur-xl p-4 md:p-10"
        >
          <button onClick={onClose} className="absolute top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-6xl aspect-[16/9] flex items-center justify-center">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image 
                src={images[currentIndex]} 
                alt={`${propertyName} - ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Controls */}
            {images.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-4 md:-left-16 p-4 bg-white/5 hover:bg-white/15 rounded-full text-white backdrop-blur-md transition-all">
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button onClick={next} className="absolute right-4 md:-right-16 p-4 bg-white/5 hover:bg-white/15 rounded-full text-white backdrop-blur-md transition-all">
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Thumbnails */}
            <div className="absolute -bottom-16 md:-bottom-24 left-0 right-0 flex justify-center gap-3 overflow-x-auto py-4 px-2">
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-16 h-12 md:w-24 md:h-16 rounded-lg overflow-hidden transition-all shrink-0 ${idx === currentIndex ? 'ring-2 ring-brand-gold scale-110' : 'opacity-40 hover:opacity-100'}`}
                >
                  <Image src={img} alt="thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="absolute top-8 left-8">
             <h3 className="text-white font-serif text-2xl">{propertyName}</h3>
             <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">Gambar {currentIndex + 1} dari {images.length}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
