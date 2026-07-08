import React from 'react';

export default function LineChart({ data = [30, 45, 35, 60, 40, 75], labels = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'] }) {
  // Construct coordinates for the SVG path
  const width = 500;
  const height = 180;
  const padding = 25;
  
  const maxVal = Math.max(...data, 100);
  const minVal = 0;
  
  const points = data.map((val, idx) => {
    const x = padding + (idx * (width - padding * 2)) / (data.length - 1);
    const y = height - padding - ((val - minVal) * (height - padding * 2)) / (maxVal - minVal);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-48 flex flex-col font-sans select-none">
      <div className="flex-1 w-full relative">
        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            {/* Soft area fill gradient */}
            <linearGradient id="line-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
            </linearGradient>
            
            {/* Glowing path filter */}
            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="var(--primary)" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Grid horizontal ticks */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="5 5" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="5 5" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--border-color)" strokeWidth="1" />

          {/* Area Fill */}
          <path
            d={`M ${padding},${height - padding} L ${points} L ${width - padding},${height - padding} Z`}
            fill="url(#line-area-grad)"
          />

          {/* Core Trend Line with drop glow filter */}
          <polyline
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
            filter="url(#neon-glow)"
          />

          {/* Interactive Node Coordinates dots */}
          {data.map((val, idx) => {
            const x = padding + (idx * (width - padding * 2)) / (data.length - 1);
            const y = height - padding - ((val - minVal) * (height - padding * 2)) / (maxVal - minVal);
            return (
              <g key={idx} className="group cursor-pointer">
                {/* Vertical tick markers */}
                <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-40 group-hover:opacity-80 transition-opacity" />
                <circle cx={x} cy={y} r="5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2" />
                <circle cx={x} cy={y} r="11" fill="var(--accent)" fillOpacity="0.25" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Axis Labels */}
      <div className="flex justify-between items-center px-6 mt-2 text-[10px] uppercase font-bold text-text-muted-base">
        {labels.map((lbl, idx) => (
          <span key={idx}>{lbl}</span>
        ))}
      </div>
    </div>
  );
}
