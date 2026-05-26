import React from 'react';
import { FileText, CheckCircle, Scale, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

const TermsOfService = () => {
  return (
    <div className="pt-40">
      <section className="px-10 pb-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-8">Operational Agreement</div>
            <h1 className="text-6xl md:text-8xl leading-tight mb-12 tracking-tighter text-brand-secondary uppercase font-black">
              Terms of <br /> <span className="text-gradient">Service.</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-ink/60 space-y-12 font-medium leading-relaxed">
              <div className="p-8 bg-bg-dark border border-ink/5 rounded-xl">
                <div className="flex gap-4 items-center mb-6">
                  <Scale className="w-6 h-6 text-brand-primary" />
                  <h2 className="text-2xl font-black text-brand-secondary m-0">Engagement Framework</h2>
                </div>
                <p>
                  By deploying the BIZSTARTUP KIT, you enter into a strategic partnership agreement. These terms outline the technical responsibilities and operational boundaries of our AI-driven growth systems.
                </p>
              </div>

              <section>
                <h3 className="text-xl font-black text-brand-secondary uppercase tracking-tight mb-6">1. License & Usage</h3>
                <p>
                  We grant you a non-exclusive, non-transferable license to utilize our proprietary architecture and automated engines. This license is intended for internal business growth and cannot be resold or white-labeled without express written consent.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black text-brand-secondary uppercase tracking-tight mb-6">2. Operational Responsibility</h3>
                <p>
                  While our AI systems provide high-fidelity insights and automation, the ultimate strategic decisions remain with the enterprise. BIZSTARTUP KIT is not liable for market fluctuations or business outcomes derived from AI-generated forecasts.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black text-brand-secondary uppercase tracking-tight mb-6">3. System Maintenance</h3>
                <p>
                  To maintain peak operational velocity, your kit requires periodic "Neural Sync" updates. Interruption of these updates may result in degraded logic performance or security vulnerabilities.
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-8 pt-12 border-t border-ink/5">
                {[
                  { icon: CheckCircle, text: "Automated Compliance Audits" },
                  { icon: AlertCircle, text: "Priority Support Level: Alpha" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <item.icon className="w-5 h-5 text-brand-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-ink/40">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
