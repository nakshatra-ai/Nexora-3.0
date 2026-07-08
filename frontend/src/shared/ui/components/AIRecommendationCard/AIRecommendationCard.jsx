import React from 'react';
import Card from '../../Card/Card';
import { mockAIRecommendations } from '../../../lib/mockData';
import { FiUserCheck } from 'react-icons/fi';

export default function AIRecommendationCard() {
  return (
    <Card className="flex flex-col gap-4 font-sans select-none relative overflow-hidden" hoverGlow={true}>
      <div className="absolute w-[200px] h-[200px] bg-primary-light-base rounded-full filter blur-[60px] pointer-events-none -right-12 -top-12" />
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-light-base flex items-center justify-center text-primary-base">
          <FiUserCheck size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text-base">Field Engineer Matcher</h4>
          <span className="text-[10px] uppercase font-bold text-text-muted-base">GPS Location & Specialty Ranking</span>
        </div>
      </div>

      <div className="space-y-3.5 mt-2">
        {mockAIRecommendations.map((rec) => (
          <div key={rec.id} className="p-3 rounded-xl border border-border-base bg-surface-base flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-base">{rec.name}</span>
              <span className="text-[10px] text-accent-base bg-accent-glow-base px-2 py-0.5 rounded border border-accent-base/15">
                {rec.score}% Match
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-text-muted-base">
              <span>Workload: <strong className="text-text-base">{rec.workload} active</strong></span>
              <span>Distance: <strong className="text-text-base">{rec.distance}</strong></span>
            </div>
            <p className="text-[10px] text-text-secondary-base leading-relaxed border-t border-border-color pt-1.5 mt-0.5">
              {rec.matchReason}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
