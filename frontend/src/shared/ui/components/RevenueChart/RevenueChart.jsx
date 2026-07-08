import React from 'react';
import Card from '../../Card/Card';
import AreaChart from '../../charts/AreaChart';

export default function RevenueChart() {
  return (
    <Card hoverGlow={true} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-display font-semibold text-text-base">Operations Revenue</h3>
        <p className="text-xs text-text-muted-base">Weekly billing aggregates in INR</p>
      </div>
      <AreaChart data={[30, 45, 35, 60, 40, 75, 90]} labels={['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']} />
    </Card>
  );
}
