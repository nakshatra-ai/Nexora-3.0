import React from 'react';
import Card from '../../Card/Card';
import { FiFileText } from 'react-icons/fi';

export default function TicketSummaryCard() {
  return (
    <Card className="flex flex-col gap-4 font-sans select-none relative overflow-hidden" hoverGlow={true}>
      <div className="absolute w-[200px] h-[200px] bg-primary-light-base rounded-full filter blur-[60px] pointer-events-none -right-12 -top-12" />

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-light-base flex items-center justify-center text-primary-base">
          <FiFileText size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text-base">Generative Ticket Summarizer</h4>
          <span className="text-[10px] uppercase font-bold text-text-muted-base">Summarizes repair cycles</span>
        </div>
      </div>

      <div className="space-y-3 mt-2 text-xs">
        <div className="bg-surface-base border border-border-base p-3 rounded-lg flex flex-col gap-1">
          <span className="font-bold text-text-base">NXR-2026-124 Summary:</span>
          <p className="text-text-secondary-base leading-relaxed text-[11px]">
            Incident resolved in 34 minutes. Field technician Aman Verma replaced a damaged GPON block in Sector 62. Line telemetry shows signal attenuation returned to -19dBm (standard range).
          </p>
        </div>
      </div>
    </Card>
  );
}
