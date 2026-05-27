import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Bot, BarChart3, Zap, ArrowRight, CheckCircle2,
  Layers, Database, Globe,
  TrendingUp, ShieldCheck, Cloud,
  Activity, Cpu, LineChart, Network,
  BrainCircuit, Sparkles, Workflow, Mail, Users, Landmark, FileText, Award
} from 'lucide-react';
import { DashboardMock } from './DashboardMock';
import { cn } from '../lib/utils';
import { OnboardingTour } from './OnboardingTour';

// --- Helpers ---
const playUISound = (frequency: number) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.2, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
    
    setTimeout(() => {
      if (ctx.state !== 'closed') ctx.close();
    }, 200);
  } catch (e) {}
};

const MetaLabel = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary leading-none", className)}>
    {children}
  </div>
);

// --- AI Visualizer (Mocked SME Systems Control) ---
const AIVisualizer = () => (
  <div className="relative w-full aspect-video glass overflow-hidden rounded-sm border-ink/10">
    <div className="absolute inset-0 bg-dot opacity-50" />
    <motion.div 
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 5, repeat: Infinity }}
      className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-primary/5" 
    />
    
    <div className="absolute inset-0 p-8 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-primary">SME Ledger Engine 0.01</div>
          <div className="text-[10px] font-bold text-brand-secondary/40">COMPLIANCE_RUNNER_v26.system</div>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-ink/20">Operational</div>
        </div>
      </div>

      <div className="flex justify-center items-center py-20 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border border-ink/5 rounded-full animate-spin-slow" />
          <div className="w-96 h-96 border border-ink/5 rounded-full animate-reverse-spin" />
        </div>
        
        <div className="grid grid-cols-3 gap-12 relative z-10">
          {[
            { icon: Landmark, freq: 440 },
            { icon: ShieldCheck, freq: 660 },
            { icon: Award, freq: 880 }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.9, rotate: i % 2 === 0 ? 5 : -5 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17,
                delay: i * 0.2 
              }}
              onClick={() => playUISound(item.freq)}
              className="w-16 h-16 rounded-sm bg-white border border-ink/5 flex items-center justify-center shadow-xl group hover:border-brand-primary cursor-pointer transition-colors"
            >
              <item.icon className="w-8 h-8 text-brand-secondary group-hover:text-brand-primary transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="space-y-2">
            <div className="h-1 bg-ink/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ["15%", "85%", "45%", "95%"] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                className="h-full bg-brand-primary/40"
              />
            </div>
            <div className="text-[8px] font-black uppercase tracking-widest text-ink/20">CIPC_Sync_0{i}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Sub-Components ---
