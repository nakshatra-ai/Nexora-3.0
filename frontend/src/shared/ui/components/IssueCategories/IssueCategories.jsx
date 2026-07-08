import React from 'react';
import Card from '../../Card/Card';

export default function IssueCategories() {
  const categories = [
    { name: 'Fiber Optics', desc: 'Outages, cut cables, GPON sync issues, and slow ONT data line metrics.' },
    { name: 'Cellular Nodes', desc: 'Tower signal loss, poor local coverage, 5G terminal drops, and hardware swaps.' },
    { name: 'Billing & Plan Upgrades', desc: 'Subscriber billing disputes, plan upgrade requests, and rate-limiting reconfigurations.' },
    { name: 'Hardware Setup', desc: 'Gateway replacements, copper cabling line adjustments, and OLT configurations.' }
  ];

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto select-none font-sans">
      <div className="flex flex-col gap-2.5 text-center max-w-lg mx-auto mb-12">
        <span className="text-xs uppercase font-bold tracking-wider text-accent-base">Network Scope</span>
        <h2 className="text-3xl font-display font-bold text-text-base">Outage Ticket Categories</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((c, idx) => (
          <Card key={idx} hoverGlow={true} className="flex items-start gap-4 border border-border-base">
            <span className="text-2xl font-bold text-primary-base">0{idx+1}</span>
            <div className="flex flex-col gap-1.5 min-w-0">
              <h4 className="text-base font-bold text-text-base">{c.name}</h4>
              <p className="text-xs text-text-secondary-base leading-relaxed">{c.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
