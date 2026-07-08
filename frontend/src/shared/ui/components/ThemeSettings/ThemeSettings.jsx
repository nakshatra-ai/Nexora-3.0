import React, { useContext } from 'react';
import { AppContext } from '../../../../app/providers/AppContext';
import Card from '../../Card/Card';

export default function ThemeSettings() {
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <Card className="flex flex-col gap-4 font-sans select-none">
      <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary-base">Theme Customization</h4>
      
      <div className="flex items-center justify-between gap-4 py-2 border-b border-border-color">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold text-text-base">Global Interface Mode</span>
          <span className="text-[10px] text-text-muted-base">Switch between dark navy and light templates</span>
        </div>

        <button 
          onClick={toggleTheme}
          className="px-4 py-2 rounded-xl border text-xs font-bold bg-primary-light-base border-primary-base text-primary-base hover:opacity-90 cursor-pointer"
        >
          {theme === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
        </button>
      </div>
    </Card>
  );
}
