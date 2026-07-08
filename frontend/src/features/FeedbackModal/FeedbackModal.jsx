import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiStar } from 'react-icons/fi';
import Button from '../../shared/ui/Button/Button';

export default function FeedbackModal({ isOpen, onClose, onSubmit, reqId }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return; // Rating is required
    onSubmit({ rating, review });
    
    // Reset form
    setRating(0);
    setHoverRating(0);
    setReview('');
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 select-none font-sans">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-surface-base border border-border-base rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-base bg-surface-hover-base">
              <div>
                <h3 className="text-xl font-display font-bold text-text-base">Provide Feedback</h3>
                <p className="text-xs text-text-muted-base mt-1">Rate your experience for {reqId}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-input-bg hover:bg-border-color rounded-full text-text-secondary-base hover:text-text-base transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              <form id="feedbackForm" onSubmit={handleFormSubmit} className="space-y-6">
                
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-text-secondary-base text-center">How would you rate the engineer's service?</label>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <FiStar 
                          size={32} 
                          className={`transition-colors ${(hoverRating || rating) >= star ? 'text-warning-base fill-warning-base' : 'text-border-base'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-text-secondary-base">Additional Comments (Optional)</label>
                  <textarea
                    rows="4"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us about the issue and the engineer's resolution..."
                    className="w-full bg-input-bg border border-input-border rounded-xl px-4 py-3 text-text-base focus:outline-none focus:border-primary-base focus:ring-1 focus:ring-primary-base transition-colors placeholder:text-text-muted-base resize-none"
                  ></textarea>
                </div>

              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border-base bg-surface-hover-base flex items-center justify-end gap-4">
              <Button type="button" variant="secondary" onClick={onClose}>
                Skip
              </Button>
              <Button type="submit" form="feedbackForm" variant="primary" disabled={rating === 0}>
                Submit Feedback
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
