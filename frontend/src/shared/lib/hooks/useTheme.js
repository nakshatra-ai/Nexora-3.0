import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage('nexora_theme', 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
}
