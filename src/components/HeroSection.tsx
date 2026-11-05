import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CV_DOWNLOAD_FILENAME, CV_PDF_URL } from '../data/portfolioData';

const UPLOADED_PORTRAIT_PATH = '/assets/aistudio/Portfolio_Picture_d07ae912.png';

interface HeroSectionProps {
  isLoaded: boolean;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isLoaded,
  onNavigate
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const bgWordRef = useRef<HTMLDivElement>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const [processedPortraitUrl, setProcessedPortraitUrl] = useState<string>(UPLOADED_PORTRAIT_PATH);

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

  // Staggered GSAP Entrance Timeline when preloader finishes
  useEffect(() => {
    if (!isLoaded || !heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal-line',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.08,
          ease: 'power4.out'
        }
      );

      gsap.fromTo(
        '.hero-portrait-entrance',
        { y: 40, scale: 0.96, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.25,
          delay: 0.1,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        '.hero-fade-item',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.08,
          delay: 0.2,
          ease: 'power3.out'
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // Permanent Mouse Parallax on Monumental PORTFOLIO wordmark & Frameless Cutout Portrait
  useEffect(() => {
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
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative lg:min-h-screen pt-16 flex flex-col justify-between border-b border-[var(--border-hairline)] overflow-hidden bg-[var(--bg-main)]"
    >
      {/* 1. Top Metadata Sub-Bar (Minimal 1-line on phone, full 2-line on tablet/desktop) */}
      <div className="border-b border-[var(--border-hairline)] bg-[var(--bg-main)]/75 backdrop-blur-sm z-30">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-8 py-2 sm:py-3 flex flex-row items-center justify-between gap-2">
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#e11d48]">
              FULL-STACK ENGINEER &amp; AI ARCHITECT
            </span>
            <span className="hidden sm:block font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-muted)] mt-0.5">
              FOUNDER @ VIXA CORP · CO-FOUNDER @ FONITY STUDIOS
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[8.5px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[var(--text-muted)] shrink-0">
            <span className="text-[#ff2a4b] font-bold text-xs sm:text-sm leading-none" aria-hidden="true">
              •
            </span>
            <span className="sm:hidden">MALAYSIA</span>
            <span className="hidden sm:inline">MALAYSIA · LEVEL 6 AI VISIONARY [95/100]</span>
          </div>
        </div>
      </div>

      {/* 2. Main Hero Stage: Monumental PORTFOLIO Backdrop + Frameless Center Cutout + Minimal Left/Right Framing */}
      <div className="relative flex-1 flex flex-col justify-end min-h-[325px] sm:min-h-[520px] lg:min-h-[760px] max-w-[1440px] w-full mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-6 pb-0">
        {/* LAYER 1 (z-10): Monumental Background Wordmark (PORTFOLIO) */}
        <div className="absolute inset-x-0 top-2 sm:top-4 lg:top-6 flex justify-center z-10 pointer-events-none select-none overflow-hidden px-1 sm:px-2">
          <div
            ref={bgWordRef}
            className="monumental-portfolio-text w-full text-center transition-transform duration-300 ease-out"
            aria-hidden="true"
          >
            PORTFOLIO
          </div>
        </div>

        {/* LAYER 2 (z-15): Frameless Center Cutout Portrait Directly Overlapping "RTFO" */}
        <div className="absolute inset-x-0 bottom-0 z-15 flex justify-center items-end pointer-events-none">
          <div
            ref={portraitWrapRef}
            className="hero-portrait-entrance relative w-[66vw] max-w-[290px] sm:w-[50vw] sm:max-w-[450px] lg:w-full lg:max-w-[660px] xl:max-w-[720px] flex justify-center items-end transition-transform duration-300 ease-out pointer-events-auto"
            data-cursor="explore"
          >
            {/* Ambient Dual-Tone Rim Backlight Plumes (Cyan Left, Crimson Right) */}
            <div
              className="absolute left-[14%] top-[20%] w-24 sm:w-48 lg:w-64 h-32 sm:h-64 lg:h-80 rounded-full blur-[50px] sm:blur-[90px] pointer-events-none opacity-80"
              style={{
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.34) 0%, transparent 70%)'
              }}
              aria-hidden="true"
            />
            <div
              className="absolute right-[12%] top-[16%] w-28 sm:w-56 lg:w-72 h-36 sm:h-72 lg:h-96 rounded-full blur-[55px] sm:blur-[95px] pointer-events-none opacity-90"
              style={{
                background: 'radial-gradient(circle, rgba(225, 29, 72, 0.52) 0%, transparent 70%)'
              }}
              aria-hidden="true"
            />

            {/* Uploaded Portrait Cutout Graded to Match Crimson Noir Theme */}
            <img
              src={processedPortraitUrl}
              alt="Rifat Ashhab Bin Sharif — Full-Stack Software Engineer & AI Architect"
              className="relative z-10 w-full h-auto max-h-[295px] sm:max-h-[465px] lg:max-h-[700px] xl:max-h-[750px] object-contain object-bottom portrait-bottom-mask select-none"
              style={{
                filter:
                  'drop-shadow(10px -2px 24px rgba(225, 29, 72, 0.42)) drop-shadow(-10px 2px 24px rgba(56, 189, 248, 0.24)) drop-shadow(0 18px 36px rgba(0, 0, 0, 0.9))'
              }}
            />
          </div>
        </div>

        {/* LAYER 3 (z-20): Foreground Editorial Grid (Minimal on Phone, Full Detail on Tablet/Desktop) */}
        <div className="relative z-20 w-full grid grid-cols-12 gap-2 sm:gap-4 lg:gap-8 items-end pb-3.5 sm:pb-8 lg:pb-12 pt-28 sm:pt-28 lg:pt-44 pointer-events-none">
          {/* LEFT COLUMN: Minimal Intro & CTA on Phone; Full Bio & Dual Buttons on Tablet/Desktop */}
          <div className="col-span-5 sm:col-span-4 lg:col-span-4 flex flex-col items-start pointer-events-auto">
            <span className="font-script text-2xl sm:text-4xl lg:text-[3.5rem] text-[var(--text-main)] -rotate-6 mb-0.5 sm:mb-1 ml-0.5 sm:ml-1 select-none hero-fade-item drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Hello, I&apos;m
            </span>

            <div className="overflow-hidden">
              <h1 className="hero-reveal-line font-display text-5xl sm:text-7xl lg:text-8xl xl:text-[7.25rem] tracking-tight leading-[0.86] text-[var(--text-main)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                RIFAT<span className="text-[#e11d48]">.</span>
              </h1>
            </div>

            <div className="hidden sm:block overflow-hidden mt-1">
              <p className="hero-reveal-line font-mono text-[10px] lg:text-xs tracking-[0.22em] uppercase text-[var(--text-main)]">
                ASHHAB BIN SHARIF
              </p>
            </div>

            <div className="overflow-hidden mt-1 sm:mt-2">
              <p className="hero-reveal-line font-sans text-[10px] sm:text-sm lg:text-lg font-extrabold tracking-wide uppercase leading-tight text-[#e11d48] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                <span className="sm:hidden">AI ARCHITECT &amp; DEV</span>
                <span className="hidden sm:inline">
                  FULL-STACK ENGINEER &amp;
                  <br />
                  AI ARCHITECT
                </span>
              </p>
            </div>

            {/* Long bio hidden on phone (<640px) to keep mobile view ultra-clean */}
            <p className="hidden sm:block hero-fade-item mt-3 lg:mt-4 text-xs lg:text-[15px] text-[var(--text-muted)] max-w-[260px] lg:max-w-[345px] leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Specializing in real-time bot infrastructure, generative AI pipelines, and
              high-performance web systems. Founder of{' '}
              <strong className="text-[var(--text-main)] font-semibold">Vixa Corp</strong>, building
              end-to-end architectures that drive measurable business outcomes (+40% inbound leads).
            </p>

            {/* Primary Crimson CTA Button (plus CV button on sm:+) */}
            <div className="hero-fade-item mt-2.5 sm:mt-5 lg:mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5 lg:gap-3">
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="bg-[#e11d48] hover:bg-[#be123c] text-white px-3.5 py-2 sm:px-5 sm:py-2.5 lg:px-7 lg:py-3.5 text-[10px] sm:text-xs lg:text-sm font-medium inline-flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-[0_10px_30px_rgba(225,29,72,0.35)]"
                data-cursor="link"
              >
                <span>See my work</span>
                <span>↓</span>
              </button>

              <a
                href={CV_PDF_URL}
                download={CV_DOWNLOAD_FILENAME}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex px-4 py-2.5 lg:px-5 lg:py-3.5 text-[11px] lg:text-xs font-mono uppercase tracking-wider border border-[var(--border-hairline)] hover:border-[#e11d48] bg-[var(--bg-main)]/75 backdrop-blur-sm text-[var(--text-main)] items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                data-cursor="link"
              >
                <span>Download CV</span>
                <span className="text-[#e11d48]">↓</span>
              </a>
            </div>

            {/* Location Tag below CTA (Tablet/Desktop only) */}
            <div className="hidden sm:flex hero-fade-item mt-4 lg:mt-6 font-mono text-[9px] lg:text-[11px] tracking-widest uppercase text-[var(--text-muted)] items-center gap-2.5">
              <i className="fas fa-location-dot text-[#e11d48]" />
              <span>SUBANG JAYA, MALAYSIA · VIXA CORP</span>
            </div>
          </div>

          {/* CENTER SPACER FOR PORTRAIT (col-span-3 on phone, col-span-4 on tablet/desktop) */}
          <div className="col-span-3 sm:col-span-4 lg:col-span-4 pointer-events-none" />

          {/* RIGHT COLUMN: Compact Non-Overlapping KPIs on Phone; Full Metric Rows on Tablet/Desktop */}
          <div className="col-span-4 sm:col-span-4 lg:col-span-4 flex flex-col items-end sm:items-stretch justify-end sm:pl-3 lg:pl-6 pointer-events-auto">
            {/* Top Purpose Badge (Tablet/Desktop only to keep phone minimal) */}
            <div className="hidden sm:flex hero-fade-item items-center gap-3 lg:gap-4 pb-4 lg:pb-6">
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

            {/* 3 Stacked Metric Rows (Compact right-aligned on phone, side-by-side on tablet/desktop) */}
            <div className="w-full max-w-[115px] sm:max-w-none divide-y divide-[var(--border-hairline)] border-t border-b border-[var(--border-hairline)] bg-[var(--bg-main)]/45 backdrop-blur-[2px] lg:bg-transparent lg:backdrop-blur-none">
              {/* Row 1 */}
              <div className="hero-fade-item py-1.5 sm:py-3 lg:py-4 flex flex-col items-end text-right sm:flex-row sm:items-center sm:text-left sm:gap-4 lg:gap-6">
                <span
                  className="font-display text-2xl sm:text-4xl lg:text-6xl text-[#e11d48] leading-none sm:w-20 lg:w-28 shrink-0 tabular-nums"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  +40%
                </span>
                <div className="font-mono text-[8px] sm:text-[9.5px] lg:text-[11px] uppercase tracking-wider leading-tight sm:leading-relaxed mt-0.5 sm:mt-0">
                  <p className="text-[var(--text-main)] font-semibold">INBOUND ROI</p>
                  <p className="hidden sm:block text-[var(--text-muted)]">SUB-SECOND WEB SYSTEMS</p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="hero-fade-item py-1.5 sm:py-3 lg:py-4 flex flex-col items-end text-right sm:flex-row sm:items-center sm:text-left sm:gap-4 lg:gap-6">
                <span
                  className="font-display text-2xl sm:text-4xl lg:text-6xl text-[#e11d48] leading-none sm:w-20 lg:w-28 shrink-0 tabular-nums"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  95/100
                </span>
                <div className="font-mono text-[8px] sm:text-[9.5px] lg:text-[11px] uppercase tracking-wider leading-tight sm:leading-relaxed mt-0.5 sm:mt-0">
                  <p className="text-[var(--text-main)] font-semibold">
                    <span className="sm:hidden">LVL 6 AI CERT</span>
                    <span className="hidden sm:inline">AI VISIONARY – LEVEL 6</span>
                  </p>
                  <p className="hidden sm:block text-[var(--text-muted)]">NATIONAL CERT #009686</p>
                </div>
              </div>

              {/* Row 3 */}
              <div className="hero-fade-item py-1.5 sm:py-3 lg:py-4 flex flex-col items-end text-right sm:flex-row sm:items-center sm:text-left sm:gap-4 lg:gap-6">
                <span
                  className="font-display text-2xl sm:text-4xl lg:text-6xl text-[#e11d48] leading-none sm:w-20 lg:w-28 shrink-0 tabular-nums"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  20+
                </span>
                <div className="font-mono text-[8px] sm:text-[9.5px] lg:text-[11px] uppercase tracking-wider leading-tight sm:leading-relaxed mt-0.5 sm:mt-0">
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
      <div className="border-t border-[var(--border-hairline)] bg-[var(--bg-main)]/90 backdrop-blur-md z-30">
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
