import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false, ...props }) {
  const getStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-base hover:bg-primary-hover-base text-white shadow-sm border border-transparent';
      case 'secondary':
        return 'bg-transparent hover:bg-border-base text-text-base border border-border-base';
      case 'accent':
        return 'bg-accent-base text-slate-950 font-bold hover:opacity-90 shadow-lg shadow-accent-glow-base border border-transparent';
      case 'danger':
        return 'bg-danger-base hover:opacity-90 text-white border border-transparent';
      default:
        return 'bg-primary-base hover:opacity-90 text-white';
    }
  };

  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.97 }}
      whileHover={disabled ? {} : { scale: 1.01 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide font-sans transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${getStyles()} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
