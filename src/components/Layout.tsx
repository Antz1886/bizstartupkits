import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Cloud, Rocket, X } from 'lucide-react';
import { ModalProvider, useModal } from '../context/ModalContext';

const LeadModal = () => {
  const { isOpen, closeModal, type } = useModal();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type }),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-brand-secondary/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg bg-white p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button onClick={closeModal} className="absolute top-4 right-4 md:top-6 md:right-6 text-ink/20 hover:text-brand-primary transition-colors z-20">
              <X className="w-6 h-6" />
            </button>

            {status === 'success' ? (
              <div className="text-center py-6 md:py-10">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">Inquiry Received</h3>
                <p className="text-ink/60 mb-8 text-sm md:text-base">Our growth experts will contact you within 12 business hours.</p>
                <button onClick={closeModal} className="w-full py-4 rounded-lg bg-brand-secondary text-white font-bold">Return to Website</button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <Cloud className="absolute inset-0 w-8 h-8 text-brand-secondary fill-brand-secondary" />
                    <Rocket className="relative z-10 w-4 h-4 text-brand-primary transform -rotate-45" />
                  </div>
                  <span className="text-[10px] font-black tracking-[0.3em] text-brand-secondary">BIZSTARTUP KIT</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{type}</h3>
                <p className="text-ink/60 mb-6 md:mb-8 text-xs md:text-sm">Join the next generation of SMEs. Experience growth without limits.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-2">FullName</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-bg-dark border border-ink/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-2">Company</label>
                      <input 
                        required
                        type="text" 
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-bg-dark border border-ink/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-2">Business Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-bg-dark border border-ink/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <button 
                    disabled={status === 'loading'}
                    className="w-full py-4 rounded-lg bg-brand-secondary text-white font-bold hover:bg-brand-primary transition-all disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Transmitting Data...' : 'Submit Professional Request'}
                  </button>
                  {status === 'error' && (
                    <p className="text-brand-primary text-center text-xs mt-2 font-medium">Network error. Please verify your credentials and try again.</p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { openModal } = useModal();
  return (
    <div className="min-h-screen bg-bg-dark text-ink selection:bg-brand-primary selection:text-white">
      <Navbar onOpenModal={openModal} />
      <main>{children}</main>
      <Footer />
      <LeadModal />
    </div>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider>
      <LayoutContent children={children} />
    </ModalProvider>
  );
};
