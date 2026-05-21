import React from 'react';
import { motion } from 'motion/react';
import { Zap, MessageSquare, Volume2, ShieldCheck, ArrowRight, Bot, Users, Globe } from 'lucide-react';

const AgentMeshWorkforce = () => {
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
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-6 md:mb-8">Service Segment: 01</div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl leading-[0.88] mb-8 md:mb-12 tracking-tighter">
                Digital AI <br /> <span className="text-gradient">Workforce.</span>
              </h1>
              <p className="text-lg md:text-xl text-ink/60 mb-8 md:mb-12 max-w-xl leading-relaxed font-medium">
                Deploy 24/7 digital employees that answer customer questions, schedule bookings, and complete administrative tasks across WhatsApp, Email, and social media. 
              </p>
              <button className="btn-primary w-full md:w-auto">
                Start Your Free Pilot
              </button>
            </motion.div>
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-6 pt-12">
                 <div className="bg-white p-10 rounded-lg border border-ink/5 shadow-xl">
                    <div className="text-4xl font-black text-brand-secondary mb-2">83%</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Tasks Resolved Automatically</div>
                 </div>
                 <div className="bg-white p-10 rounded-lg border border-ink/5 shadow-xl">
                    <div className="text-4xl font-black text-brand-secondary mb-2">4.8+</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Customer Satisfaction</div>
                 </div>
               </div>
               <div className="space-y-6">
                 <div className="bg-brand-secondary p-10 rounded-lg shadow-xl text-white">
                    <MessageSquare className="w-10 h-10 text-brand-primary mb-6" />
                    <div className="text-lg font-bold">Omni-Channel <br /> Connectivity</div>
                 </div>
                 <div className="bg-white p-10 rounded-lg border border-ink/5 shadow-xl">
                    <div className="text-4xl font-black text-brand-secondary mb-2">10m</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Integration Time</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16 md:mb-24">
             <h2 className="text-4xl md:text-5xl font-black uppercase text-brand-secondary mb-6">AI Assistants That Get Work Done.</h2>
             <p className="text-lg md:text-xl text-ink/40 max-w-2xl mx-auto font-medium">Traditional chatbots just repeat automated answers. Our digital employees connect to your databases to take action and get tasks done.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
             <div className="p-16 bg-bg-dark rounded-sm flex gap-10 items-start group hover:bg-brand-secondary transition-colors">
                <Volume2 className="w-12 h-12 text-brand-primary shrink-0 group-hover:scale-110 transition-transform" />
                <div className="group-hover:text-white transition-colors">
                   <h3 className="text-2xl font-bold mb-6">WhatsApp Voice Messages</h3>
                   <p className="text-ink/50 group-hover:text-white/60 leading-relaxed transition-colors">Allow your customers or drivers to send WhatsApp voice notes. The AI understands their requests, books schedules, updates records, and responds in seconds.</p>
                </div>
             </div>
             <div className="p-16 bg-bg-dark rounded-sm flex gap-10 items-start group hover:bg-brand-secondary transition-colors">
                <Zap className="w-12 h-12 text-brand-primary shrink-0 group-hover:scale-110 transition-transform" />
                <div className="group-hover:text-white transition-colors">
                   <h3 className="text-2xl font-bold mb-6">System Integrations</h3>
                   <p className="text-ink/50 group-hover:text-white/60 leading-relaxed transition-colors">Connect the AI directly to your existing systems. It handles lead routing, CRM updates, and inventory tracking without human intervention.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-brand-secondary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 md:gap-32 items-center relative z-10">
           <div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase mb-8 md:mb-12">Complete <br /> <span className="text-brand-primary">Tool Integration.</span></h2>
              <div className="space-y-8">
                {[
                  { title: "WhatsApp & Messaging Support", desc: "Resolve customer questions instantly on the messaging apps they use every day." },
                  { title: "Automatic CRM Updates", desc: "Keep HubSpot, Salesforce, Zoho, or spreadsheets updated automatically in real-time." },
                  { title: "Voice & Text Processing", desc: "Process text messages, emails, and voice notes into unified actions." }
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
                 <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Team Synergy" className="rounded-xl opacity-80" />
              </div>
           </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-10 text-center">
            <h2 className="text-6xl font-black uppercase mb-12 tracking-tighter text-brand-secondary">Recover Your <span className="text-brand-primary">Time.</span></h2>
            <p className="text-xl text-ink/50 mb-16 max-w-2xl mx-auto">
              Get the technical edge that saves hours and lets your human team focus on scaling the business.
            </p>
            <button className="px-12 py-6 bg-brand-secondary text-white font-black uppercase tracking-widest text-sm hover:bg-brand-primary transition-all">
              Start Your Free Pilot
            </button>
        </div>
      </section>
    </div>
  );
};

export default AgentMeshWorkforce;
