import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS_DATA, ProjectItem } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioSectionProps {
  onSelectProjectLightbox: (project: ProjectItem) => void;
}

type FilterCategory = 'all' | 'ai' | 'website' | 'video';

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectProjectLightbox
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [showAllWorks, setShowAllWorks] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const flagshipProjects = PROJECTS_DATA.filter((p) => p.featured);

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (activeFilter === 'all') {
      // When collapsed on 'all', exclude the 2 top flagships (already shown in the Flagship row above)
      // so the first 4 archive cards are ClubEZ Bot v2.0, N&I Group Enterprise, The Hearth, and Vixa Expense Tracker
      return showAllWorks ? true : !project.featured;
    }
    if (activeFilter === 'video') {
      return project.category === 'video' || project.category === 'graphics';
    }
    return project.category === activeFilter;
  });

  const INITIAL_ARCHIVE_LIMIT = activeFilter === 'all' ? 4 : 6;
  const visibleProjects = showAllWorks
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_ARCHIVE_LIMIT);
  const totalMatchingCount =
    activeFilter === 'all' ? PROJECTS_DATA.length : filteredProjects.length;
  const displayedTotalCount =
    activeFilter === 'all' && !showAllWorks
      ? visibleProjects.length + flagshipProjects.slice(0, 2).length
      : visibleProjects.length;

  // ScrollTrigger reveal for section title
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.portfolio-heading-reveal',
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Permanently initialize VanillaTilt on desktop
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(
      gridRef.current.querySelectorAll<HTMLElement & { vanillaTilt?: { destroy: () => void } }>(
        '.js-project-tilt'
      )
    );

    const win = window as unknown as {
      VanillaTilt?: { init: (target: HTMLElement[], settings: Record<string, unknown>) => void };
    };

    if (window.innerWidth > 768 && win.VanillaTilt && cards.length > 0) {
      win.VanillaTilt.init(cards, {
        max: 4,
        speed: 400,
        perspective: 1000
      });
    }

    return () => {
      cards.forEach((card) => {
        if (card.vanillaTilt) {
          card.vanillaTilt.destroy();
        }
      });
    };
  }, [activeFilter, showAllWorks]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Clicking any project card opens the scrollable Case-Study Lightbox Modal
  const handleCardClick = (project: ProjectItem) => {
    onSelectProjectLightbox(project);
  };

  const getCategoryLabel = (cat: ProjectItem['category']) => {
    switch (cat) {
      case 'ai':
        return 'AI CORE / SAAS';
      case 'website':
        return 'WEB / PLATFORM';
      case 'video':
        return 'VIDEO / SOFTWARE';
      case 'graphics':
        return '3D CGI / RENDER';
    }
  };

  const aiCount = PROJECTS_DATA.filter((p) => p.category === 'ai').length;
  const webCount = PROJECTS_DATA.filter((p) => p.category === 'website').length;
  const mediaCount = PROJECTS_DATA.filter(
    (p) => p.category === 'video' || p.category === 'graphics'
  ).length;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 border-b border-[var(--border-hairline)] relative"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* 1. Section Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[var(--border-hairline)]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
              01 <span className="text-[#e11d48]">/</span> DIGITAL PORTFOLIO &amp; FLAGSHIP SYSTEMS
            </p>
            <div className="overflow-hidden">
              <h2 className="portfolio-heading-reveal font-display text-6xl sm:text-7xl md:text-8xl tracking-tight leading-[0.9] text-[var(--text-main)]">
                SELECTED <span className="text-[#e11d48]">WORKS.</span>
              </h2>
            </div>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div className="filter-bar-controls flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `All (${PROJECTS_DATA.length})` },
              { id: 'ai', label: `AI & Autonomous Systems (${aiCount})` },
              { id: 'website', label: `Websites & Apps (${webCount})` },
              { id: 'video', label: `Media & 3D (${mediaCount})` }
            ].map((btn) => {
              const isActive = activeFilter === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  data-filter={btn.id}
                  onClick={() => setActiveFilter(btn.id as FilterCategory)}
                  className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#e11d48] border-[#e11d48] text-white font-semibold'
                      : 'bg-transparent border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)]'
                  }`}
                  data-cursor="link"
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Flagship Deployments Bento Spotlight Row (Visible when viewing 'all') */}
        {activeFilter === 'all' && (
          <div className="mt-12 mb-16">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#e11d48]">
                FLAGSHIP CREATIONS // 02 — SYSTEMS
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)] hidden sm:inline">
                CLICK ANY FLAGSHIP TO READ FULL SCROLLABLE CASE STUDY &amp; ARCHITECTURE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {flagshipProjects.slice(0, 2).map((project, idx) => {
                const hasGallery = Boolean(project.gallery && project.gallery.length > 0);
                return (
                  <article
                    key={`flagship-${project.id}`}
                    onMouseMove={handleCardMouseMove}
                    onClick={() => handleCardClick(project)}
                    data-cursor="explore"
                    className={`specular-card group cursor-pointer flex flex-col justify-between ${
                      idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                    }`}
                  >
                    {/* Top Bar Inside Card */}
                    <div className="px-6 py-4 border-b border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs">
                      <span className="text-[#e11d48] font-bold">
                        FLAGSHIP {project.index} · {getCategoryLabel(project.category)}
                      </span>
                      <span className="text-[var(--text-muted)]">{project.year}</span>
                    </div>

                    {/* Media Frame */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-elevated)]">
                      {!failedImages[project.id] ? (
                        <img
                          src={project.img}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                          }
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1a090d] to-[#08080a]">
                          <span className="font-display text-4xl text-[#e11d48]">{project.title}</span>
                          <span className="font-mono text-xs text-[var(--text-muted)] mt-1">
                            {project.deliverable}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-75 group-hover:opacity-45 transition-opacity" />

                      {/* Multi-Screenshot / Case Study Badge */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProjectLightbox(project);
                        }}
                        className="absolute top-3 right-3 z-20 px-3 py-1.5 bg-black/85 hover:bg-[#e11d48] text-white font-mono text-[10px] uppercase tracking-wider border border-white/15 transition-colors"
                        title="Open scrollable case study & gallery"
                      >
                        {hasGallery
                          ? `CASE STUDY · ${project.gallery!.length} IMAGES ⊞`
                          : 'READ CASE STUDY ⊞'}
                      </button>
                    </div>

                    {/* Card Details */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-display text-3xl sm:text-4xl tracking-wide text-[var(--text-main)] group-hover:text-[#e11d48] transition-colors">
                            {project.title}
                          </h3>
                          <span className="font-mono text-xs sm:text-sm text-[#e11d48] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                            {hasGallery ? 'OPEN CASE STUDY ⊞' : 'INSPECT SYSTEM ⊞'}
                          </span>
                        </div>
                        <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                          {project.desc}
                        </p>
                      </div>

                      {/* Clean Unboxed Metadata Line */}
                      <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--text-muted)]">
                        <span>{project.tags.join(' · ')}</span>
                        {project.link !== '#' ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#e11d48] hover:underline font-semibold"
                          >
                            LIVE URL ↗
                          </a>
                        ) : (
                          <span className="text-[var(--text-main)]">{project.deliverable}</span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Curated & Complete Archive Grid */}
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
              {showAllWorks ? 'COMPLETE ARCHIVE' : 'FEATURED ARCHIVE'} // SHOWING{' '}
              {displayedTotalCount} OF {totalMatchingCount} WORKS
            </span>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-[var(--text-muted)] hidden sm:inline">
                CLICK ANY PROJECT FOR SCROLLABLE DETAILS &amp; GALLERY
              </span>
              {filteredProjects.length > INITIAL_ARCHIVE_LIMIT && (
                <button
                  type="button"
                  onClick={() => setShowAllWorks((prev) => !prev)}
                  className="font-mono text-xs uppercase tracking-wider text-[#e11d48] hover:underline cursor-pointer font-semibold"
                  data-cursor="link"
                >
                  {showAllWorks
                    ? 'SHOW FEWER WORKS ↑'
                    : `VIEW ALL ${totalMatchingCount} WORKS ⊞`}
                </button>
              )}
            </div>
          </div>

          <div
            ref={gridRef}
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              !showAllWorks && activeFilter === 'all' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
            } gap-6`}
            id="portfolio-grid"
          >
            {visibleProjects.map((project, idx) => {
              const hasGallery = Boolean(project.gallery && project.gallery.length > 0);
              return (
                <article
                  key={`${activeFilter}-${project.id}`}
                  onMouseMove={handleCardMouseMove}
                  onClick={() => handleCardClick(project)}
                  data-cursor="explore"
                  style={{ animationDelay: `${(idx % 9) * 0.05}s` }}
                  className="specular-card js-project-tilt curtain-reveal-item group cursor-pointer flex flex-col justify-between print-break-avoid"
                >
                  {/* Card Header Index & Category */}
                  <div className="px-5 py-3.5 border-b border-[var(--border-hairline)] flex items-center justify-between font-mono text-xs">
                    <span
                      className="text-[#e11d48] font-bold tabular-nums"
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      {project.index}
                    </span>
                    <span className="text-[var(--text-muted)] uppercase tracking-wider text-[11px]">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>

                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-elevated)]">
                    {!failedImages[project.id] ? (
                      <img
                        src={project.img}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                        }
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1a090d] to-[#08080a]">
                        <span className="font-display text-3xl text-[#e11d48]">{project.title}</span>
                        <span className="font-mono text-xs text-[var(--text-muted)] mt-1">
                          {project.tags.join(' · ')}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                    {/* Lightbox Trigger Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProjectLightbox(project);
                      }}
                      className="absolute bottom-3 right-3 z-20 px-2.5 py-1 bg-black/80 hover:bg-[#e11d48] text-white font-mono text-[10px] uppercase tracking-wider border border-white/15 transition-colors"
                    >
                      {hasGallery
                        ? `${project.gallery!.length} IMAGES · DETAILS ⊞`
                        : 'READ DETAILS ⊞'}
                    </button>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-sans text-lg font-bold text-[var(--text-main)] group-hover:text-[#e11d48] transition-colors">
                          {project.title}
                        </h3>
                        <span className="font-mono text-xs text-[#e11d48] shrink-0 mt-1">
                          {hasGallery ? 'CASE STUDY' : 'DETAILS ⊞'}
                        </span>
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                        {project.desc}
                      </p>
                    </div>

                    {/* Unboxed Metadata Footer */}
                    <div className="mt-5 pt-3.5 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
                      <span>{project.tags.join(' · ')}</span>
                      {project.link !== '#' ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#e11d48] hover:underline font-semibold"
                        >
                          LIVE ↗
                        </a>
                      ) : (
                        <span>{project.year}</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* View All Works / Show Fewer Works Toggle Footer */}
          {filteredProjects.length > INITIAL_ARCHIVE_LIMIT && (
            <div className="mt-12 pt-8 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
              <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">
                {showAllWorks
                  ? `DISPLAYING ALL ${totalMatchingCount} ARCHIVED PROJECTS & SYSTEMS`
                  : `SHOWING TOP ${displayedTotalCount} CURATED CREATIONS · ${
                      totalMatchingCount - displayedTotalCount
                    } MORE IN ARCHIVE`}
              </p>
              <button
                type="button"
                onClick={() => setShowAllWorks((prev) => !prev)}
                className="px-8 py-4 bg-[#e11d48] hover:bg-[#be123c] text-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors inline-flex items-center gap-3 cursor-pointer"
                data-cursor="link"
              >
                <span>
                  {showAllWorks
                    ? 'SHOW CURATED SELECTION ↑'
                    : `VIEW ALL WORKS (${totalMatchingCount}) ⊞`}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
