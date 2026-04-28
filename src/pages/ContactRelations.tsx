import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Globe, Linkedin, Twitter, Github, ArrowRight } from 'lucide-react';

const ContactRelations = () => {
  return (
    <div className="pt-40">
      <section className="px-10 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-8">Node Communication</div>
              <h1 className="text-7xl md:text-9xl leading-[0.88] mb-12 tracking-tighter">
                Contact <br /> <span className="text-gradient">Relations.</span>
              </h1>
              <p className="text-xl text-ink/60 mb-12 max-w-xl leading-relaxed font-medium">
                Initialize a direct line to our strategic hub. We prioritize high-yield transformational partnerships over volume.
              </p>
              <div className="space-y-8">
                 {[
                   { icon: Mail, label: "Transmission Node", val: "sales@biztartupkits.tech" },
                   { icon: Phone, label: "Direct Comms", val: "079 894 0476" },
                   { icon: MapPin, label: "Physical Node", val: "Honeydew Business Park, Corporate Campus, Roodeport" }
                 ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                       <div className="w-12 h-12 bg-bg-dark border border-ink/5 flex items-center justify-center rounded-sm group-hover:bg-brand-primary/10 transition-colors">
                          <item.icon className="w-5 h-5 text-brand-secondary group-hover:text-brand-primary transition-colors" />
                       </div>
                       <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-ink/30 mb-1">{item.label}</div>
                          <div className="text-lg font-bold text-brand-secondary">{item.val}</div>
                       </div>
                    </div>
                 ))}
              </div>
            </motion.div>
            <div className="bg-white p-12 rounded-2xl shadow-2xl border border-ink/5">
                <div className="text-2xl font-black mb-10 text-brand-secondary uppercase tracking-tight">Initialize Protocol</div>
                <form className="space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                      <div>
                         <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-ink/40 mb-3">FullName</label>
                         <input type="text" className="w-full bg-bg-dark border border-ink/10 rounded-sm px-6 py-4 text-sm focus:border-brand-primary outline-none" />
                      </div>
                      <div>
                         <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-ink/40 mb-3">Company Node</label>
                         <input type="text" className="w-full bg-bg-dark border border-ink/10 rounded-sm px-6 py-4 text-sm focus:border-brand-primary outline-none" />
                      </div>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-ink/40 mb-3">Priority Segment</label>
                      <select className="w-full bg-bg-dark border border-ink/10 rounded-sm px-6 py-4 text-sm focus:border-brand-primary outline-none appearance-none">
                         <option>Select Focus Area</option>
                         <option>Enterprise AI Suite</option>
                         <option>Cognitive Automation</option>
                         <option>Strategic BI Consulting</option>
                         <option>System Architecture</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-ink/40 mb-3">Strategic Requirements</label>
                      <textarea rows={4} className="w-full bg-bg-dark border border-ink/10 rounded-sm px-6 py-4 text-sm focus:border-brand-primary outline-none"></textarea>
                   </div>
                   <button className="w-full py-5 bg-brand-secondary text-white font-black uppercase tracking-widest text-xs hover:bg-brand-primary transition-all shadow-xl">
                      Transmit Strategic Inquiry
                   </button>
                </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-brand-secondary text-white">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div>
                <h2 className="text-5xl md:text-7xl font-black uppercase mb-12">Global <br /> <span className="text-brand-primary">Presence.</span></h2>
                <p className="text-xl text-white/40 leading-relaxed mb-12">
                   Headquartered in Roodeport, BIZSTARTUP KIT operates as a distributed technical syndicate, coordinating AI deployments for SMEs across the globe.
                </p>
                <div className="flex gap-6">
                   <a href="#" className="w-14 h-14 bg-white/5 rounded-sm flex items-center justify-center hover:bg-brand-primary transition-colors"><Linkedin className="w-6 h-6" /></a>
                   <a href="#" className="w-14 h-14 bg-white/5 rounded-sm flex items-center justify-center hover:bg-brand-primary transition-colors"><Twitter className="w-6 h-6" /></a>
                   <a href="#" className="w-14 h-14 bg-white/5 rounded-sm flex items-center justify-center hover:bg-brand-primary transition-colors"><Github className="w-6 h-6" /></a>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
                {[
                  { region: "South Africa", city: "Roodeport", status: "Primary Node" },
                  { region: "Europe", city: "London", status: "Active Site" },
                  { region: "Asia Pacific", city: "Singapore", status: "Active Site" },
                  { region: "International", city: "Remote Syndicate", status: "Global" }
                ].map((site, i) => (
                   <div key={i} className="p-10 bg-brand-secondary hover:bg-white/5 transition-colors">
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary mb-4">{site.region}</div>
                      <div className="text-2xl font-bold mb-2">{site.city}</div>
                      <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{site.status}</div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-bg-dark border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-10 text-center">
            <h2 className="text-6xl font-black uppercase mb-12 tracking-tighter text-brand-secondary">Start the <span className="text-brand-primary">Dialogue.</span></h2>
            <p className="text-xl text-ink/50 mb-16 max-w-2xl mx-auto">
              Your growth journey doesn't have to be a solo flight. Connect with our strategic relations team and find out how the kit can work for you.
            </p>
            <button className="btn-primary">
              Schedule Initial Consultation
            </button>
        </div>
      </section>
    </div>
  );
};

export default ContactRelations;
