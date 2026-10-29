import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { INTRO_STATEMENT } from '../data/portfolioData';
import { useMotionEnvironment } from '../motion/useMotionSystem';

export const IntroStatement: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { prefersReducedMotion, isMobile } = useMotionEnvironment();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(['.intro__line-item', '.intro__body', '.intro__metric-item', '.intro__bridge-line'], {
          x: 0,
          y: 0,
          opacity: 1,
          scaleY: 1,
        });
        return;
      }

      // Signature Animation Family #2:
      // Oversized editorial lines sliding horizontally from alternating directions into optical alignment
      const lines = gsap.utils.toArray<HTMLElement>('.intro__line-item');
      lines.forEach((line, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const offset = isMobile ? 28 * direction : 75 * direction;

        gsap.fromTo(
          line,
          {
            x: offset,
            opacity: 0.15,
            rotateZ: direction * 0.8,
          },
          {
            x: 0,
            opacity: 1,
            rotateZ: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 90%',
              end: 'top 48%',
              scrub: 0.55,
            },
          }
        );
      });

      // Supporting paragraph & metrics reveal with crisp horizontal divider draw
      gsap.fromTo(
        '.intro__rule',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.intro__footer-grid',
            start: 'top 86%',
          },
        }
      );

      gsap.fromTo(
        ['.intro__body', '.intro__metric-item'],
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.intro__footer-grid',
            start: 'top 85%',
          },
        }
      );

      // Transitional vertical bridge line extending into the About section
      gsap.fromTo(
        '.intro__bridge-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.intro__bridge-wrap',
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 0.4,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="intro-section"
      aria-label="Introductory Spatial Statement"
    >
      <div className="container">
        <div className="section-header-tag">
          <span className="mono-label">{INTRO_STATEMENT.index}</span>
          <span className="section-header-tag__dash" aria-hidden="true" />
          <span className="mono-label">SPATIAL THESIS</span>
        </div>

        <div className="intro__display-stack">
          {INTRO_STATEMENT.leadLines.map((line, idx) => (
            <div
              key={idx}
              className={`intro__line-item intro__line-item--${idx + 1}`}
            >
              <span className="intro__line-index mono-label">0{idx + 1}</span>
              <p className="intro__line-text">{line}</p>
            </div>
          ))}
        </div>

        <div className="intro__rule structural-line" aria-hidden="true" />

        <div className="intro__footer-grid">
          <div className="intro__body-col">
            <p className="intro__body">{INTRO_STATEMENT.supportingParagraph}</p>
          </div>

          <div className="intro__metrics-col">
            {INTRO_STATEMENT.metrics.map((metric, idx) => (
              <div key={idx} className="intro__metric-item">
                <span className="mono-label intro__metric-label">{metric.label}</span>
                <span className="intro__metric-value">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Continuous spatial transition element connecting into About */}
        <div className="intro__bridge-wrap" aria-hidden="true">
          <div className="intro__bridge-line" />
        </div>
      </div>
    </section>
  );
};
