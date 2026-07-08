import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiCpu, FiSliders, FiTerminal, FiCheckCircle } from 'react-icons/fi';
import Button from '../../shared/ui/Button/Button';

// Neural Net Structure Details
const nodeDetails = {
  '0-0': { name: 'NLP_TEXT_PARSER', layer: 'INPUT LAYER', desc: 'Parses customer logs to extract priority tags.', metrics: 'Status: OK' },
  '0-1': { name: 'GPS_LOC_TELEMETRY', layer: 'INPUT LAYER', desc: 'Queries distance vectors of nearby field staff.', metrics: 'Sync: Active' },
  '0-2': { name: 'BACKLOG_WEIGHT', layer: 'INPUT LAYER', desc: 'Ingests queue loading parameters.', metrics: 'Load: Nominal' },
  
  '1-0': { name: 'URGENCY_CLASSIFIER', layer: 'HIDDEN LAYER 1', desc: 'Assigns classification priority tags based on keywords.', metrics: 'Accuracy: 98.2%' },
  '1-1': { name: 'GEO_DIST_CALCULATOR', layer: 'HIDDEN LAYER 1', desc: 'Computes road routing matrices for dispatched staff.', metrics: 'Ping: 12ms' },
  '1-2': { name: 'WORKLOAD_OPTIMIZER', layer: 'HIDDEN LAYER 1', desc: 'Evaluates active queue sizes to prevent bottlenecks.', metrics: 'Nodes: 4 active' },
  '1-3': { name: 'SPECIALIZATION_TAGGER', layer: 'HIDDEN LAYER 1', desc: 'Matches dispatch requirements to technician skill cards.', metrics: 'Precision: 97.4%' },
  
  '2-0': { name: 'SLA_RANKING_ENGINE', layer: 'HIDDEN LAYER 2', desc: 'Evaluates response targets against SLA parameters.', metrics: 'Target: <15s' },
  '2-1': { name: 'ATTENUATION_CORRELATOR', layer: 'HIDDEN LAYER 2', desc: 'Analyzes OTDR signal degradation metrics.', metrics: 'Health: 100%' },
  '2-2': { name: 'REACTION_FAILOVER_DAEMON', layer: 'HIDDEN LAYER 2', desc: 'Calculates port recovery directions.', metrics: 'OLT checks: pass' },
  
  '3-0': { name: 'AUTO_DISPATCH_DISPATCHER', layer: 'OUTPUT LAYER', desc: 'Triggers matching work orders to field engineers.', metrics: 'Latency: 24s' },
  '3-1': { name: 'SELF_HEALING_ROUTER', layer: 'OUTPUT LAYER', desc: 'Pushes port configuration templates to gateways.', metrics: 'Uptime: 99.98%' }
};

