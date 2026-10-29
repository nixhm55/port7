import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { IntroStatement } from './components/IntroStatement';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FeaturedProject } from './components/FeaturedProject';
import { ApproachAndJourneySection } from './components/ApproachAndJourneySection';
import { ArchiveSection } from './components/ArchiveSection';
import { ContactSection } from './components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-to-content mono-label">
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content" className="site-main">
        <Hero />
        <IntroStatement />
        <AboutSection />
        <ProjectsSection />
        <FeaturedProject />
        <ApproachAndJourneySection />
        <ArchiveSection />
      </main>

      <ContactSection />
    </div>
  );
};

export default App;
