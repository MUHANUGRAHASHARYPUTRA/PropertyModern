'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatBubble() {
  const [view, setView] = useState<'closed' | 'menu' | 'chat'>('closed');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Halo! Ada yang bisa saya bantu terkait Alizah Property?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (view === 'chat') {
      scrollToBottom();
    }
  }, [messages, view]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      const data = await response.json();
      setMessages(prev => [...prev, data]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Maaf, terjadi kesalahan pada koneksi. Silakan coba lagi.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setView(view === 'closed' ? 'menu' : 'closed')}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-brand-gold text-white shadow-lg hover:bg-opacity-90 transition-all z-50 ${(view === 'chat' || view === 'menu') ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Buka Layanan"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {view === 'menu' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-56 bg-brand-ivory dark:bg-brand-dark-surface rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-brand-gold/20"
          >
            <div className="p-4 bg-brand-gold text-white flex justify-between items-center shadow-sm">
              <h3 className="font-serif font-semibold text-lg tracking-wide">Hubungi Kami</h3>
              <button onClick={() => setView('closed')} className="text-white/80 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col">
              <button 
                onClick={() => setView('chat')}
                className="flex items-center gap-3 p-4 hover:bg-brand-offwhite dark:hover:bg-[#1f1f1f] transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="font-medium text-sm text-brand-charcoal dark:text-brand-ivory">Asisten AI</div>
                  <div className="text-xs text-brand-charcoal/60 dark:text-brand-ivory/60">Tanya jawab cepat 24/7</div>
                </div>
              </button>
              
              <a 
                href="https://wa.me/62895403047867"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setView('closed')}
                className="flex items-center gap-3 p-4 hover:bg-brand-offwhite dark:hover:bg-[#1f1f1f] transition-colors text-left border-t border-brand-gold/10"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="font-medium text-sm text-brand-charcoal dark:text-brand-ivory">WhatsApp</div>
                  <div className="text-xs text-brand-charcoal/60 dark:text-brand-ivory/60">Chat langsung dengan admin</div>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {view === 'chat' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] max-h-[80vh] bg-brand-ivory dark:bg-brand-dark-surface rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-brand-gold/20"
          >
            {/* Header */}
            <div className="p-4 bg-brand-gold text-white flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <h3 className="font-serif font-semibold text-lg tracking-wide">Asisten Alizah</h3>
              </div>
              <button onClick={() => setView('closed')} className="text-white/80 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-brand-charcoal text-white rounded-tr-sm self-end dark:bg-white dark:text-brand-charcoal' 
                      : 'bg-brand-offwhite text-brand-charcoal rounded-tl-sm self-start dark:bg-[#1f1f1f] dark:text-brand-ivory'
                  }`}
                >
                  <p className="text-[15px] leading-relaxed">{msg.content}</p>
                </div>
              ))}
              {isLoading && (
                <div className="bg-brand-offwhite dark:bg-[#1f1f1f] text-brand-charcoal dark:text-brand-ivory max-w-[80%] p-3 rounded-2xl rounded-tl-sm self-start flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-brand-gold" />
                  <span className="text-[15px]">Mengetik...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white dark:bg-brand-dark border-t border-brand-gold/10">
              <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanyakan sesuatu..."
                  className="w-full bg-brand-offwhite dark:bg-[#1f1f1f] text-brand-charcoal dark:text-brand-ivory rounded-full px-4 py-3 pr-12 text-[15px] focus:outline-none focus:ring-1 focus:ring-brand-gold placeholder:text-brand-charcoal/50 dark:placeholder:text-brand-ivory/50 transition-shadow"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 text-brand-gold hover:text-brand-gold/80 disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
