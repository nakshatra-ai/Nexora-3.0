import { useEffect, useRef, useState } from 'react';

// Neural Net Canvas Component
function NeuralNetworkLab() {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState({
    name: 'NLP_PARSER_01',
    layer: 'INPUT LAYER',
    desc: 'Ingests raw user descriptions and extracts key priority indices.',
    metrics: 'Active rate: 98.4% // Weight: 0.91'
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = canvas.width = 500;
    let height = canvas.height = 300;



    width = canvas.width = 500;
    height = canvas.height = 300;

    // Define Neural Network Structure
    const layers = [3, 4, 3, 2]; // Input, Hidden 1, Hidden 2, Output
    const nodes = [];
    const layerSpacing = 120;
    const startX = 60;

    // Node metadata to match hovering console details
    const nodeDetails = {
      '0-0': { name: 'NLP_TEXT_PARSER', layer: 'INPUT LAYER', desc: 'Parses unstructured text descriptions to flag alarm codes.', metrics: 'Status: OK // Confidence: 0.94' },
      '0-1': { name: 'GPS_LOC_TELEMETRY', layer: 'INPUT LAYER', desc: 'Queries distance vector values of nearby field staff.', metrics: 'Traces: 489 active // Sync: true' },
      '0-2': { name: 'BACKLOG_WEIGHT', layer: 'INPUT LAYER', desc: 'Ingests queue loading and delays from the backlog cache.', metrics: 'Queue: 12 open // Load: nominal' },
      
      '1-0': { name: 'URGENCY_CLASSIFIER', layer: 'HIDDEN LAYER 1', desc: 'Assigns classification priority tags based on keywords.', metrics: 'Accuracy: 98.2% // Loss: 0.04' },
      '1-1': { name: 'GEO_DIST_CALCULATOR', layer: 'HIDDEN LAYER 1', desc: 'Computes road routing matrices for dispatched staff.', metrics: 'Ping: 12ms // Buffer: nominal' },
      '1-2': { name: 'WORKLOAD_OPTIMIZER', layer: 'HIDDEN LAYER 1', desc: 'Evaluates technician active loads to prevent queue bottlenecking.', metrics: 'Nodes: 4 nodes active' },
      '1-3': { name: 'SPECIALIZATION_TAGGER', layer: 'HIDDEN LAYER 1', desc: 'Matches line problems (fiber, router) to technician skills.', metrics: 'Weights: w1=0.88, w2=0.74' },
      
      '2-0': { name: 'SLA_RANKING_ENGINE', layer: 'HIDDEN LAYER 2', desc: 'Evaluates response targets against SLA parameters.', metrics: 'Target: <15s // Uptime: 99.9%' },
      '2-1': { name: 'ATTENUATION_CORRELATOR', layer: 'HIDDEN LAYER 2', desc: 'Analyzes OTDR signal degradation metrics.', metrics: 'Signal: -19dBm // Health: 100%' },
      '2-2': { name: 'REACTION_FAILOVER_DAEMON', layer: 'HIDDEN LAYER 2', desc: 'Calculates port recovery directions during OLT breaks.', metrics: 'Link failover check: pass' },
      
      '3-0': { name: 'AUTO_DISPATCH_DISPATCHER', layer: 'OUTPUT LAYER', desc: 'Triggers matching work orders to specific field engineers.', metrics: 'Latency: 24s // Rate: 99.4%' },
      '3-1': { name: 'SELF_HEALING_ROUTER', layer: 'OUTPUT LAYER', desc: 'Pushes port configuration templates to OLT gateways.', metrics: 'Uptime: 99.98% // Code: OK' },
    };

    // Construct nodes coordinates
    layers.forEach((count, lIdx) => {
      const x = startX + lIdx * layerSpacing;
      const yOffset = (height - (count - 1) * 60) / 2;

      for (let nIdx = 0; nIdx < count; nIdx++) {
        const key = `${lIdx}-${nIdx}`;
        nodes.push({
          id: key,
          x: x,
          y: yOffset + nIdx * 60,
          baseY: yOffset + nIdx * 60,
          driftOffset: Math.random() * Math.PI * 2,
          size: 6,
          pulse: Math.random() * Math.PI,
          layerIdx: lIdx,
          nodeIdx: nIdx,
          ...nodeDetails[key]
        });
      }
    });

    // Pulses (data streams) traveling along connections
    const pulses = [];
    const maxPulses = 15;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Synapses (Connection lines between adjacent layers)
      ctx.lineWidth = 0.5;
      nodes.forEach(n1 => {
        // Drift nodes slightly for natural organic motion
        n1.pulse += 0.02;
        n1.y = n1.baseY + Math.sin(n1.pulse) * 4;

        nodes.forEach(n2 => {
          if (n2.layerIdx === n1.layerIdx + 1) {
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            // Spawn data stream pulse
            if (pulses.length < maxPulses && Math.random() < 0.001) {
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

      // 2. Draw active pulses (Glowing data packets)
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
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // 3. Draw Nodes
      nodes.forEach(node => {
        const isHovered = selectedNode.name === node.name;
        
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = isHovered ? 12 : 0;
        
        // Node outer ring
        ctx.strokeStyle = isHovered ? '#00e5ff' : 'rgba(37, 99, 235, 0.3)';
        ctx.lineWidth = isHovered ? 1.5 : 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? 10 : 8, 0, Math.PI * 2);
        ctx.stroke();

        // Node center core
        ctx.fillStyle = isHovered ? '#00e5ff' : 'rgba(0, 229, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? 5 : 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse Move Hover Listener to select active node
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Find node under mouse
      let hoveredNode = null;
      nodes.forEach(node => {
        const dx = node.x - x;
        const dy = node.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 15) {
          hoveredNode = node;
        }
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
  }, [selectedNode]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
      {/* Left: Canvas graph visualizer */}
      <div className="md:col-span-7 flex justify-center relative bg-[#040816]/40 bg-dark-context p-4 border border-border-base rounded-2xl backdrop-blur-md shadow-2xl">
        <div className="absolute top-1.5 left-1.5 text-[8px] font-mono text-cyan-500/50 uppercase tracking-widest">[ NEURAL_NET_VISUALIZER ]</div>
        <canvas ref={canvasRef} className="w-full h-[300px] cursor-crosshair z-10" />
      </div>
 
      {/* Right: Glassmorphic diagnostic console */}
      <div className="md:col-span-5 flex flex-col gap-4 bg-[#040816]/80 bg-dark-context p-6 border border-cyan-500/20 rounded-2xl backdrop-blur-xl relative min-h-[300px] justify-between font-mono text-xs shadow-2xl">
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40" />

        <div className="flex flex-col gap-1">
          <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">
            {selectedNode.layer}
          </span>
          <h4 className="text-sm font-display font-black text-text-base tracking-widest border-b border-border-color/30 pb-2 uppercase">
            {selectedNode.name}
          </h4>
        </div>

        <div className="flex-1 py-4 flex flex-col gap-3 justify-center text-[11px] text-text-secondary-base leading-relaxed">
          <p>{selectedNode.desc}</p>
          <div className="bg-[#02040c] border border-border-color/40 p-3 rounded-lg text-emerald-400 font-bold text-[10px]">
            &gt;&gt; {selectedNode.metrics}
          </div>
        </div>

        <div className="flex justify-between items-center text-[8px] text-text-muted-base border-t border-border-color/30 pt-3">
          <span>OPERATIONS: STABLE</span>
          <span>CALIBRATED: 99.8%</span>
        </div>
      </div>
    </div>
  );
}

export default function AIFeaturesPreview() {
  return (
    <section id="ai-features" className="ai-bg py-24 px-6 md:px-12 select-none font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2.5 text-center max-w-lg mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono">[ COGNITIVE MATRIX ]</span>
          <h2 className="text-3xl font-display font-bold text-text-base">Embedded AI Diagnostics</h2>
          <p className="text-xs text-text-muted-base">Explore the neural networks routing incidents and configurations autonomously.</p>
        </div>

        {/* Neural Network Lab Interactive Component */}
        <NeuralNetworkLab />

      </div>
    </section>
  );
}
