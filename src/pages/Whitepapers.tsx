import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Bookmark, ArrowRight, Shield } from 'lucide-react';

const Whitepapers = () => {
  const papers = [
    { 
      id: "WP-2026-01",
      title: "The Cognitive Deficit",
      category: "Operational Strategy",
      desc: "An in-depth analysis of hidden manual debt in the SME modern workforce.",
      tags: ["AI", "ROI", "Efficiency"]
    },
    { 
      id: "WP-2026-02",
      title: "Neural Synergy Protocols",
      category: "Technical Architecture",
      desc: "Optimizing multi-model LLM orchestration for proprietary business logic.",
      tags: ["GPT-4", "Llama", "RAG"]
    },
    { 
      id: "WP-2026-03",
      title: "Data Sovereignty in AI",
      category: "Enterprise Security",
      desc: "Managing intellectual property risks when deploying generative systems.",
      tags: ["Security", "Compliance", "Privacy"]
    },
    { 
      id: "WP-2026-04",
      title: "The Algorithmic Executive",
      category: "Business Intelligence",
      desc: "How real-time KPI data is shifting the paradigm of SME leadership.",
      tags: ["BI", "Leadership", "Growth"]
    }
  ];

  return (
    <div className="pt-40">
      <section className="px-10 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-12">Intelligent Library</div>
              <h1 className="text-7xl md:text-9xl leading-[0.88] mb-12 tracking-tighter">
                Strategic <br /> <span className="text-gradient">Whitepapers.</span>
              </h1>
              <p className="text-xl text-ink/60 mb-12 leading-relaxed font-medium">
                High-fidelity technical briefings and tactical research specifically commissioned for modern business leaders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid md:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
             {papers.map((p, i) => (
                <div key={i} className="p-16 bg-white hover:bg-bg-dark transition-all group relative">
                   <div className="flex justify-between items-start mb-12">
                      <div className="text-[9px] font-black text-ink/20 uppercase tracking-widest">{p.id}</div>
                      <FileText className="w-6 h-6 text-ink/10 group-hover:text-brand-primary transition-colors" />
                   </div>
                   <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4">{p.category}</div>
                   <h3 className="text-3xl font-bold mb-6 group-hover:text-brand-secondary transition-colors">{p.title}</h3>
                   <p className="text-ink/40 text-sm leading-relaxed mb-12">{p.desc}</p>
                   
                   <div className="flex flex-wrap gap-2 mb-12">
                      {p.tags.map(t => (
                        <span key={t} className="px-3 py-1 bg-ink/5 rounded-full text-[9px] font-black uppercase tracking-widest text-ink/40">{t}</span>
                      ))}
                   </div>

                   <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-brand-secondary border-b-2 border-brand-primary pb-2 hover:text-brand-primary transition-colors">
                      Acquire Full Report <Download className="w-4 h-4" />
                   </button>
                </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-brand-secondary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none">
           <Shield className="w-64 h-64 text-brand-primary animate-pulse" />
        </div>
        <div className="max-w-7xl mx-auto px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
             <div>
                <h2 className="text-5xl md:text-7xl font-black uppercase mb-12">Proprietary <br /> <span className="text-brand-primary">Insights.</span></h2>
                <p className="text-xl text-white/40 leading-relaxed mb-12">
                   Our research is not generic market commentary. We dive deep into the technical and operational realities of SME growth, providing actionable intelligence that can be deployed immediately.
                </p>
                <div className="flex items-center gap-12">
                   <div>
                      <div className="text-4xl font-black mb-2 text-white">50+</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Tactical Briefs</div>
                   </div>
                   <div>
                      <div className="text-4xl font-black mb-2 text-white">12k+</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Executive Readers</div>
                   </div>
                </div>
             </div>
             <div className="bg-white/5 border border-white/10 p-12 rounded-sm backdrop-blur-xl">
                <h4 className="text-xl font-bold mb-8">Access the Premium Research Node</h4>
                <p className="text-sm text-white/40 mb-10">Join our gated network of SME leaders who receive early access to all BIZSTARTUP KIT whitepapers and tactical research.</p>
                <form className="space-y-6">
                   <input type="email" placeholder="Business Email" className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-sm focus:border-brand-primary outline-none" />
                   <button className="w-full py-4 bg-brand-primary text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-secondary transition-all">
                      Request Network Membership
                   </button>
                </form>
             </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-10 text-center">
            <h2 className="text-6xl font-black uppercase mb-12 tracking-tighter text-brand-secondary">Knowledge is <span className="text-brand-primary">Leverage.</span></h2>
            <p className="text-xl text-ink/50 mb-16 max-w-2xl mx-auto">
              In a rapidly shifting economy, information is the most valuable asset you own. Build your leverage today with our tactical research.
            </p>
            <button className="px-12 py-6 bg-brand-secondary text-white font-black uppercase tracking-widest text-sm hover:bg-brand-primary transition-all">
              Browse Full Archive <ArrowRight className="ml-4 w-5 h-5 inline-block" />
            </button>
        </div>
      </section>
    </div>
  );
};

export default Whitepapers;
