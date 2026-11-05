import React, { useEffect, useRef, useState } from 'react';
import { soundEngine } from '../utils/soundEngine';

interface PreloaderProps {
  hasStarted: boolean;
  buildProgress: number; // 0 to 1 over ~6.2 seconds
  onStartBuild: () => void;
  onSkip: () => void;
}

type CursorMode = 'pointer' | 'ibeam' | 'crosshair' | 'grab';

interface AgentKeyframe {
  t: number; // 0 to 1
  x: number; // vw %
  y: number; // vh %
  cx?: number; // Quadratic Bezier control point X for human curved arc
  cy?: number; // Quadratic Bezier control point Y for human curved arc
  mode?: CursorMode;
  pressed?: boolean;
  clicking?: boolean;
  label?: string;
  badgeTone?: 'default' | 'error' | 'fixed';
}

interface AgentConfig {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  orbitIndex: number; // 0 to 4 for 72-degree circular duplication
  keyframes: AgentKeyframe[];
}

// Smooth cubic ease-in-out for natural, unhurried movement (strictly clamped to [0, 1])
function humanEase(t: number): number {
  if (!Number.isFinite(t)) return 0;
  const c = Math.min(1, Math.max(0, t));
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

// Timeline phase boundaries:
// 0.00 -> 0.08: "RIFAT." text smoothly morphs into the Master Cursor at (50%, 50%)
// 0.08 -> 0.125: Master Cursor loads a progress ring & clicks to duplicate
// 0.125 -> 0.21: Master Cursor duplicates into 5 AI Agent Cursors gliding in a smooth circular motion
// 0.21 -> 1.00: 5 AI Agent Cursors smoothly build the Hero section
const MORPH_END_T = 0.08;
const DUPLICATE_START_T = 0.125;
const ORBIT_END_T = 0.21;

const AGENTS: AgentConfig[] = [
  {
    id: 'arch',
    name: 'Arch_Agent',
    color: '#ff2a4b',
    bgColor: 'rgba(225, 29, 72, 0.94)',
    borderColor: '#ff6b81',
    orbitIndex: 0,
    keyframes: [
      { t: ORBIT_END_T, x: 50, y: 42, mode: 'pointer', label: 'Ready' },
      {
        t: 0.24,
        x: 4,
        y: 3.5,
        cx: 28,
        cy: 18,
        mode: 'crosshair',
        pressed: true,
        label: 'Drag <header> Frame'
      },
      {
        t: 0.31,
        x: 94,
        y: 5.5,
        cx: 50,
        cy: 2.5,
        mode: 'crosshair',
        pressed: true,
        label: '1440px × 64px'
      },
      {
        t: 0.34,
        x: 8,
        y: 14,
        cx: 45,
        cy: 8,
        mode: 'crosshair',
        clicking: true,
        label: 'Frame Backdrop'
      },
      {
        t: 0.52,
        x: 91,
        y: 33,
        cx: 52,
        cy: 26,
        mode: 'crosshair',
        pressed: true,
        label: 'Sizing PORTFOLIO (21.8vw)'
      },
      {
        t: 0.58,
        x: 54,
        y: 23,
        cx: 74,
        cy: 29,
        mode: 'pointer',
        clicking: true,
        label: 'Apply Crimson Gradient',
        badgeTone: 'fixed'
      },
      {
        t: 0.67,
        x: 6,
        y: 94,
        cx: 22,
        cy: 62,
        mode: 'crosshair',
        pressed: true,
        label: 'Draw Bottom Bar'
      },
      {
        t: 0.8,
        x: 92,
        y: 95,
        cx: 50,
        cy: 93,
        mode: 'crosshair',
        pressed: true,
        label: 'Lock Footer Border'
      },
      {
        t: 0.92,
        x: 88,
        y: 90,
        cx: 90,
        cy: 92,
        mode: 'pointer',
        label: '✓ Done',
        badgeTone: 'fixed'
      },
      { t: 1.0, x: 96, y: 108, cx: 92, cy: 100, mode: 'pointer', label: '✓ Done' }
    ]
  },
  {
    id: 'type',
    name: 'Type_Agent',
    color: '#38bdf8',
    bgColor: 'rgba(14, 165, 233, 0.94)',
    borderColor: '#7dd3fc',
    orbitIndex: 1,
    keyframes: [
      { t: ORBIT_END_T, x: 57, y: 47, mode: 'pointer', label: 'Ready' },
      {
        t: 0.22,
        x: 7,
        y: 41,
        cx: 28,
        cy: 46,
        mode: 'ibeam',
        clicking: true,
        label: 'Focus Text'
      },
      {
        t: 0.28,
        x: 15.5,
        y: 41,
        mode: 'ibeam',
        label: 'Typing "Hello, I\'m"'
      },
      {
        t: 0.3,
        x: 7,
        y: 50,
        cx: 10,
        cy: 46,
        mode: 'ibeam',
        clicking: true,
        label: 'Type <h1>'
      },
      {
        t: 0.38,
        x: 20.5,
        y: 50,
        mode: 'ibeam',
        label: 'Typed "RIFTA."',
        badgeTone: 'error'
      },
      {
        t: 0.41,
        x: 20.5,
        y: 50,
        mode: 'ibeam',
        clicking: true,
        label: '⚠ Oops, typo!',
        badgeTone: 'error'
      },
      {
        t: 0.46,
        x: 13.5,
        y: 50,
        mode: 'ibeam',
        pressed: true,
        label: '⌫ Backspace "TA."',
        badgeTone: 'error'
      },
      {
        t: 0.51,
        x: 19.5,
        y: 50,
        mode: 'ibeam',
        label: '✓ Fixed "RIFAT."',
        badgeTone: 'fixed'
      },
      {
        t: 0.52,
        x: 7,
        y: 56,
        cx: 12,
        cy: 53,
        mode: 'ibeam',
        label: 'Sub-heading'
      },
      {
        t: 0.57,
        x: 18.5,
        y: 56,
        mode: 'ibeam',
        label: 'ASHHAB BIN SHARIF'
      },
      {
        t: 0.58,
        x: 7,
        y: 61,
        cx: 12,
        cy: 59,
        mode: 'ibeam',
        label: 'Role Title'
      },
      {
        t: 0.65,
        x: 22.5,
        y: 61,
        mode: 'ibeam',
        label: '⚠ "ENGINER"',
        badgeTone: 'error'
      },
      {
        t: 0.69,
        x: 19.5,
        y: 61,
        mode: 'ibeam',
        pressed: true,
        label: '⌫ Fix "ENGINEER"',
        badgeTone: 'error'
      },
      {
        t: 0.76,
        x: 17,
        y: 64,
        cx: 14,
        cy: 63,
        mode: 'ibeam',
        label: '✓ "& AI ARCHITECT"',
        badgeTone: 'fixed'
      },
      {
        t: 0.78,
        x: 7,
        y: 70,
        cx: 11,
        cy: 67,
        mode: 'ibeam',
        label: 'Writing Bio...'
      },
      {
        t: 0.89,
        x: 25,
        y: 73,
        cx: 16,
        cy: 72,
        mode: 'ibeam',
        label: '✓ Bio Complete',
        badgeTone: 'fixed'
      },
      { t: 1.0, x: -10, y: 68, cx: 4, cy: 70, mode: 'pointer', label: '✓ Done' }
    ]
  },
  {
    id: 'vision',
    name: 'Vision_Agent',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.94)',
    borderColor: '#6ee7b7',
    orbitIndex: 2,
    keyframes: [
      { t: ORBIT_END_T, x: 54, y: 56, mode: 'pointer', label: 'Ready' },
      {
        t: 0.28,
        x: 62,
        y: 66,
        cx: 59,
        cy: 58,
        mode: 'grab',
        clicking: true,
        pressed: true,
        label: 'Grab Portrait.png'
      },
      {
        t: 0.5,
        x: 50,
        y: 56,
        cx: 56,
        cy: 62,
        mode: 'grab',
        pressed: true,
        label: 'Dragging to Center...'
      },
      {
        t: 0.56,
        x: 50,
        y: 54,
        mode: 'pointer',
        label: '⚠ Behind Text (z: 5)',
        badgeTone: 'error'
      },
      {
        t: 0.62,
        x: 53,
        y: 36,
        cx: 48,
        cy: 44,
        mode: 'pointer',
        clicking: true,
        pressed: true,
        label: 'Click [Bring to Front ↑]',
        badgeTone: 'fixed'
      },
      {
        t: 0.74,
        x: 47,
        y: 44,
        cx: 51,
        cy: 40,
        mode: 'pointer',
        clicking: true,
        label: 'Enable Rim Lighting',
        badgeTone: 'fixed'
      },
      {
        t: 0.9,
        x: 50,
        y: 48,
        cx: 49,
        cy: 46,
        mode: 'pointer',
        label: '✓ Layer Locked',
        badgeTone: 'fixed'
      },
      { t: 1.0, x: 50, y: -12, cx: 50, cy: 18, mode: 'pointer', label: '✓ Done' }
    ]
  },
  {
    id: 'ui',
    name: 'UI_Agent',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.94)',
    borderColor: '#fcd34d',
    orbitIndex: 3,
    keyframes: [
      { t: ORBIT_END_T, x: 46, y: 56, mode: 'pointer', label: 'Ready' },
      {
        t: 0.38,
        x: 7,
        y: 78,
        cx: 28,
        cy: 74,
        mode: 'crosshair',
        clicking: true,
        pressed: true,
        label: 'Draw Button Box'
      },
      {
        t: 0.5,
        x: 17.5,
        y: 83,
        cx: 12,
        cy: 81,
        mode: 'crosshair',
        pressed: true,
        label: '168px × 48px'
      },
      {
        t: 0.56,
        x: 12,
        y: 80.5,
        cx: 15,
        cy: 82,
        mode: 'pointer',
        clicking: true,
        label: 'Apply #e11d48 Fill',
        badgeTone: 'fixed'
      },
      {
        t: 0.64,
        x: 19,
        y: 78,
        cx: 16,
        cy: 77,
        mode: 'crosshair',
        pressed: true,
        label: 'Draw CV Button'
      },
      {
        t: 0.75,
        x: 28.5,
        y: 83,
        cx: 24,
        cy: 81,
        mode: 'crosshair',
        pressed: true,
        label: 'Link Rifat_CV.pdf'
      },
      {
        t: 0.85,
        x: 14,
        y: 87,
        cx: 21,
        cy: 86,
        mode: 'pointer',
        clicking: true,
        label: 'Pin Subang Jaya, MY',
        badgeTone: 'fixed'
      },
      { t: 1.0, x: -10, y: 90, cx: 2, cy: 89, mode: 'pointer', label: '✓ Done' }
    ]
  },
  {
    id: 'metrics',
    name: 'Data_Agent',
    color: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.94)',
    borderColor: '#d8b4fe',
    orbitIndex: 4,
    keyframes: [
      { t: ORBIT_END_T, x: 43, y: 47, mode: 'pointer', label: 'Ready' },
      {
        t: 0.28,
        x: 70,
        y: 45,
        cx: 62,
        cy: 42,
        mode: 'pointer',
        clicking: true,
        label: 'Place ✳ Purpose Badge'
      },
      {
        t: 0.4,
        x: 70,
        y: 54,
        cx: 70,
        cy: 50,
        mode: 'crosshair',
        pressed: true,
        label: 'Draw Metric Row 01'
      },
      {
        t: 0.54,
        x: 91,
        y: 59,
        cx: 80,
        cy: 57,
        mode: 'ibeam',
        label: 'Count +40% Inbound ROI',
        badgeTone: 'fixed'
      },
      {
        t: 0.56,
        x: 70,
        y: 65,
        cx: 80,
        cy: 62,
        mode: 'crosshair',
        pressed: true,
        label: 'Draw Metric Row 02'
      },
      {
        t: 0.7,
        x: 91,
        y: 70,
        cx: 80,
        cy: 68,
        mode: 'ibeam',
        label: 'Count 95/100 Level 6 AI',
        badgeTone: 'fixed'
      },
      {
        t: 0.72,
        x: 70,
        y: 76,
        cx: 80,
        cy: 73,
        mode: 'crosshair',
        pressed: true,
        label: 'Draw Metric Row 03'
      },
      {
        t: 0.86,
        x: 91,
        y: 81,
        cx: 80,
        cy: 79,
        mode: 'pointer',
        clicking: true,
        label: '✓ 20+ Deployments',
        badgeTone: 'fixed'
      },
      { t: 1.0, x: 110, y: 78, cx: 100, cy: 80, mode: 'pointer', label: '✓ Done' }
    ]
  }
];

