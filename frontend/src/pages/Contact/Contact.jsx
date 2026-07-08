import { useState } from 'react';
import { FiMapPin, FiPhoneCall, FiClock, FiGlobe, FiAlertCircle } from 'react-icons/fi';

const officeLocations = [
  { id: 'noida', name: 'Noida HQ (Primary)', coords: { x: 135, y: 92 }, ping: 12, status: 'NOMINAL', phone: '+91 120 400 9000' },
  { id: 'bangalore', name: 'Bengaluru R&D', coords: { x: 132, y: 110 }, ping: 24, status: 'NOMINAL', phone: '+91 80 500 8122' },
  { id: 'london', name: 'London Edge Gateway', coords: { x: 86, y: 55 }, ping: 114, status: 'NOMINAL', phone: '+44 20 7946 0912' },
  { id: 'newyork', name: 'New York Data Center', coords: { x: 52, y: 64 }, ping: 192, status: 'STANDBY', phone: '+1 212 555 0184' }
];

export default function Contact() {
  const [activeOffice, setActiveOffice] = useState(officeLocations[0]);

  return (
    <div className="min-h-screen bg-bg-base/30 py-12 px-6 md:px-12 relative overflow-hidden select-none font-mono">
      {/* Background orbs */}
      <div className="absolute top-[10%] right-[-5%] w-[450px] h-[450px] bg-blue-600/5 filter blur-[115px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] bg-cyan-500/5 filter blur-[110px] pointer-events-none" />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-16 border-b border-border-base pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.25em]">[ COMMUNICATIONS GATEWAY ]</span>
          <h1 className="text-4xl font-display font-black text-text-base">Contact & Comms</h1>
          <p className="text-xs text-text-muted-base">Corporate offices directory, localized routing gateways, and phone lines.</p>
        </div>
        <div className="text-right text-[9px] text-text-muted-base hidden md:block">
          <span>COMMS_LINKS: 4 GATEWAYS ONLINE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left 5 Columns: Corporate Details Dossier */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left">
          
          <div className="bg-[#050816]/75 bg-dark-context border border-cyan-500/20 backdrop-blur-xl p-6 rounded-2xl relative flex flex-col gap-5 shadow-2xl">
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-cyan-500/30" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-cyan-500/30" />
            
            <div className="flex items-center gap-2 border-b border-cyan-500/10 pb-3 text-cyan-400 font-bold text-xs uppercase">
              <FiMapPin />
              <span>Corporate HQ Address</span>
            </div>
            <div className="flex flex-col gap-1.5 text-xs text-text-secondary-base leading-relaxed">
              <span className="font-bold text-text-base">NEXORA AI Headquarters</span>
              <span>Sector-62, Block C,</span>
              <span>Noida, Uttar Pradesh - 201301, India</span>
            </div>
          </div>

          <div className="bg-[#050816]/75 bg-dark-context border border-cyan-500/20 backdrop-blur-xl p-6 rounded-2xl relative flex flex-col gap-5 shadow-2xl">
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-cyan-500/30" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-cyan-500/30" />

            <div className="flex items-center gap-2 border-b border-cyan-500/10 pb-3 text-cyan-400 font-bold text-xs uppercase">
              <FiPhoneCall />
              <span>Primary Phone Lines</span>
            </div>
            <div className="flex flex-col gap-2.5 text-xs text-text-secondary-base">
              <div className="flex justify-between">
                <span>Noida HQ Comm:</span>
                <span className="font-bold text-text-base">{officeLocations[0].phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Bengaluru R&D:</span>
                <span className="font-bold text-text-base">{officeLocations[1].phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Global Support Line:</span>
                <span className="font-bold text-cyan-400">+1 800 NEXORA AI</span>
              </div>
            </div>
          </div>

          <div className="bg-[#050816]/75 bg-dark-context border border-cyan-500/20 backdrop-blur-xl p-6 rounded-2xl relative flex flex-col gap-5 shadow-2xl">
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-cyan-500/30" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-cyan-500/30" />

            <div className="flex items-center gap-2 border-b border-cyan-500/10 pb-3 text-cyan-400 font-bold text-xs uppercase">
              <FiClock />
              <span>Office Operational Hours</span>
            </div>
            <div className="flex flex-col gap-2 text-xs text-text-secondary-base">
              <div className="flex justify-between">
                <span>Standard Operations:</span>
                <span className="font-bold text-text-base">08:00 - 20:00 IST</span>
              </div>
              <div className="flex justify-between">
                <span>Technical Support:</span>
                <span className="font-bold text-emerald-400">24/7/365 ONLINE</span>
              </div>
              <span className="text-[9px] text-text-muted-base border-t border-border-base/30 pt-2 uppercase mt-1">
                Note: Emergency failover protocols operate autonomously without staff dispatcher cues.
              </span>
            </div>
          </div>

        </div>

        {/* Right 7 Columns: Interactive Vector SVG Office Map */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="bg-[#050816]/75 bg-dark-context border border-cyan-500/20 backdrop-blur-xl p-6 rounded-2xl relative flex flex-col gap-6 shadow-2xl">
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40" />
            
            <div className="flex justify-between items-center border-b border-cyan-500/10 pb-3 text-cyan-400 font-bold text-xs uppercase">
              <div className="flex items-center gap-2">
                <FiGlobe />
                <span>Global Office Nodes Routing Map</span>
              </div>
              <span className="text-[8px] text-text-muted-base uppercase">Interactive Topology</span>
            </div>

            {/* Vector World Grid SVG */}
            <div className="w-full bg-[#02040c] border border-border-base/50 rounded-xl p-4 flex justify-center items-center relative overflow-hidden">
              <svg viewBox="0 0 200 120" className="w-full text-cyan-500/10">
                {/* Simulated geographic grids outline */}
                <line x1="0" y1="20" x2="200" y2="20" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 4" />
                <line x1="0" y1="40" x2="200" y2="40" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 4" />
                <line x1="0" y1="60" x2="200" y2="60" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 4" />
                <line x1="0" y1="80" x2="200" y2="80" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 4" />
                <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 4" />
                
                <line x1="40" y1="0" x2="40" y2="120" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 4" />
                <line x1="80" y1="0" x2="80" y2="120" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 4" />
                <line x1="120" y1="0" x2="120" y2="120" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 4" />
                <line x1="160" y1="0" x2="160" y2="120" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 4" />

                {/* Simulated Node connection paths */}
                <path d="M 52,64 L 86,55 L 135,92 L 132,110" fill="none" stroke="#00e5ff" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.4" />

                {/* Office node markers */}
                {officeLocations.map((office) => (
                  <g 
                    key={office.id} 
                    className="cursor-pointer"
                    onClick={() => setActiveOffice(office)}
                  >
                    <circle 
                      cx={office.coords.x} 
                      cy={office.coords.y} 
                      r={activeOffice.id === office.id ? '5' : '3'} 
                      fill={activeOffice.id === office.id ? '#00e5ff' : '#2563eb'} 
                      className={activeOffice.id === office.id ? 'animate-pulse' : ''}
                    />
                    <circle 
                      cx={office.coords.x} 
                      cy={office.coords.y} 
                      r={activeOffice.id === office.id ? '10' : '6'} 
                      stroke="#00ffff" 
                      strokeWidth="0.5" 
                      fill="none" 
                      opacity="0.3"
                      className="animate-ping" 
                      style={{ animationDuration: '3s' }}
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Active office statistics */}
            <div className="bg-card-base/30 border border-border-base/50 p-4 rounded-xl flex flex-col gap-3 text-left">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-text-base">{activeOffice.name}</span>
                <span className="text-[8px] bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded text-cyan-400 font-bold uppercase">PING: {activeOffice.ping}ms</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[10px] text-text-secondary-base font-mono">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[7.5px] text-text-muted-base">Status:</span>
                  <span className="font-bold text-emerald-400">● {activeOffice.status}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[7.5px] text-text-muted-base">Phone:</span>
                  <span className="font-bold text-text-base">{activeOffice.phone}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
