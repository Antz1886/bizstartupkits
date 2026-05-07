import React from 'react';
import { motion } from 'motion/react';
import { Handshake, Zap, ShieldCheck, Mail, ArrowRight, TrendingUp, Clock, UserCheck } from 'lucide-react';
import { SuccessSeal } from '../components/SuccessSeal';

const BATModel = () => {
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
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-8">Engagement Protocol</div>
              <h1 className="text-7xl md:text-9xl leading-[0.88] mb-12 tracking-tighter">
                The B.A.T <br /> <span className="text-gradient">Model.</span>
              </h1>
              <p className="text-xl text-ink/60 mb-12 max-w-xl leading-relaxed font-medium">
                Build AI Together. A performance-first engagement model designed to lower the entry barrier for South African SMEs ready for technical transformation.
              </p>
              <button className="btn-primary">
                Start Free B.A.T Pilot
              </button>
            </motion.div>
            <div className="bg-brand-secondary p-12 rounded-2xl shadow-2xl border border-white/5 text-white">
               <h3 className="text-2xl font-bold mb-10 uppercase tracking-widest text-brand-primary">The B.A.T Pillars</h3>
               <div className="space-y-12">
                  {[
                    { icon: Clock, title: "Zero Upfront Friction", desc: "No initial investment required to prove the value of our AgentMesh™ nodes." },
                    { icon: UserCheck, title: "Dedicated Engineering", desc: "Every pilot is overseen by a Lead Reliability Engineer to ensure the 83% resolution benchmark." },
                    { icon: ShieldCheck, title: "Outcome-Based Success", desc: "You only commit once the technical performance and ROI are confirmed in your environment." }
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

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-10">
          <SuccessSeal />
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-10">
          <div className="text-center mb-24">
             <h2 className="text-5xl font-black uppercase text-brand-secondary">Pilot Lifecycle.</h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
             {[
               { stage: "Phase 1", title: "Audit & Config", desc: "10-minute activation of the Ghost Capacity Audit and initial node deployment." },
               { stage: "Phase 2", title: "Benchmark Run", desc: "14-day live pilot to hit the 83% autonomous resolution threshold." },
               { stage: "Phase 3", title: "Full Mesh Scale", desc: "Transitioning to a fully integrated AgentMesh™ workforce across all silos." }
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
            <h2 className="text-6xl font-black uppercase mb-12 tracking-tighter text-brand-secondary">Start Your <span className="text-brand-primary">Recovery.</span></h2>
            <p className="text-xl text-ink/50 mb-16 max-w-2xl mx-auto">
              Our B.A.T model is built for speed and results. Recover your "Ghost Capacity" with zero risk.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
               <button className="px-12 py-6 bg-brand-secondary text-white font-black uppercase tracking-widest text-sm hover:bg-brand-primary transition-all">
                  Request B.A.T Pilot Onboarding
               </button>
               <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-brand-secondary border-b-2 border-brand-primary pb-2 hover:text-brand-primary transition-colors">
                  Contact Lead Engineer <ArrowRight className="w-4 h-4" />
               </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default BATModel;
