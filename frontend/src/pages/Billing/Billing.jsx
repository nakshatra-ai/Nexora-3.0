import React from 'react';
import InvoiceCard from '../../shared/ui/components/InvoiceCard/InvoiceCard';
import InvoiceTable from '../../shared/ui/components/InvoiceTable/InvoiceTable';
import PaymentStatus from '../../shared/ui/components/PaymentStatus/PaymentStatus';
import { mockInvoices } from '../../shared/lib/mockData';

export default function Billing() {
  return (
    <div className="space-y-6 font-sans select-none">
      {/* 3 Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <InvoiceCard title="Pending Balance" amount={2499} statusType="danger" />
        <InvoiceCard title="Paid Amount (YTD)" amount={3797} statusType="success" />
        <InvoiceCard title="Next Renewal Due" amount={1999} statusType="primary" />
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Invoices table */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base font-display font-semibold text-text-base">Billing History</h3>
            <p className="text-xs text-text-muted-base">Select invoices to download PDF copy</p>
          </div>
          <InvoiceTable invoices={mockInvoices} />
        </div>

        {/* Right card settings */}
        <div className="lg:col-span-4">
          <PaymentStatus />
        </div>
      </div>
    </div>
  );
}
