import React from 'react';

export const ResolverStatus = () => {
  return (
    <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-mission-gray border border-resolver-green/30 rounded-full shadow-[0_0_15px_rgba(0,255,65,0.1)]">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-resolver-green opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-resolver-green"></span>
      </span>
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-resolver-green font-bold">
        Node Active: 83% Resolution Rate
      </span>
    </div>
  );
};
