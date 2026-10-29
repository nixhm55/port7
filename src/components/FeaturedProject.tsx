import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FEATURED_STORY } from '../data/portfolioData';
import { useMotionEnvironment } from '../motion/useMotionSystem';

export const FeaturedProject: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageFrameRef = useRef<HTMLDivElement | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const { prefersReducedMotion, isMobile } = useMotionEnvironment();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            '.featured__opening-title',
            '.featured__stage-aperture',
            '.featured__chapter-card',
          ],
          { opacity: 1, x: 0, y: 0, scale: 1, clipPath: 'none' }
        );
        return;
      }

      // Opening title reveal
      gsap.fromTo(
        '.featured__opening-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.featured__opening',
            start: 'top 82%',
          },
        }
      );

      // Progressive frame expansion & spatial transformation linked to scroll progress
      if (!isMobile && stageFrameRef.current) {
        const stageTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.featured__narrative-track',
            start: 'top 65%',
            end: 'bottom 35%',
            scrub: 0.65,
          },
        });

        // Stage aperture expands from compressed vertical frame into full panoramic architectural frame
        stageTl
          .fromTo(
            '.featured__stage-aperture',
            {
              clipPath: 'inset(10% 22% 10% 22%)',
              rotateX: 7,
              scale: 0.94,
            },
            {
              clipPath: 'inset(3% 6% 3% 6%)',
              rotateX: 2,
              scale: 0.98,
              duration: 1,
              ease: 'power2.inOut',
            }
          )
          .to('.featured__stage-aperture', {
            clipPath: 'inset(0% 0% 0% 0%)',
            rotateX: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          });

        // Inner architectural rings & light planes counter-move in depth
        gsap.fromTo(
          '.featured__svg-corridor',
          { scale: 1.24, yPercent: 10 },
          {
            scale: 1,
            yPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: '.featured__narrative-track',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          }
        );

        gsap.fromTo(
          '.featured__svg-horizon',
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: '.featured__narrative-track',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      }

      // Observe each narrative chapter to update the sticky visual stage state
      const chapters = gsap.utils.toArray<HTMLElement>('.featured__chapter-card');
      chapters.forEach((chapter, index) => {
        gsap.fromTo(
          chapter,
          { y: 36, opacity: 0.25 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: chapter,
              start: 'top 78%',
              end: 'bottom 35%',
              onEnter: () => setActiveChapterIndex(index),
              onEnterBack: () => setActiveChapterIndex(index),
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  const activeChapter = FEATURED_STORY.chapters[activeChapterIndex] || FEATURED_STORY.chapters[0];

  return (
    <section
      id="featured-story"
      ref={sectionRef}
      className="featured-section"
      aria-labelledby="featured-story-heading"
    >
      <div className="container">
        {/* Opening Project Statement */}
        <div className="featured__opening">
          <div className="section-header-tag featured__opening-reveal">
            <span className="mono-label">{FEATURED_STORY.index}</span>
            <span className="section-header-tag__dash" aria-hidden="true" />
            <span className="mono-label">{FEATURED_STORY.badge}</span>
          </div>

          <div className="featured__opening-grid">
            <div className="featured__opening-main">
              <h2 id="featured-story-heading" className="featured__opening-title featured__opening-reveal">
                {FEATURED_STORY.title}
              </h2>
              <p className="featured__opening-subtitle featured__opening-reveal">
                {FEATURED_STORY.subtitle}
              </p>
            </div>

            <div className="featured__opening-meta featured__opening-reveal">
              <div className="featured__meta-pair">
                <span className="mono-label">EDITION / YEAR</span>
                <span>{FEATURED_STORY.year}</span>
              </div>
              <div className="featured__meta-pair">
                <span className="mono-label">SCOPE</span>
                <span>{FEATURED_STORY.role}</span>
              </div>
              <p className="featured__overview-text">{FEATURED_STORY.overview}</p>
            </div>
          </div>
        </div>

        {/* Sticky Editorial Narrative & Expanding Spatial Stage */}
        <div className="featured__narrative-track">
          {/* Left Sticky Visual Stage */}
          <div className="featured__sticky-col">
            <div ref={stageFrameRef} className="featured__stage-wrapper">
              <div className="featured__stage-topbar mono-label">
                <span>ACTIVE SCENE // {activeChapter.step}</span>
                <span>{activeChapter.toneNote}</span>
              </div>

              <div
                className={`featured__stage-aperture featured__stage-aperture--${activeChapter.aspectState}`}
              >
                <svg
                  viewBox="0 0 1000 680"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="featured__stage-svg"
                  aria-label={activeChapter.caption}
                >
                  <defs>
                    <linearGradient id="nocturneBg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#141312" />
                      <stop offset="50%" stopColor="#1D1B18" />
                      <stop offset="100%" stopColor="#0C0B0A" />
                    </linearGradient>
                    <radialGradient id="nocturneGlow" cx="50%" cy="48%" r="50%">
                      <stop offset="0%" stopColor="#C84B31" stopOpacity="0.24" />
                      <stop offset="60%" stopColor="#EDE8DF" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="#0C0B0A" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <rect width="1000" height="680" fill="url(#nocturneBg)" />
                  <circle cx="500" cy="340" r="360" fill="url(#nocturneGlow)" />

                  {/* Perspective corridor lines */}
                  <g className="featured__svg-corridor">
                    <line x1="0" y1="0" x2="360" y2="230" stroke="#F4F0EA" strokeOpacity="0.14" />
                    <line x1="1000" y1="0" x2="640" y2="230" stroke="#F4F0EA" strokeOpacity="0.14" />
                    <line x1="0" y1="680" x2="360" y2="450" stroke="#F4F0EA" strokeOpacity="0.14" />
                    <line x1="1000" y1="680" x2="640" y2="450" stroke="#F4F0EA" strokeOpacity="0.14" />

                    <rect
                      x="180"
                      y="110"
                      width="640"
                      height="460"
                      stroke="#F4F0EA"
                      strokeOpacity="0.18"
                    />
                    <rect
                      x="280"
                      y="175"
                      width="440"
                      height="330"
                      fill="#151412"
                      fillOpacity="0.65"
                      stroke="#F4F0EA"
                      strokeOpacity="0.28"
                    />
                    <rect
                      x="360"
                      y="230"
                      width="280"
                      height="220"
                      fill="#0E0D0C"
                      stroke="#F4F0EA"
                      strokeOpacity="0.42"
                    />
                  </g>

                  {/* Dynamic horizon & focal marker */}
                  <g className="featured__svg-horizon">
                    <line x1="120" y1="340" x2="880" y2="340" stroke="#C84B31" strokeOpacity="0.7" />
                    <circle
                      cx={activeChapterIndex === 0 ? 420 : activeChapterIndex === 1 ? 500 : 580}
                      cy="340"
                      r="7"
                      fill="#C84B31"
                    />
                    <circle
                      cx="500"
                      cy="340"
                      r={activeChapterIndex === 0 ? 48 : activeChapterIndex === 1 ? 92 : 136}
                      stroke="#F4F0EA"
                      strokeOpacity="0.3"
                    />
                  </g>

                  <text
                    x="204"
                    y="144"
                    fill="#F4F0EA"
                    fillOpacity="0.6"
                    fontSize="11"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="2"
                  >
                    NOCTURNE SPATIAL STAGE // {activeChapter.step}
                  </text>
                  <text
                    x="204"
                    y="546"
                    fill="#F4F0EA"
                    fillOpacity="0.45"
                    fontSize="11"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="1.5"
                  >
                    {activeChapter.label} — STATE 0{activeChapterIndex + 1} / 03
                  </text>
                </svg>
              </div>

              <div className="featured__stage-footer">
                <p className="featured__stage-caption mono-label">{activeChapter.caption}</p>
                <div className="featured__chapter-pills" role="tablist" aria-label="Story Chapters">
                  {FEATURED_STORY.chapters.map((chap, idx) => (
                    <button
                      key={chap.id}
                      type="button"
                      role="tab"
                      aria-selected={activeChapterIndex === idx}
                      className={`featured__chapter-pill mono-label ${
                        activeChapterIndex === idx ? 'is-active' : ''
                      }`}
                      onClick={() => {
                        setActiveChapterIndex(idx);
                        const card = document.getElementById(chap.id);
                        card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Scrolling Narrative Chapters */}
          <div className="featured__chapters-col">
            {FEATURED_STORY.chapters.map((chapter, idx) => (
              <article
                id={chapter.id}
                key={chapter.id}
                className={`featured__chapter-card ${
                  activeChapterIndex === idx ? 'featured__chapter-card--active' : ''
                }`}
              >
                <div className="featured__chapter-meta mono-label">
                  <span className="featured__chapter-step">{chapter.step}</span>
                  <span>{chapter.label}</span>
                </div>
                <h3 className="featured__chapter-heading">{chapter.heading}</h3>
                <p className="featured__chapter-body">{chapter.body}</p>
                <div className="featured__chapter-spec mono-label">
                  <span>{chapter.toneNote}</span>
                  <span>FRAME MODE: {chapter.aspectState.toUpperCase()}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Closing transition bridge back to light editorial rhythm */}
        <div className="featured__closing-bridge">
          <div className="structural-line" aria-hidden="true" />
          <div className="featured__closing-row mono-label">
            <span>END OF FEATURED VISUAL STORY // NOCTURNE</span>
            <a href="#approach" className="featured__closing-link">
              <span>CONTINUE TO CREATIVE APPROACH</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
