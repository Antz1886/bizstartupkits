import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, FileText, Landmark, Percent, Globe, 
  Smartphone, Award, Search, ArrowRight, ShieldCheck 
} from 'lucide-react';

const RESOURCES = [
  {
    category: "Compliance",
    title: "CIPC Company Registration Guide",
    desc: "A complete step-by-step walkthrough to register a private company (Pty) Ltd in South Africa, including Name Reservation and obtaining your COR14.3 registration document.",
    fee: "R175 (CIPC Official Fee)",
    steps: [
      "Create a CIPC profile on the official New Bizportal.",
      "Reserve a company name (costs R50, requires 1-4 options).",
      "File your register transaction (costs R125).",
      "Download your COR14.3, Memorandum of Incorporation (MOI), and Share Certificate template."
    ],
    icon: Landmark,
    agent: "Vanguard Compliance Agent (agency-compliance-auditor)"
  },
  {
    category: "Compliance",
    title: "SARS Tax Compliance PIN & VAT",
    desc: "How to register your company for tax, obtain a Tax Compliance Status (TCS) PIN, and understand South African VAT thresholds for small businesses.",
    fee: "Free (Self-service via eFiling)",
    steps: [
      "Register for SARS eFiling using your new CIPC registration details.",
      "Receive your tax reference number automatically.",
      "Activate tax clearance and generate your Tax Compliance PIN.",
      "Note: VAT registration is optional unless annual turnover exceeds R1 million."
    ],
    icon: Percent,
    agent: "Vanguard Compliance Agent (agency-compliance-auditor)"
  },
  {
    category: "Branding",
    title: "Local Domains & Branding Guideline",
    desc: "Why choosing a '.co.za' domain is critical for local trust, and how to create clean, scalable vector logos for print, business cards, and social commerce.",
    fee: "R80 - R150/year (Domain hosting)",
    steps: [
      "Select a local registrar (e.g. Domains.co.za, Host Africa) to secure your '.co.za' name.",
      "Maintain branding consistency with a clean SVG or PNG logo.",
      "Keep text readable on mobile phones.",
      "Prepare transparent layouts for invoices and headers."
    ],
    icon: Globe,
    agent: "Apex Brand Guardian (agency-brand-guardian)"
  },
  {
    category: "Sales & Marketing",
    title: "WhatsApp Social Commerce & Local SEO",
    desc: "Township and sub-urban economies run heavily on WhatsApp and maps search. Learn how to launch a WhatsApp Business catalog and index your location on Google Maps.",
    fee: "Free",
    steps: [
      "Download WhatsApp Business and set up an official profile.",
      "Add your products to the WhatsApp catalog with pricing and descriptions.",
      "Register a free Google Business Profile.",
      "Obtain customer reviews to boost local Google Maps search visibility."
    ],
    icon: Smartphone,
    agent: "Seeker SEO Specialist (agency-agentic-search-optimizer)"
  },
  {
    category: "Finances",
    title: "EME B-BBEE Affidavit Guidelines",
    desc: "Exempted Micro Enterprises (turnover under R10m) qualify for automatic Level 4 (or Level 1 if 100% black-owned) status. Learn how to create a legal affidavit.",
    fee: "Free (Requires Commissioner of Oaths)",
    steps: [
      "Download the official DTI EME B-BBEE Affidavit template.",
      "State your exact annual turnover and black ownership percentage.",
      "Have a Commissioner of Oaths (police station, bank, accountant) stamp and sign it.",
      "Present this affidavit to corporate sponsors to qualify for ESD points."
    ],
    icon: Award,
    agent: "Vanguard Compliance Agent (agency-compliance-auditor)"
  },
  {
    category: "Strategy",
    title: "SME Business Plan Drafting",
    desc: "Drafting a solid business plan is key to obtaining Seda/SEFA government grants or attracting B-BBEE Enterprise Development corporate sponsorships.",
    fee: "Free",
    steps: [
      "Outline your company's core mission and vision statements.",
      "Analyze your local market opportunity and target buyer personas.",
      "Detail your funding requirements and operational growth targets.",
      "Verify that your B-BBEE scorecard levels align with the sponsor requirements."
    ],
    icon: FileText,
    agent: "Scribe Business Planner (agency-proposal-strategist)"
  },
  {
    category: "Finances",
    title: "Bookkeeping & Expense Audits",
    desc: "South African National Accreditation System (SANAS) auditors require detailed activity logs and financial ledgers to approve corporate ESD tax points.",
    fee: "Free",
    steps: [
      "Track all incoming revenue and vendor payments on a structured ledger.",
      "Categorize operating expenses (e.g. stock, travel, equipment).",
      "Archive proof of transactions for annual financial statements.",
      "Sync records with the B-BBEE dashboard ledger regularly."
    ],
    icon: FileText,
    agent: "Ledger Bookkeeper Agent (agency-bookkeeper-controller)"
  }
];

export default function KnowledgeHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = RESOURCES.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || res.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 bg-bg-dark font-sans relative overflow-hidden">
      {/* Background visual dots */}
      <div className="absolute inset-0 bg-dot opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Page Hero */}
        <div className="max-w-3xl mb-16">
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/5 border border-brand-secondary/10">
            <BookOpen className="w-4 h-4 text-brand-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">
              Resource Center
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black leading-none mb-6">
            SME Knowledge <br /><span className="text-gradient">Hub.</span>
          </h1>
          <p className="text-lg md:text-xl text-ink/50 leading-relaxed font-light">
            Empowering South African business owners with direct compliance checklists, logo/branding guidelines, digital setups, and marketing playbooks.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {['All', 'Compliance', 'Branding', 'Strategy', 'Sales & Marketing', 'Finances'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest border rounded-full transition-all ${
                  selectedCategory === cat 
                    ? 'bg-brand-secondary text-white border-brand-secondary shadow-md' 
                    : 'bg-white border-ink/10 text-ink/50 hover:border-brand-primary hover:text-brand-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search knowledge guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs bg-white border border-ink/10 rounded-full focus:outline-none focus:border-brand-primary shadow-sm"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredResources.map((res, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white border border-ink/5 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-secondary/5 flex items-center justify-center">
                    <res.icon className="w-6 h-6 text-brand-secondary" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest bg-brand-primary/10 text-brand-primary px-3 py-1 rounded">
                    {res.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-brand-secondary">
                  {res.title}
                </h3>
                
                <p className="text-xs text-ink/60 leading-relaxed mb-4 font-medium">
                  {res.desc}
                </p>

                {res.agent && (
                  <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-primary/5 text-[10px] text-brand-primary font-bold border border-brand-primary/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                    Automated by: {res.agent}
                  </div>
                )}

                <div className="space-y-2 border-t border-ink/5 pt-4 mb-6">
                  <div className="text-[10px] font-black uppercase tracking-wider text-brand-secondary">
                    Key Execution Steps:
                  </div>
                  {res.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-ink/50 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0 mt-1.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-ink/5 pt-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-ink/40">
                  Fee: <span className="text-brand-secondary">{res.fee}</span>
                </span>
                
                <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary flex items-center gap-1.5 group cursor-pointer hover:translate-x-1 transition-all">
                  Active Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
