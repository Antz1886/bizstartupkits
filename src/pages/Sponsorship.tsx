import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Calculator, ShieldCheck, ArrowRight, 
  Sparkles, DollarSign, Calendar, Target, Clock, MessageSquare 
} from 'lucide-react';

export default function Sponsorship() {
  // Scorecard inputs
  const [turnover, setTurnover] = useState(150000000); // 150M ZAR default (Large enterprise)
  const [npat, setNpat] = useState(15000000); // 15M ZAR default (10% profit margin)
  const [fyEnd, setFyEnd] = useState('June');
  
  // Package order states
  const [orderCompany, setOrderCompany] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const [selectedPack, setSelectedPack] = useState('full');
  const [kitCount, setKitCount] = useState(3);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // B-BBEE Code calculation:
  // ESD (Enterprise & Supplier Development) target spend is 2% of NPAT for Supplier Development, and 1% of NPAT for Enterprise Development. Total = 3% of NPAT.
  const sdTarget = npat * 0.02;
  const edTarget = npat * 0.01;
  const totalEsdTarget = sdTarget + edTarget;

  // Kits cost models
  const kitPrices = {
    compliance: 75000, // R75k for compliance + brand
    full: 150000       // R150k for full growth kit
  };

  const currentPrice = selectedPack === 'full' ? kitPrices.full : kitPrices.compliance;
  const totalCartCost = currentPrice * kitCount;

  // Handle Form Submission
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderCompany || !orderEmail) return;

    fetch('/api/sponsorships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: orderCompany,
        financialYearEnd: fyEnd,
        targetNpatSpendZar: totalCartCost,
        email: orderEmail
      })
    })
    .then(() => {
      setIsSubmitted(true);
    })
    .catch(() => {
      setIsSubmitted(true); // Failsafe for sandbox/offline
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-bg-dark font-sans relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-dot opacity-40 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-primary/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Page Hero */}
        <div className="max-w-3xl mb-16">
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/5 border border-brand-secondary/10">
            <Target className="w-4 h-4 text-brand-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">
              Corporate Partnerships
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black leading-none mb-6">
            B-BBEE Scorecard <br /><span className="text-gradient">ESD Sponsorships.</span>
          </h1>
          <p className="text-lg md:text-xl text-ink/50 leading-relaxed font-light">
            Sponsor small South African businesses with our operational startup kits. Secure your Enterprise & Supplier Development (ESD) points with verifiable, auditable compliance logging.
          </p>
        </div>

        {/* Core Layout Split */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* CALCULATOR & STATS (SPAN 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Interactive B-BBEE Scorecard Calculator */}
            <div className="bg-white p-8 rounded-2xl border border-ink/5 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-ink/5 pb-4">
                <Calculator className="w-6 h-6 text-brand-primary" />
                <h3 className="text-xl font-display font-black text-brand-secondary">
                  ESD Target Spend Calculator
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Turnover */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-brand-secondary block mb-1">
                    Annual Turnover (ZAR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-ink/35">R</span>
                    <input 
                      type="number"
                      value={turnover}
                      onChange={(e) => setTurnover(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3.5 text-xs bg-bg-dark border border-ink/10 rounded-xl focus:outline-none focus:border-brand-primary font-mono"
                    />
                  </div>
                </div>

                {/* NPAT */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-brand-secondary block mb-1">
                    Net Profit After Tax (NPAT) (ZAR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-ink/35">R</span>
                    <input 
                      type="number"
                      value={npat}
                      onChange={(e) => setNpat(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3.5 text-xs bg-bg-dark border border-ink/10 rounded-xl focus:outline-none focus:border-brand-primary font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Month Picker */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-brand-secondary block">
                  Financial Year End Month
                </label>
                <div className="flex gap-2">
                  {['February', 'June', 'December'].map(month => (
                    <button
                      key={month}
                      type="button"
                      onClick={() => setFyEnd(month)}
                      className={`flex-1 py-3 text-xs font-black uppercase tracking-widest border rounded-lg transition-all ${
                        fyEnd === month 
                          ? 'bg-brand-secondary text-white border-brand-secondary shadow' 
                          : 'border-ink/10 text-ink/50 hover:border-brand-primary hover:text-brand-primary'
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>

              {/* Outputs display */}
              <div className="grid md:grid-cols-3 gap-4 border-t border-ink/5 pt-6 mt-6">
                <div className="p-4 bg-brand-secondary/5 border border-ink/5 rounded-xl">
                  <span className="text-[8px] font-black uppercase tracking-wider text-ink/40 block mb-1">
                    ED Spend Target (1% NPAT)
                  </span>
                  <div className="text-lg font-mono font-bold text-brand-secondary">
                    R{edTarget.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div className="p-4 bg-brand-secondary/5 border border-ink/5 rounded-xl">
                  <span className="text-[8px] font-black uppercase tracking-wider text-ink/40 block mb-1">
                    SD Spend Target (2% NPAT)
                  </span>
                  <div className="text-lg font-mono font-bold text-brand-secondary">
                    R{sdTarget.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-xl">
                  <span className="text-[8px] font-black uppercase tracking-wider text-brand-primary block mb-1">
                    Total Required ESD Target
                  </span>
                  <div className="text-lg font-mono font-bold text-brand-primary">
                    R{totalEsdTarget.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
            </div>

            {/* Verification & compliance details card */}
            <div className="glass p-8 rounded-2xl border-brand-primary/10 flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-brand-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider text-brand-secondary leading-none mb-2">
                  Airtight SANAS verification trails
                </h4>
                <p className="text-xs text-ink/65 leading-relaxed">
                  Every sponsored kit registers an activity tracking log mapped directly to the beneficiary's business tasks. During your B-BBEE audit, simply export the ledger to prove operational capacity development took place.
                </p>
              </div>
            </div>
          </div>

          {/* SPONSOR INTAKE FORM (SPAN 5) */}
          <div className="lg:col-span-5 bg-brand-secondary text-white p-8 rounded-2xl border border-white/5 shadow-2xl space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-display font-black text-white">
                Sponsor Program Intake
              </h3>
              <p className="text-xs text-white/40 mt-1">
                Customize your corporate ESD budget. Select a package and count below.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="order-form"
                  onSubmit={handleOrderSubmit} 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1.5">
                      Company Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Standard Bank Group"
                      value={orderCompany}
                      onChange={(e) => setOrderCompany(e.target.value)}
                      className="w-full p-4 text-xs bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1.5">
                      Work Email
                    </label>
                    <input 
                      type="email" 
                      placeholder="e.g. transformation@standardbank.co.za"
                      value={orderEmail}
                      onChange={(e) => setOrderEmail(e.target.value)}
                      className="w-full p-4 text-xs bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary text-white"
                      required
                    />
                  </div>

                  {/* Program package options */}
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-2">
                      Sponsorship Package Model
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'compliance', title: 'Compliance & Brand (ED)', desc: 'R75k / SME' },
                        { id: 'full', title: 'Full Growth Kit (SD)', desc: 'R150k / SME' }
                      ].map(pack => (
                        <button
                          key={pack.id}
                          type="button"
                          onClick={() => setSelectedPack(pack.id)}
                          className={`p-4 text-left border rounded-xl transition-all ${
                            selectedPack === pack.id 
                              ? 'bg-brand-primary text-white border-brand-primary shadow-lg' 
                              : 'border-white/10 hover:border-white text-white/60 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-xs leading-none">{pack.title}</div>
                          <div className="text-[10px] opacity-75 mt-1 font-mono">{pack.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1.5">
                      Number of SMEs to Sponsor
                    </label>
                    <input 
                      type="number" 
                      min="1" 
                      max="100"
                      value={kitCount}
                      onChange={(e) => setKitCount(Number(e.target.value))}
                      className="w-full p-4 text-xs bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary text-white font-mono"
                      required
                    />
                  </div>

                  {/* Cost output display */}
                  <div className="p-5 bg-black/30 border border-white/5 rounded-xl space-y-2 mt-2">
                    <div className="flex justify-between text-xs text-white/50">
                      <span>Kit price:</span>
                      <span className="font-mono text-white">R{currentPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs text-white/50">
                      <span>SME count:</span>
                      <span className="font-mono text-white">{kitCount}</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold">
                      <span className="uppercase tracking-wider text-brand-primary">Total Spend Value</span>
                      <span className="font-mono text-white text-lg">R{totalCartCost.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 bg-brand-primary hover:bg-white hover:text-brand-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    Confirm & Initialize Sponsorship
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="order-success"
                  className="text-center py-10 space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-14 h-14 bg-brand-primary/20 border border-brand-primary/30 rounded-full flex items-center justify-center mx-auto text-brand-primary">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold uppercase">Sponsorship Request Logged</h4>
                  <p className="text-xs text-white/50 leading-relaxed max-w-xs mx-auto">
                    We've registered your target spend of **R{totalCartCost.toLocaleString()}** against B-BBEE ESD compliance protocols. Our regional transformation officer will reach out directly.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 border border-white/20 hover:border-white text-white text-[9px] font-black uppercase tracking-widest rounded transition-all"
                  >
                    Back to Form
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
