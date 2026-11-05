import React, { useEffect, useState } from 'react';
import { ProjectItem } from '../data/portfolioData';

interface LightboxModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ project, onClose }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    setActiveSlideIndex(0);
  }, [project]);

  // Lock background page scroll while modal is open so scrolling happens exclusively inside the modal
  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const slidesCount = project.gallery?.length || 1;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && slidesCount > 1) {
        setActiveSlideIndex((prev) => (prev + 1) % slidesCount);
      } else if (e.key === 'ArrowLeft' && slidesCount > 1) {
        setActiveSlideIndex((prev) => (prev - 1 + slidesCount) % slidesCount);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);
  const currentImageSrc = hasGallery
    ? project.gallery![activeSlideIndex]?.src || project.img
    : project.img;
  const currentSlideCaption = hasGallery
    ? project.gallery![activeSlideIndex]?.caption
    : null;

  return (
    <div
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[99990] bg-black/92 backdrop-blur-xl flex items-center justify-center p-2 sm:p-5 md:p-8 no-print"
      onClick={onClose}
    >
      {/* Scrollable Modal Dialog Container */}
      <div
        data-lenis-prevent
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-[#0e0e12] border border-white/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header Bar */}
        <div className="shrink-0 px-4 sm:px-6 py-3.5 bg-[#08080a] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs z-20">
          <div className="flex items-center gap-3">
            <span className="text-[#e11d48] font-bold">ARCHIVE #{project.index}</span>
            <span className="text-white/40">·</span>
            <span className="text-white uppercase truncate max-w-[220px] sm:max-w-md">
              {project.deliverable}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-2.5 py-1 bg-white/5 border border-white/10 text-[#8a8a93] text-[10px]">
              SCROLL FOR CASE STUDY ↓
            </span>
            {hasGallery && (
              <span className="px-2.5 py-1 bg-[#e11d48]/15 border border-[#e11d48]/40 text-[#ff2a4b] text-[11px]">
                IMAGE {activeSlideIndex + 1} / {project.gallery!.length}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border border-white/15 hover:border-[#e11d48] text-white hover:text-[#e11d48] transition-colors cursor-pointer"
            >
              ESC / CLOSE ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto overscroll-contain divide-y divide-white/10"
        >
          {/* 1. Interactive Image Gallery Section */}
          <div>
            {/* Multi-Screenshot Gallery Tabs */}
            {hasGallery && (
              <div className="px-4 sm:px-6 py-3 bg-[#0b0b0e] border-b border-white/10 flex flex-wrap items-center gap-2">
                {project.gallery!.map((slide, idx) => {
                  const isSelected = idx === activeSlideIndex;
                  return (
                    <button
                      key={slide.label}
                      type="button"
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#e11d48] border-[#e11d48] text-white font-semibold'
                          : 'bg-transparent border-white/15 text-[#8a8a93] hover:text-white hover:border-white/40'
                      }`}
                    >
                      {slide.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Main Screenshot / Render Viewport */}
            <div className="relative bg-black flex items-center justify-center min-h-[260px] sm:min-h-[380px] max-h-[62vh] overflow-hidden">
              <img
                src={currentImageSrc}
                alt={`${project.title} — ${hasGallery ? project.gallery![activeSlideIndex]?.label : ''}`}
                referrerPolicy="no-referrer"
                className="w-full max-h-[62vh] object-contain"
              />

              {/* Prev / Next Overlay Arrows */}
              {hasGallery && project.gallery!.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlideIndex(
                        (prev) => (prev - 1 + project.gallery!.length) % project.gallery!.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-[#e11d48] text-white border border-white/20 flex items-center justify-center font-mono text-sm transition-colors cursor-pointer"
                    aria-label="Previous screenshot"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlideIndex((prev) => (prev + 1) % project.gallery!.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-[#e11d48] text-white border border-white/20 flex items-center justify-center font-mono text-sm transition-colors cursor-pointer"
                    aria-label="Next screenshot"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* Active Slide Caption Banner */}
            {currentSlideCaption && (
              <div className="px-4 sm:px-6 py-3.5 bg-[#121218] border-t border-white/10 flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-[#e11d48] shrink-0 mt-0.5">
                  [{String(activeSlideIndex + 1).padStart(2, '0')}]
                </span>
                <p className="text-xs sm:text-sm text-[#e4e4eb] leading-relaxed">
                  {currentSlideCaption}
                </p>
              </div>
            )}

            {/* Thumbnail Strip */}
            {hasGallery && (
              <div className="px-4 sm:px-6 py-3.5 bg-[#09090c] border-t border-white/10 flex items-center gap-3 overflow-x-auto">
                {project.gallery!.map((slide, idx) => (
                  <button
                    key={`thumb-${slide.label}`}
                    type="button"
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`relative w-28 sm:w-36 aspect-[16/10] border overflow-hidden shrink-0 transition-all cursor-pointer group ${
                      idx === activeSlideIndex
                        ? 'border-[#e11d48] ring-2 ring-[#e11d48]/60 opacity-100'
                        : 'border-white/15 opacity-55 hover:opacity-95'
                    }`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.label}
                      className="w-full h-full object-cover object-top"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] font-mono text-white px-1.5 py-0.5 truncate text-left">
                      {slide.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Scrollable Case-Study Article & Detailed Technical Breakdown */}
          <div className="p-6 sm:p-8 md:p-10 bg-[#08080a] space-y-8">
            {/* Title, Tags & Primary Actions Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#e11d48] mb-2">
                  {project.deliverable} · {project.year}
                </p>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-wide leading-none">
                  {project.title}
                </h2>
                <p className="font-mono text-xs text-[#8a8a93] mt-3">
                  TECH STACK: <span className="text-white">{project.tags.join(' · ')}</span>
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap items-center gap-3">
                {project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-[#e11d48] hover:bg-[#be123c] text-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    LAUNCH LIVE PROJECT ↗
                  </a>
                )}
                <a
                  href={currentImageSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 border border-white/20 hover:border-[#e11d48] text-white font-mono text-xs uppercase tracking-widest transition-colors"
                >
                  OPEN FULL-RES IMAGE ↗
                </a>
              </div>
            </div>

            {/* Executive Overview */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#e11d48] mb-3">
                01 / EXECUTIVE OVERVIEW &amp; SYSTEM PURPOSE
              </h3>
              <p className="text-sm sm:text-base text-[#d4d4dc] leading-relaxed">
                {project.longDesc || project.desc}
              </p>
            </div>

            {/* How It Works — Step-by-Step Engineering Breakdown */}
            {project.howItWorks && project.howItWorks.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#e11d48] mb-5">
                  02 / HOW IT WORKS — END-TO-END SYSTEM ARCHITECTURE
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.howItWorks.map((item) => (
                    <div
                      key={item.step}
                      className="p-5 bg-[#0e0e12] border border-white/10 hover:border-[#e11d48]/50 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-baseline gap-3 mb-2">
                          <span className="font-mono text-xs font-bold text-[#e11d48] px-2 py-0.5 bg-[#e11d48]/10 border border-[#e11d48]/30">
                            STEP {item.step}
                          </span>
                          <h4 className="font-sans text-base font-bold text-white">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-[#9e9ea8] leading-relaxed mt-2">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Capabilities & System Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#e11d48] mb-4">
                  03 / KEY CAPABILITIES &amp; PRODUCTION METRICS
                </h3>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="p-3.5 bg-[#0e0e12]/70 border border-white/10 flex items-start gap-3 text-xs sm:text-sm text-[#d4d4dc]"
                    >
                      <span className="text-[#e11d48] font-mono text-xs mt-0.5 shrink-0">✦</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_SCOPES = [
  'Full-Stack Web Application',
  'AI SaaS / Bot Integration',
  'Lead Finder / Custom Automation',
  '3D Interactive / Blender CGI'
];

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedScope, setSelectedScope] = useState(PROJECT_SCOPES[0]);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  const handleCopyBrief = () => {
    const brief = `Project Inquiry for Rifat Ashhab Bin Sharif (Vixa Corp)\nName: ${name}\nEmail: ${email}\nScope: ${selectedScope}\nDetails: ${message || 'Let us schedule a discovery call.'}`;
    navigator.clipboard.writeText(brief);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[99990] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 no-print overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[var(--bg-elevated)] border border-[var(--border-hairline)] text-[var(--text-main)] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs">
          <span className="text-[#e11d48] font-bold uppercase tracking-widest">
            VIXA CORP // INITIATE PROJECT BRIEF
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 border border-[var(--border-hairline)] hover:border-[#e11d48] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div>
              <h3 className="font-display text-4xl tracking-tight text-[var(--text-main)]">
                LET&apos;S ARCHITECT YOUR VISION<span className="text-[#e11d48]">.</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
                Direct executive channel to Rifat Ashhab Bin Sharif at Vixa Corp.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-main)] border border-[var(--border-hairline)] focus:border-[#e11d48] outline-none text-sm text-[var(--text-main)]"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                  YOUR EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-main)] border border-[var(--border-hairline)] focus:border-[#e11d48] outline-none text-sm text-[var(--text-main)]"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-2">
                SELECT PRIMARY DISCIPLINE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PROJECT_SCOPES.map((scope) => (
                  <button
                    key={scope}
                    type="button"
                    onClick={() => setSelectedScope(scope)}
                    className={`px-3 py-2 text-left font-mono text-xs border transition-colors cursor-pointer ${
                      selectedScope === scope
                        ? 'border-[#e11d48] bg-[#e11d48]/15 text-[var(--text-main)] font-semibold'
                        : 'border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {scope}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                PROJECT GOALS &amp; TIMELINE
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about the product, target launch window, and core objectives..."
                className="w-full px-3.5 py-2.5 bg-[var(--bg-main)] border border-[var(--border-hairline)] focus:border-[#e11d48] outline-none text-sm text-[var(--text-main)] resize-none"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <a
                href="https://vixa.pro"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[var(--text-muted)] hover:text-[#e11d48] transition-colors"
              >
                OR VISIT VIXA.PRO DIRECTLY ↗
              </a>

              <button
                type="submit"
                className="px-7 py-3 bg-[#e11d48] hover:bg-[#be123c] text-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                GENERATE DISPATCH ↗
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 space-y-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-full border border-[#e11d48] flex items-center justify-center text-[#e11d48]">
              <i className="fas fa-check" />
            </div>

            <div>
              <h3 className="font-display text-4xl text-[var(--text-main)]">
                PROJECT BRIEF READY<span className="text-[#e11d48]">.</span>
              </h3>
              <p className="text-sm text-[var(--text-muted)] mt-2 max-w-md mx-auto">
                Thank you, <strong className="text-[var(--text-main)]">{name}</strong>. Copy your
                formatted brief below or continue directly to Vixa Corp or LinkedIn to connect with
                Rifat Ashhab.
              </p>
            </div>

            <div className="p-4 bg-[var(--bg-main)] border border-[var(--border-hairline)] text-left font-mono text-xs text-[var(--text-muted)] space-y-1">
              <p>
                <span className="text-[#e11d48]">CLIENT:</span> {name} ({email})
              </p>
              <p>
                <span className="text-[#e11d48]">DISCIPLINE:</span> {selectedScope}
              </p>
              <p>
                <span className="text-[#e11d48]">BRIEF:</span>{' '}
                {message || 'Discovery & architecture consultation'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleCopyBrief}
                className="px-5 py-3 bg-[#e11d48] hover:bg-[#be123c] text-white font-mono text-xs uppercase tracking-widest font-semibold cursor-pointer"
              >
                {copied ? 'COPIED TO CLIPBOARD ✓' : 'COPY BRIEF TO CLIPBOARD'}
              </button>

              <a
                href="https://www.linkedin.com/in/rifatashhab/"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 border border-[var(--border-hairline)] hover:border-[#e11d48] text-[var(--text-main)] font-mono text-xs uppercase tracking-widest"
              >
                MESSAGE ON LINKEDIN ↗
              </a>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-4 py-3 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
