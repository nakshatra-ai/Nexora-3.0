import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiMaximize2, FiVolume2, FiX, FiActivity } from 'react-icons/fi';
import MockVideoPlayer from '../../MockVideoPlayer/MockVideoPlayer';

// Holographic Globe Canvas Component
function HolographicGlobe() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, lastX: 0, lastY: 0 });
  const [activeNodeName, setActiveNodeName] = useState('Noida Head End (Primary)');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = canvas.width = 450;
    let height = canvas.height = 450;


    
    // Set initial size
    width = canvas.width = 450;
    height = canvas.height = 450;

    // Generate Globe Nodes (3D coordinates)
    const nodeCount = 80;
    const nodes = [];
    const radius = 160;

    // Fibonacci sphere distribution for even spacing
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      nodes.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        baseX: radius * Math.sin(phi) * Math.cos(theta),
        baseY: radius * Math.sin(phi) * Math.sin(theta),
        baseZ: radius * Math.cos(phi),
        size: Math.random() * 2 + 1.5,
        pulse: Math.random() * Math.PI,
        city: i === 0 ? 'Noida HQ' : i === 12 ? 'Delhi OLT' : i === 25 ? 'Mumbai Core' : i === 38 ? 'Bangalore Gateway' : null
      });
    }

    // Interactive data packets traveling along connections
    const packets = [];
    const maxPackets = 12;

    // Rotation angles
    let angleX = 0.003;
    let angleY = 0.005;
    const fov = 400;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Center coordinates
      const cx = 225;
      const cy = 225;

      // Handle user mouse rotation drag adjustments
      if (mouseRef.current.isDown) {
        angleY *= 0.95; // damp natural speed
        angleX *= 0.95;
      } else {
        // Return to normal drift speed
        angleY = 0.004;
        angleX = 0.002;
      }

      // Rotate nodes in 3D space
      nodes.forEach(node => {
        // Rotate around Y axis
        let x1 = node.x * Math.cos(angleY) - node.z * Math.sin(angleY);
        let z1 = node.x * Math.sin(angleY) + node.z * Math.cos(angleY);

        // Rotate around X axis
        let y2 = node.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = node.y * Math.sin(angleX) + z1 * Math.cos(angleX);

        node.x = x1;
        node.y = y2;
        node.z = z2;

        // Projection mapping
        const scale = fov / (fov + z2);
        node.projX = cx + x1 * scale;
        node.projY = cy + y2 * scale;
        node.alpha = (fov - z2) / (fov * 1.5) + 0.15; // Depth transparency
      });

      // Draw Connection Lines (Grid Matrix)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          // Calculate 3D distance
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dz = n1.z - n2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Connect if close enough
          if (dist < 110) {
            const minAlpha = Math.min(n1.alpha, n2.alpha);
            ctx.strokeStyle = `rgba(0, 229, 255, ${minAlpha * 0.18})`;
            ctx.beginPath();
            ctx.moveTo(n1.projX, n1.projY);
            ctx.lineTo(n2.projX, n2.projY);
            ctx.stroke();

            // Spawn data packets along active paths randomly
            if (packets.length < maxPackets && Math.random() < 0.0005) {
              packets.push({
                start: n1,
                end: n2,
                progress: 0,
                speed: 0.01 + Math.random() * 0.015
              });
            }
          }
        }
      }

      // Update & Draw Packets
      packets.forEach((pkt, idx) => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          packets.splice(idx, 1);
          return;
        }

        const px = pkt.start.projX + (pkt.end.projX - pkt.start.projX) * pkt.progress;
        const py = pkt.start.projY + (pkt.end.projY - pkt.start.projY) * pkt.progress;

        ctx.fillStyle = '#00e5ff';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.circle = ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw Nodes
      nodes.forEach(node => {
        node.pulse += 0.03;
        const pulseSize = node.size + Math.sin(node.pulse) * 0.5;

        // Back nodes are darker, front nodes are brighter cyan
        if (node.z > 0) {
          // Back nodes
          ctx.fillStyle = `rgba(0, 99, 235, ${node.alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(node.projX, node.projY, pulseSize * 0.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Front nodes
          ctx.fillStyle = `rgba(0, 229, 255, ${node.alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(node.projX, node.projY, pulseSize, 0, Math.PI * 2);
          ctx.fill();

          // Outer pulse ring for hub cities
          if (node.city) {
            ctx.strokeStyle = `rgba(0, 229, 255, ${node.alpha * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(node.projX, node.projY, pulseSize * 2.8, 0, Math.PI * 2);
            ctx.stroke();

            // Render hub label
            ctx.fillStyle = `rgba(255, 255, 255, ${node.alpha * 0.85})`;
            ctx.font = 'bold 8px monospace';
            ctx.fillText(node.city, node.projX + 8, node.projY + 3);
          }
        }
      });

      // Draw outer orbit rings
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.05, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse drag handlers to rotate globe
    const handleMouseDown = (e) => {
      mouseRef.current.isDown = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (!mouseRef.current.isDown) {
        // Mouse hover checks for node coordinates
        return;
      }
      const deltaX = e.clientX - mouseRef.current.lastX;
      const deltaY = e.clientY - mouseRef.current.lastY;

      angleY = deltaX * 0.005;
      angleX = deltaY * 0.005;

      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Random node label cycler
    const nodeNames = [
      'Noida HQ Hub [Primary Node]',
      'Delhi OLT Gateway [Active: 1,844 Trunks]',
      'Mumbai Core Routers [Load: 42.4%]',
      'Bangalore GPON Matrix [Online]',
      'Fiber Junction-11 [Active Feed]',
      'Predictive Node Sector-62 [SLA_OK]'
    ];
    const nodeInterval = setInterval(() => {
      setActiveNodeName(nodeNames[Math.floor(Math.random() * nodeNames.length)]);
    }, 4000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(nodeInterval);
    };
  }, []);

  return (
    <div className="relative w-[340px] h-[340px] md:w-[450px] md:h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing">
      {/* 3D Rotating Rings (CSS) */}
      <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/10 animate-[spin_40s_linear_infinite]" />
      <div className="absolute inset-6 rounded-full border border-dotted border-blue-500/10 animate-[spin_20s_linear_infinite_reverse]" />
      
      {/* Canvas Globe */}
      <canvas ref={canvasRef} className="w-full h-full relative z-10" />

      {/* Floating Coordinate Card */}
      <div className="absolute bottom-2 left-6 bg-[#040819]/90 bg-dark-context border border-cyan-500/25 p-3 rounded-lg backdrop-blur-md z-20 font-mono text-[9px] text-cyan-400 flex flex-col gap-0.5 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
        <span className="text-text-muted-base uppercase">Active Telemetry Node</span>
        <span className="font-bold text-text-base uppercase">{activeNodeName}</span>
        <div className="flex gap-4 mt-1 text-[8px] text-cyan-500/80">
          <span>LAT: 28.628</span>
          <span>LNG: 77.378</span>
          <span>ALT: 122m</span>
        </div>
      </div>
    </div>
  );
}



// Hero Main Component
export default function Hero() {
  const [stats, setStats] = useState({
    traffic: 4.82,
    resolved: 25412,
    ping: 18,
    sla: 99.82
  });

  const [backgroundOffset, setBackgroundOffset] = useState({ x: 0, y: 0 });
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Fluctuating metric simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        traffic: parseFloat((4.5 + Math.random() * 0.8).toFixed(2)),
        resolved: prev.resolved + (Math.random() > 0.4 ? 1 : 0),
        ping: Math.max(12, Math.min(26, prev.ping + (Math.random() > 0.5 ? 1 : -1))),
        sla: parseFloat((99.78 + Math.random() * 0.06).toFixed(2))
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Mouse move lighting tracker
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) * 0.02;
    const y = (clientY - window.innerHeight / 2) * 0.02;
    setBackgroundOffset({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen pt-0 pb-16 px-6 md:px-12 flex flex-col justify-center items-center select-none font-sans overflow-hidden relative"
    >
      {/* Spotlight mouse follower */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/5 filter blur-[100px] pointer-events-none transition-transform duration-500 ease-out z-0"
        style={{
          transform: `translate(${backgroundOffset.x * 2}px, ${backgroundOffset.y * 2}px)`,
          top: '30%',
          left: '25%'
        }}
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Command Details */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.25em] text-cyan-400 bg-cyan-950/40 px-4 py-1.5 rounded-full border border-cyan-500/25 backdrop-blur-md shadow-[0_0_15px_rgba(0,229,255,0.1)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            📡 NEXORA CORE OPERATIONS MATRIX OS_v5.0
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-text-base leading-[1.1]"
          >
            Intelligent Telecom <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 animate-pulse">
              Service Operations
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-text-secondary-base max-w-xl leading-relaxed font-medium"
          >
            NEXORA AI orchestrates your entire telecommunication workflow. Deploying autonomous dispatching networks, analyzing telemetry in real-time, and healing fiber backhauls automatically to achieve 99.9% uptime.
          </motion.p>

          {/* Action Hub */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto"
          >
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="accent" className="px-10 py-4 text-sm font-bold shadow-[0_0_25px_rgba(0,229,255,0.25)] w-full sm:w-auto hover:scale-105 active:scale-95 transition-all uppercase tracking-wider">
                Launch System
              </Button>
            </Link>
            <Button 
              variant="secondary" 
              onClick={() => setShowDemoModal(true)}
              className="px-10 py-4 text-sm font-bold bg-white/5 border-white/10 text-text-base hover:bg-white/10 w-full sm:w-auto hover:scale-105 active:scale-95 transition-all backdrop-blur-md uppercase tracking-wider"
            >
              Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Globe Visualizer */}
        <div className="lg:col-span-5 flex justify-center relative mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="relative"
          >
            {/* Ambient Back Glow Ring */}
            <div className="absolute w-[360px] h-[360px] bg-cyan-500/5 rounded-full filter blur-[40px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <HolographicGlobe />
          </motion.div>
        </div>
      </div>

      {/* Floating Statistics (OS HUD Panel) */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t border-border-base pt-10 relative z-10 font-mono">
        <div className="flex flex-col gap-1 text-left p-4 bg-card-base/30 border border-border-base/50 rounded-xl backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-[2px] h-full bg-blue-500" />
          <span className="text-[10px] uppercase font-bold text-text-capt tracking-wider">DATA THROUGHPUT</span>
          <span className="text-xl md:text-2xl font-black text-text-base">{stats.traffic} TB/s</span>
          <div className="w-full bg-blue-950/20 h-1 rounded mt-1.5 overflow-hidden">
            <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${(stats.traffic / 7.0) * 100}%` }} />
          </div>
        </div>

        <div className="flex flex-col gap-1 text-left p-4 bg-card-base/30 border border-border-base/50 rounded-xl backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-[2px] h-full bg-cyan-400" />
          <span className="text-[10px] uppercase font-bold text-text-capt tracking-wider">TICKETS DISPATCHED</span>
          <span className="text-xl md:text-2xl font-black text-text-base">{stats.resolved.toLocaleString()}</span>
          <span className="text-[8px] text-emerald-400 mt-1.5 flex items-center gap-1 font-bold">
            ● DISPATCH ENGINE ONLINE
          </span>
        </div>

        <div className="flex flex-col gap-1 text-left p-4 bg-card-base/30 border border-border-base/50 rounded-xl backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-[2px] h-full bg-success-base" />
          <span className="text-[10px] uppercase font-bold text-text-capt tracking-wider">NETWORK SLA</span>
          <span className="text-xl md:text-2xl font-black text-text-base">{stats.sla}%</span>
          <div className="w-full bg-emerald-950/20 h-1 rounded mt-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${(stats.sla - 99.0) * 100}%` }} />
          </div>
        </div>

        <div className="flex flex-col gap-1 text-left p-4 bg-card-base/30 border border-border-base/50 rounded-xl backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-[2px] h-full bg-accent-base" />
          <span className="text-[10px] uppercase font-bold text-text-capt tracking-wider">NODE PING TIME</span>
          <span className="text-xl md:text-2xl font-black text-text-base">{stats.ping} ms</span>
          <span className="text-[8px] text-cyan-400 mt-1.5 font-bold uppercase">
            ACTIVE PORT FEED: UP
          </span>
        </div>
      </div>

      {/* Futuristic Watch Demo Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#02040c]/85 backdrop-blur-md flex items-center justify-center z-55 p-4"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="bg-[#050816]/95 bg-dark-context border border-cyan-500/30 rounded-2xl max-w-3xl w-full overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.25)] relative font-mono flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40" />

              {/* Header Title Bar */}
              <div className="flex items-center justify-between border-b border-cyan-500/20 px-6 py-4 bg-cyan-950/20 text-cyan-400 font-bold text-xs">
                <div className="flex items-center gap-2">
                  <FiActivity className="animate-pulse text-cyan-400" />
                  <span>NEXORA_CORE: SYSTEM_DEMO_PREVIEW.SYS</span>
                </div>
                <button 
                  onClick={() => setShowDemoModal(false)}
                  className="w-6 h-6 rounded border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all cursor-pointer"
                >
                  <FiX size={12} />
                </button>
              </div>

              {/* Player Body */}
              <div className="p-6 flex flex-col gap-6">
                <MockVideoPlayer />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
