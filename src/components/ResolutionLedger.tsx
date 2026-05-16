/**
 * Resolution Ledger
 * 
 * Part of the B.A.T (Build AI Together) Model.
 * This dashboard provides a live view of the AgentMesh™ resolution capabilities.
 * Built for zero upfront fee partnerships.
 */
import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Terminal, Loader2 } from 'lucide-react';

interface Session {
  id: string;
  channel: string;
  time?: string;
  createdAt?: { seconds: number, nanoseconds: number };
  status: string;
  agentic: boolean;
}

export const ResolutionLedger = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [resolutionRate, setResolutionRate] = useState(0);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const response = await fetch('/api/telemetry/sessions');
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setSessions(result.data);
            
            // Calculate dynamic resolution rate
            const total = result.data.length;
            const resolved = result.data.filter((s: Session) => s.status === 'RESOLVED').length;
            if (total > 0) {
              setResolutionRate((resolved / total) * 100);
            } else {
              setResolutionRate(0);
            }
          }
        }
      } catch (error) {
        console.error('Telemetry uplink failed:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchTelemetry();

    // Poll every 5 seconds
    const interval = setInterval(fetchTelemetry, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (session: Session) => {
    if (session.time) return session.time;
    if (session.createdAt) {
      const date = new Date(session.createdAt.seconds * 1000);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    return '--:--:--';
  };

  return (
    <div className="w-full bg-mission-black min-h-[500px] border border-white/10 rounded-sm p-8 font-mono">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl text-white font-black uppercase tracking-widest mb-2 flex items-center gap-3">
            <Terminal className="w-6 h-6 text-[#00D1FF]" />
            Resolution Ledger
          </h2>
          <p className="text-white/50 text-xs">B.A.T Model Active • Serverless Modal.com Edge</p>
        </div>
        
        {/* Live Target Indicator */}
        <div className="flex flex-col items-end">
          <div className="text-[#00FF41] text-3xl font-black mb-1 flex items-center gap-2">
            {loading && sessions.length === 0 ? (
              <Loader2 className="w-6 h-6 animate-spin text-white/40" />
            ) : (
              <Activity className="w-6 h-6 animate-pulse" />
            )}
            {resolutionRate.toFixed(1)}%
          </div>
          <div className="text-white/40 text-[10px] uppercase tracking-widest">
            Autonomous Resolution Rate
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto min-h-[250px]">
        {loading && sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-white/40">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#00D1FF]" />
            <span className="text-xs uppercase tracking-widest animate-pulse">Establishing Uplink...</span>
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-white/40">
            <span className="text-xs uppercase tracking-widest">No Active Sessions Detected</span>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-widest">
                <th className="py-4 px-4 font-normal">Session ID</th>
                <th className="py-4 px-4 font-normal">Channel</th>
                <th className="py-4 px-4 font-normal">Time</th>
                <th className="py-4 px-4 font-normal">Processing</th>
                <th className="py-4 px-4 font-normal text-right">Outcome</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {sessions.map((row, idx) => (
                <tr 
                  key={row.id} 
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 px-4 text-white font-medium">{row.id}</td>
                  <td className="py-4 px-4 text-white/70">{row.channel}</td>
                  <td className="py-4 px-4 text-white/50">{formatTime(row)}</td>
                  <td className="py-4 px-4">
                    {row.agentic ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#00D1FF]/10 text-[#00D1FF] text-[10px] uppercase tracking-widest border border-[#00D1FF]/20">
                        <ShieldCheck className="w-3 h-3" /> Agentic
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 text-white/50 text-[10px] uppercase tracking-widest border border-white/10">
                        Human
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {row.status === 'RESOLVED' ? (
                      <span className="text-[#00FF41] font-bold tracking-wider">{row.status}</span>
                    ) : (
                      <span className="text-[#FF4F00] font-bold tracking-wider">{row.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center text-[10px] text-white/30 uppercase tracking-[0.2em] border-t border-white/10 pt-4">
        <span>Integration Status: Online (Salesforce, HubSpot, Shopify)</span>
        <span className="flex items-center gap-2">
          {loading ? <span className="w-2 h-2 rounded-full bg-[#FF4F00] animate-pulse"></span> : <span className="w-2 h-2 rounded-full bg-[#00FF41]"></span>}
          AgentMesh™ Telemetry {loading ? 'Syncing' : 'Active'}
        </span>
      </div>
    </div>
  );
};
