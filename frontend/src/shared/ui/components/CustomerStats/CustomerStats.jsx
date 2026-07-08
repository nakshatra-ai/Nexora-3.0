import React, { useContext } from 'react';
import { AppContext } from '../../../../app/providers/AppContext';
import { FiAlertCircle, FiCheckCircle, FiCreditCard } from 'react-icons/fi';
import StatCard from '../../StatCard/StatCard';

export default function CustomerStats() {
  const { requests } = useContext(AppContext);

  const activeCount = requests.filter(r => r.status !== 'Resolved').length;
  const completedCount = requests.filter(r => r.status === 'Resolved').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <StatCard
        title="Active Service Requests"
        value={activeCount}
        icon={FiAlertCircle}
        statusType="warning"
      />
      <StatCard
        title="Completed Requests"
        value={completedCount}
        icon={FiCheckCircle}
        statusType="success"
      />
      <StatCard
        title="Pending Invoice Dues"
        value="₹2,499"
        icon={FiCreditCard}
        statusType="danger"
      />
    </div>
  );
}