function getDuplicationOrbitState(orbitIndex: number, progress: number) {
  // Normalize DUPLICATE_START_T (0.125) -> ORBIT_END_T (0.21) into 0 -> 1
  const span = ORBIT_END_T - DUPLICATE_START_T;
  const norm = Math.min(1, Math.max(0, (progress - DUPLICATE_START_T) / span));
  const eased = humanEase(norm);

  // Each of the 5 cursors duplicates out from the center (50%, 50%) at 72-degree intervals and glides in a smooth circular arc
  const baseAngle = (orbitIndex * 2 * Math.PI) / 5 - Math.PI / 2;
  const spinAngle = baseAngle + eased * Math.PI * 2.15;

  // Radius expands smoothly from 0 (exact center where Master Cursor duplicated) out to ~7.5vw
  const radiusScale = Math.sin(norm * Math.PI * 0.75);
  const radiusX = radiusScale * 7.2;
  const radiusY = radiusScale * 9.0;

  const x = 50 + Math.cos(spinAngle) * radiusX;
  const y = 50 + Math.sin(spinAngle) * radiusY;

  return {
    t: progress,
    x,
    y,
    mode: 'pointer' as CursorMode,
    pressed: norm > 0.85,
    clicking: norm > 0.9,
    label: norm < 0.45 ? 'Duplicating...' : 'Agent Ready',
    badgeTone: (norm > 0.8 ? 'fixed' : 'default') as 'default' | 'error' | 'fixed'
  };
}

