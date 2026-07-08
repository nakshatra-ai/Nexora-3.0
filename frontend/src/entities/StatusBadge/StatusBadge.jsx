import React from 'react';

export default function StatusBadge({ type, value }) {
  const getBadgeStyle = () => {
    if (type === 'priority') {
      switch (value) {
        case 'High':
          return 'bg-danger/10 border border-danger/20 text-danger';
        case 'Medium':
          return 'bg-warning/10 border border-warning/20 text-warning';
        case 'Low':
        default:
          return 'bg-success/10 border border-success/20 text-success';
      }
    } else {
      // status badge
      switch (value) {
        case 'Resolved':
          return 'bg-success/15 border border-success/20 text-success';
        case 'In Progress':
          return 'bg-warning/15 border border-warning/20 text-warning';
        case 'Unresolved':
          return 'bg-danger/15 border border-danger/20 text-danger';
        case 'Open':
        default:
          return 'bg-primary/15 border border-primary/20 text-accent';
      }
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getBadgeStyle()}`}>
      {value}
    </span>
  );
}
