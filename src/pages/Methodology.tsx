import React from 'react';
import { motion } from 'motion/react';
import { Search, PenTool, Rocket, Repeat, CheckCircle2 } from 'lucide-react';

const Methodology = () => {
  const steps = [
    { 
      title: "Discovery & Data Audit", 
      desc: "We begin with a deep-tissue investigation of your current operational silos and data sources.",
      icon: Search,
      deliverable: "Strategic Audit Report"
    },
    { 
      title: "Architectural Blueprinting", 
      desc: "Our senior engineers design the technical roadmap and AI integration nodes for your specific stack.",
      icon: PenTool,
      deliverable: "System Blueprint"
    },
    { 
      title: "Agile Deployment", 
      desc: "Rapid implementation of core technologies using an iterative, feedback-driven deployment protocol.",
      icon: Rocket,
      deliverable: "v1.0 Live Instance"
    },
    { 
      title: "Optimization & Growth", 
      desc: "Continuous cognitive tuning and scaling of existing systems based on real-world telemetry.",
      icon: Repeat,
      deliverable: "Ongoing Performance Log"
    }
  ];

  return (
    <div className="pt-40">
      <section className="px-10 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-12">Corporate Methodology</div>
            <h1 className="text-7xl md:text-9xl leading-[0.88] mb-12 tracking-tighter">
              The Protocol <br /> <span className="text-gradient">for Growth.</span>
            </h1>
            <p className="text-2xl text-ink/60 max-w-3xl mx-auto leading-relaxed font-light italic border-y border-ink/5 py-12 mb-12">
              "We don't believe in modular solutions; we believe in systemic transformation through rigorous, phased engineering."
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-brand-secondary text-white relative">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
             {steps.map((step, i) => (
                <div key={i} className="p-16 bg-brand-secondary relative group overflow-hidden">
                   <div className="absolute top-10 right-10 text-6xl font-black text-white/5 group-hover:text-brand-primary/10 transition-colors">0{i+1}</div>
                   <step.icon className="w-10 h-10 text-brand-primary mb-10" />
                   <h3 className="text-2xl font-bold mb-6">{step.title}</h3>
                   <p className="text-white/40 text-sm leading-relaxed mb-10">{step.desc}</p>
                   <div className="pt-10 border-t border-white/5">
                      <div className="text-[9px] font-black uppercase tracking-widest text-brand-primary mb-2">Phase Deliverable</div>
                      <div className="text-lg font-bold">{step.deliverable}</div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-48 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-10">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
               <div>
                  <h2 className="text-5xl md:text-7xl font-black uppercase mb-12 leading-tight">Rigorous <br /> Validation.</h2>
                  <p className="text-xl text-ink/50 mb-12 font-medium">Every line of code and every AI prompt is subjected to a triple-validation protocol to ensure market-readiness and security.</p>
                  <ul className="space-y-6">
                    {["Static Security Analysis", "Dynamic Load Simulation", "Bias & Hallucination Audits", "Red-Team Stress Testing"].map((t, i) => (
                      <li key={i} className="flex items-center gap-6">
                        <CheckCircle2 className="w-6 h-6 text-brand-primary" />
                        <span className="text-xl font-bold text-brand-secondary">{t}</span>
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="relative">
                  <div className="aspect-video bg-bg-dark border border-ink/5 flex items-center justify-center p-20 shadow-2xl rounded-2xl">
                     <div className="w-full h-full relative">
                        <div className="absolute inset-0 bg-brand-primary/10 blur-3xl rounded-full animate-pulse" />
                        <div className="relative z-10 grid grid-cols-4 gap-4 h-full">
                           {Array.from({ length: 4 }).map((_, i) => (
                              <motion.div 
                                key={i}
                                animate={{ height: ["20%", "80%", "40%", "90%"] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                className="w-full bg-brand-secondary rounded-sm"
                              />
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="py-32 bg-bg-dark border-y border-ink/5">
        <div className="max-w-7xl mx-auto px-10 text-center">
            <h2 className="text-6xl font-black uppercase mb-12 tracking-tighter text-brand-secondary">Adopt the <span className="text-brand-primary">Method.</span></h2>
            <p className="text-xl text-ink/50 mb-16 max-w-2xl mx-auto">
              Our methodology is a battle-tested roadmap designed for high-stakes environments. Join the ranks of SMEs who refuse to settle for mediocrity.
            </p>
            <button className="btn-primary">
              Download Full Methodology Book
            </button>
        </div>
      </section>
    </div>
  );
};

export default Methodology;
