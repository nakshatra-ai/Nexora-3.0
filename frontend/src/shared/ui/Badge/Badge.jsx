import React from 'react';
import priorityColor from '../../lib/priorityColor';
import statusColor from '../../lib/statusColor';

export default function Badge({ value, type = 'status' }) {
  const getColorScheme = () => {
    if (type === 'priority') {
      return priorityColor(value);
    }
    return statusColor(value);
  };

  const scheme = getColorScheme();

  return (
    <span
      style={{
        backgroundColor: scheme.bg,
        color: scheme.text,
        borderColor: scheme.border
      }}
      className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border tracking-wide uppercase font-sans select-none"
    >
      {value}
    </span>
  );
}
