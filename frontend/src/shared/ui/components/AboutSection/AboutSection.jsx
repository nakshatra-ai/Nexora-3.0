import { useState } from 'react';
import { FiTarget, FiEye, FiZap } from 'react-icons/fi';

const timelineMilestones = [
  {
    year: '2024',
    title: 'Project Inception',
    detail: 'Validated deep NLP algorithms to process customer support logs, categorization latency reduced by 85%.',
    logs: [
      'SYS_INIT: OK',
      'NLP_MODEL_LOAD: success',
      'SLA_LATENCY_SET: 20s'
    ]
  },
  {
    year: '2025',
    title: 'AI Dispatch Launch',
    detail: 'Released the auto-dispatch routing algorithm integrating live GPS telemetry. Configured support for 400+ technicians.',
    logs: [
      'DISPATCH_KERN_v2: active',
      'GPS_LINK_ON: true',
      'BACKLOG_BUFF: cleared'
    ]
  },
  {
    year: '2026',
    title: 'Self-Healing Core',
    detail: 'Implemented automatic OLT re-routing profiles to recover services during fiber cut incidents under 3 seconds.',
    logs: [
      'SELF_HEAL_DAEMON: up',
      'OLT_FAILOVER: verified',
      'SLA_METRIC: 99.98%'
    ]
  }
];

