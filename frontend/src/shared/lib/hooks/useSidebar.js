import useLocalStorage from './useLocalStorage';

export default function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useLocalStorage('nexora_sidebar_collapsed', false);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  return { isCollapsed, toggleSidebar, setIsCollapsed };
}
