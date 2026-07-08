import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../app/providers/AppContext';
import { motion } from 'framer-motion';
import { 
  FiGrid, 
  FiList, 
  FiPlusSquare, 
  FiUsers, 
  FiUser, 
  FiSettings, 
  FiChevronLeft, 
  FiChevronRight,
  FiLogOut,
  FiCreditCard,
  FiBell
} from 'react-icons/fi';

export default function Sidebar() {
  const { currentUser, logoutUser, isSidebarCollapsed, setIsSidebarCollapsed } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
    { name: 'Service Requests', path: '/requests', icon: FiList },
    { name: 'Engineer Review History', path: '/engineer-history', icon: FiPlusSquare },
    { name: 'Billing & Invoices', path: '/billing', icon: FiCreditCard },
    { name: 'Notifications', path: '/notifications', icon: FiBell },
    ...(currentUser?.role === 'admin' ? [
      { name: 'Engineers', path: '/engineers', icon: FiUsers },
      { name: 'User Management', path: '/admin/users', icon: FiUsers }
    ] : []),
    { name: 'Profile', path: '/profile', icon: FiUser },
    { name: 'Settings', path: '/settings', icon: FiSettings },
  ];

  return (
    <motion.div 
      animate={{ width: isSidebarCollapsed ? '80px' : '260px' }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="h-screen bg-sidebar-bg border-r border-border-base flex flex-col justify-between relative z-20 select-none overflow-hidden"
    >
      <div>
        {/* Top Logo */}
        <div className={`p-6 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} border-b border-border-base`}>
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-primary-base" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="50" cy="50" r="10" fill="currentColor" />
            </svg>
            {!isSidebarCollapsed && (
              <span className="font-display font-bold text-lg tracking-wider text-text-base">
                NEXORA AI
              </span>
            )}
          </div>
          
          {!isSidebarCollapsed && (
            <button 
              onClick={() => setIsSidebarCollapsed(true)}
              className="text-text-muted-base hover:text-text-base p-1 hover:bg-input-bg rounded-md transition-colors"
            >
              <FiChevronLeft size={18} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150 group relative ${
                    isActive 
                      ? 'bg-primary-light-base text-primary-base border-l-4 border-primary-base shadow-[0_0_15px_var(--primary-light)]' 
                      : 'text-text-secondary-base hover:text-text-base hover:bg-input-bg'
                  }`
                }
              >
                <Icon size={18} className="group-hover:scale-110 transition-transform duration-150 relative z-10" />
                {!isSidebarCollapsed && (
                  <span className="relative z-10 font-sans tracking-wide">
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile Details / Expand Toggle */}
      <div className="border-t border-border-base p-4 bg-surface-base">
        {isSidebarCollapsed ? (
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={() => setIsSidebarCollapsed(false)}
              className="text-text-muted-base hover:text-text-base p-2 hover:bg-input-bg rounded-md transition-colors"
            >
              <FiChevronRight size={18} />
            </button>
            <button
              onClick={handleLogout}
              className="text-danger-base hover:bg-danger-light-base p-2 rounded-lg transition-colors"
              title="Logout"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-base to-accent-base flex items-center justify-center text-white font-bold text-sm shadow-md">
                {currentUser?.name ? currentUser.name.split(' ').map(n=>n[0]).join('') : 'U'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-text-base text-sm font-semibold truncate font-sans leading-tight">
                  {currentUser?.name || 'User'}
                </span>
                <span className="text-text-muted-base text-xs capitalize flex items-center gap-1 font-sans mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-base animate-pulse inline-block" />
                  {currentUser?.role || 'Guest'}
                </span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="text-text-muted-base hover:text-danger-base p-2 hover:bg-input-bg rounded-lg transition-colors"
              title="Logout"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
