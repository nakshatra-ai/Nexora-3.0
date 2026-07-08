import React from 'react';

export default function DataTable({ headers = [], children, className = '' }) {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-border-base bg-card-base font-sans select-none ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border-base bg-surface-base">
            {headers.map((h, idx) => (
              <th key={idx} className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted-base">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-color">
          {children}
        </tbody>
      </table>
    </div>
  );
}
