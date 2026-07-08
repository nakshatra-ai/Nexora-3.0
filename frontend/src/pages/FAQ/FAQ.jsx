import React, { useState } from 'react';
import Card from '../../shared/ui/Card/Card';
import { mockFAQList } from '../../shared/lib/mockData';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './FAQ.css';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (idx) => {
    setActiveIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="faq-container py-8 px-6 font-sans select-none max-w-3xl mx-auto flex flex-col gap-6">
      <div className="text-center flex flex-col gap-1.5 max-w-lg mx-auto">
        <span className="text-xs uppercase font-bold tracking-wider text-accent-base">Help center</span>
        <h2 className="text-2xl font-display font-bold text-text-base">Frequently Asked Questions</h2>
        <p className="text-xs text-text-muted-base">Find answers to common questions about our ticketing and dispatch system.</p>
      </div>

      <div className="flex flex-col gap-4">
        {mockFAQList.map((faq, idx) => (
          <Card
            key={idx}
            onClick={() => toggleIndex(idx)}
            className="flex flex-col gap-2 cursor-pointer transition-all border border-border-base bg-card-base hover:border-accent-base"
          >
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-sm font-bold text-text-base leading-tight">{faq.q}</h4>
              <span className="text-text-muted-base">
                {activeIndex === idx ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
              </span>
            </div>
            {activeIndex === idx && (
              <p className="text-xs text-text-secondary-base leading-relaxed mt-2 pt-2 border-t border-border-color">
                {faq.a}
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
