import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiActivity, FiCpu, FiShield, FiCheckCircle, FiCheck, FiCpu as FiEngine, FiAlertCircle } from 'react-icons/fi';
import Button from '../../shared/ui/Button/Button';

// SVG Icons specifically designed for each of the services
const serviceList = [
  {
    id: 'customer_complaints',
    category: 'business',
    title: 'Complaint Management',
    desc: 'Ingests, parses, and classifies customer complaint logs using real-time NLP classification models.',
    features: ['Real-time NLP priority tagging', 'Automatic duplicate ticket suppression', 'Historical resolution vector mapping', 'Direct CRM feedback integration'],
    sla: '99.5% categorization accuracy',
    latency: '8.4 ms',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )
  },
  {
    id: 'ticket_assignment',
    category: 'field',
    title: 'AI Ticket Assignment',
    desc: 'Automates work order scheduling, dispatching engineers based on workloads, capabilities, and distance metrics.',
    features: ['Distance matrix routing optimizations', 'Technician skill mapping filters', 'Dynamic slot re-routing on delay', 'Live GPS staff telemetry'],
    sla: 'Dispatched in <2 mins',
    latency: '15.2 ms',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    id: 'network_monitoring',
    category: 'network',
    title: 'Network Monitoring',
    desc: 'Tracks OLT logs, customer bandwidth limits, and ping latencies, flagging anomalies automatically.',
    features: ['Continuous GPON link sweeps', 'Bandwidth utilization tracking', 'Real-time ping threshold alert system', 'Direct visual telemetry dashboard'],
    sla: '99.99% network visibility',
    latency: '4.2 ms',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" />
      </svg>
    )
  },
  {
    id: 'field_engineers',
    category: 'field',
    title: 'Field Engineers Coordinator',
    desc: 'Maintains digital profile logs, skill matrix maps, and active dispatch maps for technicians.',
    features: ['Dynamic technician dispatch schedules', 'Digital skill card badges', 'Availability timeline calendar sync', 'Task completion reports console'],
    sla: 'Zero dispatcher human intervention',
    latency: '11.0 ms',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: 'predictive_analytics',
    category: 'network',
    title: 'Predictive Analytics',
    desc: 'Analyzes long-term signal trends to forecast core bottlenecks, trunk overload, or fiber deterioration risks.',
    features: ['Line attenuation trend regression', 'Trunk overload capacity models', 'Failure predictive indices', 'Automated maintenance prompts'],
    sla: 'Predicts outages 48h in advance',
    latency: '45.0 ms',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'self_healing_networks',
    category: 'network',
    title: 'Self Healing Networks',
    desc: 'Initiates immediate failover profiles at GPON switches during backhaul faults, recovering lines instantly.',
    features: ['Instant route path switches', 'Swappable gateway profiles', 'Self-rebooting GPON terminal commands', 'Fault isolation sweeps'],
    sla: '<500ms failover recovery',
    latency: '1.2 ms',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 'billing',
    category: 'business',
    title: 'Billing & SLA Rebates',
    desc: 'Automates customer billing cycles, processing bandwidth tariff rates and calculating automatic SLA rebate points.',
    features: ['Outage time SLA automatic rebates', 'Bandwidth tier bill calculations', 'Digital invoice delivery logs', 'Stateless token payment checks'],
    sla: '100% transparent ledger tracking',
    latency: '18.4 ms',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'fiber_installation',
    category: 'field',
    title: 'Fiber Installation Design',
    desc: 'Coordinates path layout designs, physical cable laying, and line attenuation (OTDR) signal logs.',
    features: ['GIS layout path design templates', 'Line attenuation calibration checks', 'Joint splice database tracker', 'Splicing quality diagnostic review'],
    sla: 'Line testing completed instantly',
    latency: '22.0 ms',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    )
  }
];