function interpolateCurvedAgent(agent: AgentConfig, progress: number) {
  if (progress < ORBIT_END_T) {
    return getDuplicationOrbitState(agent.orbitIndex, progress);
  }

  const keyframes = agent.keyframes;
  const endOrbitPos = getDuplicationOrbitState(agent.orbitIndex, ORBIT_END_T);

  for (let i = 0; i < keyframes.length - 1; i++) {
    const curr = i === 0 ? { ...keyframes[0], x: endOrbitPos.x, y: endOrbitPos.y } : keyframes[i];
    const next = keyframes[i + 1];
    if (progress >= curr.t && progress <= next.t) {
      const span = next.t - curr.t || 0.0001;
      const rawT = (progress - curr.t) / span;
      const isTypingSegment = curr.mode === 'ibeam' && next.mode === 'ibeam' && curr.y === next.y;
      const t = isTypingSegment ? rawT : humanEase(rawT);

      let x: number;
      let y: number;

      if (next.cx !== undefined && next.cy !== undefined && !isTypingSegment) {
        const inv = 1 - t;
        x = inv * inv * curr.x + 2 * inv * t * next.cx + t * t * next.x;
        y = inv * inv * curr.y + 2 * inv * t * next.cy + t * t * next.y;
      } else {
        x = curr.x + (next.x - curr.x) * t;
        y = curr.y + (next.y - curr.y) * t;
      }

      if (isTypingSegment) {
        y += Math.sin(progress * 260) * 0.16;
      }

      return {
        t: progress,
        x,
        y,
        mode: rawT > 0.8 ? next.mode ?? curr.mode : curr.mode ?? 'pointer',
        pressed: rawT < 0.9 ? curr.pressed : next.pressed,
        clicking: (rawT > 0.75 && next.clicking) || (rawT < 0.25 && curr.clicking),
        label: rawT > 0.55 ? next.label : curr.label,
        badgeTone: rawT > 0.55 ? next.badgeTone : curr.badgeTone
      };
    }
  }
  return keyframes[keyframes.length - 1];
}

