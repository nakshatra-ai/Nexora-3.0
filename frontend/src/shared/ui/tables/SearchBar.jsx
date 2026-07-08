import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative flex items-center w-full max-w-sm font-sans ${className}`}>
      <FiSearch size={16} className="absolute left-4 text-text-muted-base pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ paddingLeft: '40px' }}
        className="form-input w-full pl-12"
      />
    </div>
  );
}
