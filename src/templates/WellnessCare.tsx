import React from 'react';
import { motion } from 'motion/react';
import { Activity, Users, Calendar, Heart, Volume2, ShieldCheck } from 'lucide-react';

const CarePulse = ({ label, percentage }: { label: string, percentage: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
        <span>{label}</span>
        <span className="text-brand-primary">{percentage}%</span>
    </div>
    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-full bg-gradient-to-r from-brand-primary/40 to-brand-primary"
        />
    </div>
  </div>
);

export default function WellnessCare() {
  return (
    <div className="min-h-screen bg-bg-dark pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-4xl mx-auto mb-24">
            <div className="inline-flex items-center gap-3 mb-8 bg-brand-primary/10 px-4 py-2 rounded-full border border-brand-primary/20">
                <Heart className="w-4 h-4 text-brand-primary" />
                <div className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-primary">Clinic Booking & Admin Assistant</div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-10 leading-[0.85]">
                Human Care. <br /> <span className="text-gradient">Automated</span> <br /> Scheduling.
            </h1>
            <p className="text-xl md:text-2xl text-white/40 font-medium max-w-2xl mx-auto leading-relaxed">
                Automate the patient booking journey for busy medical and wellness clinics. Deploy digital receptionists that handle bookings and answer FAQs 24/7.
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <div className="p-12 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8">
                    <Activity className="w-8 h-8 text-brand-primary/20 group-hover:text-brand-primary transition-colors" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase mb-8">Patient Capacity</h3>
                <div className="space-y-8">
                    <CarePulse label="Automated Bookings" percentage={84} />
                    <CarePulse label="No-Show Protection" percentage={92} />
                    <CarePulse label="Booking Accuracy" percentage={83} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                {[
                    { title: "Voice Booking Notes", icon: Volume2, desc: "Process booking requests sent via WhatsApp voice notes." },
                    { title: "Calendar Sync", icon: Calendar, desc: "Automatically book slots into Google Calendar or Outlook, and send reminders." },
                    { title: "Patient Records Sync", icon: Users, desc: "Save patient details securely to clinic databases or spreadsheets." },
                    { title: "POPIA Compliance", icon: ShieldCheck, desc: "POPIA-compliant data security for patient information." }
                ].map((item, i) => (
                    <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-xl hover:border-brand-primary transition-all group">
                        <item.icon className="w-6 h-6 text-brand-primary mb-6 group-hover:scale-110 transition-transform" />
                        <h4 className="text-lg font-black text-white uppercase mb-2">{item.title}</h4>
                        <p className="text-xs text-white/30 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="border-t border-white/5 pt-20 flex flex-col items-center">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-10">Automated Free Pilot Setup</div>
            <div className="flex flex-wrap justify-center gap-12">
                <button className="btn-primary group">
                    <span className="flex items-center gap-3">Start Your Free Pilot <Calendar className="w-4 h-4" /></span>
                </button>
                <button className="btn-outline text-white hover:text-brand-primary">
                    Request Setup Consultation
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
