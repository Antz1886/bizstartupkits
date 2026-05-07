import React from 'react';
import { Zap, Shield, Cpu, Network, CheckCircle2 } from 'lucide-react';

export const ComparisonTable = () => {
  const comparisons = [
    { 
      cap: "Primary Outcome", 
      chatbot: "Responds to questions", 
      mesh: "Resolves end-to-end tasks", 
      meshColor: "text-resolver-green" 
    },
    { 
      cap: "Technology", 
      chatbot: "Simple FAQ + RAG", 
      mesh: "Custom Python Logic Nodes", 
      meshColor: "text-resolver-blue" 
    },
    { 
      cap: "CRM Integration", 
      chatbot: "Manual / Webhooks", 
      mesh: "Native Autonomous Sync", 
      meshColor: "text-resolver-blue" 
    },
    { 
      cap: "Voice Support", 
      chatbot: "Unsupported", 
      mesh: "Full Voice-to-Action", 
      meshColor: "text-resolver-green" 
    },
    { 
      cap: "Accuracy", 
      chatbot: "30% - 60%", 
      mesh: "83% Benchmark", 
      meshColor: "text-resolver-green" 
    }
  ];

  return (
    <div className="py-24 bg-mission-black overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-6 tracking-tighter">
            Chatbots vs. <span className="text-resolver-blue">AgentMesh™</span>
          </h2>
          <p className="text-xs font-mono text-white/50 uppercase tracking-[0.4em]">Engineered Intelligence vs. Conversational AI</p>
        </div>

        {/* Desktop View: High-fidelity Grid */}
        <div className="hidden md:grid grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden shadow-2xl">
          <div className="p-8 bg-mission-black font-mono text-[10px] text-white/40 uppercase tracking-widest">Capability</div>
          <div className="p-8 bg-mission-black font-mono text-[10px] text-white/40 uppercase tracking-widest text-center">Generic Chatbots</div>
          <div className="p-8 bg-mission-gray font-mono text-[10px] text-resolver-blue uppercase tracking-[0.2em] font-black text-center">AgentMesh™ Workforce</div>

          {comparisons.map((item, i) => (
            <React.Fragment key={i}>
              <div className="p-8 bg-mission-black text-white text-sm font-bold border-t border-white/5 flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-resolver-blue/60" />
                 {item.cap}
              </div>
              <div className="p-8 bg-mission-black text-white/60 text-sm border-t border-white/5 text-center font-medium">
                {item.chatbot}
              </div>
              <div className={`p-8 bg-mission-gray ${item.meshColor} border-t border-white/5 font-black text-sm text-center flex items-center justify-center gap-3`}>
                <Zap className="w-4 h-4" />
                {item.mesh}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Mobile View: Stacked Cards for Legibility */}
        <div className="md:hidden space-y-6">
          {comparisons.map((item, i) => (
            <div key={i} className="bg-mission-gray border border-white/10 rounded-lg overflow-hidden">
               <div className="p-5 bg-white/5 border-b border-white/5 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-resolver-blue" />
                  <div className="text-[10px] font-mono text-white/60 uppercase tracking-widest">{item.cap}</div>
               </div>
               <div className="p-6 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Generic Chatbot</div>
                     <div className="text-sm text-white/40 font-medium">{item.chatbot}</div>
                  </div>
                  <div className="space-y-2">
                     <div className="text-[8px] font-mono text-resolver-blue uppercase tracking-widest">AgentMesh™</div>
                     <div className={`text-sm ${item.meshColor} font-black flex items-center gap-2`}>
                        <Zap className="w-3 h-3" />
                        {item.mesh}
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
           <div className="inline-flex items-center gap-4 p-4 bg-mission-gray border border-white/10 rounded-lg text-[10px] font-mono uppercase tracking-widest text-white/40 text-center md:text-left">
              <Shield className="w-4 h-4 text-resolver-blue shrink-0" />
              <span>POPIA Compliant Resolver Nodes Deploying Globally</span>
           </div>
        </div>
      </div>
    </div>
  );
};
