import React from 'react';

export default function AreaChart({ data = [20, 30, 45, 30, 55, 70, 60], labels = ['May 1', 'May 5', 'May 10', 'May 15', 'May 20', 'May 25', 'May 30'] }) {
  const width = 500;
  const height = 180;
  const padding = 20;

  const maxVal = Math.max(...data, 100);
  
  const points = data.map((val, idx) => {
    const x = padding + (idx * (width - padding * 2)) / (data.length - 1);
    const y = height - padding - (val * (height - padding * 2)) / maxVal;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-48 flex flex-col font-sans select-none">
      <div className="flex-1 w-full relative">
        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Fill shape */}
          <path
            d={`M ${padding},${height - padding} L ${points} L ${width - padding},${height - padding} Z`}
            fill="url(#area-gradient)"
          />
          {/* Line shape */}
          <polyline
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>

      {/* Axis Labels */}
      <div className="flex justify-between items-center px-4 mt-1 text-[10px] uppercase font-bold text-text-muted-base">
        {labels.map((lbl, idx) => (
          <span key={idx}>{lbl}</span>
        ))}
      </div>
    </div>
  );
}
