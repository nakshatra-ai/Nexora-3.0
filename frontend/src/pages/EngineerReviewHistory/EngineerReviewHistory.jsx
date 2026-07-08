import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiUser, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import Card from '../../shared/ui/Card/Card';

export default function EngineerReviewHistory() {
  // Mock data representing customer reviews about engineers
  const reviews = [
    {
      id: 'REV-001',
      customerName: 'Aman Verma',
      engineerName: 'Rajesh Kumar',
      rating: 5,
      date: '2026-07-01',
      requestId: 'NXR-2026-124',
      feedback: 'Rajesh was extremely prompt and fixed my internet blackout within an hour. Very professional and courteous!',
    },
    {
      id: 'REV-002',
      customerName: 'Priya Sharma',
      engineerName: 'Sneha Patel',
      rating: 4,
      date: '2026-07-03',
      requestId: 'NXR-2026-128',
      feedback: 'The 5G installation went smoothly. Sneha explained the new router settings clearly. Only docked a star because they arrived a bit late.',
    },
    {
      id: 'REV-003',
      customerName: 'Rahul Desai',
      engineerName: 'Amit Singh',
      rating: 5,
      date: '2026-07-05',
      requestId: 'NXR-2026-130',
      feedback: 'Excellent service. Amit re-spliced the broken fiber cable quickly and ran a diagnostic test to ensure my speeds were back to normal.',
    },
    {
      id: 'REV-004',
      customerName: 'Kavita Menon',
      engineerName: 'Priya Reddy',
      rating: 2,
      date: '2026-07-06',
      requestId: 'NXR-2026-133',
      feedback: 'Issue is resolved, but the engineer left a huge mess of cables and zip ties on my floor. Needs to be more mindful of customer property.',
    }
  ];

  const [allReviews, setAllReviews] = useState(reviews);

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('nexora_feedbacks') || '[]');
    if (storedFeedbacks.length > 0) {
      const mappedFeedbacks = storedFeedbacks.map((fb, idx) => ({
        id: `REV-NEW-${idx}`,
        customerName: 'Aman Verma', // Assuming current user for demo
        engineerName: fb.engineer || 'Unassigned Engineer',
        rating: fb.rating,
        date: fb.date.split('T')[0],
        requestId: fb.reqId,
        feedback: fb.review || 'No written feedback provided.',
      }));
      setAllReviews([...mappedFeedbacks, ...reviews]);
    }
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FiStar 
        key={i} 
        size={14} 
        className={i < rating ? 'text-[#f59e0b] fill-[#f59e0b]' : 'text-border-base'} 
      />
    ));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-display font-bold text-text-base flex items-center gap-2">
          <FiStar className="text-[#f59e0b] fill-[#f59e0b]" /> Engineer Feedback & Reviews
        </h2>
        <p className="text-sm text-text-muted-base font-sans">
          Historical feedback and ratings provided by customers for our engineering team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allReviews.map((review, idx) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <Card className="h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-input-bg border border-input-border flex items-center justify-center text-text-base font-bold">
                      {review.customerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-base">{review.customerName}</h4>
                      <div className="flex items-center gap-1 text-xs text-text-secondary-base">
                        <FiUser size={10} /> <span>Reviewed <strong>{review.engineerName}</strong></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                <div className="bg-bg-base/50 p-4 rounded-xl text-sm text-text-base border border-border-base leading-relaxed italic">
                  "{review.feedback}"
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between text-xs text-text-muted-base border-t border-border-base pt-4">
                <div className="flex items-center gap-1">
                  <FiMessageSquare size={12} />
                  <span>Ticket: <span className="font-semibold text-text-secondary-base">{review.requestId}</span></span>
                </div>
                <div className="flex items-center gap-1">
                  <FiCalendar size={12} />
                  <span>{review.date}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
