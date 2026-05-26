import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { motion } from 'motion/react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-40">
      <section className="px-10 pb-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-8">Legal Framework</div>
            <h1 className="text-6xl md:text-8xl leading-tight mb-12 tracking-tighter text-brand-secondary uppercase font-black">
              Privacy <br /> <span className="text-gradient">Policy.</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-ink/60 space-y-12 font-medium leading-relaxed">
              <div className="p-8 bg-bg-dark border border-ink/5 rounded-xl">
                <div className="flex gap-4 items-center mb-6">
                  <Shield className="w-6 h-6 text-brand-primary" />
                  <h2 className="text-2xl font-black text-brand-secondary m-0">Data Sovereignty</h2>
                </div>
                <p>
                  At BIZSTARTUP KIT, we treat your business data as a sovereign asset. Unlike generic AI platforms, we do not use your proprietary business logic, datasets, or interaction history to train global models. Your data remains isolated within your specific enterprise node.
                </p>
              </div>

              <section>
                <h3 className="text-xl font-black text-brand-secondary uppercase tracking-tight mb-6">1. Data Collection Protocols</h3>
                <p>
                  We collect minimal data necessary for service optimization. This includes system health metrics, authentication logs, and specific input parameters required for your AI models to function. We do not engage in behavioral tracking or third-party data brokerage.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black text-brand-secondary uppercase tracking-tight mb-6">2. Infrastructure Security</h3>
                <p>
                  All data transmissions are encrypted using enterprise-grade protocols. Our "Private Node" architecture ensures that high-fidelity logic execution happens within your designated security perimeter, minimizing the attack surface.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black text-brand-secondary uppercase tracking-tight mb-6">3. Your Rights</h3>
                <p>
                  Under our "Crystalline Transparency" protocol, you have the right to request a full audit of the data we process. You may also request the complete purging of your data silos at any time, subject to operational requirements.
                </p>
              </section>

              <div className="flex gap-6 items-center pt-12 border-t border-ink/5">
                <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-bg-dark flex items-center justify-center shadow-lg">
                      <Lock className="w-5 h-5 text-brand-primary" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-black uppercase tracking-widest text-ink/40">Secured by BIZSTARTUP Integrity Protocol</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
