import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CV_DOWNLOAD_FILENAME,
  CV_PDF_URL,
  EDUCATION_INFO,
  NATIONAL_CERTIFICATION,
  PROCESS_STEPS,
  TECH_ARSENAL_CATEGORIES
} from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-heading-line',
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 border-b border-[var(--border-hairline)] relative"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* 1. Top Editorial Split Header (Synced with EXEC_BIO from 2026 CV) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-14">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
              02 <span className="text-[#e11d48]">/</span> BEHIND THE CRAFT &amp; TECH ARSENAL
            </p>
            <div className="overflow-hidden">
              <h2 className="about-heading-line font-display text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[0.92] text-[var(--text-main)]">
                MORE THAN CODE.
              </h2>
            </div>
            <div className="overflow-hidden">
              <p className="about-heading-line font-display text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[0.92] text-[var(--text-main)]">
                CRAFTING <span className="text-[#e11d48]">EXPERIENCES.</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <p className="max-w-md text-[var(--text-muted)] leading-relaxed text-sm md:text-base">
              Full-Stack Software Engineer &amp; Entrepreneur specializing in real-time bot
              infrastructure, generative AI pipelines, and high-performance web systems. Founder of{' '}
              <a
                href="https://vixa.pro"
                target="_blank"
                rel="noreferrer"
                className="text-[#e11d48] hover:underline font-semibold"
                data-cursor="link"
              >
                Vixa Corp
              </a>{' '}
              &amp; Co-Founder of <strong className="text-[var(--text-main)]">Fonity Studios</strong>,
              with proven ability in building end-to-end architectures that drive measurable
              business outcomes (<strong className="text-[var(--text-main)]">+40% inbound leads</strong>).
            </p>
          </div>
        </div>

        {/* 2. 3-Column Architectural Grid Below a 1px Horizontal Divider */}
        <div className="border-t border-b border-[var(--border-hairline)] grid grid-cols-1 lg:grid-cols-12">
          {/* COLUMN 1 (lg:col-span-4, with right 1px border on desktop): TECH ARSENAL & ACADEMICS */}
          <div className="lg:col-span-4 lg:border-r border-b lg:border-b-0 border-[var(--border-hairline)] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl tracking-wide text-[var(--text-main)]">
                  TECH ARSENAL &amp; ACADEMICS
                </h3>
                <span className="font-mono text-[11px] text-[#e11d48]">FULL STACK</span>
              </div>

              {/* Education Block from CV */}
              <div className="border-b border-[var(--border-hairline)] pb-4 mb-5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#e11d48] font-bold">
                    EDUCATION // ACADEMICS
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)] shrink-0">
                    {EDUCATION_INFO.location}
                  </span>
                </div>
                <p className="font-sans font-bold text-base text-[var(--text-main)] mt-1">
                  {EDUCATION_INFO.university}
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                  {EDUCATION_INFO.degree}
                </p>
                <p className="font-mono text-xs text-[#e11d48] mt-1.5">
                  {EDUCATION_INFO.specialization}
                </p>
              </div>

              {/* 4-Pillar Tech Arsenal from CV */}
              <div className="space-y-4 mb-6">
                {TECH_ARSENAL_CATEGORIES.map((group) => (
                  <div
                    key={group.category}
                    className="border-b border-[var(--border-hairline)] pb-3.5 last:border-b-0"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#e11d48] mb-1">
                      {group.category}
                    </p>
                    <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed">
                      {group.skills.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row of clean monochrome tech icons */}
            <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-[var(--text-muted)] text-lg">
              <i className="fab fa-react hover:text-[#e11d48] transition-colors" title="React & Next.js" />
              <i className="fab fa-js hover:text-[#e11d48] transition-colors" title="TypeScript / JS" />
              <i className="fab fa-node-js hover:text-[#e11d48] transition-colors" title="Node.js & Discord.js v14" />
              <i className="fab fa-python hover:text-[#e11d48] transition-colors" title="Gemini API & AI" />
              <i className="fab fa-figma hover:text-[#e11d48] transition-colors" title="Figma & UI/UX" />
              <i className="fab fa-github hover:text-[#e11d48] transition-colors" title="Cloudflare / Git" />
              <i className="fas fa-cubes hover:text-[#e11d48] transition-colors" title="Three.js & Blender 3D" />
            </div>
          </div>

          {/* COLUMN 2 (lg:col-span-4, with right 1px border on desktop): NATIONAL CERTIFICATION & PIPELINE */}
          <div className="lg:col-span-4 lg:border-r border-b lg:border-b-0 border-[var(--border-hairline)] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* National Certification Card from CV */}
              <div className="mb-8 p-5 border border-[#e11d48]/50 bg-[var(--bg-elevated)]/70">
                <div className="flex items-center justify-between font-mono text-[11px] mb-2">
                  <span className="bg-[#e11d48] text-white px-2 py-0.5 font-bold uppercase tracking-wider">
                    NATIONAL CERTIFICATION
                  </span>
                  <span className="text-[var(--text-muted)]">{NATIONAL_CERTIFICATION.id}</span>
                </div>

                <div className="flex items-baseline justify-between gap-2 mt-2">
                  <h4 className="font-display text-3xl tracking-wide text-[var(--text-main)]">
                    {NATIONAL_CERTIFICATION.title}
                  </h4>
                  <span
                    className="font-mono text-sm font-bold text-[#e11d48] tabular-nums"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {NATIONAL_CERTIFICATION.score}
                  </span>
                </div>

                <p className="font-mono text-xs text-[var(--text-main)] mt-0.5">
                  {NATIONAL_CERTIFICATION.issuer} · Score: {NATIONAL_CERTIFICATION.score}
                </p>

                <p className="text-xs text-[var(--text-muted)] mt-2.5 leading-relaxed">
                  {NATIONAL_CERTIFICATION.summary}
                </p>
              </div>

              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-2xl tracking-wide text-[var(--text-main)]">
                  FROM CONCEPT TO LAUNCH
                </h3>
                <span className="font-mono text-[11px] text-[#e11d48]">02.B</span>
              </div>

              <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#e11d48]/40">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.number} className="relative group">
                    <span
                      className="absolute -left-6 top-0.5 w-[19px] h-[19px] rounded-full bg-[var(--bg-main)] border border-[#e11d48] flex items-center justify-center text-[10px] text-[#e11d48] font-mono"
                      aria-hidden="true"
                    >
                      ⊙
                    </span>

                    <div className="flex items-baseline gap-2.5">
                      <span
                        className="font-mono text-xs font-bold text-[#e11d48] tabular-nums"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {step.number}
                      </span>
                      <h4 className="font-sans text-xs sm:text-sm font-bold tracking-wider uppercase text-[var(--text-main)]">
                        {step.title}
                      </h4>
                    </div>

                    <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 3 (lg:col-span-4): SIGNATURE CRIMSON EDITORIAL QUOTE CARD */}
          <div className="lg:col-span-4 crimson-quote-card p-8 sm:p-10 lg:p-12 flex flex-col justify-between text-white min-h-[420px]">
            {/* Top Giant Quotation Mark */}
            <div className="flex items-start justify-between">
              <span className="font-display text-7xl sm:text-8xl leading-none text-[#ff2a4b] select-none">
                &ldquo;
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/70">
                REF: VIXA-EXEC
              </span>
            </div>

            {/* Middle Crisp Editorial Quote */}
            <div className="my-6">
              <blockquote className="text-3xl sm:text-4xl font-light leading-snug text-white">
                &ldquo;I like Gayming&rdquo;
              </blockquote>

              {/* Handwritten Script Signature */}
              <p className="mt-6 font-script text-3xl sm:text-4xl text-white/90 -rotate-2">
                Rifat Ashhab Bin Sharif
              </p>

              <div className="mt-6">
                <a
                  href={CV_PDF_URL}
                  download={CV_DOWNLOAD_FILENAME}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-[#e11d48] border border-white/20 text-white font-mono text-xs uppercase tracking-widest transition-colors"
                  data-cursor="link"
                >
                  <i className="fas fa-file-pdf text-[#ff2a4b]" />
                  <span>DOWNLOAD OFFICIAL CV (PDF) ↓</span>
                </a>
              </div>
            </div>

            {/* Bottom Footer inside Quote Card */}
            <div className="pt-5 border-t border-white/15 flex items-center justify-between gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/85">
                LEVEL 6 AI VISIONARY · 95/100
              </span>
              <span className="animate-spin-slow text-[#ff2a4b] text-xl leading-none select-none">
                ✳
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
