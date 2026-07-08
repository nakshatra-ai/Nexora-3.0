import React from 'react';
import Card from '../../Card/Card';
import { FiAlertCircle, FiCheckCircle, FiCreditCard, FiMail } from 'react-icons/fi';

export default function NotificationCard({ notification, onMarkRead }) {
  const getIcon = () => {
    switch (notification.type) {
      case 'resolved': return <FiCheckCircle className="text-success-base" />;
      case 'billing': return <FiCreditCard className="text-danger-base" />;
      case 'status': return <FiAlertCircle className="text-primary-base" />;
      default: return <FiMail className="text-text-muted-base" />;
    }
  };

  return (
    <Card 
      onClick={onMarkRead} 
      className={`flex items-start gap-4 p-4 font-sans select-none border transition-colors ${
        notification.read ? 'bg-transparent border-border-base' : 'bg-primary-light-base/30 border-primary-base/20'
      }`}
    >
      <div className="w-9 h-9 rounded-lg bg-input-bg border border-input-border flex items-center justify-center text-sm">
        {getIcon()}
      </div>
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <p className={`text-xs leading-relaxed ${notification.read ? 'text-text-secondary-base' : 'text-text-base font-semibold'}`}>
          {notification.text}
        </p>
        <span className="text-[10px] text-text-muted-base font-bold">{notification.time}</span>
      </div>
      {!notification.read && (
        <span className="w-2.5 h-2.5 rounded-full bg-primary-base animate-pulse self-center" />
      )}
    </Card>
  );
}
