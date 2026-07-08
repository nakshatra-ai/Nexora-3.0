import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../../app/providers/AppContext';
import { FiBell, FiWifi, FiUser, FiActivity } from 'react-icons/fi';

export default function Navbar() {
  const location = useLocation();
  const { currentUser } = useContext(AppContext);

  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/requests':
        return 'Service Requests';
      case '/create-request':
        return 'Create Service Request';
      case '/engineers':
        return 'Engineers';
      case '/profile':
        return 'Profile';
      case '/settings':
        return 'Settings';
      default:
        if (location.pathname.startsWith('/request/')) {
          return 'Request Details';
        }
        return 'Nexora Operations';
    }
  };

  return (
    <header className="h-20 bg-[#050816]/80 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between z-10 select-none">
      {/* Title & Status */}
      <div className="flex flex-col">
        <h1 className="text-xl font-display font-semibold text-white tracking-wide">
          {getTitle()}
        </h1>
        <p className="text-xs text-secondary-text mt-0.5 font-sans">
          Overview of network operations
        </p>
      </div>

      {/* Latency & Network Info */}
      <div className="hidden md:flex items-center gap-6 text-xs text-secondary-text font-sans">
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <FiWifi className="text-success animate-pulse" />
          <span>Ping: <strong className="text-white">12ms</strong></span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <FiActivity className="text-accent" />
          <span>Uptime: <strong className="text-white">99.98%</strong></span>
        </div>
      </div>

      {/* Right Side Icons & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <button className="relative w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/5 text-secondary-text hover:text-white transition-all duration-200">
          <FiBell size={16} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-accent" />
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
          <div className="flex flex-col text-right min-w-0">
            <span className="text-white text-xs font-semibold truncate leading-tight">
              {currentUser?.name || 'User'}
            </span>
            <span className="text-accent text-[10px] uppercase font-bold tracking-wider leading-none mt-1">
              {currentUser?.role || 'Guest'}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-xs shadow-sm">
            {currentUser?.name ? currentUser.name.split(' ').map(n=>n[0]).join('') : <FiUser size={14} />}
          </div>
        </div>
      </div>
    </header>
  );
}
