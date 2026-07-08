import React from 'react';
import Card from '../../Card/Card';
import { FiCpu, FiTrendingUp } from 'react-icons/fi';

export default function AIInsights() {
  return (
    <Card className="bg-gradient-to-br from-card-base to-input-bg border border-accent-base/20 relative overflow-hidden" style={{ boxShadow: '0 0 25px var(--accent-glow)' }}>
      <div className="absolute w-[200px] h-[200px] bg-accent-glow-base rounded-full filter blur-[60px] pointer-events-none -right-12 -top-12 animate-pulse" />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-accent-glow-base flex items-center justify-center text-accent-base">
          <FiCpu size={20} className="animate-pulse" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-base font-display font-bold text-text-base">AI Network Insights</h3>
          <span className="text-[10px] uppercase font-bold text-accent-base">Autonomous Dispatcher recommendation</span>
        </div>
      </div>

      <div className="space-y-4 font-sans text-xs">
        <div className="p-3 rounded-lg bg-surface-base border border-border-base flex gap-3">
          <span className="text-base">⚡</span>
          <div>
            <span className="font-bold text-text-base block mb-0.5">Priority Detection:</span>
            <p className="text-text-secondary-base leading-relaxed">
              Ticket NXR-124 identified as <strong className="text-danger-base">Critical</strong> based on description matches for: "fiber cable fire". Priority updated automatically.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-surface-base border border-border-base flex gap-3">
          <span className="text-base">📍</span>
          <div>
            <span className="font-bold text-text-base block mb-0.5">Technician Matching:</span>
            <p className="text-text-secondary-base leading-relaxed">
              Priya Singh recommended for Noida sector 62 fiber repair. Specialty matches "Fiber Splicing" and current location is 1.2km from incident site.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
