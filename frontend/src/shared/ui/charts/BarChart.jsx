import React from 'react';

export default function BarChart({ data = [65, 40, 85, 50, 70], labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }) {
  const maxVal = Math.max(...data, 100);

  return (
    <div className="w-full h-48 flex flex-col font-sans select-none justify-end">
      {/* Bars pane */}
      <div className="flex-1 flex items-end justify-between px-4 pb-2 border-b border-border-base">
        {data.map((val, idx) => {
          const heightPercent = (val / maxVal) * 100;
          return (
            <div key={idx} className="flex flex-col items-center gap-2 group w-full max-w-[32px]">
              {/* Tooltip value */}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-surface-base border border-border-base text-text-base text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                {val}
              </span>
              {/* Bar Fill */}
              <div 
                style={{ height: `${heightPercent}%` }}
                className="w-full rounded-t bg-gradient-to-t from-primary-base to-accent-base group-hover:opacity-90 transition-all duration-300 relative shadow-sm"
              />
            </div>
          );
        })}
      </div>

      {/* X Labels */}
      <div className="flex justify-between items-center px-4 mt-2 text-[10px] uppercase font-bold text-text-muted-base">
        {labels.map((lbl, idx) => (
          <span key={idx} className="w-[32px] text-center">{lbl}</span>
        ))}
      </div>
    </div>
  );
}
