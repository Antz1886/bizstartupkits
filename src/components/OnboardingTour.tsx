import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Info, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface Step {
  targetId: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const TOUR_STEPS: Step[] = [
  {
    targetId: 'hero-start',
    title: 'Welcome to the Future',
    content: 'BIZSTARTUP KIT is your strategic partner in digital transformation. We build the technical leverage SMEs need to dominate.',
    position: 'bottom',
  },
  {
    targetId: 'ai-showcase',
    title: 'Engineered Intelligence',
    content: 'Explore our dynamic AI showcase. From intelligent automation to predictive modeling, we build systems that see what others miss.',
    position: 'top',
  },
  {
    targetId: 'ai-suite',
    title: 'The AI Suite',
    content: 'This is your core engine. Generative AI, Algorithmic BI, and Cognitive Flows—all integrated seamlessly into your workflow.',
    position: 'top',
  },
  {
    targetId: 'impact-cases',
    title: 'Real Impact',
    content: 'See exactly how we have transformed Sales and Financial systems for our partners. Tangible results, engineered to scale.',
    position: 'bottom',
  },
  {
    targetId: 'cta-acquire',
    title: 'Your Protocol Starts Here',
    content: 'Ready to transition? Acquire the Growth Kit and launch your enterprise into the next generation of SME excellence.',
    position: 'top',
  }
];

export const OnboardingTour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('bizstartup_tour_seen');
    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      const target = document.getElementById(TOUR_STEPS[currentStep].targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isVisible, currentStep]);

  const updatePosition = () => {
    if (!isVisible) return;
    const step = TOUR_STEPS[currentStep];
    const target = document.getElementById(step.targetId);
    
    if (target) {
      const rect = target.getBoundingClientRect();
      const scrollY = window.scrollY;
      
      let top = 0;
      let left = 0;

      switch(step.position) {
        case 'bottom':
          top = rect.bottom + 20 + scrollY;
          left = rect.left + rect.width / 2;
          break;
        case 'top':
          top = rect.top - 220 + scrollY;
          left = rect.left + rect.width / 2;
          break;
        case 'center':
          top = rect.top + rect.height / 2 + scrollY;
          left = rect.left + rect.width / 2;
          break;
        default:
          top = rect.bottom + 20 + scrollY;
          left = rect.left + rect.width / 2;
      }

      setTooltipPos({ top, left });
    }
  };

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTour();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeTour = () => {
    setIsVisible(false);
    localStorage.setItem('bizstartup_tour_seen', 'true');
  };

  const skipTour = () => {
    setIsVisible(false);
    localStorage.setItem('bizstartup_tour_seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{
          background: 'rgba(0,0,0,0.1)',
          backdropFilter: 'blur(2px)'
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
           key={currentStep}
           initial={{ opacity: 0, y: 10, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           exit={{ opacity: 0, y: -10, scale: 0.95 }}
           className="absolute z-[110] w-full max-w-[320px] -translate-x-1/2"
           style={{ top: tooltipPos.top, left: tooltipPos.left }}
        >
          <div className="bg-white p-8 rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border border-ink/10 relative">
             {/* Indicator */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 border-l border-t border-ink/10" />

             <div className="flex justify-between items-start mb-6">
                <div className="p-2 rounded-lg bg-brand-primary/10">
                   <Sparkles className="w-5 h-5 text-brand-primary" />
                </div>
                <button onClick={skipTour} className="text-ink/20 hover:text-brand-primary transition-colors">
                   <X className="w-5 h-5" />
                </button>
             </div>

             <h4 className="text-sm font-black uppercase tracking-[0.2em] text-brand-secondary mb-3">
                {TOUR_STEPS[currentStep].title}
             </h4>
             <p className="text-xs text-ink/60 leading-relaxed font-medium mb-8">
                {TOUR_STEPS[currentStep].content}
             </p>

             <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                   {TOUR_STEPS.map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "h-1 rounded-full transition-all duration-300",
                          i === currentStep ? "w-4 bg-brand-primary" : "w-1 bg-ink/10"
                        )} 
                      />
                   ))}
                </div>

                <div className="flex gap-3">
                   {currentStep > 0 && (
                      <button 
                        onClick={handlePrev}
                        className="p-3 rounded-xl border border-ink/10 hover:border-brand-primary transition-colors"
                      >
                         <ChevronLeft className="w-4 h-4 text-brand-secondary" />
                      </button>
                   )}
                   <button 
                    onClick={handleNext}
                    className="flex items-center gap-2 py-3 px-6 rounded-xl bg-brand-secondary text-white text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary transition-all shadow-lg"
                   >
                      {currentStep === TOUR_STEPS.length - 1 ? 'Complete' : 'Next'}
                      <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
             </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pulse Beacon for target (optional visual cue) */}
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute z-[105] pointer-events-none w-8 h-8 rounded-full bg-brand-primary/30 -translate-x-1/2 -translate-y-1/2"
        style={{ 
          top: tooltipPos.top + (TOUR_STEPS[currentStep].position === 'bottom' ? -40 : 240), 
          left: tooltipPos.left 
        }}
      />
    </>
  );
};
