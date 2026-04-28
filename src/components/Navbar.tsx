import React, { useState, useEffect } from 'react';
import { Cloud, Rocket } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';

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

  const navLinks = [
    { name: 'AI Suite', href: isHome ? '#ai-suite' : '/#ai-suite' },
    { name: 'Solutions', href: isHome ? '#solutions' : '/#solutions' },
    { name: 'Impact', href: isHome ? '#impact-cases' : '/#impact-cases' },
    { name: 'Industries', href: isHome ? '#industries' : '/#industries' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-5",
      isScrolled ? "bg-white/95 backdrop-blur-md border-b border-ink/10 py-3 shadow-lg" : "bg-transparent py-8"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            <Cloud className={cn("absolute inset-0 w-8 h-8 md:w-10 md:h-10 transform transition-colors", isScrolled ? "text-brand-secondary fill-brand-secondary/5" : "text-brand-secondary fill-brand-secondary")} />
            <Rocket className="relative z-10 w-4 h-4 md:w-5 md:h-5 text-brand-primary transform -rotate-45 -translate-y-1 translate-x-1" />
          </div>
          <span className="text-[12px] md:text-[14px] font-black tracking-[0.2em] md:tracking-[0.3em] text-brand-secondary">BIZSTARTUP KIT</span>
        </Link>

        {/* Desktop Links */}
        <div className={cn("hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] transition-colors", isScrolled ? "text-ink/60" : "text-ink/40")}>
          {navLinks.map((link) => (
             link.href.startsWith('#') || (link.href.startsWith('/#')) ? (
               <a key={link.name} href={link.href} className="hover:text-brand-primary transition-colors">
                 {link.name}
               </a>
             ) : (
               <Link key={link.name} to={link.href} className="hover:text-brand-primary transition-colors">
                 {link.name}
               </Link>
             )
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <button 
              onClick={() => onOpenModal('Strategic Assessment')}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-secondary border-b-2 border-brand-primary pb-1 hover:text-brand-primary transition-colors"
            >
              Get Your Kit
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-8 h-8 flex flex-col justify-center gap-1.5 focus:outline-none"
          >
            <div className={cn("w-full h-0.5 bg-brand-secondary transition-all", isMenuOpen && "rotate-45 translate-y-2")} />
            <div className={cn("w-full h-0.5 bg-brand-secondary transition-all", isMenuOpen && "opacity-0")} />
            <div className={cn("w-full h-0.5 bg-brand-secondary transition-all", isMenuOpen && "-rotate-45 -translate-y-2")} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-ink/10 py-10 px-10 flex flex-col gap-8 lg:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
               link.href.startsWith('#') || (link.href.startsWith('/#')) ? (
                 <a 
                   key={link.name} 
                   href={link.href} 
                   onClick={() => setIsMenuOpen(false)}
                   className="text-[12px] font-black uppercase tracking-[0.4em] text-brand-secondary hover:text-brand-primary transition-colors"
                 >
                   {link.name}
                 </a>
               ) : (
                 <Link 
                   key={link.name} 
                   to={link.href} 
                   onClick={() => setIsMenuOpen(false)}
                   className="text-[12px] font-black uppercase tracking-[0.4em] text-brand-secondary hover:text-brand-primary transition-colors"
                 >
                   {link.name}
                 </Link>
               )
            ))}
            <button 
              onClick={() => { onOpenModal('Strategic Assessment'); setIsMenuOpen(false); }}
              className="btn-primary w-full"
            >
              Get Your Kit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
