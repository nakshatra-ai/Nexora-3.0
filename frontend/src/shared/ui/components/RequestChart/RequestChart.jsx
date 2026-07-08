import React from 'react';
import Card from '../../Card/Card';
import BarChart from '../../charts/BarChart';

export default function RequestChart() {
  return (
    <Card hoverGlow={true} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-display font-semibold text-text-base">Request Categories Distribution</h3>
        <p className="text-xs text-text-muted-base">Outage breakdowns per category</p>
      </div>
      <BarChart data={[65, 45, 80, 30, 55]} labels={['Fiber', 'Cellular', 'Billing', 'Hardware', 'Other']} />
    </Card>
  );
}
