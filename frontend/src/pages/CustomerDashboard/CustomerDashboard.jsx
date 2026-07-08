import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../app/providers/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus, FiList, FiBell, FiUser, FiMessageSquare, FiPhone,
  FiAlertCircle, FiCheckCircle, FiClock, FiTool, FiTruck,
  FiActivity, FiTrendingUp, FiStar, FiZap, FiWifi, FiArrowRight,
  FiChevronRight, FiShield, FiSettings
} from 'react-icons/fi';
import './CustomerDashboard.css';
import CreateRequestModal from '../../features/CreateRequestModal/CreateRequestModal';
import WifiSpeedTest from '../../features/WifiSpeedTest/WifiSpeedTest';

/* ─── Status config ──────────────────────────────────────────────────────── */
const STATUS_CONFIG = {
  'Open':             { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)',  icon: FiAlertCircle,  step: 0 },
  'Under Review':     { color: '#00e5ff', bg: 'rgba(0,229,255,0.1)',   border: 'rgba(0,229,255,0.25)',  icon: FiActivity,     step: 1 },
  'Assigned':         { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)',icon: FiUser,         step: 2 },
  'Engineer En Route':{ color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.25)', icon: FiTruck,        step: 3 },
  'In Progress':      { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.25)', icon: FiTool,         step: 4 },
  'Resolved':         { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.25)', icon: FiCheckCircle,  step: 5 },
  'Cancelled':        { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.25)',  icon: FiAlertCircle,  step: -1 },
};

const STATUS_STEPS = ['Open','Under Review','Assigned','Engineer En Route','In Progress','Resolved'];

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['Open'];
  const Icon = cfg.icon;
  return (
    <span className="ud-status-badge" style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      <Icon size={10} />
      {status}
    </span>
  );
}

/* ─── KPI Card ────────────────────────────────────────────────────────────── */
function KPICard({ label, value, icon: Icon, color, sub, delay = 0 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const target = typeof value === 'number' ? value : 0;
    let start = 0;
    const step = target / 30;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div className="ud-kpi-card"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}>
      <div className="ud-kpi-icon" style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
        <Icon size={18} />
      </div>
      <div className="ud-kpi-body">
        <div className="ud-kpi-value" style={{ color }}>
          {typeof value === 'number' ? count : value}
        </div>
        <div className="ud-kpi-label">{label}</div>
        {sub && <div className="ud-kpi-sub">{sub}</div>}
      </div>
      <div className="ud-kpi-glow" style={{ background: `radial-gradient(circle at 80% 50%, ${color}15, transparent 70%)` }} />
    </motion.div>
  );
}

/* ─── Quick action card ───────────────────────────────────────────────────── */
function QuickAction({ icon: Icon, label, desc, color, to, onClick, delay = 0 }) {
  const content = (
    <>
      <div className="ud-qa-icon"><Icon size={22} /></div>
      <div className="ud-qa-text">
        <span className="ud-qa-label">{label}</span>
        <span className="ud-qa-desc">{desc}</span>
      </div>
      <FiChevronRight size={14} className="ud-qa-arrow" />
    </>
  );

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay }} whileHover={{ y: -3, scale: 1.02 }}>
      {to ? (
        <Link to={to} className="ud-qa-card" style={{ '--qa-color': color }}>
          {content}
        </Link>
      ) : (
        <button onClick={onClick} className="ud-qa-card w-full text-left" style={{ '--qa-color': color }}>
          {content}
        </button>
      )}
    </motion.div>
  );
}

