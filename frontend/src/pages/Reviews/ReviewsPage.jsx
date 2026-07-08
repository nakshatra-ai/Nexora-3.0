import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiTrendingUp, FiLayers, FiFileText } from 'react-icons/fi';
import Testimonials from '../../shared/ui/components/Testimonials/Testimonials';

const caseStudies = [
  {
    company: 'IndoNet Broadband',
    scope: 'Metro Network Operations',
    problem: 'Manual dispatching of 400+ field engineers caused massive response delays and frequent SLA violations during fiber cuts.',
    solution: 'Integrated Nexora AI ticket assignment and dynamic GPS routing. Real-time path optimization models matched tasks automatically to nearest skilled staff.',
    kpis: [
      { label: 'Dispatch Latency', before: '45 mins', after: '20 secs', color: 'text-cyan-400' },
      { label: 'Uptime SLA', before: '92.1%', after: '99.82%', color: 'text-emerald-400' }
    ]
  },
  {
    company: 'Matrix Fiber UP',
    scope: 'Trunk Infrastructure Failover',
    problem: 'Trunk cuts during storm seasons led to total regional outages taking up to 3 hours of manual technician OLT port switching to restore lines.',
    solution: 'Deployed Nexora self-healing GPON switch routines. Sub-second link failovers isolation sweeps automatically diverted packets to secondary loops.',
    kpis: [
      { label: 'Recovery Time', before: '180 mins', after: '420 ms', color: 'text-cyan-400' },
      { label: 'Unscheduled Outages', before: '14 / yr', after: '0 / yr', color: 'text-emerald-400' }
    ]
  }
];

export default function ReviewsPage() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);

  return (
    <div className="min-h-screen bg-bg-base/30 py-12 px-6 md:px-12 relative overflow-hidden select-none font-mono">
      {/* Background glowing effects */}
      <div className="absolute top-[10%] left-[-8%] w-[450px] h-[450px] bg-blue-600/5 filter blur-[115px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-8%] w-[450px] h-[450px] bg-cyan-500/5 filter blur-[115px] pointer-events-none" />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-16 border-b border-border-base pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.25em]">[ CLIENT LEDGER & CASE STUDIES ]</span>
          <h1 className="text-4xl font-display font-black text-text-base">Reviews & Case Studies</h1>
          <p className="text-xs text-text-muted-base">Examine operational telemetry reports, before/after statistics, and customer testimonials.</p>
        </div>
        <div className="text-right text-[9px] text-text-muted-base hidden md:block">
          <span>REVIEWS_COUNT: 2 // CASE_STUDIES: 2</span>
        </div>
      </div>

      {/* Render Testimonials Slide Stack */}
      <div className="max-w-7xl mx-auto relative z-10">
        <Testimonials />
      </div>

      {/* Case Studies Segment */}
      <div className="max-w-7xl mx-auto mt-24 relative z-10">
        <div className="flex flex-col gap-2.5 text-center max-w-lg mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono">[ DEEP DIVE REPORT ]</span>
          <h2 className="text-3xl font-display font-bold text-text-base">Enterprise Case Studies</h2>
          <p className="text-xs text-text-muted-base">Inspect technical metrics, outage recovery diagrams, and operational KPIs achieved by partners.</p>
        </div>

        <div className="w-full bg-[#050816]/75 bg-dark-context border border-cyan-500/20 backdrop-blur-xl p-8 rounded-2xl relative overflow-hidden font-mono shadow-[0_0_30px_rgba(0,229,255,0.05)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Tech Corner Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40" />

          {/* Left: Case study selectors */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center border-r border-border-base/30 pr-6">
            <span className="text-[8px] text-cyan-500/50 uppercase font-mono font-bold tracking-wider mb-2 text-left">SELECT CASE DIRECTORY:</span>
            {caseStudies.map((caseItem, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCaseStudy(idx)}
                className={`w-full p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${activeCaseStudy === idx ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'bg-card-base/20 border-border-base/50 text-text-muted-base hover:text-text-base hover:bg-card-base/30'}`}
              >
                <FiFileText className="mt-1 flex-shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold uppercase">{caseItem.company}</span>
                  <span className="text-[8px] opacity-70 tracking-widest">{caseItem.scope}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Selected Case Details */}
          <div className="lg:col-span-8 flex flex-col justify-between pl-6 text-left gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-[8px] text-cyan-400 font-bold uppercase tracking-widest">[ PROJECT BRIEF ]</span>
                <h3 className="text-xl font-display font-black text-text-base uppercase mt-1">{caseStudies[activeCaseStudy].company} // {caseStudies[activeCaseStudy].scope}</h3>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[8px] text-red-400 font-bold uppercase">■ PROBLEM STATEMENT:</span>
                <p className="text-[11px] text-text-secondary-base leading-relaxed">{caseStudies[activeCaseStudy].problem}</p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[8px] text-emerald-400 font-bold uppercase">● SOLUTION STRATEGY:</span>
                <p className="text-[11px] text-text-secondary-base leading-relaxed">{caseStudies[activeCaseStudy].solution}</p>
              </div>
            </div>

            {/* KPI Metrics block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border-base/30 pt-6">
              {caseStudies[activeCaseStudy].kpis.map((kpi, kIdx) => (
                <div key={kIdx} className="bg-card-base/20 border border-border-base/50 p-4 rounded-xl flex flex-col gap-1 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-cyan-400" />
                  <span className="text-[8px] text-text-muted-base font-bold uppercase tracking-wider">{kpi.label}</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xs text-red-400 line-through">{kpi.before}</span>
                    <span className={`text-md font-bold ${kpi.color}`}>{kpi.after}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
