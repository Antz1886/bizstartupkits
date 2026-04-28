import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, PieChart, TrendingUp, Search, Layers, ArrowUpRight, ArrowRight } from 'lucide-react';

const StrategicBI = () => {
  return (
    <div className="pt-40">
      <section className="px-10 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-8">Service Segment: 03</div>
              <h1 className="text-7xl md:text-9xl leading-[0.88] mb-12 tracking-tighter">
                Strategic <br /> <span className="text-gradient">BI Consulting.</span>
              </h1>
              <p className="text-xl text-ink/60 mb-12 max-w-xl leading-relaxed font-medium">
                Turning fragmented data points into high-fidelity strategic ammunition. We build executive decision engines that see through the noise of modern business.
              </p>
              <button className="btn-primary">
                View Dashboard Frameworks
              </button>
            </motion.div>
            <div className="relative group">
              <div className="p-8 bg-brand-secondary rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-grid" />
                <div className="relative z-10 space-y-10">
                   <div className="flex justify-between items-end">
                      <div className="text-white text-5xl font-black">8.42M</div>
                      <div className="text-brand-primary font-black flex items-center gap-2"><ArrowUpRight className="w-5 h-5" /> 24%</div>
                   </div>
                   <div className="h-40 flex items-end gap-2">
                      {[40, 70, 45, 90, 65, 80, 50, 95].map((h, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          className="flex-1 bg-white/10 hover:bg-brand-primary transition-colors rounded-t-sm" 
                        />
                      ))}
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-sm border border-white/10">
                        <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Global Reach</div>
                        <div className="text-lg font-bold text-white">124 Nodes</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-sm border border-white/10">
                        <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Logic Depth</div>
                        <div className="text-lg font-bold text-white">Level 09</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-10">
           <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div>
                 <h2 className="text-5xl font-black uppercase text-brand-secondary mb-12">From Data <br /> to Intelligence.</h2>
                 <p className="text-xl text-ink/50 leading-relaxed mb-10">
                    Most companies have data. Very few have intelligence. We bridge the gap by architecting custom BI stacks that focus on KPIs that actually move the needle.
                 </p>
                 <div className="grid grid-cols-2 gap-10">
                    <div>
                       <div className="text-brand-primary font-black mb-4">01</div>
                       <h4 className="text-xl font-bold mb-4">Integrity Audits</h4>
                       <p className="text-sm text-ink/40">Ensuring your raw data sources are clean, reliable, and bias-free before any analysis begins.</p>
                    </div>
                    <div>
                       <div className="text-brand-primary font-black mb-4">02</div>
                       <h4 className="text-xl font-bold mb-4">Custom KPIs</h4>
                       <p className="text-sm text-ink/40">Developing proprietary metrics specifically tailored to your business model's unique growth drivers.</p>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-px bg-ink/5 border border-ink/5">
                {[
                  { icon: Search, label: "Deep Mining" },
                  { icon: PieChart, label: "Segmentation" },
                  { icon: TrendingUp, label: "Forecasting" },
                  { icon: Layers, label: "Stack Sync" }
                ].map((item, i) => (
                  <div key={i} className="p-16 bg-white hover:bg-bg-dark transition-all group text-center">
                    <item.icon className="w-10 h-10 mx-auto mb-6 text-ink/10 group-hover:text-brand-primary transition-colors" />
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-secondary">{item.label}</div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      <section className="py-32 bg-brand-secondary text-white">
        <div className="max-w-7xl mx-auto px-10">
          <div className="text-center mb-24">
             <div className="text-brand-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8">Visualization Mastery</div>
             <h2 className="text-6xl font-black mb-6">Executive Command Centers.</h2>
             <p className="text-xl text-white/40 max-w-2xl mx-auto">Replacing rows of spreadsheets with intuitive, real-time command centers that provide instantaneous strategic clarity.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20">
             <div className="p-16 border border-white/10 rounded-sm hover:border-brand-primary transition-all group">
                <h3 className="text-3xl font-bold mb-8 uppercase tracking-tighter">Strategic Sales Dashboards</h3>
                <p className="text-white/40 mb-12">Visualize your entire funnel with cohort analysis, churn prediction, and real-time revenue pacing against quarterly targets.</p>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">
                   Deployment Ready <ArrowRight className="w-4 h-4" />
                </div>
             </div>
             <div className="p-16 border border-white/10 rounded-sm hover:border-brand-primary transition-all group">
                <h3 className="text-3xl font-bold mb-8 uppercase tracking-tighter">Operational Efficiency Engine</h3>
                <p className="text-white/40 mb-12">Track production bottlenecks, workforce utilization, and supply chain health in a single, high-fidelity interface.</p>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">
                   Deployment Ready <ArrowRight className="w-4 h-4" />
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-10 text-center">
            <h2 className="text-6xl font-black uppercase mb-12 tracking-tighter text-brand-secondary">See Your <span className="text-brand-primary">Future.</span></h2>
            <p className="text-xl text-ink/50 mb-16 max-w-2xl mx-auto">
              Strategic BI is about more than looking back—it's about building a telescope that allows you to see market shifts before your competitors.
            </p>
            <button className="px-12 py-6 bg-brand-secondary text-white font-black uppercase tracking-widest text-sm hover:bg-brand-primary transition-all">
              Request Tactical BI Audit
            </button>
        </div>
      </section>
    </div>
  );
};

export default StrategicBI;
