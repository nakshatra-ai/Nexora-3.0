import React from 'react';
import Card from '../../shared/ui/Card/Card';
import './Privacy.css';

export default function Privacy() {
  return (
    <div className="privacy-container py-8 px-6 font-sans select-none max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-display font-bold text-text-base">Privacy Policy</h2>
        <span className="text-xs text-text-muted-base">Last updated: June 2026</span>
      </div>

      <Card className="flex flex-col gap-4">
        <section className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-text-base">1. Information We Collect</h4>
          <p className="text-xs text-text-secondary-base leading-relaxed">
            We collect user profile registration data (name, email, phone number, authentication records) and network outage information (ticket logs, location details, engineer logs) to run the platform.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-text-base">2. How We Use Your Information</h4>
          <p className="text-xs text-text-secondary-base leading-relaxed">
            Outage tickets are processed through AI classification models to prioritize urgent node failures. Location telemetry data is queried to recommend available technicians nearby.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-text-base">3. Data Security</h4>
          <p className="text-xs text-text-secondary-base leading-relaxed">
            All user credentials are encrypted using one-way cryptographic functions. API routes are secured with stateless token checkpoints. We do not sell user data to third parties.
          </p>
        </section>
      </Card>
    </div>
  );
}
