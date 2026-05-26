import { useState, useEffect } from 'react';

interface TourStep {
  icon: string;
  title: string;
  description: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    icon: '🛡️',
    title: 'SA Compliance Portal',
    description:
      'Access your B-BBEE scorecard, ESD tracking, and POPIA audit logs — all in one place, fully aligned with 2026 regulations.',
  },
  {
    icon: '🤖',
    title: 'AgentMesh™ AI Workforce',
    description:
      'Six specialised AI agents (Apex, Nova, Scribe, Vanguard, Ledger, Seeker) resolve tasks autonomously at 83%+ resolution rates.',
  },
  {
    icon: '📊',
    title: 'Corporate ESD Dashboard',
    description:
      'Real-time beneficiary spend tracking, audit-ready reports, and turnover threshold alerts for corporate ESD managers.',
  },
  {
    icon: '🚀',
    title: 'SME Growth Hub',
    description:
      'Logo builder, website generator, SEO tools, and expense manager — everything an SME needs to scale fast.',
  },
];

const STORAGE_KEY = 'bsk_onboarding_seen';

export function OnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
      localStorage.setItem(STORAGE_KEY, 'true');
    }, 350);
  };

  const next = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  if (!visible) return null;

  const current = TOUR_STEPS[step];
  const isLast = step === TOUR_STEPS.length - 1;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(6px)',
          zIndex: 9998,
          opacity: exiting ? 0 : 1,
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Welcome tour"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: exiting
            ? 'translate(-50%, -48%) scale(0.96)'
            : 'translate(-50%, -50%) scale(1)',
          opacity: exiting ? 0 : 1,
          transition: 'transform 0.35s ease, opacity 0.35s ease',
          zIndex: 9999,
          width: '90vw',
          maxWidth: '480px',
          background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
          border: '1px solid rgba(99,102,241,0.35)',
          borderRadius: '20px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.15)',
          padding: '40px 36px 32px',
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          color: '#f1f5f9',
        }}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Close tour"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.06)',
            border: 'none',
            color: '#94a3b8',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              'rgba(255,255,255,0.12)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              'rgba(255,255,255,0.06)')
          }
        >
          ✕
        </button>

        {/* Step badge */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              background: 'rgba(99,102,241,0.2)',
              color: '#818cf8',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '3px 10px',
              borderRadius: '20px',
              border: '1px solid rgba(99,102,241,0.3)',
              textTransform: 'uppercase',
            }}
          >
            {step + 1} of {TOUR_STEPS.length}
          </span>
          <span style={{ color: '#475569', fontSize: '12px' }}>Quick tour</span>
        </div>

        {/* Icon */}
        <div
          style={{
            fontSize: '52px',
            marginBottom: '20px',
            lineHeight: 1,
            filter: 'drop-shadow(0 4px 12px rgba(99,102,241,0.4))',
          }}
        >
          {current.icon}
        </div>

        {/* Content */}
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 700,
            marginBottom: '12px',
            background: 'linear-gradient(135deg, #e2e8f0, #818cf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.3,
          }}
        >
          {current.title}
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#94a3b8', marginBottom: '32px' }}>
          {current.description}
        </p>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '28px' }}>
          {TOUR_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-label={`Go to step ${i + 1}`}
              style={{
                width: i === step ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === step ? '#6366f1' : 'rgba(99,102,241,0.25)',
                border: 'none',
                cursor: 'pointer',
                transition: 'width 0.3s ease, background 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {step > 0 && (
            <button
              onClick={prev}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid rgba(99,102,241,0.3)',
                background: 'transparent',
                color: '#94a3b8',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#6366f1';
                (e.currentTarget as HTMLButtonElement).style.color = '#e2e8f0';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  'rgba(99,102,241,0.3)';
                (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8';
              }}
            >
              ← Back
            </button>
          )}
          <button
            id={`onboarding-tour-${isLast ? 'finish' : 'next'}`}
            onClick={next}
            style={{
              flex: 2,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 8px 24px rgba(99,102,241,0.55)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 4px 16px rgba(99,102,241,0.4)';
            }}
          >
            {isLast ? 'Get Started →' : 'Next →'}
          </button>
        </div>

        {/* Skip link */}
        {!isLast && (
          <button
            onClick={dismiss}
            style={{
              display: 'block',
              margin: '16px auto 0',
              background: 'none',
              border: 'none',
              color: '#475569',
              fontSize: '13px',
              cursor: 'pointer',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(71,85,105,0.4)',
            }}
          >
            Skip tour
          </button>
        )}
      </div>
    </>
  );
}
