import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../app/providers/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import {
  FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle,
  FiChevronRight, FiShield, FiUser, FiTool, FiArrowLeft, FiCheck
} from 'react-icons/fi';
import AdminAccessModal from '../../features/AdminAccessModal/AdminAccessModal';
import './Login.css';

/* ─── Animated background canvas ─────────────────────────────────────────── */
function NeuralCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * 1400, y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.4, opacity: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    let t = 0;
    const render = () => {
      t += 0.008; ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#010a1a'); bg.addColorStop(0.5, '#000d1f'); bg.addColorStop(1, '#020812');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      ctx.save(); ctx.strokeStyle = 'rgba(0,100,220,0.03)'; ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 55) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 55) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.restore();
      [{ cx: W * 0.15, cy: H * 0.2, r: 280, c: 'rgba(37,99,235,0.07)' },
       { cx: W * 0.85, cy: H * 0.75, r: 240, c: 'rgba(0,180,255,0.06)' },
       { cx: W * 0.5, cy: H * 0.5, r: 200, c: 'rgba(100,0,255,0.04)' }].forEach(b => {
        const ox = Math.sin(t * 0.3) * 25, oy = Math.cos(t * 0.25) * 20;
        const g = ctx.createRadialGradient(b.cx + ox, b.cy + oy, 0, b.cx + ox, b.cy + oy, b.r);
        g.addColorStop(0, b.c); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.cx + ox, b.cy + oy, b.r, 0, Math.PI * 2); ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]; n.x += n.vx; n.y += n.vy; n.pulse += 0.04;
        if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j], dx = n.x - m.x, dy = n.y - m.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) { ctx.save(); ctx.strokeStyle = `rgba(0,150,255,${(1 - d / 130) * 0.12})`; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke(); ctx.restore(); }
        }
        const p = 0.5 + 0.5 * Math.sin(n.pulse);
        ctx.save(); ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 6 * p; ctx.fillStyle = `rgba(0,200,255,${n.opacity * p})`; ctx.beginPath(); ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }
      const bX = W * 0.5 + Math.sin(t * 0.2) * W * 0.3;
      const bG = ctx.createLinearGradient(bX - 2, 0, bX + 2, H);
      bG.addColorStop(0, 'rgba(0,180,255,0)'); bG.addColorStop(0.4, 'rgba(0,180,255,0.04)'); bG.addColorStop(0.6, 'rgba(0,180,255,0.04)'); bG.addColorStop(1, 'rgba(0,180,255,0)');
      ctx.fillStyle = bG; ctx.fillRect(bX - 80, 0, 160, H);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafRef.current); };
  }, []);
  return <canvas ref={canvasRef} className="auth-neural-canvas" />;
}

/* ─── Premium input ───────────────────────────────────────────────────────── */
function AuthInput({ label, icon: Icon, type = 'text', value, onChange, placeholder, required, rightSlot }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={`auth-field ${focused ? 'focused' : ''}`}>
      <label className="auth-field-label">{label}</label>
      <div className="auth-field-inner">
        {Icon && <Icon className="auth-field-icon" />}
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
          className="auth-field-input" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        {rightSlot && <div className="auth-field-right">{rightSlot}</div>}
      </div>
    </div>
  );
}

function PasswordInput({ label, value, onChange, required }) {
  const [show, setShow] = useState(false);
  return (
    <AuthInput label={label} icon={FiLock} type={show ? 'text' : 'password'} value={value}
      onChange={onChange} placeholder="••••••••" required={required}
      rightSlot={
        <button type="button" className="auth-eye-btn" onClick={() => setShow(s => !s)} tabIndex={-1}>
          {show ? <FiEyeOff size={13} /> : <FiEye size={13} />}
        </button>
      }
    />
  );
}

/* ─── Role definitions ───────────────────────────────────────────────────── */
const ROLES = [
  {
    key: 'user',
    label: 'User',
    desc: 'Customer portal access',
    icon: FiUser,
    color: '#00e5ff',
    gradient: 'linear-gradient(135deg, rgba(0,229,255,0.12), rgba(0,100,200,0.06))',
    border: 'rgba(0,229,255,0.35)',
    glow: 'rgba(0,229,255,0.2)',
  },
  {
    key: 'engineer',
    label: 'Engineer',
    desc: 'Field technician access',
    icon: FiTool,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(5,100,60,0.06))',
    border: 'rgba(16,185,129,0.35)',
    glow: 'rgba(16,185,129,0.2)',
  },
];

