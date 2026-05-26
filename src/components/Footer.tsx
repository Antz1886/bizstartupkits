import React from 'react';
import { Cloud, Rocket, Linkedin, Twitter, Github, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="pt-24 md:pt-48 pb-16 bg-mission-black text-white border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-24 md:mb-32">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-4 mb-10 group">
              <div className="relative w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm group-hover:border-resolver-blue transition-colors">
                <Rocket className="w-6 h-6 text-resolver-blue transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black tracking-[0.4em] text-white">BIZSTARTUP</span>
                <span className="text-[9px] font-mono text-resolver-blue uppercase tracking-[0.2em]">Agentic Workforce</span>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-10 font-medium max-w-xs">
              The high-performance Agentic Workforce partner for South African SMEs. We deploy autonomous Resolver Nodes that reclaim your "Ghost Capacity" through engineered intelligence.
            </p>
            <div className="flex gap-4 mb-12">
              <a href="#" className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-resolver-blue hover:text-mission-black transition-all"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-resolver-blue hover:text-mission-black transition-all"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-resolver-blue hover:text-mission-black transition-all"><Github className="w-5 h-5" /></a>
            </div>
            <div className="space-y-3 text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <p className="hover:text-resolver-blue transition-colors cursor-pointer">sales@biztartupkits.tech</p>
              <p>+27 79 894 0476</p>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-resolver-blue">SME Tools</h4>
            <ul className="space-y-6 text-[12px] font-black uppercase tracking-[0.2em] text-white/60">
              <li><Link to="/knowledge-hub" className="hover:text-resolver-blue transition-colors">Compliance Guide</Link></li>
              <li><Link to="/portal" className="hover:text-resolver-blue transition-colors">Client Portal</Link></li>
              <li><Link to="/knowledge-hub" className="hover:text-resolver-blue transition-colors">Business Planner</Link></li>
              <li><Link to="/knowledge-hub" className="hover:text-resolver-blue transition-colors">Local SEO & Branding</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-resolver-blue">Corporate ESD</h4>
            <ul className="space-y-6 text-[12px] font-black uppercase tracking-[0.2em] text-white/60">
              <li><Link to="/sponsor" className="hover:text-resolver-blue transition-colors">ESD Sponsorships</Link></li>
              <li><Link to="/sponsor" className="hover:text-resolver-blue transition-colors">B-BBEE Calculator</Link></li>
              <li><Link to="/portal" className="hover:text-resolver-blue transition-colors">Partner Dashboard</Link></li>
              <li><Link to="/portal" className="hover:text-resolver-blue transition-colors">Mentorship Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-resolver-blue">Briefings</h4>
            <p className="text-sm text-white/50 mb-8 font-medium">Join 500+ SME leaders receiving our weekly technical resolution briefings.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Business_Email" className="bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-xs font-mono focus:outline-none focus:border-resolver-blue w-full text-white" />
              <button className="bg-resolver-blue text-mission-black p-4 rounded-sm hover:bg-white transition-all"><ArrowRight className="w-5 h-5" /></button>
            </div>
            <div className="mt-6 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-resolver-green animate-pulse" />
               <span className="text-[8px] font-mono text-resolver-green uppercase tracking-widest">Global Network Active</span>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">
          <div className="flex items-center gap-3">
             <Zap className="w-3 h-3 text-resolver-blue" />
             <p>© 2026 BIZSTARTUP KIT. Engineered in South Africa.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <Link to="/corporate/contact" className="hover:text-white/40 transition-colors">Contact</Link>
            <Link to="/legal/privacy" className="hover:text-white/40 transition-colors">Privacy Node</Link>
            <Link to="/legal/terms" className="hover:text-white/40 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
