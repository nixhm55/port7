import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ProjectItem } from '../data/portfolioData';
import { ArchitecturalPlate } from './ArchitecturalPlate';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  allProjects: ProjectItem[];
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus the close button for accessibility
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    if (overlayRef.current && sheetRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      gsap.fromTo(
        sheetRef.current,
        { y: 48, scale: 0.98, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'power3.out' }
      );
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentIdx = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(currentIdx + 1) % allProjects.length];

  const handleJumpToSection = (anchor: string) => {
    onClose();
    setTimeout(() => {
      const target = document.querySelector(anchor);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  return (
    <div
      ref={overlayRef}
      className="project-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={sheetRef} className="project-modal-sheet">
        <div className="project-modal__topbar">
          <div className="project-modal__meta-tags mono-label">
            <span>EXHIBITION DOSSIER // {project.index}</span>
            <span>{project.statusNote}</span>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="project-modal__close"
            onClick={onClose}
            aria-label="Close project study dossier"
          >
            <span className="mono-label">CLOSE [ESC]</span>
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="project-modal__content">
          <div className="project-modal__header">
            <span className="mono-label project-modal__category">
              {project.category} — {project.year}
            </span>
            <h2 id="modal-project-title" className="project-modal__title">
              {project.title}
            </h2>
            <p className="project-modal__subtitle">{project.subtitle}</p>
          </div>

          <div className="project-modal__visual-frame">
            <ArchitecturalPlate
              motif={project.visualComposition.architecturalMotif}
              index={project.index}
              label={project.visualComposition.svgOverlayText}
              accentColor={project.palette.accent}
            />
            <span className="project-modal__caption mono-label">
              {project.visualComposition.caption}
            </span>
          </div>

          <div className="project-modal__details-grid">
            <div className="project-modal__detail-block">
              <h3 className="mono-label">01 // OVERVIEW</h3>
              <p>{project.description}</p>
            </div>
            <div className="project-modal__detail-block">
              <h3 className="mono-label">02 // SPATIAL CHALLENGE</h3>
              <p>{project.challenge}</p>
            </div>
            <div className="project-modal__detail-block">
              <h3 className="mono-label">03 // MOTION ARCHITECTURE</h3>
              <p>{project.spatialApproach}</p>
            </div>
          </div>

          <div className="project-modal__deliverables-row">
            <div className="project-modal__deliverables-col">
              <h3 className="mono-label">KEY DELIVERABLES (SAMPLE)</h3>
              <ul className="project-modal__deliverables-list">
                {project.deliverables.map((item, i) => (
                  <li key={i}>
                    <span className="mono-label">0{i + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="project-modal__notes-col">
              <h3 className="mono-label">REPLACEABLE DATA NOTE</h3>
              <p className="project-modal__note-copy">{project.metricsOrNotes}</p>
              <div className="project-modal__actions">
                <button
                  type="button"
                  className="btn-editorial btn-editorial--primary"
                  onClick={() => handleJumpToSection(project.livePreviewAnchor)}
                >
                  <span>{project.livePreviewLabel} on Page</span>
                  <span className="btn-editorial__arrow" aria-hidden="true">→</span>
                </button>
                <button
                  type="button"
                  className="btn-editorial btn-editorial--ghost"
                  onClick={() => onSelectProject(nextProject)}
                >
                  <span>Next Study: {nextProject.title.split('/')[0]}</span>
                  <span className="btn-editorial__arrow" aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
