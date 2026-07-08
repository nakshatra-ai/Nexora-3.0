import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiWifi, FiDownload, FiUpload, FiActivity, FiRefreshCw } from 'react-icons/fi';
import Button from '../../shared/ui/Button/Button';

export default function WifiSpeedTest() {
  const [isTesting, setIsTesting] = useState(false);
  const [testStage, setTestStage] = useState('idle'); // 'idle', 'ping', 'download', 'upload', 'complete'
  
  const [ping, setPing] = useState(0);
  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);

  const startTest = () => {
    setIsTesting(true);
    setTestStage('ping');
    setPing(0);
    setDownload(0);
    setUpload(0);
  };

  useEffect(() => {
    if (!isTesting) return;

    let timeoutId;
    let intervalId;

    if (testStage === 'ping') {
      intervalId = setInterval(() => {
        setPing(prev => prev < 12 ? prev + Math.floor(Math.random() * 5) : 14 + Math.floor(Math.random() * 3));
      }, 100);
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        setPing(12); // Final ping value
        setTestStage('download');
      }, 1500);
    } 
    else if (testStage === 'download') {
      intervalId = setInterval(() => {
        setDownload(prev => {
          const next = prev + Math.floor(Math.random() * 45);
          return next > 300 ? 285 + Math.floor(Math.random() * 20) : next;
        });
      }, 100);
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        setDownload(295); // Final download value
        setTestStage('upload');
      }, 2500);
    }
    else if (testStage === 'upload') {
      intervalId = setInterval(() => {
        setUpload(prev => {
          const next = prev + Math.floor(Math.random() * 15);
          return next > 90 ? 85 + Math.floor(Math.random() * 10) : next;
        });
      }, 100);
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        setUpload(92); // Final upload value
        setTestStage('complete');
        setIsTesting(false);
      }, 2500);
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [isTesting, testStage]);

  return (
    <div className="bg-card-base border border-border-base rounded-2xl p-6 relative overflow-hidden font-sans shadow-xl shadow-black/20">
      {/* Background glow when testing */}
      <AnimatePresence>
        {isTesting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-accent-base/10 via-transparent to-transparent z-0"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 border-b border-border-base pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent-base/10 text-accent-base flex items-center justify-center">
              <FiWifi size={16} />
            </div>
            <h3 className="text-sm font-bold text-text-base uppercase tracking-wider">Network Speed Test</h3>
          </div>
          {!isTesting && testStage === 'complete' && (
            <button onClick={startTest} className="text-text-secondary-base hover:text-accent-base transition-colors flex items-center gap-1 text-xs">
              <FiRefreshCw size={12} /> Retest
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Ping */}
          <div className={`p-4 rounded-xl border ${testStage === 'ping' ? 'border-accent-base bg-accent-base/5' : 'border-border-base bg-surface-hover-base'} transition-colors flex flex-col items-center justify-center`}>
            <div className="flex items-center gap-1.5 text-text-muted-base mb-1">
              <FiActivity size={12} className={testStage === 'ping' ? 'text-accent-base animate-pulse' : ''} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Ping</span>
            </div>
            <div className="text-2xl font-display font-bold text-text-base">
              {ping} <span className="text-xs text-text-secondary-base font-medium">ms</span>
            </div>
          </div>

          {/* Download */}
          <div className={`p-4 rounded-xl border ${testStage === 'download' ? 'border-[#00e5ff] bg-[#00e5ff]/5' : 'border-border-base bg-surface-hover-base'} transition-colors flex flex-col items-center justify-center`}>
            <div className="flex items-center gap-1.5 text-text-muted-base mb-1">
              <FiDownload size={12} className={testStage === 'download' ? 'text-[#00e5ff] animate-bounce' : ''} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Download</span>
            </div>
            <div className="text-2xl font-display font-bold text-text-base">
              {download} <span className="text-xs text-text-secondary-base font-medium">Mbps</span>
            </div>
          </div>

          {/* Upload */}
          <div className={`p-4 rounded-xl border ${testStage === 'upload' ? 'border-[#10b981] bg-[#10b981]/5' : 'border-border-base bg-surface-hover-base'} transition-colors flex flex-col items-center justify-center`}>
            <div className="flex items-center gap-1.5 text-text-muted-base mb-1">
              <FiUpload size={12} className={testStage === 'upload' ? 'text-[#10b981] animate-bounce' : ''} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Upload</span>
            </div>
            <div className="text-2xl font-display font-bold text-text-base">
              {upload} <span className="text-xs text-text-secondary-base font-medium">Mbps</span>
            </div>
          </div>
        </div>

        {testStage === 'idle' && (
          <Button onClick={startTest} variant="accent" className="w-full py-3">
            Start Speed Test
          </Button>
        )}

        {isTesting && (
          <div className="w-full h-10 rounded-xl bg-surface-hover-base border border-border-base flex items-center justify-center overflow-hidden relative">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-accent-base/20"
              initial={{ width: "0%" }}
              animate={{ width: testStage === 'ping' ? "33%" : testStage === 'download' ? "66%" : "100%" }}
              transition={{ duration: 1 }}
            />
            <span className="relative z-10 text-xs font-semibold text-text-base animate-pulse">
              Testing {testStage}...
            </span>
          </div>
        )}

        {testStage === 'complete' && !isTesting && (
          <div className="w-full py-2.5 rounded-xl bg-success-base/10 border border-success-base/20 text-success-base flex items-center justify-center gap-2 text-xs font-bold shadow-lg shadow-success-base/10">
            <FiActivity size={14} /> Network is operating optimally!
          </div>
        )}
      </div>
    </div>
  );
}
