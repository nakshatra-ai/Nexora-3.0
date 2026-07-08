import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../app/providers/AppContext';
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
  FiLogOut
} from 'react-icons/fi';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentUser, logoutUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
    { name: 'Service Requests', path: '/requests', icon: FiList },
    { name: 'Create Request', path: '/create-request', icon: FiPlusSquare },
    { name: 'Engineers', path: '/engineers', icon: FiUsers },
    { name: 'Profile', path: '/profile', icon: FiUser },
    { name: 'Settings', path: '/settings', icon: FiSettings },
  ];

  // Hexagon logo SVG
  const NexoraLogo = () => (
    <svg className="w-8 h-8 text-accent animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="10" fill="currentColor" />
      <circle cx="30" cy="38" r="6" fill="currentColor" />
      <circle cx="70" cy="38" r="6" fill="currentColor" />
      <circle cx="50" cy="74" r="6" fill="currentColor" />
      <line x1="50" y1="50" x2="30" y2="38" stroke="currentColor" strokeWidth="3" />
      <line x1="50" y1="50" x2="70" y2="38" stroke="currentColor" strokeWidth="3" />
      <line x1="50" y1="50" x2="50" y2="74" stroke="currentColor" strokeWidth="3" />
      <path d="M40 22C45 20 55 20 60 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  return (
    <motion.div 
      animate={{ width: isCollapsed ? '80px' : '260px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-[#050816]/95 border-r border-white/5 flex flex-col justify-between relative z-20 select-none overflow-hidden"
    >
      {/* Top Header Logo */}
      <div>
        <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border-b border-white/5`}>
          <div className="flex items-center gap-3">
            <NexoraLogo />
            {!isCollapsed && (
              <span className="font-display font-bold text-xl tracking-wider bg-gradient-to-r from-white via-slate-200 to-accent bg-clip-text text-transparent">
                NEXORA
              </span>
            )}
          </div>
          
          {!isCollapsed && (
            <button 
              onClick={() => setIsCollapsed(true)}
              className="text-secondary-text hover:text-white p-1 hover:bg-white/5 rounded-md transition-colors"
            >
              <FiChevronLeft size={18} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-primary/10 text-accent border-l-2 border-accent shadow-[0_0_15px_rgba(0,229,255,0.08)]' 
                      : 'text-secondary-text hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <div className="relative z-10">
                  <Icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
                </div>
                
                {!isCollapsed && (
                  <span className="relative z-10 font-sans tracking-wide">
                    {item.name}
                  </span>
                )}

                {/* Hover Glow Effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-200 pointer-events-none" />
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile / Collapse Toggle */}
      <div className="border-t border-white/5 p-4 bg-[#090d22]/40">
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={() => setIsCollapsed(false)}
              className="text-secondary-text hover:text-white p-2 hover:bg-white/5 rounded-md transition-colors"
            >
              <FiChevronRight size={18} />
            </button>
            <button
              onClick={handleLogout}
              className="text-danger hover:bg-danger/10 p-2 rounded-lg transition-colors"
              title="Logout"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(37,99,235,0.3)]">
                {currentUser?.name ? currentUser.name.split(' ').map(n=>n[0]).join('') : 'U'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white text-sm font-semibold truncate font-sans">
                  {currentUser?.name || 'User'}
                </span>
                <span className="text-secondary-text text-xs capitalize flex items-center gap-1 font-sans">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse inline-block" />
                  {currentUser?.role || 'Guest'}
                </span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="text-secondary-text hover:text-danger p-2 hover:bg-white/5 rounded-lg transition-colors"
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
