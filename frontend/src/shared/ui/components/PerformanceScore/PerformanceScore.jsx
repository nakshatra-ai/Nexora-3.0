import React from 'react';

export default function PerformanceScore({ stats = { open: 0, inProgress: 0, resolved: 0 } }) {
  return (
    <div className="flex items-center gap-4 select-none font-sans">
      <div className="bg-input-bg border border-input-border rounded-xl px-4 py-2 flex items-center gap-3">
        <span className="text-2xl font-bold text-accent-base">{stats.open}</span>
        <span className="text-[10px] uppercase font-semibold text-text-muted-base tracking-wider">Open</span>
      </div>
      <div className="bg-input-bg border border-input-border rounded-xl px-4 py-2 flex items-center gap-3">
        <span className="text-2xl font-bold text-warning-base">{stats.inProgress}</span>
        <span className="text-[10px] uppercase font-semibold text-text-muted-base tracking-wider">Active</span>
      </div>
      <div className="bg-input-bg border border-input-border rounded-xl px-4 py-2 flex items-center gap-3">
        <span className="text-2xl font-bold text-success-base">{stats.resolved}</span>
        <span className="text-[10px] uppercase font-semibold text-text-muted-base tracking-wider">Resolved</span>
      </div>
    </div>
  );
}
