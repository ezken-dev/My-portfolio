import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE_DATA, MILESTONES_DATA } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    EXPERIENCE_DATA.forEach((item) => {
      initial[item.id] = Boolean(item.defaultOpen);
    });
    return initial;
  });

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journey-heading-line',
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
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

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-32 border-b border-[var(--border-hairline)] relative"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* 1. Section Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
            <span>
              03 <span className="text-[#e11d48]">/</span> THE JOURNEY
            </span>
            <span>EXPERIENCE &amp; MILESTONES</span>
          </div>

          <div className="overflow-hidden">
            <h2 className="journey-heading-line font-display text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[0.92] text-[var(--text-main)]">
              KEEP BUILDING. KEEP SHIPPING<span className="text-[#e11d48]">.</span>
            </h2>
          </div>
        </div>

        {/* 2. 2-Column Asymmetric Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-[var(--border-hairline)]">
          {/* LEFT COLUMN (lg:col-span-8): Interactive Accordion Career Timeline */}
          <div className="lg:col-span-8">
            <div className="border-t border-[var(--border-hairline)]">
              {EXPERIENCE_DATA.map((exp) => {
                const isOpen = Boolean(openIds[exp.id]);
                return (
                  <div
                    key={exp.id}
                    className="border-b border-[var(--border-hairline)] transition-colors print-break-avoid"
                  >
                    {/* Accordion Row Header */}
                    <button
                      type="button"
                      onClick={() => toggleItem(exp.id)}
                      className="w-full py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left group cursor-pointer"
                      aria-expanded={isOpen}
                      data-cursor="link"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                        <span
                          className="w-36 shrink-0 font-mono text-xs font-semibold tracking-wider text-[#e11d48] tabular-nums"
                          style={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                          {exp.date}
                        </span>

                        <div>
                          <h3 className="font-sans text-xl md:text-2xl font-bold text-[var(--text-main)] group-hover:text-[#e11d48] transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-[var(--text-muted)] mt-0.5">{exp.company}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end">
                        <span
                          className={`w-9 h-9 flex items-center justify-center border font-mono text-lg transition-colors ${
                            isOpen
                              ? 'border-[#e11d48] bg-[#e11d48] text-white'
                              : 'border-[var(--border-hairline)] text-[var(--text-main)] group-hover:border-[#e11d48]'
                          }`}
                        >
                          {isOpen ? '−' : '+'}
                        </span>
                      </div>
                    </button>

                    {/* Expandable Bulleted Achievements */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'
                      }`}
                    >
                      <div className="sm:pl-44 pr-4 space-y-2.5">
                        <ul className="space-y-2.5 text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-[#e11d48] font-mono text-xs mt-1.5 shrink-0">
                                ✦
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {exp.companyUrl && (
                          <div className="pt-2">
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#e11d48] hover:underline"
                              data-cursor="link"
                            >
                              <span>VISIT {exp.company.toUpperCase()}</span>
                              <span>↗</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN (lg:col-span-4): A FEW MILESTONES — SHIPPED. LIVE. USED. */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                A FEW MILESTONES
              </p>

              <div className="font-display text-5xl md:text-6xl leading-[0.95] mt-2 mb-8">
                <p className="text-[var(--text-main)]">SHIPPED.</p>
                <p className="text-[#e11d48]">LIVE. USED.</p>
              </div>

              {/* Numbered Interactive List with 1px Horizontal Dividers */}
              <div className="border-t border-[var(--border-hairline)]">
                {MILESTONES_DATA.map((milestone) => (
                  <a
                    key={milestone.number}
                    href={milestone.url}
                    target="_blank"
                    rel="noreferrer"
                    className="py-4 border-b border-[var(--border-hairline)] flex items-center justify-between gap-4 group"
                    data-cursor="link"
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className="font-mono text-xs font-bold text-[#e11d48] tabular-nums"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {milestone.number}
                      </span>
                      <div>
                        <p className="font-sans text-sm sm:text-base font-bold text-[var(--text-main)] group-hover:text-[#e11d48] transition-colors">
                          {milestone.title}
                        </p>
                        <p className="font-mono text-xs text-[var(--text-muted)] mt-0.5">
                          {milestone.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="font-mono text-sm text-[var(--text-muted)] group-hover:text-[#e11d48] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 p-5 border border-[var(--border-hairline)] bg-[var(--bg-elevated)]/40">
              <p className="font-mono text-xs uppercase tracking-wider text-[#e11d48] mb-1">
                TECHNICAL LEADERSHIP
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Leading multidisciplinary engineering teams from initial architecture to high-scale
                production deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
