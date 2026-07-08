import React from 'react';
import Card from '../../Card/Card';

export default function MissionVision() {
  return (
    <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto select-none font-sans bg-surface-base/50 rounded-3xl border border-border-base my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="flex flex-col gap-3 bg-transparent border-none shadow-none p-0">
          <span className="text-2xl">🎯</span>
          <h3 className="text-xl font-display font-bold text-text-base">Our Mission</h3>
          <p className="text-sm text-text-secondary-base leading-relaxed">
            To provide telecommunication providers with structured, automated ticket-handling systems that optimize engineer work cycles and minimize network downtime.
          </p>
        </Card>

        <Card className="flex flex-col gap-3 bg-transparent border-none shadow-none p-0">
          <span className="text-2xl">👁</span>
          <h3 className="text-xl font-display font-bold text-text-base">Our Vision</h3>
          <p className="text-sm text-text-secondary-base leading-relaxed">
            To shape the future of network maintenance through predictive diagnostics, geolocation-driven field dispatches, and seamless subscriber communication loops.
          </p>
        </Card>
      </div>
    </section>
  );
}
