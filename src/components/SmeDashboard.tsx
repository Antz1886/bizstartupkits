import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2, AlertTriangle, Wifi, WifiOff, FileText,
  Sparkles, LogOut, Download, Send, Globe,
  Bot, Award, Check, DollarSign, Search, Trash2, Plus,
  TrendingUp, Users, Star, MapPin, Phone, Mail, Building2,
  BarChart3, PieChart, Target, Briefcase, ChevronRight
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
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'agents'>('overview');
  const [isOnline, setIsOnline] = useState(true);
  const [offlineQueue, setOfflineQueue] = useState<{ action: string; time: string }[]>([]);

  const [companyName, setCompanyName] = useState(profile?.companyName || 'My Small Business');
  const [industry, setIndustry] = useState(profile?.industry || 'Spaza/Retail');
  const [turnoverBracket, setTurnoverBracket] = useState(profile?.turnoverBracket || '<R10m EME');
  const [tasks, setTasks] = useState<Record<string, boolean>>(profile?.tasksCompleted || {
    cipcRegistered: true,
    sarsTaxVerified: true,
    bbbeeAffidavitCreated: false,
    logoDesigned: false,
    websiteLaunched: false,
    whatsappBusinessActive: false,
    invoiceGenerated: false
  });

  const [govtSlips, setGovtSlips] = useState<string[]>([]);
  const [tempFile, setTempFile] = useState('');
  const [activityLog, setActivityLog] = useState<{ description: string; time: string; offline?: boolean }[]>([
    { description: 'Dashboard workspace initialized.', time: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString() }
  ]);

  const [activeAgent, setActiveAgent] = useState<'branding' | 'web' | 'planning' | 'compliance' | 'ledger' | 'seo'>('branding');

  // ─── APEX STATE ────────────────────────────────────────────────────────────
  const [logoInitials, setLogoInitials] = useState(profile?.companyName?.substring(0, 2).toUpperCase() || 'MB');
  const [logoTagline, setLogoTagline] = useState('Quality You Can Trust');
  const [logoColorPrimary, setLogoColorPrimary] = useState('#EF233C');
  const [logoColorSecondary, setLogoColorSecondary] = useState('#0D1B2A');
  const [logoStyle, setLogoStyle] = useState<'badge' | 'wordmark' | 'icon'>('badge');
  const [logoSymbol, setLogoSymbol] = useState<'store' | 'truck' | 'mug' | 'star' | 'rocket' | 'diamond' | 'shield'>('shield');

  // ─── NOVA STATE ─────────────────────────────────────────────────────────────
  const [webHeadline, setWebHeadline] = useState(`Welcome to ${companyName}`);
  const [webSubheadline, setWebSubheadline] = useState('Serving our community with excellence since 2020');
  const [webDescription, setWebDescription] = useState(`We are proud to serve our community in the ${industry} sector with reliable, high-quality offerings.`);
  const [webContact, setWebContact] = useState('079 894 0476');
  const [webEmail, setWebEmail] = useState('info@mybusiness.co.za');
  const [webLocation, setWebLocation] = useState('Soweto, Gauteng');
  const [webGateway, setWebGateway] = useState<'yoco' | 'payfast'>('yoco');
  const [webTheme, setWebTheme] = useState<'blue' | 'green' | 'orange' | 'purple'>('blue');
  const [webService1, setWebService1] = useState('Premium Products');
  const [webService2, setWebService2] = useState('Fast Delivery');
  const [webService3, setWebService3] = useState('Expert Advice');

  // ─── SCRIBE STATE ───────────────────────────────────────────────────────────
  const [bizPlan, setBizPlan] = useState({
    mission: `To empower local communities in the ${industry} sector through affordable, high-quality products and services that drive economic inclusion.`,
    market: 'Township and sub-urban retail services, targeting LSM 4–7 consumers.',
    fundingTarget: 'R150,000 for equipment scaling and working capital',
    businessModel: 'Direct-to-consumer retail with WhatsApp ordering and local delivery.',
    targetRevenue: 'R800,000 in Year 1, scaling to R2.4M by Year 3',
    teamComposition: 'Founder/Director, 2 Sales Staff, 1 Delivery Driver'
  });

  // ─── VANGUARD STATE ─────────────────────────────────────────────────────────
  const [blackOwnershipPercent, setBlackOwnershipPercent] = useState('100%');
  const [uifRegistered, setUifRegistered] = useState(false);
  const [sarsCompliant, setSarsCompliant] = useState(true);
  const [womenOwned, setWomenOwned] = useState(false);
  const [youthOwned, setYouthOwned] = useState(false);

  // ─── LEDGER STATE ───────────────────────────────────────────────────────────
  const [expenses, setExpenses] = useState<{ id: string; desc: string; amount: number; category: string }[]>([
    { id: '1', desc: 'Stock inventory purchase', amount: 4500, category: 'Operations' },
    { id: '2', desc: 'Local delivery fuel cost', amount: 850, category: 'Logistics' },
    { id: '3', desc: 'BizStartup Kit setup fee', amount: 0, category: 'Admin' }
  ]);
  const [income, setIncome] = useState<{ id: string; desc: string; amount: number }[]>([
    { id: '1', desc: 'Product sales — Week 1', amount: 8200 },
    { id: '2', desc: 'WhatsApp orders', amount: 3100 }
  ]);
  const [newExpenseDesc, setNewExpenseDesc] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('Operations');
  const [newIncomeDesc, setNewIncomeDesc] = useState('');
  const [newIncomeAmount, setNewIncomeAmount] = useState('');
  const [ledgerTab, setLedgerTab] = useState<'expense' | 'income'>('expense');
  const [isLedgerSaved, setIsLedgerSaved] = useState(false);

  // ─── SEEKER STATE ────────────────────────────────────────────────────────────
  const [seoKeywords, setSeoKeywords] = useState('local, quality service, retail');
  const [seoLocality, setSeoLocality] = useState('Soweto, Gauteng');
  const [seoGBPChecklist, setSeoGBPChecklist] = useState({
    profileClaimed: false,
    photosAdded: false,
    hoursSet: false,
    categorySet: false,
    reviewsRequested: false
  });
  const [isSeoSaved, setIsSeoSaved] = useState(false);

  const totalIncome = income.reduce((a, b) => a + b.amount, 0);
  const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  const calculateProgress = () => {
    const total = Object.keys(tasks).length;
    const completed = Object.values(tasks).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  const calculatePhaseProgress = (phaseKeys: string[]) => {
    const completed = phaseKeys.filter(k => tasks[k]).length;
    return Math.round((completed / phaseKeys.length) * 100);
  };

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

  const handleToggleTask = (key: string) => {
    const updatedTasks = { ...tasks, [key]: !tasks[key] };
    setTasks(updatedTasks);
    logActivity(!tasks[key] ? `Completed Task: ${key}` : `Reopened Task: ${key}`);
  };

  useEffect(() => {
    if (isOnline && offlineQueue.length > 0) {
      fetch('/api/audit-log/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smeId: 'sme-demo', logs: offlineQueue.map(q => ({ actionDescription: q.action, timestamp: new Date().toISOString() })) })
      })
        .then(() => { logActivity(`Synchronized ${offlineQueue.length} offline records.`); setOfflineQueue([]); })
        .catch(() => logActivity('Reconnection sync failed. Retrying.'));
    }
  }, [isOnline]);

  // ══════════════════════════════════════════════════════════════════════════════
  // APEX — HIGH QUALITY SVG LOGO GENERATOR
  // ══════════════════════════════════════════════════════════════════════════════
  const generateSvgLogoContent = () => {
    const p = logoColorPrimary;
    const s = logoColorSecondary;
    const initials = logoInitials.substring(0, 3);
    const tag = logoTagline;

    const symbolPaths: Record<string, string> = {
      shield: `<path d="M32 4 L60 14 L60 36 C60 52 46 62 32 68 C18 62 4 52 4 36 L4 14 Z" fill="${p}" opacity="0.15" stroke="${p}" stroke-width="2"/><path d="M32 18 L46 24 L46 36 C46 44 39 50 32 53 C25 50 18 44 18 36 L18 24 Z" fill="${p}"/>`,
      store: `<rect x="8" y="32" width="48" height="28" rx="3" fill="${p}" opacity="0.15" stroke="${p}" stroke-width="2"/><path d="M4 32 L12 12 L52 12 L60 32" fill="none" stroke="${p}" stroke-width="2.5" stroke-linejoin="round"/><rect x="24" y="36" width="16" height="24" rx="2" fill="${p}"/>`,
      truck: `<rect x="2" y="22" width="36" height="28" rx="3" fill="${p}" opacity="0.15" stroke="${p}" stroke-width="2"/><path d="M38 30 L52 30 L62 42 L62 50 L38 50 Z" fill="${p}" opacity="0.2" stroke="${p}" stroke-width="2"/><circle cx="16" cy="52" r="6" fill="${p}"/><circle cx="50" cy="52" r="6" fill="${p}"/>`,
      mug: `<rect x="14" y="16" width="36" height="40" rx="4" fill="${p}" opacity="0.15" stroke="${p}" stroke-width="2"/><path d="M50 26 C58 26 62 30 62 36 C62 42 58 46 50 46" fill="none" stroke="${p}" stroke-width="3" stroke-linecap="round"/><line x1="22" y1="10" x2="22" y2="16" stroke="${p}" stroke-width="2" stroke-linecap="round"/><line x1="32" y1="8" x2="32" y2="16" stroke="${p}" stroke-width="2" stroke-linecap="round"/>`,
      star: `<polygon points="32,4 39,24 62,24 44,38 51,58 32,46 13,58 20,38 2,24 25,24" fill="${p}" opacity="0.2" stroke="${p}" stroke-width="2" stroke-linejoin="round"/><polygon points="32,14 37,28 52,28 40,37 44,51 32,43 20,51 24,37 12,28 27,28" fill="${p}"/>`,
      rocket: `<path d="M32 4 C32 4 52 16 52 36 L52 52 L32 60 L12 52 L12 36 C12 16 32 4 32 4Z" fill="${p}" opacity="0.15" stroke="${p}" stroke-width="2"/><ellipse cx="32" cy="34" rx="10" ry="12" fill="${p}"/><path d="M20 52 L12 64 L24 60 Z" fill="${p}" opacity="0.6"/><path d="M44 52 L52 64 L40 60 Z" fill="${p}" opacity="0.6"/>`,
      diamond: `<polygon points="32,4 60,32 32,60 4,32" fill="${p}" opacity="0.15" stroke="${p}" stroke-width="2"/><polygon points="32,14 50,32 32,50 14,32" fill="${p}"/>`
    };

    if (logoStyle === 'badge') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 180" width="400" height="180">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${s};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${s}dd;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${p};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${p}bb;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <!-- Background card -->
  <rect width="400" height="180" rx="16" fill="url(#bgGrad)"/>
  <!-- Accent stripe -->
  <rect x="0" y="0" width="6" height="180" rx="3" fill="url(#accentGrad)"/>
  <!-- Icon area -->
  <g transform="translate(20, 24) scale(0.9)">
    ${symbolPaths[logoSymbol] || symbolPaths.shield}
  </g>
  <!-- Company initials -->
  <text x="108" y="88" font-family="'Arial Black', 'Impact', sans-serif" font-weight="900" font-size="54" fill="white" letter-spacing="-2">${initials}</text>
  <!-- Company name -->
  <text x="108" y="116" font-family="Arial, sans-serif" font-weight="400" font-size="14" fill="white" opacity="0.7" letter-spacing="3">${companyName.toUpperCase()}</text>
  <!-- Tagline -->
  <text x="108" y="140" font-family="Arial, sans-serif" font-weight="300" font-size="11" fill="${p}" letter-spacing="2">${tag}</text>
  <!-- Bottom line -->
  <line x1="108" y1="150" x2="370" y2="150" stroke="${p}" stroke-width="1" opacity="0.4"/>
  <text x="108" y="164" font-family="'Courier New', monospace" font-size="9" fill="white" opacity="0.35" letter-spacing="1">EST. ${new Date().getFullYear()} • SA REGISTERED ENTITY</text>
</svg>`;
    }

    if (logoStyle === 'wordmark') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 140" width="400" height="140">
  <defs>
    <linearGradient id="wGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${s}"/>
      <stop offset="100%" style="stop-color:${s}cc"/>
    </linearGradient>
  </defs>
  <rect width="400" height="140" rx="12" fill="url(#wGrad)"/>
  <!-- Decorative dot grid -->
  <circle cx="360" cy="20" r="3" fill="${p}" opacity="0.3"/>
  <circle cx="375" cy="20" r="3" fill="${p}" opacity="0.2"/>
  <circle cx="360" cy="35" r="3" fill="${p}" opacity="0.2"/>
  <circle cx="375" cy="35" r="3" fill="${p}" opacity="0.1"/>
  <!-- Monogram badge -->
  <rect x="20" y="30" width="60" height="60" rx="12" fill="${p}"/>
  <text x="50" y="74" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="900" font-size="28" fill="white">${initials.substring(0,2)}</text>
  <!-- Full name wordmark -->
  <text x="100" y="70" font-family="'Arial Black', 'Impact', sans-serif" font-weight="900" font-size="36" fill="white" letter-spacing="-1">${companyName.toUpperCase().substring(0, 16)}</text>
  <!-- Divider -->
  <line x1="100" y1="82" x2="370" y2="82" stroke="${p}" stroke-width="1.5"/>
  <!-- Tagline -->
  <text x="100" y="100" font-family="Arial, sans-serif" font-size="12" fill="${p}" letter-spacing="3">${tag.toUpperCase()}</text>
</svg>`;
    }

    // Icon only
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <defs>
    <linearGradient id="iGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${s}"/>
      <stop offset="100%" style="stop-color:${s}bb"/>
    </linearGradient>
  </defs>
  <rect width="160" height="160" rx="32" fill="url(#iGrad)"/>
  <rect x="4" y="4" width="152" height="152" rx="28" fill="none" stroke="${p}" stroke-width="2" opacity="0.3"/>
  <g transform="translate(16, 16) scale(2)">
    ${symbolPaths[logoSymbol] || symbolPaths.shield}
  </g>
  <text x="80" y="148" text-anchor="middle" font-family="'Arial Black', sans-serif" font-weight="900" font-size="14" fill="white" letter-spacing="2">${initials}</text>
