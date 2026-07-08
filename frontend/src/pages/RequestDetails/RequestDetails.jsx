import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../app/providers/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiClock, FiUser, FiMapPin, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import StatusBadge from '../../entities/StatusBadge/StatusBadge';
import Modal from '../../shared/ui/Modal/Modal';
import FeedbackModal from '../../features/FeedbackModal/FeedbackModal';
import './RequestDetails.css';

export default function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { requests, engineers, updateRequestStatus } = useContext(AppContext);
  const [showActions, setShowActions] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  const [statusVal, setStatusVal] = useState('');
  const [notesVal, setNotesVal] = useState('');
  const [engVal, setEngVal] = useState('');

  const req = requests.find(r => r.id === id);

  if (!req) {
    return (
      <div className="text-center py-16 font-sans">
        <h3 className="text-lg text-text-base font-bold">Request Not Found</h3>
        <p className="text-text-secondary-base text-sm mt-2">The request ID {id} does not exist in Nexora databases.</p>
        <button onClick={() => navigate('/requests')} className="mt-4 px-4 py-2 bg-primary-base text-white rounded-lg text-xs hover:bg-primary-hover-base transition-colors cursor-pointer">
          Return to list
        </button>
      </div>
    );
  }

  const handleOpenStatusModal = (overrideStatus = null) => {
    setStatusVal(overrideStatus || req.status);
    setNotesVal(req.resolutionNotes || '');
    setEngVal(req.assignedEngineer === '-' ? '' : req.assignedEngineer);
    setShowStatusModal(true);
    setShowActions(false);
  };

  const handleSaveStatus = () => {
    updateRequestStatus(req.id, statusVal, notesVal, engVal);
    setShowStatusModal(false);
    if (statusVal === 'Resolved' && req.status !== 'Resolved') {
      setShowFeedbackModal(true);
    }
  };

  const handleFeedbackSubmit = (feedback) => {
    // In a real app, this would be saved to a database and associated with the request/engineer.
    // We can simulate it by storing it in local storage or updating the request.
    const currentFeedback = JSON.parse(localStorage.getItem('nexora_feedbacks') || '[]');
    localStorage.setItem('nexora_feedbacks', JSON.stringify([
      ...currentFeedback,
      { reqId: req.id, engineer: req.assignedEngineer, ...feedback, date: new Date().toISOString() }
    ]));
    setShowFeedbackModal(false);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-card-base border border-border-base hover:bg-card-base/80 flex items-center justify-center rounded-xl text-text-secondary-base hover:text-text-base transition-colors cursor-pointer"
          >
            <FiArrowLeft size={16} />
          </button>
          
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-3">
              <span className="text-xl font-display font-bold text-text-base tracking-wide">{req.id}</span>
              <StatusBadge type="status" value={req.status} />
            </div>
            <span className="text-xs text-text-secondary-base font-sans mt-0.5">{req.title}</span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="px-5 py-2.5 bg-card-base hover:bg-card-base/80 border border-border-base text-text-base rounded-xl text-xs font-semibold tracking-wide transition-all font-sans flex items-center gap-2 cursor-pointer"
          >
            Actions
            <span className="text-[10px]">▼</span>
          </button>

          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 5 }}
                className="absolute right-0 mt-2 w-48 bg-card-base border border-border-base rounded-xl shadow-xl overflow-hidden z-30 font-sans text-xs details-action-dropdown"
              >
                <button
                  onClick={handleOpenStatusModal}
                  className="w-full text-left px-4 py-3 text-text-base hover:bg-card-base/50 border-b border-border-base transition-colors cursor-pointer"
                >
                  Update Status / Assign
                </button>
                <button
                  onClick={() => updateRequestStatus(req.id, 'Open')}
                  disabled={req.status === 'Open'}
                  className="w-full text-left px-4 py-3 text-text-secondary-base hover:text-text-base hover:bg-card-base/50 border-b border-border-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Reopen Ticket
                </button>
                <button
                  onClick={() => navigate('/requests')}
                  className="w-full text-left px-4 py-3 text-text-secondary-base hover:text-text-base hover:bg-card-base/50 transition-colors cursor-pointer"
                >
                  Back to List
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* THREE-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMN 1: Ticket Information */}
        <div className="lg:col-span-4 bg-card-base border border-border-base rounded-2xl p-6 backdrop-blur-md space-y-6 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary-base font-sans mb-4 border-b border-border-base/50 pb-2">
              Ticket Information
            </h4>

            <div className="space-y-4 font-sans text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-text-secondary-base flex items-center gap-2"><FiUser /> Customer</span>
                <span className="text-text-base font-semibold">{req.customer}</span>
              </div>
              
              <div className="flex justify-between items-center py-1">
                <span className="text-text-secondary-base flex items-center gap-2"><FiMapPin /> Location</span>
                <span className="text-text-base font-semibold">{req.location}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-text-secondary-base flex items-center gap-2"><FiTrendingUp /> Priority</span>
                <StatusBadge type="priority" value={req.priority} />
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-text-secondary-base flex items-center gap-2"><FiCalendar /> Created At</span>
                <span className="text-text-base font-semibold">{req.createdAt.split(',')[0]}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-text-secondary-base flex items-center gap-2"><FiUser /> Assigned Engineer</span>
                <span className="text-text-base font-semibold">{req.assignedEngineer}</span>
              </div>
            </div>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/10 p-4 rounded-xl text-center text-xs text-text-secondary-base font-sans">
            Assigned engineer is responsible for keeping notes up to date.
          </div>
        </div>

        {/* COLUMN 2: Timeline Progression */}
        <div className="lg:col-span-4 bg-card-base border border-border-base rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary-base font-sans mb-6 border-b border-border-base/50 pb-2">
              Timeline
            </h4>

            <div className="space-y-6 font-sans relative pl-6 details-timeline-connector">
              {req.timeline.map((log) => (
                <div key={log.id} className="relative group">
                  <span className={`absolute left-[-21px] top-1 w-4.5 h-4.5 rounded-full border border-card-base flex items-center justify-center text-[9px] ${
                    log.type === 'resolved' ? 'bg-success-base text-white' :
                    log.type === 'status' ? 'bg-warning-base text-white' :
                    log.type === 'assigned' ? 'bg-accent-base text-white' :
                    'bg-primary-base text-white'
                  }`}>
                    <FiCheck strokeWidth={3} />
                  </span>

                  <div className="space-y-1 text-left">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-text-base group-hover:text-accent-base transition-colors">
                        {log.label}
                      </span>
                      <span className="text-[9px] text-text-secondary-base whitespace-nowrap ml-2">
                        {log.time.split(',')[1] || log.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-secondary-base leading-relaxed">
                      {log.details}
                    </p>
                  </div>
                </div>
              ))}

              {req.status !== 'Resolved' && (
                <div className="relative group opacity-40">
                  <span className="absolute left-[-21px] top-1 w-4.5 h-4.5 rounded-full border border-border-base bg-card-base flex items-center justify-center" />
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-text-base">Resolved</span>
                    <p className="text-[11px] text-text-secondary-base">Awaiting engineer completion notes</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-border-base/50 text-[10px] text-text-secondary-base font-sans flex items-center justify-between">
            <span>SLA Standard Target: <strong className="text-text-base">24 Hours</strong></span>
            <span>Ref: {req.id}</span>
          </div>
        </div>

        {/* COLUMN 3: Resolution Notes */}
        <div className="lg:col-span-4 bg-card-base border border-border-base rounded-2xl p-6 backdrop-blur-md space-y-6 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary-base font-sans mb-4 border-b border-border-base/50 pb-2">
              Resolution
            </h4>

            {req.status === 'Resolved' ? (
              <div className="space-y-5 font-sans">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-text-secondary-base uppercase tracking-wider block">Resolution Notes</span>
                  <div className="bg-cyan-500/5 border border-cyan-500/10 p-4 rounded-xl text-xs text-text-base leading-relaxed">
                    {req.resolutionNotes || 'No notes specified.'}
                  </div>
                </div>

                <div className="flex justify-between items-center py-1 text-xs">
                  <span className="text-text-secondary-base">Resolved At</span>
                  <span className="text-text-base font-semibold">{req.resolvedAt.split(',')[0]}</span>
                </div>

                <div className="flex justify-between items-center py-1 text-xs">
                  <span className="text-text-secondary-base">Resolution Time</span>
                  <span className="px-3 py-1 bg-success-base/10 border border-success-base/25 text-success-base rounded-full text-[10px] font-bold">
                    {req.resolutionTime || 'N/A'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center font-sans space-y-4">
                <div className="p-4 rounded-full bg-warning-base/10 text-warning-base border border-warning-base/20">
                  <FiClock size={28} className="animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-text-base">Pending Resolution</span>
                  <p className="text-[11px] text-text-secondary-base max-w-[200px] mx-auto leading-relaxed">
                    This ticket is currently <strong className="text-warning-base">{req.status}</strong>. Completion details will populate here once resolved.
                  </p>
                </div>
              </div>
            )}
          </div>

          {req.status !== 'Resolved' ? (
            <button
              onClick={() => handleOpenStatusModal('Resolved')}
              className="w-full py-3 bg-primary-base hover:bg-primary-hover-base text-white rounded-xl text-xs font-semibold transition-all font-sans cursor-pointer"
            >
              Resolve Ticket Now
            </button>
          ) : (
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="w-full py-3 bg-accent-base hover:opacity-90 text-slate-950 font-bold rounded-xl text-xs transition-all font-sans cursor-pointer shadow-lg shadow-accent-glow-base"
            >
              Provide Feedback
            </button>
          )}
        </div>

      </div>

      {/* UPDATE STATUS MODAL */}
      <Modal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        title="Update Status"
        subtitle={`Modify request metadata for ${req.id}`}
        size="md"
      >
        <div className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary-base">Current Status</label>
            <select
              value={statusVal}
              onChange={(e) => setStatusVal(e.target.value)}
              className="w-full px-4 py-2.5 bg-input-bg border border-input-border rounded-xl text-sm text-text-base focus:outline-none focus:border-accent-base"
            >
              <option className="bg-[#0f172a] text-white" value="Open">Open</option>
              <option className="bg-[#0f172a] text-white" value="In Progress">In Progress</option>
              <option className="bg-[#0f172a] text-white" value="Unresolved">Unresolved</option>
              <option className="bg-[#0f172a] text-white" value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-secondary-base">Assign Engineer</label>
            <select
              value={engVal}
              onChange={(e) => setEngVal(e.target.value)}
              className="w-full px-4 py-2.5 bg-input-bg border border-input-border rounded-xl text-sm text-text-base focus:outline-none focus:border-accent-base"
            >
              <option value="-">-</option>
              {engineers.map(e => (
                <option key={e.id} value={e.name}>{e.name}</option>
              ))}
            </select>
          </div>

          {statusVal === 'Resolved' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text-secondary-base">Resolution Notes</label>
              <textarea
                rows={4}
                placeholder="Checked the line and reconfigured the router. Internet is working fine now."
                value={notesVal}
                onChange={(e) => setNotesVal(e.target.value)}
                className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-xl text-sm text-text-base focus:outline-none focus:border-accent-base resize-none font-sans"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-border-base/50">
            <button
              onClick={() => setShowStatusModal(false)}
              className="px-4 py-2.5 border border-border-base rounded-xl text-xs font-semibold text-text-secondary-base hover:text-text-base hover:bg-card-base/80 transition-all cursor-pointer bg-card-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveStatus}
              className="px-4 py-2.5 bg-primary-base hover:bg-primary-hover-base text-white rounded-xl text-xs font-semibold shadow-lg shadow-primary-base/20 transition-all cursor-pointer"
            >
              Save Update
            </button>
          </div>
        </div>
      </Modal>

      <FeedbackModal 
        isOpen={showFeedbackModal} 
        onClose={() => setShowFeedbackModal(false)} 
        onSubmit={handleFeedbackSubmit}
        reqId={req.id}
      />
    </div>
  );
}
