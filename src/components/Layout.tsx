import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Cloud, Rocket, X, Zap } from 'lucide-react';
import { ModalProvider, useModal } from '../context/ModalContext';

const LeadModal = () => {
  const { isOpen, closeModal, type } = useModal();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Simulate API call for local environment
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-mission-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-mission-gray p-8 md:p-12 border border-white/10 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            
            <button 
              onClick={closeModal} 
              className="absolute top-6 right-6 text-white/20 hover:text-resolver-blue transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {status === 'success' ? (
              <div className="text-center py-12 relative z-10">
                <div className="w-20 h-20 rounded-full bg-resolver-green/10 border border-resolver-green/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
                  <CheckCircle2 className="w-10 h-10 text-resolver-green" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Node Active</h3>
                <p className="text-white/60 mb-10 text-sm font-medium leading-relaxed">Your request has been successfully transmitted to the AgentMesh™ backbone. A Lead Reliability Engineer will be assigned to your pilot within 12 hours.</p>
                <button 
                  onClick={closeModal} 
                  className="w-full py-5 bg-resolver-blue text-mission-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all"
                >
                  Return to Control Center
                </button>
              </div>
            ) : (
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm">
                    <Rocket className="w-5 h-5 text-resolver-blue transform -rotate-45" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-black tracking-[0.4em] text-white">BIZSTARTUP</span>
                    <span className="text-[8px] font-mono text-resolver-blue uppercase tracking-[0.2em]">Pilot Authorization</span>
                  </div>
                </div>

                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">{type}</h3>
                <p className="text-white/40 mb-10 text-xs font-mono uppercase tracking-widest">Protocol: Secure_Lead_Ingestion_v4</p>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-white/40 mb-3">Principal_Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-mission-black border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-resolver-blue transition-all rounded-sm font-mono"
                        placeholder="NAME_REQUIRED"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-white/40 mb-3">Entity_ID</label>
                      <input 
                        required
                        type="text" 
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-mission-black border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-resolver-blue transition-all rounded-sm font-mono"
                        placeholder="COMPANY_ID"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-white/40 mb-3">Transmission_Endpoint</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-mission-black border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-resolver-blue transition-all rounded-sm font-mono"
                      placeholder="EMAIL_HOST_REQUIRED"
                    />
                  </div>
                  <button 
                    disabled={status === 'loading'}
                    className="w-full py-6 bg-resolver-blue text-mission-black font-black uppercase tracking-widest text-sm hover:bg-white transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(0,209,255,0.2)] flex items-center justify-center gap-3"
                  >
                    {status === 'loading' ? (
                      <><Zap className="w-5 h-5 animate-pulse" /> Authorizing...</>
                    ) : (
                      'Request Protocol Initiation'
                    )}
                  </button>
                  {status === 'error' && (
                    <p className="text-brand-primary text-center text-[10px] font-mono uppercase tracking-widest mt-4">Uplink Failure. Please retry sequence.</p>
                  )}
                </form>
              </div>
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
    <div className="min-h-screen bg-mission-black text-white selection:bg-resolver-blue selection:text-mission-black font-sans">
      <Navbar onOpenModal={openModal} />
      <main className="relative z-10">{children}</main>
      <Footer />
      <LeadModal />
      
      {/* Global Background Grid */}
      <div className="fixed inset-0 bg-grid-white/[0.01] pointer-events-none z-0" />
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
