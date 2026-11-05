import React from 'react';

interface PreloaderProps {
  buildProgress: number; // 0 to 1 over ~4.8 seconds
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
  keyframes: AgentKeyframe[];
}

// Human-like easing with subtle acceleration and soft landing
function humanEase(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const AGENTS: AgentConfig[] = [
  {
    id: 'arch',
    name: 'Arch_Agent',
    color: '#ff2a4b',
    bgColor: 'rgba(225, 29, 72, 0.94)',
    borderColor: '#ff6b81',
    keyframes: [
      { t: 0.11, x: 50, y: 50, mode: 'pointer', label: 'Cloned' },
      {
        t: 0.16,
        x: 4,
        y: 3.5,
        cx: 28,
        cy: 18,
        mode: 'crosshair',
        pressed: true,
        label: 'Drag <header> Frame'
      },
      {
        t: 0.25,
        x: 94,
        y: 5.5,
        cx: 50,
        cy: 2.5,
        mode: 'crosshair',
        pressed: true,
        label: '1440px × 64px'
      },
      {
        t: 0.29,
        x: 8,
        y: 14,
        cx: 45,
        cy: 8,
        mode: 'crosshair',
        clicking: true,
        label: 'Frame Backdrop'
      },
      {
        t: 0.44,
        x: 91,
        y: 33,
        cx: 52,
        cy: 26,
        mode: 'crosshair',
        pressed: true,
        label: 'Sizing PORTFOLIO (21.8vw)'
      },
      {
        t: 0.49,
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
        t: 0.62,
        x: 6,
        y: 94,
        cx: 22,
        cy: 62,
        mode: 'crosshair',
        pressed: true,
        label: 'Draw Bottom Bar'
      },
      {
        t: 0.78,
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
    keyframes: [
      { t: 0.11, x: 50, y: 50, mode: 'pointer', label: 'Cloned' },
      {
        t: 0.17,
        x: 7,
        y: 41,
        cx: 26,
        cy: 48,
        mode: 'ibeam',
        clicking: true,
        label: 'Focus Text'
      },
      {
        t: 0.24,
        x: 15.5,
        y: 41,
        mode: 'ibeam',
        label: 'Typing "Hello, I\'m"'
      },
      {
        t: 0.26,
        x: 7,
        y: 50,
        cx: 10,
        cy: 46,
        mode: 'ibeam',
        clicking: true,
        label: 'Type <h1>'
      },
      {
        t: 0.34,
        x: 20.5,
        y: 50,
        mode: 'ibeam',
        label: 'Typed "RIFTA."',
        badgeTone: 'error'
      },
      {
        t: 0.37,
        x: 20.5,
        y: 50,
        mode: 'ibeam',
        clicking: true,
        label: '⚠ Oops, typo!',
        badgeTone: 'error'
      },
      {
        t: 0.42,
        x: 13.5,
        y: 50,
        mode: 'ibeam',
        pressed: true,
        label: '⌫ Backspace "TA."',
        badgeTone: 'error'
      },
      {
        t: 0.47,
        x: 19.5,
        y: 50,
        mode: 'ibeam',
        label: '✓ Fixed "RIFAT."',
        badgeTone: 'fixed'
      },
      {
        t: 0.49,
        x: 7,
        y: 56,
        cx: 12,
        cy: 53,
        mode: 'ibeam',
        label: 'Sub-heading'
      },
      {
        t: 0.53,
        x: 18.5,
        y: 56,
        mode: 'ibeam',
        label: 'ASHHAB BIN SHARIF'
      },
      {
        t: 0.55,
        x: 7,
        y: 61,
        cx: 12,
        cy: 59,
        mode: 'ibeam',
        label: 'Role Title'
      },
      {
        t: 0.63,
        x: 22.5,
        y: 61,
        mode: 'ibeam',
        label: '⚠ "ENGINER"',
        badgeTone: 'error'
      },
      {
        t: 0.67,
        x: 19.5,
        y: 61,
        mode: 'ibeam',
        pressed: true,
        label: '⌫ Fix "ENGINEER"',
        badgeTone: 'error'
      },
      {
        t: 0.74,
        x: 17,
        y: 64,
        cx: 14,
        cy: 63,
        mode: 'ibeam',
        label: '✓ "& AI ARCHITECT"',
        badgeTone: 'fixed'
      },
      {
        t: 0.77,
        x: 7,
        y: 70,
        cx: 11,
        cy: 67,
        mode: 'ibeam',
        label: 'Writing Bio...'
      },
      {
        t: 0.88,
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
    keyframes: [
      { t: 0.11, x: 50, y: 50, mode: 'pointer', label: 'Cloned' },
      {
        t: 0.24,
        x: 62,
        y: 66,
        cx: 59,
        cy: 56,
        mode: 'grab',
        clicking: true,
        pressed: true,
        label: 'Grab Portrait.png'
      },
      {
        t: 0.48,
        x: 50,
        y: 56,
        cx: 56,
        cy: 62,
        mode: 'grab',
        pressed: true,
        label: 'Dragging to Center...'
      },
      {
        t: 0.54,
        x: 50,
        y: 54,
        mode: 'pointer',
        label: '⚠ Behind Text (z: 1)',
        badgeTone: 'error'
      },
      {
        t: 0.6,
        x: 53,
        y: 36,
        cx: 48,
        cy: 44,
        mode: 'pointer',
        clicking: true,
        pressed: true,
        label: 'Click [Bring to Front]',
        badgeTone: 'fixed'
      },
      {
        t: 0.72,
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
    keyframes: [
      { t: 0.11, x: 50, y: 50, mode: 'pointer', label: 'Cloned' },
      {
        t: 0.34,
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
        t: 0.48,
        x: 17.5,
        y: 83,
        cx: 12,
        cy: 81,
        mode: 'crosshair',
        pressed: true,
        label: '168px × 48px'
      },
      {
        t: 0.55,
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
        t: 0.62,
        x: 19,
        y: 78,
        cx: 16,
        cy: 77,
        mode: 'crosshair',
        pressed: true,
        label: 'Draw CV Button'
      },
      {
        t: 0.74,
        x: 28.5,
        y: 83,
        cx: 24,
        cy: 81,
        mode: 'crosshair',
        pressed: true,
        label: 'Link Rifat_CV.pdf'
      },
      {
        t: 0.84,
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
    keyframes: [
      { t: 0.11, x: 50, y: 50, mode: 'pointer', label: 'Cloned' },
      {
        t: 0.3,
        x: 70,
        y: 45,
        cx: 62,
        cy: 42,
        mode: 'pointer',
        clicking: true,
        label: 'Place ✳ Purpose Badge'
      },
      {
        t: 0.36,
        x: 70,
        y: 54,
        cx: 70,
        cy: 50,
        mode: 'crosshair',
        pressed: true,
        label: 'Draw Metric Row 01'
      },
      {
        t: 0.5,
        x: 91,
        y: 59,
        cx: 80,
        cy: 57,
        mode: 'ibeam',
        label: 'Set +40% Inbound ROI',
        badgeTone: 'fixed'
      },
      {
        t: 0.54,
        x: 70,
        y: 65,
        cx: 80,
        cy: 62,
        mode: 'crosshair',
        pressed: true,
        label: 'Draw Metric Row 02'
      },
      {
        t: 0.68,
        x: 91,
        y: 70,
        cx: 80,
        cy: 68,
        mode: 'ibeam',
        label: 'Set 95/100 Level 6 AI',
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

function interpolateCurvedAgent(keyframes: AgentKeyframe[], progress: number) {
  if (progress <= keyframes[0].t) {
    return keyframes[0];
  }
  for (let i = 0; i < keyframes.length - 1; i++) {
    const curr = keyframes[i];
    const next = keyframes[i + 1];
    if (progress >= curr.t && progress <= next.t) {
      const span = next.t - curr.t || 0.0001;
      const rawT = (progress - curr.t) / span;
      // If typing with I-Beam along a line, use linear + micro keystroke stepping for realistic typing feel
      const isTypingSegment = curr.mode === 'ibeam' && next.mode === 'ibeam' && curr.y === next.y;
      const t = isTypingSegment ? rawT : humanEase(rawT);

      let x: number;
      let y: number;

      if (next.cx !== undefined && next.cy !== undefined && !isTypingSegment) {
        // Quadratic Bezier curve: B(t) = (1-t)^2 * P0 + 2(1-t)t * C + t^2 * P1
        const inv = 1 - t;
        x = inv * inv * curr.x + 2 * inv * t * next.cx + t * t * next.x;
        y = inv * inv * curr.y + 2 * inv * t * next.cy + t * t * next.y;
      } else {
        x = curr.x + (next.x - curr.x) * t;
        y = curr.y + (next.y - curr.y) * t;
      }

      // Add subtle 0.3px vertical human hand micro-tremor during fast typing
      if (isTypingSegment) {
        y += Math.sin(progress * 260) * 0.18;
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

export const Preloader: React.FC<PreloaderProps> = ({ buildProgress, onSkip }) => {
  if (buildProgress >= 1) return null;

  // Phase 0 (0.00 -> 0.11): Single Master Cursor glides into center on a blank #08080a page and clicks to clone
  const isMasterPhase = buildProgress < 0.11;
  const masterMoveT = Math.min(1, buildProgress / 0.065);
  const easedMaster = humanEase(masterMoveT);
  const masterX = 58 + (50 - 58) * easedMaster;
  const masterY = 84 + (50 - 84) * easedMaster;
  const isMasterClicking = buildProgress >= 0.068 && buildProgress < 0.11;

  // Blank canvas fades out right as the cursor clones at 0.10 -> 0.16
  const blankBackdropOpacity =
    buildProgress < 0.095
      ? 1
      : buildProgress < 0.16
      ? Math.max(0, 1 - (buildProgress - 0.095) / 0.065)
      : 0;

  // Smooth fade at the very end (0.93 -> 1.0)
  const overlayOpacity =
    buildProgress > 0.93 ? Math.max(0, 1 - (buildProgress - 0.93) / 0.07) : 1;

  return (
    <div
      id="preloader"
      style={{ opacity: overlayOpacity }}
      className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden no-print select-none"
    >
      {/* Blank dark canvas during the initial 0.5s while the Master Cursor glides in and clones */}
      {blankBackdropOpacity > 0 && (
        <div
          style={{ opacity: blankBackdropOpacity }}
          className="absolute inset-0 bg-[#08080a] z-10"
        />
      )}

      {/* Subtle Skip Button in bottom-right corner */}
      <button
        type="button"
        onClick={onSkip}
        className="pointer-events-auto fixed bottom-4 right-4 z-40 px-3 py-1.5 bg-[#08080a]/85 hover:bg-[#e11d48] border border-white/15 text-white/80 hover:text-white font-mono text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
      >
        SKIP INTRO ↗
      </button>

      {/* PHASE 0: Single Master Cursor Gliding to Center & Clicking to Clone */}
      {isMasterPhase && (
        <div
          style={{
            left: `${masterX}%`,
            top: `${masterY}%`
          }}
          className="absolute z-30 will-change-transform"
        >
          {/* Double-click clone burst rings */}
          {isMasterClicking && (
            <>
              <span className="absolute -left-5 -top-5 w-11 h-11 rounded-full border-2 border-[#ff2a4b] animate-ping" />
              <span className="absolute -left-8 -top-8 w-16 h-16 rounded-full border border-[#38bdf8]/70 animate-ping" />
            </>
          )}

          <CursorIcon mode="pointer" color="#ff2a4b" pressed={isMasterClicking} />

          <div className="ml-4 -mt-1 px-2.5 py-1 bg-[#e11d48] border border-[#ff6b81] text-white font-mono text-[9.5px] font-bold uppercase tracking-wider whitespace-nowrap shadow-xl">
            {isMasterClicking ? '⚡ Cloning 5 Agents...' : 'Master_Agent'}
          </div>
        </div>
      )}

      {/* PHASE 1+: 5 Cloned AI Agent Cursors Working Simultaneously */}
      {!isMasterPhase &&
        AGENTS.map((agent) => {
          const state = interpolateCurvedAgent(agent.keyframes, buildProgress);

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
              className="absolute z-30 will-change-transform"
            >
              {/* Click / Drag Ripple */}
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

              {/* Compact Agent Tag */}
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
