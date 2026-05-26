import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Users, Trophy, Clock, Download, ArrowUpRight, 
  Send, User, ArrowRight, ShieldCheck, HelpCircle, Check, LogOut, Calendar 
} from 'lucide-react';

interface CorporateSponsor {
  companyName: string;
  financialYearEnd: string;
  targetNpatSpendZar: number;
  sponsoredSmes: string[];
}

export const CorporateDashboard = ({ sponsor, onLogout }: { sponsor: CorporateSponsor | null, onLogout: () => void }) => {
  // Sponsor Setup
  const [companyName] = useState(sponsor?.companyName || "VodaCapital SA");
  const [yearEnd] = useState(sponsor?.financialYearEnd || "June");
  const [targetSpend, setTargetSpend] = useState(sponsor?.targetNpatSpendZar || 450000);
  
  // Year-end Countdown simulation (Target June 30, 2026)
  const [daysLeft, setDaysLeft] = useState(35);
  
  // List of sponsored SMEs
  const [smes, setSmes] = useState([
    { id: "sme-1", name: "Lindiwe's Spaza Shop & Deli", sector: "Retail & Consumer", esdCategory: "ED", progress: 28, isVendorVerified: false, kitType: "Full Growth Kit" },
    { id: "sme-2", name: "Kgosi Logistics (Pty) Ltd", sector: "Transport & Supply Chain", esdCategory: "SD", progress: 85, isVendorVerified: true, kitType: "Compliance & Brand Kit" },
    { id: "sme-3", name: "Soweto Coffee Roasters", sector: "Agri-processing", esdCategory: "ED", progress: 42, isVendorVerified: false, kitType: "Full Growth Kit" },
  ]);

  // Selected client for mentoring deep dive
  const [selectedSmeId, setSelectedSmeId] = useState("sme-1");
  const selectedSme = smes.find(s => s.id === selectedSmeId) || smes[0];

  // Mentorship messaging log
  const [chats, setChats] = useState<Record<string, { sender: 'Sponsor' | 'SME'; text: string; time: string }[]>>({
    "sme-1": [
      { sender: 'SME', text: "Good morning, we've registered on CIPC. We're currently waiting for SARS to verify our compliance PIN.", time: "09:12 AM" },
      { sender: 'Sponsor', text: "Excellent progress, Lindiwe. I've reviewed your draft business plan. Focus on detailing your local township market density first.", time: "10:30 AM" }
    ],
    "sme-2": [
      { sender: 'Sponsor', text: "Hi Kgosi, are your logistics routes ready for vendor testing?", time: "Yesterday" },
      { sender: 'SME', text: "Yes, we uploaded our vendor onboarding pack to your compliance portal.", time: "Yesterday" }
    ],
    "sme-3": [
      { sender: 'SME', text: "We need advice on setting up online payment gateways. PayFast or Yoco?", time: "2 days ago" }
    ]
  });

  const [newMessage, setNewMessage] = useState('');

  // Audit Pack ledger simulation
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditLogs, setAuditLogs] = useState([
    { time: "2026-05-26 09:12:04", sme: "Lindiwe's Spaza Shop", action: "CIPC registration marked complete. Slip uploaded: CIPC-Slip-9831.pdf", status: "Buffered" },
    { time: "2026-05-25 15:44:12", sme: "Kgosi Logistics", action: "SARS tax compliance verified. Reference: 991823019", status: "Verified" },
    { time: "2026-05-24 11:20:00", sme: "Soweto Coffee Roasters", action: "Drafted SEFA Funding plan target: R120k", status: "Verified" },
    { time: "2026-05-24 10:15:30", sme: "Lindiwe's Spaza Shop", action: "Turnover bracket declared: <R10m EME", status: "Verified" },
    { time: "2026-05-23 16:02:11", sme: "Kgosi Logistics", action: "PayFast checkout form copy-pasted from snippet generator", status: "Verified" }
  ]);

  // Dynamic B-BBEE score outputs
  // Corporates get 15 points target for ESD (5 for Enterprise Development, 10 for Supplier Development)
  const calculateEsdPoints = () => {
    const totalActualSpend = smes.length * 125000; // Let's mock a cost/value of 125k per kit
    const targetRatio = Math.min(totalActualSpend / targetSpend, 1);
    const edSmes = smes.filter(s => s.esdCategory === 'ED').length;
    const sdSmes = smes.filter(s => s.esdCategory === 'SD').length;
    
    // Weighted points score based on category ratios
    const score = (edSmes * 5 + sdSmes * 10) * targetRatio;
    return Math.min(Math.round(score * 10) / 10, 15);
  };

  // Promotion logic: Promote ED to SD (Enterprise to Supplier Development)
  const handlePromoteCategory = (id: string) => {
    setSmes(prev => prev.map(s => {
      if (s.id === id) {
        const nextCat = s.esdCategory === 'ED' ? 'SD' : 'ED';
        const verifyStatus = nextCat === 'SD' ? true : false;
        
        // Add entry to Audit Pack
        const time = new Date().toISOString().replace('T', ' ').substring(0, 19);
        setAuditLogs(prevLogs => [
          { 
            time, 
            sme: s.name, 
            action: `Promoted Category from ${s.esdCategory} to ${nextCat} (Active Vendor Status: ${verifyStatus})`,
            status: "Verified" 
          },
          ...prevLogs
        ]);

        return { ...s, esdCategory: nextCat, isVendorVerified: verifyStatus };
      }
      return s;
    }));
  };

  // Send mentorship message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChats(prev => ({
      ...prev,
      [selectedSmeId]: [
        ...(prev[selectedSmeId] || []),
        { sender: 'Sponsor', text: newMessage, time }
      ]
    }));

    // Add mentorship message log to audit pack (critical for compliance verification)
    const logTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setAuditLogs(prevLogs => [
      {
        time: logTime,
        sme: selectedSme.name,
        action: `Mentorship Consultation logged: "${newMessage.substring(0, 30)}..."`,
        status: "Verified"
      },
      ...prevLogs
    ]);

    setNewMessage('');
  };

  return (
    <div className="bg-brand-secondary min-h-screen text-white pb-20">
      
      {/* Corporate Header */}
      <div className="border-b border-white/5 bg-brand-secondary/80 backdrop-blur-md py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/15">
            <Building2 className="w-5 h-5 text-brand-primary" />
          </div>
          <div>
            <h2 className="text-xl font-display font-black leading-none">{companyName}</h2>
            <p className="text-xs text-white/40 mt-1 uppercase tracking-widest font-bold">
              Corporate B-BBEE Transformation Dashboard
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsAuditModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-brand-primary hover:bg-white hover:text-brand-secondary text-white text-xs font-black uppercase tracking-wider transition-all rounded shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            Generate B-BBEE Audit Pack
          </button>

          <button 
            onClick={onLogout}
            className="p-3 border border-white/10 rounded-full hover:bg-white/5 hover:border-white/20 transition-all text-white/60 hover:text-white"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid container */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-10 grid lg:grid-cols-4 gap-8">
        
        {/* TOP ROW STATS (SPAN 4) */}
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Active Beneficiaries */}
          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">
                Active Beneficiaries
              </span>
              <h3 className="text-3xl font-display font-black text-white">{smes.length} SMEs</h3>
              <p className="text-[10px] text-white/30 mt-1 uppercase">
                {smes.filter(s => s.esdCategory === 'SD').length} Vendor SD / {smes.filter(s => s.esdCategory === 'ED').length} Enterprise ED
              </p>
            </div>
            <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/20 shrink-0">
              <Users className="w-6 h-6 text-brand-primary" />
            </div>
          </div>

          {/* ESD Spend Target */}
          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">
                Actual vs. Target Spend
              </span>
              <h3 className="text-3xl font-display font-black text-white">
                R{smes.length * 125},000
              </h3>
              <p className="text-[10px] text-white/30 mt-1 uppercase">
                Target: R{targetSpend.toLocaleString()} (2% NPAT)
              </p>
            </div>
            <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/20 shrink-0">
              <Trophy className="w-6 h-6 text-brand-primary" />
            </div>
          </div>

          {/* B-BBEE Scorecard points projection */}
          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">
                Scorecard Points Earned
              </span>
              <h3 className="text-3xl font-display font-black text-white">
                {calculateEsdPoints()} / 15.0
              </h3>
              <p className="text-[10px] text-white/30 mt-1 uppercase">
                Weightings: SD = 2x ED weight
              </p>
            </div>
            <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center border border-brand-primary/20 shrink-0">
              <ShieldCheck className="w-6 h-6 text-brand-primary" />
            </div>
          </div>

          {/* Year End Countdown Ticker */}
          <div className="bg-brand-primary/10 border border-brand-primary/20 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block mb-2">
                FY End Countdown ({yearEnd})
              </span>
              <h3 className="text-3xl font-display font-black text-white">
                {daysLeft} Days Left
              </h3>
              <p className="text-[10px] text-brand-primary/80 mt-1 uppercase font-bold">
                Secure spend before audit closeout
              </p>
            </div>
            <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center border border-brand-primary/30 shrink-0">
              <Calendar className="w-6 h-6 text-brand-primary" />
            </div>
          </div>
        </div>

        {/* BOTTOM LEFT: Sponsored Beneficiary List Table (SPAN 3) */}
        <div className="lg:col-span-3 bg-white/5 border border-white/5 p-8 rounded-2xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-display font-black text-white">
              Sponsored Beneficiary Ledger
            </h3>
            <p className="text-xs text-white/40 mt-1">
              B-BBEE Codes favor Supplier Development (SD) over Enterprise Development (ED). Use vendor verified links to transition clients.
            </p>
          </div>

          {/* SME Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40 uppercase tracking-widest text-[9px]">
                  <th className="py-4 font-black">Company Name</th>
                  <th className="py-4 font-black">Sector</th>
                  <th className="py-4 font-black">ESD Classification</th>
                  <th className="py-4 font-black text-center">Roadmap Progress</th>
                  <th className="py-4 font-black">Active Sponsorship Kit</th>
                  <th className="py-4 font-black text-right">Vendor Promotion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {smes.map((sme) => (
                  <tr 
                    key={sme.id}
                    onClick={() => setSelectedSmeId(sme.id)}
                    className={`cursor-pointer transition-all hover:bg-white/5 ${
                      selectedSmeId === sme.id ? 'bg-white/5' : ''
                    }`}
                  >
                    <td className="py-5 pr-4 font-bold flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${sme.progress > 80 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      {sme.name}
                    </td>
                    <td className="py-5 pr-4 text-white/60">{sme.sector}</td>
                    <td className="py-5 pr-4">
                      <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded ${
                        sme.esdCategory === 'SD' 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {sme.esdCategory === 'SD' ? 'SD (Supplier)' : 'ED (Enterprise)'}
                      </span>
                    </td>
                    <td className="py-5 pr-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-mono text-white/80">{sme.progress}%</span>
                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-primary" style={{ width: `${sme.progress}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-5 pr-4 text-white/50">{sme.kitType}</td>
                    <td className="py-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePromoteCategory(sme.id);
                        }}
                        className={`text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded transition-all ${
                          sme.esdCategory === 'SD'
                            ? 'border border-green-500/20 text-green-400 hover:bg-green-500/10'
                            : 'bg-brand-primary hover:bg-white hover:text-brand-secondary text-white'
                        }`}
                      >
                        {sme.esdCategory === 'SD' ? 'Downgrade to ED' : 'Promote to SD'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BOTTOM RIGHT: Mentorship Virtual Chat Panel (SPAN 1) */}
        <div className="lg:col-span-1 bg-white/5 border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-[450px]">
          <div>
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-display font-black leading-none">Mentorship Core</h4>
                <p className="text-[10px] text-white/40 mt-1 truncate max-w-[150px]">{selectedSme.name}</p>
              </div>
              <span className="text-[8px] font-black uppercase tracking-wider bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded border border-brand-primary/20">
                Live Coaching
              </span>
            </div>

            {/* Chat Box */}
            <div className="space-y-4 my-4 h-[280px] overflow-y-auto pr-2 text-xs">
              {(chats[selectedSmeId] || []).map((chat, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col ${chat.sender === 'Sponsor' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[8px] text-white/30 uppercase tracking-widest font-bold mb-1">
                    {chat.sender === 'Sponsor' ? 'You' : selectedSme.name.split(" ")[0]}
                  </span>
                  <div className={`p-3 rounded-lg max-w-[85%] leading-relaxed ${
                    chat.sender === 'Sponsor' 
                      ? 'bg-brand-primary text-white rounded-tr-none' 
                      : 'bg-white/10 text-white/95 rounded-tl-none'
                  }`}>
                    {chat.text}
                  </div>
                  <span className="text-[8px] text-white/30 mt-1">{chat.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form message */}
          <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-white/10 pt-4">
            <input 
              type="text" 
              placeholder="Provide mentoring advice..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-primary"
            />
            <button 
              type="submit"
              className="p-2.5 bg-brand-primary text-white rounded hover:bg-white hover:text-brand-secondary transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* B-BBEE Audit Pack Ledger Modal */}
      <AnimatePresence>
        {isAuditModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuditModalOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-6 bottom-6 top-6 md:inset-x-20 md:bottom-20 md:top-20 bg-brand-secondary border border-white/10 rounded-2xl z-55 shadow-2xl p-8 overflow-y-auto flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-2xl font-display font-black text-white">SANAS B-BBEE Audit Pack Export</h3>
                    <p className="text-xs text-white/40 mt-1">
                      Verification agencies require a ledger of developmental activities. The report below logs immutable timestamps of activity.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsAuditModalOpen(false)}
                    className="text-[10px] font-black uppercase tracking-widest border border-white/20 hover:border-white px-3 py-1.5 rounded transition-all"
                  >
                    Close
                  </button>
                </div>

                {/* Audit table logs */}
                <div className="overflow-x-auto bg-black/40 rounded-xl border border-white/10">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-white/30 uppercase tracking-widest text-[8px]">
                        <th className="p-4 font-black">Logged Timestamp</th>
                        <th className="p-4 font-black">Beneficiary SME</th>
                        <th className="p-4 font-black">Developmental Action / Log Details</th>
                        <th className="p-4 font-black text-right">Verification Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white/70 font-mono text-[10px]">
                      {auditLogs.map((log, i) => (
                        <tr key={i} className="hover:bg-white/5">
                          <td className="p-4 text-brand-primary">{log.time}</td>
                          <td className="p-4 font-bold text-white">{log.sme}</td>
                          <td className="p-4">{log.action}</td>
                          <td className="p-4 text-right">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                              log.status === 'Verified' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400 animate-pulse'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mt-12 flex justify-between items-center">
                <span className="text-[10px] text-white/30 uppercase tracking-widest">
                  Report generated for verification of B-BBEE Section 9(1) ESD Spend Codes
                </span>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      // Generate and download CSV string representation
                      const header = "Timestamp,SME,Action,Status\n";
                      const csvContent = auditLogs.map(l => `"${l.time}","${l.sme}","${l.action}","${l.status}"`).join("\n");
                      const blob = new Blob([header + csvContent], { type: 'text/csv' });
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.setAttribute('href', url);
                      a.setAttribute('download', `${companyName.replace(/\s+/g, '_')}_B-BBEE_ESD_AuditPack.csv`);
                      a.click();
                      setIsAuditModalOpen(false);
                    }}
                    className="px-6 py-3 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded hover:bg-white hover:text-brand-secondary transition-all"
                  >
                    Download CSV Ledger
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
