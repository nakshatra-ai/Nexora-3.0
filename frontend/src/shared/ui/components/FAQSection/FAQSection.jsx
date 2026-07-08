import React, { useState } from 'react';
import Card from '../../Card/Card';
import { mockFAQList } from '../../../lib/mockData';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto select-none font-sans">
      <div className="flex flex-col gap-2.5 text-center max-w-lg mx-auto mb-12">
        <span className="text-xs uppercase font-bold tracking-wider text-accent-base">FAQ</span>
        <h2 className="text-3xl font-display font-bold text-text-base">Operations Q&A</h2>
      </div>

      <div className="flex flex-col gap-4">
        {mockFAQList.slice(0, 3).map((faq, idx) => (
          <Card
            key={idx}
            onClick={() => setActiveIndex(prev => (prev === idx ? null : idx))}
            className="flex flex-col gap-2 cursor-pointer border border-border-base bg-card-base hover:border-accent-base"
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
    </section>
  );
}
