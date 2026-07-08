import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', hoverGlow = false, onClick }) {
  if (onClick) {
    return (
      <motion.div
        whileHover={hoverGlow ? { scale: 1.01 } : {}}
        whileTap={{ scale: 0.99 }}
        onClick={onClick}
        className={`panel-card p-6 cursor-pointer ${hoverGlow ? 'panel-card-glow' : ''} ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`panel-card p-6 ${hoverGlow ? 'panel-card-glow' : ''} ${className}`}>
      {children}
    </div>
  );
}
