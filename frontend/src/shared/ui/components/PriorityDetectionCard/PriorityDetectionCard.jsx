import React, { useState } from 'react';
import Card from '../../Card/Card';
import Input from '../../Input/Input';
import Badge from '../../Badge/Badge';
import { FiCpu } from 'react-icons/fi';

export default function PriorityDetectionCard() {
  const [desc, setDesc] = useState('');

  const getPriority = () => {
    const text = desc.toLowerCase();
    if (['down', 'urgent', 'critical', 'offline', 'broken', 'fire', 'cut'].some(kw => text.includes(kw))) {
      return 'High';
    }
    if (['slow', 'delay', 'lag', 'buffering'].some(kw => text.includes(kw))) {
      return 'Medium';
    }
    return 'Low';
  };

  return (
    <Card className="flex flex-col gap-4 font-sans select-none relative overflow-hidden" hoverGlow={true}>
      <div className="absolute w-[200px] h-[200px] bg-accent-glow-base rounded-full filter blur-[60px] pointer-events-none -right-12 -top-12" />

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent-glow-base flex items-center justify-center text-accent-base">
          <FiCpu size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text-base">NLP Priority Classifier</h4>
          <span className="text-[10px] uppercase font-bold text-text-muted-base">Sandbox test input</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <Input
          label="Test Outage Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="E.g. fiber line cut near terminal..."
        />
        {desc && (
          <div className="p-3.5 rounded-xl bg-surface-base border border-border-base flex items-center justify-between text-xs mt-1 animate-pulse">
            <span className="font-semibold text-text-secondary-base">AI Computed Urgency:</span>
            <Badge value={getPriority()} type="priority" />
          </div>
        )}
      </div>
    </Card>
  );
}