/* ─── Status timeline ─────────────────────────────────────────────────────── */
function StatusTimeline({ status }) {
  const currentStep = STATUS_CONFIG[status]?.step ?? 0;
  return (
    <div className="ud-timeline-steps">
      {STATUS_STEPS.map((step, i) => {
        const done = i <= currentStep;
        const active = i === currentStep;
        const cfg = STATUS_CONFIG[step];
        const Icon = cfg.icon;
        return (
          <div key={step} className="ud-timeline-step">
            <div className={`ud-timeline-dot ${done ? 'done' : ''} ${active ? 'active' : ''}`}
              style={active ? { background: cfg.color, boxShadow: `0 0 12px ${cfg.color}` } : done ? { background: '#10b981' } : {}}>
              {done ? <Icon size={9} /> : <span />}
            </div>
            {i < STATUS_STEPS.length - 1 && (
              <div className={`ud-timeline-line ${i < currentStep ? 'done' : ''}`} />
            )}
            <span className={`ud-timeline-label ${active ? 'active' : done ? 'done' : ''}`}
              style={active ? { color: cfg.color } : {}}>{step}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Notification item ───────────────────────────────────────────────────── */
const NOTIF_DATA = [
  { icon: FiCheckCircle, color: '#10b981', title: 'Request Resolved', desc: 'NXR-2026-121 has been resolved successfully.', time: '2 hrs ago', unread: false },
  { icon: FiUser, color: '#a78bfa', title: 'Engineer Assigned', desc: 'Rahul Sharma assigned to NXR-2026-123.', time: '4 hrs ago', unread: false },
  { icon: FiTruck, color: '#3b82f6', title: 'Engineer En Route', desc: 'Engineer arriving in approximately 15 minutes.', time: '4 hrs ago', unread: true },
  { icon: FiZap, color: '#00e5ff', title: 'AI Recommendation', desc: 'Preventive maintenance scheduled for your area.', time: '1 day ago', unread: true },
  { icon: FiBell, color: '#f59e0b', title: 'New Request Submitted', desc: 'Your request NXR-2026-124 is under review.', time: '2 days ago', unread: false },
];

/* ─── Main User Dashboard ─────────────────────────────────────────────────── */
export default function CustomerDashboard() {
  const { currentUser, requests } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notifCount, setNotifCount] = useState(2);

  const userName = currentUser?.name || 'User';
  const firstWord = userName.split(' ')[0];

  // filter to current user's requests (or show all for demo)
  const myRequests = requests.slice(0, 8);
  const openCount     = myRequests.filter(r => r.status === 'Open').length;
  const resolvedCount = myRequests.filter(r => r.status === 'Resolved').length;
  const inProgCount   = myRequests.filter(r => r.status === 'In Progress').length;

  const latestRequest = myRequests[0];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'requests', label: 'My Requests' },
    { key: 'notifications', label: `Notifications ${notifCount > 0 ? `(${notifCount})` : ''}` },
    { key: 'profile', label: 'Account History' },
  ];

  return (
    <div className="ud-root">

      {/* ── Header ── */}
      <div className="ud-header">
        <div className="ud-header-left">
          <div className="ud-header-greeting">{greeting}, <span className="ud-header-name">{firstWord}</span> 👋</div>
          <p className="ud-header-sub">Welcome to your NEXORA AI command center</p>
        </div>
        <div className="ud-header-actions">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <button onClick={() => setShowCreateModal(true)} className="ud-primary-btn">
              <FiPlus size={14} />
              <span>New Request</span>
            </button>
          </motion.div>
          <Link to="/notifications" className="ud-icon-btn" title="Notifications">
            <FiBell size={16} />
            {notifCount > 0 && <span className="ud-notif-dot">{notifCount}</span>}
          </Link>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="ud-tabs">
        {tabs.map(tab => (
          <button key={tab.key}
            className={`ud-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}>
            {tab.label}
            {activeTab === tab.key && <motion.div className="ud-tab-indicator" layoutId="tab-indicator" />}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <motion.div key="overview"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>

            {/* KPI row */}
            <div className="ud-kpi-row">
              <KPICard label="Total Requests" value={myRequests.length} icon={FiList} color="#00e5ff" sub="All time" delay={0} />
              <KPICard label="Open Tickets" value={openCount} icon={FiAlertCircle} color="#f59e0b" sub="Awaiting action" delay={0.06} />
              <KPICard label="Resolved" value={resolvedCount} icon={FiCheckCircle} color="#10b981" sub="Successfully closed" delay={0.12} />
              <KPICard label="In Progress" value={inProgCount} icon={FiTool} color="#a78bfa" sub="Engineer working" delay={0.18} />
              <KPICard label="Satisfaction" value="4.8★" icon={FiStar} color="#f59e0b" sub="Your avg rating" delay={0.24} />
            </div>

            {/* Main grid */}
            <div className="ud-grid">
              {/* Quick Actions */}
              <div className="ud-section">
                <h3 className="ud-section-title"><FiZap size={14} /> Quick Actions</h3>
                <div className="ud-qa-grid">
                  <QuickAction icon={FiPlus} label="New Request" desc="File a new service ticket" color="#00e5ff" onClick={() => setShowCreateModal(true)} delay={0} />
                  <QuickAction icon={FiList} label="My Requests" desc="Track all your requests" color="#a78bfa" to="/requests" delay={0.05} />
                  <QuickAction icon={FiUser} label="My Profile" desc="View & edit your account" color="#10b981" to="/profile" delay={0.1} />
                  <QuickAction icon={FiShield} label="Support Chat" desc="Talk to our AI concierge" color="#f59e0b" to="/ai-features" delay={0.15} />
                </div>
              </div>

              {/* Latest request status */}
              {latestRequest && (
                <div className="ud-section">
                  <h3 className="ud-section-title"><FiActivity size={14} /> Latest Request Status</h3>
                  <div className="ud-latest-card">
                    <div className="ud-latest-header">
                      <div>
                        <div className="ud-latest-id">{latestRequest.id}</div>
                        <div className="ud-latest-title">{latestRequest.title}</div>
                      </div>
                      <StatusBadge status={latestRequest.status} />
                    </div>
                    <div className="ud-latest-meta">
                      <span><FiClock size={10} /> {latestRequest.createdAt}</span>
                      <span><FiUser size={10} /> {latestRequest.assignedEngineer !== '-' ? latestRequest.assignedEngineer : 'Unassigned'}</span>
                    </div>
                    <StatusTimeline status={latestRequest.status} />
                    <Link to={`/request/${latestRequest.id}`} className="ud-latest-link">
                      View details <FiArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              )}

              {/* WiFi Speed Test */}
              <div className="ud-section">
                <WifiSpeedTest />
              </div>
            </div>

            {/* Recent requests table */}
            <div className="ud-section">
              <div className="ud-section-header">
                <h3 className="ud-section-title"><FiList size={14} /> Recent Requests</h3>
                <Link to="/requests" className="ud-see-all">See all <FiArrowRight size={11} /></Link>
              </div>
              <div className="ud-requests-table">
                <div className="ud-table-head">
                  <span>ID</span><span>Issue</span><span>Priority</span><span>Status</span><span>Engineer</span><span>Date</span>
                </div>
                {myRequests.slice(0, 5).map((req, i) => (
                  <motion.div key={req.id} className="ud-table-row"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    onClick={() => navigate(`/request/${req.id}`)}>
                    <span className="ud-table-id">{req.id}</span>
                    <span className="ud-table-title">{req.title}</span>
                    <span className={`ud-priority-badge priority-${req.priority?.toLowerCase()}`}>{req.priority}</span>
                    <StatusBadge status={req.status} />
                    <span className="ud-table-eng">{req.assignedEngineer !== '-' ? req.assignedEngineer : '—'}</span>
                    <span className="ud-table-date">{req.createdAt?.split(',')[0]}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── REQUESTS TAB ── */}
        {activeTab === 'requests' && (
          <motion.div key="requests"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <div className="ud-section">
              <div className="ud-section-header">
                <h3 className="ud-section-title"><FiList size={14} /> All Service Requests</h3>
                <button onClick={() => setShowCreateModal(true)} className="ud-primary-btn ud-primary-btn-sm">
                  <FiPlus size={12} /><span>New Request</span>
                </button>
              </div>
              <div className="ud-requests-table">
                <div className="ud-table-head">
                  <span>ID</span><span>Issue</span><span>Priority</span><span>Status</span><span>Engineer</span><span>Date</span>
                </div>
                {myRequests.map((req, i) => (
                  <motion.div key={req.id} className="ud-table-row"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    onClick={() => navigate(`/request/${req.id}`)}>
                    <span className="ud-table-id">{req.id}</span>
                    <span className="ud-table-title">{req.title}</span>
                    <span className={`ud-priority-badge priority-${req.priority?.toLowerCase()}`}>{req.priority}</span>
                    <StatusBadge status={req.status} />
                    <span className="ud-table-eng">{req.assignedEngineer !== '-' ? req.assignedEngineer : '—'}</span>
                    <span className="ud-table-date">{req.createdAt?.split(',')[0]}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── NOTIFICATIONS TAB ── */}
        {activeTab === 'notifications' && (
          <motion.div key="notifications"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <div className="ud-section">
              <div className="ud-section-header">
                <h3 className="ud-section-title"><FiBell size={14} /> Notification Center</h3>
                <button className="ud-text-btn" onClick={() => setNotifCount(0)}>Mark all read</button>
              </div>
              <div className="ud-notif-list">
                {NOTIF_DATA.map((n, i) => {
                  const Icon = n.icon;
                  return (
                    <motion.div key={i} className={`ud-notif-item ${n.unread ? 'unread' : ''}`}
                      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}>
                      <div className="ud-notif-icon" style={{ color: n.color, background: `${n.color}15` }}>
                        <Icon size={15} />
                      </div>
                      <div className="ud-notif-body">
                        <div className="ud-notif-title">{n.title}</div>
                        <div className="ud-notif-desc">{n.desc}</div>
                        <div className="ud-notif-time">{n.time}</div>
                      </div>
                      {n.unread && <div className="ud-notif-unread-dot" style={{ background: n.color }} />}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── ACCOUNT TAB (Now Account History) ── */}
        {activeTab === 'profile' && (
          <motion.div key="profile"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <div className="ud-section">
              <div className="ud-section-header">
                <h3 className="ud-section-title"><FiList size={14} /> Past Account Requests</h3>
              </div>
              <div className="ud-requests-table">
                <div className="ud-table-head">
                  <span>ID</span><span>Issue</span><span>Priority</span><span>Status</span><span>Engineer</span><span>Date</span>
                </div>
                {myRequests.map((req, i) => (
                  <motion.div key={req.id} className="ud-table-row"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    onClick={() => navigate(`/request/${req.id}`)}>
                    <span className="ud-table-id">{req.id}</span>
                    <span className="ud-table-title">{req.title}</span>
                    <span className={`ud-priority-badge priority-${req.priority?.toLowerCase()}`}>{req.priority}</span>
                    <StatusBadge status={req.status} />
                    <span className="ud-table-eng">{req.assignedEngineer !== '-' ? req.assignedEngineer : '—'}</span>
                    <span className="ud-table-date">{req.createdAt?.split(',')[0]}</span>
                  </motion.div>
                ))}
                {myRequests.length === 0 && (
                  <div className="p-8 text-center text-text-muted-base font-sans text-sm">
                    No past requests found for this account.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CreateRequestModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
}
