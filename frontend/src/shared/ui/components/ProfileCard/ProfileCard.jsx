import React from 'react';
import Card from '../../Card/Card';

export default function ProfileCard({ user }) {
  return (
    <Card className="flex flex-col items-center text-center gap-4 font-sans select-none relative overflow-hidden">
      {/* Visual background splash */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-primary-base to-accent-base opacity-20 pointer-events-none" />

      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary-base to-accent-base flex items-center justify-center text-white font-bold text-2xl shadow-lg border-4 border-surface-base mt-4 relative z-10">
        {user?.name ? user.name.split(' ').map(n=>n[0]).join('') : 'U'}
      </div>

      <div className="flex flex-col gap-1 relative z-10">
        <h3 className="text-lg font-display font-bold text-text-base leading-tight">{user?.name || 'User'}</h3>
        <span className="text-[10px] uppercase font-bold tracking-wider text-accent-base bg-accent-glow-base px-3 py-1 rounded-full border border-accent-base/15 self-center">
          {user?.role || 'Guest'}
        </span>
      </div>

      <div className="w-full border-t border-border-base pt-4 flex justify-around text-center text-xs mt-2">
        <div>
          <span className="text-text-muted-base block mb-0.5">Status</span>
          <span className="font-bold text-success-base">● Active</span>
        </div>
        <div className="border-l border-border-base" />
        <div>
          <span className="text-text-muted-base block mb-0.5">Access Level</span>
          <span className="font-bold text-text-base">Tier 1</span>
        </div>
      </div>
    </Card>
  );
}
