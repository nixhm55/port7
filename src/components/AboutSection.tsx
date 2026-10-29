import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ABOUT_CONTENT } from '../data/portfolioData';
import { ArchitecturalPlate } from './ArchitecturalPlate';
import { motionUtils, useMotionEnvironment } from '../motion/useMotionSystem';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const portraitFrameRef = useRef<HTMLDivElement | null>(null);
  const portraitInnerRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion, isMobile } = useMotionEnvironment();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            '.about__heading-Wrap',
            '.about__portrait-frame',
            '.about__narrative-col',
            '.about__principle-item',
          ],
          { opacity: 1, x: 0, y: 0, clipPath: 'none' }
        );
        return;
      }

      // Signature Animation Family #3:
      // Opposing horizontal vector entrance + horizontal shutter reveal + layered counter-parallax
      motionUtils.revealDirectional('.about__heading-col', {
        x: isMobile ? -24 : -68,
        y: 0,
        rotateY: 6,
        duration: 1.15,
        ease: 'power3.out',
        trigger: '.about__top-grid',
        start: 'top 82%',
      });

      // Portrait frame reveals via horizontal-right shutter mask
      motionUtils.revealMaskedFrame(portraitFrameRef.current, portraitInnerRef.current, {
        direction: 'horizontal-left',
        duration: 1.3,
        innerScale: 1.12,
        trigger: portraitFrameRef.current,
        start: 'top 82%',
      });

      // Narrative column rises gently into place while secondary principles stagger in from the right
      motionUtils.revealDirectional('.about__narrative-block', {
        x: 0,
        y: 42,
        duration: 1.0,
        stagger: 0.12,
        trigger: '.about__content-grid',
        start: 'top 84%',
      });

      motionUtils.revealLine('.about__divider-line', {
        axis: 'x',
        origin: 'left center',
        duration: 1.1,
        stagger: 0.12,
        trigger: '.about__principles-list',
        start: 'top 88%',
      });

      motionUtils.revealDirectional('.about__principle-item', {
        x: isMobile ? 18 : 44,
        y: 12,
        duration: 0.95,
        stagger: 0.12,
        trigger: '.about__principles-list',
        start: 'top 86%',
      });

      // Subtle layered parallax between portrait frame and floating caption badge
      if (!isMobile) {
        motionUtils.parallaxScroll('.about__portrait-column', el, {
          yPercent: -10,
          scrub: 0.65,
        });
        motionUtils.parallaxScroll('.about__floating-note', el, {
          yPercent: -22,
          scrub: 0.5,
        });
      }
    }, el);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="section-header-tag">
          <span className="mono-label">{ABOUT_CONTENT.index}</span>
          <span className="section-header-tag__dash" aria-hidden="true" />
          <span className="mono-label">PRACTICE & PERSPECTIVE</span>
        </div>

        {/* Opposing directional header row */}
        <div className="about__top-grid">
          <div className="about__heading-col">
            <h2 id="about-heading" className="about__heading">
              <span>{ABOUT_CONTENT.headingLines[0]}</span>
              <span className="about__heading-italic">{ABOUT_CONTENT.headingLines[1]}</span>
            </h2>
          </div>
          <div className="about__top-meta mono-label">
            <span>PERSPECTIVE // 02</span>
            <span>EDITABLE BIOGRAPHICAL MONOGRAPH</span>
          </div>
        </div>

        {/* Asymmetrical 3-column editorial spread */}
        <div className="about__content-grid">
          {/* Column 1: Spatial Portrait Placeholder */}
          <div className="about__portrait-column">
            <div ref={portraitFrameRef} className="about__portrait-frame">
              <div ref={portraitInnerRef} className="about__portrait-inner">
                <ArchitecturalPlate
                  motif="portrait-study"
                  index="01"
                  label="Nisam // PORTRAIT PLATE"
                />
              </div>
            </div>
            <p className="about__portrait-caption mono-label">
              {ABOUT_CONTENT.portraitCaption}
            </p>
          </div>

          {/* Column 2: Narrow Editorial Text Column */}
          <div className="about__narrative-col">
            <p className="about__lead-copy about__narrative-block">
              {ABOUT_CONTENT.leadCopy}
            </p>
            <p className="about__secondary-copy about__narrative-block">
              {ABOUT_CONTENT.secondaryCopy}
            </p>

            <div className="about__floating-note about__narrative-block">
              <span className="mono-label about__note-badge">AUTHENTICITY NOTE</span>
              <p className="about__note-text">{ABOUT_CONTENT.editableNote}</p>
            </div>
          </div>

          {/* Column 3: Secondary Principles & Fine Dividers */}
          <div className="about__principles-col">
            <div className="about__principles-header mono-label">
              <span>ARCHITECTURAL TENETS</span>
              <span>01 — 03</span>
            </div>

            <div className="about__principles-list">
              {ABOUT_CONTENT.principles.map((item) => (
                <article key={item.code} className="about__principle-item">
                  <div className="about__divider-line structural-line" aria-hidden="true" />
                  <div className="about__principle-meta">
                    <span className="mono-label about__principle-code">{item.code}</span>
                    <h3 className="about__principle-title">{item.title}</h3>
                  </div>
                  <p className="about__principle-detail">{item.detail}</p>
                </article>
              ))}
              <div className="about__divider-line structural-line" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
