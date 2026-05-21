import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export const SuccessSeal = () => {
  return (
    <div className="relative p-10 bg-mission-gray border-l-4 border-resolver-blue rounded-r-lg overflow-hidden backdrop-blur-sm group">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
        <div className="w-20 h-20 bg-resolver-blue/10 rounded-full flex items-center justify-center shrink-0 border border-resolver-blue/20 shadow-[0_0_30px_rgba(0,209,255,0.1)]">
          <ShieldCheck className="w-10 h-10 text-resolver-blue" />
        </div>
        
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-resolver-blue font-black">B.A.T Success Seal</span>
            <div className="h-px w-12 bg-resolver-blue/20" />
            <div className="flex items-center gap-2 text-resolver-green text-[10px] font-mono font-bold uppercase tracking-widest">
               <Zap className="w-3 h-3 animate-pulse" />
               83% Benchmark Guaranteed
            </div>
          </div>
          <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Performance & Success Guarantee</h4>
          <p className="text-sm text-white/40 leading-relaxed font-medium max-w-2xl">
            Our Build AI Together (B.A.T) partnership ensures zero upfront risk. If your custom AI assistants do not resolve at least 83% of your target administrative tasks automatically within the first 14 days, the pilot costs nothing. No long-term commitment, just proven performance.
          </p>
        </div>
      </div>
      
      {/* Corner Status Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
         <div className="w-1.5 h-1.5 rounded-full bg-resolver-green animate-pulse" />
         <span className="text-[8px] font-mono text-resolver-green uppercase tracking-widest">System Ready</span>
      </div>
    </div>
  );
};
