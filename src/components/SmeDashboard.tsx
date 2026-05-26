import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, AlertTriangle, Wifi, WifiOff, Code, FileText, 
  CreditCard, Sparkles, LogOut, ArrowRight, Download, Send, Globe, 
  Smartphone, Bot, ShieldCheck, Award, FileCode, CheckSquare, RefreshCw,
  Check, DollarSign, Search, Trash2, Plus
} from 'lucide-react';

interface SmeProfile {
  companyName: string;
  industry?: string;
  turnoverBracket: string;
  esdCategory: string;
  isVendorVerified: boolean;
  tasksCompleted: Record<string, boolean>;
  sponsorId: string;
  pendingGovernmentFiles: string[];
  offlineSyncPendingCount: number;
}

export const SmeDashboard = ({ profile, onLogout }: { profile: SmeProfile | null, onLogout: () => void }) => {
  // Offline Simulation State
  const [isOnline, setIsOnline] = useState(true);
  const [offlineQueue, setOfflineQueue] = useState<{ action: string; time: string }[]>([]);
  
  // Dashboard Core State (initialized with mock profile if present)
  const [companyName, setCompanyName] = useState(profile?.companyName || "My Small Business");
  const [industry, setIndustry] = useState(profile?.industry || "Spaza/Retail");
  const [turnoverBracket, setTurnoverBracket] = useState(profile?.turnoverBracket || "<R10m EME");
  const [esdCategory, setEsdCategory] = useState(profile?.esdCategory || "ED");
  const [tasks, setTasks] = useState<Record<string, boolean>>(profile?.tasksCompleted || {
    cipcRegistered: true,
    sarsTaxVerified: true,
    bbbeeAffidavitCreated: false,
    logoDesigned: false,
    websiteLaunched: false,
    whatsappBusinessActive: false,
    invoiceGenerated: false
  });

  // Government slip buffer state
  const [govtSlips, setGovtSlips] = useState<string[]>([]);
  const [tempFile, setTempFile] = useState('');
  
  // Activity Log
  const [activityLog, setActivityLog] = useState<{ description: string; time: string; offline?: boolean }[]>([
    { description: "Dashboard workspace initialized.", time: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString() }
  ]);

  // Code snippet drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState<'yoco' | 'payfast'>('yoco');

  // AI Agency active agent selection
  const [activeAgent, setActiveAgent] = useState<'branding' | 'web' | 'planning' | 'compliance' | 'ledger' | 'seo'>('branding');

  // --- Tool State: Apex (Branding Agent) SVG Logo Builder ---
  const [logoInitials, setLogoInitials] = useState(companyName.substring(0, 2).toUpperCase());
  const [logoColorPrimary, setLogoColorPrimary] = useState('#EF233C'); // Brand Red
  const [logoColorSecondary, setLogoColorSecondary] = useState('#0D1B2A'); // Navy
  const [logoSymbol, setLogoSymbol] = useState<'store' | 'truck' | 'mug' | 'star' | 'rocket'>('store');

  // --- Tool State: Nova (Web Agent) Website Generator ---
  const [webHeadline, setWebHeadline] = useState(`Welcome to ${companyName}`);
  const [webDescription, setWebDescription] = useState(`We are proud to serve our community in the ${industry} sector with reliable, high-quality offerings.`);
  const [webContact, setWebContact] = useState("079 894 0476");
  const [webGateway, setWebGateway] = useState<'yoco' | 'payfast'>('yoco');
  const [webSaved, setWebSaved] = useState(false);

  // --- Tool State: Scribe (Planning Agent) ---
  const [bizPlan, setBizPlan] = useState({
    mission: `Empowering growth in the local ${industry} sector.`,
    market: "Township and sub-urban retail services.",
    fundingTarget: "R150,000 for equipment scaling"
  });
  const [isPlanSaved, setIsPlanSaved] = useState(false);

  // --- Tool State: Vanguard (Compliance Agent) ---
  const [blackOwnershipPercent, setBlackOwnershipPercent] = useState('100%');

  // --- Tool State: Ledger (Bookkeeper Agent) ---
  const [expenses, setExpenses] = useState<{ id: string; desc: string; amount: number }[]>([
    { id: '1', desc: 'Stock inventory purchase', amount: 4500 },
    { id: '2', desc: 'Local delivery fuel cost', amount: 850 },
    { id: '3', desc: 'BizStartup Kit setup fee', amount: 0 }
  ]);
  const [newExpenseDesc, setNewExpenseDesc] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [isLedgerSaved, setIsLedgerSaved] = useState(false);

  // --- Tool State: Seeker (SEO Agent) ---
  const [seoKeywords, setSeoKeywords] = useState('local, quality service, retail');
  const [seoLocality, setSeoLocality] = useState('Soweto, Gauteng');
  const [isSeoSaved, setIsSeoSaved] = useState(false);

  // Dynamic progress calculation (formulaic weight based on boolean checklist flags)
  const calculateProgress = () => {
    const total = Object.keys(tasks).length;
    const completed = Object.values(tasks).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  // Phase-specific progress calculations
  const calculatePhaseProgress = (phaseKeys: string[]) => {
    const completed = phaseKeys.filter(k => tasks[k]).length;
    return Math.round((completed / phaseKeys.length) * 100);
  };

  // Sync Log with Local Database & Server
  const logActivity = (desc: string) => {
    const time = new Date().toLocaleTimeString();
    if (!isOnline) {
      setOfflineQueue(prev => [...prev, { action: desc, time }]);
      setActivityLog(prev => [{ description: `[Queued Offline] ${desc}`, time, offline: true }, ...prev]);
    } else {
      setActivityLog(prev => [{ description: desc, time }, ...prev]);
      fetch('/api/audit-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smeId: 'sme-demo', actionDescription: desc, isOfflineLogged: false })
      }).catch(() => {});
    }
  };

  // Handle task toggling
  const handleToggleTask = (key: string) => {
    const updatedTasks = { ...tasks, [key]: !tasks[key] };
    setTasks(updatedTasks);
    const action = !tasks[key] ? `Completed Task: ${key}` : `Reopened Task: ${key}`;
    logActivity(action);
  };

  // Add a new expense record in Ledger workspace
  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseDesc.trim() || !newExpenseAmount.trim()) return;
    const amountNum = parseFloat(newExpenseAmount);
    if (isNaN(amountNum)) return;
    const newExp = {
      id: Date.now().toString(),
      desc: newExpenseDesc,
      amount: amountNum
    };
    setExpenses(prev => [...prev, newExp]);
    setNewExpenseDesc('');
    setNewExpenseAmount('');
    logActivity(`Ledger Agent: Recorded new operating expense: ${newExpenseDesc} (R${amountNum})`);
  };

  // Remove an expense record
  const removeExpense = (id: string, desc: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    logActivity(`Ledger Agent: Removed expense entry: ${desc}`);
  };

  // Process offline sync queue
  useEffect(() => {
    if (isOnline && offlineQueue.length > 0) {
      fetch('/api/audit-log/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smeId: 'sme-demo', logs: offlineQueue.map(q => ({ actionDescription: q.action, timestamp: new Date().toISOString() })) })
      })
      .then(() => {
        logActivity(`Synchronized ${offlineQueue.length} offline activity records to B-BBEE Ledger.`);
        setOfflineQueue([]);
      })
      .catch(() => {
        logActivity("Reconnection sync failed. Retrying when connection settles.");
      });
    }
  }, [isOnline]);

  const handleTurnoverChange = (val: string) => {
    setTurnoverBracket(val);
    logActivity(`Updated Turnover Bracket to ${val}`);
  };

  const handleUploadSlip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempFile.trim()) return;
    setGovtSlips(prev => [...prev, tempFile]);
    logActivity(`Uploaded Government Verification Proof: ${tempFile}`);
    setTempFile('');
  };

  // --- SVG Logo Code compiler ---
  const generateSvgLogoContent = () => {
    const symbolMarkup = {
      store: `<path d="M2 20h20M3 20v-8M21 20v-8M3 12h18M4 7l8-4 8 4" stroke="${logoColorPrimary}" stroke-width="2" stroke-linecap="round" fill="none"/>
              <rect x="9" y="12" width="6" height="8" rx="1" stroke="${logoColorSecondary}" stroke-width="2" fill="none"/>`,
      truck: `<rect x="2" y="9" width="12" height="11" rx="1" stroke="${logoColorSecondary}" stroke-width="2" fill="none"/>
              <path d="M14 12h5l3 3v5h-8M5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="${logoColorPrimary}" stroke-width="2" fill="none"/>`,
      mug: `<path d="M17 8h1a4 4 0 0 1 0 8h-1M5 8h12v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8zM9 2v3M13 2v3" stroke="${logoColorPrimary}" stroke-width="2" stroke-linecap="round" fill="none"/>`,
      star: `<path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" stroke="${logoColorPrimary}" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
      rocket: `<path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 3.5s2-1 3.5-2.5M12 5l-8 8v4h4l8-8M9 8l7-7 4 4-7 7M15 15l4.5 4.5c1.5-1.5 2.5-3.5 2.5-3.5s-2 1-3.5 2.5" stroke="${logoColorPrimary}" stroke-width="2" stroke-linecap="round" fill="none"/>`
    }[logoSymbol];

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="12" fill="${logoColorSecondary}10" stroke="${logoColorSecondary}20" stroke-width="1"/>
  <g transform="translate(14, 12)">
    ${symbolMarkup}
  </g>
  <text x="50" y="85" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="12" fill="${logoColorSecondary}">${logoInitials}</text>
</svg>`;
  };

  // Handle Logo Download
  const handleDownloadLogo = () => {
    const svgContent = generateSvgLogoContent();
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${companyName.toLowerCase().replace(/\s+/g, '_')}_logo.svg`);
    a.click();
    logActivity("Apex Agent: Generated and downloaded SVG Brand Logo.");
    setTasks(prev => ({ ...prev, logoDesigned: true }));
  };

  // --- Website index.html compiler ---
  const generateWebsiteContent = () => {
    const paymentForm = webGateway === 'yoco' 
      ? `<script src="https://js.yoco.com/v1/sdk.js"></script>
         <button id="checkout-button" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded shadow-lg transition-all w-full md:w-auto">
           Pay via Yoco Card
         </button>
         <script>
           var yoco = new window.YocoSDK({ publicKey: 'pk_test_yoco_key_demo_2026' });
           document.getElementById('checkout-button').addEventListener('click', function () {
             yoco.showPopup({
               amountInCents: 25000,
               currency: 'ZAR',
               name: '${companyName}',
               description: 'Customer Payment Validation',
               callback: function (result) {
                 alert(result.error ? "Payment failed: " + result.error.message : "Payment successful! Token: " + result.id);
               }
             });
           });
         </script>`
      : `<form action="https://sandbox.payfast.co.za/eng/process" method="post">
           <input type="hidden" name="merchant_id" value="10000100">
           <input type="hidden" name="merchant_key" value="46f0zse5s0ur2">
           <input type="hidden" name="amount" value="250.00">
           <input type="hidden" name="item_name" value="Product Order ZAR">
           <button type="submit" class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded shadow-lg transition-all w-full md:w-auto">
             Secure Order via PayFast
           </button>
         </form>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${companyName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col justify-between">
  <header class="bg-white border-b border-gray-100 py-6 px-8 shadow-sm">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center font-bold text-indigo-600">
          ${logoInitials}
        </div>
        <span class="text-xl font-bold tracking-tight text-gray-900">${companyName}</span>
      </div>
      <a href="tel:${webContact}" class="text-xs font-bold text-indigo-600 border border-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all">
        Call: ${webContact}
      </a>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-6 py-20 flex-1 flex flex-col items-center justify-center text-center">
    <h1 class="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">${webHeadline}</h1>
    <p class="text-lg text-gray-500 leading-relaxed max-w-2xl mb-12">${webDescription}</p>
    
    <div class="w-full max-w-md p-8 bg-white border border-gray-100 rounded-2xl shadow-xl flex flex-col items-center gap-6">
      <h3 class="text-lg font-bold text-gray-900">Configure Local Payments</h3>
      ${paymentForm}
    </div>
  </main>

  <footer class="bg-gray-900 text-white/50 py-10 px-8 text-center text-xs border-t border-gray-800">
    <p>© 2026 ${companyName}. Supported by BizStartup compliance protocols.</p>
  </footer>
</body>
</html>`;
  };

  // Handle Website Download
  const handleDownloadWebsite = () => {
    const htmlContent = generateWebsiteContent();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'index.html');
    a.click();
    logActivity("Nova Agent: Compiled and downloaded index.html website.");
    setTasks(prev => ({ ...prev, websiteLaunched: true }));
    setWebSaved(true);
  };

  // Handle Plan Download
  const handleDownloadPlan = () => {
    const planText = `=========================================
BUSINESS PLAN DIRECTIVE: ${companyName.toUpperCase()}
=========================================
Industry Focus: ${industry}
Turnover Target: ${turnoverBracket}
Compliance Framework: B-BBEE ESD Level 4 Affidavit

Core Value Statement:
${bizPlan.mission}

Target Market Segment:
${bizPlan.market}

Financing & Growth Mandate:
${bizPlan.fundingTarget}

Timestamp Logged: ${new Date().toLocaleString()}
=========================================`;
    const blob = new Blob([planText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${companyName.toLowerCase().replace(/\s+/g, '_')}_business_plan.txt`);
    a.click();
    logActivity("Scribe Agent: Generated and exported company Business Plan.");
    setIsPlanSaved(true);
  };

  // Handle Affidavit Download
  const handleDownloadAffidavit = () => {
    const text = `==========================================================
B-BBEE EXEMPTED MICRO ENTERPRISE (EME) AFFIDAVIT
==========================================================
In terms of the Amended Codes of Good Practice (South Africa)

I, the undersigned, declare under oath:
1. I am an authorized representative of: ${companyName}
2. The annual turnover of the entity does not exceed R10,000,000 (Ten Million Rand).
3. The black ownership percentage of the entity is: ${blackOwnershipPercent}
4. Based on the above, the entity qualifies as a Level ${blackOwnershipPercent === '100%' ? '1' : '4'} B-BBEE contributor.

Signed: ___________________________
Designation: Managing Director

COMMISSIONER OF OATHS STAMP & SIGNATURE REQUIRED
==========================================================`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${companyName.toLowerCase().replace(/\s+/g, '_')}_bbbee_affidavit.txt`);
    a.click();
    logActivity("Vanguard Agent: Auto-drafted B-BBEE EME Affidavit.");
    setTasks(prev => ({ ...prev, bbbeeAffidavitCreated: true }));
  };

  // Handle Ledger Download
  const handleDownloadLedger = () => {
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const ledgerText = `=========================================
FINANCIAL TRANSACTION LEDGER: ${companyName.toUpperCase()}
=========================================
Sector: ${industry}
Report Date: ${new Date().toLocaleDateString()}

TRANSACTION RECORDS:
${expenses.map(e => `- [Expense] ${e.desc}: R${e.amount}`).join('\n')}

SUMMARY:
Total Operating Expenses: R${totalExpenses}
Projected Annual Turnover: ${turnoverBracket}
Compliance Status: SME ESD Ledger Active

Certified by Ledger Bookkeeper Agent (agency-bookkeeper-controller).
=========================================`;
    const blob = new Blob([ledgerText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${companyName.toLowerCase().replace(/\s+/g, '_')}_financial_ledger.txt`);
    a.click();
    logActivity("Ledger Agent: Compiled and exported transaction ledger.");
    setTasks(prev => ({ ...prev, invoiceGenerated: true }));
    setIsLedgerSaved(true);
  };

  // Handle SEO Report Download
  const handleDownloadSeoReport = () => {
    const seoText = `=========================================
LOCAL SEO AUDIT & META DIRECTIVES: ${companyName.toUpperCase()}
=========================================
Locality: ${seoLocality}
Focus Keywords: ${seoKeywords}

GENERATED META TAGS:
<title>${companyName} | Premium ${industry} in ${seoLocality}</title>
<meta name="description" content="Looking for the best ${industry} in ${seoLocality}? We offer top-quality service. Keywords: ${seoKeywords}">
<meta name="keywords" content="${seoKeywords}, ${industry}, ${seoLocality}, South Africa">

RECOMMENDED STRATEGY FOR ${companyName}:
1. Setup Google Business Profile using address in ${seoLocality}.
2. Use the primary title: "${companyName} - ${industry} in ${seoLocality}".
3. Add a WhatsApp Chat Link to your profile using local contact number.
4. Integrate the above Meta Tags directly into your website head.

Drafted by Seeker SEO Agent (agency-seo-specialist).
=========================================`;
    const blob = new Blob([seoText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${companyName.toLowerCase().replace(/\s+/g, '_')}_seo_audit.txt`);
    a.click();
    logActivity("Seeker Agent: Drafted meta tags and exported local search optimization directives.");
    setIsSeoSaved(true);
  };

  return (
    <div className="bg-bg-dark min-h-screen text-ink pb-20">
      
      {/* Top Banner Dashboard Header */}
      <div className="border-b border-ink/5 bg-white py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
            <span className="font-display font-black text-brand-primary text-lg">S</span>
          </div>
          <div>
            <h2 className="text-xl font-display font-black leading-none">{companyName}</h2>
            <p className="text-xs text-ink/40 mt-1 uppercase tracking-widest font-bold">
              SA SME Development Workspace • {industry}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Network status simulator */}
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-black uppercase tracking-wider ${
              isOnline 
                ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
            }`}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            {isOnline ? "Server Connection Live" : "Offline Simulation Mode"}
          </button>

          <button 
            onClick={onLogout}
            className="p-2 border border-ink/10 rounded-full hover:bg-brand-primary/10 hover:border-brand-primary hover:text-brand-primary transition-all font-bold"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-10 grid lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Checklists & Phased Milestones (SPAN 7) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Milestone Phase Progression overview */}
          <div className="bg-white p-8 rounded-2xl border border-ink/5 shadow-sm space-y-6">
            <h3 className="text-lg font-display font-black text-brand-secondary border-b border-ink/5 pb-4">
              SA SME Growth Roadmaps
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Phase 1 */}
              <div className="p-4 bg-brand-secondary/5 rounded-xl border border-ink/5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase tracking-wider text-brand-secondary">Phase 1: Legal Setup</span>
                  <span className="text-xs font-mono font-bold text-brand-primary">
                    {calculatePhaseProgress(['cipcRegistered', 'sarsTaxVerified', 'bbbeeAffidavitCreated'])}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-ink/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary" style={{ width: `${calculatePhaseProgress(['cipcRegistered', 'sarsTaxVerified', 'bbbeeAffidavitCreated'])}%` }} />
                </div>
              </div>

              {/* Phase 2 */}
              <div className="p-4 bg-brand-secondary/5 rounded-xl border border-ink/5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase tracking-wider text-brand-secondary">Phase 2: Digital Brand</span>
                  <span className="text-xs font-mono font-bold text-brand-primary">
                    {calculatePhaseProgress(['logoDesigned', 'websiteLaunched'])}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-ink/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary" style={{ width: `${calculatePhaseProgress(['logoDesigned', 'websiteLaunched'])}%` }} />
                </div>
              </div>

              {/* Phase 3 */}
              <div className="p-4 bg-brand-secondary/5 rounded-xl border border-ink/5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase tracking-wider text-brand-secondary">Phase 3: Launch Trade</span>
                  <span className="text-xs font-mono font-bold text-brand-primary">
                    {calculatePhaseProgress(['whatsappBusinessActive', 'invoiceGenerated'])}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-ink/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary" style={{ width: `${calculatePhaseProgress(['whatsappBusinessActive', 'invoiceGenerated'])}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Phased Checklist Details */}
          <div className="bg-white p-8 rounded-2xl border border-ink/5 shadow-sm space-y-6">
            <h3 className="text-lg font-display font-black text-brand-secondary border-b border-ink/5 pb-4">
              SA Regulatory Tasks
            </h3>

            <div className="space-y-6">
              {/* Phase 1 */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary mb-3">
                  Phase 1: Legal Foundation
                </div>
                <div className="space-y-3">
                  {[
                    { key: 'cipcRegistered', title: 'CIPC Company Registration', desc: 'Secure your SA registered entity (COR14.3 form).' },
                    { key: 'sarsTaxVerified', title: 'SARS Tax Registration & Compliance', desc: 'Verify tax reference number and obtain compliance status PIN.' },
                    { key: 'bbbeeAffidavitCreated', title: 'B-BBEE EME Affidavit Verification', desc: 'Generate a commissioner-signed EME certificate for R0.00.' }
                  ].map(task => (
                    <div 
                      key={task.key}
                      onClick={() => handleToggleTask(task.key)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                        tasks[task.key] ? 'bg-brand-secondary/5 border-brand-secondary/20' : 'bg-white border-ink/5 hover:border-brand-primary/10'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        tasks[task.key] ? 'bg-brand-primary border-brand-primary text-white' : 'border-ink/20'
                      }`}>
                        {tasks[task.key] && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs">{task.title}</h4>
                        <p className="text-[11px] text-ink/55 mt-0.5">{task.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 2 */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary mb-3">
                  Phase 2: Digital Identity
                </div>
                <div className="space-y-3">
                  {[
                    { key: 'logoDesigned', title: 'SVG Logo Creation', desc: 'Establish branding design templates using Apex Agent.' },
                    { key: 'websiteLaunched', title: 'Website Launch & Hosting', desc: 'Build and deploy single-page landing site using Nova Agent.' }
                  ].map(task => (
                    <div 
                      key={task.key}
                      onClick={() => handleToggleTask(task.key)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                        tasks[task.key] ? 'bg-brand-secondary/5 border-brand-secondary/20' : 'bg-white border-ink/5 hover:border-brand-primary/10'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        tasks[task.key] ? 'bg-brand-primary border-brand-primary text-white' : 'border-ink/20'
                      }`}>
                        {tasks[task.key] && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs">{task.title}</h4>
                        <p className="text-[11px] text-ink/55 mt-0.5">{task.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 3 */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary mb-3">
                  Phase 3: Launch & Trade
                </div>
                <div className="space-y-3">
                  {[
                    { key: 'whatsappBusinessActive', title: 'WhatsApp Business Sales Catalog', desc: 'Activate local customer engagement and catalogs.' },
                    { key: 'invoiceGenerated', title: 'Operational Invoicing active', desc: 'Deploy invoicing setups and secure checkout forms.' }
                  ].map(task => (
                    <div 
                      key={task.key}
                      onClick={() => handleToggleTask(task.key)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${
                        tasks[task.key] ? 'bg-brand-secondary/5 border-brand-secondary/20' : 'bg-white border-ink/5 hover:border-brand-primary/10'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        tasks[task.key] ? 'bg-brand-primary border-brand-primary text-white' : 'border-ink/20'
                      }`}>
                        {tasks[task.key] && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs">{task.title}</h4>
                        <p className="text-[11px] text-ink/55 mt-0.5">{task.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Agency Team & Toolkit Exporters (SPAN 5) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* AI Agency Team Switcher & Panel */}
          <div className="bg-brand-secondary text-white p-8 rounded-2xl border border-white/5 shadow-2xl space-y-6">
            <div className="border-b border-white/10 pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-display font-black text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-brand-primary" />
                  AI Agency Team
                </h3>
                <p className="text-[11px] text-white/40 mt-0.5">Delegate startup tasks to specialized AI agents.</p>
              </div>
            </div>

            {/* Agent Selectors */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'branding', label: 'Apex', role: 'Brand' },
                { id: 'web', label: 'Nova', role: 'Web' },
                { id: 'planning', label: 'Scribe', role: 'Plan' },
                { id: 'compliance', label: 'Vanguard', role: 'BEE' },
                { id: 'ledger', label: 'Ledger', role: 'Ledger' },
                { id: 'seo', label: 'Seeker', role: 'SEO' }
              ].map(agent => (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgent(agent.id as any)}
                  className={`py-2.5 px-1 rounded-xl border text-center transition-all ${
                    activeAgent === agent.id 
                      ? 'bg-brand-primary border-brand-primary text-white shadow-lg' 
                      : 'border-white/10 text-white/50 hover:border-white hover:text-white'
                  }`}
                >
                  <div className="font-bold text-xs leading-none">{agent.label}</div>
                  <div className="text-[8px] opacity-60 mt-1 uppercase font-bold">{agent.role}</div>
                </button>
              ))}
            </div>

            {/* Interactive Workspace Panel */}
            <div className="p-6 bg-black/30 border border-white/5 rounded-xl text-xs space-y-4">
              
              {/* APEX (BRANDING) WORKSPACE */}
              {activeAgent === 'branding' && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Apex Brand Agent</h4>
                      <p className="text-[11px] text-white/50 mt-1">"I'll generate a custom SVG vector logo based on your initials and chosen colors."</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Company Initials</label>
                      <input 
                        type="text" 
                        maxLength={3}
                        value={logoInitials}
                        onChange={(e) => setLogoInitials(e.target.value.toUpperCase())}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Icon Symbol</label>
                      <select
                        value={logoSymbol}
                        onChange={(e) => setLogoSymbol(e.target.value as any)}
                        className="w-full bg-brand-secondary border border-white/10 rounded px-3 py-2 text-white focus:outline-none"
                      >
                        <option value="store">Storefront</option>
                        <option value="truck">Delivery Truck</option>
                        <option value="mug">Coffee Mug</option>
                        <option value="star">Growth Star</option>
                        <option value="rocket">Rocket Launcher</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Primary Color</label>
                      <input 
                        type="color" 
                        value={logoColorPrimary}
                        onChange={(e) => setLogoColorPrimary(e.target.value)}
                        className="w-full h-8 bg-transparent border-0 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Secondary Color</label>
                      <input 
                        type="color" 
                        value={logoColorSecondary}
                        onChange={(e) => setLogoColorSecondary(e.target.value)}
                        className="w-full h-8 bg-transparent border-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Logo Preview Canvas */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded flex items-center justify-center relative group/logo">
                    <div 
                      dangerouslySetInnerHTML={{ __html: generateSvgLogoContent() }} 
                      className="w-24 h-24"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center rounded">
                      <button 
                        onClick={handleDownloadLogo}
                        className="px-4 py-2 bg-brand-primary text-white text-[9px] font-black uppercase tracking-widest rounded flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> Download SVG
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* NOVA (WEB) WORKSPACE */}
              {activeAgent === 'web' && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Nova Web Copy Agent</h4>
                      <p className="text-[11px] text-white/50 mt-1">"I'll write professional copy and output a responsive landing site with PayFast/Yoco setup."</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Banner Headline</label>
                    <input 
                      type="text" 
                      value={webHeadline}
                      onChange={(e) => { setWebHeadline(e.target.value); setWebSaved(false); }}
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Company Description</label>
                    <textarea 
                      value={webDescription}
                      onChange={(e) => { setWebDescription(e.target.value); setWebSaved(false); }}
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Contact Phone</label>
                      <input 
                        type="text" 
                        value={webContact}
                        onChange={(e) => { setWebContact(e.target.value); setWebSaved(false); }}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Payment Connector</label>
                      <select
                        value={webGateway}
                        onChange={(e) => { setWebGateway(e.target.value as any); setWebSaved(false); }}
                        className="w-full bg-brand-secondary border border-white/10 rounded px-3 py-2 text-white focus:outline-none"
                      >
                        <option value="yoco">Yoco SDK Form</option>
                        <option value="payfast">PayFast Button</option>
                      </select>
                    </div>
                  </div>

                  {/* Interactive Site Preview Frame */}
                  <div className="border border-white/10 rounded overflow-hidden">
                    <div className="bg-white/5 px-4 py-2 text-[8px] font-mono text-white/40 border-b border-white/15 flex justify-between items-center">
                      <span>index.html Preview Workspace</span>
                      <button
                        onClick={handleDownloadWebsite}
                        className="px-3 py-1 bg-brand-primary text-white text-[8px] font-black uppercase tracking-widest rounded flex items-center gap-1"
                      >
                        <Download className="w-2.5 h-2.5" /> Download HTML
                      </button>
                    </div>
                    <iframe 
                      title="Website Mockup Preview"
                      srcDoc={generateWebsiteContent()} 
                      className="w-full h-40 bg-white"
                    />
                  </div>
                </div>
              )}

              {/* SCRIBE (PLANNING) WORKSPACE */}
              {activeAgent === 'planning' && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Scribe Planning Agent</h4>
                      <p className="text-[11px] text-white/50 mt-1">"I will draft your company values and funding target for local development agencies (Seda/SEFA)."</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Business Vision Statement</label>
                    <textarea 
                      value={bizPlan.mission}
                      onChange={(e) => { setBizPlan({ ...bizPlan, mission: e.target.value }); setIsPlanSaved(false); }}
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Target Market Sector</label>
                      <input 
                        type="text" 
                        value={bizPlan.market}
                        onChange={(e) => { setBizPlan({ ...bizPlan, market: e.target.value }); setIsPlanSaved(false); }}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Funding Ask Target</label>
                      <input 
                        type="text" 
                        value={bizPlan.fundingTarget}
                        onChange={(e) => { setBizPlan({ ...bizPlan, fundingTarget: e.target.value }); setIsPlanSaved(false); }}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadPlan}
                    className="w-full py-3 bg-brand-primary hover:bg-white hover:text-brand-secondary text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {isPlanSaved ? 'Download Plan Draft' : 'Generate & Download Plan'}
                  </button>
                </div>
              )}

              {/* VANGUARD (COMPLIANCE) WORKSPACE */}
              {activeAgent === 'compliance' && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Vanguard Compliance Agent</h4>
                      <p className="text-[11px] text-white/50 mt-1">"I'll help you prepare EME affidavits and SARS checklist filings."</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Share Black Ownership Percentage</label>
                    <select
                      value={blackOwnershipPercent}
                      onChange={(e) => setBlackOwnershipPercent(e.target.value)}
                      className="w-full bg-brand-secondary border border-white/10 rounded px-3 py-2 text-white focus:outline-none"
                    >
                      <option value="100%">100% Black Owned (B-BBEE Level 1)</option>
                      <option value="51%">51% Black Owned (B-BBEE Level 2)</option>
                      <option value="0%">0% Black Owned (B-BBEE Level 4)</option>
                    </select>
                  </div>

                  <button
                    onClick={handleDownloadAffidavit}
                    className="w-full py-3 bg-brand-primary hover:bg-white hover:text-brand-secondary text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download B-BBEE Affidavit Draft
                  </button>
                </div>
              )}

              {/* LEDGER (BOOKKEEPER) WORKSPACE */}
              {activeAgent === 'ledger' && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Ledger Bookkeeper Agent</h4>
                      <p className="text-[11px] text-white/50 mt-1">"I'll record your operating expenses and compile a financial ledger to prove ESD compliance."</p>
                    </div>
                  </div>

                  {/* Expense Items List */}
                  <div className="space-y-2 max-h-28 overflow-y-auto pr-1">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 block">Current Operating Ledger</label>
                    {expenses.length === 0 ? (
                      <p className="text-white/40 italic text-[10px]">No transaction logs recorded.</p>
                    ) : (
                      expenses.map(exp => (
                        <div key={exp.id} className="flex justify-between items-center bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-[10px]">
                          <span className="text-white truncate font-medium max-w-[150px]">{exp.desc}</span>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-brand-primary font-bold">R{exp.amount}</span>
                            <button
                              onClick={() => removeExpense(exp.id, exp.desc)}
                              className="text-white/40 hover:text-brand-primary transition-colors cursor-pointer"
                              title="Delete entry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Expense Form */}
                  <form onSubmit={addExpense} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Expense item (e.g. Stock)"
                      value={newExpenseDesc}
                      onChange={(e) => setNewExpenseDesc(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white placeholder-white/30 focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Amt (ZAR)"
                      value={newExpenseAmount}
                      onChange={(e) => setNewExpenseAmount(e.target.value)}
                      className="w-20 bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white placeholder-white/30 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="p-2 bg-brand-primary hover:bg-white hover:text-brand-secondary rounded transition-all text-white font-bold shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  <button
                    onClick={handleDownloadLedger}
                    className="w-full py-3 bg-brand-primary hover:bg-white hover:text-brand-secondary text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {isLedgerSaved ? 'Download Ledger Draft' : 'Compile & Download Ledger'}
                  </button>
                </div>
              )}

              {/* SEEKER (SEO) WORKSPACE */}
              {activeAgent === 'seo' && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Search className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Seeker SEO Agent</h4>
                      <p className="text-[11px] text-white/50 mt-1">"I'll help you generate local SEO meta-tags and structure your site for regional discovery."</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Target Locality</label>
                      <input
                        type="text"
                        value={seoLocality}
                        onChange={(e) => { setSeoLocality(e.target.value); setIsSeoSaved(false); }}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">Focus Keywords</label>
                      <input
                        type="text"
                        value={seoKeywords}
                        onChange={(e) => { setSeoKeywords(e.target.value); setIsSeoSaved(false); }}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Generated Meta Tags Preview */}
                  <div className="bg-black/40 border border-white/5 p-3 rounded font-mono text-[9px] text-white/70 space-y-1 select-all overflow-x-auto">
                    <div className="text-[8px] uppercase tracking-wider text-white/30 font-sans font-bold border-b border-white/5 pb-1 mb-1">Generated SEO HTML Snippet</div>
                    <div>&lt;title&gt;{companyName} | Premium {industry} in {seoLocality}&lt;/title&gt;</div>
                    <div>&lt;meta name="description" content="Looking for the best {industry} in {seoLocality}? Keywords: {seoKeywords}" /&gt;</div>
                  </div>

                  <button
                    onClick={handleDownloadSeoReport}
                    className="w-full py-3 bg-brand-primary hover:bg-white hover:text-brand-secondary text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {isSeoSaved ? 'Download SEO Guidelines' : 'Generate & Download SEO Plan'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Compliance Turnover Settings */}
          <div className="bg-white p-8 rounded-2xl border border-ink/5 shadow-sm space-y-6">
            <h3 className="text-lg font-display font-black text-brand-secondary border-b border-ink/5 pb-4">
              Enterprise Turnover Bracket
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {["<R10m EME", "R10m-R50m QSE", ">R50m Large"].map((bracket) => (
                  <button
                    key={bracket}
                    onClick={() => handleTurnoverChange(bracket)}
                    className={`py-3 px-1 text-[9px] font-black uppercase tracking-wider border rounded-lg transition-all ${
                      turnoverBracket === bracket 
                        ? 'bg-brand-secondary text-white border-brand-secondary shadow' 
                        : 'border-ink/10 text-ink/50 hover:border-brand-primary hover:text-brand-primary'
                    }`}
                  >
                    {bracket.split(" ")[0]} <br />
                    {bracket.split(" ")[1]}
                  </button>
                ))}
              </div>

              {/* Turnover Alert Banner */}
              <AnimatePresence>
                {turnoverBracket !== "<R10m EME" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl bg-red-50 border border-brand-primary/20 text-brand-primary space-y-2"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider leading-none">
                          Compliance Alert: QSE / Large Status
                        </div>
                        <p className="text-[10px] text-ink/75 mt-1.5 leading-relaxed">
                          SMEs above R10 million turnover require a formal verification certificate under South African B-BBEE codes. EME status affidavit is no longer criminally permissible.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Government Buffer Upload Section */}
          <div className="bg-white p-8 rounded-2xl border border-ink/5 shadow-sm space-y-6">
            <h3 className="text-lg font-display font-black text-brand-secondary border-b border-ink/5 pb-4">
              Govt Portal Buffer Upload
            </h3>
            
            <form onSubmit={handleUploadSlip} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="e.g. CIPC-Slip-9831.pdf" 
                  value={tempFile}
                  onChange={(e) => setTempFile(e.target.value)}
                  className="w-full p-4 text-xs bg-bg-dark border border-ink/10 rounded-xl focus:outline-none focus:border-brand-primary"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-brand-secondary hover:bg-brand-primary text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Upload Compliance Intent Slip
              </button>
            </form>

            {govtSlips.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-[9px] font-black uppercase tracking-wider text-brand-secondary">
                  Pending Verification (Buffered)
                </div>
                {govtSlips.map((slip, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-brand-secondary/5 rounded-lg border border-ink/5 text-xs text-brand-secondary">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 shrink-0 text-brand-primary" />
                      <span className="truncate text-xs font-medium">{slip}</span>
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-wider bg-yellow-500/10 text-yellow-600 px-2 py-0.5 rounded shrink-0">
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity Log (SANAS audit ledger trail) */}
          <div className="bg-white p-8 rounded-2xl border border-ink/5 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-ink/5 pb-4">
              <h3 className="text-lg font-display font-black text-brand-secondary">
                SANAS Audit Log Trail
              </h3>
              {offlineQueue.length > 0 && (
                <span className="text-[8px] font-black uppercase tracking-widest text-yellow-600 bg-yellow-500/10 px-2 py-0.5 rounded">
                  Queue (+{offlineQueue.length})
                </span>
              )}
            </div>

            <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
              {activityLog.map((log, i) => (
                <div key={i} className="flex justify-between gap-4 pb-3 border-b border-ink/5 text-[11px]">
                  <div className="flex-1">
                    <p className={`font-medium ${log.offline ? 'text-yellow-600' : 'text-ink/70'}`}>
                      {log.description}
                    </p>
                    {log.offline && (
                      <span className="text-[8px] font-black uppercase tracking-wider text-yellow-600">
                        Queued offline
                      </span>
                    )}
                  </div>
                  <span className="text-ink/30 shrink-0 font-mono text-[10px]">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
