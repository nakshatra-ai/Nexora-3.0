import React from 'react';
import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ message = 'No data available', description = 'Try checking your search filters or add new entries.' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-border-base bg-card-base font-sans select-none w-full">
      <div className="w-12 h-12 rounded-xl bg-input-bg border border-input-border flex items-center justify-center text-text-muted-base mb-4">
        <FiInbox size={24} />
      </div>
      <h3 className="text-sm font-bold text-text-base mb-1">{message}</h3>
      <p className="text-xs text-text-muted-base max-w-xs">{description}</p>
    </div>
  );
}
