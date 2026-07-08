import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const reviewsData = [
  {
    name: 'Rajesh Kumar',
    role: 'Telecom Operations Manager',
    company: 'IndoNet Broadband',
    text: 'NEXORA AI completely transformed our dispatch latency. Assigning line technicians went from 45 minutes of manual log triage to under 20 seconds. SLA compliance is now at 99.8%.',
    rating: '5.0 // EXCELLENT',
    metrics: [
      { label: 'Outage Time', before: 45, after: 0.3, unit: 'mins' },
      { label: 'Manual Triage', before: 95, after: 4, unit: '%' },
      { label: 'SLA Breach', before: 8.4, after: 0.1, unit: '%' }
    ]
  },
  {
    name: 'Sita Verma',
    role: 'Fiber Infrastructure Lead',
    company: 'Matrix Fiber UP',
    text: 'During monsoon seasons, fiber cuts used to create absolute chaos. Nexora’s self-healing daemon re-routed OLT client ports automatically. Our end users didn’t even report drops.',
    rating: '4.9 // SUPERIOR',
    metrics: [
      { label: 'Outage Time', before: 120, after: 3, unit: 'mins' },
      { label: 'Manual Triage', before: 100, after: 10, unit: '%' },
      { label: 'SLA Breach', before: 14.2, after: 0.2, unit: '%' }
    ]
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const activeReview = reviewsData[activeIndex];

  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 select-none font-sans bg-surface-base border-y border-border-base relative overflow-hidden">
      
      {/* HUD Scan Grid background */}
      <div className="absolute inset-0 bg-[#040816]/10 opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2.5 text-center max-w-lg mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono">[ HOLOGRAPHIC FEEDBACKS ]</span>
          <h2 className="text-3xl font-display font-bold text-text-base">Customer Success Matrix</h2>
          <p className="text-xs text-text-muted-base">Verified operational diagnostic metrics from enterprise audits.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Holographic Glass Review Card */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20, rotateY: 10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 20, rotateY: -10 }}
                  transition={{ duration: 0.3 }}
                  className="panel-card p-8 bg-card-base/40 border border-cyan-500/25 rounded-2xl backdrop-blur-xl relative shadow-2xl overflow-hidden flex flex-col gap-6"
                >
                  {/* Glowing logo orb */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full filter blur-2xl" />

                  {/* Rating Tag */}
                  <div className="flex justify-between items-center font-mono text-[9px] text-cyan-400">
                    <span>RATING_CODE // {activeReview.rating}</span>
                    <span>VERIFIED_CLIENT</span>
                  </div>

                  {/* Quote Text */}
                  <div className="flex gap-4">
                    <span className="text-5xl text-cyan-400/30 font-display leading-none select-none">“</span>
                    <p className="text-xs md:text-sm text-text-secondary-base leading-relaxed italic font-medium">
                      {activeReview.text}
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="flex items-center gap-4 mt-2 border-t border-border-color/30 pt-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {activeReview.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-text-base leading-tight">{activeReview.name}</span>
                      <span className="text-[10px] text-text-muted-base mt-0.5 font-semibold">
                        {activeReview.role} • <strong className="text-cyan-400">{activeReview.company}</strong>
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex gap-3 justify-start items-center">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-lg bg-card-base/50 border border-border-base flex items-center justify-center text-text-secondary-base hover:text-cyan-400 hover:border-cyan-400 cursor-pointer transition-all duration-200"
              >
                <FiChevronLeft size={18} />
              </button>
              <span className="font-mono text-[10px] text-text-muted-base">
                PAGE {activeIndex + 1} OF {reviewsData.length}
              </span>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-lg bg-card-base/50 border border-border-base flex items-center justify-center text-text-secondary-base hover:text-cyan-400 hover:border-cyan-400 cursor-pointer transition-all duration-200"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: Holographic Animated Comparison Chart */}
          <div className="lg:col-span-5">
            <div className="w-full bg-[#040816]/75 bg-dark-context border border-cyan-500/20 p-6 rounded-2xl shadow-2xl relative font-mono text-xs flex flex-col gap-6">
              
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40" />

              <div className="flex justify-between items-center border-b border-border-color/30 pb-3 text-cyan-400 font-bold text-[10px]">
                <span>HUD_GRAPH: SLA_PERF_DELTA</span>
                <span>BEFORE vs AFTER</span>
              </div>

              {/* Chart Bars Grid */}
              <div className="flex flex-col gap-5 py-2">
                {activeReview.metrics.map((metric, mIdx) => {
                  // Calculate percentage relationship for bars
                  const total = metric.before + metric.after;
                  const beforePercent = (metric.before / total) * 100;
                  const afterPercent = (metric.after / total) * 100;

                  return (
                    <div key={mIdx} className="flex flex-col gap-2">
                      {/* Metric info */}
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-text-base font-bold">{metric.label}</span>
                        <div className="flex gap-2">
                          <span className="text-rose-400">Before: {metric.before}{metric.unit}</span>
                          <span className="text-text-muted-base">/</span>
                          <span className="text-emerald-400 font-bold">After: {metric.after}{metric.unit}</span>
                        </div>
                      </div>

                      {/* Double horizontal comparison bar */}
                      <div className="h-3 w-full bg-cyan-950/20 rounded border border-border-color/30 overflow-hidden flex">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${beforePercent}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-rose-500/70 border-r border-rose-600/40"
                          title={`Before: ${metric.before}`}
                        />
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${afterPercent}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_8px_rgba(0,255,157,0.3)]"
                          title={`After: ${metric.after}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend */}
              <div className="flex gap-4 items-center text-[9px] text-text-muted-base border-t border-border-color/30 pt-3 justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-rose-500/70" />
                  <span>LEGACY SYSTEM STATE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-gradient-to-r from-emerald-500 to-cyan-400" />
                  <span>NEXORA AI INTEGRATED</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
