import React from 'react';
import Card from '../../Card/Card';

export default function PaymentStatus() {
  return (
    <Card className="flex flex-col gap-4 font-sans select-none">
      <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary-base">Payment Method</h4>
      
      <div className="flex flex-col gap-3">
        <div className="p-4 rounded-xl border border-border-base bg-surface-base flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-6 bg-primary-base rounded-md flex items-center justify-center text-[10px] text-white font-bold tracking-wider select-none">
              VISA
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-text-base">Visa ending in 4242</span>
              <span className="text-[10px] text-text-muted-base">Expiry: 12/2029</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-success-base bg-success-light-base px-2 py-0.5 rounded border border-success-base/20">Active</span>
        </div>

        <div className="p-4 rounded-xl border border-border-base bg-surface-base flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-6 bg-[#eb001b] rounded-md flex items-center justify-center text-[10px] text-white font-bold tracking-wider select-none">
              MC
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-text-base">MasterCard ending in 8899</span>
              <span className="text-[10px] text-text-muted-base">Expiry: 08/2027</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-text-muted-base bg-input-bg px-2 py-0.5 rounded border border-input-border">Backup</span>
        </div>
      </div>
    </Card>
  );
}