</svg>`;
  };

  const handleDownloadLogo = () => {
    const svgContent = generateSvgLogoContent();
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${companyName.toLowerCase().replace(/\s+/g, '_')}_logo.svg`;
    a.click();
    logActivity('Apex Agent: Generated and downloaded premium SVG brand logo.');
    setTasks(prev => ({ ...prev, logoDesigned: true }));
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // NOVA — FULL MULTI-SECTION WEBSITE GENERATOR
  // ══════════════════════════════════════════════════════════════════════════════
  const themeColors: Record<string, { primary: string; dark: string; light: string }> = {
    blue: { primary: '#2563eb', dark: '#1e3a8a', light: '#eff6ff' },
    green: { primary: '#16a34a', dark: '#14532d', light: '#f0fdf4' },
    orange: { primary: '#ea580c', dark: '#7c2d12', light: '#fff7ed' },
    purple: { primary: '#7c3aed', dark: '#3b0764', light: '#faf5ff' }
  };
  const tc = themeColors[webTheme];

  const generateWebsiteContent = () => {
    const paymentSection = webGateway === 'yoco'
      ? `<button id="pay-btn" onclick="var y=new window.YocoSDK({publicKey:'pk_test_yoco_demo_2026'});y.showPopup({amountInCents:25000,currency:'ZAR',name:'${companyName}',description:'Order Payment',callback:function(r){alert(r.error?'Failed: '+r.error.message:'Payment successful! Ref: '+r.id)}})" style="background:${tc.primary};color:white;border:none;padding:16px 36px;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer;letter-spacing:0.5px;">💳 Pay via Yoco</button>
        <script src="https://js.yoco.com/v1/sdk.js"></script>`
      : `<form action="https://sandbox.payfast.co.za/eng/process" method="post" style="display:inline;">
          <input type="hidden" name="merchant_id" value="10000100">
          <input type="hidden" name="merchant_key" value="46f0zse5s0ur2">
          <input type="hidden" name="amount" value="250.00">
          <input type="hidden" name="item_name" value="Product Order">
          <button type="submit" style="background:${tc.primary};color:white;border:none;padding:16px 36px;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer;">🔒 Order via PayFast</button>
        </form>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${companyName} | ${webService1}, ${webService2} — ${webLocation}</title>
  <meta name="description" content="${webDescription} Serving ${webLocation}. Contact: ${webContact}">
  <meta name="keywords" content="${industry}, ${webLocation}, South Africa, SME, local business">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Segoe UI',Arial,sans-serif;color:#1f2937;background:#fff}
    /* NAV */
    nav{background:${tc.dark};padding:0 40px;display:flex;justify-content:space-between;align-items:center;height:68px;position:sticky;top:0;z-index:100;box-shadow:0 2px 20px rgba(0,0,0,0.3)}
    .logo{display:flex;align-items:center;gap:12px;text-decoration:none}
    .logo-badge{width:40px;height:40px;background:${tc.primary};border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900;color:white;font-size:16px}
    .logo-name{color:white;font-weight:800;font-size:18px;letter-spacing:-0.3px}
    .nav-links{display:flex;gap:28px;align-items:center}
    .nav-links a{color:rgba(255,255,255,0.75);text-decoration:none;font-size:14px;font-weight:500;transition:color 0.2s}
    .nav-links a:hover{color:white}
    .nav-cta{background:${tc.primary};color:white;padding:10px 22px;border-radius:8px;font-weight:700;font-size:13px;text-decoration:none;transition:opacity 0.2s}
    .nav-cta:hover{opacity:0.85}
    /* HERO */
    .hero{background:linear-gradient(135deg,${tc.dark} 0%,${tc.primary} 100%);padding:100px 40px;text-align:center;position:relative;overflow:hidden}
    .hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")}
    .hero-badge{display:inline-block;background:rgba(255,255,255,0.15);color:white;border:1px solid rgba(255,255,255,0.3);padding:6px 16px;border-radius:20px;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:24px}
    .hero h1{font-size:clamp(32px,6vw,60px);font-weight:900;color:white;line-height:1.1;margin-bottom:20px;letter-spacing:-1px}
    .hero p{font-size:18px;color:rgba(255,255,255,0.8);max-width:560px;margin:0 auto 40px;line-height:1.7}
    .hero-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
    .btn-hero-primary{background:white;color:${tc.primary};padding:16px 36px;border-radius:8px;font-weight:800;font-size:15px;text-decoration:none;display:inline-block;transition:transform 0.2s}
    .btn-hero-primary:hover{transform:translateY(-2px)}
    .btn-hero-outline{border:2px solid rgba(255,255,255,0.5);color:white;padding:16px 36px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none;display:inline-block;transition:all 0.2s}
    .btn-hero-outline:hover{border-color:white;background:rgba(255,255,255,0.1)}
    /* TRUST BADGES */
    .trust{background:${tc.dark};padding:20px 40px;display:flex;justify-content:center;gap:48px;flex-wrap:wrap}
    .trust-item{color:rgba(255,255,255,0.7);font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px}
    .trust-icon{color:${tc.primary};font-size:16px}
    /* STATS */
    .stats{background:${tc.light};padding:60px 40px;text-align:center}
    .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:32px;max-width:900px;margin:0 auto}
    .stat-item h3{font-size:40px;font-weight:900;color:${tc.primary};margin-bottom:4px}
    .stat-item p{color:#6b7280;font-size:14px;font-weight:500}
    /* SERVICES */
    .services{padding:80px 40px;text-align:center}
    .section-label{font-size:12px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${tc.primary};margin-bottom:12px}
    .section-title{font-size:clamp(24px,4vw,40px);font-weight:900;color:#111827;margin-bottom:16px;letter-spacing:-0.5px}
    .section-sub{color:#6b7280;font-size:16px;max-width:520px;margin:0 auto 48px;line-height:1.7}
    .services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:28px;max-width:900px;margin:0 auto}
    .service-card{background:white;border:1px solid #e5e7eb;border-radius:16px;padding:36px 28px;text-align:left;transition:all 0.25s;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
    .service-card:hover{border-color:${tc.primary};box-shadow:0 8px 30px rgba(0,0,0,0.1);transform:translateY(-4px)}
    .service-icon{width:52px;height:52px;background:${tc.light};border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:20px}
    .service-card h3{font-size:18px;font-weight:800;color:#111827;margin-bottom:10px}
    .service-card p{color:#6b7280;font-size:14px;line-height:1.7}
    /* TESTIMONIALS */
    .testimonials{background:${tc.light};padding:80px 40px;text-align:center}
    .testi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;max-width:800px;margin:0 auto}
    .testi-card{background:white;border-radius:16px;padding:28px;text-align:left;box-shadow:0 4px 16px rgba(0,0,0,0.06)}
    .stars{color:#f59e0b;font-size:16px;margin-bottom:12px}
    .testi-card p{color:#374151;font-size:14px;line-height:1.7;margin-bottom:16px;font-style:italic}
    .testi-name{font-weight:700;font-size:14px;color:#111827}
    .testi-loc{font-size:12px;color:#9ca3af}
    /* PAYMENT */
    .payment-section{padding:80px 40px;text-align:center;background:#fff}
    .payment-box{max-width:500px;margin:0 auto;background:${tc.light};border:1px solid ${tc.primary}30;border-radius:20px;padding:48px}
    .payment-box h3{font-size:24px;font-weight:800;color:#111827;margin-bottom:8px}
    .payment-box p{color:#6b7280;margin-bottom:28px;font-size:15px}
    /* CONTACT */
    .contact{background:${tc.dark};padding:80px 40px;text-align:center}
    .contact h2{color:white;font-size:32px;font-weight:900;margin-bottom:12px}
    .contact p{color:rgba(255,255,255,0.7);margin-bottom:40px;font-size:16px}
    .contact-items{display:flex;justify-content:center;gap:48px;flex-wrap:wrap}
    .contact-item{color:rgba(255,255,255,0.85);font-size:15px;font-weight:500;display:flex;align-items:center;gap:8px}
    .contact-item a{color:white;text-decoration:none}
    /* FOOTER */
    footer{background:#111827;padding:24px 40px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
    footer p{color:#6b7280;font-size:13px}
    .footer-links{display:flex;gap:20px}
    .footer-links a{color:#6b7280;text-decoration:none;font-size:13px;transition:color 0.2s}
    .footer-links a:hover{color:white}
  </style>
</head>
<body>
  <nav>
    <a href="#" class="logo">
      <div class="logo-badge">${logoInitials.substring(0,2)}</div>
      <span class="logo-name">${companyName}</span>
    </a>
    <div class="nav-links">
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <a href="#pay" class="nav-cta">Order Now</a>
    </div>
  </nav>

  <section class="hero">
    <div class="hero-badge">🇿🇦 Proudly South African</div>
    <h1>${webHeadline}</h1>
    <p>${webSubheadline}</p>
    <div class="hero-btns">
      <a href="#pay" class="btn-hero-primary">Get Started Today</a>
      <a href="#services" class="btn-hero-outline">Our Services ↓</a>
    </div>
  </section>

  <div class="trust">
    <span class="trust-item"><span class="trust-icon">✓</span> CIPC Registered</span>
    <span class="trust-item"><span class="trust-icon">✓</span> B-BBEE Compliant</span>
    <span class="trust-item"><span class="trust-icon">✓</span> SARS Verified</span>
    <span class="trust-item"><span class="trust-icon">✓</span> Secure Payments</span>
  </div>

  <section class="stats">
    <div class="stats-grid">
      <div class="stat-item"><h3>500+</h3><p>Happy Customers</p></div>
      <div class="stat-item"><h3>98%</h3><p>Satisfaction Rate</p></div>
      <div class="stat-item"><h3>5★</h3><p>Google Rating</p></div>
      <div class="stat-item"><h3>24h</h3><p>Delivery Time</p></div>
    </div>
  </section>

  <section class="services" id="services">
    <div class="section-label">What We Offer</div>
    <h2 class="section-title">Our Core Services</h2>
    <p class="section-sub">${webDescription}</p>
    <div class="services-grid">
      <div class="service-card">
        <div class="service-icon">🛍️</div>
        <h3>${webService1}</h3>
        <p>We source and supply only the highest quality products for our valued customers in ${webLocation}.</p>
      </div>
      <div class="service-card">
        <div class="service-icon">🚀</div>
        <h3>${webService2}</h3>
        <p>Same-day and next-day delivery options available across our local service area.</p>
      </div>
      <div class="service-card">
        <div class="service-icon">💡</div>
        <h3>${webService3}</h3>
        <p>Our experienced team is always available to guide you to the best solution for your needs.</p>
      </div>
    </div>
  </section>

  <section class="testimonials" id="about">
    <div class="section-label">Customer Reviews</div>
    <h2 class="section-title">What Our Clients Say</h2>
    <p class="section-sub">Trusted by hundreds of customers across ${webLocation}.</p>
    <div class="testi-grid">
      <div class="testi-card">
        <div class="stars">★★★★★</div>
        <p>"Absolutely incredible service. Fast delivery, great products, and the team always goes the extra mile. Highly recommend to anyone in the area!"</p>
        <div class="testi-name">Thabo M.</div>
        <div class="testi-loc">${webLocation}</div>
      </div>
      <div class="testi-card">
        <div class="stars">★★★★★</div>
        <p>"I've been a loyal customer for over a year. The quality is always consistent and the prices are fair. This is my go-to business for everything."</p>
        <div class="testi-name">Nokwanda D.</div>
        <div class="testi-loc">${webLocation}</div>
      </div>
    </div>
  </section>

  <section class="payment-section" id="pay">
    <div class="section-label">Secure Checkout</div>
    <h2 class="section-title">Ready to Order?</h2>
    <div class="payment-box">
      <h3>Place Your Order</h3>
      <p>Fast, secure payment processing. All major cards accepted.</p>
      ${paymentSection}
    </div>
  </section>

  <section class="contact" id="contact">
    <h2>Get In Touch</h2>
    <p>We're always happy to hear from you</p>
    <div class="contact-items">
      <span class="contact-item">📞 <a href="tel:${webContact}">${webContact}</a></span>
      <span class="contact-item">✉️ <a href="mailto:${webEmail}">${webEmail}</a></span>
      <span class="contact-item">📍 ${webLocation}</span>
    </div>
  </section>

  <footer>
    <p>© ${new Date().getFullYear()} ${companyName}. All rights reserved. B-BBEE Compliant.</p>
    <div class="footer-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Use</a>
      <a href="#">POPIA Notice</a>
    </div>
  </footer>
</body>
</html>`;
  };

  const handleDownloadWebsite = () => {
    const blob = new Blob([generateWebsiteContent()], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'index.html'; a.click();
    logActivity('Nova Agent: Generated full multi-section website and downloaded.');
    setTasks(prev => ({ ...prev, websiteLaunched: true }));
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // SCRIBE — PROFESSIONAL HTML BUSINESS PLAN
  // ══════════════════════════════════════════════════════════════════════════════
  const generateProfessionalPlan = () => {
    const date = new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${companyName} — Business Plan ${new Date().getFullYear()}</title>
<style>
  @page{margin:25mm 20mm}
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Georgia',serif;color:#1a1a1a;background:#fff;font-size:13pt;line-height:1.7}
  .cover{background:linear-gradient(135deg,#0D1B2A,#1a3a5c);min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:60px;page-break-after:always}
  .cover-badge{width:100px;height:100px;background:#EF233C;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:900;color:white;margin:0 auto 32px;font-family:Arial,sans-serif;letter-spacing:-2px}
  .cover h1{color:white;font-size:40pt;font-weight:900;letter-spacing:-1px;margin-bottom:12px;font-family:Arial,sans-serif}
  .cover .subtitle{color:rgba(255,255,255,0.65);font-size:14pt;margin-bottom:48px;font-style:italic}
  .cover-meta{border-top:1px solid rgba(255,255,255,0.2);padding-top:32px;color:rgba(255,255,255,0.7);font-size:11pt;line-height:2}
  .cover-meta strong{color:white}
  .section{max-width:800px;margin:0 auto;padding:60px 40px;border-bottom:1px solid #e5e7eb}
  .section:last-child{border-bottom:none}
  .section-number{font-size:10pt;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#EF233C;margin-bottom:8px;font-family:Arial,sans-serif}
  .section h2{font-size:24pt;font-weight:900;color:#0D1B2A;margin-bottom:20px;font-family:Arial,sans-serif;letter-spacing:-0.5px}
  .section p{color:#374151;margin-bottom:16px;font-size:12pt}
  .highlight-box{background:#fff7f7;border-left:4px solid #EF233C;padding:20px 24px;border-radius:0 8px 8px 0;margin:24px 0}
  .highlight-box p{margin:0;color:#1a1a1a;font-style:italic}
  table{width:100%;border-collapse:collapse;margin:24px 0;font-size:11pt;font-family:Arial,sans-serif}
  th{background:#0D1B2A;color:white;padding:12px 16px;text-align:left;font-weight:700;font-size:10pt;text-transform:uppercase;letter-spacing:0.5px}
  td{padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#374151}
  tr:nth-child(even) td{background:#f9fafb}
  td strong{color:#0D1B2A;font-weight:700}
  .badge-row{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}
  .badge{background:#eff6ff;color:#1d4ed8;padding:6px 14px;border-radius:20px;font-size:10pt;font-weight:600;font-family:Arial,sans-serif}
  .badge.green{background:#f0fdf4;color:#15803d}
  .badge.orange{background:#fff7ed;color:#c2410c}
  .kpi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:24px 0}
  .kpi{background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:20px;text-align:center}
  .kpi .val{font-size:22pt;font-weight:900;color:#EF233C;font-family:Arial,sans-serif;display:block}
  .kpi .label{font-size:10pt;color:#6b7280;font-family:Arial,sans-serif;margin-top:4px}
  .signature-block{margin-top:40px;padding-top:20px;border-top:1px solid #e5e7eb;display:grid;grid-template-columns:1fr 1fr;gap:40px}
  .sig-line{border-bottom:1px solid #374151;padding-bottom:4px;margin-bottom:8px;height:40px}
  .sig-label{font-size:10pt;color:#6b7280;font-family:Arial,sans-serif}
  @media print{.cover{min-height:100vh}.section{page-break-inside:avoid}}
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover">
  <div class="cover-badge">${logoInitials.substring(0,2)}</div>
  <h1>${companyName}</h1>
  <div class="subtitle">Confidential Business Plan — ${new Date().getFullYear()}</div>
  <div class="cover-meta">
    <div><strong>Industry:</strong> ${industry}</div>
    <div><strong>Turnover Classification:</strong> ${turnoverBracket}</div>
    <div><strong>B-BBEE Status:</strong> ${blackOwnershipPercent} Black Owned</div>
    <div><strong>Date Prepared:</strong> ${date}</div>
    <div><strong>Prepared by:</strong> Scribe Planning Agent (BizStartupKits AgentMesh™)</div>
  </div>
</div>

<!-- EXECUTIVE SUMMARY -->
<div class="section">
  <div class="section-number">Section 01</div>
  <h2>Executive Summary</h2>
  <div class="highlight-box"><p>${bizPlan.mission}</p></div>
  <p>${companyName} is a ${industry} enterprise operating in South Africa, classified under the ${turnoverBracket} bracket. The business is positioned to leverage the growing demand for quality, community-based services within the township economy.</p>
  <p>This business plan outlines our strategic direction for the next three years, covering market positioning, revenue model, operational structure, compliance framework, and funding requirements. The plan has been prepared to meet the standards of SEDA, SEFA, and major bank SME lending desks.</p>
  <div class="kpi-grid">
    <div class="kpi"><span class="val">Year 1</span><span class="label">Revenue Target</span></div>
    <div class="kpi"><span class="val">${bizPlan.fundingTarget.replace(/[^R0-9,]/g, '').substring(0, 8) || 'R150K'}</span><span class="label">Funding Required</span></div>
    <div class="kpi"><span class="val">${blackOwnershipPercent}</span><span class="label">Black Ownership</span></div>
  </div>
</div>

<!-- PROBLEM & OPPORTUNITY -->
<div class="section">
  <div class="section-number">Section 02</div>
  <h2>Problem &amp; Market Opportunity</h2>
  <p>South Africa's township economy represents a multi-billion Rand opportunity that remains significantly underserved by formal businesses. Consumers in communities like ${bizPlan.market} face limited access to quality products, professional service delivery, and transparent pricing.</p>
  <p>${companyName} addresses this gap by operating as a trusted, compliant, and technologically enabled local business. Our entry into the ${industry} sector is supported by direct community relationships and digital-first order fulfillment.</p>
  <div class="badge-row">
    <span class="badge green">✓ Underserved Market Identified</span>
    <span class="badge green">✓ Strong Community Relationships</span>
    <span class="badge">📱 WhatsApp Commerce Ready</span>
    <span class="badge">🇿🇦 Township Economy Focus</span>
  </div>
</div>

<!-- BUSINESS MODEL -->
<div class="section">
  <div class="section-number">Section 03</div>
  <h2>Business Model &amp; Revenue Streams</h2>
  <p><strong>Core Model:</strong> ${bizPlan.businessModel}</p>
  <table>
    <thead><tr><th>Revenue Stream</th><th>Channel</th><th>Est. Contribution</th></tr></thead>
    <tbody>
      <tr><td><strong>Direct Product Sales</strong></td><td>In-store / WhatsApp</td><td>65%</td></tr>
      <tr><td><strong>Delivery &amp; Service Fees</strong></td><td>Last-mile logistics</td><td>20%</td></tr>
      <tr><td><strong>B2B / Wholesale Orders</strong></td><td>Local businesses</td><td>10%</td></tr>
      <tr><td><strong>Digital &amp; Consulting</strong></td><td>Online platforms</td><td>5%</td></tr>
    </tbody>
  </table>
</div>

<!-- MARKET ANALYSIS -->
<div class="section">
  <div class="section-number">Section 04</div>
  <h2>Market Analysis</h2>
  <p><strong>Target Market:</strong> ${bizPlan.market}</p>
  <p>The South African SME landscape is defined by the National Small Enterprise Act and supported by institutions including the Small Enterprise Development Agency (SEDA), Small Enterprise Finance Agency (SEFA), and the National Empowerment Fund (NEF).</p>
  <table>
    <thead><tr><th>Market Segment</th><th>LSM Band</th><th>Opportunity Rating</th></tr></thead>
    <tbody>
      <tr><td><strong>Township Retail Consumers</strong></td><td>LSM 4–6</td><td>⭐⭐⭐⭐⭐</td></tr>
      <tr><td><strong>Sub-urban Households</strong></td><td>LSM 6–8</td><td>⭐⭐⭐⭐</td></tr>
      <tr><td><strong>Local Micro Businesses</strong></td><td>LSM 5–7</td><td>⭐⭐⭐⭐</td></tr>
    </tbody>
  </table>
</div>

<!-- FINANCIAL PROJECTIONS -->
<div class="section">
  <div class="section-number">Section 05</div>
  <h2>Financial Projections (3-Year)</h2>
  <p>Target Revenue: <strong>${bizPlan.targetRevenue}</strong></p>
  <table>
    <thead><tr><th>Metric</th><th>Year 1</th><th>Year 2</th><th>Year 3</th></tr></thead>
    <tbody>
      <tr><td><strong>Gross Revenue</strong></td><td>R800,000</td><td>R1,400,000</td><td>R2,400,000</td></tr>
      <tr><td><strong>Operating Costs</strong></td><td>R480,000</td><td>R756,000</td><td>R1,200,000</td></tr>
      <tr><td><strong>Gross Profit</strong></td><td>R320,000</td><td>R644,000</td><td>R1,200,000</td></tr>
      <tr><td><strong>Gross Margin</strong></td><td>40%</td><td>46%</td><td>50%</td></tr>
      <tr><td><strong>Staff Headcount</strong></td><td>${bizPlan.teamComposition.split(',').length}</td><td>5</td><td>8</td></tr>
    </tbody>
  </table>
</div>

<!-- FUNDING REQUIREMENT -->
<div class="section">
  <div class="section-number">Section 06</div>
  <h2>Funding Requirement</h2>
  <p>${bizPlan.fundingTarget}. The capital will be deployed as follows:</p>
  <table>
    <thead><tr><th>Use of Funds</th><th>Allocation</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td><strong>Equipment &amp; Technology</strong></td><td>40%</td><td>R60,000</td></tr>
      <tr><td><strong>Working Capital / Stock</strong></td><td>35%</td><td>R52,500</td></tr>
      <tr><td><strong>Marketing &amp; Brand</strong></td><td>15%</td><td>R22,500</td></tr>
      <tr><td><strong>Compliance &amp; Legal</strong></td><td>10%</td><td>R15,000</td></tr>
    </tbody>
  </table>
</div>

<!-- COMPLIANCE -->
<div class="section">
  <div class="section-number">Section 07</div>
  <h2>Compliance &amp; B-BBEE Status</h2>
  <div class="badge-row">
    <span class="badge green">✓ CIPC Registered</span>
    <span class="badge green">✓ SARS Tax Compliant</span>
    <span class="badge green">✓ B-BBEE ${blackOwnershipPercent} Black Owned</span>
    <span class="badge orange">⚠ POPIA Notice Required</span>
  </div>
  <p>The entity qualifies as a <strong>Level ${blackOwnershipPercent === '100%' ? '1' : blackOwnershipPercent === '51%' ? '2' : '4'} B-BBEE Contributor</strong> under the Amended Codes of Good Practice (2014, updated 2023). As an EME with turnover below R10 million, a sworn commissioner affidavit is sufficient for certification.</p>
</div>

<!-- MANAGEMENT TEAM -->
<div class="section">
  <div class="section-number">Section 08</div>
  <h2>Management Team</h2>
  <p>${bizPlan.teamComposition}</p>
  <div class="signature-block">
    <div>
      <div class="sig-line"></div>
      <div class="sig-label">Authorised Signatory — Director</div>
    </div>
    <div>
      <div class="sig-line"></div>
      <div class="sig-label">Date</div>
    </div>
  </div>
  <p style="margin-top:32px;font-size:10pt;color:#9ca3af;font-style:italic;">
    This business plan was drafted by the Scribe Planning Agent (BizStartupKits AgentMesh™). 
    It should be reviewed by a qualified accountant or business advisor before submission to any financial institution.
    Document Reference: BSK-${Date.now().toString().slice(-6)} | ${date}
  </p>
</div>

</body>
</html>`;
  };

  const handleDownloadPlan = () => {
    const blob = new Blob([generateProfessionalPlan()], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${companyName.toLowerCase().replace(/\s+/g, '_')}_business_plan.html`; a.click();
    logActivity('Scribe Agent: Generated professional HTML business plan document.');
  };

  const handleDownloadAffidavit = () => {
    const date = new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
    const level = blackOwnershipPercent === '100%' ? '1' : blackOwnershipPercent === '51%' ? '2' : '4';
    const text = `==========================================================
B-BBEE EXEMPTED MICRO ENTERPRISE (EME) AFFIDAVIT
==========================================================
In terms of the Amended B-BBEE Codes of Good Practice — Republic of South Africa

ENTITY DETAILS:
Entity Name: ${companyName}
Industry Sector: ${industry}
Registration Status: CIPC Registered

DECLARATION:
I, the undersigned, hereby solemnly declare:

1. I am an authorized representative of ${companyName}.
2. The annual turnover of the entity does NOT exceed R10,000,000 (Ten Million Rand).
3. The percentage of black ownership of the entity is: ${blackOwnershipPercent}
4. Women Owned: ${womenOwned ? 'Yes' : 'No'} | Youth Owned: ${youthOwned ? 'Yes' : 'No'}
5. UIF Registered: ${uifRegistered ? 'Yes — Compliant' : 'No — Registration Pending'}
6. SARS Compliance: ${sarsCompliant ? 'Active — Tax Clearance Valid' : 'Pending Review'}

B-BBEE LEVEL DETERMINATION:
Based on the above declarations, this entity qualifies as a
LEVEL ${level} B-BBEE CONTRIBUTOR under the Amended Codes of Good Practice.

POPIA COMPLIANCE NOTE:
This affidavit is processed in accordance with the Protection of Personal
Information Act (POPIA) No. 4 of 2013. Data is retained for a minimum of 5 years.

DECLARATION:
I declare that the information set out in this affidavit is to the best of my
knowledge true and correct. I understand that a false declaration constitutes
perjury and is punishable under South African law.

Signed: ___________________________
Full Name: ________________________
Capacity: Managing Director / Authorized Representative
Date: ${date}
Location: ___________________________

COMMISSIONER OF OATHS:
Signature: ________________________
Name: ____________________________
Office Stamp: _____________________ Date: ___________

==========================================================
Document Reference: BSK-AFF-${Date.now().toString().slice(-8)}
Generated by: Vanguard Compliance Agent (BizStartupKits AgentMesh™)
==========================================================`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${companyName.toLowerCase().replace(/\s+/g, '_')}_bbbee_affidavit.txt`; a.click();
    logActivity('Vanguard Agent: Generated comprehensive B-BBEE EME Affidavit.');
    setTasks(prev => ({ ...prev, bbbeeAffidavitCreated: true }));
  };

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseDesc.trim() || !newExpenseAmount.trim()) return;
    const amt = parseFloat(newExpenseAmount);
    if (isNaN(amt)) return;
    setExpenses(prev => [...prev, { id: Date.now().toString(), desc: newExpenseDesc, amount: amt, category: newExpenseCategory }]);
    setNewExpenseDesc(''); setNewExpenseAmount('');
    logActivity(`Ledger: Recorded expense — ${newExpenseDesc} (R${amt})`);
  };

  const addIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncomeDesc.trim() || !newIncomeAmount.trim()) return;
    const amt = parseFloat(newIncomeAmount);
    if (isNaN(amt)) return;
    setIncome(prev => [...prev, { id: Date.now().toString(), desc: newIncomeDesc, amount: amt }]);
    setNewIncomeDesc(''); setNewIncomeAmount('');
    logActivity(`Ledger: Recorded income — ${newIncomeDesc} (R${amt})`);
  };

  const handleDownloadLedger = () => {
    const date = new Date().toLocaleDateString('en-ZA');
    const ledgerText = `=========================================
FINANCIAL TRANSACTION LEDGER: ${companyName.toUpperCase()}
=========================================
Industry: ${industry} | Report Date: ${date}

INCOME RECORDS:
${income.map(i => `  + ${i.desc}: R${i.amount.toLocaleString()}`).join('\n')}

Total Income: R${totalIncome.toLocaleString()}

EXPENSE RECORDS:
${expenses.map(e => `  - [${e.category}] ${e.desc}: R${e.amount.toLocaleString()}`).join('\n')}

Total Expenses: R${totalExpenses.toLocaleString()}

─────────────────────────────────────────
NET PROFIT / (LOSS): R${netProfit.toLocaleString()}
ESD COMPLIANCE STATUS: Active
B-BBEE LEDGER: Level ${blackOwnershipPercent === '100%' ? '1' : '4'} Contributor

Certified by: Ledger Bookkeeper Agent (BizStartupKits AgentMesh™)
Reference: BSK-LED-${Date.now().toString().slice(-8)}
=========================================`;
    const blob = new Blob([ledgerText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${companyName.toLowerCase().replace(/\s+/g, '_')}_ledger.txt`; a.click();
    logActivity('Ledger Agent: Compiled and exported full P&L ledger.');
    setTasks(prev => ({ ...prev, invoiceGenerated: true }));
    setIsLedgerSaved(true);
  };

  const handleDownloadSeoReport = () => {
    const gbpItems = Object.entries(seoGBPChecklist).map(([k, v]) => `  [${v ? '✓' : ' '}] ${k.replace(/([A-Z])/g, ' $1').trim()}`).join('\n');
    const seoText = `=========================================
LOCAL SEO & DIGITAL VISIBILITY REPORT: ${companyName.toUpperCase()}
=========================================
Locality: ${seoLocality} | Keywords: ${seoKeywords}

GENERATED META TAGS (Copy into your website <head>):
─────────────────────────────────────────
<title>${companyName} | Premium ${industry} in ${seoLocality}</title>
<meta name="description" content="Looking for the best ${industry} in ${seoLocality}? ${companyName} offers quality products and fast delivery. Call ${webContact}. Keywords: ${seoKeywords}">
<meta name="keywords" content="${seoKeywords}, ${industry}, ${seoLocality}, South Africa, SME, local">
<meta name="geo.region" content="ZA">
<meta name="geo.placename" content="${seoLocality}">

OPEN GRAPH (Social Sharing):
─────────────────────────────────────────
<meta property="og:title" content="${companyName} — ${industry} in ${seoLocality}">
<meta property="og:description" content="${webDescription}">
<meta property="og:type" content="business.business">

GOOGLE BUSINESS PROFILE CHECKLIST:
─────────────────────────────────────────
${gbpItems}

RECOMMENDED ACTIONS:
─────────────────────────────────────────
1. Claim Google Business Profile at: business.google.com
2. Set primary category to match "${industry}"
3. Add your physical address in ${seoLocality}
4. Upload 10+ photos of your products/premises
5. Respond to all Google reviews within 48 hours
6. Add WhatsApp chat link: https://wa.me/27${webContact.replace(/\D/g, '').slice(-9)}
7. Post weekly updates via Google Business Posts
8. Ensure NAP (Name, Address, Phone) consistency across all platforms

STRUCTURED DATA (Schema.org — Add to your website):
─────────────────────────────────────────
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "${companyName}",
  "telephone": "${webContact}",
  "address": { "@type": "PostalAddress", "addressLocality": "${seoLocality}", "addressCountry": "ZA" },
  "priceRange": "R-RR",
  "openingHours": "Mo-Fr 08:00-17:00"
}
</script>

Generated by: Seeker SEO Agent (BizStartupKits AgentMesh™)
Reference: BSK-SEO-${Date.now().toString().slice(-8)}
=========================================`;
    const blob = new Blob([seoText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${companyName.toLowerCase().replace(/\s+/g, '_')}_seo_report.txt`; a.click();
    logActivity('Seeker Agent: Generated full local SEO report with GBP checklist and structured data.');
    setIsSeoSaved(true);
  };

  const handleUploadSlip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempFile.trim()) return;
    setGovtSlips(prev => [...prev, tempFile]);
    logActivity(`Uploaded Government Verification Proof: ${tempFile}`);
    setTempFile('');
  };

  // ──────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 pb-20">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 py-4 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-sm">
            <span className="font-black text-white text-sm">{logoInitials.substring(0, 2)}</span>
          </div>
          <div>
            <h2 className="text-base font-black text-gray-900 leading-none">{companyName}</h2>
            <p className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-widest font-semibold">
              SA SME Workspace · {industry}
            </p>
          </div>
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-brand-primary rounded-full transition-all" style={{ width: `${calculateProgress()}%` }} />
          </div>
          <span className="text-xs font-bold text-brand-primary">{calculateProgress()}% Complete</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wide transition-all ${
              isOnline ? 'bg-green-50 text-green-600 border-green-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'
            }`}
          >
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isOnline ? 'Live' : 'Offline'}
          </button>
          <button onClick={onLogout} className="p-2 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-brand-primary hover:text-brand-primary transition-all" title="Log Out">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Turnover alert */}
      <AnimatePresence>
        {turnoverBracket !== '<R10m EME' && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="bg-red-50 border-b border-brand-primary/20 px-6 md:px-10 py-3 flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-brand-primary shrink-0" />
            <p className="text-xs text-brand-primary font-semibold">
              <strong>Compliance Alert:</strong> Entities above R10M turnover require a formal SANAS-accredited B-BBEE verification certificate. EME affidavit no longer applies.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SECTION TAB NAV ──────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-0">
          {[
            { id: 'overview', label: 'Overview', icon: '📋', desc: 'Tasks, compliance & audit log' },
            { id: 'agents',   label: 'AgentMesh™ AI Workforce', icon: '🤖', desc: '6 autonomous agents' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setDashboardTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-6 py-4 border-b-2 text-sm font-bold transition-all ${
                dashboardTab === tab.id
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <div className="text-left">
                <div className="leading-none">{tab.label}</div>
                <div className="text-[9px] font-normal opacity-60 mt-0.5 tracking-wide">{tab.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── OVERVIEW TAB ─────────────────────────────────────────────────── */}
      {dashboardTab === 'overview' && (
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-6 pb-20">

          {/* Phase progress cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Legal Setup', keys: ['cipcRegistered', 'sarsTaxVerified', 'bbbeeAffidavitCreated'], color: 'text-blue-600', bar: 'bg-blue-500' },
              { label: 'Digital Brand', keys: ['logoDesigned', 'websiteLaunched'], color: 'text-purple-600', bar: 'bg-purple-500' },
              { label: 'Launch & Trade', keys: ['whatsappBusinessActive', 'invoiceGenerated'], color: 'text-green-600', bar: 'bg-green-500' }
            ].map(ph => {
              const pct = calculatePhaseProgress(ph.keys);
              return (
                <div key={ph.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <div className={`text-[9px] font-black uppercase tracking-widest ${ph.color} mb-2`}>{ph.label}</div>
                  <div className={`text-2xl font-black ${ph.color}`}>{pct}%</div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div className={`h-full ${ph.bar} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* SA Regulatory Tasks */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="font-black text-gray-900 text-base">SA Regulatory Tasks</h3>
              <p className="text-xs text-gray-400 mt-0.5">Click any task to toggle completion and log activity</p>
            </div>
            <div className="p-6 space-y-6">
              {[
                { phase: 'Phase 1 · Legal Foundation', color: 'text-blue-500', items: [
                  { key: 'cipcRegistered', title: 'CIPC Company Registration', desc: 'Secure your SA registered entity (COR14.3 form).' },
                  { key: 'sarsTaxVerified', title: 'SARS Tax Registration & Compliance', desc: 'Verify tax reference number and obtain compliance status PIN.' },
                  { key: 'bbbeeAffidavitCreated', title: 'B-BBEE EME Affidavit', desc: 'Generate a commissioner-signed EME certificate.' }
                ]},
                { phase: 'Phase 2 · Digital Identity', color: 'text-purple-500', items: [
                  { key: 'logoDesigned', title: 'Brand Logo Creation', desc: 'Generate premium brand mark using Apex Agent.' },
                  { key: 'websiteLaunched', title: 'Website Launch & Hosting', desc: 'Build multi-section landing site using Nova Agent.' }
                ]},
                { phase: 'Phase 3 · Launch & Trade', color: 'text-green-500', items: [
                  { key: 'whatsappBusinessActive', title: 'WhatsApp Business Catalog', desc: 'Activate local customer engagement and product catalog.' },
                  { key: 'invoiceGenerated', title: 'Financial Ledger Active', desc: 'Deploy invoicing, income & expense tracking.' }
                ]}
              ].map(section => (
                <div key={section.phase}>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${section.color} mb-3`}>{section.phase}</div>
                  <div className="space-y-2">
                    {section.items.map(task => (
                      <div key={task.key} onClick={() => handleToggleTask(task.key)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          tasks[task.key] ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 hover:border-gray-300'
                        }`}>
                        <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                          tasks[task.key] ? 'bg-green-500 border-green-500' : 'border-gray-300'
                        }`}>
                          {tasks[task.key] && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold text-xs ${ tasks[task.key] ? 'text-green-700 line-through' : 'text-gray-800'}`}>{task.title}</h4>
                          <p className="text-[11px] text-gray-400 mt-0.5">{task.desc}</p>
                        </div>
                        {tasks[task.key] && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Turnover + Govt Upload + Audit in a responsive grid */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Turnover Bracket */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-black text-gray-900 text-base border-b border-gray-100 pb-3">Enterprise Turnover Bracket</h3>
              <div className="grid grid-cols-3 gap-3">
                {['<R10m EME', 'R10m-R50m QSE', '>R50m Large'].map((b) => (
                  <button key={b} onClick={() => { setTurnoverBracket(b); logActivity(`Updated Turnover Bracket to ${b}`); }}
                    className={`py-3 px-2 text-[10px] font-black uppercase tracking-wide border rounded-xl transition-all ${
                      turnoverBracket === b ? 'bg-brand-secondary text-white border-brand-secondary shadow-md' : 'border-gray-200 text-gray-500 hover:border-brand-primary hover:text-brand-primary'
                    }`}>
                    {b.split(' ')[0]}<br />{b.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Govt Upload */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-black text-gray-900 text-base border-b border-gray-100 pb-3">Govt Portal Buffer Upload</h3>
              <form onSubmit={handleUploadSlip} className="flex gap-3">
                <input type="text" placeholder="e.g. CIPC-Slip-9831.pdf" value={tempFile} onChange={e => setTempFile(e.target.value)}
                  className="flex-1 p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary bg-gray-50" />
                <button type="submit" className="px-5 py-3 bg-brand-secondary text-white text-xs font-black uppercase tracking-wide rounded-xl hover:bg-brand-primary transition-all flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" /> Upload
                </button>
              </form>
              {govtSlips.length > 0 && (
                <div className="space-y-2">
                  {govtSlips.map((slip, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-brand-primary" />
                        <span className="font-medium text-gray-700 truncate">{slip}</span>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-wide bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Pending</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Audit Log */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-black text-gray-900 text-base">SANAS Audit Log Trail</h3>
              {offlineQueue.length > 0 && <span className="text-[9px] font-black uppercase tracking-wide text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">+{offlineQueue.length} Queued</span>}
            </div>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {activityLog.map((log, i) => (
                <div key={i} className="flex justify-between gap-4 pb-2 border-b border-gray-50 text-[11px]">
                  <p className={`flex-1 font-medium ${log.offline ? 'text-yellow-600' : 'text-gray-600'}`}>{log.description}</p>
                  <span className="text-gray-300 shrink-0 font-mono text-[10px]">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

      </div>
      )}

      {/* ── AGENTMESH™ TAB ──────────────────────────────────────────────────── */}
      {dashboardTab === 'agents' && (
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 pb-20">

        {/* Hero banner */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 leading-none">AgentMesh™ AI Workforce</h2>
                <p className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-widest">6 Specialized Autonomous Agents</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
              Each agent handles a distinct business function end-to-end — from brand identity to legal compliance. Select an agent below to open its full workspace.
            </p>
          </div>
          <div className="flex gap-6 shrink-0">
            <div className="text-center">
              <div className="text-2xl font-black text-brand-primary">83%+</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Resolution Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-gray-900">6</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Active Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-green-500">Live</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Node Status</div>
            </div>
          </div>
        </div>

        {/* Agent selector cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {[
            { id: 'branding',   emoji: '🎨', label: 'Apex',    role: 'Brand Identity',    color: 'from-rose-500 to-pink-600' },
            { id: 'web',        emoji: '🌐', label: 'Nova',    role: 'Website Generator', color: 'from-blue-500 to-indigo-600' },
            { id: 'planning',   emoji: '📋', label: 'Scribe',  role: 'Business Planning', color: 'from-amber-500 to-orange-600' },
            { id: 'compliance', emoji: '🛡️', label: 'Vanguard',role: 'B-BBEE Compliance', color: 'from-emerald-500 to-green-600' },
            { id: 'ledger',     emoji: '💰', label: 'Ledger',  role: 'P&L Bookkeeping',   color: 'from-violet-500 to-purple-600' },
            { id: 'seo',        emoji: '🔍', label: 'Seeker',  role: 'Local SEO',         color: 'from-cyan-500 to-teal-600' }
          ].map(agent => (
            <button key={agent.id} onClick={() => setActiveAgent(agent.id as any)}
              className={`relative rounded-2xl p-4 text-left transition-all group border-2 ${
                activeAgent === agent.id
                  ? 'border-brand-primary bg-white shadow-lg shadow-brand-primary/10'
                  : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-md'
              }`}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-xl mb-3`}>
                {agent.emoji}
              </div>
              <div className="font-black text-gray-900 text-sm leading-none">{agent.label}</div>
              <div className="text-[10px] text-gray-400 mt-1 font-medium">{agent.role}</div>
              {activeAgent === agent.id && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Full-width workspace */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">

          {/* Workspace header */}
          <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="text-2xl">
                {activeAgent === 'branding' ? '🎨' : activeAgent === 'web' ? '🌐' : activeAgent === 'planning' ? '📋' : activeAgent === 'compliance' ? '🛡️' : activeAgent === 'ledger' ? '💰' : '🔍'}
              </div>
              <div>
                <h3 className="font-black text-gray-900 text-lg leading-none">
                  {activeAgent === 'branding' ? 'Apex — Brand Identity Agent' : activeAgent === 'web' ? 'Nova — Website Generator Agent' : activeAgent === 'planning' ? 'Scribe — Business Planning Agent' : activeAgent === 'compliance' ? 'Vanguard — Compliance Agent' : activeAgent === 'ledger' ? 'Ledger — Bookkeeper Agent' : 'Seeker — Local SEO Agent'}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {activeAgent === 'branding' ? 'Generating premium multi-style SVG brand marks with gradients and typography.' : activeAgent === 'web' ? 'Building a full multi-section professional website with payment integration.' : activeAgent === 'planning' ? 'Drafting an 8-section professional HTML business plan for SEDA, SEFA & banks.' : activeAgent === 'compliance' ? 'Auto-generating B-BBEE EME affidavits with POPIA clauses and SARS declarations.' : activeAgent === 'ledger' ? 'Full P&L tracking: income, expenses, real-time net profit, and ESD-compliant export.' : 'Meta tags, Open Graph, Schema.org structured data and Google Business Profile setup.'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Node Active</span>
            </div>
          </div>

          {/* Workspace body — two columns for wider layout */}
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">

              {/* ── APEX ── */}
              {activeAgent === 'branding' && (<>
                <div className="space-y-5">
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-2">Logo Style</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['badge', 'wordmark', 'icon'] as const).map(s => (
                        <button key={s} onClick={() => setLogoStyle(s)}
                          className={`py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wide transition-all ${
                            logoStyle === s ? 'bg-brand-primary border-brand-primary text-white' : 'border-gray-200 text-gray-500 hover:border-brand-primary hover:text-brand-primary'
                          }`}>
                          {s === 'badge' ? '🏷 Badge' : s === 'wordmark' ? '🔤 Wordmark' : '🔷 Icon Only'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Initials (max 3)</label>
                      <input type="text" maxLength={3} value={logoInitials} onChange={e => setLogoInitials(e.target.value.toUpperCase())}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Icon Symbol</label>
                      <select value={logoSymbol} onChange={e => setLogoSymbol(e.target.value as any)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-xs focus:outline-none">
                        <option value="shield">Shield</option><option value="store">Storefront</option>
                        <option value="truck">Delivery Truck</option><option value="star">Growth Star</option>
                        <option value="rocket">Rocket</option><option value="diamond">Diamond</option><option value="mug">Coffee Mug</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Brand Tagline</label>
                    <input type="text" value={logoTagline} onChange={e => setLogoTagline(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Primary Color</label>
                      <input type="color" value={logoColorPrimary} onChange={e => setLogoColorPrimary(e.target.value)} className="w-full h-10 bg-transparent border-0 cursor-pointer rounded" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Dark / Background Color</label>
                      <input type="color" value={logoColorSecondary} onChange={e => setLogoColorSecondary(e.target.value)} className="w-full h-10 bg-transparent border-0 cursor-pointer rounded" />
                    </div>
                  </div>
                  <button onClick={handleDownloadLogo}
                    className="w-full py-3.5 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-brand-secondary transition-all flex items-center justify-center gap-2 shadow-lg">
                    <Download className="w-4 h-4" /> Download Brand Logo SVG
                  </button>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 block">Live Preview</label>
                  <div className="bg-white rounded-2xl p-6 flex items-center justify-center min-h-[200px] relative group/logo">
                    <div dangerouslySetInnerHTML={{ __html: generateSvgLogoContent() }} className="max-w-full" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                      <button onClick={handleDownloadLogo} className="px-5 py-2.5 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-lg flex items-center gap-2">
                        <Download className="w-3.5 h-3.5" /> Download SVG
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-[10px] text-white/50 space-y-1">
                    <div className="font-black text-white/30 uppercase tracking-wider text-[9px] mb-2">Output Spec</div>
                    <div>Format: <strong className="text-white">SVG (Scalable Vector)</strong></div>
                    <div>Style: <strong className="text-white capitalize">{logoStyle}</strong></div>
                    <div>Canvas: <strong className="text-white">{logoStyle === 'icon' ? '160×160px' : logoStyle === 'badge' ? '400×180px' : '400×140px'}</strong></div>
                    <div>Colors: <strong className="text-white">{logoColorPrimary} · {logoColorSecondary}</strong></div>
                  </div>
                </div>
              </>)}

              {/* ── NOVA ── */}
              {activeAgent === 'web' && (<>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Site Colour Theme</label>
                      <select value={webTheme} onChange={e => setWebTheme(e.target.value as any)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm">
                        <option value="blue">Corporate Blue</option><option value="green">Growth Green</option>
                        <option value="orange">Energy Orange</option><option value="purple">Premium Purple</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Payment Gateway</label>
                      <select value={webGateway} onChange={e => setWebGateway(e.target.value as any)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm">
                        <option value="yoco">Yoco SDK</option><option value="payfast">PayFast</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Hero Headline</label>
                    <input type="text" value={webHeadline} onChange={e => setWebHeadline(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20" />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Sub-Headline</label>
                    <input type="text" value={webSubheadline} onChange={e => setWebSubheadline(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[{ label: 'Service 1', val: webService1, set: setWebService1 }, { label: 'Service 2', val: webService2, set: setWebService2 }, { label: 'Service 3', val: webService3, set: setWebService3 }].map(s => (
                      <div key={s.label}>
                        <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">{s.label}</label>
                        <input type="text" value={s.val} onChange={e => s.set(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-gray-900 text-xs focus:outline-none focus:border-brand-primary" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Contact Phone</label>
                      <input type="text" value={webContact} onChange={e => setWebContact(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Location</label>
                      <input type="text" value={webLocation} onChange={e => setWebLocation(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none" />
                    </div>
                  </div>
                  <button onClick={handleDownloadWebsite} className="w-full py-3.5 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-brand-secondary transition-all flex items-center justify-center gap-2 shadow-lg">
                    <Download className="w-4 h-4" /> Download Full Website HTML
                  </button>
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 block">Live Preview</label>
                  <div className="border border-white/10 rounded-2xl overflow-hidden">
                    <div className="bg-white/5 px-4 py-2.5 text-[9px] font-mono text-white/40 border-b border-white/10 flex justify-between items-center">
                      <span>🌐 {companyName} — Live Preview</span>
                      <span className="text-brand-primary font-bold">Multi-section website</span>
                    </div>
                    <iframe title="Website Preview" srcDoc={generateWebsiteContent()} className="w-full bg-white" style={{ height: '420px' }} />
                  </div>
                </div>
              </>)}

              {/* ── SCRIBE ── */}
              {activeAgent === 'planning' && (<>
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Mission / Vision Statement</label>
                    <textarea value={bizPlan.mission} onChange={e => setBizPlan({ ...bizPlan, mission: e.target.value })} rows={3}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Target Market</label>
                      <input type="text" value={bizPlan.market} onChange={e => setBizPlan({ ...bizPlan, market: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Funding Ask</label>
                      <input type="text" value={bizPlan.fundingTarget} onChange={e => setBizPlan({ ...bizPlan, fundingTarget: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Business Model</label>
                    <input type="text" value={bizPlan.businessModel} onChange={e => setBizPlan({ ...bizPlan, businessModel: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Revenue Target (3yr)</label>
                      <input type="text" value={bizPlan.targetRevenue} onChange={e => setBizPlan({ ...bizPlan, targetRevenue: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Team Composition</label>
                      <input type="text" value={bizPlan.teamComposition} onChange={e => setBizPlan({ ...bizPlan, teamComposition: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none" />
                    </div>
                  </div>
                  <button onClick={handleDownloadPlan} className="w-full py-3.5 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-brand-secondary transition-all flex items-center justify-center gap-2 shadow-lg">
                    <Download className="w-4 h-4" /> Generate & Download Business Plan (HTML)
                  </button>
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 block">Plan Structure</label>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-3">
                    {[
                      { n: '01', title: 'Executive Summary', icon: '📌' },
                      { n: '02', title: 'Problem & Market Opportunity', icon: '🎯' },
                      { n: '03', title: 'Business Model & Revenue Streams', icon: '💡' },
                      { n: '04', title: 'Market Analysis (SA Township)', icon: '🗺️' },
                      { n: '05', title: 'Financial Projections — 3 Year Table', icon: '📊' },
                      { n: '06', title: 'Funding Requirement & Use of Funds', icon: '💳' },
                      { n: '07', title: 'B-BBEE Compliance Status', icon: '🛡️' },
                      { n: '08', title: 'Management Team & Signatures', icon: '✍️' }
                    ].map(s => (
                      <div key={s.n} className="flex items-center gap-3 text-sm">
                        <span className="text-brand-primary font-mono font-bold text-xs w-6">{s.n}</span>
                        <span className="text-lg">{s.icon}</span>
                        <span className="text-gray-600">{s.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>)}

              {/* ── VANGUARD ── */}
              {activeAgent === 'compliance' && (<>
                <div className="space-y-5">
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-2">Black Ownership Percentage</label>
                    <select value={blackOwnershipPercent} onChange={e => setBlackOwnershipPercent(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-900 text-sm focus:outline-none focus:border-brand-primary">
                      <option value="100%">100% Black Owned → Level 1 B-BBEE</option>
                      <option value="51%">51%+ Black Owned → Level 2 B-BBEE</option>
                      <option value="0%">0% Black Owned → Level 4 B-BBEE</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 block">Compliance Declarations</label>
                    {[
                      { label: 'SARS Tax Compliant', sub: 'Active tax clearance pin', val: sarsCompliant, set: setSarsCompliant },
                      { label: 'UIF Registered', sub: 'Unemployment Insurance Fund', val: uifRegistered, set: setUifRegistered },
                      { label: 'Women-Owned Entity', sub: '50%+ female ownership', val: womenOwned, set: setWomenOwned },
                      { label: 'Youth-Owned (under 35)', sub: '50%+ youth ownership', val: youthOwned, set: setYouthOwned }
                    ].map(item => (
                      <div key={item.label} onClick={() => item.set(!item.val)}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          item.val ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:border-brand-primary/30'
                        }`}>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{item.label}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{item.sub}</div>
                        </div>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${item.val ? 'bg-green-500 border-green-500' : 'border-white/30'}`}>
                          {item.val && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleDownloadAffidavit} className="w-full py-3.5 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-brand-secondary transition-all flex items-center justify-center gap-2 shadow-lg">
                    <Download className="w-4 h-4" /> Download B-BBEE EME Affidavit
                  </button>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 block">Affidavit Summary</label>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-4 text-sm">
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <span className="text-white/50">Entity</span>
                      <span className="text-gray-900 font-bold">{companyName}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <span className="text-white/50">B-BBEE Level</span>
                      <span className="text-brand-primary font-black">Level {blackOwnershipPercent === '100%' ? '1' : blackOwnershipPercent === '51%' ? '2' : '4'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <span className="text-white/50">Classification</span>
                      <span className="text-gray-900 font-bold">EME ({turnoverBracket})</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <span className="text-white/50">SARS Status</span>
                      <span className={sarsCompliant ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>{sarsCompliant ? 'Compliant' : 'Pending'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Includes</span>
                      <span className="text-gray-600 text-xs text-right">POPIA clause · Commissioner block · Ref #</span>
                    </div>
                  </div>
                </div>
              </>)}

              {/* ── LEDGER ── */}
              {activeAgent === 'ledger' && (<>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                      <div className="text-green-400 font-black text-lg">R{totalIncome.toLocaleString()}</div>
                      <div className="text-[9px] text-white/40 uppercase tracking-wide mt-1">Total Income</div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                      <div className="text-red-400 font-black text-lg">R{totalExpenses.toLocaleString()}</div>
                      <div className="text-[9px] text-white/40 uppercase tracking-wide mt-1">Total Expenses</div>
                    </div>
                    <div className={`${netProfit >= 0 ? 'bg-brand-primary/10 border-brand-primary/20' : 'bg-red-500/10 border-red-500/20'} border rounded-xl p-4 text-center`}>
                      <div className={`${netProfit >= 0 ? 'text-brand-primary' : 'text-red-400'} font-black text-lg`}>R{netProfit.toLocaleString()}</div>
                      <div className="text-[9px] text-white/40 uppercase tracking-wide mt-1">Net Profit</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(['expense', 'income'] as const).map(t => (
                      <button key={t} onClick={() => setLedgerTab(t)} className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${ ledgerTab === t ? 'bg-brand-primary text-white' : 'bg-white/5 text-white/50 hover:bg-white/10' }`}>
                        {t === 'expense' ? '📉 Expenses' : '📈 Income'}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {ledgerTab === 'expense'
                      ? expenses.map(exp => (
                          <div key={exp.id} className="flex justify-between items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm">
                            <div><span className="text-gray-800 font-medium">{exp.desc}</span><span className="text-white/30 ml-2 text-xs">[{exp.category}]</span></div>
                            <div className="flex items-center gap-3"><span className="font-mono text-red-400 font-bold">-R{exp.amount}</span>
                              <button onClick={() => { setExpenses(prev => prev.filter(e => e.id !== exp.id)); }} className="text-white/30 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                        ))
                      : income.map(inc => (
                          <div key={inc.id} className="flex justify-between items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm">
                            <span className="text-gray-800 font-medium">{inc.desc}</span>
                            <div className="flex items-center gap-3"><span className="font-mono text-green-400 font-bold">+R{inc.amount}</span>
                              <button onClick={() => { setIncome(prev => prev.filter(i => i.id !== inc.id)); }} className="text-white/30 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                        ))
                    }
                  </div>
                  {ledgerTab === 'expense' ? (
                    <form onSubmit={addExpense} className="space-y-2">
                      <div className="flex gap-2">
                        <input type="text" placeholder="Expense description" value={newExpenseDesc} onChange={e => setNewExpenseDesc(e.target.value)} className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-brand-primary" />
                        <input type="number" placeholder="ZAR" value={newExpenseAmount} onChange={e => setNewExpenseAmount(e.target.value)} className="w-24 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-brand-primary" />
                      </div>
                      <div className="flex gap-2">
                        <select value={newExpenseCategory} onChange={e => setNewExpenseCategory(e.target.value)} className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 text-sm">
                          {['Operations','Logistics','Marketing','Admin','Salaries','Equipment'].map(c => <option key={c}>{c}</option>)}
                        </select>
                        <button type="submit" className="px-5 py-2.5 bg-brand-primary text-white rounded-lg font-bold"><Plus className="w-4 h-4" /></button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={addIncome} className="flex gap-2">
                      <input type="text" placeholder="Income description" value={newIncomeDesc} onChange={e => setNewIncomeDesc(e.target.value)} className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-brand-primary" />
                      <input type="number" placeholder="ZAR" value={newIncomeAmount} onChange={e => setNewIncomeAmount(e.target.value)} className="w-24 bg-gray-50 border border-gray-200 rounded-lg px-2 py-2.5 text-gray-900 placeholder-gray-400 text-sm focus:outline-none" />
                      <button type="submit" className="px-5 py-2.5 bg-green-500 text-white rounded-lg font-bold"><Plus className="w-4 h-4" /></button>
                    </form>
                  )}
                  <button onClick={handleDownloadLedger} className="w-full py-3.5 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-brand-secondary transition-all flex items-center justify-center gap-2 shadow-lg">
                    <Download className="w-4 h-4" /> Export Full P&L Ledger
                  </button>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 block">Financial Summary</label>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-3">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Profit & Loss Statement</div>
                    {expenses.map(e => (<div key={e.id} className="flex justify-between text-xs border-b border-gray-100 pb-2"><span className="text-white/60">{e.desc}</span><span className="text-red-400 font-mono">-R{e.amount}</span></div>))}
                    <div className="flex justify-between text-xs border-b border-gray-100 pb-2 pt-2">
                      <span className="text-white/60 font-bold">Total Expenses</span><span className="text-red-400 font-mono font-bold">-R{totalExpenses.toLocaleString()}</span>
                    </div>
                    {income.map(i => (<div key={i.id} className="flex justify-between text-xs border-b border-gray-100 pb-2"><span className="text-white/60">{i.desc}</span><span className="text-green-400 font-mono">+R{i.amount}</span></div>))}
                    <div className="flex justify-between text-sm pt-2">
                      <span className="text-gray-900 font-black">Net Profit / (Loss)</span>
                      <span className={`font-black font-mono ${netProfit >= 0 ? 'text-brand-primary' : 'text-red-400'}`}>R{netProfit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </>)}

              {/* ── SEEKER ── */}
              {activeAgent === 'seo' && (<>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Target Locality</label>
                      <input type="text" value={seoLocality} onChange={e => { setSeoLocality(e.target.value); setIsSeoSaved(false); }} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Focus Keywords</label>
                      <input type="text" value={seoKeywords} onChange={e => { setSeoKeywords(e.target.value); setIsSeoSaved(false); }} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-2">Google Business Profile Checklist</label>
                    <div className="space-y-2">
                      {Object.entries(seoGBPChecklist).map(([key, val]) => (
                        <div key={key} onClick={() => setSeoGBPChecklist(prev => ({ ...prev, [key]: !prev[key as keyof typeof seoGBPChecklist] }))}
                          className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer border transition-all ${val ? 'bg-green-500/10 border-green-500/20' : 'bg-gray-50 border-gray-200 hover:border-brand-primary/30'}`}>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${val ? 'bg-green-500 border-green-500' : 'border-white/30'}`}>
                            {val && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <span className="text-sm text-gray-600">{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={handleDownloadSeoReport} className="w-full py-3.5 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-brand-secondary transition-all flex items-center justify-center gap-2 shadow-lg">
                    <Download className="w-4 h-4" /> {isSeoSaved ? 'Download SEO Report' : 'Generate Full SEO Report'}
                  </button>
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 block">Generated Meta Tags Preview</label>
                  <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 font-mono text-xs text-gray-300 space-y-2">
                    <div className="text-[9px] uppercase tracking-wider text-white/30 font-sans font-bold border-b border-white/10 pb-2 mb-2">HTML Head — Copy & Paste</div>
                    <div className="text-green-400">&lt;title&gt;</div>
                    <div className="pl-4 text-white/80">{companyName} | Premium {industry} in {seoLocality}</div>
                    <div className="text-green-400">&lt;/title&gt;</div>
                    <div className="mt-2">&lt;meta name=<span className="text-brand-primary">"description"</span></div>
                    <div className="pl-4">content=<span className="text-white/50">"Best {industry} in {seoLocality}. {seoKeywords}."</span> /&gt;</div>
                    <div className="mt-2">&lt;meta name=<span className="text-brand-primary">"keywords"</span></div>
                    <div className="pl-4">content=<span className="text-white/50">"{seoKeywords}, {industry}, {seoLocality}"</span> /&gt;</div>
                    <div className="mt-2 text-amber-400">&lt;script type=<span className="text-white/50">"application/ld+json"</span>&gt;</div>
                    <div className="pl-4 text-white/40">LocalBusiness schema ...</div>
                    <div className="text-amber-400">&lt;/script&gt;</div>
                  </div>
                </div>
              </>)}

            </div>
          </div>
        </div>
      </div>
      )}

    </div>
  );
};

