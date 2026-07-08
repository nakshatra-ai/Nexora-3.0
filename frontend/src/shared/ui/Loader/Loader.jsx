import React from 'react';
import { motion } from 'framer-motion';

export default function Loader({ size = 'medium' }) {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-3',
    large: 'w-18 h-18 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 select-none font-sans">
      <div className="relative">
        {/* Ring spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          className={`rounded-full border-t-accent border-r-transparent border-b-primary border-l-transparent ${sizeClasses[size] || sizeClasses.medium}`}
        />
        
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-accent/10 rounded-full filter blur-[15px] animate-pulse" />
      </div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-secondary-text mt-4 animate-pulse">
        System Loading...
      </span>
    </div>
  );
}
