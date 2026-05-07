import React from 'react';
import { motion } from 'motion/react';
import { Bot, Shield, Cpu, ChevronRight, ArrowRight, Code, Database, Network } from 'lucide-react';

const CustomPythonResolvers = () => {
  return (
    <div className="pt-40">
      <section className="px-6 md:px-10 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-6 md:mb-8">Service Segment: 02</div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl leading-[0.88] mb-8 md:mb-12 tracking-tighter">
                Custom Python <br /> <span className="text-gradient">Resolvers.</span>
              </h1>
              <p className="text-lg md:text-xl text-ink/60 mb-8 md:mb-12 max-w-xl leading-relaxed font-medium">
                Deep technical orchestration built in Antigravity. We engineer complex logic nodes that integrate natively "inside" your existing system silos.
              </p>
              <button className="btn-primary w-full md:w-auto">
                Request Logic Blueprint
              </button>
            </motion.div>
            <div className="relative">
              <div className="aspect-square bg-bg-dark rounded-2xl overflow-hidden shadow-2xl relative border border-white/5">
                 <div className="absolute inset-0 bg-dot opacity-20" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Code className="w-32 h-32 text-brand-primary opacity-20" />
                 </div>
                 <div className="absolute bottom-10 left-10 p-6 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                    <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4">Node Orchestration</div>
                    <div className="text-2xl font-black text-white font-mono">RESOLVER_CORE_v2.py</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 md:mb-10 text-brand-secondary">The Logic Gap.</h2>
              <p className="text-lg md:text-xl text-ink/60 font-medium leading-relaxed">
                Generic AI tools can't handle the high-complexity business logic specific to your vertical. Information silos prevent standard AI from reaching the deeper layers of your operations.
              </p>
            </div>
            <div className="space-y-12">
              <div className="pb-12 border-b border-ink/5">
                <div className="text-2xl font-bold mb-4">Fragmented Logic Silos</div>
                <p className="text-ink/40">When your systems don't share logic, AI remains superficial. We bridge these gaps with custom Python resolvers that unify your digital nervous system.</p>
              </div>
              <div className="pb-12 border-b border-ink/5 border-ink/5">
                <div className="text-2xl font-bold mb-4">Governance Risk</div>
                <p className="text-ink/40">Our resolvers include built-in hallucination prevention and auto-escalation protocols, ensuring 100% reliability in high-stakes decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16 md:mb-24">
            <div className="text-brand-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-8">Technical Edge</div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Engineered <span className="text-brand-primary">Orchestration.</span></h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { 
                title: "Antigravity Flows", 
                desc: "High-fidelity Python logic nodes built to handle complex business rules that standard LLMs miss.",
                icon: Network
              },
              { 
                title: "Native 'Inside' Sync", 
                desc: "Direct integration with Salesforce, HubSpot, and Shopify. No intermediate layers, just pure data velocity.",
                icon: Database
              },
              { 
                title: "Hallucination Guards", 
                desc: "Proprietary AI governance that prevents false outputs and ensures every resolution is factually grounded.",
                icon: Shield
              }
            ].map((sol, i) => (
              <div key={i} className="p-12 bg-white/5 rounded-lg border border-white/5 group hover:border-brand-primary transition-all">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <sol.icon className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white">{sol.title}</h3>
                <p className="text-white/40 leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
             <div className="order-2 lg:order-1 relative aspect-video bg-bg-dark rounded-2xl overflow-hidden flex items-center justify-center border border-ink/5">
                <div className="text-[10px] font-mono text-brand-primary p-12 overflow-hidden opacity-40">
                  {`def resolve_business_task(input_data):
  # Antigravity Logic Engine v4
  node = AgentMesh.initialize('RELIABILITY_CORE')
  context = node.fetch_context(input_data.silo_id)
  
  if node.validate_intent(context):
    resolution = node.execute_resolver(input_data.task_type)
    return node.sync_to_crm(resolution)
  else:
    return node.escalate_to_human(input_data.task_id)`}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent" />
             </div>
             <div className="order-1 lg:order-2">
                <h2 className="text-5xl font-black uppercase mb-12 text-brand-secondary">Native System <br /> Integration.</h2>
                <ul className="space-y-8">
                  {[
                    "Custom Python Logic Nodes",
                    "Native Salesforce & HubSpot Intercepts",
                    "POPIA-Compliant Data Sovereignty",
                    "Automated Escalation Protocols"
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

      <section className="py-20 md:py-32 bg-brand-secondary text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 md:mb-12 tracking-tighter">Bridge the <span className="text-brand-primary">Logic Gap.</span></h2>
            <p className="text-lg md:text-xl text-white/50 mb-12 md:mb-16 max-w-2xl mx-auto">
              Our custom Python resolvers are the technical backbone of the AgentMesh™ workforce. Start your technical audit today.
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <button className="w-full md:w-auto px-12 py-6 bg-brand-primary text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-brand-secondary transition-all">
                Request Logic Audit
              </button>
              <button className="w-full md:w-auto px-12 py-6 border-2 border-white/20 text-white font-black uppercase tracking-widest text-sm hover:border-white transition-all">
                View Integration Spec
              </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default CustomPythonResolvers;
