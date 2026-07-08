import React from 'react';

export default function Input({ label, type = 'text', value, onChange, placeholder = '', className = '', required = false, name = '', error = '' }) {
  return (
    <div className={`flex flex-col gap-2 w-full font-sans ${className}`}>
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary-base">
          {label} {required && <span className="text-danger-base">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`form-input w-full ${error ? 'border-danger-base focus:border-danger-base focus:box-shadow-[0_0_0_2px_var(--danger-light)]' : ''}`}
      />
      {error && <span className="text-xs text-danger-base font-medium">{error}</span>}
    </div>
  );
}
