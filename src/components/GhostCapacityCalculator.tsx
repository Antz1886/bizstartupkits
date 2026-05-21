import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingDown, AlertTriangle, ArrowRight, ShieldCheck, Workflow, Activity } from 'lucide-react';

export const GhostCapacityCalculator = () => {
  const [headcount, setHeadcount] = useState(10);
  const [avgSalary, setAvgSalary] = useState(350000); // ZAR
  const [sector, setSector] = useState<'fintech' | 'logistics' | 'wellness'>('logistics');
  const [leakage, setLeakage] = useState(0);

  const sectorData = {
    fintech: { label: "FinTech", multiplier: 0.45, leakLabel: "Manual KYC & Compliance Costs", icon: ShieldCheck },
    logistics: { label: "Logistics", multiplier: 0.55, leakLabel: "Fleet & Route Fuel Inefficiencies", icon: Workflow },
    wellness: { label: "Wellness", multiplier: 0.35, leakLabel: "Missed Booking & Admin Overhead", icon: Activity }
  };

  useEffect(() => {
    // Formula: Leakage = (N * S * Multiplier)
    const calculatedLeakage = headcount * avgSalary * sectorData[sector].multiplier;
    setLeakage(calculatedLeakage);
  }, [headcount, avgSalary, sector]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div id="audit-calculator" className="bg-mission-gray border border-white/10 p-8 md:p-12 rounded-lg shadow-2xl relative overflow-hidden group">
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white uppercase tracking-tighter">
            Wasted Business Costs Calculator
            </h3>
            <div className="flex gap-2">
                {(Object.keys(sectorData) as Array<keyof typeof sectorData>).map(s => {
                    const Icon = sectorData[s].icon;
                    return (
                        <button 
                            key={s}
                            onClick={() => setSector(s)}
                            className={`p-2 rounded-sm border transition-all ${sector === s ? 'bg-resolver-blue border-resolver-blue text-mission-black' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'}`}
                            title={sectorData[s].label}
                        >
                            <Icon className="w-4 h-4" />
                        </button>
                    );
                })}
            </div>
        </div>
        
        <div className="space-y-8 mb-12">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="block text-xs font-mono text-white/60 uppercase tracking-widest">Team Headcount</label>
              <span className="text-resolver-blue font-mono font-bold">{headcount}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="250" 
              value={headcount} 
              onChange={(e) => setHeadcount(parseInt(e.target.value))}
              className="w-full accent-resolver-blue h-1 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="block text-xs font-mono text-white/60 uppercase tracking-widest">Avg. Annual Salary (ZAR)</label>
              <span className="text-resolver-blue font-mono font-bold">{formatCurrency(avgSalary)}</span>
            </div>
            <input 
              type="range" 
              min="100000" 
              max="2000000" 
              step="10000"
              value={avgSalary} 
              onChange={(e) => setAvgSalary(parseInt(e.target.value))}
              className="w-full accent-resolver-blue h-1 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">
            Estimated Annual Wasted Cost ({sectorData[sector].leakLabel})
          </p>
          <motion.p 
            key={leakage}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mt-2"
          >
            <span className="text-resolver-blue">ZAR</span> {leakage.toLocaleString('en-ZA')}
          </motion.p>
          
          <div className="mt-8 flex items-center gap-4">
             <div className="flex items-center gap-2 text-resolver-green bg-resolver-green/10 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest">
                <TrendingDown className="w-3 h-3" />
                Recoverable with {sectorData[sector].label} AI Employees
             </div>
          </div>
        </div>

        <button className="w-full mt-12 py-5 bg-resolver-blue text-mission-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_30px_rgba(0,209,255,0.2)] flex items-center justify-center gap-3">
          Start {sectorData[sector].label} Free Pilot <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none opacity-20" />
    </div>
  );
};

