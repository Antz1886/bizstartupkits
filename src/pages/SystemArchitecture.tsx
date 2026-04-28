import React from 'react';
import { motion } from 'motion/react';
import { Database, Network, Server, ShieldAlert, Layers, Search } from 'lucide-react';
import { cn } from '../lib/utils';

const MetaLabel = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary leading-none", className)}>
    {children}
  </div>
);

const SystemArchitecture = () => {
  return (
    <div className="pt-40">
      <section className="px-6 md:px-10 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-6 md:mb-8">Service Segment: 04</div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl leading-[0.88] mb-8 md:mb-12 tracking-tighter">
                System <br /> <span className="text-gradient">Architecture.</span>
              </h1>
              <p className="text-lg md:text-xl text-ink/60 mb-8 md:mb-12 max-w-xl leading-relaxed font-medium">
                Engineering the foundational infrastructure of the digital-first economy. We build scalable, resilient, and high-security systems that serve as the backbone for your growth.
              </p>
              <button className="btn-primary w-full md:w-auto">
                View Infrastructure Blueprints
              </button>
            </motion.div>
            <div className="relative">
              <div className="grid grid-cols-8 gap-2 aspect-square">
                 {Array.from({ length: 64 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.1, 0.4, 0.1] }}
                      transition={{ delay: (i % 8) * 0.1 + (Math.floor(i / 8) * 0.1), duration: 2, repeat: Infinity }}
                      className="w-full h-full bg-brand-secondary rounded-sm"
                    />
                 ))}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-12 shadow-2xl rounded-sm border border-ink/5">
                       <Database className="w-16 h-16 text-brand-primary" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16 md:mb-24">
             <h2 className="text-4xl md:text-5xl font-black uppercase text-brand-secondary mb-6">Designed for Immortality.</h2>
             <p className="text-lg md:text-xl text-ink/40 max-w-2xl mx-auto font-medium">Systems that don't just work today, but are architected to scale 100x without technical debt or structural failure.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
             {[
               { icon: Server, title: "Cloud Native Stacks", desc: "Serverless architectures designed for infinite vertical and horizontal scalability." },
               { icon: Network, title: "Microservices Logic", desc: "De-coupling your business logic into resilient, independent nodes that fail-over gracefully." },
               { icon: ShieldAlert, title: "Security Hardening", desc: "Zero-trust environments with end-to-end encryption at the infrastructure level." }
             ].map((item, i) => (
               <div key={i} className="p-16 bg-white hover:bg-bg-dark transition-all group">
                  <div className="w-12 h-12 mb-8 bg-brand-secondary/5 flex items-center justify-center rounded-sm group-hover:bg-brand-primary/10 transition-colors">
                    <item.icon className="w-6 h-6 text-brand-secondary group-hover:text-brand-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6">{item.title}</h3>
                  <p className="text-ink/50 leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-48 bg-brand-secondary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
           <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
              <div>
                 <MetaLabel className="mb-6 md:mb-10 text-brand-primary">The Convergence Factor</MetaLabel>
                 <h2 className="text-5xl md:text-7xl lg:text-8xl leading-none mb-8 md:mb-12">Convergent <br /> Systems.</h2>
                 <p className="text-lg md:text-xl text-white/40 leading-relaxed italic border-l-2 border-brand-primary/30 pl-6 md:pl-10 mb-8 md:mb-12">
                    Our architecture methodology focuses on convergence—unifying disparate legacy systems into a single, high-performance digital nervous system.
                 </p>
                 <div className="grid md:grid-cols-2 gap-8">
                    {[
                      "Legacy API Bridges",
                      "Database Refactoring",
                      "CI/CD Pipeline Design",
                      "Infrastructure as Code"
                    ].map((f, i) => (
                      <div key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/60">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                         {f}
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative aspect-video">
                 <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2070&auto=format&fit=crop" alt="Server Room" className="w-full h-full object-cover rounded-2xl opacity-40 shadow-2xl" />
                 <div className="absolute inset-0 border border-white/10 m-6 rounded-xl" />
              </div>
           </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-10 text-center">
            <h2 className="text-6xl font-black uppercase mb-12 tracking-tighter text-brand-secondary">Secure Your <span className="text-brand-primary">Backbone.</span></h2>
            <p className="text-xl text-ink/50 mb-16 max-w-2xl mx-auto">
              Infrastructure is the only part of your business that you can't afford to get wrong. Let our senior architects design your future today.
            </p>
            <button className="px-12 py-6 bg-brand-secondary text-white font-black uppercase tracking-widest text-sm hover:bg-brand-primary transition-all">
              Request Architecture Audit
            </button>
        </div>
      </section>
    </div>
  );
};

export default SystemArchitecture;
