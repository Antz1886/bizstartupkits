import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Database, Zap, Activity, BarChart3, Lock } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon }: { label: string, value: string, icon: any }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
    <div className="flex justify-between items-center mb-4">
      <Icon className="w-5 h-5 text-brand-primary" />
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
    </div>
    <div className="text-2xl font-black text-white mb-1">{value}</div>
    <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</div>
  </div>
);

export default function FinTechResolver() {
  return (
    <div className="min-h-screen bg-bg-dark pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-brand-primary" />
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary">FinTech_Compliance_Node_v2</div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
              Autonomous <br /> <span className="text-brand-primary">Compliance</span> <br /> Orchestrator.
            </h1>
            <p className="text-xl text-white/40 font-medium leading-relaxed">
              High-fidelity KYC/AML automation for African financial entities. Deploying a sovereign neural mesh that resolves regulatory loops with 83% autonomous accuracy.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            <StatCard icon={Activity} label="Audit_Frequency" value="Real-time" />
            <StatCard icon={Database} label="Silo_Sync" value="Native" />
            <StatCard icon={Lock} label="POPIA_Status" value="Compliant" />
            <StatCard icon={Zap} label="Response_Time" value="<12ms" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {[
            { 
              title: "KYC Automation", 
              desc: "Automated document verification and identity orchestration across multiple African databases.",
              icon: Database 
            },
            { 
              title: "Risk Signaling", 
              desc: "Predictive neural pulses that identify potential AML violations before transaction completion.",
              icon: BarChart3 
            },
            { 
              title: "POPIA Governance", 
              desc: "Private neural nodes ensuring data sovereignty and strict adherence to local privacy mandates.",
              icon: ShieldCheck 
            }
          ].map((feature, i) => (
            <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-2xl hover:border-brand-primary transition-all group">
              <div className="w-12 h-12 rounded-sm bg-brand-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">{feature.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-primary p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_50px_rgba(255,79,0,0.2)]">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Deploy Compliance Node</h2>
            <p className="text-white/80 font-medium italic">Start your Sector Pilot with zero upfront infrastructure cost.</p>
          </div>
          <button className="px-10 py-5 bg-bg-dark text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-bg-dark transition-all">
            Initialize Resolver
          </button>
        </div>
      </div>
    </div>
  );
}
