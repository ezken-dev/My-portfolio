import React, { useEffect, useRef, useState } from 'react';
import { CV_DOWNLOAD_FILENAME, CV_PDF_URL } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

const UPLOADED_PORTRAIT_PATH = '/assets/aistudio/Portfolio_Picture_d07ae912.png';

interface HeroSectionProps {
  buildProgress: number; // 0 to 1
  onNavigate: (sectionId: string) => void;
}

function sliceCharsByProgress(str: string, p: number, start: number, end: number): string {
  if (p <= start) return '';
  if (p >= end) return str;
  const ratio = (p - start) / (end - start);
  const count = Math.max(1, Math.floor(ratio * str.length));
  return str.slice(0, count);
}

function getTypedScriptText(p: number): { text: string; isTyping: boolean } {
  const full = "Hello, I'm";
  if (p < 0.22) return { text: '', isTyping: false };
  if (p < 0.28) {
    return { text: sliceCharsByProgress(full, p, 0.22, 0.28), isTyping: true };
  }
  return { text: full, isTyping: false };
}

function getTypedNameState(p: number): {
  text: string;
  isError: boolean;
  isFixed: boolean;
  isTyping: boolean;
} {
  if (p < 0.30) return { text: '', isError: false, isFixed: false, isTyping: false };

  // 0.30 -> 0.38: Type character-by-character "R" -> "RI" -> "RIF" -> "RIFT" -> "RIFTA" -> "RIFTA."
  if (p < 0.38) {
    const typoStr = 'RIFTA.';
    const text = sliceCharsByProgress(typoStr, p, 0.30, 0.38);
    const isError = text.length >= 5;
    return { text, isError, isFixed: false, isTyping: true };
  }

  // 0.38 -> 0.41: Pause on "RIFTA." (realizing mistake, red wavy underline)
  if (p < 0.41) {
    return { text: 'RIFTA.', isError: true, isFixed: false, isTyping: true };
  }

  // 0.41 -> 0.46: Backspace character-by-character "RIFTA." -> "RIFTA" -> "RIFT" -> "RIF"
  if (p < 0.46) {
    const ratio = (p - 0.41) / (0.46 - 0.41);
    const states = ['RIFTA.', 'RIFTA', 'RIFT', 'RIF'];
    const idx = Math.min(states.length - 1, Math.floor(ratio * states.length));
    return { text: states[idx], isError: idx < 3, isFixed: false, isTyping: true };
  }

  // 0.46 -> 0.51: Type correct letters "RIF" -> "RIFA" -> "RIFAT" -> "RIFAT."
  if (p < 0.51) {
    const ratio = (p - 0.46) / (0.51 - 0.46);
    const states = ['RIF', 'RIFA', 'RIFAT', 'RIFAT.'];
    const idx = Math.min(states.length - 1, Math.floor(ratio * states.length));
    return { text: states[idx], isError: false, isFixed: idx >= 2, isTyping: true };
  }

  return { text: 'RIFAT.', isError: false, isFixed: p < 0.58, isTyping: false };
}

function getTypedSubName(p: number): { text: string; isTyping: boolean } {
  const full = 'ASHHAB BIN SHARIF';
  if (p < 0.52) return { text: '', isTyping: false };
  if (p < 0.57) {
    return { text: sliceCharsByProgress(full, p, 0.52, 0.57), isTyping: true };
  }
  return { text: full, isTyping: false };
}