function ServiceCard({ title, desc, icon, onLearnMore }) {
  const applyTilt = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const rotateX = (centerY - y) * 0.08;
    const rotateY = (x - centerX) * 0.08;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.boxShadow = `0 15px 30px rgba(0, 229, 255, 0.08)`;
    card.style.borderColor = `rgba(0, 229, 255, 0.25)`;

    const glow = card.querySelector('.service-glow');
    if (glow) {
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = '1';
    }
  };

  const removeTilt = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    card.style.boxShadow = '';
    card.style.borderColor = '';

    const glow = card.querySelector('.service-glow');
    if (glow) {
      glow.style.opacity = '0';
    }
  };

  return (
    <div 
      onMouseMove={applyTilt}
      onMouseLeave={removeTilt}
      className="panel-card p-6 bg-card-base/30 border border-border-base rounded-2xl flex flex-col justify-between gap-6 relative overflow-hidden transition-all duration-300 cursor-default select-none shadow-lg h-[260px]"
    >
      {/* Light glow spotlight follow */}
      <div className="service-glow absolute w-32 h-32 rounded-full bg-cyan-400/10 filter blur-[35px] pointer-events-none opacity-0 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2" />
      
      {/* Corner Brackets */}
      <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-cyan-500/20" />
      <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-cyan-500/20" />

      {/* Header icon */}
      <div className="flex justify-between items-start z-10">
        <div className="w-12 h-12 rounded-xl bg-primary-light-base/10 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          {icon}
        </div>
        <span className="font-mono text-[8px] text-text-muted-base tracking-widest">[ NXR_MOD ]</span>
      </div>

      {/* Body details */}
      <div className="flex flex-col gap-1.5 z-10 text-left">
        <h4 className="text-sm font-display font-bold text-text-base tracking-wide">{title}</h4>
        <p className="text-[11px] text-text-secondary-base leading-relaxed line-clamp-3">{desc}</p>
      </div>

      {/* Footer trigger */}
      <button 
        onClick={onLearnMore}
        className="w-full py-2.5 bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/25 hover:border-cyan-400 rounded-lg font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-wider transition-all cursor-pointer z-10 shadow-[0_0_10px_rgba(0,229,255,0.05)]"
      >
        Learn More
      </button>

    </div>
  );
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-bg-base/30 py-12 px-6 md:px-12 relative overflow-hidden font-mono">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-blue-600/5 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-cyan-500/5 filter blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 border-b border-border-base pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.25em]">[ SUB-SYSTEM DIRECTORY ]</span>
          <h1 className="text-4xl font-display font-black text-text-base">Operational Subsystems</h1>
          <p className="text-xs text-text-muted-base">Explore specific telemetry details, target SLAs, and features for each telecom workflow.</p>
        </div>
        <div className="text-right text-[9px] text-text-muted-base hidden md:block">
          <span>MODULES_LOADED: {serviceList.length} / 13 ACTIVE</span>
        </div>
      </div>

      {/* standalone grid */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {serviceList.map((service) => (
            <ServiceCard 
              key={service.id}
              title={service.title}
              desc={service.desc}
              icon={service.icon}
              onLearnMore={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      {/* Immersive Learn More Modal Dialog */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#02040c]/85 backdrop-blur-md flex items-center justify-center z-55 p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="bg-[#050816]/95 bg-dark-context border border-cyan-500/30 rounded-2xl max-w-lg w-full overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.2)] relative flex flex-col p-6 gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tech Corner Brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40" />

              {/* Title Header */}
              <div className="flex justify-between items-center border-b border-cyan-500/20 pb-4 text-cyan-400 font-bold text-xs">
                <div className="flex items-center gap-2">
                  <FiActivity className="animate-pulse" />
                  <span>NEXORA_SERVICE // {selectedService.id.toUpperCase()}</span>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="w-6 h-6 rounded border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all cursor-pointer"
                >
                  <FiX size={12} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    {selectedService.icon}
                  </div>
                  <h3 className="text-md font-display font-black text-text-base uppercase">{selectedService.title}</h3>
                </div>

                <p className="text-[11px] text-text-secondary-base leading-relaxed">{selectedService.desc}</p>
                
                {/* Metrics Table */}
                <div className="bg-[#02040c] border border-cyan-500/15 p-3 rounded-lg flex flex-col gap-2">
                  <div className="flex justify-between text-[8px] text-text-muted-base font-bold">
                    <span>PARAMETER</span>
                    <span>TARGET BENCHMARK</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-text-secondary-base pt-1 border-t border-border-color/30">
                    <span>Target Uptime SLA</span>
                    <span className="text-emerald-400 font-bold">{selectedService.sla}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-text-secondary-base pt-1">
                    <span>Provisioning / Dispatch Latency</span>
                    <span className="text-cyan-400 font-bold">{selectedService.latency}</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[8px] text-text-muted-base font-bold uppercase">Blueprints & Integrations:</span>
                  <div className="flex flex-col gap-1.5 font-mono text-[9px] text-text-secondary-base">
                    {selectedService.features.map((feat, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <FiCheck className="text-emerald-400" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Close Button */}
              <Button 
                variant="accent" 
                onClick={() => setSelectedService(null)}
                className="w-full py-3 text-xs font-bold shadow-[0_0_15px_rgba(0,229,255,0.1)] hover:scale-102 active:scale-98 transition-all uppercase tracking-wider font-mono cursor-pointer"
              >
                Close Blueprint
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
