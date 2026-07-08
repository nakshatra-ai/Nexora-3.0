import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Icons specifically designed for each of the 13 services
const serviceCategories = {
  all: 'All Modules',
  network: 'Network Matrix',
  field: 'Field Logistics',
  business: 'Operations & Billing'
};

const serviceList = [
  {
    id: 'customer_complaints',
    category: 'business',
    title: 'Customer Complaints',
    desc: 'Ingests, parses, and classifies customer complaint logs using real-time NLP classification models.',
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
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" />
      </svg>
    )
  },
  {
    id: 'field_engineers',
    category: 'field',
    title: 'Field Engineers',
    desc: 'Maintains digital profile logs, skill matrix maps, and active dispatch maps for technicians.',
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
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 'ai_dashboard',
    category: 'business',
    title: 'AI Dashboard',
    desc: 'Integrates real-time SLA trackers, dispatch logs, and visual analytics dashboards for operations managers.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'network_operations',
    category: 'network',
    title: 'Network Operations',
    desc: 'Maintains main central switches, trunk routers, and gateway interfaces.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    id: 'billing',
    category: 'business',
    title: 'Billing & Invoices',
    desc: 'Automates customer billing cycles, processing bandwidth tariff rates and calculating automatic SLA rebate points.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'routers',
    category: 'network',
    title: 'Routers & ONT',
    desc: 'Manages OLT configuration templates, routing tables, and client ONT port diagnostics.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'fiber_installation',
    category: 'field',
    title: 'Fiber Installation',
    desc: 'Coordinates path layout designs, physical cable laying, and line attenuation (OTDR) signal logs.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    )
  },
  {
    id: 'sim_management',
    category: 'business',
    title: 'SIM Management',
    desc: 'Oversees 5G eSIM token distributions, SIM mapping parameters, and tariff plan activation flags.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'maintenance_requests',
    category: 'field',
    title: 'Maintenance Requests',
    desc: 'Schedules preventive calibrations, structural tower upgrades, and backup generator service checks.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

// Interactive 3D Tilting Card Component
function ServiceCard({ title, desc, icon }) {
  const applyTilt = (e, maxTilt = 12) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = ((yc - y) / yc) * maxTilt;
    const rotateY = ((x - xc) / xc) * -maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.boxShadow = `0 20px 40px rgba(0, 229, 255, 0.15)`;
    card.style.borderColor = 'var(--accent)';

    // Spotlight follower
    const glow = card.querySelector('.service-glow-spotlight');
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

    const glow = card.querySelector('.service-glow-spotlight');
    if (glow) {
      glow.style.opacity = '0';
    }
  };

  return (
    <div 
      onMouseMove={(e) => applyTilt(e)}
      onMouseLeave={removeTilt}
      className="panel-card p-6 bg-card-base/30 border border-border-base rounded-2xl flex flex-col gap-4 relative overflow-hidden transition-all duration-300 cursor-default select-none shadow-lg"
    >
      {/* Light spotlight highlight */}
      <div className="service-glow-spotlight absolute w-36 h-36 rounded-full bg-cyan-400/10 filter blur-[40px] pointer-events-none opacity-0 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2" />
      
      {/* Corner Brackets */}
      <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-cyan-500/20" />
      <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-cyan-500/20" />

      {/* Header details */}
      <div className="flex justify-between items-start z-10">
        <div className="w-12 h-12 rounded-xl bg-primary-light-base/10 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          {icon}
        </div>
        <span className="font-mono text-[8px] text-text-muted-base tracking-widest">[ NXR_MOD_v5 ]</span>
      </div>

      {/* Body details */}
      <div className="flex flex-col gap-1.5 z-10">
        <h4 className="text-sm font-display font-bold text-text-base tracking-wide">{title}</h4>
        <p className="text-[11px] text-text-secondary-base leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all' 
    ? serviceList 
    : serviceList.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="services-bg py-24 px-6 md:px-12 select-none font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2.5 text-center max-w-lg mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono">[ OS MODULE SUITE ]</span>
          <h2 className="text-3xl font-display font-bold text-text-base">Operational Modules</h2>
          <p className="text-xs text-text-muted-base">Explore the 13 foundational subsystems powering the NEXORA platform.</p>
        </div>

        {/* Tabbed Category Selectors */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16 max-w-2xl mx-auto font-mono text-[10px] tracking-wider uppercase">
          {Object.entries(serviceCategories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 cursor-pointer ${
                activeCategory === key
                  ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                  : 'bg-card-base/20 border-border-base/50 text-text-muted-base hover:text-text-base hover:bg-card-base/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Services Floating Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ServiceCard 
                  title={service.title}
                  desc={service.desc}
                  icon={service.icon}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
