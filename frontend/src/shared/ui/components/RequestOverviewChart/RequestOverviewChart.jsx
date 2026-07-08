import React from 'react';
import Card from '../../Card/Card';
import PieChart from '../../charts/PieChart';

export default function RequestOverviewChart() {
  return (
    <Card hoverGlow={true} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-display font-semibold text-text-base">Outage Priorities</h3>
        <p className="text-xs text-text-muted-base">Ratio of urgent versus routine dispatches</p>
      </div>
      <PieChart data={[33, 33, 34]} labels={['Critical', 'High', 'Medium']} />
    </Card>
  );
}
