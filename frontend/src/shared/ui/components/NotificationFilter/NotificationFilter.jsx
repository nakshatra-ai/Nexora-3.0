import React from 'react';

export default function NotificationFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { value: 'all', label: 'All Alerts' },
    { value: 'unread', label: 'Unread' },
    { value: 'billing', label: 'Billing' },
    { value: 'status', label: 'Ticket Updates' }
  ];

  return (
    <div className="flex items-center gap-2 select-none font-sans overflow-x-auto pb-1">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            currentFilter === f.value
              ? 'bg-primary-light-base border-primary-base text-primary-base shadow-sm'
              : 'bg-input-bg border-input-border text-text-secondary-base hover:text-text-base'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
