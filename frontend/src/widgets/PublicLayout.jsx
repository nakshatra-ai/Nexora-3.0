import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../app/providers/AppContext';
import { FiClock, FiActivity, FiShield, FiWifi, FiCpu } from 'react-icons/fi';
import ThemeToggle from '../shared/ui/ThemeToggle/ThemeToggle';
import Button from '../shared/ui/Button/Button';

export default function PublicLayout({ children }) {
  const { currentUser, theme } = useContext(AppContext);
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const [ping, setPing] = useState(18);
  const [cpu, setCpu] = useState(14.5);
  const [telemetryLog, setTelemetryLog] = useState('NXR_MATRIX_INITIALIZED');

  // Time ticker
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fluctuating diagnostics
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(prev => Math.max(12, Math.min(26, prev + (Math.random() > 0.5 ? 1 : -1))));
      setCpu(prev => Math.max(8.0, Math.min(22.0, parseFloat((prev + (Math.random() > 0.5 ? 0.7 : -0.7)).toFixed(1)))));
      
      const logs = [
        'TELEMETRY_LINK_OK', 'OLT_PORT_ACTIVE_4812', 'SLA_URGENCY_OPTIMIZED', 
        'AI_DISPATCH_WAITING', 'BUFFER_POOL_RESOLVED', 'HEAL_NET_IDLE', 
        'DB_SYNC_COMPLETE', 'SECURE_CHANNEL_ESTABLISHED', 'HEX_TRACE_ACTIVE'
      ];
      setTelemetryLog(logs[Math.floor(Math.random() * logs.length)] + ' // ' + Math.floor(Math.random() * 1000));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (t) => {
    return t.toLocaleTimeString('en-US', { hour12: false });
  };



  return (
    <div className={`min-h-screen bg-bg-base text-text-base relative overflow-hidden font-sans select-none transition-colors duration-300 ${
      theme === 'dark' ? 'dark-theme' : 'light-theme'
    }`}>
      
      {/* 1. Cinematic Dot Matrix Background Grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hud-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="var(--primary)" />
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="2 10" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hud-grid)" />
        </svg>
      </div>

      {/* 2. Scanning Laser Sweep (Slow CSS vertical scroll) */}
      <div className="absolute left-0 w-full h-[150px] bg-gradient-to-b from-transparent via-primary-base/5 to-transparent pointer-events-none z-0 animate-[scanSweep_12s_infinite_linear]" />

      {/* 3. Decorative Ambient Glow Orbs */}
      <div className="glow-orb glow-orb-primary top-[15%] left-[-10%] opacity-5 dark:opacity-10" />
      <div className="glow-orb glow-orb-accent bottom-[15%] right-[-10%] opacity-5 dark:opacity-8" />

      {/* 4. Four Viewport HUD Borders/Brackets */}
      <div className="fixed top-4 left-4 z-40 text-[9px] font-mono tracking-widest text-text-muted-base pointer-events-none hidden md:block">
        <span className="text-primary-base font-bold">┌ </span>SYS_MATRIX // NXR.5.0
      </div>
      <div className="fixed top-4 right-4 z-40 text-[9px] font-mono tracking-widest text-text-muted-base pointer-events-none hidden md:block text-right">
        [SYS_MONITOR: ACTIVE] <span className="text-accent-base font-bold"> ┐</span>
      </div>
      <div className="fixed bottom-4 left-4 z-40 text-[9px] font-mono tracking-widest text-text-muted-base pointer-events-none hidden md:block">
        <span className="text-success-base font-bold">└ </span>TRACE_LOG // {telemetryLog}
      </div>
      <div className="fixed bottom-4 right-4 z-40 text-[9px] font-mono tracking-widest text-text-muted-base pointer-events-none hidden md:block text-right">
        CONNECTION STATUS: SECURED <span className="text-primary-base font-bold"> ┘</span>
      </div>

      {/* 5. Persistent HUD Navigation Header */}
      <header className="fixed top-0 left-0 right-0 h-20 border-b border-border-base bg-bg-base/70 backdrop-blur-md z-50 px-6 md:px-12 flex items-center justify-between transition-colors duration-300">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 relative group">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary-base to-accent-base opacity-25 group-hover:opacity-60 blur transition duration-300" />
          <div className="relative flex items-center gap-3 bg-bg-base px-2 py-1 rounded-lg border border-border-base">
            <svg className="w-8 h-8 text-primary-base animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="50" cy="50" r="10" fill="currentColor" />
              <circle cx="30" cy="38" r="6" fill="currentColor" />
              <circle cx="70" cy="38" r="6" fill="currentColor" />
              <circle cx="50" cy="74" r="6" fill="currentColor" />
            </svg>
            <span className="font-display font-black text-lg tracking-wider text-text-base">
              NEXORA <span className="text-primary-base">AI</span>
            </span>
          </div>
        </Link>

        {/* HUD System Telemetry (Center Left) */}
        <div className="hidden xl:flex items-center gap-6 font-mono text-[10px] text-text-muted-base border-l border-border-base pl-6 h-8">
          <div className="flex items-center gap-2">
            <FiClock className="text-primary-base" />
            <span>TIME: <strong className="text-text-base">{formatTime(time)}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <FiCpu className="text-accent-base" />
            <span>CPU: <strong className="text-text-base">{cpu}%</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <FiWifi className="text-success-base animate-pulse" />
            <span>LATENCY: <strong className="text-text-base">{ping}ms</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <FiShield className="text-primary-base" />
            <span>SECURE: <strong className="text-emerald-400 font-bold uppercase">LINK</strong></span>
          </div>
        </div>

        {/* Menu Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
          <Link to="/" className="text-text-secondary-base hover:text-primary-base transition-colors py-1.5 px-3 rounded-md hover:bg-primary-light-base/5">Home</Link>
          <Link to="/about" className="text-text-secondary-base hover:text-primary-base transition-colors py-1.5 px-3 rounded-md hover:bg-primary-light-base/5">About</Link>
          <Link to="/services" className="text-text-secondary-base hover:text-primary-base transition-colors py-1.5 px-3 rounded-md hover:bg-primary-light-base/5">Services</Link>
          <Link to="/ai-lab" className="text-text-secondary-base hover:text-primary-base transition-colors py-1.5 px-3 rounded-md hover:bg-primary-light-base/5">AI Lab</Link>
          <Link to="/reviews" className="text-text-secondary-base hover:text-primary-base transition-colors py-1.5 px-3 rounded-md hover:bg-primary-light-base/5">Reviews</Link>
          <Link to="/personnel" className="text-text-secondary-base hover:text-primary-base transition-colors py-1.5 px-3 rounded-md hover:bg-primary-light-base/5">Personnel</Link>
          <Link to="/contact" className="text-text-secondary-base hover:text-primary-base transition-colors py-1.5 px-3 rounded-md hover:bg-primary-light-base/5">Comms</Link>
        </nav>

        {/* Theme and Session Controls (Right Side) */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {currentUser ? (
            <Link to="/dashboard">
              <Button variant="primary" className="shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95 transition-all text-xs py-2.5">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="accent" className="shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95 transition-all text-xs py-2.5">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* 6. Dynamic Main Workspace Window */}
      <main className="relative z-10 pt-20">
        {children}
      </main>

      {/* 7. Persistent HUD Footer */}
      <footer className="border-t border-border-base bg-bg-base/90 py-8 px-6 md:px-12 font-mono text-[10px] text-text-muted-base relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-success-base animate-pulse" />
            <span>NEXORA AI OPERATING SYSTEM • ALL SYSTEMS OPERATIONAL</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-text-base transition-colors">OS_INFO.SYS</Link>
            <Link to="/privacy" className="hover:text-text-base transition-colors">PRIVACY_MD.LOG</Link>
            <Link to="/terms" className="hover:text-text-base transition-colors">TERMS_SLA.LOG</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
