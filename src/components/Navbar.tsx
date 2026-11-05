import React, { useState } from 'react';
import { CV_DOWNLOAD_FILENAME, CV_PDF_URL } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  isLightMode: boolean;
  buildProgress?: number;
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onNavigate: (sectionId: string) => void;
  onOpenInquiry: () => void;
}

const NAV_ITEMS = [
  { label: 'Work', id: 'projects' },
  { label: 'About', id: 'about' },
  { label: 'Journey', id: 'experience' },
  { label: 'Contact', id: 'contact' }
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  isLightMode,
  buildProgress = 1,
  onToggleTheme,
  onNavigate,
  onOpenInquiry
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  const isBuilding = buildProgress < 1;
  const navSweepPct =
    buildProgress < 0.22
      ? 0
      : buildProgress < 0.31
      ? Math.min(100, ((buildProgress - 0.22) / 0.09) * 100)
      : 100;

  return (
    <>
      <header
        style={
          isBuilding
            ? {
                opacity: buildProgress >= 0.22 ? 1 : 0,
                clipPath: `inset(0 ${100 - navSweepPct}% 0 0)`
              }
            : undefined
        }
        className={`fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border-hairline)] transition-colors duration-500 no-print ${
          isBuilding && buildProgress >= 0.22 && buildProgress < 0.36
            ? 'border-b-dashed border-[#ff2a4b]'
            : ''
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="font-display text-3xl tracking-tight text-[var(--text-main)] whitespace-nowrap shrink-0 flex items-start leading-none"
            data-cursor="link"
          >
            RIFAT
            <span className="text-[#e11d48] text-sm font-mono font-bold ml-0.5 -mt-0.5">®</span>
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[var(--text-main)] font-semibold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                  data-cursor="link"
                >
                  {isActive && (
                    <span className="text-[#ff2a4b] font-mono text-xs leading-none" aria-hidden="true">
                      •
                    </span>
                  )}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right: Theme Switch, Direct PDF CV Download & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="w-9 h-9 flex items-center justify-center border border-[var(--border-hairline)] hover:border-[#e11d48] text-[var(--text-main)] transition-colors shrink-0 cursor-pointer"
              aria-label="Toggle color theme"
              title={isLightMode ? 'Switch to Crimson Noir Dark Mode' : 'Switch to Editorial Light Mode'}
              data-cursor="link"
            >
              <i className={`fas ${isLightMode ? 'fa-moon' : 'fa-sun'} text-xs`} />
            </button>

            {/* Download CV Direct PDF Link */}
            <a
              href={CV_PDF_URL}
              download={CV_DOWNLOAD_FILENAME}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider border border-[var(--border-hairline)] hover:border-[#e11d48] text-[var(--text-main)] transition-colors whitespace-nowrap shrink-0"
              data-cursor="link"
            >
              <i className="fas fa-file-arrow-down text-[11px] text-[#e11d48]" />
              <span>Download CV</span>
            </a>

            {/* Primary CTA: Let's talk ↗ */}
            <button
              type="button"
              onClick={onOpenInquiry}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono uppercase tracking-wider bg-[#e11d48] hover:bg-[#be123c] text-white font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              data-cursor="link"
            >
              <span>Let&apos;s talk</span>
              <span className="text-white">↗</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden w-9 h-9 flex items-center justify-center border border-[var(--border-hairline)] text-[var(--text-main)]"
              aria-label="Toggle navigation menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-sm`} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Editorial Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--bg-main)]/98 backdrop-blur-2xl flex flex-col justify-between px-6 pt-24 pb-10 md:hidden no-print">
          <div className="flex flex-col space-y-6 border-t border-[var(--border-hairline)] pt-8">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="flex items-baseline justify-between border-b border-[var(--border-hairline)] pb-4 group"
              >
                <span className="font-display text-5xl tracking-tight text-[var(--text-main)] group-hover:text-[#e11d48] transition-colors">
                  {item.label}
                </span>
                <span className="font-mono text-xs text-[#e11d48]">0{idx + 1} ↗</span>
              </a>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="flex-1 py-3.5 bg-[#e11d48] text-white font-mono text-xs uppercase tracking-widest font-semibold text-center"
              >
                Let&apos;s talk ↗
              </button>
              <a
                href={CV_PDF_URL}
                download={CV_DOWNLOAD_FILENAME}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-3.5 border border-[var(--border-hairline)] text-[var(--text-main)] font-mono text-xs uppercase tracking-widest text-center"
              >
                Download CV
              </a>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-hairline)] font-mono text-xs text-[var(--text-muted)]">
              <span>RIFAT ASHHAB BIN SHARIF</span>
              <div className="flex items-center gap-4 text-base text-[var(--text-main)]">
                <a href="https://vixa.pro" target="_blank" rel="noreferrer" aria-label="Vixa Corp">
                  <i className="fas fa-globe" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rifatashhab/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin" />
                </a>
                <a
                  href="https://github.com/ezken-dev"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  href="https://www.instagram.com/rifat_0.1/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
