import React, { useState, useEffect } from 'react';
import { Cloud, Rocket, Menu, X, ArrowRight, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = ({ onOpenModal }: { onOpenModal: (type: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Workforce', href: '/services/agentmesh-workforce', desc: '24/7 Digital AI Employees' },
    { name: 'Integrations', href: '/services/custom-resolvers', desc: 'Connect to Your Tools' },
    { name: 'B.A.T Model', href: '/corporate/bat-model', desc: 'Performance-Based Pilot' },
    { name: 'Control', href: '/mission-control', desc: 'Live Performance Dashboard' },
    { name: 'Audit', href: isHome ? '#audit-calculator' : '/#audit-calculator', desc: 'Calculate Wasted Workhours' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-10 py-5",
      isScrolled ? "bg-mission-black/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl" : "bg-transparent py-8"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-4 group"
        >
          <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm group-hover:border-resolver-blue transition-colors">
            <Rocket className="w-5 h-5 text-resolver-blue transform -rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-black tracking-[0.4em] text-white">BIZSTARTUP</span>
            <span className="text-[8px] font-mono text-resolver-blue uppercase tracking-[0.2em]">Digital Workforce</span>
          </div>
        </Link>

        {/* Desktop Links - Optimized for high contrast */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
             <React.Fragment key={link.name}>
               {link.href.startsWith('#') || (link.href.startsWith('/#')) ? (
                 <a 
                   href={link.href} 
                   className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-resolver-blue transition-all"
                 >
                   {link.name}
                 </a>
               ) : (
                 <Link 
                   to={link.href} 
                   className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-resolver-blue transition-all"
                 >
                   {link.name}
                 </Link>
               )}
             </React.Fragment>
          ))}
          <button 
            onClick={() => onOpenModal('B.A.T Pilot')}
            className="px-6 py-2 bg-resolver-blue text-mission-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(0,209,255,0.2)]"
          >
            Start Pilot
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm text-white"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-mission-black z-[90] lg:hidden flex flex-col p-10 pt-32"
          >
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-12">
              <div className="text-[10px] font-mono text-resolver-blue uppercase tracking-[0.5em] mb-4">Explore Menu</div>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.href.startsWith('#') || (link.href.startsWith('/#')) ? (
                    <a 
                      href={link.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="group block"
                    >
                      <div className="text-4xl font-black text-white uppercase tracking-tighter group-hover:text-resolver-blue transition-colors">{link.name}</div>
                      <div className="text-xs font-mono text-white/40 mt-2">{link.desc}</div>
                    </a>
                  ) : (
                    <Link 
                      to={link.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="group block"
                    >
                      <div className="text-4xl font-black text-white uppercase tracking-tighter group-hover:text-resolver-blue transition-colors">{link.name}</div>
                      <div className="text-xs font-mono text-white/40 mt-2">{link.desc}</div>
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-12 border-t border-white/10"
              >
                <button 
                  onClick={() => { onOpenModal('B.A.T Pilot'); setIsMenuOpen(false); }}
                  className="w-full py-6 bg-resolver-blue text-mission-black font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(0,209,255,0.3)] flex items-center justify-center gap-4"
                >
                  Start Free Pilot <Zap className="w-5 h-5" />
                </button>
              </motion.div>
            </div>

             <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">
                <div>Powered by AI</div>
                <div>© 2026 BIZSTARTUP</div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
