import React from 'react';
import Card from '../../Card/Card';
import { motion } from 'framer-motion';

export default function Workflow() {
  const steps = [
    { step: '01', title: 'Submit Request', desc: 'Customer describes the issue on the platform.' },
    { step: '02', title: 'AI Priority Scan', desc: 'NLP scans keywords and determines ticket urgency.' },
    { step: '03', title: 'Admin Dispatch', desc: 'Admin reviews and assigns available local engineer.' },
    { step: '04', title: 'Engineer Resolve', desc: 'Technician travels to site and logs resolution notes.' }
  ];

  return (
    <section id="workflow" className="py-24 px-6 md:px-12 max-w-7xl mx-auto select-none font-sans relative">
      <div className="flex flex-col gap-2.5 text-center max-w-lg mx-auto mb-16 relative z-10">
        <span className="text-xs uppercase font-bold tracking-wider text-accent-base">Process Flow</span>
        <h2 className="text-3xl font-display font-bold text-text-base">How NEXORA Works</h2>
        <p className="text-xs text-text-muted-base">The automated sequence resolving your network tickets.</p>
      </div>

      <div className="relative w-full">
        {/* Continuous animated pipeline wireframe behind cards (visible on desktop) */}
        <div className="hidden lg:block absolute left-12 right-12 top-[35%] -translate-y-1/2 h-[2px] bg-border-color z-0 overflow-hidden">
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-primary-base to-accent-base"
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {steps.map((st, idx) => (
            <Card 
              key={idx} 
              hoverGlow={true} 
              className="flex flex-col gap-4 relative bg-card-base/55 border border-border-base rounded-2xl p-6 backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-accent-base bg-accent-glow-base px-2.5 py-1 rounded border border-accent-base/15">
                  Step {st.step}
                </span>
                {/* Visual index circle */}
                <div className="w-8 h-8 rounded-full bg-input-bg border border-input-border flex items-center justify-center text-text-muted-base text-xs font-bold">
                  {st.step}
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5 mt-2">
                <h4 className="text-base font-bold text-text-base relative z-10">{st.title}</h4>
                <p className="text-xs text-text-secondary-base leading-relaxed relative z-10">{st.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
