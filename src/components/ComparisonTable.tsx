import React from 'react';
import { Zap, Shield, Cpu, Network } from 'lucide-react';

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
    <div className="py-24 bg-mission-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-6 tracking-tighter">
            Chatbots vs. <span className="text-resolver-blue">AgentMesh™</span>
          </h2>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-[0.4em]">Engineered Intelligence vs. Conversational AI</p>
        </div>

        <div className="grid grid-cols-3 gap-px bg-white/5 border border-white/10 rounded-lg overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-8 bg-mission-black font-mono text-[10px] text-gray-500 uppercase tracking-widest">Capability</div>
          <div className="p-8 bg-mission-black font-mono text-[10px] text-gray-500 uppercase tracking-widest text-center">Generic Chatbots</div>
          <div className="p-8 bg-mission-gray font-mono text-[10px] text-resolver-blue uppercase tracking-[0.2em] font-black text-center">AgentMesh™ Workforce</div>

          {/* Rows */}
          {comparisons.map((item, i) => (
            <React.Fragment key={i}>
              <div className="p-8 bg-mission-black text-white text-sm font-bold border-t border-white/5 flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-resolver-blue/40" />
                 {item.cap}
              </div>
              <div className="p-8 bg-mission-black text-gray-400 text-sm border-t border-white/5 text-center font-medium">
                {item.chatbot}
              </div>
              <div className={`p-8 bg-mission-gray ${item.meshColor} border-t border-white/5 font-black text-sm text-center flex items-center justify-center gap-3`}>
                <Zap className="w-4 h-4" />
                {item.mesh}
              </div>
            </React.Fragment>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
           <div className="inline-flex items-center gap-4 p-4 bg-mission-gray border border-white/10 rounded-lg text-[10px] font-mono uppercase tracking-widest text-gray-500">
              <Shield className="w-4 h-4 text-resolver-blue" />
              POPIA Compliant Resolver Nodes Deploying Globally
           </div>
        </div>
      </div>
    </div>
  );
};
