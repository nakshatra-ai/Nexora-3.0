import { useState, useEffect, useRef } from 'react';
import Card from '../../Card/Card';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { FiSend } from 'react-icons/fi';


export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Analyzing query parameters... [OK]. Welcome to Nexora Communications Gate. I am your AI Concierge. What operations request shall we process?' }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [chatInput, setChatInput] = useState('');


  // Audio tone generator
  const audioContextRef = useRef(null);
  const playClickSound = (pitch = 1000) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.04);
    } catch (e) {
      console.warn(e);
    }
  };

  // Robot Eye Tracking
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const robotRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!robotRef.current) return;
    const rect = robotRef.current.getBoundingClientRect();
    const rx = rect.left + rect.width / 2;
    const ry = rect.top + rect.height / 2;

    const dx = e.clientX - rx;
    const dy = e.clientY - ry;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Limit eye translation distance to 4px
    const limit = 4;
    const ratio = Math.min(1, limit / (dist || 1));
    setEyeOffset({ x: dx * ratio, y: dy * ratio });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSent(false);
    }, 2000);
  };

  // Upgraded Enterprise Knowledge Base Logic
  const getBotResponse = (input) => {
    const query = input.toLowerCase();
    
    if (query.includes('fiber') || query.includes('cable') || query.includes('broken') || query.includes('wire')) {
      return 'Initializing OTDR Line Attenuation Sweep... [DONE]. Cable fracture detected 2.4km from Sector-62 OLT. Dispatched engineering team lead Priya Singh. ETA: 14 mins.';
    } else if (query.includes('schedule') || query.includes('install') || query.includes('appointment')) {
      return 'Opening fiber route mapping... [OK]. Standard install lead time is 4 hours. Tap "Launch System" at the top to book a technician slot.';
    } else if (query.includes('billing') || query.includes('price') || query.includes('invoice') || query.includes('cost') || query.includes('refund')) {
      return 'Accessing billing database... [OK]. Invoices are dynamically computed against SLA uptime. Standard: ₹999/mo. Outages trigger auto-rebates.';
    } else if (query.includes('sim') || query.includes('esim') || query.includes('activation')) {
      return 'Accessing eSIM provisioning terminal... [OK]. Activate eSIM profiles instantly in the settings tab. Sync takes 45 seconds.';
    } else if (query.includes('about') || query.includes('company') || query.includes('nexora')) {
      return 'NEXORA AI is an autonomous, next-generation AI operating system for telecom infrastructure management. We specialize in auto-healing networks and smart ticket dispatches.';
    } else if (query.includes('services') || query.includes('modules')) {
      return 'We offer 13 core operational modules, including SIM services, predictive maintenance, router setup, autonomous dispatch, and SLA performance tracking. Tap the Services link above.';
    } else if (query.includes('team') || query.includes('personnel') || query.includes('sawmiyaa')) {
      return 'Our core architecture was designed by Sawmiyaa Alaguvel (Database & System Lead) and their engineering specialists. Navigate to the Personnel page to see cards.';
    } else if (query.includes('speed') || query.includes('diagnostics') || query.includes('ping')) {
      return 'Launch the "AI Network Speed Test" console on the Home Page to scan downlink/uplink rates, packet loss ratios, and signal strengths in real-time.';
    } else {
      return 'Telemetry query processed... [OK]. The NEXORA AI Operating System is fully synchronized. Ask me about our services, mission, diagnostics panel, or team members.';
    }
  };

  // Chat Responses logic
  const handleSuggestionClick = (suggestion) => {
    if (isThinking) return;
    playClickSound(800);
    setChatMessages(prev => [...prev, { sender: 'user', text: suggestion }]);
    setIsThinking(true);

    const reply = getBotResponse(suggestion);

    setTimeout(() => {
      setIsThinking(false);
      let charIdx = 0;
      setTypingText('');
      
      const typeInterval = setInterval(() => {
        if (charIdx >= reply.length) {
          clearInterval(typeInterval);
          setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
          setTypingText('');
          return;
        }
        
        setTypingText(prev => prev + reply[charIdx]);
        if (charIdx % 2 === 0) playClickSound(1000 + Math.random() * 200);
        charIdx++;
      }, 25);
    }, 1200);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isThinking) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    playClickSound(800);

    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setIsThinking(true);

    const reply = getBotResponse(userMsg);

    setTimeout(() => {
      setIsThinking(false);
      let charIdx = 0;
      setTypingText('');
      
      const typeInterval = setInterval(() => {
        if (charIdx >= reply.length) {
          clearInterval(typeInterval);
          setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
          setTypingText('');
          return;
        }
        
        setTypingText(prev => prev + reply[charIdx]);
        if (charIdx % 2 === 0) playClickSound(1000 + Math.random() * 200);
        charIdx++;
      }, 25);
    }, 1200);
  };

  const suggestions = [
    'Fiber link broken in Sector 62',
    'Schedule broadband installation',
    'Billing discrepancy / Refund check',
    'eSIM activation guidelines'
  ];

  return (
    <section id="contact" className="contact-bg py-24 px-6 md:px-12 select-none font-sans relative overflow-hidden bg-[#040816]/10">
      
      {/* HUD line separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Side: Premium Enquiry Form */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono">[ COMMS PORTAL ]</span>
              <h2 className="text-3xl font-display font-bold text-text-base">Submit Diagnostic Query</h2>
              <p className="text-xs text-text-muted-base leading-relaxed">
                Log diagnostic requests or query service level agreements (SLAs). Our administration core will respond within 4 hours.
              </p>
            </div>

            <Card className="bg-card-base/60 backdrop-blur-xl shadow-2xl border border-border-base relative overflow-hidden">
              {/* Corner brackets */}
              <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-cyan-500/20" />
              <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-cyan-500/20" />

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="OPERATOR NAME"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  required
                />
                <Input
                  label="SECURE EMAIL CHANNEL"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your secure email address"
                  required
                />
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-secondary-base">QUERY DETAILS</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide incident coordinates or detailed query..."
                    required
                    rows={4}
                    className="form-input resize-none w-full"
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full mt-2 font-bold uppercase tracking-wider text-xs shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                  {sent ? 'DISPATCHED SUCCESS' : 'SUBMIT QUERY'}
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Right Side: AI Concierge Center */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 font-mono">[ OPERATIONS CO-PILOT ]</span>
            <h2 className="text-3xl font-display font-bold text-text-base">AI Concierge Desk</h2>
            <p className="text-xs text-text-muted-base">Interact directly with the NEXORA core agent for immediate telemetry resolutions.</p>
          </div>

          <div className="bg-[#040816]/75 bg-dark-context border border-cyan-500/20 rounded-2xl p-6 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
            
            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40" />

            {/* AI Robot HUD Graphic & Header */}
            <div className="flex items-center gap-6 border-b border-border-color/30 pb-4">
              
              {/* Layered Cyber Robot SVG */}
              <div 
                ref={robotRef}
                className="relative w-20 h-20 bg-cyan-950/20 border border-cyan-500/30 rounded-xl flex items-center justify-center overflow-hidden shadow-[inset_0_0_12px_rgba(0,229,255,0.2)]"
              >
                {/* Robot floating rings */}
                <div className="absolute inset-2 border border-dashed border-cyan-500/10 rounded-full animate-[spin_8s_linear_infinite]" />
                
                {/* Layered Robot Body (Breathes via CSS) */}
                <svg className="w-12 h-12 text-cyan-400 animate-[bounce_3s_infinite_alternate_ease-in-out]" viewBox="0 0 100 100" fill="none">
                  {/* Floating Antenna / Ears */}
                  <line x1="30" y1="20" x2="30" y2="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <line x1="70" y1="20" x2="70" y2="40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="30" cy="20" r="3" fill="currentColor" />
                  <circle cx="70" cy="20" r="3" fill="currentColor" />

                  {/* Helmet/Head */}
                  <rect x="20" y="30" width="60" height="42" rx="12" fill="#0c1631" stroke="currentColor" strokeWidth="4" />
                  
                  {/* Glass visor face */}
                  <rect x="28" y="38" width="44" height="24" rx="6" fill="#040816" stroke="currentColor" strokeWidth="2" />
                  
                  {/* Eye slots with tracking offsets */}
                  <g style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}>
                    <circle cx="42" cy="50" r="3.5" fill="#00e5ff" className={isThinking ? 'animate-ping' : ''} />
                    <circle cx="58" cy="50" r="3.5" fill="#00e5ff" className={isThinking ? 'animate-ping' : ''} />
                  </g>

                  {/* Neck joint */}
                  <rect x="44" y="72" width="12" height="8" rx="2" fill="currentColor" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-wider">CONCIERGE AGENT</span>
                <h4 className="text-sm font-display font-black text-text-base uppercase tracking-widest leading-none mt-0.5">NEXORA_COPILOT_5.0</h4>
                
                {/* Voice frequency wave */}
                <div className="flex items-center gap-1 mt-2 h-4">
                  <span className={`w-0.5 h-3 bg-cyan-400 rounded transition-all ${isThinking || typingText ? 'animate-[pulse_0.4s_infinite]' : 'h-1'}`} />
                  <span className={`w-0.5 h-4 bg-cyan-400 rounded transition-all ${isThinking || typingText ? 'animate-[pulse_0.6s_infinite_0.1s]' : 'h-1'}`} style={{ animationDelay: '0.1s' }} />
                  <span className={`w-0.5 h-2.5 bg-cyan-400 rounded transition-all ${isThinking || typingText ? 'animate-[pulse_0.3s_infinite_0.2s]' : 'h-1'}`} style={{ animationDelay: '0.2s' }} />
                  <span className={`w-0.5 h-3.5 bg-cyan-400 rounded transition-all ${isThinking || typingText ? 'animate-[pulse_0.5s_infinite_0.3s]' : 'h-1'}`} style={{ animationDelay: '0.3s' }} />
                  <span className={`w-0.5 h-1 bg-cyan-400 rounded`} />
                </div>
              </div>
            </div>

            {/* Dialogue stream box */}
            <div className="flex-1 overflow-y-auto max-h-[220px] py-4 space-y-3 font-mono text-[10px] scrollbar-none flex flex-col justify-end">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse text-right' : 'self-start text-left'}`}
                >
                  <span className={`text-[9px] font-bold ${msg.sender === 'user' ? 'text-primary-base' : 'text-cyan-400'}`}>
                    {msg.sender === 'user' ? '[USR]' : '[BOT]'}
                  </span>
                  <div className={`p-2.5 rounded-xl border ${
                    msg.sender === 'user'
                      ? 'bg-primary-light-base/10 border-primary-base/30 text-text-base'
                      : 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typewriter text bubble */}
              {typingText && (
                <div className="flex gap-2 max-w-[85%] self-start text-left">
                  <span className="text-[9px] font-bold text-cyan-400">[BOT]</span>
                  <div className="p-2.5 rounded-xl border bg-cyan-500/5 border-cyan-500/20 text-cyan-400">
                    {typingText}
                    <span className="w-1 h-3 bg-cyan-400 inline-block ml-0.5 animate-pulse" />
                  </div>
                </div>
              )}

              {/* Thinking loader */}
              {isThinking && (
                <div className="flex gap-2 self-start items-center">
                  <span className="text-[9px] font-bold text-cyan-400">[BOT]</span>
                  <div className="flex gap-1 bg-cyan-500/5 border border-cyan-500/10 px-3 py-2 rounded-xl text-[8px] text-cyan-500/60 font-bold uppercase tracking-wider animate-pulse">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions stack */}
            <div className="border-t border-border-color/30 pt-4 flex flex-col gap-2">
              <span className="font-mono text-[8px] text-text-muted-base tracking-wider uppercase mb-1">SELECT DIAGNOSTIC COMMAND SUGGESTION:</span>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(sug)}
                    className="px-3 py-1.5 bg-card-base/40 border border-border-base rounded-full font-mono text-[9px] text-text-secondary-base hover:text-cyan-400 hover:border-cyan-400 cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Query Chat Input Form */}
            <form onSubmit={handleChatSubmit} className="flex gap-2 border-t border-border-color/30 pt-4 mt-2">
              <input 
                type="text" 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
                placeholder="Ask active robot concierge a question..."
                className="flex-1 bg-black/40 border border-border-base rounded-xl px-3 py-2 text-[10px] text-cyan-400 outline-none focus:border-cyan-400 transition-all font-mono"
              />
              <button 
                type="submit" 
                className="px-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition-all text-[10px] uppercase font-bold flex items-center justify-center gap-1 cursor-pointer"
              >
                <FiSend size={10} />
                <span>Send</span>
              </button>
            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
