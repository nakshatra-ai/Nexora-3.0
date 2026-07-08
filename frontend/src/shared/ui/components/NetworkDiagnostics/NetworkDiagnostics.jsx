import { useState, useEffect, useRef } from 'react';
import { FiActivity, FiGlobe, FiRadio, FiCheck, FiCpu, FiTrendingUp } from 'react-icons/fi';
import Button from '../../Button/Button';

export default function NetworkDiagnostics() {
  const [testState, setTestState] = useState('idle'); // idle, ping, download, upload, complete
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [pingVal, setPingVal] = useState(0);
  const [jitterVal, setJitterVal] = useState(0);
  const [packetLoss, setPacketLoss] = useState(0);
  const [signalStrength, setSignalStrength] = useState(-65); // -100 to -30 dBm
  const [logs, setLogs] = useState(['SYSTEM READY FOR TELEMETRY LINK']);
  
  const canvasRef = useRef(null);
  const [speedNeedleAngle, setSpeedNeedleAngle] = useState(-120); // deg for SVG rotation

  // Live Canvas Wave Form
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = canvas.width = 400;
    let height = canvas.height = 80;
    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#00e5ff';
      
      // Higher amplitude during speed tests
      let amp = 10;
      let freq = 0.05;
      if (testState === 'download') {
        amp = 25 + Math.random() * 8;
        freq = 0.12;
      } else if (testState === 'upload') {
        amp = 18 + Math.random() * 6;
        freq = 0.09;
      } else if (testState === 'ping') {
        amp = 15;
        freq = 0.07;
      }

      ctx.shadowBlur = testState !== 'idle' ? 6 : 0;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * freq + offset) * amp * Math.sin(x * 0.005);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // reset
      offset += testState !== 'idle' ? 0.25 : 0.06;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [testState]);

  // Speedometer Needle Logic
  useEffect(() => {
    let targetAngle = -120;
    if (testState === 'idle') {
      targetAngle = -120;
    } else if (testState === 'ping') {
      targetAngle = -90 + Math.random() * 20;
    } else if (testState === 'download') {
      // Scale download speed to angle (max 1000 Mbps -> 120 deg)
      targetAngle = -120 + (downloadSpeed / 1000) * 240;
    } else if (testState === 'upload') {
      targetAngle = -120 + (uploadSpeed / 500) * 240;
    } else if (testState === 'complete') {
      targetAngle = -120;
    }
    setSpeedNeedleAngle(targetAngle);
  }, [testState, downloadSpeed, uploadSpeed]);

  const addLog = (text) => {
    setLogs(prev => {
      const next = [...prev, `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] ${text}`];
      if (next.length > 5) next.shift();
      return next;
    });
  };

  const runDiagnostics = () => {
    setTestState('ping');
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPingVal(0);
    setJitterVal(0);
    setPacketLoss(0);
    setSignalStrength(-65);
    setLogs([]);
    addLog('INITIATING TELEMETRY DIAGNOSTICS LINK...');

    // Phase 1: Ping
    setTimeout(() => {
      addLog('SOCKET CONNECTED TO SERVER: IND_DELHI_EDGE_01');
      setPingVal(14);
      setJitterVal(1.1);
      setSignalStrength(-42);
      addLog('PING COMPLETE: 14ms // JITTER: 1.1ms');
      
      // Phase 2: Download
      setTestState('download');
      addLog('DOWNLINK PORT ENGAGED // INGESTING TELEMETRY STREAMS...');
      
      let dl = 0;
      const dlInterval = setInterval(() => {
        dl += 65 + Math.floor(Math.random() * 45);
        if (dl >= 840) {
          clearInterval(dlInterval);
          setDownloadSpeed(842.6);
          addLog('DOWNLOAD SPEED BENCHMARK: 842.6 Mbps');
          
          // Phase 3: Upload
          setTestState('upload');
          addLog('UPLINK PORT ENGAGED // UPLOADING STABILIZATION DATAPACKS...');
          
          let ul = 0;
          const ulInterval = setInterval(() => {
            ul += 35 + Math.floor(Math.random() * 25);
            if (ul >= 410) {
              clearInterval(ulInterval);
              setUploadSpeed(412.3);
              addLog('UPLOAD SPEED BENCHMARK: 412.3 Mbps');
              
              // Phase 4: Packet Loss & Final
              addLog('CALCULATING PACKET DROP RATIO...');
              setPacketLoss(0.00);
              setTestState('complete');
              addLog('DIAGNOSTICS SEQUENCE COMPLETED. ALL SYSTEMS OPERATIONAL.');
            } else {
              setUploadSpeed(parseFloat((ul + Math.random() * 10).toFixed(1)));
            }
          }, 200);
        } else {
          setDownloadSpeed(parseFloat((dl + Math.random() * 20).toFixed(1)));
        }
      }, 200);

    }, 2000);
  };

  return (
    <section className="py-24 px-6 md:px-12 select-none font-sans relative overflow-hidden bg-bg-base/20 border-t border-b border-border-base">
      
      {/* Decorative Grid Details */}
      <div className="absolute inset-0 bg-hud-grid opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <div className="flex flex-col gap-2 text-center max-w-lg mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono">[ NETWORK CONSOLE ]</span>
          <h2 className="text-3xl font-display font-bold text-text-base">AI Network Speed Test</h2>
          <p className="text-xs text-text-muted-base">Inspect active node telemetry, downlink packet rates, and link stability in real-time.</p>
        </div>

        {/* Console Dashboard Container */}
        <div className="w-full max-w-5xl bg-[#050816]/75 bg-dark-context border border-cyan-500/20 backdrop-blur-xl p-8 rounded-2xl relative overflow-hidden font-mono shadow-[0_0_30px_rgba(0,229,255,0.05)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Tech Corner Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40" />

          {/* Left Column: Speedometer circular dial */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 200 200" className="w-48 h-48 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,229,255,0.1)]">
              {/* Outer dial ring */}
              <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" fill="none" opacity="0.3" />
              <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="2" strokeDasharray="6 30" fill="none" opacity="0.6" />
              
              {/* Speed markings */}
              <text x="35" y="150" fill="var(--text-muted)" fontSize="8" textAnchor="middle">0</text>
              <text x="30" y="90" fill="var(--text-muted)" fontSize="8" textAnchor="middle">100</text>
              <text x="55" y="45" fill="var(--text-muted)" fontSize="8" textAnchor="middle">250</text>
              <text x="100" y="30" fill="var(--text-muted)" fontSize="8" textAnchor="middle">500</text>
              <text x="145" y="45" fill="var(--text-muted)" fontSize="8" textAnchor="middle">750</text>
              <text x="170" y="90" fill="var(--text-muted)" fontSize="8" textAnchor="middle">1000</text>
              
              {/* Center point */}
              <circle cx="100" cy="100" r="6" fill="#00ffff" />
              <circle cx="100" cy="100" r="16" stroke="#00ffff" strokeWidth="0.5" fill="none" opacity="0.4" />
              
              {/* Needle line */}
              <line 
                x1="100" y1="100" 
                x2="100" y2="40" 
                stroke="#00e5ff" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                style={{ 
                  transform: `rotate(${speedNeedleAngle}deg)`,
                  transformOrigin: '100px 100px',
                  transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }} 
              />
            </svg>

            {/* Live readout */}
            <div className="flex flex-col items-center mt-4">
              <span className="text-3xl font-black text-text-base tracking-tighter">
                {testState === 'download' ? downloadSpeed : testState === 'upload' ? uploadSpeed : testState === 'complete' ? downloadSpeed : '0.0'}
              </span>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mt-0.5">MBPS RATE</span>
            </div>
          </div>

          {/* Center Column: Speed Metrics */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            <div className="bg-card-base/20 border border-border-base/50 p-4 rounded-xl relative flex flex-col gap-1 overflow-hidden group">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-cyan-400" />
              <span className="text-[8px] text-text-muted-base font-bold uppercase tracking-wider">DOWNLOAD SPEED</span>
              <span className="text-lg font-black text-text-base">{downloadSpeed} <span className="text-xs text-text-muted-base">Mbps</span></span>
              <div className="flex items-center gap-1.5 text-[8px] text-cyan-400 font-bold mt-1 uppercase">
                <FiTrendingUp /> {testState === 'download' ? 'STREAMING...' : 'BENCHMARK'}
              </div>
            </div>

            <div className="bg-card-base/20 border border-border-base/50 p-4 rounded-xl relative flex flex-col gap-1 overflow-hidden group">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-blue-500" />
              <span className="text-[8px] text-text-muted-base font-bold uppercase tracking-wider">UPLOAD SPEED</span>
              <span className="text-lg font-black text-text-base">{uploadSpeed} <span className="text-xs text-text-muted-base">Mbps</span></span>
              <div className="flex items-center gap-1.5 text-[8px] text-blue-400 font-bold mt-1 uppercase">
                <FiRadio /> {testState === 'upload' ? 'UPLOADING...' : 'BENCHMARK'}
              </div>
            </div>

            <div className="bg-card-base/20 border border-border-base/50 p-4 rounded-xl relative flex flex-col gap-1 overflow-hidden group">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-success-base" />
              <span className="text-[8px] text-text-muted-base font-bold uppercase tracking-wider">PING LATENCY</span>
              <span className="text-lg font-black text-text-base">{pingVal || '--'} <span className="text-xs text-text-muted-base">ms</span></span>
              <div className="text-[8px] text-emerald-400 font-bold mt-1 uppercase">
                {pingVal ? '● EXCELLENT' : 'AWAITING'}
              </div>
            </div>

            <div className="bg-card-base/20 border border-border-base/50 p-4 rounded-xl relative flex flex-col gap-1 overflow-hidden group">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-yellow-500" />
              <span className="text-[8px] text-text-muted-base font-bold uppercase tracking-wider">JITTER VALUE</span>
              <span className="text-lg font-black text-text-base">{jitterVal || '--'} <span className="text-xs text-text-muted-base">ms</span></span>
              <div className="text-[8px] text-yellow-500 font-bold mt-1 uppercase">
                {jitterVal ? '● JTR_STABLE' : 'AWAITING'}
              </div>
            </div>

            <div className="bg-card-base/20 border border-border-base/50 p-4 rounded-xl relative flex flex-col gap-1 overflow-hidden group">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-red-500" />
              <span className="text-[8px] text-text-muted-base font-bold uppercase tracking-wider">PACKET LOSS</span>
              <span className="text-lg font-black text-text-base">{testState === 'complete' ? `${packetLoss}%` : '--'}</span>
              <div className="text-[8px] text-red-400 font-bold mt-1 uppercase">
                {testState === 'complete' ? '● ZERO_DROP' : 'AWAITING'}
              </div>
            </div>

            <div className="bg-card-base/20 border border-border-base/50 p-4 rounded-xl relative flex flex-col gap-1 overflow-hidden group">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-emerald-400" />
              <span className="text-[8px] text-text-muted-base font-bold uppercase tracking-wider">SIGNAL STRENGTH</span>
              <span className="text-lg font-black text-text-base">{testState !== 'idle' ? `${signalStrength} dBm` : '--'}</span>
              <div className="text-[8px] text-emerald-400 font-bold mt-1 uppercase">
                {testState !== 'idle' ? '● EXCELLENT SIGNAL' : 'AWAITING'}
              </div>
            </div>

          </div>

          {/* Right Column: Console terminal logs and wave visualizer */}
          <div className="lg:col-span-3 flex flex-col gap-4 self-stretch justify-between">
            {/* Live Canvas Graph */}
            <div className="border border-cyan-500/20 rounded-xl p-2 bg-cyan-950/10 flex flex-col justify-between">
              <div className="text-[7px] text-cyan-500/40 uppercase font-mono font-bold tracking-wider mb-2">LIVE DIALOGUE WAVEFORM</div>
              <canvas ref={canvasRef} className="w-full h-16 rounded bg-black/40 border border-border-base/30" />
            </div>

            {/* Monospace terminal logs */}
            <div className="flex-1 border border-cyan-500/20 rounded-xl p-3 bg-black/50 text-[7px] flex flex-col gap-1.5 text-left font-mono min-h-[100px] overflow-hidden justify-end">
              {logs.map((log, idx) => (
                <div key={idx} className="text-cyan-400 leading-tight">
                  <span className="text-cyan-600">&gt;&gt;</span> {log}
                </div>
              ))}
            </div>

            {/* Primary Action Button */}
            <Button 
              variant="accent" 
              onClick={runDiagnostics}
              disabled={testState !== 'idle' && testState !== 'complete'}
              className="w-full py-3.5 text-xs font-bold shadow-[0_0_20px_rgba(0,229,255,0.15)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest font-mono"
            >
              {testState === 'idle' ? 'Start Test' : testState === 'complete' ? 'Test Again' : 'Testing...'}
            </Button>
          </div>

        </div>

      </div>

    </section>
  );
}
