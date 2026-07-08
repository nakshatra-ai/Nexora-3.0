import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../app/providers/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import {
  FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff,
  FiAlertCircle, FiChevronRight, FiBriefcase, FiUsers, FiAtSign, FiCheckCircle
} from 'react-icons/fi';
import './Register.css';

/* ─── Neural canvas (inline) ──────────────────────────────────────────────── */
function NeuralCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); let W, H;
    const nodes = Array.from({ length: 55 }, () => ({ x: Math.random() * 1400, y: Math.random() * 900, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, size: Math.random() * 1.8 + 0.4, opacity: Math.random() * 0.5 + 0.1, pulse: Math.random() * Math.PI * 2 }));
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize); let t = 0;
    const render = () => {
      t += 0.008; ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#010a1a'); bg.addColorStop(0.5, '#000d1f'); bg.addColorStop(1, '#020812'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      ctx.save(); ctx.strokeStyle = 'rgba(0,100,220,0.03)'; ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 55) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 55) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.restore();
      [{ cx: W * 0.15, cy: H * 0.2, r: 280, c: 'rgba(37,99,235,0.07)' }, { cx: W * 0.85, cy: H * 0.75, r: 240, c: 'rgba(0,180,255,0.06)' }, { cx: W * 0.5, cy: H * 0.5, r: 200, c: 'rgba(100,0,255,0.04)' }].forEach(b => { const ox = Math.sin(t * 0.3) * 25, oy = Math.cos(t * 0.25) * 20; const g = ctx.createRadialGradient(b.cx + ox, b.cy + oy, 0, b.cx + ox, b.cy + oy, b.r); g.addColorStop(0, b.c); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.cx + ox, b.cy + oy, b.r, 0, Math.PI * 2); ctx.fill(); });
      for (let i = 0; i < nodes.length; i++) { const n = nodes[i]; n.x += n.vx; n.y += n.vy; n.pulse += 0.04; if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1; for (let j = i + 1; j < nodes.length; j++) { const m = nodes[j], dx = n.x - m.x, dy = n.y - m.y, d = Math.sqrt(dx * dx + dy * dy); if (d < 130) { ctx.save(); ctx.strokeStyle = `rgba(0,150,255,${(1 - d / 130) * 0.12})`; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke(); ctx.restore(); } } const p = 0.5 + 0.5 * Math.sin(n.pulse); ctx.save(); ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 6 * p; ctx.fillStyle = `rgba(0,200,255,${n.opacity * p})`; ctx.beginPath(); ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
      const bX = W * 0.5 + Math.sin(t * 0.2) * W * 0.3; const bG = ctx.createLinearGradient(bX - 2, 0, bX + 2, H); bG.addColorStop(0, 'rgba(0,180,255,0)'); bG.addColorStop(0.4, 'rgba(0,180,255,0.04)'); bG.addColorStop(0.6, 'rgba(0,180,255,0.04)'); bG.addColorStop(1, 'rgba(0,180,255,0)'); ctx.fillStyle = bG; ctx.fillRect(bX - 80, 0, 160, H);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafRef.current); };
  }, []);
  return <canvas ref={canvasRef} className="auth-neural-canvas" />;
}

/* ─── Input field ─────────────────────────────────────────────────────────── */
function AuthInput({ label, icon: Icon, type = 'text', value, onChange, placeholder, required, rightSlot, hint }) {
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
      {hint && <span className="auth-field-hint">{hint}</span>}
    </div>
  );
}

