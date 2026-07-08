import React, { useState } from 'react';
import NotificationFilter from '../../shared/ui/components/NotificationFilter/NotificationFilter';
import NotificationList from '../../shared/ui/components/NotificationList/NotificationList';
import { mockNotifications } from '../../shared/lib/mockData';
import Button from '../../shared/ui/Button/Button';

export default function Notifications() {
  const [list, setList] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const handleMarkRead = (id) => {
    setList(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredList = list.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'billing') return n.type === 'billing';
    if (filter === 'status') return n.type === 'status' || n.type === 'resolved';
    return true;
  });

  return (
    <div className="space-y-6 font-sans select-none max-w-4xl mx-auto flex flex-col gap-2">
      {/* Top Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-base pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-display font-bold text-text-base">System Notifications</h2>
          <p className="text-xs text-text-muted-base">Manage and review operations updates</p>
        </div>
        <Button variant="secondary" onClick={handleMarkAllRead} className="text-xs py-2">
          Mark All Read
        </Button>
      </div>

      {/* Filter Options */}
      <NotificationFilter currentFilter={filter} onFilterChange={setFilter} />

      {/* Main List */}
      <div className="mt-2">
        <NotificationList notifications={filteredList} onMarkRead={handleMarkRead} />
      </div>
    </div>
  );
}
