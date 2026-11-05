import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  motionEnabled: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ motionEnabled }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorMode, setCursorMode] = useState<'default' | 'link' | 'explore'>('default');

  useEffect(() => {
    if (!motionEnabled) return;

    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="explore"]')) {
        setCursorMode('explore');
      } else if (
        target.closest('[data-cursor="link"]') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setCursorMode('link');
      } else {
        setCursorMode('default');
      }
    };

    const updateCursor = () => {
      currentX += (mouseX - currentX) * 0.22;
      currentY += (mouseY - currentY) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [motionEnabled]);

  if (!motionEnabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor-layer hidden lg:flex fixed top-0 left-0 pointer-events-none z-[100000] items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] no-print ${
        cursorMode === 'explore'
          ? 'w-24 h-24 bg-[#e11d48] text-white border border-[#ff2a4b] shadow-[0_0_30px_rgba(225,29,72,0.5)]'
          : cursorMode === 'link'
          ? 'w-8 h-8 bg-transparent border-2 border-[#ff2a4b]'
          : 'w-2.5 h-2.5 bg-[#ff2a4b]'
      }`}
    >
      {cursorMode === 'explore' && (
        <span className="font-mono text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">
          EXPLORE ↗
        </span>
      )}
    </div>
  );
};
