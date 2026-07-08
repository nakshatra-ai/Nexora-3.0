import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../../app/providers/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiMail, FiCheck, FiX, FiShield, FiAlertCircle, FiSettings } from 'react-icons/fi';
import Modal from '../../shared/ui/Modal/Modal';

// Extensible list of allowed administrator emails
const ALLOWED_ADMINS = [
  'adminsawmiyaa@nexora.com',
  'admin@nexora.com' // kept for seamless backward compatibility/tests
];

export default function AdminAccessModal({ isOpen, onClose, onSuccess }) {
  const { setAdminPinValidated } = useContext(AppContext);
  
  // Auth flow steps: 'email' -> 'biometrics'
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  // Biometric states
  const [scanning, setScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('idle'); // 'idle' | 'scanning' | 'success' | 'failed'
  const [biometricsAvailable, setBiometricsAvailable] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [useFallback, setUseFallback] = useState(false);
  
  // Registration vs Login mode
  const [hasRegisteredKey, setHasRegisteredKey] = useState(false);

  // Fallback passcode PIN
  const [pin, setPin] = useState(['', '', '', '']);
  const [pinError, setPinError] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (isOpen) {
      setStep('email');
      setEmail('');
      setEmailError('');
      setScanStatus('idle');
      setScanning(false);
      setUseFallback(false);
      setPin(['', '', '', '']);
      setPinError(false);
      setErrorMsg('');
      setHasRegisteredKey(false);
      checkBiometricSupport();
    }
  }, [isOpen]);

  const checkBiometricSupport = async () => {
    try {
      if (window.PublicKeyCredential) {
        const available = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        setBiometricsAvailable(available);
      } else {
        setBiometricsAvailable(false);
      }
    } catch (e) {
      setBiometricsAvailable(false);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    const cleanEmail = email.trim().toLowerCase();
    if (ALLOWED_ADMINS.includes(cleanEmail)) {
      // Check if this email already registered a platform credential in this environment
      const savedCredId = localStorage.getItem(`nexora_cred_${cleanEmail}`);
      if (savedCredId) {
        setHasRegisteredKey(true);
      } else {
        setHasRegisteredKey(false);
      }
      
      setStep('biometrics');
      
      // Auto trigger verification/registration after transition
      setTimeout(() => {
        if (savedCredId) {
          authenticateWebAuthn(savedCredId);
        } else {
          // Setup required, don't auto-start WebAuthn so they can read the prompt and click the button
          setScanStatus('idle');
        }
      }, 500);
    } else {
      setEmailError('Access Denied: Unauthorized administrator profile.');
    }
  };

  // Real WebAuthn platform credential registration (Windows Hello / TouchID / FaceID)
  const registerWebAuthn = async () => {
    if (scanning) return;
    setScanning(true);
    setScanStatus('scanning');
    setErrorMsg('');

    if (!window.PublicKeyCredential) {
      setScanStatus('failed');
      setScanning(false);
      setErrorMsg('WebAuthn biometrics not supported on this browser/device.');
      setUseFallback(true);
      return;
    }

    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      
      const userId = new Uint8Array(16);
      window.crypto.getRandomValues(userId);

      const publicKeyCredentialCreationOptions = {
        challenge: challenge,
        rp: {
          name: "NEXORA AI",
          id: window.location.hostname
        },
        user: {
          id: userId,
          name: email.trim().toLowerCase(),
          displayName: "NEXORA Admin"
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }], // ES256
        authenticatorSelection: {
          authenticatorAttachment: "platform", // Enforce native device authenticators
          userVerification: "required"
        },
        timeout: 60000
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      });

      if (credential) {
        // Convert arrayBuffer rawId to base64 string for storage
        const rawId = btoa(String.fromCharCode.apply(null, new Uint8Array(credential.rawId)));
        localStorage.setItem(`nexora_cred_${email.trim().toLowerCase()}`, rawId);
        
        setScanStatus('success');
        setAdminPinValidated(true);
        setTimeout(() => {
          onSuccess();
        }, 1200);
      }
    } catch (err) {
      console.warn("Biometric registration cancelled or failed: ", err);
      setScanStatus('failed');
      if (err.name === 'NotAllowedError') {
        setErrorMsg('Setup cancelled by user.');
      } else {
        setErrorMsg('Biometric registration is not supported or failed on this device.');
      }
      setUseFallback(true);
    } finally {
      setScanning(false);
    }
  };

  // Real WebAuthn verification using the saved credential ID
  const authenticateWebAuthn = async (savedCredId) => {
    if (scanning) return;
    setScanning(true);
    setScanStatus('scanning');
    setErrorMsg('');

    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      // Convert Base64 back to Uint8Array rawId
      const rawId = new Uint8Array(atob(savedCredId).split("").map(c => c.charCodeAt(0)));

      const publicKeyCredentialRequestOptions = {
        challenge: challenge,
        allowCredentials: [{
          id: rawId,
          type: 'public-key'
        }],
        userVerification: "required",
        timeout: 60000
      };

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
      });

      if (assertion) {
        setScanStatus('success');
        setAdminPinValidated(true);
        setTimeout(() => {
          onSuccess();
        }, 1200);
      }
    } catch (err) {
      console.warn("Biometric verification cancelled or failed: ", err);
      setScanStatus('failed');
      if (err.name === 'NotAllowedError') {
        setErrorMsg('Verification cancelled by user.');
      } else {
        setErrorMsg('No registered biometric signature found or match failed.');
      }
      setUseFallback(true);
    } finally {
      setScanning(false);
    }
  };

  // Fallback PIN logic
  const handlePinChange = (index, value) => {
    if (isNaN(value)) return;
    setPinError(false);

    const newPin = [...pin];
    newPin[index] = value.substring(value.length - 1);
    setPin(newPin);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handlePinKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
      const newPin = [...pin];
      newPin[index - 1] = '';
      setPin(newPin);
    }
  };

  const handlePinVerify = () => {
    const fullPin = pin.join('');
    if (fullPin === '1234') {
      setAdminPinValidated(true);
      setPinError(false);
      onSuccess();
    } else {
      setPinError(true);
      setPin(['', '', '', '']);
      inputRefs[0].current?.focus();
      setTimeout(() => setPinError(false), 800);
    }
  };

  const isPinComplete = pin.every(val => val !== '');
  const savedCredId = localStorage.getItem(`nexora_cred_${email.trim().toLowerCase()}`);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="text-center relative overflow-hidden p-2 select-none">
        
        {/* Step 1: Admin Email verification */}
        {step === 'email' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-violet-600/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-6 shadow-[0_0_20px_rgba(167,139,250,0.15)]">
              <FiShield size={28} className="animate-pulse" />
            </div>

            <h2 className="text-2xl font-display font-bold text-white mb-2 tracking-wide">
              Secure Admin Console
            </h2>
            <p className="text-slate-400 text-xs mb-8">
              Verify your administrator account credentials
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">
                  Admin Email
                </label>
                <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 focus-within:border-violet-500/50 transition-all duration-200">
                  <FiMail className="text-slate-500 mr-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="adminsawmiyaa@nexora.com"
                    required
                    className="bg-transparent border-none outline-none text-sm text-slate-200 w-full"
                  />
                </div>
                {emailError && (
                  <span className="text-[10px] text-red-400 mt-2 block px-1 flex items-center gap-1">
                    <FiAlertCircle size={11} /> {emailError}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold tracking-wide text-[#050816] bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] transition-all duration-300 cursor-pointer"
              >
                Verify Administrator
              </button>
            </form>
          </motion.div>
        )}

        {/* Step 2: Biometric verification */}
        {step === 'biometrics' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-display font-bold text-white mb-2 tracking-wide">
              {hasRegisteredKey ? 'Biometric Authentication' : 'Biometric Setup Required'}
            </h2>
            <p className="text-slate-400 text-xs mb-8">
              {hasRegisteredKey 
                ? 'Verify identity using your device biometrics credential'
                : 'Register this laptop\'s secure biometrics (Windows Hello/Touch ID) to enable quick logins'
              }
            </p>

            <div className="flex flex-col items-center justify-center mb-8 relative">
              {/* Animated Fingerprint Sensor */}
              <div 
                onClick={hasRegisteredKey ? () => authenticateWebAuthn(savedCredId) : registerWebAuthn}
                className={`w-32 h-32 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-500 relative overflow-hidden ${
                  scanStatus === 'success' 
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_35px_rgba(16,185,129,0.35)]' 
                    : scanStatus === 'failed'
                    ? 'border-rose-500 bg-rose-500/10 shadow-[0_0_35px_rgba(244,63,94,0.3)]'
                    : scanStatus === 'scanning'
                    ? 'border-cyan-500 bg-cyan-500/5 shadow-[0_0_30px_rgba(6,182,212,0.25)]'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-600'
                }`}
              >
                {/* Scan Light Beam */}
                {scanStatus === 'scanning' && (
                  <motion.div
                    className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
                    animate={{ top: ['10%', '90%', '10%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                )}

                {/* Fingerprint Vector */}
                <svg
                  className={`w-16 h-16 transition-all duration-300 ${
                    scanStatus === 'success' 
                      ? 'text-emerald-400' 
                      : scanStatus === 'failed'
                      ? 'text-rose-400'
                      : scanStatus === 'scanning'
                      ? 'text-cyan-400 animate-pulse'
                      : 'text-slate-500'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeDasharray="3 3" />
                  <path d="M12 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
                  <path d="M8 10.3c0-2 .5-3 2-4" />
                  <path d="M12 16.5c-1.5 0-3-.5-3-1.5" />
                  <path d="M15 15c0 1-1.5 1.5-3 1.5" />
                  <path d="M16 10.5c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8" />
                </svg>

                {/* Success Check / Fail Cross */}
                {scanStatus === 'success' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center bg-emerald-500/90 text-white rounded-full">
                    <FiCheck size={48} className="stroke-[3]" />
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 w-full max-w-xs">
                {hasRegisteredKey ? (
                  <button
                    onClick={() => authenticateWebAuthn(savedCredId)}
                    className="w-full py-2.5 rounded-lg text-xs font-bold bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-850 hover:border-slate-700 transition-all cursor-pointer"
                  >
                    Authenticate with Biometrics
                  </button>
                ) : (
                  <button
                    onClick={registerWebAuthn}
                    className="w-full py-2.5 rounded-lg text-xs font-bold bg-violet-600 border border-violet-500 text-white hover:bg-violet-500 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(167,139,250,0.2)]"
                  >
                    <FiSettings size={13} />
                    <span>Register Laptop Biometrics</span>
                  </button>
                )}
              </div>

              {/* Status Message */}
              <div className="mt-4 text-xs font-semibold tracking-wider uppercase">
                {scanStatus === 'scanning' && <span className="text-cyan-400 animate-pulse">Communicating with device...</span>}
                {scanStatus === 'success' && <span className="text-emerald-400">Authenticated Successful</span>}
                {scanStatus === 'failed' && <span className="text-rose-400">Verification Rejected</span>}
                {scanStatus === 'idle' && (
                  <span className="text-slate-400">
                    {hasRegisteredKey ? 'Click scanner or button above' : 'Registration required'}
                  </span>
                )}
              </div>

              {errorMsg && (
                <div className="text-[10px] text-rose-400 mt-3 max-w-xs text-center font-medium bg-rose-950/20 border border-rose-500/10 px-3 py-1.5 rounded-lg">
                  {errorMsg}
                </div>
              )}
            </div>

            {/* Fallback Entry */}
            <AnimatePresence>
              {useFallback && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-900 pt-6 mt-4 text-left"
                >
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3 text-center">
                    Device Security Fallback Code
                  </label>
                  
                  <div className="flex justify-center gap-3 mb-6">
                    {pin.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={inputRefs[idx]}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handlePinChange(idx, e.target.value)}
                        onKeyDown={(e) => handlePinKeyDown(idx, e)}
                        className={`w-11 h-14 text-center text-xl font-bold bg-slate-950 rounded-xl border focus:outline-none transition-all duration-200 ${
                          pinError 
                            ? 'border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.25)]' 
                            : 'border-slate-800 text-white focus:border-violet-500 focus:shadow-[0_0_15px_rgba(167,139,250,0.25)]'
                        }`}
                        placeholder="•"
                      />
                    ))}
                  </div>

                  <button
                    disabled={!isPinComplete}
                    onClick={handlePinVerify}
                    className={`w-full py-3 rounded-xl font-semibold tracking-wide transition-all duration-300 ${
                      isPinComplete
                        ? 'bg-violet-500 text-white hover:bg-violet-400 cursor-pointer shadow-[0_0_15px_rgba(167,139,250,0.3)]'
                        : 'bg-slate-900 text-slate-500 border border-slate-850 cursor-not-allowed'
                    }`}
                  >
                    Verify Passcode
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {!useFallback && (
              <button
                onClick={() => setUseFallback(true)}
                className="text-[10px] text-violet-400 hover:text-violet-300 font-bold uppercase tracking-widest transition-colors cursor-pointer mt-4"
              >
                Use Passcode Fallback
              </button>
            )}
          </motion.div>
        )}
      </div>
    </Modal>
  );
}
