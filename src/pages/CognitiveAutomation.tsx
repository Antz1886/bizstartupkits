import React from 'react';
import { motion } from 'motion/react';
import { Zap, Workflow, Timer, CheckCircle, ArrowRight } from 'lucide-react';

const CognitiveAutomation = () => {
  return (
    <div className="pt-40">
      <section className="px-6 md:px-10 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-6 md:mb-8">Service Segment: 02</div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl leading-[0.88] mb-8 md:mb-12 tracking-tighter">
                Cognitive <br /> <span className="text-gradient">Automation.</span>
              </h1>
              <p className="text-lg md:text-xl text-ink/60 mb-8 md:mb-12 max-w-xl leading-relaxed font-medium">
                Eliminate the friction of manual operations. We build autonomous systems that think, learn, and execute business logic with superhuman precision.
              </p>
              <button className="btn-primary w-full md:w-auto">
                Explore Automation Logic
              </button>
            </motion.div>
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-6 pt-12">
                 <div className="bg-white p-10 rounded-lg border border-ink/5 shadow-xl">
                    <div className="text-4xl font-black text-brand-secondary mb-2">95%</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Error Reduction</div>
                 </div>
                 <div className="bg-white p-10 rounded-lg border border-ink/5 shadow-xl">
                    <div className="text-4xl font-black text-brand-secondary mb-2">12x</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Speed Increase</div>
                 </div>
               </div>
               <div className="space-y-6">
                 <div className="bg-brand-secondary p-10 rounded-lg shadow-xl text-white">
                    <Zap className="w-10 h-10 text-brand-primary mb-6" />
                    <div className="text-lg font-bold">Real-time <br /> Processing</div>
                 </div>
                 <div className="bg-white p-10 rounded-lg border border-ink/5 shadow-xl">
                    <div className="text-4xl font-black text-brand-secondary mb-2">24/7</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Operational Continuity</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16 md:mb-24">
             <h2 className="text-4xl md:text-5xl font-black uppercase text-brand-secondary mb-6">Automation Without Compromise.</h2>
             <p className="text-lg md:text-xl text-ink/40 max-w-2xl mx-auto font-medium">Traditional automation is brittle. Cognitive automation is adaptive, handling exceptions and unstructured data with ease.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
             <div className="p-16 bg-bg-dark rounded-sm flex gap-10 items-start">
                <Workflow className="w-12 h-12 text-brand-primary shrink-0" />
                <div>
                   <h3 className="text-2xl font-bold mb-6">Workflow Orchestration</h3>
                   <p className="text-ink/50 leading-relaxed">We map your entire business logic and rebuild it into a self-correcting autonomous engine that coordinates between humans and machines.</p>
                </div>
             </div>
             <div className="p-16 bg-bg-dark rounded-sm flex gap-10 items-start">
                <Timer className="w-12 h-12 text-brand-primary shrink-0" />
                <div>
                   <h3 className="text-2xl font-bold mb-6">Execution Velocity</h3>
                   <p className="text-ink/50 leading-relaxed">Redesign processes to run at CPU speeds. Tasks that took weeks now resolve in milliseconds, enabling real-time business responsiveness.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-brand-secondary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 md:gap-32 items-center relative z-10">
           <div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase mb-8 md:mb-12">Systemic <br /> <span className="text-brand-primary">Autonomy.</span></h2>
              <div className="space-y-8">
                {[
                  { title: "Intelligent Document Processing", desc: "Extract and validate logic from complex contracts, invoices, and forms automatically." },
                  { title: "Autonomous Sales Flows", desc: "Nurture, score, and route leads through optimized funnels without manual intervention." },
                  { title: "Logistics Synchronization", desc: "Global supply chain state management driven by real-time predictive data." }
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="text-lg font-bold mb-2 flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-brand-primary" />
                      {item.title}
                    </div>
                    <p className="text-white/40 pl-6 border-l border-white/10 group-hover:border-brand-primary transition-colors">{item.desc}</p>
                  </div>
                ))}
              </div>
           </div>
           <div className="relative">
              <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10">
                 <img src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2074&auto=format&fit=crop" alt="Modern Tech" className="rounded-xl opacity-80" />
              </div>
           </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-10 text-center">
            <h2 className="text-6xl font-black uppercase mb-12 tracking-tighter text-brand-secondary">Scale Your <span className="text-brand-primary">Logic.</span></h2>
            <p className="text-xl text-ink/50 mb-16 max-w-2xl mx-auto">
              Cognitive automation isn't about replacing people; it's about amplifying their strategic potential by absorbing the functional noise.
            </p>
            <button className="px-12 py-6 bg-brand-secondary text-white font-black uppercase tracking-widest text-sm hover:bg-brand-primary transition-all">
              Initiate Automation Audit
            </button>
        </div>
      </section>
    </div>
  );
};

export default CognitiveAutomation;