const CursorIcon: React.FC<{ mode: CursorMode; color: string; pressed?: boolean }> = ({
  mode,
  color,
  pressed
}) => {
  const scaleClass = pressed ? 'scale-85' : 'scale-100';

  if (mode === 'ibeam') {
    return (
      <svg
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        className={`transition-transform duration-100 ${scaleClass} -translate-x-2 -translate-y-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]`}
      >
        <path
          d="M6 3H14M10 3V21M6 21H14"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M6 3H14M10 3V21M6 21H14"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (mode === 'crosshair') {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        className={`transition-transform duration-100 ${scaleClass} -translate-x-2.5 -translate-y-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]`}
      >
        <path
          d="M11 2V20M2 11H20"
          stroke="#ffffff"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M11 2V20M2 11H20"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <rect x="8.5" y="8.5" width="5" height="5" stroke={color} strokeWidth="1.4" />
      </svg>
    );
  }

  if (mode === 'grab') {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={`transition-transform duration-100 ${scaleClass} -translate-x-2 -translate-y-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]`}
      >
        <path
          d="M12 2L15 5H13V10H18V8L21 11L18 14V12H13V17H15L12 20L9 17H11V12H6V14L3 11L6 8V10H11V5H9L12 2Z"
          fill={color}
          stroke="#ffffff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className={`transition-transform duration-100 ${scaleClass} drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]`}
    >
      <path
        d="M3 2L10.5 21L13.8 13.8L21 10.5L3 2Z"
        fill={color}
        stroke="#ffffff"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Preloader: React.FC<PreloaderProps> = ({
  hasStarted,
  buildProgress,
  onStartBuild,
  onSkip
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const milestonesRef = useRef<{
    morphSnap: boolean;
    masterClick: boolean;
    orbitSteps: number;
    cloneBurst: boolean;
    archHeaderSnap: boolean;
    visionGrab: boolean;
    uiBtn1Click: boolean;
    archFillSnap: boolean;
    uiBtn1Snap: boolean;
    visionFrontClick: boolean;
    visionRimClick: boolean;
    uiBtn2Snap: boolean;
    complete: boolean;
  }>({
    morphSnap: false,
    masterClick: false,
    orbitSteps: 0,
    cloneBurst: false,
    archHeaderSnap: false,
    visionGrab: false,
    uiBtn1Click: false,
    archFillSnap: false,
    uiBtn1Snap: false,
    visionFrontClick: false,
    visionRimClick: false,
    uiBtn2Snap: false,
    complete: false
  });

  // Clicking anywhere on the dark RIFAT. screen unlocks audio immediately and starts the smooth morph
  const handleEntryClick = () => {
    if (hasStarted) return;
    soundEngine.unlockNow();
    soundEngine.playMouseClick();
    onStartBuild();
  };

  useEffect(() => {
    if (hasStarted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEntryClick();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  useEffect(() => {
    if (!hasStarted || buildProgress >= 1) return;
    const m = milestonesRef.current;

    // 1. RIFAT. text finishes morphing into the Master Cursor at 0.075
    if (buildProgress >= 0.075 && !m.morphSnap) {
      m.morphSnap = true;
      soundEngine.playLayerSnap();
    }

    // 2. Master Cursor clicks at 0.118 right before duplicating into 5 AI agents
    if (buildProgress >= 0.118 && !m.masterClick) {
      m.masterClick = true;
      soundEngine.playMouseClick();
    }

    // 3. Rhythmic ascending pulses while the 5 duplicated cursors glide in their circular formation (0.125 -> 0.21)
    if (buildProgress >= DUPLICATE_START_T && buildProgress < ORBIT_END_T) {
      const span = ORBIT_END_T - DUPLICATE_START_T;
      const targetStep = Math.floor(((buildProgress - DUPLICATE_START_T) / span) * 5);
      if (targetStep > m.orbitSteps) {
        m.orbitSteps = targetStep;
        soundEngine.playOrbitPulse(targetStep);
      }
    }

    // 4. Breakout burst when the 5 cursors finish circular loading and disperse to build the website
    if (buildProgress >= ORBIT_END_T && !m.cloneBurst) {
      m.cloneBurst = true;
      soundEngine.playCloneBurst();
    }

    // 5. Arch_Agent locks top header bar
    if (buildProgress >= 0.31 && !m.archHeaderSnap) {
      m.archHeaderSnap = true;
      soundEngine.playLayerSnap();
    }

    // 6. Vision_Agent grabs portrait cutout
    if (buildProgress >= 0.28 && !m.visionGrab) {
      m.visionGrab = true;
      soundEngine.playMouseClick();
    }

    // 7. UI_Agent starts drawing primary button
    if (buildProgress >= 0.38 && !m.uiBtn1Click) {
      m.uiBtn1Click = true;
      soundEngine.playMouseClick();
    }

    // 8. UI_Agent clicks to apply #e11d48 fill to primary button
    if (buildProgress >= 0.56 && !m.uiBtn1Snap) {
      m.uiBtn1Snap = true;
      soundEngine.playMouseClick();
      soundEngine.playLayerSnap();
    }

    // 9. Arch_Agent clicks to apply Crimson Gradient to PORTFOLIO backdrop
    if (buildProgress >= 0.58 && !m.archFillSnap) {
      m.archFillSnap = true;
      soundEngine.playLayerSnap();
    }

    // 10. Vision_Agent clicks [Bring to Front ↑] to pop portrait in front of PORTFOLIO
    if (buildProgress >= 0.62 && !m.visionFrontClick) {
      m.visionFrontClick = true;
      soundEngine.playMouseClick();
      soundEngine.playLayerSnap();
    }

    // 11. Vision_Agent clicks Enable Rim Lighting
    if (buildProgress >= 0.74 && !m.visionRimClick) {
      m.visionRimClick = true;
      soundEngine.playMouseClick();
    }

    // 12. UI_Agent locks Download CV button
    if (buildProgress >= 0.8 && !m.uiBtn2Snap) {
      m.uiBtn2Snap = true;
      soundEngine.playLayerSnap();
    }

    // 13. All 5 agents complete & converge
    if (buildProgress >= 0.91 && !m.complete) {
      m.complete = true;
      soundEngine.playBuildComplete();
    }
  }, [hasStarted, buildProgress]);

  if (buildProgress >= 1) return null;

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    if (!nextMuted) {
      soundEngine.unlockNow();
      soundEngine.playMouseClick();
    }
  };

  // STAGE 0: Minimalist Dark Screen with "RIFAT." in the middle and "click anywhere to continue" below it
  if (!hasStarted) {
    return (
      <div
        id="preloader-entry"
        onClick={handleEntryClick}
        onWheel={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
        className="fixed inset-0 z-[99999] bg-[#08080a] flex flex-col items-center justify-center select-none cursor-pointer no-print"
      >
        <div className="flex flex-col items-center text-center px-4">
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl tracking-tight leading-none text-white">
            RIFAT<span className="text-[#e11d48]">.</span>
          </h1>
          <p className="mt-3 font-mono text-[11px] sm:text-xs tracking-[0.22em] text-white/50 lowercase animate-pulse">
            click anywhere to continue
          </p>
        </div>
      </div>
    );
  }

  // STAGE 1: Smooth Morph ("RIFAT." -> Master Cursor -> Circular Duplication into 5 AI Agents)
  const safeProgress = Number.isFinite(buildProgress)
    ? Math.min(1, Math.max(0, buildProgress))
    : 0;

  // 0.00 -> 0.08: RIFAT. text condenses and morphs into the Master Cursor
  const morphRatio = Math.min(1, Math.max(0, safeProgress / MORPH_END_T));
  const easedMorph = humanEase(morphRatio);

  // Master cursor loading phase (0.035 -> 0.125) before duplicating into 5 agents
  const showSingleMasterCursor = safeProgress >= 0.035 && safeProgress < DUPLICATE_START_T;
  const masterCursorScale =
    safeProgress < MORPH_END_T
      ? 0.4 + easedMorph * 0.75
      : safeProgress < 0.115
      ? 1.15
      : 0.9;
  const masterLoadRingPct =
    safeProgress < 0.05
      ? 0
      : Math.min(100, Math.max(0, ((safeProgress - 0.05) / (DUPLICATE_START_T - 0.05)) * 100));
  const isMasterClickingToDuplicate = safeProgress >= 0.112 && safeProgress < DUPLICATE_START_T;

  // Duplicated 5 AI Agent Cursors active from 0.125 -> 1.00
  const showDuplicatedAgents = safeProgress >= DUPLICATE_START_T;
  const isDuplicatingOrbit = safeProgress >= DUPLICATE_START_T && safeProgress < ORBIT_END_T;

  // Dark #08080a backdrop stays solid during morph & duplication (0.00 -> 0.18), then smoothly fades out by 0.25
  const blankBackdropOpacity =
    safeProgress < 0.18
      ? 1
      : safeProgress < 0.25
      ? Math.min(1, Math.max(0, 1 - (safeProgress - 0.18) / 0.07))
      : 0;

  // Smooth fade at the very end (0.93 -> 1.0)
  const overlayOpacity =
    safeProgress > 0.93 ? Math.min(1, Math.max(0, 1 - (safeProgress - 0.93) / 0.07)) : 1;

  const morphTextOpacity = Math.min(1, Math.max(0, 1 - easedMorph * easedMorph));
  const morphSubtextOpacity = Math.min(1, Math.max(0, 1 - morphRatio * 3));
  const masterCursorOpacity = safeProgress < MORPH_END_T ? Math.min(1, Math.max(0, easedMorph)) : 1;

  return (
    <div
      id="preloader"
      style={{ opacity: overlayOpacity }}
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
      className="fixed inset-0 z-[99999] pointer-events-auto overflow-hidden no-print select-none"
    >
      {/* Pure #08080a Dark Backdrop during Morph & Cursor Duplication */}
      {blankBackdropOpacity > 0 && (
        <div
          style={{ opacity: blankBackdropOpacity }}
          className="absolute inset-0 bg-[#08080a] z-10 flex items-center justify-center"
        >
          {/* Morphing "RIFAT." Writing (0.00 -> 0.08): Smoothly condenses & morphs into the center cursor */}
          {safeProgress < MORPH_END_T && (
            <div
              style={{
                opacity: morphTextOpacity,
                transform: `scale(${1 - easedMorph * 0.78})`,
                filter: `blur(${easedMorph * 6}px)`,
                letterSpacing: `${-easedMorph * 0.16}em`
              }}
              className="flex flex-col items-center text-center will-change-transform"
            >
              <span className="font-display text-6xl sm:text-8xl md:text-9xl tracking-tight leading-none text-white">
                RIFAT<span className="text-[#e11d48]">.</span>
              </span>
              <span
                style={{ opacity: morphSubtextOpacity }}
                className="mt-3 font-mono text-[11px] sm:text-xs tracking-[0.22em] text-white/50 lowercase"
              >
                click anywhere to continue
              </span>
            </div>
          )}

          {/* Subtle Circular Duplication Ring while the 5 Agents spin out from the Master Cursor */}
          {isDuplicatingOrbit && (
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-dashed border-white/15 animate-spin-slow" />
          )}
        </div>
      )}

      {/* Subtle SFX Toggle + Skip Intro Controls in bottom-right corner */}
      <div className="pointer-events-auto fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={handleToggleMute}
          className="px-2.5 py-1.5 bg-[#08080a]/90 hover:border-[#e11d48] border border-white/15 text-white/85 hover:text-white font-mono text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
        >
          {isMuted ? '🔇 SFX OFF' : '🔊 SFX ON'}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSkip();
          }}
          className="px-3 py-1.5 bg-[#08080a]/90 hover:bg-[#e11d48] border border-white/15 text-white/85 hover:text-white font-mono text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
        >
          SKIP INTRO ↗
        </button>
      </div>

      {/* Morphed Master Cursor at (50%, 50%) Loading & Duplicating (0.035 -> 0.125) */}
      {showSingleMasterCursor && (
        <div
          style={{
            left: '50%',
            top: '50%',
            opacity: masterCursorOpacity,
            transform: `translate(-50%, -50%) scale(${masterCursorScale})`
          }}
          className="absolute z-30 flex items-center justify-center pointer-events-none"
        >
          {/* Smooth circular progress ring loading around the morphed cursor */}
          <svg className="absolute -left-7 -top-7 w-14 h-14 -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#e11d48"
              strokeWidth="2.2"
              strokeDasharray={125.6}
              strokeDashoffset={125.6 - (125.6 * masterLoadRingPct) / 100}
              strokeLinecap="round"
            />
          </svg>

          {isMasterClickingToDuplicate && (
            <span className="absolute -left-6 -top-6 w-12 h-12 rounded-full border-2 border-[#ff2a4b] animate-ping" />
          )}

          <CursorIcon mode="pointer" color="#ff2a4b" pressed={isMasterClickingToDuplicate} />
        </div>
      )}

      {/* 5 Duplicated AI Agent Cursors (0.125 -> 1.00) */}
      {showDuplicatedAgents &&
        AGENTS.map((agent) => {
          const state = interpolateCurvedAgent(agent, buildProgress);

          const badgeBg =
            state.badgeTone === 'error'
              ? 'rgba(220, 38, 38, 0.95)'
              : state.badgeTone === 'fixed'
              ? 'rgba(16, 185, 129, 0.95)'
              : agent.bgColor;

          return (
            <div
              key={agent.id}
              style={{
                left: `${state.x}%`,
                top: `${state.y}%`
              }}
              className="absolute z-30 will-change-transform pointer-events-none"
            >
              {state.clicking && (
                <span
                  style={{ borderColor: agent.color }}
                  className="absolute -left-3.5 -top-3.5 w-8 h-8 rounded-full border-2 animate-ping opacity-80"
                />
              )}

              <CursorIcon
                mode={state.mode ?? 'pointer'}
                color={agent.color}
                pressed={state.pressed || state.clicking}
              />

              <div
                style={{
                  backgroundColor: badgeBg,
                  borderColor: agent.borderColor
                }}
                className="ml-3.5 -mt-1 px-2 py-0.5 rounded-xs border text-white shadow-[0_8px_20px_rgba(0,0,0,0.8)] whitespace-nowrap flex items-center gap-1.5"
              >
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider">
                  {agent.name}
                </span>
                {state.label && (
                  <>
                    <span className="opacity-50 text-[8px]">·</span>
                    <span className="font-mono text-[8.5px] text-white/95">{state.label}</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};