export default function AILabPage() {
  const [learningRate, setLearningRate] = useState(0.01);
  const [pulseFreq, setPulseFreq] = useState(5); // scale 1-10
  const [modelTemp, setModelTemp] = useState(0.7);
  const [failureThreshold, setFailureThreshold] = useState(30); // percent

  const [selectedNode, setSelectedNode] = useState({
    name: 'NLP_TEXT_PARSER',
    layer: 'INPUT LAYER',
    desc: 'Parses customer logs to extract priority tags.',
    metrics: 'Status: OK'
  });

  const [logs, setLogs] = useState(['INIT COGNITIVE ENGINE DIRECTORY...', 'LOADED WEIGHT BLUEPRINTS... OK']);
  const canvasRef = useRef(null);

  // Live Simulated Logs
  useEffect(() => {
    const interval = setInterval(() => {
      const trainingLogs = [
        `EPOCH TRAIN SEQUENCE // LOSS: ${(0.02 + Math.random() * 0.05).toFixed(4)} // ACCURACY: ${(97.8 + Math.random() * 1.5).toFixed(2)}%`,
        `OPTIMIZATION STEP COMPLETED // LR: ${learningRate}`,
        `DISPATCH SIMULATION: Priya Singh -> Noida Node 241 // RESOLVED`,
        `HEALING CRITICAL LINK: FAULT SWAP DONE // PING RESET TO 11ms`,
        `MODEL TEMPERATURE CALIBRATED // ENTROPY VALUE: ${(modelTemp * 0.4).toFixed(3)}`,
        `WARNING // TRUNK ATTENUATION EXCEEDS ${failureThreshold}% // TRIGGERING RE-ROUTE`
      ];
      setLogs(prev => {
        const next = [...prev, `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] ${trainingLogs[Math.floor(Math.random() * trainingLogs.length)]}`];
        if (next.length > 5) next.shift();
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [learningRate, modelTemp, failureThreshold]);

  // Neural Network Canvas simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = canvas.width = 540;
    let height = canvas.height = 320;

    const layers = [3, 4, 3, 2];
    const nodes = [];
    const layerSpacing = 130;
    const startX = 65;

    layers.forEach((count, lIdx) => {
      const x = startX + lIdx * layerSpacing;
      const yOffset = (height - (count - 1) * 65) / 2;
      for (let nIdx = 0; nIdx < count; nIdx++) {
        const key = `${lIdx}-${nIdx}`;
        nodes.push({
          id: key,
          x: x,
          y: yOffset + nIdx * 65,
          baseY: yOffset + nIdx * 65,
          pulse: Math.random() * Math.PI,
          layerIdx: lIdx,
          nodeIdx: nIdx,
          ...nodeDetails[key]
        });
      }
    });

    const pulses = [];
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw synapse lines
      ctx.lineWidth = 0.5;
      nodes.forEach(n1 => {
        n1.pulse += 0.02;
        n1.y = n1.baseY + Math.sin(n1.pulse) * 4;

        nodes.forEach(n2 => {
          if (n2.layerIdx === n1.layerIdx + 1) {
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            // Spawn data stream pulse based on slider freq
            const spawnChance = 0.0005 * pulseFreq;
            if (pulses.length < 25 && Math.random() < spawnChance) {
              pulses.push({
                start: n1,
                end: n2,
                progress: 0,
                speed: 0.015 + Math.random() * 0.01
              });
            }
          }
        });
      });

      // Draw data packets
      pulses.forEach((p, idx) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          pulses.splice(idx, 1);
          return;
        }
        const px = p.start.x + (p.end.x - p.start.x) * p.progress;
        const py = p.start.y + (p.end.y - p.start.y) * p.progress;

        ctx.fillStyle = '#00e5ff';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Nodes
      nodes.forEach(node => {
        const isHovered = selectedNode.name === node.name;
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = isHovered ? 12 : 0;
        
        ctx.strokeStyle = isHovered ? '#00e5ff' : 'rgba(37, 99, 235, 0.3)';
        ctx.lineWidth = isHovered ? 1.5 : 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? 9.5 : 7.5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = isHovered ? '#00e5ff' : 'rgba(0, 229, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? 4.5 : 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      let hoveredNode = null;
      nodes.forEach(node => {
        const dx = node.x - x;
        const dy = node.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 15) hoveredNode = node;
      });

      if (hoveredNode) {
        setSelectedNode({
          name: hoveredNode.name,
          layer: hoveredNode.layer,
          desc: hoveredNode.desc,
          metrics: hoveredNode.metrics
        });
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [selectedNode, pulseFreq]);

  return (
    <div className="min-h-screen bg-bg-base/30 py-12 px-6 md:px-12 relative overflow-hidden select-none font-mono">
      {/* Background orbs */}
      <div className="absolute top-[15%] right-[-5%] w-[450px] h-[450px] bg-blue-600/5 filter blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/5 filter blur-[95px] pointer-events-none" />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-16 border-b border-border-base pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.25em]">[ COGNITIVE TESTING ENGINE ]</span>
          <h1 className="text-4xl font-display font-black text-text-base">Neural Net Sandbox</h1>
          <p className="text-xs text-text-muted-base">Configure active dispatch weights, learning rates, and track model calibration events live.</p>
        </div>
        <div className="text-right text-[9px] text-text-muted-base hidden md:block">
          <span>MODEL_ENGINE: ACTIVE // SYS_v1.0.8</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left 7 Columns: Canvas Visualizer & Terminal Logs */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Canvas Box */}
          <div className="relative bg-[#040816]/40 bg-dark-context p-4 border border-border-base rounded-2xl backdrop-blur-md shadow-2xl flex justify-center items-center">
            <div className="absolute top-2 left-2 text-[8px] text-cyan-500/50 uppercase tracking-widest">[ COGNITIVE_GRAPH ]</div>
            <canvas ref={canvasRef} className="w-full h-[320px] cursor-crosshair z-10" />
          </div>

          {/* Diagnostics terminal logs */}
          <div className="border border-cyan-500/20 rounded-2xl p-4 bg-black/60 text-[8px] flex flex-col gap-1.5 text-left min-h-[120px] justify-end overflow-hidden">
            <div className="text-cyan-500/40 font-bold uppercase tracking-wider mb-1 border-b border-cyan-500/10 pb-1 flex items-center gap-1">
              <FiTerminal className="animate-pulse" />
              <span>COGNITIVE TRAINING LOG FEED</span>
            </div>
            {logs.map((log, idx) => (
              <div key={idx} className="text-cyan-400 leading-tight">
                <span className="text-cyan-600">&gt;&gt;</span> {log}
              </div>
            ))}
          </div>

        </div>

        {/* Right 5 Columns: Diagnostics Sandbox Sliders & Node info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Sliders Console */}
          <div className="bg-[#050816]/80 bg-dark-context p-6 border border-cyan-500/20 rounded-2xl backdrop-blur-xl relative flex flex-col gap-6 font-mono text-xs shadow-2xl text-left">
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40" />
            
            <div className="flex items-center gap-2 border-b border-cyan-500/10 pb-3 text-cyan-400 font-bold text-xs uppercase">
              <FiSliders />
              <span>Diagnostics Sandbox Controls</span>
            </div>

            {/* Learning Rate */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[9px] text-text-muted-base font-bold">
                <span>LEARNING_RATE (alpha)</span>
                <span className="text-cyan-400">{learningRate}</span>
              </div>
              <input 
                type="range" 
                min="0.001" 
                max="0.1" 
                step="0.001"
                value={learningRate} 
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full h-1 bg-cyan-950 appearance-none accent-cyan-400 cursor-pointer outline-none rounded"
              />
            </div>

            {/* Pulse Frequency */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[9px] text-text-muted-base font-bold">
                <span>SYNAPSE PULSE FREQUENCY</span>
                <span className="text-cyan-400">{pulseFreq} / 10</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                step="1"
                value={pulseFreq} 
                onChange={(e) => setPulseFreq(parseInt(e.target.value))}
                className="w-full h-1 bg-cyan-950 appearance-none accent-cyan-400 cursor-pointer outline-none rounded"
              />
            </div>

            {/* Model Temp */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[9px] text-text-muted-base font-bold">
                <span>MODEL TEMPERATURE (entropy)</span>
                <span className="text-cyan-400">{modelTemp}</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="1.5" 
                step="0.1"
                value={modelTemp} 
                onChange={(e) => setModelTemp(parseFloat(e.target.value))}
                className="w-full h-1 bg-cyan-950 appearance-none accent-cyan-400 cursor-pointer outline-none rounded"
              />
            </div>

            {/* Failure Tolerance */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[9px] text-text-muted-base font-bold">
                <span>FAILURE TOLERANCE THRESHOLD</span>
                <span className="text-red-400">{failureThreshold}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="90" 
                step="5"
                value={failureThreshold} 
                onChange={(e) => setFailureThreshold(parseInt(e.target.value))}
                className="w-full h-1 bg-cyan-950 appearance-none accent-cyan-400 cursor-pointer outline-none rounded"
              />
            </div>

          </div>

          {/* Node detail display */}
          <div className="bg-[#050816]/80 bg-dark-context p-5 border border-cyan-500/20 rounded-2xl backdrop-blur-xl relative flex flex-col justify-between font-mono text-xs shadow-2xl text-left min-h-[170px]">
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-500/30" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-500/30" />

            <div className="flex flex-col gap-1.5">
              <span className="text-[8px] text-cyan-500 font-bold uppercase tracking-wider">{selectedNode.layer}</span>
              <h4 className="text-xs font-display font-black text-text-base border-b border-cyan-500/10 pb-2 uppercase tracking-wide">
                {selectedNode.name}
              </h4>
              <p className="text-[10px] text-text-secondary-base leading-relaxed mt-1.5">{selectedNode.desc}</p>
            </div>

            <div className="mt-4 bg-[#02040c] border border-cyan-500/10 p-2.5 rounded-lg text-emerald-400 font-bold text-[9px] flex items-center gap-1.5">
              <FiCheckCircle className="animate-pulse" />
              <span>{selectedNode.metrics}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
