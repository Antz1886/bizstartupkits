import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Handshake, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

const EngagementModel = () => {
  return (
    <div className="pt-40">
      <section className="px-10 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-8">Corporate Structure</div>
              <h1 className="text-7xl md:text-9xl leading-[0.88] mb-12 tracking-tighter">
                Engagement <br /> <span className="text-gradient">Model.</span>
              </h1>
              <p className="text-xl text-ink/60 mb-12 max-w-xl leading-relaxed font-medium">
                We offer tiered partnership structures designed to align with your business lifecycle—from rapid deployment to ongoing enterprise evolution.
              </p>
              <button className="btn-primary">
                View Partnership Tiers
              </button>
            </motion.div>
            <div className="bg-brand-secondary p-12 rounded-2xl shadow-2xl border border-white/5 text-white">
               <h3 className="text-2xl font-bold mb-10 uppercase tracking-widest text-brand-primary">The Synergy Core</h3>
               <div className="space-y-12">
                  {[
                    { icon: Handshake, title: "Strategic Retainers", desc: "Ongoing advisory and system support for established enterprises seeking continuous innovation." },
                    { icon: Briefcase, title: "Project-Based Implementation", desc: "Fixed-scope deployments targeting specific operational bottlenecks or AI integrations." },
                    { icon: ShieldCheck, title: "Infrastructure-as-a-Service", desc: "Long-term hosting and maintenance of proprietary AI nodes and data intelligence systems." }
                  ].map((tier, i) => (
                    <div key={i} className="flex gap-8 group cursor-default">
                       <div className="w-14 h-14 bg-white/5 rounded-sm flex items-center justify-center shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                         <tier.icon className="w-7 h-7 text-white group-hover:text-brand-primary transition-colors" />
                       </div>
                       <div>
                          <div className="text-xl font-bold mb-2">{tier.title}</div>
                          <p className="text-sm text-white/40 leading-relaxed">{tier.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-10">
          <div className="text-center mb-24">
             <h2 className="text-5xl font-black uppercase text-brand-secondary">Partnership Lifecycle.</h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
             {[
               { stage: "Year 1", title: "Foundation", desc: "Core system architecture and operational rewiring. Establishing the digital nervous system." },
               { stage: "Year 2", title: "Scale", desc: "Multiplying efficiency across all departments and deepening proprietary AI capabilities." },
               { stage: "Year 3+", title: "Evolution", desc: "Transitioning to a fully autonomous, data-aggressive enterprise that dominates its market." }
             ].map((p, i) => (
                <div key={i} className="p-16 bg-bg-dark rounded-sm relative overflow-hidden group">
                   <div className="text-9xl font-black text-ink/5 absolute -bottom-10 -right-10 leading-none pointer-events-none">{i+1}</div>
                   <div className="text-[10px] font-black text-brand-primary mb-6 tracking-[0.4em]">{p.stage}</div>
                   <h3 className="text-3xl font-bold mb-6">{p.title}</h3>
                   <p className="text-ink/50 leading-relaxed relative z-10">{p.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-bg-dark border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-10 text-center">
            <h2 className="text-6xl font-black uppercase mb-12 tracking-tighter text-brand-secondary">Initialize <span className="text-brand-primary">Engagement.</span></h2>
            <p className="text-xl text-ink/50 mb-16 max-w-2xl mx-auto">
              Our engagement models are built for depth, not breadth. We only partner with SMEs ready for a serious technical transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
               <button className="px-12 py-6 bg-brand-secondary text-white font-black uppercase tracking-widest text-sm hover:bg-brand-primary transition-all">
                  Request Partner Onboarding
               </button>
               <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-brand-secondary border-b-2 border-brand-primary pb-2 hover:text-brand-primary transition-colors">
                  Contact Relations <ArrowRight className="w-4 h-4" />
               </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default EngagementModel;
