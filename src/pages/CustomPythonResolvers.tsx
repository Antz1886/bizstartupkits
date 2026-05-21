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
                Custom Workflows & <br /> <span className="text-gradient">Integrations.</span>
              </h1>
              <p className="text-lg md:text-xl text-ink/60 mb-8 md:mb-12 max-w-xl leading-relaxed font-medium">
                Connect your business tools directly. We build custom integrations that link your AI assistants natively into your existing software and database silos.
              </p>
              <button className="btn-primary w-full md:w-auto">
                Request Custom Setup
              </button>
            </motion.div>
            <div className="relative">
              <div className="aspect-square bg-bg-dark rounded-2xl overflow-hidden shadow-2xl relative border border-white/5">
                 <div className="absolute inset-0 bg-dot opacity-20" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Code className="w-32 h-32 text-brand-primary opacity-20" />
                 </div>
                  <div className="absolute bottom-10 left-10 p-6 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                     <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4">Integration Logic</div>
                     <div className="text-2xl font-black text-white font-mono">workflow_connector.py</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-bg-card border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 md:mb-10 text-white">Connecting Your Tools.</h2>
              <p className="text-lg md:text-xl text-white/70 font-medium leading-relaxed">
                Off-the-shelf chatbots cannot access your customer data or run your specific business processes. We bridge this gap by connecting your AI assistants directly to your calendar, CRM, or fleet systems.
              </p>
            </div>
            <div className="space-y-12">
              <div className="pb-12 border-b border-white/5">
                <div className="text-2xl font-bold mb-4 text-white">Unified Operations</div>
                <p className="text-white/60">Stop manual data entry. We write custom integrations that keep your systems sharing data smoothly and automatically.</p>
              </div>
              <div className="pb-12 border-b border-white/5">
                <div className="text-2xl font-bold mb-4 text-white">Built-in Safeguards</div>
                <p className="text-white/60">We build automated safety checks and clear rules so the AI only performs tasks with 100% reliability, alerting your team if human input is needed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16 md:mb-24">
            <div className="text-brand-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-8">Custom-Built for You</div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Bespoke <span className="text-brand-primary">Integrations.</span></h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { 
                title: "Custom Business Rules", 
                desc: "AI that understands your business pricing, policies, and booking slots without making errors.",
                icon: Network
              },
              { 
                title: "Direct Database Connections", 
                desc: "Seamless syncing with Salesforce, HubSpot, Shopify, or local databases so records are updated instantly.",
                icon: Database
              },
              { 
                title: "Accuracy & Safety Filters", 
                desc: "Automated safety checks that prevent false outputs and ensure every customer query is handled correctly.",
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

      <section className="py-20 md:py-32 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
             <div className="order-2 lg:order-1 relative aspect-video bg-bg-card rounded-2xl overflow-hidden flex items-center justify-center border border-white/5">
                <div className="text-[10px] font-mono text-brand-primary p-12 overflow-hidden opacity-40">
                  {`def sync_system_action(event_data):
  # 1. Initialize custom connector
  connector = System.link('CRM_CORE')
  # 2. Validate external data source
  is_valid = connector.verify(event_data.payload)
  
  if is_valid:
    # 3. Process data & sync across platforms
    sync = connector.update_all(event_data)
    return connector.log_success(sync)
  else:
    # 4. Flag error and notify internal team
    return connector.alert_human_admin(event_data)`}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent" />
             </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-5xl font-black uppercase mb-12 text-white">Seamless Tool <br /> Connectivity.</h2>
                <ul className="space-y-8">
                  {[
                    "Custom Workflow Connections",
                    "Direct Salesforce & HubSpot Sync",
                    "POPIA-Compliant Security",
                    "Auto-Alert Staff for Complex Cases"
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-6 group">
                      <div className="w-10 h-10 rounded-full border border-brand-primary/20 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                        <ChevronRight className="w-5 h-5 text-brand-primary group-hover:text-white" />
                      </div>
                      <span className="text-xl font-bold text-white/70">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-brand-secondary text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 md:mb-12 tracking-tighter">Connect Your <span className="text-brand-primary">Systems.</span></h2>
            <p className="text-lg md:text-xl text-white/70 mb-12 md:mb-16 max-w-2xl mx-auto">
              Our custom integrations are the technical backbone that lets AI work directly with your existing tools. Book a setup consultation today.
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <button className="w-full md:w-auto px-12 py-6 bg-brand-primary text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-brand-secondary transition-all">
                Request Setup Session
              </button>
              <button className="w-full md:w-auto px-12 py-6 border-2 border-white/20 text-white font-black uppercase tracking-widest text-sm hover:border-white transition-all">
                View Integrations List
              </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default CustomPythonResolvers;
