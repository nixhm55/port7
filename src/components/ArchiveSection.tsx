import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ARCHIVE_STUDIES } from '../data/portfolioData';
import { useMotionEnvironment } from '../motion/useMotionSystem';

export const ArchiveSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { prefersReducedMotion, isMobile } = useMotionEnvironment();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.archive-card', { opacity: 1, x: 0, y: 0, rotateY: 0 });
        return;
      }

      // Signature Animation Family #7:
      // Spatial depth cards entering with staggered Z/Y perspective planes and horizontal scroll drift
      gsap.fromTo(
        '.archive-card',
        {
          y: 36,
          rotateY: isMobile ? 0 : -12,
          rotateX: isMobile ? 0 : 6,
          opacity: 0,
          transformPerspective: 1000,
        },
        {
          y: 0,
          rotateY: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.archive__grid',
            start: 'top 84%',
          },
        }
      );

      if (!isMobile) {
        gsap.to('.archive__grid', {
          xPercent: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  return (
    <section
      id="archive"
      ref={sectionRef}
      className="archive-section"
      aria-labelledby="archive-heading"
    >
      <div className="container">
        <div className="section-header-tag">
          <span className="mono-label">07 / VISUAL ARCHIVE &amp; MOTION LABORATORY</span>
          <span className="section-header-tag__dash" aria-hidden="true" />
          <span className="mono-label">SPATIAL STUDIES (ARC 01 — 04)</span>
        </div>

        <div className="archive__header-row">
          <h2 id="archive-heading" className="archive__heading">
            Experimental <span className="archive__heading-italic">spatial fragments.</span>
          </h2>
          <p className="archive__subcopy">
            Smaller motion studies, clipping experiments, and typographic proportion tests (replaceable demonstration archive).
          </p>
        </div>

        <div className="archive__grid">
          {ARCHIVE_STUDIES.map((study, idx) => (
            <article key={study.code} className="archive-card">
              <div className="archive-card__top mono-label">
                <span>{study.code}</span>
                <span>{study.yearPlaceholder}</span>
              </div>

              <div className="archive-card__diagram" aria-hidden="true">
                <svg viewBox="0 0 280 160" className="archive-card__svg">
                  <rect x="1" y="1" width="278" height="158" fill="none" stroke="currentColor" strokeOpacity="0.16" />
                  {idx === 0 && (
                    <>
                      <polygon
                        points="55,30 215,18 215,130 55,142"
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.45"
                      />
                      <polygon
                        points="85,44 235,34 235,116 85,126"
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeOpacity="0.8"
                      />
                    </>
                  )}
                  {idx === 1 && (
                    <>
                      <rect x="40" y="28" width="200" height="104" fill="none" stroke="currentColor" strokeOpacity="0.3" />
                      <line x1="40" y1="80" x2="240" y2="80" stroke="var(--color-accent)" strokeOpacity="0.85" />
                      <rect x="85" y="48" width="110" height="64" fill="currentColor" fillOpacity="0.07" />
                    </>
                  )}
                  {idx === 2 && (
                    <>
                      <line x1="65" y1="15" x2="65" y2="145" stroke="var(--color-accent)" strokeOpacity="0.8" />
                      <line x1="20" y1="55" x2="260" y2="55" stroke="currentColor" strokeOpacity="0.28" />
                      <line x1="20" y1="105" x2="260" y2="105" stroke="currentColor" strokeOpacity="0.28" />
                      <circle cx="65" cy="55" r="4" fill="var(--color-accent)" />
                    </>
                  )}
                  {idx === 3 && (
                    <>
                      <line x1="93" y1="1" x2="93" y2="159" stroke="currentColor" strokeOpacity="0.2" />
                      <line x1="186" y1="1" x2="186" y2="159" stroke="currentColor" strokeOpacity="0.2" />
                      <rect x="93" y="36" width="93" height="88" fill="currentColor" fillOpacity="0.08" stroke="var(--color-accent)" />
                    </>
                  )}
                </svg>
              </div>

              <h3 className="archive-card__title">{study.title}</h3>
              <p className="archive-card__medium mono-label">{study.medium}</p>
              <p className="archive-card__note">{study.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
