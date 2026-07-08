const fs = require('fs');
const filepath = 'frontend/src/pages/Splash/Splash.jsx';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Add showLogo state
content = content.replace(
  'const [glitchTriggered, setGlitchTriggered] = useState(false);',
  'const [glitchTriggered, setGlitchTriggered] = useState(false);\n  const [showLogo, setShowLogo] = useState(false);'
);

// 2. Change logic inside processNextLog
content = content.replace(
  '          setGlitchTriggered(true);\n          setTimeout(() => {\n            if (onComplete) onComplete();\n          }, 600); // Wait for glitch animation',
  '          setGlitchTriggered(true);\n          setTimeout(() => {\n            setShowLogo(true);\n            setTimeout(() => {\n              if (onComplete) onComplete();\n            }, 2500);\n          }, 600);'
);

// 3. Update JSX container
content = content.replace(
  '<div className={ixed inset-0 bg-[#020308] bg-dark-context flex items-center justify-center font-mono overflow-hidden transition-all duration-300 z-50 select-none }>',
  '<div className={ixed inset-0 bg-[#020308] bg-dark-context flex items-center justify-center font-mono overflow-hidden transition-all duration-300 z-50 select-none}>\n      <div className={bsolute inset-0 flex items-center justify-center transition-all duration-300 }>'
);

// 4. Add closing div for the new wrapper and the showLogo block
content = content.replace(
  '      )}\n    </div>',
  '      )}\n      </div>\n      <AnimatePresence>\n        {showLogo && (\n          <motion.div\n            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}\n            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}\n            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}\n            transition={{ duration: 0.8, ease: "easeOut" }}\n            className="absolute inset-0 flex flex-col items-center justify-center z-[100] bg-[#020308]"\n          >\n            <div className="relative flex flex-col items-center">\n              <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full" />\n              <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 tracking-tighter z-10 relative">\n                 NEXORA\n              </h1>\n              <h2 className="text-2xl md:text-3xl font-light text-cyan-300 tracking-[0.5em] mt-2 ml-4 z-10 relative">\n                 AI\n              </h2>\n            </div>\n          </motion.div>\n        )}\n      </AnimatePresence>\n    </div>'
);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Updated Splash.jsx');
