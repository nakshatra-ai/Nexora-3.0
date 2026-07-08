import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import { AppContext } from '../../app/providers/AppContext';
import Button from '../../shared/ui/Button/Button';

export default function CreateRequestModal({ isOpen, onClose }) {
  const { addRequest, currentUser } = useContext(AppContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Fiber');
  const [subcategory, setSubcategory] = useState('Total Blackout');
  const [priority, setPriority] = useState('Low');
  const [location, setLocation] = useState('Sector 5, Noida');
  const [suggestion, setSuggestion] = useState(null);

  // Auto-suggest priority based on keywords in description
  useEffect(() => {
    const text = description.toLowerCase();
    const highKeywords = ['down', 'urgent', 'critical', 'offline', 'broken', 'fire', 'cut'];
    const mediumKeywords = ['slow', 'delay', 'lag', 'buffering'];

    if (highKeywords.some(kw => text.includes(kw))) {
      setSuggestion('High');
    } else if (mediumKeywords.some(kw => text.includes(kw))) {
      setSuggestion('Medium');
    } else {
      setSuggestion(null);
    }
  }, [description]);

  const handleApplySuggestion = () => {
    if (suggestion) {
      setPriority(suggestion);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const requestPayload = {
      title,
      description,
      category,
      subcategory,
      priority,
      location,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      customer: currentUser?.name || 'Aman Verma',
      assignedEngineer: '-'
    };

    addRequest(requestPayload);
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('Fiber');
    setSubcategory('Total Blackout');
    setPriority('Low');
    setLocation('Sector 5, Noida');
    setSuggestion(null);

    // Close modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none font-sans">
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
            className="relative w-full max-w-2xl bg-surface-base border border-border-base rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-base bg-surface-hover-base">
              <div>
                <h3 className="text-xl font-display font-bold text-text-base">Create Service Request</h3>
                <p className="text-xs text-text-muted-base mt-1">File a new support ticket for your services.</p>
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
              <form id="createRequestForm" onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-text-secondary-base mb-2">Request Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Internet totally down since morning"
                    className="w-full bg-input-bg border border-input-border rounded-xl px-4 py-2.5 text-text-base focus:outline-none focus:border-primary-base focus:ring-1 focus:ring-primary-base transition-colors placeholder:text-text-muted-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary-base mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-input-bg border border-input-border rounded-xl px-4 py-2.5 text-text-base focus:outline-none focus:border-primary-base transition-colors"
                    >
                      <option className="bg-[#0f172a] text-white" value="Fiber">Fiber</option>
                      <option className="bg-[#0f172a] text-white" value="Mobile">Mobile</option>
                      <option className="bg-[#0f172a] text-white" value="Broadband">Broadband</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary-base mb-2">Subcategory</label>
                    <select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      className="w-full bg-input-bg border border-input-border rounded-xl px-4 py-2.5 text-text-base focus:outline-none focus:border-primary-base transition-colors"
                    >
                      <option className="bg-[#0f172a] text-white" value="Total Blackout">Total Blackout</option>
                      <option className="bg-[#0f172a] text-white" value="Slow Speeds">Slow Speeds</option>
                      <option className="bg-[#0f172a] text-white" value="Intermittent Drops">Intermittent Drops</option>
                      <option className="bg-[#0f172a] text-white" value="Hardware Issue">Hardware Issue</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-secondary-base mb-2">Description</label>
                  <textarea
                    required
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please provide details about the issue..."
                    className="w-full bg-input-bg border border-input-border rounded-xl px-4 py-3 text-text-base focus:outline-none focus:border-primary-base focus:ring-1 focus:ring-primary-base transition-colors placeholder:text-text-muted-base resize-none"
                  ></textarea>
                </div>

                {suggestion && suggestion !== priority && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-accent-base/10 border border-accent-base/30 rounded-xl p-4 flex items-start gap-3"
                  >
                    <div className="bg-accent-base/20 p-2 rounded-full mt-0.5 text-accent-base">
                      <FiCheckCircle size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-accent-base">AI Insight</h4>
                      <p className="text-xs text-text-secondary-base mt-1 mb-2">
                        Based on your description, we recommend upgrading priority to <strong>{suggestion}</strong>.
                      </p>
                      <button
                        type="button"
                        onClick={handleApplySuggestion}
                        className="text-xs font-semibold text-white bg-accent-base hover:bg-accent-base/80 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Apply {suggestion} Priority
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary-base mb-2">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full bg-input-bg border border-input-border rounded-xl px-4 py-2.5 text-text-base focus:outline-none focus:border-primary-base transition-colors"
                    >
                      <option className="bg-[#0f172a] text-white" value="Low">Low (SLA: 48h)</option>
                      <option className="bg-[#0f172a] text-white" value="Medium">Medium (SLA: 24h)</option>
                      <option className="bg-[#0f172a] text-white" value="High">High (SLA: 4h)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary-base mb-2">Location</label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Sector 5, Noida"
                      className="w-full bg-input-bg border border-input-border rounded-xl px-4 py-2.5 text-text-base focus:outline-none focus:border-primary-base focus:ring-1 focus:ring-primary-base transition-colors placeholder:text-text-muted-base"
                    />
                  </div>
                </div>

              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border-base bg-surface-hover-base flex items-center justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" form="createRequestForm" variant="primary">
                Submit Request
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
