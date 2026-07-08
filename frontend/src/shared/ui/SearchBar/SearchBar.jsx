import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ placeholder, value, onChange }) {
  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-3 flex items-center text-secondary-text">
        <FiSearch size={16} />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ paddingLeft: '40px' }}
        className="w-full pl-10 pr-4 py-2.5 bg-[#050816] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-accent transition-all font-sans"
      />
    </div>
  );
}
