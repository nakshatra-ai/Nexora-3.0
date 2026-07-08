import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AppContext } from '../app/providers/AppContext';
import { FiBell, FiWifi, FiUser, FiActivity } from 'react-icons/fi';
import ThemeToggle from '../shared/ui/ThemeToggle/ThemeToggle';

export default function Navbar() {
  const location = useLocation();
  const { currentUser } = useContext(AppContext);

  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/requests':
        return 'Service Requests';
      case '/engineer-history':
        return 'Engineer Reviews';
      case '/billing':
        return 'Billing & Invoices';
      case '/notifications':
        return 'Notifications';
      case '/engineers':
        return 'Engineers';
      case '/profile':
        return 'Profile';
      case '/settings':
        return 'Settings';
      case '/about':
        return 'About Nexora';
      case '/privacy':
        return 'Privacy Policy';
      case '/terms':
        return 'Terms & Conditions';
      case '/ai-features':
        return 'AI Intelligent Features';
      default:
        if (location.pathname.startsWith('/request/')) {
          return 'Request Details';
        }
        return 'Nexora Operations';
    }
  };

  return (
    <header className="h-20 glass-header px-8 flex items-center justify-between z-10 select-none">
      {/* Title & Sub */}
      <div className="flex flex-col">
        <h1 className="text-xl font-display font-semibold text-text-base tracking-wide">
          {getTitle()}
        </h1>
        <p className="text-xs text-text-muted-base mt-0.5 font-sans">
          Overview of network operations
        </p>
      </div>

      {/* Latency & Network Info */}
      <div className="hidden md:flex items-center gap-6 text-xs text-text-muted-base font-sans">
        <div className="flex items-center gap-2 bg-input-bg px-3 py-1.5 rounded-full border border-input-border">
          <FiWifi className="text-success-base animate-pulse" />
          <span>Ping: <strong className="text-text-base">12ms</strong></span>
        </div>
        <div className="flex items-center gap-2 bg-input-bg px-3 py-1.5 rounded-full border border-input-border">
          <FiActivity className="text-accent-base" />
          <span>Uptime: <strong className="text-text-base">99.98%</strong></span>
        </div>
      </div>

      {/* Right Side Icons & Profile */}
      <div className="flex items-center gap-4">
        {/* Sun/Moon Theme Switcher */}
        <ThemeToggle />

        {/* Notification Icon */}
        <Link to="/notifications">
          <button className="relative w-10 h-10 rounded-lg bg-input-bg hover:bg-border-color border border-input-border flex items-center justify-center text-text-secondary-base hover:text-text-base transition-all duration-200 cursor-pointer">
            <FiBell size={16} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent-base animate-ping" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent-base" />
          </button>
        </Link>

        {/* User Card */}
        <div className="flex items-center gap-3 bg-input-bg px-4 py-2 rounded-lg border border-input-border">
          <div className="flex flex-col text-right min-w-0">
            <span className="text-text-base text-xs font-semibold truncate leading-tight">
              {currentUser?.name || 'User'}
            </span>
            <span className="text-accent-base text-[10px] uppercase font-bold tracking-wider leading-none mt-1">
              {currentUser?.role || 'Guest'}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-base to-accent-base flex items-center justify-center text-white font-bold text-xs shadow-sm">
            {currentUser?.name ? currentUser.name.split(' ').map(n=>n[0]).join('') : <FiUser size={14} />}
          </div>
        </div>
      </div>
    </header>
  );
}
