import React, { useContext } from 'react';
import { AppContext } from '../../../../app/providers/AppContext';
import { Link } from 'react-router-dom';
import Card from '../../Card/Card';
import { motion } from 'framer-motion';

export default function EngineerLeaderboard() {
  const { engineers } = useContext(AppContext);
  const barColors = ['bg-primary-base', 'bg-accent-base', 'bg-warning-base', 'bg-success-base'];

  return (
    <Card className="flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base font-display font-semibold text-text-base">Field Engineers Workload</h3>
            <p className="text-xs text-text-muted-base font-sans">Active ticket allocation per engineer</p>
          </div>
          <Link to="/engineers" className="text-xs text-accent-base hover:underline font-sans font-semibold">
            View All
          </Link>
        </div>

        <div className="space-y-5">
          {engineers.map((engineer, idx) => {
            const maxWorkload = 6;
            const percent = Math.min(100, (engineer.workload / maxWorkload) * 100);
            const colorClass = barColors[idx % barColors.length];

            return (
              <div key={engineer.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-input-bg border border-input-border flex items-center justify-center text-text-base text-xs font-bold font-sans">
                      {engineer.avatar}
                    </div>
                    <span className="text-sm font-semibold text-text-base font-sans">
                      {engineer.name}
                    </span>
                  </div>

                  <span className="text-xs font-sans text-text-secondary-base">
                    <strong className="text-text-base">{engineer.workload}</strong> Tickets
                  </span>
                </div>

                <div className="w-full h-1.5 bg-input-bg rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${colorClass}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-border-base text-xs text-text-muted-base font-sans">
        Total active workforce: <strong className="text-text-base">{engineers.length} Engineers</strong>
      </div>
    </Card>
  );
}
