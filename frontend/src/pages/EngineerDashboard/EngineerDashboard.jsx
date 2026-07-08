import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AppContext } from '../../app/providers/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import AssignedRequestsTable from '../../shared/ui/components/AssignedRequestsTable/AssignedRequestsTable';
import TasksTimeline from '../../shared/ui/components/TasksTimeline/TasksTimeline';
import PerformanceScore from '../../shared/ui/components/PerformanceScore/PerformanceScore';
import Card from '../../shared/ui/Card/Card';
import Button from '../../shared/ui/Button/Button';
import WifiSpeedTest from '../../features/WifiSpeedTest/WifiSpeedTest';
import './EngineerDashboard.css';

export default function EngineerDashboard() {
  const { requests, updateRequestStatus, currentUser } = useContext(AppContext);
  const engineerName = currentUser?.name || 'Rahul Sharma';

  const assignedRequests = useMemo(() => {
    return requests.filter(r => r.assignedEngineer === engineerName);
  }, [requests, engineerName]);

  const [selectedReqId, setSelectedReqId] = useState(() => {
    return assignedRequests.length > 0 ? assignedRequests[0].id : '';
  });

  const selectedReq = useMemo(() => {
    return requests.find(r => r.id === selectedReqId) || assignedRequests[0] || null;
  }, [requests, selectedReqId, assignedRequests]);

  useEffect(() => {
    if (!selectedReqId && assignedRequests.length > 0) {
      setSelectedReqId(assignedRequests[0].id);
    }
  }, [assignedRequests, selectedReqId]);

  const [updateStatus, setUpdateStatus] = useState('In Progress');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (selectedReq) {
      setUpdateStatus(selectedReq.status);
      setResolutionNotes(selectedReq.resolutionNotes || '');
    }
  }, [selectedReq]);

  const handleSaveUpdate = (e) => {
    e.preventDefault();
    if (!selectedReq) return;

    updateRequestStatus(selectedReq.id, updateStatus, resolutionNotes);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const stats = useMemo(() => {
    const open = assignedRequests.filter(r => r.status === 'Open').length;
    const inProgress = assignedRequests.filter(r => r.status === 'In Progress').length;
    const resolved = assignedRequests.filter(r => r.status === 'Resolved').length;
    return { open, inProgress, resolved };
  }, [assignedRequests]);

  return (
    <div className="space-y-6 select-none font-sans">
      
      {/* Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-base pb-6">
        <div>
          <h2 className="text-xl font-display font-bold text-text-base tracking-wide">
            Welcome back, {engineerName}
          </h2>
          <p className="text-xs text-text-muted-base mt-0.5">
            Here are your assigned requests and active tickets
          </p>
        </div>

        {/* Small stats badges */}
        <PerformanceScore stats={stats} />
      </div>

      {/* THREE-COLUMN INTERACTIVE GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* PANEL 1: My Assigned Requests */}
        <div className="xl:col-span-6">
          <Card className="p-6">
            <h3 className="text-xs font-semibold text-text-muted-base mb-4 uppercase tracking-wider">
              My Assigned Requests
            </h3>
            <AssignedRequestsTable
              requests={assignedRequests}
              selectedReqId={selectedReqId}
              onSelect={setSelectedReqId}
            />
          </Card>
        </div>

        {/* PANEL 2: Update Status Form */}
        <div className="xl:col-span-3">
          <Card className="p-6">
            <h3 className="text-xs font-semibold text-text-muted-base mb-4 uppercase tracking-wider">
              Update Status
            </h3>

            {selectedReq ? (
              <form onSubmit={handleSaveUpdate} className="space-y-4">
                <div className="bg-input-bg border border-input-border p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] text-text-muted-base font-bold block uppercase tracking-wider">Active Ticket</span>
                  <span className="text-sm font-bold text-accent-base block">{selectedReq.id}</span>
                  <span className="text-xs text-text-base font-medium block truncate">{selectedReq.title}</span>
                </div>

                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-semibold text-text-secondary-base uppercase tracking-wider">Update Status</label>
                  <select
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                    className="form-input w-full"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-semibold text-text-secondary-base uppercase tracking-wider">Resolution Notes</label>
                  <textarea
                    rows={4}
                    placeholder="Describe details of testing and fix..."
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    className="form-input w-full resize-none"
                  />
                </div>

                <AnimatePresence>
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-success-base text-xs font-bold justify-center"
                    >
                      <FiCheck />
                      Update Saved Successfully!
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button type="submit" variant="primary" className="w-full py-3">
                  Save Update
                </Button>
              </form>
            ) : (
              <div className="py-12 text-center text-text-muted-base text-xs">
                Select an assigned request to update its status.
              </div>
            )}
          </Card>
        </div>

        {/* PANEL 3: Request Details Overview */}
        <div className="xl:col-span-3 space-y-6">
          <WifiSpeedTest />
          <TasksTimeline request={selectedReq} />
        </div>

      </div>
    </div>
  );
}
