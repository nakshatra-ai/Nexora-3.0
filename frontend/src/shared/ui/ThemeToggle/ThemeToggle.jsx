import React, { useContext } from 'react';
import { AppContext } from '../../../app/providers/AppContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-lg bg-input-bg border border-input-border flex items-center justify-center text-text-secondary-base hover:text-text-base transition-colors duration-200 cursor-pointer"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {theme === 'dark' ? <FiSun size={16} className="text-warning" /> : <FiMoon size={16} className="text-primary" />}
    </button>
  );
}
