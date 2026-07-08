import React from 'react';
import Card from '../../Card/Card';

export default function WhyChooseUs() {
  const reasons = [
    { title: 'SLA Monitoring', desc: 'Continuous uptime tracking maps response alerts automatically.' },
    { title: 'Intelligent Dispatching', desc: 'Technician scheduling matches proximity and current workload.' },
    { title: 'NLP Priority Detection', desc: 'Automatically parses user descriptions to calculate urgency scores.' },
    { title: 'Secure API base', desc: 'Stateless JWT checkpoints filter endpoint data operations.' }
  ];

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto select-none font-sans">
      <div className="flex flex-col gap-2.5 text-center max-w-lg mx-auto mb-12">
        <span className="text-xs uppercase font-bold tracking-wider text-accent-base">Why Nexora</span>
        <h2 className="text-3xl font-display font-bold text-text-base">Designed for Modern Networks</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r, idx) => (
          <Card key={idx} hoverGlow={true} className="flex flex-col gap-3">
            <span className="text-xl font-bold text-primary-base">0{idx+1}</span>
            <h4 className="text-base font-bold text-text-base">{r.title}</h4>
            <p className="text-xs text-text-secondary-base leading-relaxed">{r.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
