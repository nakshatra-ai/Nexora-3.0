import React from 'react';
import Card from '../../Card/Card';
import { FiActivity } from 'react-icons/fi';

export default function DashboardInsightCard() {
  return (
    <Card className="flex flex-col gap-4 font-sans select-none relative overflow-hidden" hoverGlow={true}>
      <div className="absolute w-[200px] h-[200px] bg-accent-glow-base rounded-full filter blur-[60px] pointer-events-none -right-12 -top-12" />

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent-glow-base flex items-center justify-center text-accent-base">
          <FiActivity size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text-base">Autonomous Bandwidth Warning</h4>
          <span className="text-[10px] uppercase font-bold text-text-muted-base">Telemetry analysis</span>
        </div>
      </div>

      <div className="space-y-3 mt-2 text-xs">
        <div className="bg-surface-base border border-border-base p-3 rounded-lg flex flex-col gap-1">
          <span className="font-bold text-text-base">Noida Sector 62 Gateway Node:</span>
          <p className="text-text-secondary-base leading-relaxed text-[11px]">
            Ping spikes of 45ms recorded at Noida OLT gateway. Workloads dispatched autonomously to check local fiber splitter block for structural dust ingress.
          </p>
        </div>
      </div>
    </Card>
  );
}
