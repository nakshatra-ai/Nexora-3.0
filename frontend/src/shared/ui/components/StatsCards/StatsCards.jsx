import React, { useContext } from 'react';
import { AppContext } from '../../../../app/providers/AppContext';
import { FiAlertCircle, FiClock, FiCheckCircle, FiFileText } from 'react-icons/fi';
import StatCard from '../../StatCard/StatCard';

export default function StatsCards() {
  const { requests } = useContext(AppContext);

  const totalCount = requests.length + 114;
  const openCount = requests.filter(r => r.status === 'Open').length;
  const inProgressCount = requests.filter(r => r.status === 'In Progress').length;
  const resolvedCount = requests.filter(r => r.status === 'Resolved').length + 94;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        title="Total Requests"
        value={totalCount}
        icon={FiFileText}
        percentage={12}
        trend="up"
        statusType="primary"
      />
      <StatCard
        title="Open Requests"
        value={openCount}
        icon={FiAlertCircle}
        percentage={5}
        trend="down"
        statusType="warning"
      />
      <StatCard
        title="In Progress"
        value={inProgressCount}
        icon={FiClock}
        percentage={8}
        trend="up"
        statusType="primary"
      />
      <StatCard
        title="Resolved"
        value={resolvedCount}
        icon={FiCheckCircle}
        percentage={15}
        trend="up"
        statusType="success"
      />
    </div>
  );
}
