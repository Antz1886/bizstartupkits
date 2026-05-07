import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, ShieldCheck, Zap, Server } from 'lucide-react';

export const PricingSection = () => {
  const tiers = [
    {
      name: "B.A.T Pilot",
      price: "R0",
      period: "First 14 Days",
      desc: "Build AI Together. Zero upfront fees to prove the 83% resolution benchmark.",
      features: [
        "1 AgentMesh™ Resolver Node",
        "WhatsApp & Email Integration",
        "Dedicated AI Engineer Oversight",
        "Ghost Capacity Audit Implementation",
        "No Long-term Commitment"
      ],
      cta: "Start Free Pilot",
      highlight: false
    },
    {
      name: "Growth Workforce",
      price: "R12,500",
      period: "per Node / month",
      desc: "Scale your operations with autonomous resolution power across multiple silos.",
      features: [
        "5+ AgentMesh™ Resolver Nodes",
        "Omni-channel (Voice + Text)",
        "Advanced CRM Synchronization",
        "Custom Python Logic Nodes",
        "Priority 83% Resolution Support"
      ],
      cta: "Scale Workforce",
      highlight: true
    },
    {
      name: "Enterprise Mesh",
      price: "Custom",
      period: "Tailored Architecture",
      desc: "Full-scale digital nervous system for established market leaders.",
      features: [
        "Unlimited Resolver Nodes",
        "Antigravity Integration Suite",
        "POPIA Compliant Sovereignty",
        "Custom Neural Architecture",
        "Direct Lead Engineer Access"
      ],
      cta: "Contact Enterprise Relations",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24 md:py-48 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16 md:mb-32">
          <div className="text-brand-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-8">Investment Infrastructure</div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-brand-secondary tracking-tighter mb-8">
            Outcome-Based <br /> <span className="text-brand-primary">Pricing.</span>
          </h2>
          <p className="text-xl text-ink/40 max-w-2xl mx-auto font-medium">
            Stop paying for seats. Start investing in resolutions. South Africa's most aggressive performance-based AI workforce model.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div 
              key={i}
              className={`p-10 rounded-2xl border transition-all duration-500 relative flex flex-col ${
                tier.highlight 
                ? "bg-brand-secondary border-brand-primary/30 shadow-[0_0_50px_-12px_rgba(255,79,0,0.2)] scale-105 z-10" 
                : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full">
                  Most Deployed
                </div>
              )}

              <div className="mb-10">
                <h3 className={`text-xl font-black uppercase tracking-tight mb-4 ${tier.highlight ? "text-white" : "text-white/60"}`}>{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-black text-white">{tier.price}</span>
                  <span className="text-sm text-white/40 font-medium">{tier.period}</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed italic">{tier.desc}</p>
              </div>

              <div className="space-y-6 mb-12 flex-1">
                {tier.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <Zap className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-white/70 font-medium">{f}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-6 font-black uppercase tracking-widest text-sm transition-all ${
                tier.highlight 
                ? "bg-brand-primary text-white hover:bg-white hover:text-brand-secondary shadow-xl shadow-brand-primary/20" 
                : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
              }`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-white/5 border border-white/10 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-sm flex items-center justify-center shrink-0">
                 <ShieldCheck className="w-8 h-8 text-brand-primary" />
              </div>
              <div>
                 <h4 className="text-xl font-bold text-white uppercase tracking-tight">The B.A.T Performance Guarantee</h4>
                 <p className="text-sm text-white/40 font-medium">If your AgentMesh™ nodes don't hit an 83% resolution rate within the first 14 days, you pay nothing. Period.</p>
              </div>
           </div>
           <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-brand-primary hover:text-white transition-colors group">
              Read Security Protocol <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
           </button>
        </div>
      </div>
    </section>
  );
};
