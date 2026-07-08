import React from 'react';
import DataTable from '../../tables/DataTable';
import Badge from '../../Badge/Badge';
import formatCurrency from '../../../lib/formatCurrency';
import { FiDownload } from 'react-icons/fi';

export default function InvoiceTable({ invoices = [] }) {
  const headers = ['Invoice ID', 'Date', 'Billing Item', 'Amount', 'Status', 'Download'];

  return (
    <DataTable headers={headers}>
      {invoices.map((inv) => (
        <tr key={inv.id} className="hover:bg-primary-light-base/30 text-xs text-text-secondary-base font-sans">
          <td className="p-4 font-bold text-accent-base">{inv.id}</td>
          <td className="p-4">{inv.date}</td>
          <td className="p-4 font-semibold text-text-base">{inv.service}</td>
          <td className="p-4 font-bold text-text-base">{formatCurrency(inv.amount)}</td>
          <td className="p-4">
            <Badge value={inv.status} type="status" />
          </td>
          <td className="p-4">
            <button className="p-2 hover:bg-input-bg rounded-lg text-text-secondary-base hover:text-primary-base transition-colors cursor-pointer">
              <FiDownload size={14} />
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
