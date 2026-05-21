import React from 'react';
import { motion } from 'motion/react';
import { Workflow, Truck, Map, Activity, Zap, MessageSquare } from 'lucide-react';

const MetricPulse = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col gap-1">
    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{label}</div>
    <div className="text-xl font-black text-white font-mono">{value}</div>
    <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-1">
        <motion.div 
            animate={{ width: ["20%", "80%", "40%"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="h-full bg-resolver-blue"
        />
    </div>
  </div>
);

export default function LogisticsOrchestrator() {
  return (
    <div className="min-h-screen bg-bg-dark pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Workflow className="w-6 h-6 text-resolver-blue" />
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-resolver-blue">Logistics & Fleet AI Assistant</div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
              Last-Mile Fleet <br /> <span className="text-resolver-blue">Automation.</span>
            </h1>
            <p className="text-xl text-white/40 font-medium leading-relaxed mb-12">
              WhatsApp-based coordination for South African transport and delivery teams. Automate driver check-ins, delivery updates, and routing in real-time.
            </p>
            
            <div className="grid grid-cols-2 gap-10 border-t border-white/5 pt-10">
                <MetricPulse label="Fleet Efficiency" value="94.2%" />
                <MetricPulse label="Fuel Savings / Mo" value="R42k/mo" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-resolver-blue/5 blur-3xl rounded-full" />
            <div className="relative bg-white/5 border border-white/10 p-2 rounded-xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-mission-black rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05]" />
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="w-48 h-48 border border-resolver-blue/20 rounded-full flex items-center justify-center"
                    >
                        <Map className="w-12 h-12 text-resolver-blue animate-pulse" />
                    </motion.div>
                </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {[
            { 
              title: "WhatsApp Driver Check-ins", 
              desc: "Allow drivers to send voice updates. The AI automatically schedules deliveries, notes delays, and updates dispatch.",
              icon: MessageSquare 
            },
            { 
              title: "Inefficiency Audits", 
              desc: "Monitor and highlight fuel usage drops and delayed routes automatically.",
              icon: Activity 
            },
            { 
              title: "Smart Route Updates", 
              desc: "Provide drivers with optimal route suggestions based on real-time traffic and road closures.",
              icon: Truck 
            }
          ].map((feature, i) => (
            <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-2xl hover:border-resolver-blue transition-all group">
              <div className="w-12 h-12 rounded-sm bg-resolver-blue/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-resolver-blue" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">{feature.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-resolver-blue p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black text-mission-black uppercase tracking-tighter mb-2">Start Your Free Pilot</h2>
            <p className="text-mission-black/60 font-medium italic">Scale your logistics operations with automated fleet coordination.</p>
          </div>
          <button className="px-10 py-5 bg-mission-black text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-mission-black transition-all">
            Start Free Pilot
          </button>
        </div>
      </div>
    </div>
  );
}
