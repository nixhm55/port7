import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ProjectItem, SELECTED_PROJECTS } from '../data/portfolioData';
import { ArchitecturalPlate } from './ArchitecturalPlate';
import { motionUtils, useMotionEnvironment } from '../motion/useMotionSystem';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const { prefersReducedMotion, isMobile } = useMotionEnvironment();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            '.projects__header-title',
            '.project-card',
            '.project-card__frame',
            '.project-card__meta',
            '.project-card__title-block',
          ],
          { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, clipPath: 'none' }
        );
        return;
      }

      // Section Header Reveal
      motionUtils.revealTextLines('.projects__header-line', {
        yPercent: 105,
        duration: 1.05,
        stagger: 0.1,
        trigger: '.projects__header',
        start: 'top 84%',
      });

      // DISTINCT ENTRANCE FAMILY PER PROJECT IN THE EXHIBITION:
      // Project 01 (wide-asymmetric): Vertical shutter mask reveal + counter-moving title
      const p1Frame = el.querySelector('.project-card--0 .project-card__frame');
      const p1Inner = el.querySelector('.project-card--0 .project-card__plate-inner');
      motionUtils.revealMaskedFrame(p1Frame, p1Inner, {
        direction: 'vertical-up',
        duration: 1.35,
        innerScale: 1.15,
        trigger: '.project-card--0',
        start: 'top 82%',
      });
      motionUtils.revealDirectional('.project-card--0 .project-card__info', {
        x: 0,
        y: 44,
        duration: 1.05,
        delay: 0.15,
        trigger: '.project-card--0',
        start: 'top 80%',
      });

      // Project 02 (narrow-vertical): Lateral horizontal slide entrance + opposing metadata reveal
      motionUtils.revealDirectional('.project-card--1 .project-card__visual-col', {
        x: isMobile ? 28 : 84,
        y: 16,
        duration: 1.2,
        ease: 'power4.out',
        trigger: '.project-card--1',
        start: 'top 82%',
      });
      motionUtils.revealDirectional('.project-card--1 .project-card__info', {
        x: isMobile ? -20 : -52,
        y: 0,
        duration: 1.1,
        delay: 0.12,
        trigger: '.project-card--1',
        start: 'top 82%',
      });

      // Project 03 (expanding-frame): Center aperture expansion + independent title entrance
      const p3Frame = el.querySelector('.project-card--2 .project-card__frame');
      const p3Inner = el.querySelector('.project-card--2 .project-card__plate-inner');
      motionUtils.revealMaskedFrame(p3Frame, p3Inner, {
        direction: 'center-expand',
        duration: 1.4,
        innerScale: 1.18,
        trigger: '.project-card--2',
        start: 'top 82%',
      });
      motionUtils.revealDirectional('.project-card--2 .project-card__info', {
        y: 36,
        scale: 0.97,
        duration: 1.05,
        delay: 0.18,
        trigger: '.project-card--2',
        start: 'top 80%',
      });

      // Project 04 (perspective-editorial): 3D perspective plane rotation (`rotateX` & `rotateY`) settling into flat alignment
      motionUtils.revealDirectional('.project-card--3 .project-card__visual-col', {
        y: 48,
        rotateX: 14,
        rotateY: -10,
        scale: 0.94,
        duration: 1.25,
        ease: 'power3.out',
        trigger: '.project-card--3',
        start: 'top 84%',
      });
      motionUtils.revealDirectional('.project-card--3 .project-card__info', {
        x: isMobile ? 16 : 42,
        y: 24,
        duration: 1.05,
        delay: 0.15,
        trigger: '.project-card--3',
        start: 'top 84%',
      });

      // Scroll-linked independent title vs thumbnail movement on desktop
      if (!isMobile) {
        SELECTED_PROJECTS.forEach((_, idx) => {
          const cardEl = el.querySelector(`.project-card--${idx}`);
          const plateInner = el.querySelector(`.project-card--${idx} .project-card__plate-inner`);
          const titleWrap = el.querySelector(`.project-card--${idx} .project-card__title-wrap`);

          if (cardEl && plateInner) {
            gsap.to(plateInner, {
              yPercent: idx % 2 === 0 ? -8 : 8,
              ease: 'none',
              scrollTrigger: {
                trigger: cardEl,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            });
          }

          if (cardEl && titleWrap) {
            gsap.to(titleWrap, {
              y: idx % 2 === 0 ? -18 : -12,
              ease: 'none',
              scrollTrigger: {
                trigger: cardEl,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            });
          }
        });
      }
    }, el);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <div className="section-header-tag">
          <span className="mono-label">03 / CURATED EXHIBITION</span>
          <span className="section-header-tag__dash" aria-hidden="true" />
          <span className="mono-label">SELECTED DEMONSTRATION STUDIES (01 — 04)</span>
        </div>

        <div className="projects__header">
          <div className="projects__header-main">
            <h2 id="projects-heading" className="projects__header-title">
              <span className="projects__header-mask">
                <span className="projects__header-line">Selected Spatial</span>
              </span>
              <span className="projects__header-mask">
                <span className="projects__header-line projects__header-italic">
                  &amp; Editorial Studies.
                </span>
              </span>
            </h2>
          </div>

          <div className="projects__header-note">
            <span className="mono-label projects__badge">REPLACEABLE SAMPLE EXHIBITION</span>
            <p className="projects__disclaimer-copy">
              Each study below demonstrates a distinct spatial choreography family—vertical shutter masking, lateral axis motion, expanding aperture frames, and perspective plane alignment. Click any study to open its full architectural dossier.
            </p>
          </div>
        </div>

        <div className="structural-line" aria-hidden="true" />

        {/* Asymmetrical Exhibition List */}
        <div className="projects__exhibition-list">
          {SELECTED_PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className={`project-card project-card--${index} project-card--${project.layoutType}`}
            >
              {/* Visual Preview Column */}
              <div className="project-card__visual-col">
                <button
                  type="button"
                  className="project-card__frame-trigger"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Open full study for ${project.title}`}
                >
                  <div
                    className="project-card__frame"
                    style={{ aspectRatio: project.visualComposition.aspectRatio }}
                  >
                    <div className="project-card__plate-inner">
                      <ArchitecturalPlate
                        motif={project.visualComposition.architecturalMotif}
                        index={project.index}
                        label={project.visualComposition.svgOverlayText}
                        accentColor={project.palette.accent}
                      />
                    </div>

                    <div className="project-card__hover-badge mono-label">
                      <span>INSPECT STUDY</span>
                      <span className="project-card__hover-arrow" aria-hidden="true">↗</span>
                    </div>
                  </div>
                </button>

                <div className="project-card__caption-row mono-label">
                  <span>{project.visualComposition.caption}</span>
                  <span>[{project.statusNote}]</span>
                </div>
              </div>

              {/* Editorial Metadata & Narrative Column */}
              <div className="project-card__info">
                <div className="project-card__meta mono-label">
                  <span className="project-card__index">INDEX // {project.index}</span>
                  <span className="project-card__category">{project.category}</span>
                  <span className="project-card__year">{project.year}</span>
                </div>

                <div className="project-card__title-wrap">
                  <h3 className="project-card__title">
                    <button
                      type="button"
                      className="project-card__title-btn"
                      onClick={() => setSelectedProject(project)}
                    >
                      <span>{project.title}</span>
                      <span className="project-card__title-arrow" aria-hidden="true">→</span>
                    </button>
                  </h3>
                  <p className="project-card__subtitle">{project.subtitle}</p>
                </div>

                <p className="project-card__description">{project.description}</p>

                <ul className="project-card__deliverables mono-label" aria-label="Deliverables">
                  {project.deliverables.map((del, i) => (
                    <li key={i}>{del}</li>
                  ))}
                </ul>

                <div className="project-card__actions">
                  <button
                    type="button"
                    className="btn-editorial btn-editorial--outline"
                    onClick={() => setSelectedProject(project)}
                  >
                    <span>Open Case Study Dossier</span>
                    <span className="btn-editorial__arrow" aria-hidden="true">↗</span>
                  </button>

                  <a
                    href={project.livePreviewAnchor}
                    className="project-card__secondary-link mono-label"
                  >
                    <span>{project.livePreviewLabel}</span>
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(next) => setSelectedProject(next)}
        allProjects={SELECTED_PROJECTS}
      />
    </section>
  );
};
