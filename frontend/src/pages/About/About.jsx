import { useState, useEffect } from 'react';
import AboutSection from '../../shared/ui/components/AboutSection/AboutSection';
import { FiCpu, FiGlobe, FiRadio, FiShield, FiTrendingUp } from 'react-icons/fi';
import Button from '../../shared/ui/Button/Button';

export default function About() {
  const [activeOrbit, setActiveOrbit] = useState('LEO_NXR_1');
  const [satTelemetry, setSatTelemetry] = useState({
    altitude: 542,
    latency: 8.4,
    status: 'OPTIMAL',
    load: 14.2
  });

  // Simulate satellite telemetry shifts
  useEffect(() => {
    const interval = setInterval(() => {
      setSatTelemetry(prev => ({
        altitude: parseFloat((540 + Math.random() * 5).toFixed(1)),
        latency: parseFloat((8.0 + Math.random() * 0.8).toFixed(2)),
        status: Math.random() > 0.05 ? 'OPTIMAL' : 'RE-CALIBRATING',
        load: parseFloat((12.0 + Math.random() * 4).toFixed(1))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-bg-base/30 py-12 px-6 md:px-12 relative overflow-hidden select-none font-mono">
      {/* Ambient background glowing elements */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-blue-600/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 filter blur-[120px] pointer-events-none" />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-16 relative z-10 border-b border-border-base pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.25em]">[ CORPORATE PROFILE // SCHEMA ]</span>
          <h1 className="text-4xl font-display font-black text-text-base">About NEXORA AI</h1>
          <p className="text-xs text-text-muted-base">Exploring the history, core blueprints, and satellite networks routing the future.</p>
        </div>
        <div className="text-right font-mono text-[9px] text-text-muted-base hidden md:block">
          <span>OS_藍_蓝: PROFILE_LOADED_OK</span> <br />
          <span>BLUEPRINT_CHECKSUM_2541A9</span>
        </div>
      </div>

      {/* Renders Mission, Vision, Values, and History Timeline */}
      <div className="max-w-7xl mx-auto relative z-10">
        <AboutSection />
      </div>

      {/* Bottom Section: AI Innovation & Telecom Future */}
      <div className="max-w-7xl mx-auto mt-24 relative z-10">
        <div className="flex flex-col gap-2.5 text-center max-w-lg mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono">[ FUTURISTIC TELECOM BLUEPRINTS ]</span>
          <h2 className="text-3xl font-display font-bold text-text-base">AI Innovation & Satellite Future</h2>
          <p className="text-xs text-text-muted-base">Inspecting active Low-Earth-Orbit satellite telemetry and next-gen 6G routing layers.</p>
        </div>

        <div className="w-full bg-[#050816]/75 bg-dark-context border border-cyan-500/20 backdrop-blur-xl p-8 rounded-2xl relative overflow-hidden font-mono shadow-[0_0_30px_rgba(0,229,255,0.05)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Tech Corner Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40" />

          {/* Satellite Tracker Graphic */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center relative min-h-[220px]">
            <div className="text-[8px] text-cyan-500/50 uppercase font-mono font-bold absolute top-0 left-0">ORBITAL LINK VISUALIZER</div>
            
            <svg viewBox="0 0 200 200" className="w-56 h-56 text-cyan-400">
              {/* Concentric orbital rings */}
              <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" fill="none" opacity="0.3" />
              <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" fill="none" opacity="0.4" />
              <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
              
              {/* Earth representation */}
              <circle cx="100" cy="100" r="22" stroke="#2563eb" strokeWidth="1" fill="none" className="animate-[spin_40s_linear_infinite]" />
              <circle cx="100" cy="100" r="4" fill="#00ffff" />

              {/* Satellite nodes */}
              <g className="animate-[spin_60s_linear_infinite]">
                <rect x="95" y="15" width="10" height="4" fill="#00e5ff" />
                <circle cx="100" cy="17" r="1.5" fill="#ffffff" />
                <line x1="100" y1="17" x2="100" y2="100" stroke="currentColor" strokeWidth="0.25" opacity="0.2" />
              </g>

              <g className="animate-[spin_40s_linear_infinite_reverse]">
                <rect x="96" y="42" width="8" height="3" fill="#00ff9d" />
                <circle cx="100" cy="43.5" r="1.2" fill="#ffffff" />
              </g>

              {/* Pulsing signal waves */}
              <circle cx="100" cy="17" r="10" stroke="#00ffff" strokeWidth="0.5" fill="none" className="animate-ping" style={{ animationDuration: '3s' }} />
            </svg>
          </div>

          {/* Satellite Details Panel */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">ACTIVE LINK MATRIX</span>
              <h3 className="text-xl font-display font-bold text-text-base">Satellite Backbone</h3>
              <p className="text-xs text-text-secondary-base leading-relaxed mt-2">
                NEXORA incorporates satellite link protocols, connecting deep mountain stations and offshore facilities directly to metropolitan routing pipelines using intelligent atmospheric link adaptation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card-base/20 border border-border-base/50 p-4 rounded-xl relative flex flex-col gap-1">
                <span className="text-[8px] text-text-muted-base font-bold uppercase">ALTITUDE (LEO)</span>
                <span className="text-md font-bold text-text-base">{satTelemetry.altitude} km</span>
              </div>
              <div className="bg-card-base/20 border border-border-base/50 p-4 rounded-xl relative flex flex-col gap-1">
                <span className="text-[8px] text-text-muted-base font-bold uppercase">LINK LATENCY</span>
                <span className="text-md font-bold text-text-base">{satTelemetry.latency} ms</span>
              </div>
              <div className="bg-card-base/20 border border-border-base/50 p-4 rounded-xl relative flex flex-col gap-1">
                <span className="text-[8px] text-text-muted-base font-bold uppercase">CHANNEL STATUS</span>
                <span className="text-md font-bold text-text-base text-emerald-400">{satTelemetry.status}</span>
              </div>
              <div className="bg-card-base/20 border border-border-base/50 p-4 rounded-xl relative flex flex-col gap-1">
                <span className="text-[8px] text-text-muted-base font-bold uppercase">SATELLITE LOAD</span>
                <span className="text-md font-bold text-text-base">{satTelemetry.load}%</span>
              </div>
            </div>

            {/* Orbit select options */}
            <div className="flex gap-2.5 text-[8.5px] uppercase font-bold tracking-wider pt-2 border-t border-border-base/30">
              {['LEO_NXR_1', 'LEO_NXR_2', 'GEO_BACKUP_1'].map((orb) => (
                <button 
                  key={orb}
                  onClick={() => {
                    setActiveOrbit(orb);
                    setSatTelemetry(prev => ({
                      ...prev,
                      altitude: orb.startsWith('GEO') ? 35786 : 542,
                      latency: orb.startsWith('GEO') ? 240.2 : 8.4
                    }));
                  }}
                  className={`px-3 py-1.5 border rounded-lg transition-all cursor-pointer ${activeOrbit === orb ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400' : 'bg-card-base/20 border-border-base/50 text-text-muted-base hover:text-text-base'}`}
                >
                  {orb}
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
