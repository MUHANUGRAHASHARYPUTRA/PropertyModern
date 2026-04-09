'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Phone, Mail, X } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    { id: 'wa', icon: MessageCircle, label: 'WhatsApp', color: 'bg-[#25D366]', href: 'https://wa.me/6281234567890' },
    { id: 'phone', icon: Phone, label: 'Telepon', color: 'bg-brand-charcoal dark:bg-brand-ivory dark:text-brand-charcoal', href: 'tel:+6281234567890' },
    { id: 'email', icon: Mail, label: 'Email', color: 'bg-brand-gold', href: 'mailto:info@grandestate.com' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3"
          >
            {contacts.map((contact, index) => (
              <motion.a
                key={contact.id}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 group`}
              >
                <span className="bg-brand-ivory dark:bg-brand-dark-surface px-3 py-1.5 rounded-md text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                  {contact.label}
                </span>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${contact.color} hover:scale-110 transition-transform`}>
                  <contact.icon className="w-5 h-5" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-brand-gold text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform relative"
      >
        {/* Pulse effect for WA when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-brand-gold animate-ping opacity-75" />
        )}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </motion.div>
      </button>
    </div>
  );
}
