import React, { useState } from 'react';
import Card from '../../Card/Card';

export default function LanguageSettings() {
  const [lang, setLang] = useState('en');

  return (
    <Card className="flex flex-col gap-4 font-sans select-none">
      <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary-base">Language Selector</h4>
      
      <div className="space-y-1.5 flex flex-col">
        <label className="text-xs font-semibold text-text-secondary-base uppercase tracking-wider">Interface Language</label>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="form-input w-full"
        >
          <option value="en">English (UK/US)</option>
          <option value="hi">Hindi (हिन्दी)</option>
          <option value="es">Spanish (Español)</option>
        </select>
      </div>
    </Card>
  );
}
