import React from 'react';
import Card from '../../Card/Card';
import Timeline from '../../Timeline/Timeline';

export default function TasksTimeline({ request }) {
  if (!request) {
    return (
      <Card className="p-6 text-center text-text-muted-base text-xs font-sans">
        Select an assigned request to view details.
      </Card>
    );
  }

  const timelineItems = request.timeline.slice(-2).map((log, idx) => ({
    id: idx,
    type: 'status',
    label: log.label,
    time: log.time.split(',')[1] || log.time
  }));

  return (
    <Card className="flex flex-col gap-4 font-sans select-none">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary-base">Ticket Overview</h3>
      
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] text-text-muted-base uppercase tracking-wider block font-bold">Details</span>
          <p className="bg-input-bg border border-input-border p-3 rounded-lg text-text-secondary-base leading-relaxed text-xs max-h-24 overflow-y-auto">
            {request.description}
          </p>
        </div>

        <div className="border-t border-border-base pt-3 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-text-muted-base">Customer</span>
            <span className="text-text-base font-semibold">{request.customer}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted-base">Location</span>
            <span className="text-text-base font-semibold truncate max-w-[120px]">{request.location}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted-base">Created At</span>
            <span className="text-text-base font-semibold">{request.createdAt}</span>
          </div>
        </div>

        <div className="border-t border-border-base pt-3 space-y-3">
          <span className="text-[10px] text-text-muted-base uppercase tracking-wider block font-bold">Live Status Timeline</span>
          <Timeline items={timelineItems} />
        </div>
      </div>
    </Card>
  );
}
