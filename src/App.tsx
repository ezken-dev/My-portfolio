/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PortfolioSection } from './components/PortfolioSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { InquiryModal, LightboxModal } from './components/Modals';
import { ProjectItem } from './data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [activeSection, setActiveSection] = useState('projects');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);

  // Permanently Active Lenis Smooth Scroll + GSAP ScrollTrigger Ticker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Top 2px Crimson Scroll Progress & Active Section Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(pct);

      const sectionIds = ['projects', 'about', 'experience', 'contact'];
      const offset = window.innerHeight * 0.35;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync body classes for Light Mode
  useEffect(() => {
    document.body.classList.toggle('light-mode', isLightMode);
    document.documentElement.classList.toggle('dark', !isLightMode);
  }, [isLightMode]);

  // Radial Blur-Morph Theme Toggle Handler
  const handleToggleTheme = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const nextLight = !isLightMode;

      const glare = document.createElement('div');
      glare.className = 'theme-glare-burst';
      const rgb = nextLight ? '246, 245, 242' : '8, 8, 10';
      glare.style.background = `radial-gradient(circle, rgba(${rgb},1) 0%, rgba(225,29,72,0.35) 45%, rgba(${rgb},0) 70%)`;
      glare.style.width = '280px';
      glare.style.height = '280px';
      glare.style.left = `${x}px`;
      glare.style.top = `${y}px`;
      document.body.appendChild(glare);

      // Force reflow
      void glare.offsetWidth;
      glare.style.transform = 'translate(-50%, -50%) scale(18)';
      glare.style.opacity = '0';

      window.setTimeout(() => {
        setIsLightMode(nextLight);
      }, 140);

      window.setTimeout(() => {
        glare.remove();
      }, 750);
    },
    [isLightMode]
  );

  // Smooth Section Navigation via Lenis
  const handleNavigate = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: -64,
        duration: 1.35
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleScrollTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] relative selection:bg-[#e11d48] selection:text-white">
      {/* 1. Executive Protocol Preloader */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* 2. Top-of-Viewport 2px Crimson Scroll Progress Bar */}
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 right-0 h-[2px] z-[9995] bg-transparent pointer-events-none no-print"
      >
        <div
          className="h-full bg-[#ff2a4b] shadow-[0_0_12px_#e11d48] transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 3. Fixed Tactile SVG Fractal-Noise Film Grain Overlay */}
      <div
        id="film-grain"
        className="fixed inset-0 pointer-events-none z-[9990] opacity-[0.035] no-print"
        aria-hidden="true"
      >
        <svg className="w-full h-full">
          <filter id="crimson-noir-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#crimson-noir-noise)" />
        </svg>
      </div>

      {/* 4. Permanently Active Interactive Lerp Custom Cursor */}
      <CustomCursor motionEnabled={true} />

      {/* 5. Fixed Architectural Navbar */}
      <Navbar
        activeSection={activeSection}
        isLightMode={isLightMode}
        onToggleTheme={handleToggleTheme}
        onNavigate={handleNavigate}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

      {/* 6. Core Brutalist-Editorial Sections */}
      <main className="relative z-10">
        <HeroSection
          isLoaded={isLoaded}
          onNavigate={handleNavigate}
        />

        <PortfolioSection
          onSelectProjectLightbox={(project) => setLightboxProject(project)}
        />

        <AboutSection />

        <ExperienceSection />

        <ContactSection
          onOpenInquiry={() => setIsInquiryOpen(true)}
          onScrollTop={handleScrollTop}
        />
      </main>

      {/* 7. High-Resolution 3D Render / Project Lightbox Modal */}
      <LightboxModal
        project={lightboxProject}
        onClose={() => setLightboxProject(null)}
      />

      {/* 8. Interactive Project Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
