import React, { useState } from 'react';
import Card from '../../Card/Card';

export default function NotificationSettings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <Card className="flex flex-col gap-4 font-sans select-none">
      <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary-base">Alert Configurations</h4>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 py-1.5">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-text-base">Email Updates</span>
            <span className="text-[10px] text-text-muted-base">Receive ticket logs in your mail index</span>
          </div>
          <input 
            type="checkbox" 
            checked={emailAlerts} 
            onChange={() => setEmailAlerts(!emailAlerts)} 
            className="w-4 h-4 rounded border-border-base cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between gap-4 py-1.5 border-t border-border-color">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-text-base">SMS Outage Signals</span>
            <span className="text-[10px] text-text-muted-base">Get field engineer assignment messages</span>
          </div>
          <input 
            type="checkbox" 
            checked={smsAlerts} 
            onChange={() => setSmsAlerts(!smsAlerts)} 
            className="w-4 h-4 rounded border-border-base cursor-pointer"
          />
        </div>
      </div>
    </Card>
  );
}
