import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Briefcase, Building2, LayoutDashboard, Globe, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';
import { SmeDashboard } from '../components/SmeDashboard';
import { CorporateDashboard } from '../components/CorporateDashboard';

// Mock base profile
const BASE_SME_PROFILE = {
  companyName: "Lindiwe's Spaza Shop & Deli",
  turnoverBracket: "<R10m EME",
  esdCategory: "ED" as const,
  isVendorVerified: false,
  tasksCompleted: {
    cipcRegistered: true,
    sarsTaxVerified: true,
    bbbeeAffidavitCreated: false,
    logoDesigned: false,
    websiteLaunched: false,
    whatsappBusinessActive: false,
    invoiceGenerated: false
  },
  sponsorId: "sponsor-123",
  pendingGovernmentFiles: [] as string[],
  offlineSyncPendingCount: 0,
  createdAt: new Date().toISOString()
};

const MOCK_CORPORATE_SPONSOR = {
  companyName: "VodaCapital SA (Pty) Ltd",
  financialYearEnd: "June",
  targetNpatSpendZar: 450000,
  sponsoredSmes: ["sme-1", "sme-2", "sme-3"],
  createdAt: new Date().toISOString()
};

export default function Portal() {
  const [userRole, setUserRole] = useState<'none' | 'sme' | 'corporate'>('none');
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isSmeConfiguring, setIsSmeConfiguring] = useState(false);
  
  // Custom SME Login configuration
  const [smeBusinessName, setSmeBusinessName] = useState("Lindiwe's Spaza Shop & Deli");
  const [smeIndustry, setSmeIndustry] = useState("Spaza/Retail");

  // Simulated Login Actions
  const handleSmeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole('sme');
  };

  const handleCorporateLogin = () => {
    setUserRole('corporate');
  };

  const handleLogout = () => {
    setUserRole('none');
    setIsSmeConfiguring(false);
  };

  // Compile SME profile dynamically
  const getSmeProfile = () => {
    return {
      ...BASE_SME_PROFILE,
      companyName: smeBusinessName,
      industry: smeIndustry
    };
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-bg-dark font-sans relative overflow-hidden text-ink">
      {/* Background visual grid accents */}
      <div className="absolute inset-0 bg-dot opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-brand-primary/5 to-transparent rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <AnimatePresence mode="wait">
          {userRole === 'none' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center py-12"
            >
              <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/5 border border-brand-secondary/10">
                <Shield className="w-4 h-4 text-brand-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">
                  BizStartup Portal
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-black leading-tight mb-6">
                Gateway to <br /><span className="text-gradient">Growth & Compliance.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-ink/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                Sign in to manage your South African SME growth checklist or oversee your corporate B-BBEE ESD sponsored investments.
              </p>

              {/* Demo Mode Toggle Alert */}
              <div className="mb-12 max-w-lg mx-auto glass p-6 rounded-2xl border border-brand-primary/20 flex flex-col md:flex-row items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-black uppercase tracking-wider text-brand-secondary">Evaluation Sandbox Active</span>
                    <button
                      onClick={() => setIsDemoMode(!isDemoMode)}
                      className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all ${
                        isDemoMode 
                          ? 'bg-brand-primary text-white border-brand-primary' 
                          : 'border-ink/10 text-ink/40 hover:border-brand-primary hover:text-brand-primary'
                      }`}
                    >
                      {isDemoMode ? 'Sandbox ON' : 'Sandbox OFF'}
                    </button>
                  </div>
                  <p className="text-[11px] text-ink/50 mt-1.5">
                    {isDemoMode 
                      ? "Interactive simulator is pre-loaded with mock data for instant transformation review."
                      : "Connecting directly to your Firebase Firestore collections. Real authentication required."
                    }
                  </p>
                </div>
              </div>

              {/* Interactive Login Panels */}
              <AnimatePresence mode="wait">
                {!isSmeConfiguring ? (
                  <motion.div 
                    key="role-selection"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto"
                  >
                    {/* SME Card */}
                    <div
                      onClick={() => setIsSmeConfiguring(true)}
                      className="p-10 rounded-2xl bg-white border border-ink/5 hover:border-brand-primary/20 shadow-xl text-left cursor-pointer transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-14 h-14 rounded-xl bg-brand-secondary/5 flex items-center justify-center mb-8 group-hover:bg-brand-primary/10 transition-colors">
                          <Briefcase className="w-7 h-7 text-brand-secondary group-hover:text-brand-primary transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold uppercase mb-4 tracking-tight">SME Client Dashboard</h3>
                        <p className="text-sm text-ink/50 leading-relaxed mb-8">
                          Register your company, design logos, build templates, configure local payments, and view sponsored roadmaps.
                        </p>
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                        Launch Setup Workspace <span className="text-xs">&rarr;</span>
                      </div>
                    </div>

                    {/* Corporate Sponsor Card */}
                    <div
                      onClick={handleCorporateLogin}
                      className="p-10 rounded-2xl bg-brand-secondary text-white border border-white/5 hover:border-brand-primary/30 shadow-2xl text-left cursor-pointer transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-brand-primary/20 transition-colors">
                          <Building2 className="w-7 h-7 text-white group-hover:text-brand-primary transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold uppercase mb-4 tracking-tight">Corporate ESD Sponsor</h3>
                        <p className="text-sm text-white/50 leading-relaxed mb-8">
                          Monitor sponsored small businesses, calculate target spend against NPAT, export SANAS audit pack files, and provide active coaching.
                        </p>
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                        Enter Portal <span className="text-xs">&rarr;</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sme-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-ink/5 shadow-2xl text-left"
                  >
                    <button 
                      onClick={() => setIsSmeConfiguring(false)}
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-ink/40 hover:text-brand-primary transition-colors mb-6"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to selection
                    </button>

                    <h3 className="text-xl font-display font-black text-brand-secondary border-b border-ink/5 pb-4 mb-6">
                      SME Workspace Setup
                    </h3>

                    <form onSubmit={handleSmeLogin} className="space-y-6">
                      <div>
                        <label className="text-[9px] font-black uppercase tracking-widest text-ink/40 block mb-1.5">
                          Registered Business Name
                        </label>
                        <input 
                          type="text" 
                          placeholder="e.g. Soweto Coffee Roasters"
                          value={smeBusinessName}
                          onChange={(e) => setSmeBusinessName(e.target.value)}
                          className="w-full p-4 text-xs bg-bg-dark border border-ink/10 rounded-xl focus:outline-none focus:border-brand-primary"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[9px] font-black uppercase tracking-widest text-ink/40 block mb-1.5">
                          Business Industry Sector
                        </label>
                        <select
                          value={smeIndustry}
                          onChange={(e) => setSmeIndustry(e.target.value)}
                          className="w-full p-4 text-xs bg-bg-dark border border-ink/10 rounded-xl focus:outline-none focus:border-brand-primary"
                        >
                          <option value="Spaza/Retail">Spaza / Local Retail Shop</option>
                          <option value="Transport & Logistics">Fleet Transport & Logistics</option>
                          <option value="Food & Beverage">Food & Beverage Services</option>
                          <option value="Professional Services">Professional & IT Services</option>
                          <option value="Manufacturing">Township Manufacturing</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-brand-secondary hover:bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        Launch Interactive Workspace
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {userRole === 'sme' && (
            <motion.div
              key="sme-dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SmeDashboard 
                profile={isDemoMode ? getSmeProfile() : null} 
                onLogout={handleLogout} 
              />
            </motion.div>
          )}

          {userRole === 'corporate' && (
            <motion.div
              key="corporate-dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CorporateDashboard 
                sponsor={isDemoMode ? MOCK_CORPORATE_SPONSOR : null} 
                onLogout={handleLogout} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
