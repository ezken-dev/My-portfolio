import React, { useEffect, useState } from 'react';
import { CV_DOWNLOAD_FILENAME, CV_PDF_URL } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenInquiry: () => void;
  onScrollTop: () => void;
}

const CONTACT_ROWS = [
  {
    label: 'DIRECT EMAIL',
    value: 'peacerifat2005@gmail.com',
    url: 'mailto:peacerifat2005@gmail.com',
    icon: 'fas fa-envelope'
  },
  {
    label: 'INSTAGRAM',
    value: 'rifat_0.1',
    url: 'https://www.instagram.com/rifat_0.1/',
    icon: 'fab fa-instagram'
  },
  {
    label: 'COMPANY SITE',
    value: 'vixa.pro',
    url: 'https://vixa.pro',
    icon: 'fas fa-globe'
  },
  {
    label: 'GITHUB',
    value: 'github.com/ezken-dev',
    url: 'https://github.com/ezken-dev',
    icon: 'fab fa-github'
  },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/rifatashhab',
    url: 'https://www.linkedin.com/in/rifatashhab/',
    icon: 'fab fa-linkedin-in'
  }
];

const PREVIEW_SITES = {
  leadfinder: {
    name: 'VIXA LEAD FINDER & CLIENT TRACKER',
    domain: 'https://vixa.pro',
    tag: 'FLAGSHIP 01 · GOOGLE PLACES ENGINE',
    desc: 'Global B2B lead discovery, automated website quality scoring, and email/phone/social extraction powered by Google Places API.',
    img: '/assets/aistudio/image_7e3b73bb.png'
  },
  clientops: {
    name: 'CLIENTOPS DESK — MARGIN GUARDIAN',
    domain: 'https://vixa.pro',
    tag: 'FLAGSHIP 02 · TENCENT WORKBUDDY',
    desc: 'Local-first agentic operations command center transforming raw client inquiries into 8 verified commercial, legal, and technical deliverables.',
    img: '/assets/aistudio/image_958e6d06.png'
  },
  vixa: {
    name: 'VIXA CORP — DIGITAL AGENCY',
    domain: 'https://vixa.pro',
    tag: 'AGENCY FLAGSHIP',
    desc: 'Custom SaaS platforms, autonomous AI integrations, and full-stack software led by Rifat Ashhab Bin Sharif.',
    img: '/assets/aistudio/image_af78b877.png'
  }
};

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenInquiry,
  onScrollTop
}) => {
  const [previewKey, setPreviewKey] = useState<'leadfinder' | 'clientops' | 'vixa'>('leadfinder');
  const [clockTime, setClockTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kuala_Lumpur',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setClockTime(formatter.format(now));
      } catch {
        setClockTime(new Date().toLocaleTimeString());
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const currentPreview = PREVIEW_SITES[previewKey];

  return (
    <footer id="contact" className="pt-24 md:pt-32 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Contact Rows & Inquiry CTA */}
          <div className="lg:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
              04 <span className="text-[#e11d48]">/</span> INITIATE CONTACT
            </p>

            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[0.92] text-[var(--text-main)] mb-8">
              LET&apos;S BUILD THE NEXT <span className="text-[#e11d48]">DIGITAL REALITY.</span>
            </h2>

            {/* Interactive Contact Rows */}
            <div className="border-t border-[var(--border-hairline)]">
              {CONTACT_ROWS.map((row) => (
                <a
                  key={row.label}
                  href={row.url}
                  target="_blank"
                  rel="noreferrer"
                  className="py-4 border-b border-[var(--border-hairline)] flex items-center justify-between gap-4 group"
                  data-cursor="link"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full border border-[#e11d48] flex items-center justify-center text-[#e11d48] group-hover:bg-[#e11d48] group-hover:text-white transition-colors shrink-0">
                      <i className={`${row.icon} text-sm`} />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                        {row.label}
                      </p>
                      <p className="font-sans text-sm sm:text-base font-bold text-[var(--text-main)] group-hover:text-[#e11d48] transition-colors">
                        {row.value}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-base text-[var(--text-muted)] group-hover:text-[#e11d48] group-hover:translate-x-1 transition-all">
                    ↗
                  </span>
                </a>
              ))}
            </div>

            {/* Interactive Project Inquiry Trigger + Direct PDF CV Download */}
            <div className="mt-8 flex flex-wrap items-center gap-4 no-print">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="bg-[#e11d48] hover:bg-[#be123c] text-white px-7 py-4 font-mono text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-3 transition-colors cursor-pointer"
                data-cursor="link"
              >
                <span>START A PROJECT BRIEF</span>
                <span>↗</span>
              </button>

              <a
                href={CV_PDF_URL}
                download={CV_DOWNLOAD_FILENAME}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-4 border border-[var(--border-hairline)] hover:border-[#e11d48] text-[var(--text-main)] font-mono text-xs uppercase tracking-widest transition-colors inline-flex items-center gap-2"
                data-cursor="link"
              >
                <i className="fas fa-file-arrow-down text-[#e11d48]" />
                <span>DOWNLOAD CV (PDF)</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Angled 3D Perspective Browser Preview Card */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end">
            {/* Switcher Tabs */}
            <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs no-print">
              <span className="text-[var(--text-muted)] mr-1">FLAGSHIP PREVIEW:</span>
              <button
                type="button"
                onClick={() => setPreviewKey('leadfinder')}
                className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                  previewKey === 'leadfinder'
                    ? 'border-[#e11d48] bg-[#e11d48] text-white font-semibold'
                    : 'border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                01. LEAD FINDER
              </button>
              <button
                type="button"
                onClick={() => setPreviewKey('clientops')}
                className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                  previewKey === 'clientops'
                    ? 'border-[#e11d48] bg-[#e11d48] text-white font-semibold'
                    : 'border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                02. CLIENTOPS DESK
              </button>
              <button
                type="button"
                onClick={() => setPreviewKey('vixa')}
                className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                  previewKey === 'vixa'
                    ? 'border-[#e11d48] bg-[#e11d48] text-white font-semibold'
                    : 'border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                VIXA CORP
              </button>
            </div>

            {/* 3D Angled Browser Window Card */}
            <div
              className="w-full max-w-xl specular-card border border-[var(--border-hairline)] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:-rotate-2 hover:rotate-0 hover:-translate-y-2 group"
              style={{ perspective: '1000px' }}
            >
              {/* Browser Top Chrome */}
              <div className="px-4 py-3 border-b border-[var(--border-hairline)] bg-[var(--bg-elevated)] flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e11d48]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>

                <div className="px-3 py-1 bg-[var(--bg-main)] border border-[var(--border-hairline)] font-mono text-[11px] text-[var(--text-muted)] truncate max-w-[240px]">
                  {currentPreview.domain}
                </div>

                <span className="font-mono text-[10px] uppercase tracking-wider text-[#e11d48]">
                  {currentPreview.tag}
                </span>
              </div>

              {/* Preview Viewport */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-main)]">
                <img
                  src={currentPreview.img}
                  alt={currentPreview.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <p className="font-display text-3xl text-white tracking-wide">
                    {currentPreview.name}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-md">
                    {currentPreview.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="p-4 bg-[var(--bg-elevated)] border-t border-[var(--border-hairline)] flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  RIFAT ASHHAB BIN SHARIF
                </span>
                <a
                  href={currentPreview.domain}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#e11d48] hover:bg-[#be123c] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                  data-cursor="link"
                >
                  LAUNCH VIXA PORTAL ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Telemetry Bar */}
      <div className="border-t border-[var(--border-hairline)] bg-[var(--bg-elevated)]/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-4">
            <span className="font-display text-2xl text-[var(--text-main)] tracking-tight">
              RIFAT<span className="text-[#e11d48] text-xs font-mono align-top">®</span>
            </span>
            <span>SYSTEM VERIFIED // RIFAT ASHHAB BIN SHARIF</span>
          </div>

          <div
            className="flex items-center gap-2 tabular-nums"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            <span className="text-[#e11d48]">SUBANG JAYA, MY (UTC+8):</span>
            <span className="text-[var(--text-main)]">{clockTime || 'LIVE'}</span>
          </div>

          <div className="flex items-center gap-6 no-print">
            <a
              href={CV_PDF_URL}
              download={CV_DOWNLOAD_FILENAME}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-main)] transition-colors uppercase cursor-pointer"
              data-cursor="link"
            >
              Download CV
            </a>
            <button
              type="button"
              onClick={onScrollTop}
              className="text-[var(--text-main)] hover:text-[#e11d48] transition-colors uppercase cursor-pointer flex items-center gap-1.5"
              data-cursor="link"
            >
              <span>Back to top</span>
              <span className="text-[#e11d48]">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
