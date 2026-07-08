import React, { useContext } from 'react';
import { AppContext } from '../../app/providers/AppContext';
import { motion } from 'framer-motion';
import './Engineers.css';

export default function Engineers() {
  const { engineers, requests } = useContext(AppContext);

  return (
    <div className="space-y-6 select-none font-sans">
      <div className="bg-card-base border border-border-base rounded-2xl p-6 backdrop-blur-md">
        <h3 className="text-base font-display font-semibold text-text-base mb-2">
          Operations Team Workload
        </h3>
        <p className="text-xs text-text-secondary-base mb-6">
          Real-time availability and ticket allocation for field engineers
        </p>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {engineers.map((eng, idx) => {
            const activeTickets = requests.filter(r => r.assignedEngineer === eng.name && r.status !== 'Resolved');
            const resolvedTickets = requests.filter(r => r.assignedEngineer === eng.name && r.status === 'Resolved');
 
            return (
              <motion.div
                key={eng.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card-base border border-border-base p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary-base to-accent-base flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                      {eng.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-base">{eng.name}</h4>
                      <span className="text-[10px] text-accent-base font-semibold uppercase tracking-wider">
                        Field Engineer
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 bg-success-base/15 border border-success-base/20 text-success-base text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-base animate-pulse" />
                    Available
                  </span>
                </div>
 
                <div className="my-6 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary-base">Active Workload</span>
                    <span className="text-text-base font-semibold">{eng.workload} active tickets</span>
                  </div>
                  <div className="w-full h-2 bg-[#050816] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-base to-accent-base rounded-full"
                      style={{ width: `${Math.min(100, (eng.workload / 6) * 100)}%` }}
                    />
                  </div>
                </div>
 
                <div className="grid grid-cols-3 gap-3 text-center border-t border-border-base/50 pt-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-text-secondary-base font-semibold uppercase tracking-wider block">Total Work</span>
                    <strong className="text-sm text-text-base">{activeTickets.length + resolvedTickets.length}</strong>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-text-secondary-base font-semibold uppercase tracking-wider block">Active</span>
                    <strong className="text-sm text-warning-base">{activeTickets.length}</strong>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-text-secondary-base font-semibold uppercase tracking-wider block">Resolved</span>
                    <strong className="text-sm text-success-base">{resolvedTickets.length}</strong>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