const HeroSection = () => (
  <section id="hero-start" className="relative pt-32 md:pt-48 pb-20 md:pb-32 bg-grid min-h-[95vh] flex items-center overflow-hidden border-b border-ink/5">
    <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full -z-10 opacity-20 lg:opacity-30">
      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2570&auto=format&fit=crop" alt="South African SME Growth" className="w-full h-full object-cover mask-gradient-to-l" />
    </div>
    
    <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <MetaLabel className="mb-6 md:mb-10 text-brand-primary font-bold">Empowering South African SMEs</MetaLabel>
        <h1 className="text-5xl md:text-7xl lg:text-9xl leading-[0.88] mb-8 md:mb-12 tracking-tighter">
          Pivoting <br /> Local Small <br /> <span className="text-gradient">Businesses.</span>
        </h1>
        <p className="text-lg md:text-xl text-ink/60 mb-8 md:mb-12 max-w-xl leading-relaxed font-medium border-l-2 border-brand-primary/20 pl-6 md:pl-8">
          The ultimate growth and B-BBEE compliance engine for SA entrepreneurs. We provide guides, logo makers, invoicing, and local payment connectors, funded by corporate sponsorships.
        </p>
        <div className="flex flex-wrap gap-6">
          <Link 
            to="/portal"
            className="btn-primary group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">Enter Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
          </Link>
          <Link 
            to="/sponsor"
            className="btn-outline hover:border-brand-primary text-brand-secondary hover:text-brand-primary transition-all text-center block"
          >
            Corporate Sponsorships
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 1 }}
        className="relative"
      >
        <div className="relative p-2 bg-gradient-to-br from-ink/10 to-transparent rounded-lg">
          <AIVisualizer />
        </div>
        
        <div className="absolute -top-12 -right-12 hidden xl:block animate-bounce-slow">
          <div className="glass p-8 rounded-sm space-y-4 border-ink/10">
            <MetaLabel className="text-ink/30">B-BBEE Code Verification</MetaLabel>
            <div className="text-3xl font-black text-brand-secondary font-mono tracking-widest">Level 1</div>
            <div className="flex gap-1.5">
              {[1,2,3,4,5,6,7].map(i => (
                <div key={i} className="w-1.5 h-6 bg-brand-primary/30 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const HumanCapitalSection = () => (
  <section className="py-24 md:py-48 bg-white border-b border-ink/5 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-24 h-24 border-t-2 border-l-2 border-brand-primary/20 z-10" />
          <div className="rounded-2xl overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] relative">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop" 
              alt="Strategic Integration Team" 
              className="w-full h-full object-cover aspect-[4/5] scale-105 hover:scale-100 transition-transform duration-1000 contrast-[1.05] brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/40 to-transparent" />
          </div>
          <div className="absolute -bottom-10 -right-10 glass p-8 rounded-sm shadow-2xl border border-white/20 max-w-xs">
            <p className="text-sm font-medium italic text-ink/80 mb-4">
              "We close the gap between corporate development funds and real township business growth, making scorecard audits seamless."
            </p>
            <div className="flex items-center gap-4">
               <div className="w-1 h-8 bg-brand-primary" />
               <div className="text-[10px] font-black uppercase tracking-widest text-brand-secondary">Transformation & ESD Lead</div>
            </div>
          </div>
        </motion.div>

        <div>
          <MetaLabel className="mb-6 md:mb-10">Bridging the Gap</MetaLabel>
          <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-8 md:mb-12">
            Verifiable <br /> <span className="text-gradient">Development.</span>
          </h2>
          <p className="text-lg md:text-xl text-ink/60 mb-8 md:mb-12 leading-relaxed font-medium">
            Corporates spend millions on Enterprise & Supplier Development (ESD). We ensure that budget is backed by real activity logs, helping local SMEs register, brand, and secure local payments.
          </p>
          <div className="space-y-12">
            {[
              { 
                title: "Airtight Verification Ledgers", 
                desc: "Every interaction is logged with timestamps, giving SANAS verification agencies bulletproof audit reports.",
                icon: ShieldCheck
              },
              { 
                title: "Township & Rural Reach", 
                desc: "Optimized offline sync queues allow entrepreneurs with limited data or power to progress without drops.",
                icon: Users
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="w-14 h-14 bg-bg-dark rounded-sm flex items-center justify-center shrink-0 border border-ink/5 group-hover:border-brand-primary transition-colors">
                  <item.icon className="w-6 h-6 text-brand-secondary group-hover:text-brand-primary transition-colors" />
                </div>
                <div>
                  <h4 className="text-lg font-black uppercase tracking-tight mb-2">{item.title}</h4>
                  <p className="text-sm text-ink/40 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section className="py-24 md:py-48 bg-white relative overflow-hidden border-y border-ink/5">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
        <div>
          <MetaLabel className="mb-8 md:mb-12">SA SME Compliance Barriers</MetaLabel>
          <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 md:mb-12">
            Unlocking <br /> <span className="text-gradient">Red Tape.</span>
          </h2>
          <p className="text-lg md:text-xl text-ink/50 mb-8 md:mb-12 leading-relaxed font-medium">
            The regulatory environment halts micro-SME growth. Registration backlogs, tax clearance, and B-BBEE compliance should not limit potential.
          </p>
          <div className="space-y-6">
            {[
              { label: "CIPC & SARS Hurdles", desc: "Complex digital portals delay basic tax and registry filings" },
              { label: "Loadshedding Grid Downtime", desc: "Power interruptions disrupt digital presence and connectivity" },
              { label: "Fronting Risk Exposure", desc: "Unchecked EME/QSE threshold limits present criminal liability" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className="text-[10px] font-black text-brand-primary mt-1.5">0{i+1}</div>
                <div>
                  <div className="text-sm font-black uppercase tracking-widest mb-1">{item.label}</div>
                  <div className="text-sm text-ink/40">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-px bg-ink/5 border border-ink/5">
          {[
            { label: "B-BBEE Audits Cleared", val: "100%", trend: "SANAS Approved" },
            { label: "Registration Buffer", val: "72 Hrs", trend: "Slip Backup" },
            { label: "Mobile Optimization", val: "Lite-Data", trend: "Offline Sync" },
            { label: "Sponsorship conversion", val: "Level 1", trend: "Maximize Scorecard" }
          ].map((stat, i) => (
            <div key={i} className="p-16 bg-white hover:bg-bg-dark transition-colors">
              <div className="text-4xl font-black text-brand-secondary mb-4">{stat.val}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary mb-2 whitespace-nowrap">{stat.label}</div>
              <div className="text-[9px] font-bold text-ink/20 uppercase tracking-widest">{stat.trend}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const SolutionsSection = () => {
  const solutions = [
    {
      title: "SME Compliance Kits",
      desc: "Guides and verification file buffers for CIPC, SARS eFiling, and Commissioner of Oaths affidavits.",
      icon: Landmark,
      features: ["CIPC Tracking Backup", "Tax PIN verification", "B-BBEE Affidavit drafts"]
    },
    {
      title: "Digital Presence Kits",
      desc: "Dynamic branding systems, `.co.za` registration guidelines, and Yoco/PayFast checkout block snippets.",
      icon: Globe,
      features: ["Branded Logo mocks", "Local Gateways code", "Google maps indexing"]
    },
    {
      title: "ESD Audit Scorecards",
      desc: "Detailed activity tracking dashboards showing proof of operational development to B-BBEE auditors.",
      icon: ShieldCheck,
      features: ["Audit pack CSV exports", "Activity timestamps log", "Mentorship consultations"]
    }
  ];

  return (
    <section id="solutions" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="max-w-xl">
            <div className="text-brand-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-8">Development Domains</div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-brand-secondary leading-tight">Growth Hub <br /> <span className="text-gradient">Blueprints.</span></h2>
          </div>
          <p className="text-lg md:text-xl text-ink/40 max-w-sm leading-relaxed font-medium">
            We provide the infrastructure and resources to convert local startups into compliant corporate vendors.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-0 border border-ink/5 divide-y md:divide-y-0 md:divide-x divide-ink/5">
          {solutions.map((s, i) => (
            <div key={i} className="p-16 hover:bg-bg-dark transition-all group">
              <div className="w-12 h-12 rounded-sm bg-brand-secondary/5 flex items-center justify-center mb-10 group-hover:bg-brand-primary/10">
                <s.icon className="w-6 h-6 text-brand-secondary group-hover:text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-6">{s.title}</h3>
              <p className="text-ink/50 mb-10 text-sm leading-relaxed h-20">{s.desc}</p>
              <div className="space-y-4">
                {s.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-ink/70">
                    <CheckCircle2 className="w-3 h-3 text-brand-primary" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Sponsor Match", desc: "Corporate ESD fund matching based on financial calendar end dates." },
    { title: "Compliance Upload", desc: "SMEs register and buffer slips when governmental portals go offline." },
    { title: "Digital Blueprint", desc: "Branding launch, WhatsApp Business activation, and Payment gateways setup." },
    { title: "SD Vendor Promotion", desc: "Corporate promote beneficiaries to active supply chains, maximizing points." },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-bg-dark border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="text-brand-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-8">Methodology</div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-brand-secondary mb-6">The Development Cycle.</h2>
          <p className="text-lg md:text-xl text-ink/40 max-w-xl mx-auto">A rigorous, four-stage approach to local market scaling.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          {steps.map((s, i) => (
            <div key={i} className="group">
              <div className="text-[10px] font-black text-brand-primary mb-6 tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">PHASE 0{i + 1}</div>
              <h3 className="text-xl font-bold mb-4 pb-4 border-b border-ink/10">{s.title}</h3>
              <p className="text-sm text-ink/50 leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TechStack = () => {
  const logos = [
    "CIPC Portal", "SARS eFiling", "Yoco ZAR", "PayFast SA", "WhatsApp Business", "Seda", "SEFA", "NEF", "Standard Bank", "Vodacom"
  ];

  return (
    <section className="py-20 bg-brand-secondary border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Bridging with Local Platforms</p>
      </div>
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...logos, ...logos].map((l, i) => (
          <div key={i} className="text-2xl font-display font-bold text-white/40 hover:text-white transition-colors cursor-default">
            {l}
          </div>
        ))}
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-12 md:py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto p-8 md:p-16 lg:p-32 rounded-2xl bg-brand-secondary relative overflow-hidden text-center group">
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
           <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-brand-secondary/90 via-brand-secondary to-transparent -z-0" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="inline-block py-2 px-6 rounded-full border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12">Ready to Scale</div>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase mb-8 md:mb-10 tracking-tighter text-white">Unlock Your <span className="text-brand-primary">Kit.</span></h2>
          <p className="text-lg md:text-xl text-white/50 mb-12 md:mb-16 max-w-2xl mx-auto font-medium">
            Join the South African businesses using BIZSTARTUP KIT to scale and secure scorecard targets. Your compliance roadmap starts now.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <Link 
              id="cta-acquire"
              to="/portal"
              className="px-12 py-6 bg-brand-primary text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-brand-secondary transition-all shadow-2xl text-center block"
            >
              Access SME Workspace
            </Link>
            <Link 
              to="/sponsor"
              className="px-12 py-6 border-2 border-white/20 text-white font-black uppercase tracking-widest text-sm hover:border-white transition-all underline decoration-brand-primary decoration-4 underline-offset-8 text-center block"
            >
              Request Corporate Partnership
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Main Page ---
export default function LandingPage() {
  return (
    <>
      <OnboardingTour />
      <HeroSection />
      <HumanCapitalSection />
      <ProblemSection />
      <SolutionsSection />
      <HowItWorks />
      
      {/* Local Impact Cases */}
      <section id="impact-cases" className="py-24 md:py-48 relative overflow-hidden bg-white border-y border-ink/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32 mb-16 md:mb-32 items-center">
            <div>
              <MetaLabel className="mb-6 md:mb-10">Empowering Local Leaders</MetaLabel>
              <h2 className="text-4xl md:text-6xl lg:text-8xl mb-8 md:mb-12 leading-none">
                Impact <br /> <span className="text-brand-primary">Case Log.</span>
              </h2>
              <p className="text-lg md:text-xl text-ink/65 max-w-xl leading-relaxed italic">
                Our kits have enabled local entrepreneurs to move out of the informal economy and secure active corporate supplier status.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-ink/10 aspect-video group">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074&auto=format&fit=crop" alt="Analytics" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                dept: "Retail & Consumer (ED)",
                cases: ["Lindiwe's Spaza Shop compliance setup", "Commissioner-signed EME Affidavits", "Yoco card machine payment catalog config"],
                icon: TrendingUp,
                img: "https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=2670&auto=format&fit=crop"
              },
              {
                dept: "Logistics & Fleet (SD)",
                cases: ["Kgosi Logistics SARS Tax compliance verification", "Promoted to primary supplier (SD) on VodaCapital", "Invoice generation setup"],
                icon: ShieldCheck,
                img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2670&auto=format&fit=crop"
              }
            ].map((uc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="overflow-hidden bg-bg-dark rounded-sm border border-ink/5 group"
              >
                <div className="h-64 overflow-hidden relative">
                   <img src={uc.img} alt={uc.dept} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-brand-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-12">
                      <p className="text-white text-center text-sm font-medium tracking-tight">Active scorecard verification points generated for sponsors.</p>
                   </div>
                </div>
                <div className="p-10 flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-sm bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <uc.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{uc.dept}</h3>
                    <ul className="space-y-3">
                      {uc.cases.map((c, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-ink/65 font-medium">
                          <div className="w-1 h-1 rounded-full bg-brand-primary" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 md:py-32 bg-bg-dark border-b border-ink/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-16 md:p-32 opacity-5 pointer-events-none">
          <Globe className="w-64 h-64 md:w-96 md:h-96 text-brand-secondary animate-reverse-spin" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-end mb-16 md:mb-24">
             <div>
              <MetaLabel className="mb-6 md:mb-8">Cross-Sector Scalability</MetaLabel>
              <h2 className="text-4xl md:text-5xl lg:text-7xl mb-6 leading-none">Local <br /> <span className="text-gradient">Presence.</span></h2>
             </div>
             <p className="text-lg md:text-xl text-ink/40 font-medium max-w-sm mb-2">Our technical kits are industry-agnostic, optimized for SA township, rural, and formal commercial sectors.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-ink/5 border border-ink/5">
            {["Retail Spaza", "Agri-processing", "Township Delivery", "Fleet Logistics", "Clearing Agents", "Local Services"].map((ind, i) => (
              <div key={i} className="p-12 md:p-16 bg-white flex flex-col items-center justify-center text-center group hover:bg-bg-dark transition-colors">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-secondary mb-4 opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">{ind}</div>
                <div className="w-2 h-2 rounded-full bg-ink/5 group-hover:bg-brand-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechStack />
      <CTASection />

      {/* Global styles for marquee animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}} />
    </>
  );
}
