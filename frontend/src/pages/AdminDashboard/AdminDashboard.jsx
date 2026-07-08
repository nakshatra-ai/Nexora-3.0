import React from 'react';
import StatsCards from '../../shared/ui/components/StatsCards/StatsCards';
import RevenueChart from '../../shared/ui/components/RevenueChart/RevenueChart';
import RequestChart from '../../shared/ui/components/RequestChart/RequestChart';
import RecentRequests from '../../shared/ui/components/RecentRequests/RecentRequests';
import EngineerLeaderboard from '../../shared/ui/components/EngineerLeaderboard/EngineerLeaderboard';
import AIInsights from '../../shared/ui/components/AIInsights/AIInsights';
import './AdminDashboard.css';

export default function AdminDashboard() {
  return (
    <div className="space-y-6 font-sans">
      {/* 4 Cards Stats Row */}
      <StatsCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <RequestChart />
      </div>

      {/* Main sections grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Recent Activity */}
        <div className="lg:col-span-7">
          <RecentRequests />
        </div>

        {/* RIGHT COLUMN: Engineer Workload & AI */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <EngineerLeaderboard />
          <AIInsights />
        </div>
      </div>
    </div>
  );
}
