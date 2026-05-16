import React from 'react';
import { ResolutionLedger } from '../components/ResolutionLedger';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Mission <span className="text-[#00D1FF]">Control</span>
          </h1>
          <p className="text-white/60 font-mono text-sm max-w-2xl">
            Live NOC telemetry for the Agentic Workforce. Monitoring integration status, active sessions, and autonomous resolution targets in real-time.
          </p>
        </div>

        <ResolutionLedger />
      </div>
    </div>
  );
}
