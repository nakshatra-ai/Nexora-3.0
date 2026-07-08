import React, { useContext } from 'react';
import { AppContext } from '../../../../app/providers/AppContext';
import { Link } from 'react-router-dom';
import Card from '../../Card/Card';
import Timeline from '../../Timeline/Timeline';

export default function RecentRequests() {
  const { recentActivities } = useContext(AppContext);

  const timelineItems = recentActivities.map(act => ({
    id: act.id,
    type: act.type,
    label: act.text,
    time: act.time
  }));

  return (
    <Card className="flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base font-display font-semibold text-text-base">Recent Activity</h3>
            <p className="text-xs text-text-muted-base font-sans">Real-time network events log</p>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-accent-base border border-accent-base/20 bg-accent-glow-base px-2.5 py-0.5 rounded">
            Live Feed
          </span>
        </div>

        <Timeline items={timelineItems} />
      </div>

      <div className="mt-8 pt-4 border-t border-border-base">
        <Link to="/requests" className="text-xs text-primary-base hover:text-accent-base transition-colors font-sans font-semibold">
          View all service requests &rarr;
        </Link>
      </div>
    </Card>
  );
}
