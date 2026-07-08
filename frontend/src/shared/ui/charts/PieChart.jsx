import React from 'react';

export default function PieChart({ data = [45, 30, 25], labels = ['High', 'Medium', 'Low'], colors = ['var(--danger)', 'var(--warning)', 'var(--success)'] }) {
  const total = data.reduce((acc, v) => acc + v, 0);
  
  // Calculate segments for SVG strokeDasharray
  let accumulatedPercent = 0;
  
  const segments = data.map((val, idx) => {
    const percent = (val / total) * 100;
    const dashArray = `${percent} ${100 - percent}`;
    const dashOffset = 100 - accumulatedPercent + 25; // start at top 12 o'clock
    accumulatedPercent += percent;
    return {
      dashArray,
      dashOffset,
      color: colors[idx]
    };
  });

  return (
    <div className="flex items-center justify-between gap-6 font-sans select-none w-full">
      {/* Circle Donut representation */}
      <div className="w-32 h-32 relative">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          {/* Base circle */}
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="var(--border-color)" strokeWidth="3" />
          
          {/* Colored dash offsets */}
          {segments.map((seg, idx) => (
            <circle
              key={idx}
              cx="18"
              cy="18"
              r="15.915"
              fill="transparent"
              stroke={seg.color}
              strokeWidth="4"
              strokeDasharray={seg.dashArray}
              strokeDashoffset={seg.dashOffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase font-bold text-text-muted-base">Total</span>
          <span className="text-xl font-display font-bold text-text-base leading-none mt-0.5">{total}%</span>
        </div>
      </div>

      {/* Legend list */}
      <div className="flex-1 flex flex-col gap-2">
        {labels.map((lbl, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: colors[idx] }} />
              <span className="text-text-secondary-base">{lbl}</span>
            </div>
            <span className="text-text-base font-bold">{data[idx]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
