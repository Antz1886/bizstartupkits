import React from 'react';
import { motion } from 'motion/react';
import { Bot, Shield, Cpu, ChevronRight, ArrowRight } from 'lucide-react';

const EnterpriseAISuite = () => {
  return (
    <div className="pt-40">
      {/* Hero Section */}
      <section className="px-6 md:px-10 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-6 md:mb-8">Service Segment: 01</div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl leading-[0.88] mb-8 md:mb-12 tracking-tighter">
                Enterprise <br /> <span className="text-gradient">AI Suite.</span>
              </h1>
              <p className="text-lg md:text-xl text-ink/60 mb-8 md:mb-12 max-w-xl leading-relaxed font-medium">
                Proprietary neural architectures deployed locally or in high-security cloud environments. Designed to move your enterprise from data-passive to data-aggressive.
              </p>
              <button className="btn-primary w-full md:w-auto">
                Download Architecture Brief
              </button>
            </motion.div>
            <div className="relative">
              <div className="aspect-square bg-brand-secondary rounded-2xl overflow-hidden shadow-2xl relative">
                 <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" alt="AI Interface" className="w-full h-full object-cover opacity-60" />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-transparent" />
                 <div className="absolute bottom-10 left-10">
                    <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4">Instance Status</div>
                    <div className="text-4xl font-black text-white">ACTIVE_NODE_01</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 md:mb-10 text-brand-secondary">The Problem.</h2>
              <p className="text-lg md:text-xl text-ink/60 font-medium leading-relaxed">
                Modern SMEs are drowning in generic SaaS tools that lack deep vertical integration. Information silos prevent AI from reaching its full potential, leaving your business with a disjointed "Frankenstein" stack.
              </p>
            </div>
            <div className="space-y-12">
              <div className="pb-12 border-b border-ink/5">
                <div className="text-2xl font-bold mb-4">Siloed Data Logic</div>
                <p className="text-ink/40">Your CRM doesn't talk to your logistics engine, creating logic gaps that AI cannot bridge without a unified suite.</p>
              </div>
              <div className="pb-12 border-b border-ink/5 border-ink/5">
                <div className="text-2xl font-bold mb-4">Security Leakage</div>
                <p className="text-ink/40">Generic AI platforms often store your proprietary business logic in shared clusters, risking intellectual property leakage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-20 md:py-32 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16 md:mb-24">
            <div className="text-brand-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-8">Our Response</div>
            <h2 className="text-4xl md:text-6xl font-black text-brand-secondary">The Unified AI Ecosystem.</h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { 
                title: "Private LLM Nodes", 
                desc: "Your data never leaves your environment. We deploy custom-tuned models that understand your specific industry jargon.",
                icon: Shield
              },
              { 
                title: "Vector Data Lakes", 
                desc: "Turn your document archives, emails, and call logs into a searchable, intelligent memory bank for your AI.",
                icon: Cpu
              },
              { 
                title: "Cognitive Agents", 
                desc: "Autonomous bots that don't just 'suggest' but 'act'—executing complex multi-step tasks across your entire stack.",
                icon: Bot
              }
            ].map((sol, i) => (
              <div key={i} className="p-12 bg-white rounded-lg border border-ink/5 group hover:border-brand-primary transition-all">
                <div className="w-16 h-16 bg-brand-secondary/5 rounded-sm flex items-center justify-center mb-8 group-hover:bg-brand-primary/10 transition-colors">
                  <sol.icon className="w-8 h-8 text-brand-secondary group-hover:text-brand-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-6">{sol.title}</h3>
                <p className="text-ink/50 leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
             <div className="order-2 lg:order-1">
               <img src="https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop" alt="Data Analytics" className="rounded-2xl shadow-2xl" />
             </div>
             <div className="order-1 lg:order-2">
                <h2 className="text-5xl font-black uppercase mb-12 text-brand-secondary">Deep Technical <br /> Integration.</h2>
                <ul className="space-y-8">
                  {[
                    "Zero-Latency Logic Execution",
                    "Multi-Model Orchestration (GPT-4o, Claude 3.5, Llama 3.1)",
                    "Custom Knowledge Retrieval (RAG) Architecture",
                    "End-to-End Encryption & GDPR Compliance"
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-6 group">
                      <div className="w-10 h-10 rounded-full border border-brand-primary/20 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                        <ChevronRight className="w-5 h-5 text-brand-primary group-hover:text-white" />
                      </div>
                      <span className="text-xl font-bold text-ink/70">{f}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Funnel */}
      <section className="py-20 md:py-32 bg-brand-secondary text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 md:mb-12 tracking-tighter">Ready for the <span className="text-brand-primary">Suite?</span></h2>
            <p className="text-lg md:text-xl text-white/50 mb-12 md:mb-16 max-w-2xl mx-auto">
              Our enterprise AI suite is not a product—it's a transformation. Start your deployment roadmap today.
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <button className="w-full md:w-auto px-12 py-6 bg-brand-primary text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-brand-secondary transition-all">
                Request Suite Demo
              </button>
              <button className="w-full md:w-auto px-12 py-6 border-2 border-white/20 text-white font-black uppercase tracking-widest text-sm hover:border-white transition-all">
                View Spec Sheet
              </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default EnterpriseAISuite;
