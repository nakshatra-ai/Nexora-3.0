import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ label, value, change, trend, icon: Icon, color, sparkline }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white/5 border border-white/5 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md"
    >
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <span className="text-secondary-text text-xs font-semibold block uppercase tracking-wider font-sans">
            {label}
          </span>
          <span className="text-3xl font-display font-bold text-white block">
            {value}
          </span>
        </div>
        
        <div className={`p-2.5 rounded-xl bg-white/3 border border-white/5 ${color}`}>
          {Icon && <Icon size={18} />}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-6">
        <span className={`text-xs font-bold font-sans flex items-center gap-1 ${
          trend === 'up' ? 'text-success' : 'text-danger'
        }`}>
          {change}
          <span className="text-[10px] text-secondary-text font-normal font-sans">
            from last 7 days
          </span>
        </span>
        
        <div>
          {sparkline}
        </div>
      </div>

      {/* Underline accent */}
      <span className={`absolute bottom-0 inset-x-0 h-[2px] opacity-20 bg-current ${color}`} />
    </motion.div>
  );
}