function getTypedRoleState(p: number): {
  line1: string;
  line2: string;
  mobileText: string;
  isError: boolean;
  isFixed: boolean;
  isTyping: boolean;
} {
  if (p < 0.58) {
    return {
      line1: '',
      line2: '',
      mobileText: '',
      isError: false,
      isFixed: false,
      isTyping: false
    };
  }

  // 0.58 -> 0.66: Type character-by-character "FULL-STACK ENGINER" (mobile: "AI ARCHTECT")
  if (p < 0.66) {
    const desktopTypo = 'FULL-STACK ENGINER';
    const mobileTypo = 'AI ARCHTECT';
    const line1 = sliceCharsByProgress(desktopTypo, p, 0.58, 0.655);
    const mobileText = sliceCharsByProgress(mobileTypo, p, 0.58, 0.655);
    const isError = line1.length >= 17;
    return {
      line1,
      line2: '',
      mobileText,
      isError,
      isFixed: false,
      isTyping: true
    };
  }

  // 0.66 -> 0.70: Backspace "ER" -> "FULL-STACK ENGIN" -> "FULL-STACK ENGI"
  if (p < 0.70) {
    const ratio = (p - 0.66) / (0.70 - 0.66);
    const dStates = ['FULL-STACK ENGINER', 'FULL-STACK ENGIN', 'FULL-STACK ENGI'];
    const mStates = ['AI ARCHTECT', 'AI ARCHTEC', 'AI ARCHT', 'AI ARCH'];
    const dIdx = Math.min(dStates.length - 1, Math.floor(ratio * dStates.length));
    const mIdx = Math.min(mStates.length - 1, Math.floor(ratio * mStates.length));
    return {
      line1: dStates[dIdx],
      line2: '',
      mobileText: mStates[mIdx],
      isError: dIdx === 0,
      isFixed: false,
      isTyping: true
    };
  }

  // 0.70 -> 0.76: Type "EER &" on line 1 and "AI ARCHITECT" on line 2
  if (p < 0.76) {
    const suffix = 'EER &\nAI ARCHITECT';
    const mobileSuffix = 'ITECT & DEV';
    const typedSuffix = sliceCharsByProgress(suffix, p, 0.70, 0.76);
    const typedMobileSuffix = sliceCharsByProgress(mobileSuffix, p, 0.70, 0.76);
    const parts = ('FULL-STACK ENGI' + typedSuffix).split('\n');
    return {
      line1: parts[0] || '',
      line2: parts[1] || '',
      mobileText: 'AI ARCH' + typedMobileSuffix,
      isError: false,
      isFixed: parts[1] ? parts[1].length >= 8 : false,
      isTyping: true
    };
  }

  return {
    line1: 'FULL-STACK ENGINEER &',
    line2: 'AI ARCHITECT',
    mobileText: 'AI ARCHITECT & DEV',
    isError: false,
    isFixed: p < 0.84,
    isTyping: false
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  buildProgress,
  onNavigate
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const bgWordRef = useRef<HTMLDivElement>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const [processedPortraitUrl, setProcessedPortraitUrl] = useState<string>(UPLOADED_PORTRAIT_PATH);

  const isBuilding = buildProgress < 1;

  // Non-destructive Canvas Studio Grading & Edge Halo Decontamination for /assets/aistudio/Portfolio_Picture_d07ae912.png
  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = UPLOADED_PORTRAIT_PATH;

    img.onload = () => {
      if (!isMounted) return;
      try {
        const canvas = document.createElement('canvas');
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        const totalPixels = w * h;

        // Step 1: If any outer background pixels are opaque white, flood-fill them to alpha = 0
        const visited = new Uint8Array(totalPixels);
        const queue = new Int32Array(totalPixels);
        let head = 0;
        let tail = 0;

        const enqueueIfWhiteBg = (x: number, y: number) => {
          const idx = y * w + x;
          if (visited[idx] === 1) return;
          const p = idx * 4;
          const a = data[p + 3];
          const r = data[p];
          const g = data[p + 1];
          const b = data[p + 2];
          if (a === 0 || (r > 235 && g > 235 && b > 235)) {
            visited[idx] = 1;
            queue[tail++] = idx;
          }
        };

        for (let x = 0; x < w; x++) {
          enqueueIfWhiteBg(x, 0);
        }
        for (let y = 0; y < Math.floor(h * 0.9); y++) {
          enqueueIfWhiteBg(0, y);
          enqueueIfWhiteBg(w - 1, y);
        }

        while (head < tail) {
          const idx = queue[head++];
          const p = idx * 4;
          data[p + 3] = 0;

          const x = idx % w;
          const y = (idx - x) / w;
          if (x > 0) enqueueIfWhiteBg(x - 1, y);
          if (x < w - 1) enqueueIfWhiteBg(x + 1, y);
          if (y > 0) enqueueIfWhiteBg(x, y - 1);
          if (y < h - 1) enqueueIfWhiteBg(x, y + 1);
        }

        // Step 2: Apply Crimson Noir contrast curve, edge halo decontamination, and directional Cyan/Crimson rim toning
        const alphaCopy = new Uint8Array(totalPixels);
        for (let i = 0; i < totalPixels; i++) {
          alphaCopy[i] = data[i * 4 + 3];
        }

        const clamp = (val: number) => (val < 0 ? 0 : val > 255 ? 255 : Math.round(val));

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = y * w + x;
            const a = alphaCopy[idx];
            if (a === 0) continue;

            const p = idx * 4;
            let r = data[p];
            let g = data[p + 1];
            let b = data[p + 2];

            // Count nearby transparent pixels within 2px radius to detect silhouette rim/fringe
            let transparentNeighbors = 0;
            for (let dy = -2; dy <= 2; dy++) {
              const ny = y + dy;
              if (ny < 0 || ny >= h) continue;
              for (let dx = -2; dx <= 2; dx++) {
                const nx = x + dx;
                if (nx < 0 || nx >= w) continue;
                if (alphaCopy[ny * w + nx] < 30) {
                  transparentNeighbors++;
                }
              }
            }

            const xRatio = x / w;

            // Decontaminate white/light edge fringe along hair and suit contour
            if (transparentNeighbors > 0 || a < 245) {
              const lum = (r + g + b) / 3;
              if (lum > 140) {
                const darken = 0.35;
                r *= darken;
                g *= darken;
                b *= darken;
              }
              if (xRatio >= 0.48) {
                r = r * 0.65 + 225 * 0.55;
                g = g * 0.55 + 29 * 0.25;
                b = b * 0.55 + 72 * 0.3;
              } else {
                r = r * 0.6 + 35 * 0.25;
                g = g * 0.7 + 189 * 0.4;
                b = b * 0.75 + 248 * 0.45;
              }
            }

            // Studio Noir S-Curve Contrast & Shadow Deepening
            const nr = r / 255;
            const ng = g / 255;
            const nb = b / 255;

            const contrastCurve = (c: number) => Math.pow(c, 1.18) * 1.08;

            r = contrastCurve(nr) * 255;
            g = contrastCurve(ng) * 255;
            b = contrastCurve(nb) * 255;

            // Directional Dual-Tone Atmosphere Grade (Cyan Left -> Crimson Right)
            if (xRatio > 0.52) {
              const rightWeight = Math.pow((xRatio - 0.52) / 0.48, 1.25);
              r += 42 * rightWeight;
              g -= 12 * rightWeight;
              b -= 6 * rightWeight;
            } else if (xRatio < 0.48) {
              const leftWeight = Math.pow((0.48 - xRatio) / 0.48, 1.35);
              r -= 10 * leftWeight;
              g += 14 * leftWeight;
              b += 30 * leftWeight;
            }

            data[p] = clamp(r);
            data[p + 1] = clamp(g);
            data[p + 2] = clamp(b);
          }
        }

        ctx.putImageData(imageData, 0, 0);
        setProcessedPortraitUrl(canvas.toDataURL('image/png'));
      } catch {
        setProcessedPortraitUrl(UPLOADED_PORTRAIT_PATH);
      }
    };

    return () => {
      isMounted = false;
    };
  }, []);

  // Permanent Mouse Parallax on Monumental PORTFOLIO wordmark & Frameless Cutout Portrait (Active once build finishes)
  useEffect(() => {
    if (isBuilding) return;

    const handleMouseMove = (e: MouseEvent) => {
      const xNorm = e.clientX / window.innerWidth - 0.5;
      const yNorm = e.clientY / window.innerHeight - 0.5;

      if (bgWordRef.current) {
        bgWordRef.current.style.transform = `translate3d(${xNorm * -22}px, ${yNorm * -12}px, 0)`;
      }
      if (portraitWrapRef.current) {
        portraitWrapRef.current.style.transform = `translate3d(${xNorm * 14}px, ${yNorm * 8}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isBuilding]);

  // Compute live construction states driven by buildProgress (0 -> 1)
  const scriptState = getTypedScriptText(buildProgress);
  const nameState = getTypedNameState(buildProgress);
  const subNameState = getTypedSubName(buildProgress);
  const roleState = getTypedRoleState(buildProgress);

  // Monumental PORTFOLIO wordmark: drawn as wireframe 0.34 -> 0.58, filled >= 0.60
  const showPortfolioWord = buildProgress >= 0.34;
  const portfolioWidthPct =
    buildProgress < 0.34
      ? 0
      : buildProgress < 0.58
      ? Math.min(100, ((buildProgress - 0.34) / 0.24) * 100)
      : 100;
  const isPortfolioWireframe = buildProgress >= 0.34 && buildProgress < 0.60;
  const showPortfolioGuideBox = buildProgress >= 0.34 && buildProgress < 0.88;

  // Portrait drag-to-center & z-index layering (0.28 -> 0.50 dragged along curve, < 0.62 behind PORTFOLIO, >= 0.62 brought to front when Vision_Agent clicks button!)
  const showPortrait = buildProgress >= 0.28;
  const rawPortraitDrag =
    buildProgress < 0.28
      ? 0
      : buildProgress < 0.50
      ? Math.min(1, (buildProgress - 0.28) / 0.22)
      : 1;
  // Smooth ease-out curve matching Vision_Agent's curved drag path
  const portraitDragEase = 1 - Math.pow(1 - rawPortraitDrag, 3);
  const portraitDragX = (1 - portraitDragEase) * 145;
  const portraitDragY =
    (1 - portraitDragEase) * 85 - Math.sin(rawPortraitDrag * Math.PI) * 22;
  const portraitScale = 0.84 + portraitDragEase * 0.16;
  const isPortraitInFront = buildProgress >= 0.62;
  const isVisionClickingFrontBtn = buildProgress >= 0.59 && buildProgress < 0.65;
  const showPortraitRimGlow = buildProgress >= 0.74;
  const showPortraitGuideBox = buildProgress >= 0.28 && buildProgress < 0.90;

  // Left bio character-by-character streaming (0.78 -> 0.89)
  const fullBioString =
    'Specializing in real-time bot infrastructure, generative AI pipelines, and high-performance web systems. Founder of Vixa Corp, building end-to-end architectures that drive measurable business outcomes (+40% inbound leads).';
  const showBio = buildProgress >= 0.77;
  const typedBioText = sliceCharsByProgress(fullBioString, buildProgress, 0.78, 0.89);
  const isBioTyping = buildProgress >= 0.78 && buildProgress < 0.89;

  // Primary & Secondary CTA Buttons (Rubber-band frame drawn by UI_Agent -> Styled fill on click)
  const showPrimaryBtn = buildProgress >= 0.38;
  const primaryBtnWidthScale =
    buildProgress < 0.38
      ? 0
      : buildProgress < 0.50
      ? Math.min(1, 0.25 + ((buildProgress - 0.38) / 0.12) * 0.75)
      : 1;
  const isPrimaryBtnStyled = buildProgress >= 0.56;

  const showSecondaryBtn = buildProgress >= 0.64;
  const secondaryBtnWidthScale =
    buildProgress < 0.64
      ? 0
      : buildProgress < 0.75
      ? Math.min(1, 0.25 + ((buildProgress - 0.64) / 0.11) * 0.75)
      : 1;
  const isSecondaryBtnStyled = buildProgress >= 0.80;
  const showLocation = buildProgress >= 0.83;

  // Right column metrics states & live count-up driven by Data_Agent
  const showPurposeBadge = buildProgress >= 0.28;
  const showMetric1 = buildProgress >= 0.40;
  const metric1Val =
    buildProgress < 0.40
      ? 0
      : buildProgress < 0.54
      ? Math.round(((buildProgress - 0.40) / 0.14) * 40)
      : 40;

  const showMetric2 = buildProgress >= 0.57;
  const metric2Val =
    buildProgress < 0.57
      ? 0
      : buildProgress < 0.71
      ? Math.round(((buildProgress - 0.57) / 0.14) * 95)
      : 95;

  const showMetric3 = buildProgress >= 0.74;
  const metric3Val =
    buildProgress < 0.74
      ? 0
      : buildProgress < 0.86
      ? Math.round(((buildProgress - 0.74) / 0.12) * 20)
      : 20;

  const showBottomBar = buildProgress >= 0.80;

  // Synchronize tactile keystrokes, backspaces, typo alerts, and metric ticks with DOM text/number changes
  const prevAudioStateRef = useRef<{
    scriptLen: number;
    nameLen: number;
    nameErr: boolean;
    subNameLen: number;
    roleLen: number;
    roleErr: boolean;
    bioLen: number;
    metricSum: number;
  }>({
    scriptLen: 0,
    nameLen: 0,
    nameErr: false,
    subNameLen: 0,
    roleLen: 0,
    roleErr: false,
    bioLen: 0,
    metricSum: 0
  });

  useEffect(() => {
    if (!isBuilding) return;
    const prev = prevAudioStateRef.current;

    // 1. "Hello, I'm" script typing
    const scriptLen = scriptState.text.length;
    if (scriptLen > prev.scriptLen) {
      const lastChar = scriptState.text[scriptLen - 1];
      soundEngine.playKeystroke(lastChar === ' ', false);
    }
    prev.scriptLen = scriptLen;

    // 2. "RIFTA." -> Backspace -> "RIFAT." typing & backspacing
    const nameLen = nameState.text.length;
    if (nameLen > prev.nameLen) {
      soundEngine.playKeystroke(false, false);
    } else if (nameLen < prev.nameLen) {
      soundEngine.playBackspace();
    }
    prev.nameLen = nameLen;

    if (nameState.isError && !prev.nameErr) {
      soundEngine.playTypoAlert();
    }
    prev.nameErr = nameState.isError;

    // 3. "ASHHAB BIN SHARIF" typing
    const subLen = subNameState.text.length;
    if (subLen > prev.subNameLen) {
      const lastChar = subNameState.text[subLen - 1];
      soundEngine.playKeystroke(lastChar === ' ', false);
    }
    prev.subNameLen = subLen;

    // 4. Role title typing & backspacing ("FULL-STACK ENGINER" -> "FULL-STACK ENGINEER & AI ARCHITECT")
    const fullRoleStr = roleState.line1 + roleState.line2;
    const roleLen = fullRoleStr.length;
    if (roleLen > prev.roleLen) {
      const lastChar = fullRoleStr[roleLen - 1];
      soundEngine.playKeystroke(lastChar === ' ', false);
    } else if (roleLen < prev.roleLen) {
      soundEngine.playBackspace();
    }
    prev.roleLen = roleLen;

    if (roleState.isError && !prev.roleErr) {
      soundEngine.playTypoAlert();
    }
    prev.roleErr = roleState.isError;

    // 5. Bio paragraph fast streaming
    const bioLen = typedBioText.length;
    if (bioLen > prev.bioLen) {
      const lastChar = typedBioText[bioLen - 1];
      soundEngine.playKeystroke(lastChar === ' ', true);
    }
    prev.bioLen = bioLen;

    // 6. KPI Metric counters (+40%, 95/100, 20+)
    const metricSum = metric1Val + metric2Val + metric3Val;
    if (metricSum > prev.metricSum) {
      soundEngine.playMetricTick(buildProgress);
    }
    prev.metricSum = metricSum;
  }, [
    isBuilding,
    buildProgress,
    scriptState.text,
    nameState.text,
    nameState.isError,
    subNameState.text,
    roleState.line1,
    roleState.line2,
    roleState.isError,
    typedBioText,
    metric1Val,
    metric2Val,
    metric3Val
  ]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative lg:min-h-screen pt-16 flex flex-col justify-between border-b border-[var(--border-hairline)] overflow-hidden bg-[var(--bg-main)]"
    >
      {/* 1. Top Metadata Sub-Bar (Framed in at buildProgress >= 0.18) */}
      <div
        style={{
          opacity: buildProgress >= 0.18 ? 1 : 0,
          transform: buildProgress >= 0.18 ? 'translateY(0)' : 'translateY(-10px)'
        }}
        className="border-b border-[var(--border-hairline)] bg-[var(--bg-main)]/75 backdrop-blur-sm z-30 transition-all duration-300"
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-8 py-2 sm:py-3 flex flex-row items-center justify-between gap-2">
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#e11d48]">
              FULL-STACK ENGINEER &amp; AI ARCHITECT
            </span>
            <span className="hidden sm:block font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-muted)] mt-0.5">
              FOUNDER @ VIXA CORP · CO-FOUNDER @ FONITY STUDIOS
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[8.5px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[var(--text-muted)] shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[#ff2a4b] font-bold text-xs sm:text-sm leading-none" aria-hidden="true">
                •
              </span>
              <span className="sm:hidden">MALAYSIA</span>
              <span className="hidden sm:inline">MALAYSIA · LEVEL 6 AI VISIONARY [95/100]</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Hero Stage: Monumental PORTFOLIO Backdrop + Frameless Center Cutout + Minimal Left/Right Framing */}
      <div className="relative flex-1 flex flex-col justify-end min-h-[325px] sm:min-h-[520px] lg:min-h-[760px] max-w-[1440px] w-full mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-6 pb-0">
        {/* LAYER 1 (z-10): Monumental Background Wordmark (PORTFOLIO) */}
        <div
          style={{
            opacity: showPortfolioWord ? 1 : 0,
            clipPath: isBuilding ? `inset(0 ${100 - portfolioWidthPct}% 0 0)` : undefined
          }}
          className="absolute inset-x-0 top-2 sm:top-4 lg:top-6 flex justify-center z-10 pointer-events-none select-none overflow-hidden px-1 sm:px-2"
        >
          <div
            ref={bgWordRef}
            style={
              isPortfolioWireframe
                ? {
                    WebkitTextStroke: '1.5px #ff2a4b',
                    color: 'transparent',
                    background: 'none'
                  }
                : undefined
            }
            className={`monumental-portfolio-text w-full text-center transition-transform duration-300 ease-out relative ${
              showPortfolioGuideBox ? 'outline-1 outline-dashed outline-[#ff2a4b]/60' : ''
            }`}
            aria-hidden="true"
          >
            PORTFOLIO
            {showPortfolioGuideBox && (
              <span className="absolute top-1 left-2 px-1.5 py-0.5 bg-[#e11d48] text-white font-mono text-[9px] tracking-wider uppercase leading-none">
                {isPortfolioWireframe
                  ? `Arch_Agent · Wireframe ${Math.round(portfolioWidthPct)}%`
                  : 'Arch_Agent · Gradient Fill Locked'}
              </span>
            )}
          </div>
        </div>

        {/* LAYER 2 (z-5 while behind text during build, z-15 once Vision_Agent clicks [Bring to Front ↑]): Frameless Center Cutout Portrait */}
        <div
          className={`absolute inset-x-0 bottom-0 ${
            isPortraitInFront ? 'z-15' : 'z-5'
          } flex justify-center items-end pointer-events-none`}
        >
          <div
            ref={portraitWrapRef}
            style={
              isBuilding
                ? {
                    opacity: showPortrait ? (isPortraitInFront ? 1 : 0.68) : 0,
                    transform: `translate3d(${portraitDragX}px, ${portraitDragY}px, 0) scale(${portraitScale})`
                  }
                : undefined
            }
            className={`hero-portrait-entrance relative w-[66vw] max-w-[290px] sm:w-[50vw] sm:max-w-[450px] lg:w-full lg:max-w-[660px] xl:max-w-[720px] flex justify-center items-end transition-transform duration-75 ease-out pointer-events-auto ${
              showPortraitGuideBox
                ? isPortraitInFront
                  ? 'border border-dashed border-[#10b981]/80 bg-[#10b981]/[0.03]'
                  : 'border border-dashed border-[#f59e0b]/85 bg-[#f59e0b]/[0.04]'
                : ''
            }`}
            data-cursor="explore"
          >
            {/* CAD Corner Handles & Interactive [Bring to Front ↑] Layer Toolbar while Vision_Agent is working */}
            {showPortraitGuideBox && (
              <>
                <span className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-[#10b981] border border-white z-30" />
                <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-[#10b981] border border-white z-30" />
                <span className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-[#10b981] border border-white z-30" />
                <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-[#10b981] border border-white z-30" />
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-2 py-0.5 bg-[#0c0c10]/95 border border-white/20 font-mono text-[8px] sm:text-[9.5px] uppercase tracking-wider text-white whitespace-nowrap shadow-xl">
                  <span
                    className={`px-1 py-0.5 text-[7.5px] sm:text-[8.5px] font-bold ${
                      isPortraitInFront ? 'bg-[#10b981] text-black' : 'bg-[#dc2626] text-white'
                    }`}
                  >
                    {isPortraitInFront ? 'z-index: 15 (FRONT)' : 'z-index: 5 (OCLUDED)'}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 border transition-all duration-100 ${
                      isVisionClickingFrontBtn
                        ? 'bg-[#10b981] text-black border-white scale-90 font-bold'
                        : isPortraitInFront
                        ? 'border-[#10b981]/60 text-[#10b981]'
                        : 'border-[#f59e0b] text-[#f59e0b]'
                    }`}
                  >
                    {isPortraitInFront ? '✓ In Front of Text' : '[Bring to Front ↑]'}
                  </span>
                </div>
              </>
            )}

            {/* Ambient Dual-Tone Rim Backlight Plumes (Cyan Left, Crimson Right) */}
            {showPortraitRimGlow && (
              <>
                <div
                  className="absolute left-[14%] top-[20%] w-24 sm:w-48 lg:w-64 h-32 sm:h-64 lg:h-80 rounded-full blur-[50px] sm:blur-[90px] pointer-events-none opacity-80 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(56, 189, 248, 0.34) 0%, transparent 70%)'
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute right-[12%] top-[16%] w-28 sm:w-56 lg:w-72 h-36 sm:h-72 lg:h-96 rounded-full blur-[55px] sm:blur-[95px] pointer-events-none opacity-90 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(225, 29, 72, 0.52) 0%, transparent 70%)'
                  }}
                  aria-hidden="true"
                />
              </>
            )}

            {/* Uploaded Portrait Cutout Graded to Match Crimson Noir Theme */}
            <img
              src={processedPortraitUrl}
              alt="Rifat Ashhab Bin Sharif — Full-Stack Software Engineer & AI Architect"
              className="relative z-10 w-full h-auto max-h-[295px] sm:max-h-[465px] lg:max-h-[700px] xl:max-h-[750px] object-contain object-bottom portrait-bottom-mask select-none"
              style={{
                filter: showPortraitRimGlow
                  ? 'drop-shadow(10px -2px 24px rgba(225, 29, 72, 0.42)) drop-shadow(-10px 2px 24px rgba(56, 189, 248, 0.24)) drop-shadow(0 18px 36px rgba(0, 0, 0, 0.9))'
                  : 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.85))'
              }}
            />
          </div>
        </div>

        {/* LAYER 3 (z-20): Foreground Editorial Grid (Minimal on Phone, Full Detail on Tablet/Desktop) */}
        <div className="relative z-20 w-full grid grid-cols-12 gap-2 sm:gap-4 lg:gap-8 items-end pb-3.5 sm:pb-8 lg:pb-12 pt-28 sm:pt-28 lg:pt-44 pointer-events-none">
          {/* LEFT COLUMN: Minimal Intro & CTA on Phone; Full Bio & Dual Buttons on Tablet/Desktop */}
          <div
            className={`col-span-5 sm:col-span-4 lg:col-span-4 flex flex-col items-start pointer-events-auto relative ${
              isBuilding && buildProgress >= 0.22 && buildProgress < 0.89
                ? 'p-1.5 border border-dashed border-[#38bdf8]/60 bg-[#38bdf8]/[0.02]'
                : ''
            }`}
          >
            {/* Handwritten Script ("Hello, I'm" typed letter-by-letter) */}
            <span className="font-script text-2xl sm:text-4xl lg:text-[3.5rem] text-[var(--text-main)] -rotate-6 mb-0.5 sm:mb-1 ml-0.5 sm:ml-1 select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] min-h-[1.2em] inline-flex items-center">
              <span>{scriptState.text}</span>
              {isBuilding && scriptState.isTyping && (
                <span className="inline-block w-[2px] h-[0.75em] bg-[#38bdf8] ml-1 animate-pulse" />
              )}
            </span>

            {/* RIFAT. Headline with Character-by-Character Typo ("RIFTA.") & Backspace Fix */}
            <div className="relative">
              <h1
                className={`font-display text-5xl sm:text-7xl lg:text-8xl xl:text-[7.25rem] tracking-tight leading-[0.86] text-[var(--text-main)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] min-h-[0.86em] ${
                  nameState.isError
                    ? 'underline decoration-wavy decoration-[#ff2a4b] decoration-2 text-[#ff8fa3]'
                    : ''
                }`}
              >
                {nameState.text.endsWith('.') ? (
                  <>
                    {nameState.text.slice(0, -1)}
                    <span className="text-[#e11d48]">.</span>
                  </>
                ) : (
                  nameState.text
                )}
                {isBuilding && nameState.isTyping && (
                  <span className="inline-block w-[3px] h-[0.75em] bg-[#38bdf8] ml-1 animate-pulse align-middle" />
                )}
              </h1>

              {isBuilding && nameState.isError && (
                <span className="absolute -top-4 left-0 px-1.5 py-0.5 bg-[#dc2626] text-white font-mono text-[8px] uppercase tracking-wider whitespace-nowrap shadow">
                  ⚠ TYPO: &quot;{nameState.text}&quot; → BACKSPACING
                </span>
              )}
              {isBuilding && nameState.isFixed && (
                <span className="absolute -top-4 left-0 px-1.5 py-0.5 bg-[#10b981] text-white font-mono text-[8px] uppercase tracking-wider whitespace-nowrap shadow">
                  ✓ FIXED: &quot;RIFAT.&quot;
                </span>
              )}
            </div>

            {/* ASHHAB BIN SHARIF typed character-by-character */}
            <div
              style={{ opacity: subNameState.text ? 1 : 0 }}
              className="hidden sm:block overflow-hidden mt-1 transition-opacity duration-150 min-h-[1.2em]"
            >
              <p className="font-mono text-[10px] lg:text-xs tracking-[0.22em] uppercase text-[var(--text-main)]">
                {subNameState.text}
                {isBuilding && subNameState.isTyping && (
                  <span className="inline-block w-[2px] h-[0.9em] bg-[#38bdf8] ml-1 animate-pulse align-middle" />
                )}
              </p>
            </div>

            {/* Role Subtitle with Character-by-Character Typo ("ENGINER") & Backspace Fix */}
            <div className="relative mt-1 sm:mt-2 min-h-[1.4em]">
              <p
                className={`font-sans text-[10px] sm:text-sm lg:text-lg font-extrabold tracking-wide uppercase leading-tight text-[#e11d48] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] ${
                  roleState.isError
                    ? 'underline decoration-wavy decoration-[#ff2a4b] bg-[#e11d48]/20 px-1'
                    : ''
                }`}
              >
                <span className="sm:hidden">{roleState.mobileText}</span>
                <span className="hidden sm:inline">
                  {roleState.line1}
                  {roleState.line2 && (
                    <>
                      <br />
                      {roleState.line2}
                    </>
                  )}
                </span>
                {isBuilding && roleState.isTyping && (
                  <span className="inline-block w-[2px] h-[0.9em] bg-[#38bdf8] ml-1 animate-pulse align-middle" />
                )}
              </p>
            </div>

            {/* Long bio hidden on phone (<640px) to keep mobile view ultra-clean; streams character-by-character during build */}
            <p
              style={{
                opacity: showBio ? 1 : 0
              }}
              className="hidden sm:block mt-3 lg:mt-4 text-xs lg:text-[15px] text-[var(--text-muted)] max-w-[260px] lg:max-w-[345px] leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] min-h-[5.5em]"
            >
              {isBuilding ? (
                <>
                  {typedBioText}
                  {isBioTyping && (
                    <span className="inline-block w-[2px] h-[0.95em] bg-[#38bdf8] ml-0.5 animate-pulse align-middle" />
                  )}
                </>
              ) : (
                <>
                  Specializing in real-time bot infrastructure, generative AI pipelines, and
                  high-performance web systems. Founder of{' '}
                  <strong className="text-[var(--text-main)] font-semibold">Vixa Corp</strong>,
                  building end-to-end architectures that drive measurable business outcomes (+40%
                  inbound leads).
                </>
              )}
            </p>

            {/* Primary & Secondary CTA Buttons (Rubber-band framed by UI_Agent -> Styled on click) */}
            <div className="mt-2.5 sm:mt-5 lg:mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5 lg:gap-3">
              {showPrimaryBtn && (
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  style={
                    isBuilding && !isPrimaryBtnStyled
                      ? {
                          transform: `scaleX(${primaryBtnWidthScale})`,
                          transformOrigin: 'left center'
                        }
                      : undefined
                  }
                  className={`px-3.5 py-2 sm:px-5 sm:py-2.5 lg:px-7 lg:py-3.5 text-[10px] sm:text-xs lg:text-sm font-medium inline-flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer relative ${
                    isPrimaryBtnStyled
                      ? 'bg-[#e11d48] hover:bg-[#be123c] text-white shadow-[0_10px_30px_rgba(225,29,72,0.35)]'
                      : 'bg-[#f59e0b]/10 border border-dashed border-[#f59e0b] text-[#f59e0b] font-mono'
                  }`}
                  data-cursor="link"
                >
                  <span>{isPrimaryBtnStyled ? 'See my work' : 'See my work'}</span>
                  <span>↓</span>
                </button>
              )}

              {showSecondaryBtn && (
                <a
                  href={CV_PDF_URL}
                  download={CV_DOWNLOAD_FILENAME}
                  target="_blank"
                  rel="noreferrer"
                  style={
                    isBuilding && !isSecondaryBtnStyled
                      ? {
                          transform: `scaleX(${secondaryBtnWidthScale})`,
                          transformOrigin: 'left center'
                        }
                      : undefined
                  }
                  className={`hidden sm:inline-flex px-4 py-2.5 lg:px-5 lg:py-3.5 text-[11px] lg:text-xs font-mono uppercase tracking-wider items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0 ${
                    isSecondaryBtnStyled
                      ? 'border border-[var(--border-hairline)] hover:border-[#e11d48] bg-[var(--bg-main)]/75 backdrop-blur-sm text-[var(--text-main)]'
                      : 'border border-dashed border-[#f59e0b] bg-[#f59e0b]/10 text-[#f59e0b]'
                  }`}
                  data-cursor="link"
                >
                  <span>Download CV</span>
                  <span className="text-[#e11d48]">↓</span>
                </a>
              )}
            </div>

            {/* Location Tag below CTA (Tablet/Desktop only) */}
            <div
              style={{ opacity: showLocation ? 1 : 0 }}
              className="hidden sm:flex mt-4 lg:mt-6 font-mono text-[9px] lg:text-[11px] tracking-widest uppercase text-[var(--text-muted)] items-center gap-2.5 transition-opacity duration-300"
            >
              <i className="fas fa-location-dot text-[#e11d48]" />
              <span>SUBANG JAYA, MALAYSIA · VIXA CORP</span>
            </div>
          </div>

          {/* CENTER SPACER FOR PORTRAIT (col-span-3 on phone, col-span-4 on tablet/desktop) */}
          <div className="col-span-3 sm:col-span-4 lg:col-span-4 pointer-events-none" />

          {/* RIGHT COLUMN: Compact Non-Overlapping KPIs on Phone; Full Metric Rows on Tablet/Desktop */}
          <div
            className={`col-span-4 sm:col-span-4 lg:col-span-4 flex flex-col items-end sm:items-stretch justify-end sm:pl-3 lg:pl-6 pointer-events-auto ${
              isBuilding && buildProgress >= 0.28 && buildProgress < 0.9
                ? 'p-1.5 border border-dashed border-[#a855f7]/60 bg-[#a855f7]/[0.02]'
                : ''
            }`}
          >
            {/* Top Purpose Badge (Tablet/Desktop only to keep phone minimal) */}
            <div
              style={{
                opacity: showPurposeBadge ? 1 : 0,
                transform: showPurposeBadge ? 'translateY(0)' : 'translateY(8px)'
              }}
              className="hidden sm:flex items-center gap-3 lg:gap-4 pb-4 lg:pb-6 transition-all duration-300"
            >
              <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-full border border-[#e11d48]/70 bg-[var(--bg-main)]/70 backdrop-blur-sm flex items-center justify-center text-[#e11d48] shrink-0">
                <span className="animate-spin-slow text-base lg:text-lg leading-none select-none">
                  ✳
                </span>
              </div>
              <div className="font-sans text-xs lg:text-sm font-medium leading-snug text-[var(--text-main)]">
                <p>Every pixel.</p>
                <p className="text-[var(--text-muted)]">A purpose.</p>
              </div>
            </div>

            {/* 3 Stacked Metric Rows (Live count-up driven by Data_Agent) */}
            <div className="w-full max-w-[115px] sm:max-w-none divide-y divide-[var(--border-hairline)] border-t border-b border-[var(--border-hairline)] bg-[var(--bg-main)]/45 backdrop-blur-[2px] lg:bg-transparent lg:backdrop-blur-none">
              {/* Row 1 */}
              <div
                style={{
                  opacity: showMetric1 ? 1 : 0,
                  transform: showMetric1 ? 'translateX(0)' : 'translateX(12px)'
                }}
                className="py-1.5 sm:py-3 lg:py-4 flex flex-col items-end text-right sm:flex-row sm:items-center sm:text-left sm:gap-4 lg:gap-5 transition-all duration-300"
              >
                <span
                  className="font-display text-2xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] text-[#e11d48] leading-none sm:min-w-[96px] lg:min-w-[136px] xl:min-w-[152px] shrink-0 tabular-nums whitespace-nowrap"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  +{metric1Val}%
                </span>
                <div className="font-mono text-[8px] sm:text-[9.5px] lg:text-[11px] uppercase tracking-wider leading-tight sm:leading-relaxed mt-0.5 sm:mt-0 min-w-0">
                  <p className="text-[var(--text-main)] font-semibold">INBOUND ROI</p>
                  <p className="hidden sm:block text-[var(--text-muted)]">SUB-SECOND WEB SYSTEMS</p>
                </div>
              </div>

              {/* Row 2 */}
              <div
                style={{
                  opacity: showMetric2 ? 1 : 0,
                  transform: showMetric2 ? 'translateX(0)' : 'translateX(12px)'
                }}
                className="py-1.5 sm:py-3 lg:py-4 flex flex-col items-end text-right sm:flex-row sm:items-center sm:text-left sm:gap-4 lg:gap-5 transition-all duration-300"
              >
                <span
                  className="font-display text-2xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] text-[#e11d48] leading-none sm:min-w-[96px] lg:min-w-[136px] xl:min-w-[152px] shrink-0 tabular-nums whitespace-nowrap"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {metric2Val}/100
                </span>
                <div className="font-mono text-[8px] sm:text-[9.5px] lg:text-[11px] uppercase tracking-wider leading-tight sm:leading-relaxed mt-0.5 sm:mt-0 min-w-0">
                  <p className="text-[var(--text-main)] font-semibold">
                    <span className="sm:hidden">LVL 6 AI CERT</span>
                    <span className="hidden sm:inline">AI VISIONARY – LEVEL 6</span>
                  </p>
                  <p className="hidden sm:block text-[var(--text-muted)]">NATIONAL CERT #009686</p>
                </div>
              </div>

              {/* Row 3 */}
              <div
                style={{
                  opacity: showMetric3 ? 1 : 0,
                  transform: showMetric3 ? 'translateX(0)' : 'translateX(12px)'
                }}
                className="py-1.5 sm:py-3 lg:py-4 flex flex-col items-end text-right sm:flex-row sm:items-center sm:text-left sm:gap-4 lg:gap-5 transition-all duration-300"
              >
                <span
                  className="font-display text-2xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] text-[#e11d48] leading-none sm:min-w-[96px] lg:min-w-[136px] xl:min-w-[152px] shrink-0 tabular-nums whitespace-nowrap"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {metric3Val}+
                </span>
                <div className="font-mono text-[8px] sm:text-[9.5px] lg:text-[11px] uppercase tracking-wider leading-tight sm:leading-relaxed mt-0.5 sm:mt-0 min-w-0">
                  <p className="text-[var(--text-main)] font-semibold">
                    <span className="sm:hidden">DEPLOYMENTS</span>
                    <span className="hidden sm:inline">PRODUCTION DEPLOYMENTS</span>
                  </p>
                  <a
                    href="https://vixa.pro"
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-flex text-[var(--text-muted)] hover:text-[#e11d48] transition-colors items-center gap-1"
                    data-cursor="link"
                  >
                    <span>VIXA CORP · FONITY STUDIOS</span>
                    <span className="text-[#e11d48]">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Hero Bottom Bar (Single clean row on phone, 3-part bar on desktop) */}
      <div
        style={{
          opacity: showBottomBar ? 1 : 0,
          transform: showBottomBar ? 'translateY(0)' : 'translateY(10px)'
        }}
        className="border-t border-[var(--border-hairline)] bg-[var(--bg-main)]/90 backdrop-blur-md z-30 transition-all duration-300"
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-8 py-2.5 sm:py-3.5 flex flex-row items-center justify-between gap-2 font-mono text-[9.5px] sm:text-[11px]">
          {/* Left */}
          <a
            href="https://vixa.pro"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 sm:gap-3 group"
            data-cursor="link"
          >
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[var(--border-hairline)] group-hover:border-[#e11d48] flex items-center justify-center text-[var(--text-main)] group-hover:text-[#e11d48] transition-colors">
              <i className="fas fa-play text-[7px] sm:text-[8px] ml-0.5" />
            </span>
            <span className="tracking-widest uppercase text-[var(--text-main)] font-medium">
              <span className="sm:hidden">FEATURED:</span>
              <span className="hidden sm:inline">VIEW FEATURED BUILD</span>
            </span>
            <span className="tracking-widest uppercase text-[#e11d48] font-semibold">
              VIXA.PRO
            </span>
          </a>

          {/* Center / Right on Phone */}
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2"
            data-cursor="link"
          >
            <span>SCROLL</span>
            <span className="hidden sm:inline">TO DISCOVER</span>
            <span className="text-[#e11d48]">↓</span>
          </button>

          {/* Right (Desktop/Tablet only) */}
          <span className="hidden md:inline tracking-widest uppercase text-[var(--text-muted)]">
            DOSSIER // TECH_ARCH_2026
          </span>
        </div>
      </div>
    </section>
  );
};
