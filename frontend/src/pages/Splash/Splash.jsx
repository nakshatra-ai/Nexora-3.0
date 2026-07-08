import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Splash.css';

const bootLogs = [
  { text: 'NEXORA AI OS [v5.0.4]', delay: 100, status: 'LOADED' },
  { text: 'CODENAME: NEURAL_MATRIX', delay: 150, status: 'ACTIVE' },
  { text: 'LOADING NEURAL ENGINE CORE...', delay: 300, status: 'OK' },
  { text: 'INITIALIZING NETWORK TRANSFERS...', delay: 250, status: 'OK' },
  { text: 'SCANNING ACTIVE TELECOM NODES...', delay: 400, status: '4,812 ONLINE' },
  { text: 'ESTABLISHING SECURE GATEWAYS...', delay: 300, status: 'ENCRYPTED' },
  { text: 'CALIBRATING FLOW ANALYTICS MATRIX...', delay: 350, status: 'STABLE' },
  { text: 'SYNCHRONIZING SERVICE BACKLOG...', delay: 200, status: 'SYNCED' },
  { text: 'CONNECTING AI CONCIERGE HUB...', delay: 450, status: 'ONLINE' },
  { text: 'OPTIMIZING PRIORITIZATION MODELS...', delay: 250, status: 'COMPLETED' },
  { text: 'RECALIBRATING SELF-HEALING SYSTEMS...', delay: 300, status: 'STABLE' },
  { text: 'PARSING TELEMETRY CORRELATIONS...', delay: 200, status: 'COMPLETED' },
  { text: 'ACCESS SYSTEM INTERFACE AUTHORIZED...', delay: 300, status: 'ACCESS GRANTED' }
];

