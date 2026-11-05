import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const STATUS_MESSAGES = [
  'INITIALIZING VIXA PROTOCOL...',
  'LOADING RIFAT ASHHAB ARCHIVE...',
  'COMPILING 20+ DIGITAL REALITIES...',
  'SYSTEM ONLINE.'
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = window.setInterval(() => {
      current += Math.floor(Math.random() * 16) + 9;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStatusIndex(3);
        window.clearInterval(interval);

        window.setTimeout(() => {
          setExiting(true);
          window.setTimeout(() => {
            onComplete();
          }, 350);
          window.setTimeout(() => {
            setHidden(true);
          }, 1100);
        }, 280);
      } else {
        setProgress(current);
        if (current > 65) {
          setStatusIndex(2);
        } else if (current > 30) {
          setStatusIndex(1);
        }
      }
    }, 65);

    return () => window.clearInterval(interval);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      id="preloader"
      className={`fixed inset-0 z-[99999] flex flex-col justify-between bg-[#08080a] text-[#f4f4f6] px-6 py-8 md:px-12 md:py-10 border-b border-white/10 transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] no-print ${
        exiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs tracking-widest text-[#8a8a93]">
        <span>RIFAT ASHHAB® · EXECUTIVE ARCHIVE</span>
        <span className="text-[#e11d48]">VIXA CORP // 2026</span>
      </div>

      {/* Center Monumental Counter */}
      <div className="my-auto flex flex-col items-center justify-center text-center">
        <div className="overflow-hidden">
          <div
            className="font-display text-[6.5rem] sm:text-[10rem] md:text-[14rem] leading-none tracking-tight text-[#f4f4f6] tabular-nums select-none"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {progress.toString().padStart(2, '0')}
            <span className="text-[#e11d48]">%</span>
          </div>
        </div>

        {/* Status Message */}
        <div className="mt-3 h-6 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase">
          <span className={statusIndex === 3 ? 'text-[#ff2a4b] font-semibold' : 'text-[#8a8a93]'}>
            {STATUS_MESSAGES[statusIndex]}
          </span>
        </div>

        {/* Crimson Progress Bar */}
        <div className="mt-6 w-64 sm:w-80 h-[2px] bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[#e11d48] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Footnote */}
      <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-[#8a8a93] uppercase tracking-widest">
        <span>CRIMSON NOIR EDITION</span>
        <button
          type="button"
          onClick={() => {
            setExiting(true);
            onComplete();
            window.setTimeout(() => setHidden(true), 800);
          }}
          className="hover:text-white transition-colors underline underline-offset-4"
        >
          SKIP SEQUENCE ↗
        </button>
      </div>
    </div>
  );
};
