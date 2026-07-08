import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function Modal({ isOpen, onClose, title, subtitle, children, size = 'md' }) {
  // Close on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#02040b]/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className={`w-full ${sizeClasses[size] || sizeClasses.md} bg-[#111827]/90 border border-white/10 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,229,255,0.15)] backdrop-blur-xl relative z-10 text-left`}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-secondary-text hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-all"
            >
              <FiX size={16} />
            </button>

            {/* Header */}
            {(title || subtitle) && (
              <div className="mb-5 pr-8">
                {title && <h3 className="text-base font-display font-bold text-white tracking-wide">{title}</h3>}
                {subtitle && <p className="text-xs text-secondary-text mt-0.5 font-sans">{subtitle}</p>}
              </div>
            )}

            {/* Body */}
            <div className="relative font-sans text-xs">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
