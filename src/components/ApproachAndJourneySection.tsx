import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { APPROACH_DISCIPLINES, JOURNEY_MILESTONES } from '../data/portfolioData';
import { motionUtils, useMotionEnvironment } from '../motion/useMotionSystem';

export const ApproachAndJourneySection: React.FC = () => {
  const approachRef = useRef<HTMLElement | null>(null);
  const journeyRef = useRef<HTMLElement | null>(null);
  const [activeDiscipline, setActiveDiscipline] = useState<string>(APPROACH_DISCIPLINES[0].index);
  const { prefersReducedMotion } = useMotionEnvironment();

  useEffect(() => {
    const approachEl = approachRef.current;
    if (!approachEl) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(['.approach__rule', '.approach__row', '.journey__node', '.journey__progress-bar'], {
          opacity: 1,
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
        });
        return;
      }

      // Signature Animation Family #5 (Skills & Approach):
      // Precision horizontal line drawing + sequential typographic index reveal
      motionUtils.revealLine('.approach__rule', {
        axis: 'x',
        origin: 'left center',
        duration: 1.1,
        stagger: 0.1,
        trigger: '.approach__matrix',
        start: 'top 84%',
      });

      gsap.fromTo(
        '.approach__row',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.approach__matrix',
            start: 'top 82%',
          },
        }
      );
    }, approachEl);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const journeyEl = journeyRef.current;
    if (!journeyEl) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Signature Animation Family #6 (Journey & Milestones):
      // Scroll-linked vertical spine drawing + sequential marker activation
      gsap.fromTo(
        '.journey__spine-fill',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.journey__timeline',
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 0.4,
          },
        }
      );

      const nodes = gsap.utils.toArray<HTMLElement>('.journey__node');
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { x: 28, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 84%',
            },
          }
        );
      });
    }, journeyEl);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <>
      {/* 05 / CREATIVE APPROACH & DISCIPLINES */}
      <section
        id="approach"
        ref={approachRef}
        className="approach-section"
        aria-labelledby="approach-heading"
      >
        <div className="container">
          <div className="section-header-tag">
            <span className="mono-label">05 / CREATIVE APPROACH &amp; DISCIPLINES</span>
            <span className="section-header-tag__dash" aria-hidden="true" />
            <span className="mono-label">TYPOGRAPHIC CAPABILITY INDEX</span>
          </div>

          <div className="approach__intro-grid">
            <h2 id="approach-heading" className="approach__heading">
              Precision across direction,{' '}
              <span className="approach__heading-italic">motion, and code.</span>
            </h2>
            <p className="approach__intro-copy">
              Rather than arbitrary percentage bars, capabilities are organized around four interconnected disciplines. Select or hover any row to inspect the underlying methodology.
            </p>
          </div>

          <div className="approach__matrix">
            <div className="approach__rule structural-line" aria-hidden="true" />
            {APPROACH_DISCIPLINES.map((item) => {
              const isExpanded = activeDiscipline === item.index;
              return (
                <div
                  key={item.index}
                  className={`approach__row ${isExpanded ? 'approach__row--active' : ''}`}
                  onMouseEnter={() => setActiveDiscipline(item.index)}
                >
                  <button
                    type="button"
                    className="approach__row-trigger"
                    onClick={() => setActiveDiscipline(item.index)}
                    aria-expanded={isExpanded}
                  >
                    <span className="approach__index mono-label">{item.index}</span>
                    <span className="approach__title">{item.title}</span>
                    <span className="approach__focus mono-label">{item.focus}</span>
                    <span className="approach__indicator mono-label" aria-hidden="true">
                      {isExpanded ? '—' : '+'}
                    </span>
                  </button>

                  <div className="approach__row-details">
                    <div className="approach__row-details-inner">
                      <p className="approach__summary">{item.summary}</p>
                      <ul className="approach__capabilities mono-label">
                        {item.capabilities.map((cap, idx) => (
                          <li key={idx}>
                            <span className="approach__cap-dot" aria-hidden="true" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="approach__rule structural-line" aria-hidden="true" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 06 / JOURNEY & SELECTED MILESTONES */}
      <section
        id="journey"
        ref={journeyRef}
        className="journey-section"
        aria-labelledby="journey-heading"
      >
        <div className="container">
          <div className="section-header-tag">
            <span className="mono-label">06 / EVOLUTION &amp; MILESTONES</span>
            <span className="section-header-tag__dash" aria-hidden="true" />
            <span className="mono-label">REPLACEABLE TIMELINE ARCHITECTURE</span>
          </div>

          <div className="journey__grid">
            <div className="journey__left-col">
              <h2 id="journey-heading" className="journey__heading">
                Continuity of <span className="journey__heading-italic">practice.</span>
              </h2>
              <p className="journey__lead">
                Structured with honest, editable timeline slots so real career milestones, exhibitions, or independent launches can be inserted without fictionalized history.
              </p>
            </div>

            <div className="journey__timeline">
              <div className="journey__spine-track" aria-hidden="true">
                <div className="journey__spine-fill" />
              </div>

              {JOURNEY_MILESTONES.map((milestone) => (
                <article key={milestone.phase} className="journey__node">
                  <div className="journey__marker" aria-hidden="true" />
                  <div className="journey__node-header mono-label">
                    <span className="journey__phase">{milestone.phase}</span>
                    <span className="journey__period">{milestone.periodPlaceholder}</span>
                    <span className="journey__tag">{milestone.artifactTag}</span>
                  </div>
                  <h3 className="journey__node-title">{milestone.title}</h3>
                  <p className="journey__node-desc">{milestone.description}</p>
                  <span className="journey__node-note mono-label">{milestone.contextNote}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
