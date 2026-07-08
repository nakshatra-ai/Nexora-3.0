import React from 'react';
import Card from '../../Card/Card';

export default function ProfileDetails({ user }) {
  const fields = [
    { label: 'Full Name', value: user?.name || '-' },
    { label: 'Email Address', value: user?.email || '-' },
    { label: 'Phone Number', value: user?.phone || '-' },
    { label: 'Registered Role', value: user?.role || '-', isCap: true },
    { label: 'TimeZone', value: 'Asia/Kolkata (IST)' }
  ];

  return (
    <Card className="flex flex-col gap-5 font-sans select-none">
      <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary-base">Account Information</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
        {fields.map((f, idx) => (
          <div key={idx} className="flex flex-col gap-1.5 p-3 rounded-lg bg-input-bg border border-input-border">
            <span className="text-[10px] text-text-muted-base font-bold uppercase tracking-wider">{f.label}</span>
            <span className={`text-text-base font-semibold ${f.isCap ? 'capitalize' : ''}`}>{f.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
