import React from 'react';
import { FiCheckCircle, FiClock, FiPlus, FiTool } from 'react-icons/fi';

export default function Timeline({ items = [] }) {
  const getIcon = (type) => {
    switch (type) {
      case 'created': return <FiPlus className="text-warning" />;
      case 'assigned': return <FiTool className="text-primary" />;
      case 'status': return <FiClock className="text-accent" />;
      case 'resolved': return <FiCheckCircle className="text-success" />;
      default: return <FiClock className="text-text-muted-base" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-border-base">
      {items.map((item, idx) => (
        <div key={item.id || idx} className="relative flex flex-col gap-1.5 font-sans">
          {/* Bullet Dot Icon */}
          <div className="absolute -left-[27px] top-1.5 w-6 h-6 rounded-full bg-surface-base border border-border-base flex items-center justify-center text-xs">
            {getIcon(item.type)}
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <span className="font-semibold text-text-base text-sm leading-tight">{item.label}</span>
            <span className="text-[10px] text-text-muted-base font-bold whitespace-nowrap">{item.time}</span>
          </div>
          {item.details && (
            <p className="text-xs text-text-secondary-base leading-relaxed">{item.details}</p>
          )}
        </div>
      ))}
    </div>
  );
}
