import React from 'react';
import NotificationCard from '../NotificationCard/NotificationCard';
import EmptyState from '../../tables/EmptyState';

export default function NotificationList({ notifications = [], onMarkRead }) {
  if (notifications.length === 0) {
    return <EmptyState message="All caught up!" description="No notifications found in this category." />;
  }

  return (
    <div className="flex flex-col gap-4 font-sans select-none">
      {notifications.map((notif) => (
        <NotificationCard
          key={notif.id}
          notification={notif}
          onMarkRead={() => onMarkRead(notif.id)}
        />
      ))}
    </div>
  );
}
