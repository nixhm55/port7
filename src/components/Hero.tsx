import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SITE_IDENTITY } from '../data/portfolioData';
import { ArchitecturalPlate } from './ArchitecturalPlate';
import { useMotionEnvironment } from '../motion/useMotionSystem';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const spatialStageRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion, isMobile } = useMotionEnvironment();

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            '.hero__eyebrow-inner',
            '.hero__title-line-inner',
            '.hero__subcopy',
            '.hero__disclaimer',
            '.hero__stage-frame',
            '.hero__floating-card',
            '.hero__scroll-cue',
            '.hero__rule',
          ],
          { opacity: 1, x: 0, y: 0, yPercent: 0, xPercent: 0, scale: 1, clipPath: 'none' }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 1. Structural grid rules draw out
      tl.fromTo(
        '.hero__rule',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.1, stagger: 0.12, ease: 'expo.out' },
        0.05
      );

      // 2. Small typographic availability & index element reveals itself
      tl.fromTo(
        '.hero__eyebrow-inner',
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.08 },
        0.12
      );

      // 3. Primary headline enters through multi-axis mask choreography
      tl.fromTo(
        '.hero__title-line--1 .hero__title-line-inner',
        { yPercent: 115, rotateX: -20, opacity: 0 },
        { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.15 },
        0.22
      );

      tl.fromTo(
        '.hero__title-line--2 .hero__title-line-inner',
        { xPercent: -14, yPercent: 100, opacity: 0 },
        { xPercent: 0, yPercent: 0, opacity: 1, duration: 1.2 },
        0.32
      );

      tl.fromTo(
        '.hero__title-line--3 .hero__title-line-inner',
        { yPercent: 115, xPercent: 8, opacity: 0 },
        { yPercent: 0, xPercent: 0, opacity: 1, duration: 1.2 },
        0.42
      );

      // 4. Spatial visual stage reveals through an expanding vertical mask
      tl.fromTo(
        '.hero__stage-frame',
        { clipPath: 'inset(100% 0% 0% 0%)', y: 36, opacity: 0.2 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          opacity: 1,
          duration: 1.35,
          ease: 'power4.inOut',
          clearProps: 'clipPath',
        },
        0.28
      );

      tl.fromTo(
        '.hero__stage-inner',
        { scale: 1.16, yPercent: 8 },
        { scale: 1, yPercent: 0, duration: 1.55, ease: 'power3.out' },
        0.28
      );

      // 5. Supporting copy & foreground depth plane enter with distinct timing
      tl.fromTo(
        ['.hero__subcopy', '.hero__disclaimer', '.hero__actions'],
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.95, stagger: 0.1, ease: 'power3.out' },
        0.58
      );

      tl.fromTo(
        '.hero__floating-card',
        { x: -28, y: 24, rotateY: 12, opacity: 0 },
        { x: 0, y: 0, rotateY: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
        0.68
      );

      // 6. Scroll cue settles naturally
      tl.fromTo(
        '.hero__scroll-cue',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85 },
        0.82
      );

      // 7. Scroll-linked depth parallax as user begins scrolling
      if (!isMobile) {
        gsap.to('.hero__stage-wrap', {
          yPercent: -14,
          rotateX: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });

        gsap.to('.hero__floating-card', {
          yPercent: -28,
          xPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });

        gsap.to('.hero__headline-block', {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  // Subtle spatial pointer perspective on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || isMobile || !spatialStageRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(spatialStageRef.current, {
      rotateY: relX * 7,
      rotateX: -relY * 6,
      x: relX * 12,
      y: relY * 10,
      duration: 0.9,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    if (!spatialStageRef.current) return;
    gsap.to(spatialStageRef.current, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      duration: 1.1,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Opening Portfolio Composition"
    >
      <div className="container hero__container">
        {/* Top editorial metadata bar */}
        <div className="hero__topbar">
          <div className="hero__eyebrow-mask">
            <span className="hero__eyebrow-inner mono-label">
              {SITE_IDENTITY.editionLabel}
            </span>
          </div>
          <div className="hero__eyebrow-mask">
            <span className="hero__eyebrow-inner mono-label hero__status-pill">
              <span className="hero__status-dot" aria-hidden="true" />
              {SITE_IDENTITY.availabilityLabel}
            </span>
          </div>
        </div>

        <div className="hero__rule structural-line" aria-hidden="true" />

        {/* Asymmetric 12-column spatial composition */}
        <div className="hero__grid">
          <div className="hero__left-col">
            <div className="hero__wordmark-tag">
              <span className="mono-label">PORTFOLIO MONOGRAPH //</span>
              <strong className="hero__wordmark-name">{SITE_IDENTITY.name}</strong>
            </div>

            <h1 className="hero__headline-block" aria-label="Nisam — Quiet Spatial Precision">
              <span className="hero__title-line hero__title-line--1">
                <span className="hero__title-line-inner">{SITE_IDENTITY.heroHeadline.topLine}</span>
              </span>
              <span className="hero__title-line hero__title-line--2">
                <span className="hero__title-line-inner hero__title-italic">
                  {SITE_IDENTITY.heroHeadline.middleLine}
                </span>
              </span>
              <span className="hero__title-line hero__title-line--3">
                <span className="hero__title-line-inner">{SITE_IDENTITY.heroHeadline.bottomLine}</span>
              </span>
            </h1>

            <div className="hero__editorial-body">
              <p className="hero__subcopy">{SITE_IDENTITY.heroSubcopy}</p>
              <p className="hero__disclaimer">{SITE_IDENTITY.editorialDisclaimer}</p>

              <div className="hero__actions">
                <a href="#projects" className="btn-editorial btn-editorial--primary">
                  <span>Explore Selected Works</span>
                  <span className="btn-editorial__arrow" aria-hidden="true">↓</span>
                </a>
                <a href="#featured-story" className="btn-editorial btn-editorial--ghost">
                  <span>Featured Visual Story</span>
                  <span className="btn-editorial__arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right spatial depth stage */}
          <div className="hero__right-col">
            <div ref={spatialStageRef} className="hero__stage-wrap">
              <div className="hero__stage-backdrop" aria-hidden="true" />
              <div className="hero__stage-frame">
                <div className="hero__stage-inner">
                  <ArchitecturalPlate
                    motif="hero-spatial"
                    index="00"
                    label="Nisam // SPATIAL COMPOSITION"
                  />
                </div>
              </div>

              {/* Overlapping foreground spatial coordinate card */}
              <div className="hero__floating-card">
                <div className="hero__floating-header">
                  <span className="mono-label">FIG. 00 — SPATIAL DEPTH</span>
                  <span className="hero__floating-dot" aria-hidden="true" />
                </div>
                <p className="hero__floating-text">
                  {SITE_IDENTITY.rolePlaceholder}
                </p>
                <div className="hero__floating-coords mono-label">
                  <span>AXIS: MULTI-PLANE</span>
                  <span>PERSPECTIVE: 1100PX</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__rule structural-line" aria-hidden="true" />

        {/* Bottom bar with scroll indicator */}
        <div className="hero__bottombar">
          <div className="hero__scroll-cue">
            <a href="#manifesto" className="hero__scroll-link" aria-label="Scroll to introductory statement">
              <span className="hero__scroll-line-track" aria-hidden="true">
                <span className="hero__scroll-line-thumb" />
              </span>
              <span className="mono-label">SCROLL TO TRAVERSE EXPERIENCE</span>
            </a>
          </div>

          <div className="hero__coordinates mono-label">
            <span>CONTINUOUS SINGLE-PAGE EDITION</span>
            <span>01 — 08 SCENES</span>
          </div>
        </div>
      </div>
    </section>
  );
};