export default function AboutSection() {
  const [activeMilestone, setActiveMilestone] = useState(0);

  // 3D Tilt handler for cards
  const applyTilt = (e, maxTilt = 10) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = ((yc - y) / yc) * maxTilt;
    const rotateY = ((x - xc) / xc) * -maxTilt; // reverse for natural rotation

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.boxShadow = `0 15px 30px rgba(0, 229, 255, 0.15)`;
    card.style.borderColor = 'var(--accent)';
  };

  const removeTilt = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`;
    card.style.boxShadow = '';
    card.style.borderColor = '';
  };

  return (
    <section id="about" className="about-bg py-24 px-6 md:px-12 select-none font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2.5 text-center max-w-lg mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono">[ SYSTEM ABOUT MATRIX ]</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-base">About NEXORA AI</h2>
          <p className="text-xs text-text-muted-base">Mapping the evolution of telecom automation and our core values.</p>
        </div>

        {/* 3D Mission, Vision, Values Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div 
            onMouseMove={(e) => applyTilt(e)}
            onMouseLeave={removeTilt}
            className="panel-card p-8 flex flex-col gap-4 border border-border-base bg-card-base/40 backdrop-blur-xl rounded-2xl cursor-default transition-all duration-300 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full filter blur-xl group-hover:bg-blue-500/10 transition-all duration-500" />
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.15)]">
              <FiTarget size={22} className="group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <h4 className="text-lg font-display font-bold text-text-base">Our Mission</h4>
            <p className="text-xs text-text-secondary-base leading-relaxed">
              Bridge infrastructure gaps by routing active telecom events directly to engineers using machine-learning constraints, eliminating latency delays and dispatch queues completely.
            </p>
          </div>

          <div 
            onMouseMove={(e) => applyTilt(e)}
            onMouseLeave={removeTilt}
            className="panel-card p-8 flex flex-col gap-4 border border-border-base bg-card-base/40 backdrop-blur-xl rounded-2xl cursor-default transition-all duration-300 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full filter blur-xl group-hover:bg-cyan-500/10 transition-all duration-500" />
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
              <FiEye size={22} className="group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h4 className="text-lg font-display font-bold text-text-base">Our Vision</h4>
            <p className="text-xs text-text-secondary-base leading-relaxed">
              Pioneer a global landscape where telecom structures diagnose anomalies, assign repairs, and re-route fiber lines autonomously without manual coordination, protecting connectivity SLAs.
            </p>
          </div>

          <div 
            onMouseMove={(e) => applyTilt(e)}
            onMouseLeave={removeTilt}
            className="panel-card p-8 flex flex-col gap-4 border border-border-base bg-card-base/40 backdrop-blur-xl rounded-2xl cursor-default transition-all duration-300 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full filter blur-xl group-hover:bg-emerald-500/10 transition-all duration-500" />
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(0,255,157,0.15)]">
              <FiZap size={22} className="group-hover:animate-pulse transition-all duration-300" />
            </div>
            <h4 className="text-lg font-display font-bold text-text-base">Core Values</h4>
            <p className="text-xs text-text-secondary-base leading-relaxed">
              Maintain mathematical routing honesty, deliver millisecond diagnostic updates, respect data telemetry encryption keys, and prioritize zero SLA degradation parameters.
            </p>
          </div>
        </div>

        {/* Interactive Cyber-Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Vertical Timeline Steps */}
          <div className="lg:col-span-6 flex flex-col gap-8 relative pl-6 border-l-2 border-border-base/60">
            <div className="absolute top-0 bottom-0 left-[5px] w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-emerald-400 pointer-events-none" />

            {timelineMilestones.map((milestone, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveMilestone(idx)}
                className={`relative flex flex-col gap-2 p-5 rounded-xl border cursor-pointer transition-all duration-300 group ${
                  activeMilestone === idx 
                    ? 'bg-primary-light-base/10 border-cyan-500/50 shadow-[0_0_20px_rgba(0,229,255,0.1)]' 
                    : 'bg-card-base/20 border-border-base/50 hover:bg-card-base/30'
                }`}
              >
                {/* Timeline node dot */}
                <div className={`absolute -left-[30px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-colors duration-300 flex items-center justify-center ${
                  activeMilestone === idx 
                    ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.8)]' 
                    : 'bg-[#050816] border-border-base group-hover:border-cyan-500'
                }`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#050816]" />
                </div>

                <div className="flex items-center justify-between font-mono">
                  <span className={`text-xs font-bold ${activeMilestone === idx ? 'text-cyan-400' : 'text-text-muted-base'}`}>
                    PHASE // {idx + 1}
                  </span>
                  <span className={`text-sm font-bold tracking-widest ${activeMilestone === idx ? 'text-text-base' : 'text-text-muted-base'}`}>
                    {milestone.year}
                  </span>
                </div>
                <h4 className="text-base font-display font-bold text-text-base group-hover:text-cyan-400 transition-colors">
                  {milestone.title}
                </h4>
              </div>
            ))}
          </div>

          {/* Right Column: Active Milestone Terminal Log Visualizer */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md bg-[#040816]/95 bg-dark-context border border-cyan-500/20 p-6 rounded-2xl shadow-2xl relative overflow-hidden font-mono text-xs flex flex-col gap-4 min-h-[260px] justify-between">
              
              {/* Tech Corner Brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40" />

              {/* Terminal Title */}
              <div className="flex items-center justify-between border-b border-border-color/30 pb-3 text-cyan-400 font-bold text-[10px]">
                <span>HUD_OS_TERMINAL: MIL_LOG</span>
                <span>SYSTEM_TRACE</span>
              </div>

              {/* Dynamic Content */}
              <div className="flex-1 py-2 flex flex-col gap-3">
                <h4 className="text-sm font-display font-bold text-text-base">
                  {timelineMilestones[activeMilestone].title}
                </h4>
                <p className="text-[11px] text-text-secondary-base leading-relaxed">
                  {timelineMilestones[activeMilestone].detail}
                </p>

                {/* Simulated Diagnostic Logs */}
                <div className="bg-[#02040c] border border-border-color/40 p-3 rounded-lg flex flex-col gap-1.5 mt-2">
                  <span className="text-[9px] text-cyan-500/50 uppercase font-bold">TERMINAL RUN DIAG:</span>
                  {timelineMilestones[activeMilestone].logs.map((log, lIdx) => (
                    <div key={lIdx} className="flex gap-2 text-[10px] text-emerald-400 font-mono">
                      <span>&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="flex justify-between items-center text-[9px] text-text-muted-base border-t border-border-color/30 pt-3">
                <span>BUFFER_STATUS: SECURE</span>
                <span>OS_LEVEL: KERNEL_ACTIVE</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
