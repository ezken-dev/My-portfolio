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

const TARGET_DISPATCH_EMAIL = 'peacerifat2005@gmail.com';
const WEB3FORMS_ACCESS_KEY = 'cebe92a8-f264-4825-a74d-e963537163cc';

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedScope, setSelectedScope] = useState(PROJECT_SCOPES[0]);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const hiddenFormRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formattedSubject = `Vixa Corp Project Dispatch — ${selectedScope} (${name || 'New Client'})`;
  const formattedBrief = `Project Inquiry for Rifat Ashhab Bin Sharif (Vixa Corp)\n\nClient Name: ${name}\nClient Email: ${email}\nPrimary Discipline: ${selectedScope}\nProject Goals & Timeline:\n${message || 'Let us schedule a discovery & architecture consultation.'}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || isSending) return;

    setIsSending(true);
    setErrorMsg(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage =
      message.trim() || 'Discovery & architecture consultation requested.';

    let clientDelivered = false;

    // 1. Primary Direct Web3Forms Submission (https://api.web3forms.com/submit)
    try {
      const formData = new FormData();
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.append('subject', formattedSubject);
      formData.append('from_name', 'Vixa Corp Portfolio Dispatch');
      formData.append('name', cleanName);
      formData.append('email', cleanEmail);
      formData.append('discipline', selectedScope);
      formData.append(
        'message',
        `Primary Discipline: ${selectedScope}\nClient Name: ${cleanName}\nClient Email: ${cleanEmail}\n\nProject Goals & Timeline:\n${cleanMessage}`
      );

      const web3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const web3Data = await web3Res.json().catch(() => null);
      if (web3Res.ok && web3Data && web3Data.success) {
        clientDelivered = true;
      }
    } catch {
      clientDelivered = false;
    }

    // 2. Log to our backend server (/api/dispatch) and let the server relay to Web3Forms if the client fetch was blocked by an adblocker
    let serverDelivered = false;
    try {
      const serverRes = await fetch('/api/dispatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          scope: selectedScope,
          message: cleanMessage,
          relayViaServer: !clientDelivered
        })
      });

      const serverData = await serverRes.json().catch(() => null);
      if (serverRes.ok && serverData?.ok) {
        serverDelivered = true;
      }
    } catch {
      serverDelivered = false;
    }

    // 3. Final fallback: if both fetch calls were blocked by strict browser shields, submit native HTML <form> to Web3Forms in hidden iframe
    if (!clientDelivered && !serverDelivered && hiddenFormRef.current) {
      try {
        hiddenFormRef.current.submit();
      } catch {
        // ignore
      }
    }

    setIsSending(false);
    setSubmitted(true);
  };

  const handleCopyBrief = () => {
    navigator.clipboard.writeText(formattedBrief);
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
      {/* Hidden 0x0 iframe & native Web3Forms POST fallback */}
      <iframe
        name="vixa_web3forms_frame"
        title="Web3Forms Dispatch Relay"
        className="hidden w-0 h-0 border-0 pointer-events-none"
      />
      <form
        ref={hiddenFormRef}
        action="https://api.web3forms.com/submit"
        method="POST"
        target="vixa_web3forms_frame"
        className="hidden"
      >
        <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
        <input type="hidden" name="subject" value={formattedSubject} />
        <input type="hidden" name="from_name" value="Vixa Corp Portfolio Dispatch" />
        <input type="hidden" name="name" value={name.trim()} />
        <input type="hidden" name="email" value={email.trim()} />
        <input type="hidden" name="discipline" value={selectedScope} />
        <textarea
          name="message"
          readOnly
          value={`Primary Discipline: ${selectedScope}\nClient Name: ${name.trim()}\nClient Email: ${email.trim()}\n\nProject Goals & Timeline:\n${
            message.trim() || 'Discovery & architecture consultation requested.'
          }`}
        />
      </form>

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
                Direct automated dispatch to Rifat Ashhab Bin Sharif at Vixa Corp.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-[#e11d48]/15 border border-[#e11d48] font-mono text-xs text-[#ff2a4b]">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  name="name"
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
                  name="email"
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
                PROJECT GOALS &amp; TIMELINE *
              </label>
              <textarea
                name="message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about the product, target launch window, and core objectives..."
                className="w-full px-3.5 py-2.5 bg-[var(--bg-main)] border border-[var(--border-hairline)] focus:border-[#e11d48] outline-none text-sm text-[var(--text-main)] resize-none"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-[var(--text-muted)]">
                INSTANT DISPATCH · NO EMAIL APP REQUIRED
              </span>

              <button
                type="submit"
                disabled={isSending}
                className="px-7 py-3 bg-[#e11d48] hover:bg-[#be123c] disabled:opacity-60 text-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                {isSending ? 'TRANSMITTING DISPATCH...' : 'SEND DISPATCH ↗'}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-full border border-[#10b981] bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
              <i className="fas fa-check" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 mb-2 bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] font-mono text-[10px] uppercase tracking-widest">
                ✓ DELIVERED TO {TARGET_DISPATCH_EMAIL.toUpperCase()}
              </span>
              <h3 className="font-display text-4xl text-[var(--text-main)]">
                DISPATCH TRANSMITTED<span className="text-[#e11d48]">.</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[var(--text-main)]">{name}</strong>. Your project
                brief has been sent directly to Rifat Ashhab Bin Sharif (
                <strong className="text-[var(--text-main)] font-mono">
                  {TARGET_DISPATCH_EMAIL}
                </strong>
                ). Rifat will reply directly to{' '}
                <strong className="text-[var(--text-main)] font-mono">{email}</strong>.
              </p>
            </div>

            <div className="p-4 bg-[var(--bg-main)] border border-[var(--border-hairline)] text-left font-mono text-xs text-[var(--text-muted)] space-y-1.5">
              <p>
                <span className="text-[#e11d48]">RECIPIENT:</span> {TARGET_DISPATCH_EMAIL}
              </p>
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
                className="px-5 py-3 border border-[var(--border-hairline)] hover:border-[#e11d48] text-[var(--text-main)] font-mono text-xs uppercase tracking-widest cursor-pointer transition-colors"
              >
                {copied ? 'BRIEF COPIED ✓' : 'COPY RECEIPT'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                  onClose();
                }}
                className="px-7 py-3 bg-[#e11d48] hover:bg-[#be123c] text-white font-mono text-xs uppercase tracking-widest font-semibold cursor-pointer transition-colors"
              >
                DONE ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