function PasswordInput({ label, value, onChange, required, strength }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <AuthInput label={label} icon={FiLock} type={show ? 'text' : 'password'} value={value}
        onChange={onChange} placeholder="••••••••" required={required}
        rightSlot={
          <button type="button" className="auth-eye-btn" onClick={() => setShow(s => !s)} tabIndex={-1}>
            {show ? <FiEyeOff size={13} /> : <FiEye size={13} />}
          </button>
        }
      />
      {strength !== undefined && (
        <div className="auth-pw-strength">
          {[1, 2, 3, 4].map(lvl => (
            <div key={lvl} className={`auth-pw-bar ${strength >= lvl ? `lvl-${Math.min(strength, 4)}` : ''}`} />
          ))}
          <span className="auth-pw-label">
            {strength === 0 ? '' : strength === 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'}
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── Password strength calculator ───────────────────────────────────────── */
function calcStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

/* ─── Main Register component ─────────────────────────────────────────────── */
export default function Register() {
  /* ── preserved auth logic ── */
  const { setCurrentUser } = useContext(AppContext);
  const [role, setRole]                   = useState('Customer');
  const [fullName, setFullName]           = useState('');
  const [email, setEmail]                 = useState('');
  const [phone, setPhone]                 = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [regError, setRegError]           = useState('');
  const [loading, setLoading]             = useState(false);
  const [success, setSuccess]             = useState(false);
  const navigate = useNavigate();

  const pwStrength = calcStrength(password);

  const validate = () => {
    if (!fullName.trim()) return 'Full name is required.';
    if (!email.trim()) return 'Email is required.';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email address.';
    if (!phone.trim()) return 'Phone number is required.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError('');
    const err = validate();
    if (err) { setRegError(err); return; }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/admin/auth/register/', {
        full_name: fullName,
        email,
        phone_number: phone,
        password,
        role
      });
      setSuccess(true);
      await new Promise(r => setTimeout(r, 800));
      setCurrentUser(response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setRegError(err.response?.data?.error || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };
  /* ── end preserved auth logic ── */

  return (
    <div className="auth-root">
      <NeuralCanvas />
      <div className="auth-vignette" />

      <div className="auth-stage">
        <motion.div
          className="auth-card auth-card-register"
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

            {/* Heading */}
            <div className="auth-heading-block">
              <h1 className="auth-heading">Create your account</h1>
              <p className="auth-subheading">Join the NEXORA AI platform in seconds</p>
            </div>

            {/* Error */}
            <AnimatePresence>
              {regError && (
                <motion.div className="auth-error-banner"
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <FiAlertCircle size={13} /><span>{regError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success flash */}
            <AnimatePresence>
              {success && (
                <motion.div className="auth-success-banner"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <FiCheckCircle size={14} /><span>Account created! Redirecting…</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleRegister} className="auth-form">

              {/* Names row */}
              <div className="auth-two-col">
                <AuthInput label="Full Name" icon={FiUser} value={fullName}
                  onChange={e => setFullName(e.target.value)} placeholder="John Doe" required />
                <AuthInput label="Email Address" icon={FiMail} type="email" value={email}
                  onChange={e => setEmail(e.target.value)} placeholder="john@example.com" required />
              </div>

              <AuthInput label="Phone Number" icon={FiPhone} value={phone}
                onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" required />



              {/* Passwords */}
              <div className="auth-two-col">
                <PasswordInput label="Password" value={password}
                  onChange={e => setPassword(e.target.value)} required strength={pwStrength} />
                <PasswordInput label="Confirm Password" value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)} required />
              </div>

              <motion.button type="submit"
                className={`auth-submit-btn ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
                disabled={loading || success}
                whileHover={{ scale: loading ? 1 : 1.015 }}
                whileTap={{ scale: loading ? 1 : 0.985 }}>
                {loading ? <span className="auth-spinner" /> : success ? (
                  <><FiCheckCircle size={15} /><span>Account Created!</span></>
                ) : (
                  <><span>Create Account</span><FiChevronRight size={15} /></>
                )}
              </motion.button>
            </form>



            {/* Footer */}
            <div className="auth-footer-links auth-footer-center">
              <span className="auth-footer-text">
                Already have an account?{' '}
                <Link to="/login" className="auth-link">Sign In</Link>
              </span>
            </div>

          </div>
        </motion.div>
        <p className="auth-copyright">© 2026 Nexora Technologies — All rights reserved</p>
      </div>
    </div>
  );
}
