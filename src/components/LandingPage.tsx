import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, BarChart3, Zap, ArrowRight, CheckCircle2,
  Layers, Database, Globe,
  TrendingUp, ShieldCheck, Cloud,
  Activity, Cpu, LineChart, Network,
  BrainCircuit, Sparkles, Workflow, Mail, Users
} from 'lucide-react';
import { DashboardMock } from './DashboardMock';
import { cn } from '../lib/utils';
import { useModal } from '../context/ModalContext';
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
    
    // Auto-close context to avoid memory leaks
    setTimeout(() => {
      if (ctx.state !== 'closed') ctx.close();
    }, 200);
  } catch (e) {
    // Silently fail if audio context is blocked or unsupported
  }
};

// --- Sub-Components ---

const AICapabilityCard = ({ title, desc, icon: Icon, features }: { title: string, desc: string, icon: any, features: string[] }) => (
  <div className="p-8 rounded-2xl bg-white border border-ink/5 hover:border-brand-primary/20 hover:shadow-xl transition-all group">
    <div className="w-12 h-12 rounded-xl bg-bg-dark flex items-center justify-center mb-6 group-hover:bg-brand-primary/10 transition-colors">
      <Icon className="w-6 h-6 text-brand-secondary group-hover:text-brand-primary transition-colors" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-sm text-ink/60 mb-6 leading-relaxed">{desc}</p>
    <div className="space-y-2">
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-2 text-xs font-medium text-ink/50">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
          {f}
        </div>
      ))}
    </div>
  </div>
);

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
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-primary">Neural Instance 0.01</div>
          <div className="text-[10px] font-bold text-brand-secondary/40">SME_LOGIC_ENGINE_v4.system</div>
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
            { icon: Bot, freq: 440 },
            { icon: Zap, freq: 660 },
            { icon: Database, freq: 880 }
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
                animate={{ width: ["10%", "90%", "30%", "70%"] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                className="h-full bg-brand-primary/40"
              />
            </div>
            <div className="text-[8px] font-black uppercase tracking-widest text-ink/20">Metric_0{i}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MetaLabel = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary leading-none", className)}>
    {children}
  </div>
);

// --- AI Showcase Visualizers ---

const AutomationVisualizer = () => {
  const [pulseCount, setPulseCount] = React.useState(0);
  const [activeNode, setActiveNode] = React.useState<number | null>(null);

  const triggerPulse = () => setPulseCount(prev => prev + 1);

  const nodes = [
    { label: "High Priority", color: "text-red-500", icon: ShieldCheck, detail: "Auto-escalating critical vulnerabilities." },
    { label: "Auto_Scheduled", color: "text-green-500", icon: Zap, detail: "Integrating with deep-calendar nodes." },
    { label: "CRM_Update", color: "text-brand-primary", icon: Database, detail: "Synching lead data across 4 silos." }
  ];

  return (
    <div className="relative w-full h-80 bg-bg-dark rounded-xl border border-ink/5 overflow-hidden flex flex-col items-center justify-center group/visual">
      <div className="absolute inset-0 bg-dot opacity-30" />
      
      <div className="relative flex items-center gap-12 z-10">
        {/* Input Node */}
        <div 
          className="flex flex-col items-center gap-4 cursor-pointer"
          onClick={triggerPulse}
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-full bg-white border border-ink/10 flex items-center justify-center shadow-lg hover:border-brand-primary transition-colors"
          >
            <Mail className="w-6 h-6 text-brand-secondary" />
          </motion.div>
          <div className="text-[8px] font-black uppercase tracking-widest text-brand-primary animate-pulse">Click to Trigger</div>
        </div>

        {/* Connection Lines & Routing Animation */}
        <div className="relative w-32 h-1 bg-ink/10">
          <motion.div 
            key={pulseCount}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 150, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, ease: "linear" }}
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-primary blur-sm shadow-[0_0_10px_#FF4F00]"
          />
          <motion.div 
            animate={{ x: [-20, 150], opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-primary/20 blur-sm"
          />
          <div className="absolute left-1/2 -top-8 -translate-x-1/2">
             <Cpu className="w-8 h-8 text-brand-primary animate-pulse" />
          </div>
        </div>

        {/* Output Nodes */}
        <div className="flex flex-col gap-8">
          {nodes.map((node, i) => (
            <motion.div 
              key={i}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.3 }}
              onMouseEnter={() => setActiveNode(i)}
              onMouseLeave={() => setActiveNode(null)}
              className="flex items-center gap-4 relative cursor-help"
            >
              <div className="w-10 h-10 rounded-sm bg-white border border-ink/5 flex items-center justify-center shadow-sm hover:border-brand-primary transition-all">
                <node.icon className={cn("w-4 h-4", node.color)} />
              </div>
              <div className="text-[8px] font-black uppercase tracking-widest text-ink/30">{node.label}</div>
              
              {/* Tooltip detail */}
              {activeNode === i && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-4 w-32 p-3 bg-white shadow-xl border border-ink/5 rounded-lg text-[10px] text-ink/60 font-medium z-50 pointer-events-none"
                >
                  {node.detail}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Button overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/visual:opacity-100 transition-opacity">
        <button 
          onClick={triggerPulse}
          className="px-4 py-2 bg-brand-secondary text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg hover:bg-brand-primary transition-colors"
        >
          Inject Data Protocol
        </button>
      </div>

      {/* Background Grid Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.2, 0],
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200
          }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
          className="absolute w-1 h-1 bg-brand-primary rounded-full"
        />
      ))}
    </div>
  );
};

const AnalysisVisualizer = () => {
  const [dataMode, setDataMode] = React.useState<'load' | 'market' | 'risk'>('load');
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  const datasets = {
    load: [40, 70, 45, 90, 65, 80, 50, 95, 60, 85],
    market: [20, 30, 45, 40, 55, 70, 65, 85, 90, 98],
    risk: [95, 80, 70, 40, 30, 20, 35, 10, 5, 2]
  };

  const labels = {
    load: "Operational_Load_Sync",
    market: "Market_Capture_Flow",
    risk: "Churn_Risk_Distribution"
  };

  return (
    <div className="relative w-full h-80 bg-bg-dark rounded-xl border border-ink/5 overflow-hidden p-8 flex flex-col justify-between group/analysis">
      <div className="flex justify-between items-start z-10">
        <MetaLabel className="text-ink/60 transition-colors group-hover/analysis:text-brand-primary">{labels[dataMode]}</MetaLabel>
        <div className="flex gap-2">
          {(['load', 'market', 'risk'] as const).map(mode => (
            <button 
              key={mode}
              onClick={() => setDataMode(mode)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                dataMode === mode ? "bg-brand-primary scale-125" : "bg-ink/10"
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-end justify-center gap-3 relative mt-4">
        {datasets[dataMode].map((h, i) => (
          <div 
            key={`${dataMode}-${i}`} 
            className="flex-1 flex flex-col items-center gap-2 relative"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
             <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.05, 
                ease: "circOut"
              }}
              className={cn(
                "w-full rounded-t-sm relative transition-all duration-300",
                hoveredIdx === i ? "bg-brand-primary shadow-[0_0_15px_#FF4F00]" : "bg-gradient-to-t from-brand-secondary to-brand-primary/60"
              )}
             >
               <AnimatePresence>
                 {hoveredIdx === i && (
                   <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] font-black text-brand-primary bg-white px-1.5 py-0.5 rounded shadow-xl border border-ink/5"
                   >
                     {h}%
                   </motion.div>
                 )}
               </AnimatePresence>
             </motion.div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-ink/5 pt-6 mt-6 z-10">
         <div className="space-y-1">
           <motion.div 
            key={dataMode + '-stat-1'}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-black text-brand-secondary"
           >
             {dataMode === 'load' ? '84.2%' : dataMode === 'market' ? '12.4x' : '5.2%'}
           </motion.div>
           <div className="text-[8px] font-black uppercase tracking-widest text-ink/30">{dataMode === 'load' ? 'Sync_Rate' : dataMode === 'market' ? 'Velocity' : 'Risk_Score'}</div>
         </div>
         <div className="space-y-1">
            <motion.div 
              key={dataMode + '-stat-2'}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-black text-brand-primary"
            >
              {dataMode === 'load' ? '12.4ms' : dataMode === 'market' ? '92.1%' : '1k+'}
            </motion.div>
           <div className="text-[8px] font-black uppercase tracking-widest text-ink/30">{dataMode === 'load' ? 'Latency' : dataMode === 'market' ? 'Retention' : 'Audit_Hits'}</div>
         </div>
         <div className="flex items-center justify-end">
            <button 
              onClick={() => setDataMode(prev => prev === 'load' ? 'market' : prev === 'market' ? 'risk' : 'load')}
              className="p-2 border border-ink/10 rounded-sm hover:border-brand-primary transition-colors"
            >
              <Activity className="w-4 h-4 text-brand-primary" />
            </button>
         </div>
      </div>
    </div>
  );
};

const PredictiveVisualizer = () => {
  const [intensity, setIntensity] = React.useState(0.5);
  const [showProjection, setShowProjection] = React.useState(false);

  // Dynamic path based on intensity
  const projectionY = 130 - (intensity * 120);
  const pathD = `M200,130 L250,${130 - (intensity * 50)} L300,${130 - (intensity * 70)} L350,${130 - (intensity * 110)} L400,${projectionY}`;

  return (
    <div className="relative w-full h-80 bg-bg-dark rounded-xl border border-ink/5 overflow-hidden p-10 group/predict">
      <div className="absolute inset-0 bg-dot opacity-20" />
      
      <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200">
        {/* Historical Data Line */}
        <motion.path
          d="M0,150 L50,140 L100,160 L150,120 L200,130"
          fill="none"
          stroke="#1A2D42"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Predictive Data Line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#FF4F00"
          strokeWidth="3"
          strokeDasharray="8 6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Projection Area */}
        <motion.path
          d={`M200,130 L250,${130 - (intensity * 50)} L300,${130 - (intensity * 70)} L350,${130 - (intensity * 110)} L400,${projectionY} L400,200 L200,200 Z`}
          fill="url(#gradient-prediction)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        />

        <defs>
          <linearGradient id="gradient-prediction" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4F00" stopOpacity="0" />
            <stop offset="100%" stopColor="#FF4F00" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Animated Growth Pulsar */}
        <motion.circle
          cx="400"
          cy={projectionY}
          r="10"
          fill="#FF4F00"
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

      <div className="absolute top-10 right-10 text-right pointer-events-none">
         <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-1">Growth Forecast</div>
         <motion.div 
            key={intensity}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-black text-brand-secondary"
          >
            +{Math.round(intensity * 500)}%
          </motion.div>
         <div className="text-[9px] font-bold text-green-500 uppercase">Confidence Level: {intensity > 0.8 ? 'Extreme' : 'High'}</div>
      </div>

      {/* Control Slider */}
      <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-6 opacity-0 group-hover/predict:opacity-100 transition-all translate-y-4 group-hover/predict:translate-y-0">
        <LineChart className="w-4 h-4 text-brand-primary" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-ink/40">
            <span>Standard Growth</span>
            <span>Aggressive AI Scaling</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
            className="w-full accent-brand-primary cursor-pointer"
          />
        </div>
        <button 
          onClick={() => setIntensity(0.5)}
          className="text-[8px] font-black uppercase tracking-widest text-brand-primary hover:underline"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const AICapabilitiesShowcase = () => {
  const categories = [
    {
      meta: "01 Autopilot",
      title: "Intelligent Automation",
      desc: "We build self-correcting workflows that handle complex business routing, from high-stakes lead prioritization to automated CRM synchronization.",
      visual: AutomationVisualizer,
      icon: Workflow,
      stats: [
        { label: "Hours Reclaimed", val: "22/wk" },
        { label: "Routing Accuracy", val: "99.2%" }
      ]
    },
    {
      meta: "02 Perception",
      title: "Data Intelligence",
      desc: "Transform unstructured noise into crystalline insights. Our analysis engines detect hidden patterns in your sales cycles and operational data silos.",
      visual: AnalysisVisualizer,
      icon: BrainCircuit,
      stats: [
        { label: "Insights Generated", val: "1k+" },
        { label: "Processing Speed", val: "-80%" }
      ]
    },
    {
      meta: "03 Foresight",
      title: "Predictive Modeling",
      desc: "Stop reacting to the past. Our neural forecasting models project revenue trends and churn risks months in advance with extreme accuracy.",
      visual: PredictiveVisualizer,
      icon: LineChart,
      stats: [
        { label: "Forecast Interval", val: "18 Months" },
        { label: "Error Margin", val: "<3.4%" }
      ]
    }
  ];

  return (
    <section id="ai-showcase" className="py-24 md:py-48 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-16 md:mb-32">
          <MetaLabel className="mb-6 md:mb-10">Dynamic Capability Showcase</MetaLabel>
          <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-8 md:mb-12">
            Engineered <br /> <span className="text-gradient">Intelligence.</span>
          </h2>
          <p className="text-lg md:text-2xl text-ink/50 leading-relaxed font-light">
            AI is more than a chatbot. It's the technical leverage that separates high-performing enterprises from the rest of the market.
          </p>
        </div>

        <div className="space-y-48">
          {categories.map((cat, i) => (
            <div key={i} className={cn(
              "grid lg:grid-cols-2 gap-20 items-center",
              i % 2 !== 0 && "lg:flex-row-reverse"
            )}>
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={cn(i % 2 !== 0 && "lg:order-2")}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-bg-dark border border-ink/5 flex items-center justify-center shadow-sm">
                    <cat.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <MetaLabel className="opacity-40">{cat.meta}</MetaLabel>
                </div>
                <h3 className="text-5xl font-black mb-8 leading-tight">{cat.title}</h3>
                <p className="text-xl text-ink/60 mb-12 leading-relaxed">
                  {cat.desc}
                </p>
                
                <div className="grid grid-cols-2 gap-12 border-t border-ink/5 pt-10">
                  {cat.stats.map((s, j) => (
                    <div key={j}>
                      <div className="text-4xl font-black text-brand-secondary mb-2">{s.val}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/5 to-transparent rounded-2xl -z-10" />
                <cat.visual />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
              // Replaced Executive Director portrait with a collaborative team using AI/tech 
              // to better represent the "SME Growth Partner" collective expertise.
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2570&auto=format&fit=crop" 
              alt="Strategic Innovation Team - BIZSTARTUP" 
              className="w-full h-full object-cover aspect-[4/5] scale-105 hover:scale-100 transition-transform duration-1000 contrast-[1.05] brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/40 to-transparent" />
          </div>
          <div className="absolute -bottom-10 -right-10 glass p-8 rounded-sm shadow-2xl border border-white/20 max-w-xs">
            <p className="text-sm font-medium italic text-ink/80 mb-4">
              "We don't just build software; we build high-fidelity partnerships. Every kit is a fusion of your domain expertise and our technical dominance."
            </p>
            <div className="flex items-center gap-4">
               <div className="w-1 h-8 bg-brand-primary" />
               <div className="text-[10px] font-black uppercase tracking-widest text-brand-secondary">Strategic Innovation Team</div>
            </div>
          </div>
        </motion.div>

        <div>
          <MetaLabel className="mb-6 md:mb-10">Systems + People</MetaLabel>
          <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-8 md:mb-12">
            The Human <br /> <span className="text-gradient">Advantage.</span>
          </h2>
          <p className="text-lg md:text-xl text-ink/60 mb-8 md:mb-12 leading-relaxed font-medium">
            Automation isn't about replacing your workforce—it's about liberating them. We shift your human capital from the "Maintenance Lane" to the "Innovation Lane." 
          </p>
          <div className="space-y-12">
            {[
              { 
                title: "Empowered Decisioning", 
                desc: "Equip your teams with real-time neural insights, allowing for high-stakes decisions backed by crystalline data clarity.",
                icon: Users
              },
              { 
                title: "Cognitive Liberation", 
                desc: "Remove the friction of manual synchronization. Let your founders and creators focus on the purely human elements of growth.",
                icon: BrainCircuit
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

const LandingHero = ({ onOpenModal }: { onOpenModal: (type: string) => void }) => (
    <section id="hero-start" className="relative pt-32 md:pt-48 pb-20 md:pb-32 bg-grid min-h-[95vh] flex items-center overflow-hidden border-b border-ink/5">
    {/* Background Image Accent */}
    <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full -z-10 opacity-20 lg:opacity-30">
      <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop" alt="Collaborative Vision" className="w-full h-full object-cover mask-gradient-to-l" />
    </div>
    
    <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <MetaLabel className="mb-6 md:mb-10 text-brand-primary font-bold">Accelerating Your Digital Journey</MetaLabel>
        <h1 className="text-5xl md:text-7xl lg:text-9xl leading-[0.88] mb-8 md:mb-12 tracking-tighter">
          Your Online <br /> <span className="text-gradient hover:bg-[length:100%_auto] transition-all">Growth</span> <br /> Partner.
        </h1>
        <p className="text-lg md:text-xl text-ink/60 mb-8 md:mb-12 max-w-xl leading-relaxed font-medium border-l-2 border-brand-primary/20 pl-6 md:pl-8">
          The ultimate toolkit for SMEs and Startups. We deploy high-performance AI systems, automated sales engines, and scalable digital architectures that turn ideas into market leaders.
        </p>
        <div className="flex flex-wrap gap-6">
          <button 
            onClick={() => onOpenModal('Get Your Kit')}
            className="btn-primary group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">Launch Your Growth <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
          </button>
          <button 
            onClick={() => onOpenModal('Growth Strategy')}
            className="btn-outline hover:border-brand-primary text-brand-secondary hover:text-brand-primary transition-all"
          >
            Explore the Kit
          </button>
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
            <MetaLabel className="text-ink/30">System Integrity</MetaLabel>
            <div className="text-3xl font-black text-brand-secondary font-mono tracking-widest">99.98%</div>
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

const AISuite = () => {
  const capabilities = [
    {
      title: "Generative AI Systems",
      desc: "Architecting private LLM nodes for secure, high-fidelity business task execution.",
      icon: Bot,
      features: ["Private Hosting", "Vector Databases", "Cognitive Search"]
    },
    {
      title: "Algorithmic BI",
      desc: "Moving beyond charts to predictive decision engines that signal risk before it manifests.",
      icon: BarChart3,
      features: ["Neural Forecasting", "Real-time Audits", "Anomaly Guards"]
    },
    {
      title: "Cognitive Flows",
      desc: "Replacing rigid logic with fluid, AI-interpreted workflows that handle ambiguity.",
      icon: Zap,
      features: ["NLP Logic", "Sentiment Routing", "Vision System Integration"]
    }
  ];

  return (
    <section id="ai-suite" className="py-24 md:py-48 bg-brand-secondary text-white relative flex items-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-bg-dark to-transparent opacity-5" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center mb-16 md:mb-32">
          <div>
            <MetaLabel className="text-brand-primary mb-6 md:mb-10">The Intelligence Advantage</MetaLabel>
            <h2 className="text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 md:mb-12">
              Deep AI <br /> Integration.
            </h2>
          </div>
          <p className="text-lg md:text-2xl text-white/40 leading-relaxed font-light">
            We don't just "use" generic AI tools. We engineer proprietary neural pipelines that become a permanent, defensible asset for your enterprise.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-1px bg-white/10">
          {capabilities.map((cap, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-16 bg-brand-secondary group hover:bg-brand-secondary/50 transition-all border border-white/5"
            >
              <div className="w-12 h-12 rounded-sm bg-brand-primary/10 flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                <cap.icon className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-8 uppercase tracking-[-0.04em]">{cap.title}</h3>
              <p className="text-white/40 mb-12 text-sm leading-relaxed">{cap.desc}</p>
              <div className="space-y-4">
                {cap.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
                    <div className="w-4 h-[1px] bg-brand-primary" />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  return (
    <section className="py-24 md:py-48 bg-white relative overflow-hidden border-y border-ink/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <div>
            <MetaLabel className="mb-8 md:mb-12">The Operational Audit</MetaLabel>
            <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 md:mb-12">
              The Cost of <br /> <span className="text-gradient">Inefficiency.</span>
            </h2>
            <p className="text-lg md:text-xl text-ink/50 mb-8 md:mb-12 leading-relaxed font-medium">
              Most SMEs operate with 40% "Ghost Capacity"—workhours lost to manual synchronization, data silos, and non-predictive workflows.
            </p>
            <div className="space-y-6">
              {[
                { label: "Data Sink", desc: "18 hrs/week lost to manual CSV handling" },
                { label: "Risk Exposure", desc: "Zero real-time anomaly detection logic" },
                { label: "Growth Ceiling", desc: "Scalability limited by workforce headcount" }
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
              { label: "Operational Waste", val: "$2.4M", trend: "+12% YoY" },
              { label: "Decision Latency", val: "72 Hrs", trend: "High Risk" },
              { label: "Logic Accuracy", val: "68%", trend: "Critical" },
              { label: "AI Readiness", val: "Tier 4", trend: "Stagnant" }
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
};

const SolutionsSection = () => {
  const solutions = [
    {
      title: "Strategic AI Implementation",
      desc: "Architecting and deploying proprietary machine learning models tailored to your business silos.",
      icon: Bot,
      color: "brand-primary",
      features: ["LLM Orchestration", "Predictive Modeling", "Cognitive Automation"]
    },
    {
      title: "Enterprise Data Intelligence",
      desc: "Transforming disparate data streams into high-fidelity executive decision engines.",
      icon: Cloud,
      color: "brand-secondary",
      features: ["Unified Data Lakes", "Real-time KPI Streams", "Analytical Forecasting"]
    },
    {
      title: "Operational Rewiring",
      desc: "Redesigning business logic for a digital-first, automated economy.",
      icon: Layers,
      color: "brand-accent",
      features: ["Process Architecture", "Systems Convergence", "Digital Transformation"]
    }
  ];

  return (
    <section id="solutions" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="max-w-xl">
            <div className="text-brand-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-8">Consultancy Domains</div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-brand-secondary leading-tight">Elite Strategic <br /> <span className="text-gradient">Solutions.</span></h2>
          </div>
          <p className="text-lg md:text-xl text-ink/40 max-w-sm leading-relaxed font-medium">
            We provide the architectural foundation for the next generation of SME business operations.
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
    { title: "Audit & Architecture", desc: "Deep technical audit of your current operational stack and data silos." },
    { title: "Strategic Roadmap", desc: "Design of a phased AI and automation blueprint focused on high-yield ROI." },
    { title: "Core Deployment", desc: "Agile implementation of intelligent systems and enterprise dashboards." },
    { title: "Syndicate Growth", desc: "Ongoing cognitive optimization and strategic scaling of AI capabilities." },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-bg-dark border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="text-brand-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-8">Methodology</div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-brand-secondary mb-6">Our Engagement Framework.</h2>
          <p className="text-lg md:text-xl text-ink/40 max-w-xl mx-auto">A rigorous, four-stage approach to digital dominance.</p>
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
    "Salesforce", "HubSpot", "Zapier", "Make", "Tableau", "Power BI", "AWS", "Azure", "OpenAI", "Stripe", "QuickBooks"
  ];

  return (
    <section className="py-20 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Seamless Integrations With Your Stack</p>
      </div>
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...logos, ...logos].map((l, i) => (
          <div key={i} className="text-2xl font-display font-bold text-white/20 hover:text-white/50 transition-colors cursor-default">
            {l}
          </div>
        ))}
      </div>
    </section>
  );
};

const CTASection = ({ onOpenModal }: { onOpenModal: (type: string) => void }) => {
  return (
    <section className="py-12 md:py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto p-8 md:p-16 lg:p-32 rounded-2xl bg-brand-secondary relative overflow-hidden text-center group">
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
           <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-brand-secondary/90 via-brand-secondary to-transparent -z-0" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="inline-block py-2 px-6 rounded-full border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12">Final Call to Growth</div>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase mb-8 md:mb-10 tracking-tighter text-white">Ready to Get Your <span className="text-brand-primary">Kit?</span></h2>
          <p className="text-lg md:text-xl text-white/50 mb-12 md:mb-16 max-w-2xl mx-auto font-medium">
            Join the elite circle of SMEs using BIZSTARTUP KIT to scale beyond limits. Your automated future starts with a single protocol.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <button 
              id="cta-acquire"
              onClick={() => onOpenModal('Get Your Kit')}
              className="px-12 py-6 bg-brand-primary text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-brand-secondary transition-all shadow-2xl"
            >
              Acquire the Growth Kit
            </button>
            <button 
              onClick={() => onOpenModal('Strategy Session')}
              className="px-12 py-6 border-2 border-white/20 text-white font-black uppercase tracking-widest text-sm hover:border-white transition-all underline decoration-brand-primary decoration-4 underline-offset-8"
            >
              Request Tactical Review
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Main Page ---

export default function LandingPage() {
  const { openModal } = useModal();

  return (
    <>
      <OnboardingTour />
      <LandingHero onOpenModal={openModal} />
      <HumanCapitalSection />
      <ProblemSection />
      <AICapabilitiesShowcase />
      <AISuite />
      <SolutionsSection />
      <HowItWorks />
      
      {/* Example Use Cases Section */}
      <section id="impact-cases" className="py-24 md:py-48 relative overflow-hidden bg-white border-y border-ink/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32 mb-16 md:mb-32 items-center">
            <div>
              <MetaLabel className="mb-6 md:mb-10">Real-World Deployment</MetaLabel>
              <h2 className="text-4xl md:text-6xl lg:text-8xl mb-8 md:mb-12 leading-none">
                Impact <br /> <span className="text-brand-primary">Case Log.</span>
              </h2>
              <p className="text-lg md:text-xl text-ink/60 max-w-xl leading-relaxed italic">
                Strategic deployment isn't about tools; it's about shifting the needle on operational bottlenecks and growth ceilings.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-ink/10 aspect-video group">
              <img src="https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop" alt="Analytics" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                dept: "Sales Engines",
                cases: ["Lead capture automation", "CRM orchestration", "Predictive scoring"],
                icon: TrendingUp,
                img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              },
              {
                dept: "Financial Systems",
                cases: ["Invoice logic audits", "Automated expense flows", "Revenue forecasting"],
                icon: ShieldCheck,
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
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
                      <p className="text-white text-center text-sm font-medium tracking-tight">Deployment active for over 150+ SME partners worldwide.</p>
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
                        <li key={j} className="flex items-center gap-3 text-sm text-ink/60 font-medium">
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
              <h2 className="text-4xl md:text-5xl lg:text-7xl mb-6 leading-none">Global <br /> <span className="text-gradient">Versatility.</span></h2>
             </div>
             <p className="text-lg md:text-xl text-ink/40 font-medium max-w-sm mb-2">Our technical kits are industry-agnostic, engineered for performance regardless of your vertical.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-ink/5 border border-ink/5">
            {["Logistics", "E-commerce", "FinTech", "Professional Services", "Consulting", "MedTech", "Energy"].map((ind, i) => (
              <div key={i} className="p-12 md:p-16 bg-white flex flex-col items-center justify-center text-center group hover:bg-bg-dark transition-colors">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-secondary mb-4 opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">{ind}</div>
                <div className="w-2 h-2 rounded-full bg-ink/5 group-hover:bg-brand-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <TechStack />
      <CTASection onOpenModal={openModal} />

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