export default function Splash({ onComplete }) {
  const [bootTriggered, setBootTriggered] = useState(false);
  const [activeLogs, setActiveLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [glitchTriggered, setGlitchTriggered] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const audioContextRef = useRef(null);

  // Play a clicky high frequency tone for logging
  const playClickSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200 + Math.random() * 200, now);
      gainNode.gain.setValueAtTime(0.015, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn('Audio click play failed:', e);
    }
  };

  // Play low-frequency drone hum and rising warp sweep when booting completes
  const playWarpSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;

      // Low frequency rumble
      const droneOsc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      droneOsc.type = 'sawtooth';
      droneOsc.frequency.setValueAtTime(55, now); // A1 note
      droneGain.gain.setValueAtTime(0.05, now);
      droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      
      // Filter for rumble
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, now);

      droneOsc.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(ctx.destination);

      droneOsc.start();
      droneOsc.stop(now + 1.2);

      // Rising digital sweep
      const sweepOsc = ctx.createOscillator();
      const sweepGain = ctx.createGain();
      sweepOsc.type = 'triangle';
      sweepOsc.frequency.setValueAtTime(150, now);
      sweepOsc.frequency.exponentialRampToValueAtTime(1600, now + 0.8);
      
      sweepGain.gain.setValueAtTime(0.06, now);
      sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      sweepOsc.connect(sweepGain);
      sweepGain.connect(ctx.destination);

      sweepOsc.start();
      sweepOsc.stop(now + 0.8);
    } catch (e) {
      console.warn('Audio warp play failed:', e);
    }
  };

  const handleBootClick = () => {
    setBootTriggered(true);
    // Initialize audio context
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    playClickSound();
  };

  useEffect(() => {
    if (!bootTriggered) return;

    let currentLogIndex = 0;
    let timer = null;

    const processNextLog = () => {
      if (currentLogIndex >= bootLogs.length) {
        // Boot logs finished
        setTimeout(() => {
          playWarpSound();
          setGlitchTriggered(true);
          setTimeout(() => {
            setShowLogo(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 2500);
          }, 600);
        }, 800);
        return;
      }

      const log = bootLogs[currentLogIndex];
      setActiveLogs((prev) => [...prev, log]);
      playClickSound();
      setProgress(((currentLogIndex + 1) / bootLogs.length) * 100);

      currentLogIndex++;
      timer = setTimeout(processNextLog, log.delay + Math.random() * 100);
    };

    timer = setTimeout(processNextLog, 300);

    return () => clearTimeout(timer);
  }, [bootTriggered, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#020308] z-50 overflow-hidden font-mono select-none">
      
      {/* Terminal UI Container */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${glitchTriggered ? 'scale-110 blur-[8px] opacity-0 pointer-events-none' : ''}`}>
      
      {/* Matrix Glowing Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none z-40" />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="boot-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#boot-grid)" />
        </svg>
      </div>
 
      {/* Cyber Glow Orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/5 filter blur-[120px] top-[-10%] left-[-10%] animate-pulse" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/5 filter blur-[120px] bottom-[-10%] right-[-10%] animate-pulse" />
 
      {/* Interactive Biometric Trigger */}
      <AnimatePresence>
        {!bootTriggered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center gap-6 z-10 p-8 border border-cyan-500/20 bg-[#050816]/80 bg-dark-context rounded-2xl backdrop-blur-md shadow-[0_0_50px_rgba(0,229,255,0.15)] relative max-w-sm w-full text-center"
          >
            {/* Tech Corner Brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

            <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.3em] mb-2">
              NEXORA OPERATIONS GATEWAY
            </div>

            {/* Glowing Touch Scanner Button */}
            <button 
              onClick={handleBootClick}
              className="relative w-24 h-24 rounded-full border border-cyan-500/40 flex items-center justify-center cursor-pointer hover:border-cyan-400 group focus:outline-none transition-all duration-300 shadow-[inset_0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.3),inset_0_0_20px_rgba(0,229,255,0.4)]"
            >
              {/* Concentric rotating SVG details */}
              <svg className="absolute w-28 h-28 text-cyan-500 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="5 15" fill="none" />
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.5" strokeDasharray="40 10" fill="none" />
              </svg>
              
              {/* Internal Fingerprint Icon */}
              <svg className="w-12 h-12 text-cyan-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0-1.1.9-2 2-2h1m-1 4v3m-2-7a4 4 0 00-8 0v4m8-4V7a4 4 0 00-8 0v3M10 14h.01M10 17h.01M10 20h.01M14 20h.01M17 17h.01M17 14h.01M17 11h.01" />
              </svg>
            </button>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-white font-bold tracking-widest animate-pulse uppercase">Biometric Touch Required</span>
              <span className="text-[9px] text-cyan-500/60 uppercase">Click to boot operating system v5.0</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Boot Log Screen */}
      {bootTriggered && (
        <div className="max-w-3xl w-full px-6 flex flex-col justify-between h-[80vh] z-10 relative">
          
          {/* Header Panel */}
          <div className="flex justify-between items-center border-b border-cyan-500/20 pb-4 text-cyan-500 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
              <span className="font-bold tracking-widest">NEXORA_OS_BOOT.SYS</span>
            </div>
            <div className="tracking-wider uppercase">
              STATUS: RUNNING_BOOT_DIAGNOSTICS
            </div>
          </div>

          {/* Log Messages Output */}
          <div className="flex-1 overflow-y-auto py-6 space-y-2.5 scrollbar-none flex flex-col justify-end">
            {activeLogs.map((log, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-start text-xs font-semibold"
              >
                <span className="text-cyan-500 mr-3 select-none">&gt;&gt;</span>
                <span className="text-white flex-1">{log.text}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  log.status === 'OK' || log.status === 'LOADED' || log.status === 'SYNCED' || log.status === 'ACTIVE'
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : log.status === 'ONLINE' || log.status === 'STABLE'
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-amber-400 bg-amber-500/15 border border-amber-400/20 font-bold animate-[pulse_1s_infinite]'
                }`}>
                  {log.status}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom Progress Bar & Loading Stats */}
          <div className="border-t border-cyan-500/20 pt-6 flex flex-col gap-3">
            <div className="flex justify-between items-center text-[10px] text-cyan-400">
              <span className="font-bold tracking-wider">SYSTEM INITIALIZATION PROGRESS</span>
              <span className="font-bold text-white">{Math.round(progress)}%</span>
            </div>
            
            <div className="w-full h-1 bg-cyan-950 rounded-full overflow-hidden relative">
              <motion.div 
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.5)] transition-all duration-100"
              />
            </div>

            <div className="flex justify-between items-center text-[9px] text-cyan-500/60 pb-2">
              <span>MEM_ALLOC: 4,096MB SECURE</span>
              <span>TELEMETRY_LATENCY: 18ms</span>
              <span>CORE_TEMP: 32C</span>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* NEXORA AI Logo Splash */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center z-[100] bg-[#020308]"
          >
            <div className="relative flex flex-col items-center">
              {/* Pulsing Aura */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-cyan-500/20 blur-[120px] rounded-full" 
              />
              
              {/* Company Logo SVG */}
              <motion.div 
                initial={{ opacity: 0, y: -40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.5, delay: 0.1 }}
                className="relative z-10 mb-6 text-cyan-400"
              >
                <svg className="w-24 h-24 drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.2" 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
              </motion.div>

              {/* Company Name */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 tracking-tighter z-10 relative"
              >
                 NEXORA <span className="font-light tracking-[0.2em] text-cyan-300">AI</span>
              </motion.h1>
              
              {/* Tagline */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
                className="mt-4 text-sm md:text-base font-medium text-cyan-500/70 tracking-[0.4em] uppercase z-10 relative"
              >
                Next-Gen Telecom Operations
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
