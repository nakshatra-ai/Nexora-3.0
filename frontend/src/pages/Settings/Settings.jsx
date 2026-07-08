import React from 'react';
import ThemeSettings from '../../shared/ui/components/ThemeSettings/ThemeSettings';
import NotificationSettings from '../../shared/ui/components/NotificationSettings/NotificationSettings';
import SecuritySettings from '../../shared/ui/components/SecuritySettings/SecuritySettings';
import LanguageSettings from '../../shared/ui/components/LanguageSettings/LanguageSettings';

export default function Settings() {
  return (
    <div className="space-y-6 font-sans select-none max-w-4xl mx-auto flex flex-col gap-2">
      {/* Top Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-base pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-display font-bold text-text-base">System Settings</h2>
          <p className="text-xs text-text-muted-base">Configure layouts, keys, and alerts notifications</p>
        </div>
      </div>

      {/* Grid structure of settings cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <ThemeSettings />
        <LanguageSettings />
        <NotificationSettings />
        <SecuritySettings />
      </div>
    </div>
  );
}