/* ─── Combination Lock Keypad (Engineer step 2) ────────────────────────── */
function ComboKeypad({ pin, setPin, onVerify, onBack, error, color }) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'CLEAR', 0, 'CONFIRM'];

  const handleKeyPress = (val) => {
    if (val === 'CLEAR') {
      setPin([]);
    } else if (val === 'CONFIRM') {
      if (pin.length === 4) onVerify();
    } else {
      if (pin.length < 4) {
        setPin(prev => [...prev, val]);
      }
    }
  };

  // Auto trigger verification when 4 digits are completed
  useEffect(() => {
    if (pin.length === 4) {
      const timer = setTimeout(() => {
        onVerify();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [pin]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="engineer-combo-keypad"
    >
      <button type="button" onClick={onBack} className="combo-back-btn">
        <FiArrowLeft size={12} /> <span>Back to credentials</span>
      </button>

      <h3 className="combo-title">Security Verification</h3>
      <p className="combo-subtitle">Enter your 4-digit secondary employee security code (PIN)</p>

      {/* Masked PIN Display */}
      <div className={`combo-pin-display ${error ? 'shake-error' : ''}`}>
        {[0, 1, 2, 3].map(idx => (
          <div
            key={idx}
            className={`combo-pin-dot ${pin.length > idx ? 'filled' : ''}`}
            style={pin.length > idx ? {
              background: color,
              boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`
            } : {}}
          />
        ))}
      </div>

      {/* Futuristic Circular Button Grid */}
      <div className="combo-grid">
        {digits.map((val, idx) => {
          const isAction = typeof val === 'string';
          return (
            <motion.button
              key={idx}
              type="button"
              onClick={() => handleKeyPress(val)}
              className={`combo-btn ${isAction ? 'action-btn' : ''}`}
              whileHover={{ scale: 1.08, borderColor: color, boxShadow: `0 0 12px ${color}20` }}
              whileTap={{ scale: 0.94 }}
            >
              {val === 'CLEAR' ? 'CLR' : val === 'CONFIRM' ? 'OK' : val}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Main Login component ───────────────────────────────────────────────── */
export default function Login() {
  /* ── preserved auth logic ── */
  const { loginUser, adminPinValidated, currentUser } = useContext(AppContext);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [email, setEmail]       = useState('rahul@nexora.com');
  const [password, setPassword] = useState('password123');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/dashboard');
  }, [currentUser, navigate]);

  // Hidden admin login shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setShowAdminModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /* ── new: role & multi-step authentication state ── */
  const [selectedRole, setSelectedRole] = useState('user');
  const [engineerStep, setEngineerStep] = useState(1); // 1 = credentials, 2 = PIN pad
  const [engineerPin, setEngineerPin] = useState([]);
  const [pinError, setPinError] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialProvider, setSocialProvider] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    // Engineer domain check
    if (selectedRole === 'engineer') {
      const isNexoraDomain = email.trim().toLowerCase().endsWith('@nexora.com');
      if (!isNexoraDomain) {
        setLoginError('Access Denied: Only @nexora.com corporate emails are permitted.');
        return;
      }
      // Pass to PIN security step
      setEngineerStep(2);
      setEngineerPin([]);
      return;
    }

    // Normal User Login
    setLoading(true);
    await new Promise(r => setTimeout(r, 650));
    try {
      loginUser(email, password, 'user');
      navigate('/dashboard');
    } catch (err) {
      setLoginError('Invalid credentials. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoginError('');
    setSocialProvider(provider);
    setSocialLoading(true);
    
    // Simulate premium secure oauth handshake
    await new Promise(r => setTimeout(r, 1200));
    
    try {
      // Mock logged-in user profile from Google / Apple identity provider
      loginUser(`oauth_${provider.toLowerCase()}@example.com`, 'oauth_token', 'user');
      navigate('/dashboard');
    } catch (err) {
      setLoginError(`OAuth verification with ${provider} failed.`);
    } finally {
      setSocialLoading(false);
    }
  };

  const handleEngineerPinVerify = async () => {
    setPinError(false);
    const pinString = engineerPin.join('');
    
    // Validate secondary employee security code (PIN): let's use 4321
    if (pinString === '4321') {
      setLoading(true);
      await new Promise(r => setTimeout(r, 800));
      try {
        loginUser(email, password, 'engineer');
        navigate('/dashboard');
      } catch (err) {
        setLoginError('Authentication failed. Please verify credentials.');
        setEngineerStep(1);
      } finally {
        setLoading(false);
      }
    } else {
      setPinError(true);
      setEngineerPin([]);
      // Flashes red & resets PIN pad, showing alert
      setTimeout(() => setPinError(false), 800);
    }
  };

  const handleAdminSuccess = () => {
    loginUser('admin@nexora.com', 'admin', 'admin');
    setShowAdminModal(false);
    navigate('/dashboard');
  };
  /* ── end preserved auth logic ── */

  const role = ROLES.find(r => r.key === selectedRole) || ROLES[0];

  return (
    <div className="auth-root">
      <NeuralCanvas />
      <div className="auth-vignette" />

      {/* Social Handshake Overlay */}
      <AnimatePresence>
        {socialLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="auth-handshake-overlay"
          >
            <div className="handshake-card">
              <div className="handshake-spinner" style={{ borderColor: role.color, borderTopColor: 'transparent' }} />
              <div className="handshake-text" style={{ color: role.color }}>Connecting Secure Gateway...</div>
              <div className="handshake-sub">Verifying {socialProvider} Identity Credentials</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="auth-stage">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="auth-card-glow" />
          <div className="auth-card-scroll">

            {/* Logo */}
            <Link to="/" className="auth-logo-row">
              <div className="auth-logo-hex">
                <svg viewBox="0 0 100 100" fill="none">
                  <path d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z"
                    stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="50" cy="50" r="10" fill="currentColor" />
                </svg>
              </div>
              <div className="auth-logo-text">
                <span className="auth-logo-name">NEXORA</span>
                <span className="auth-logo-tag">AI Operating System</span>
              </div>
            </Link>

            {/* Step 1: Normal Credentials layout */}
            {!(selectedRole === 'engineer' && engineerStep === 2) ? (
              <>
                {/* Heading */}
                <div className="auth-heading-block">
                  <h1 className="auth-heading">Select your role</h1>
                  <p className="auth-subheading">Choose how you want to sign in to NEXORA AI</p>
                </div>

                {/* Role selector */}
                <div className="auth-role-selector">
                  {ROLES.map(r => {
                    const Icon = r.icon;
                    const active = selectedRole === r.key;
                    return (
                      <motion.button
                        key={r.key}
                        type="button"
                        onClick={() => {
                          setSelectedRole(r.key);
                          setEngineerStep(1);
                          setLoginError('');
                        }}
                        className={`auth-role-card ${active ? 'active' : ''}`}
                        style={active ? {
                          background: r.gradient,
                          borderColor: r.border,
                          boxShadow: `0 0 20px ${r.glow}, 0 4px 16px rgba(0,0,0,0.4)`,
                        } : {}}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="auth-role-card-icon" style={active ? { color: r.color, filter: `drop-shadow(0 0 6px ${r.color})` } : {}}>
                          <Icon size={20} />
                        </div>
                        <span className="auth-role-card-label" style={active ? { color: r.color } : {}}>{r.label}</span>
                        <span className="auth-role-card-desc">{r.desc}</span>
                        {active && (
                          <motion.div
                            className="auth-role-active-dot"
                            style={{ background: r.color, boxShadow: `0 0 8px ${r.color}` }}
                            layoutId="role-dot"
                            transition={{ duration: 0.25, type: 'spring', stiffness: 300, damping: 25 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Divider with role label */}
                <div className="auth-role-divider">
                  <span>Sign in as</span>
                  <span className="auth-role-divider-label" style={{ color: role.color }}>{role.label}</span>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {loginError && (
                    <motion.div className="auth-error-banner"
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                      <FiAlertCircle size={13} /><span>{loginError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleFormSubmit} className="auth-form">
                  <AuthInput
                    label={selectedRole === 'engineer' ? 'Company Email' : 'Email Address'}
                    icon={FiMail}
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={selectedRole === 'engineer' ? 'name@nexora.com' : 'you@example.com'}
                    required
                  />

                  <div>
                    <PasswordInput label="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <div className="auth-row-between" style={{ marginTop: '7px' }}>
                      <label className="auth-remember">
                        <input type="checkbox" defaultChecked className="auth-checkbox" />
                        <span>Remember me</span>
                      </label>
                      {/* Only show Forgot Password inside the form for engineers */}
                      {selectedRole === 'engineer' && (
                        <a href="#forgot" className="auth-link-sm">Forgot password?</a>
                      )}
                    </div>
                  </div>

                  <motion.button type="submit"
                    className={`auth-submit-btn ${loading ? 'loading' : ''}`}
                    disabled={loading}
                    style={!loading ? {
                      background: `linear-gradient(135deg, #1d4ed8 0%, ${role.color} 100%)`,
                      boxShadow: `0 4px 20px ${role.glow}, 0 2px 6px rgba(0,0,0,0.3)`,
                    } : {}}
                    whileHover={{ scale: loading ? 1 : 1.015 }}
                    whileTap={{ scale: loading ? 1 : 0.985 }}>
                    {loading ? <span className="auth-spinner" /> : (
                      <>
                        <span>{selectedRole === 'engineer' ? 'Validate Credentials' : `Sign In as ${role.label}`}</span>
                        <FiChevronRight size={15} />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* User Social Options (placed below User form) */}
                {selectedRole === 'user' && (
                  <>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px', marginBottom: '8px' }}>
                      <a href="#forgot" className="auth-link-sm" style={{ fontSize: '11px' }}>Forgot Password?</a>
                    </div>
                  </>
                )}


              </>
            ) : (
              /* Step 2: Combination Keypad verification for Engineer */
              <AnimatePresence mode="wait">
                <ComboKeypad
                  pin={engineerPin}
                  setPin={setEngineerPin}
                  onVerify={handleEngineerPinVerify}
                  onBack={() => {
                    setEngineerStep(1);
                    setLoginError('');
                  }}
                  error={pinError}
                  color={role.color}
                />
              </AnimatePresence>
            )}

            {/* Footer */}
            <div className="auth-footer-links">
              {selectedRole === 'user' ? (
                <span className="auth-footer-text">
                  Don't have an account?{' '}
                  <Link to="/register" className="auth-link">Register</Link>
                </span>
              ) : (
                <span />
              )}
            </div>

          </div>
        </motion.div>
        <p className="auth-copyright">© 2026 Nexora Technologies — All rights reserved</p>
      </div>

      <AdminAccessModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onSuccess={handleAdminSuccess}
      />
    </div>
  );
}
