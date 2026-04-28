import React from 'react';
import { Cloud, Rocket, Linkedin, Twitter, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="pt-20 md:pt-32 pb-16 bg-brand-secondary text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 mb-16 md:mb-24">
        <div className="col-span-1 lg:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Cloud className="absolute inset-0 w-10 h-10 text-white opacity-20" />
              <Rocket className="relative z-10 w-6 h-6 text-brand-primary transform -rotate-45" />
            </div>
            <span className="text-xl font-display font-black tracking-widest uppercase">BIZSTARTUP KIT</span>
          </Link>
          <p className="text-sm text-white/50 leading-relaxed mb-8 font-medium">
            The strategic growth partner for modern enterprises. We provide the technical blueprints and automated systems SMEs need to succeed in a digital-first economy.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-brand-primary">Services</h4>
          <ul className="space-y-6 text-sm text-white/50 font-bold tracking-tight">
            <li><Link to="/services/enterprise-ai" className="hover:text-white transition-colors">Enterprise AI Suite</Link></li>
            <li><Link to="/services/cognitive-automation" className="hover:text-white transition-colors">Cognitive Automation</Link></li>
            <li><Link to="/services/strategic-bi" className="hover:text-white transition-colors">Strategic BI Consulting</Link></li>
            <li><Link to="/services/system-architecture" className="hover:text-white transition-colors">System Architecture</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-brand-primary">Corporate</h4>
          <ul className="space-y-6 text-sm text-white/50 font-bold tracking-tight">
            <li><Link to="/corporate/methodology" className="hover:text-white transition-colors">Our Methodology</Link></li>
            <li><Link to="/corporate/engagement" className="hover:text-white transition-colors">Engagement Model</Link></li>
            <li><Link to="/corporate/whitepapers" className="hover:text-white transition-colors">Whitepapers</Link></li>
            <li><Link to="/corporate/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-brand-primary">Insights</h4>
          <p className="text-sm text-white/50 mb-6 font-medium">Join 500+ SME leaders receiving our weekly strategic AI briefings.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Business Email" className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-brand-primary w-full" />
            <button className="bg-brand-primary text-white p-3 rounded-sm"><ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">
        <p className="text-center md:text-left">© 2026 BIZSTARTUP KIT. Your Online Growth Partner.</p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <Link to="/corporate/contact" className="hover:text-white transition-colors">Contact</Link>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
