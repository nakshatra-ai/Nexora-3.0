import React from 'react';
import Card from '../../shared/ui/Card/Card';
import './Terms.css';

export default function Terms() {
  return (
    <div className="terms-container py-8 px-6 font-sans select-none max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-display font-bold text-text-base">Terms of Service</h2>
        <span className="text-xs text-text-muted-base">Last updated: June 2026</span>
      </div>

      <Card className="flex flex-col gap-4">
        <section className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-text-base">1. Acceptance of Terms</h4>
          <p className="text-xs text-text-secondary-base leading-relaxed">
            By registering an account and logging requests into the NEXORA AI portal, you agree to comply with our service limits and operational policies.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-text-base">2. Acceptable Use</h4>
          <p className="text-xs text-text-secondary-base leading-relaxed">
            Customers must submit realistic outage information. Submitting false reports to manipulate engineer allocations or SLA priority timers will lead to account restrictions.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-text-base">3. Liability Limits</h4>
          <p className="text-xs text-text-secondary-base leading-relaxed">
            NEXORA is a management wrapper coordination tool. Ultimate service repair obligations and physical line infrastructure liabilities remain governed by your parent telecom contract.
          </p>
        </section>
      </Card>
    </div>
  );
}
