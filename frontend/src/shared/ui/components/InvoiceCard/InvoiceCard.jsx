import React from 'react';
import Card from '../../Card/Card';
import formatCurrency from '../../../lib/formatCurrency';

export default function InvoiceCard({ title, amount, statusType = 'primary' }) {
  const getBorderColor = () => {
    if (statusType === 'danger') return 'rgba(255, 77, 109, 0.3)';
    if (statusType === 'success') return 'rgba(0, 255, 157, 0.3)';
    return 'var(--border-color)';
  };

  return (
    <Card hoverGlow={true} className="flex flex-col gap-1.5 font-sans select-none" style={{ borderColor: getBorderColor() }}>
      <span className="text-[10px] uppercase font-bold text-text-muted-base tracking-wider">{title}</span>
      <h2 className="text-3xl font-display font-bold text-text-base leading-none mt-1">
        {formatCurrency(amount)}
      </h2>
      <span className="text-[10px] text-text-muted-base">Calculated for active period</span>
    </Card>
  );
}
