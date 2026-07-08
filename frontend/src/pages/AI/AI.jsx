import React from 'react';
import AIRecommendationCard from '../../shared/ui/components/AIRecommendationCard/AIRecommendationCard';
import PriorityDetectionCard from '../../shared/ui/components/PriorityDetectionCard/PriorityDetectionCard';
import TicketSummaryCard from '../../shared/ui/components/TicketSummaryCard/TicketSummaryCard';
import DashboardInsightCard from '../../shared/ui/components/DashboardInsightCard/DashboardInsightCard';

export default function AI() {
  return (
    <div className="space-y-6 font-sans select-none max-w-4xl mx-auto flex flex-col gap-2">
      {/* Top Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-base pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-display font-bold text-text-base">Nexora Intelligence</h2>
          <p className="text-xs text-text-muted-base">Explore automated dispatch rules and classifiers</p>
        </div>
      </div>

      {/* Grid of AI widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <AIRecommendationCard />
        <PriorityDetectionCard />
        <TicketSummaryCard />
        <DashboardInsightCard />
      </div>
    </div>
  );
}
