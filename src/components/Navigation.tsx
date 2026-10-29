import React, { useEffect, useRef, useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  index: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', index: '00' },
  { id: 'about', label: 'About', index: '02' },
  { id: 'projects', label: 'Projects', index: '03' },
  { id: 'approach', label: 'Approach', index: '05' },
  { id: 'contact', label: 'Contact', index: '08' },
];

export const Navigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasFocusedChild, setHasFocusedChild] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      const nearTop = currentScrollY < 56;

      setIsAtTop(nearTop);

      if (nearTop) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        ticking.current = false;
        return;
      }

      // Ignore tiny accidental scroll movements (< 9px) to prevent flickering
      if (Math.abs(delta) >= 9) {
        if (delta > 0 && !mobileMenuOpen && !hasFocusedChild) {
          // Scrolling downward
          setIsVisible(false);
        } else if (delta < 0) {
          // Scrolling upward
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }

      // Determine active section in viewport
      const sectionIds = ['home', 'about', 'projects', 'featured-story', 'approach', 'journey', 'archive', 'contact'];
      let currentActive = 'home';
      for (const secId of sectionIds) {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.38) {
            if (secId === 'featured-story') {
              currentActive = 'projects';
            } else if (secId === 'journey' || secId === 'archive') {
              currentActive = 'approach';
            } else {
              currentActive = secId;
            }
          }
        }
      }
      setActiveSection(currentActive);

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileMenuOpen, hasFocusedChild]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${targetId}`);
    }
  };

  return (
    <header
      ref={navRef}
      className={`site-nav ${isVisible || hasFocusedChild || mobileMenuOpen ? 'site-nav--visible' : 'site-nav--hidden'} ${
        !isAtTop ? 'site-nav--scrolled' : ''
      }`}
      onFocusCapture={() => {
        setHasFocusedChild(true);
        setIsVisible(true);
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setHasFocusedChild(false);
        }
      }}
    >
      <div className="site-nav__inner">
        <a
          href="#home"
          className="site-nav__brand"
          onClick={(e) => handleNavClick(e, 'home')}
          aria-label="Nisam — Return to top"
        >
          <span className="site-nav__brand-mark" aria-hidden="true" />
          <span className="site-nav__brand-text">Nisam</span>
          <span className="site-nav__brand-edition">ED.01</span>
        </a>

        <nav className="site-nav__links" aria-label="Primary Portfolio Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`site-nav__link ${isActive ? 'site-nav__link--active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="site-nav__link-index">{item.index}</span>
                <span className="site-nav__link-label">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="site-nav__meta">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="site-nav__cta"
          >
            <span>Inquire</span>
            <span className="site-nav__cta-arrow" aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            className={`site-nav__mobile-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className="site-nav__toggle-bar" />
            <span className="site-nav__toggle-bar" />
          </button>
        </div>
      </div>

      {/* Compact, accessible mobile drawer */}
      <div
        id="mobile-nav-drawer"
        className={`site-nav__mobile-drawer ${mobileMenuOpen ? 'site-nav__mobile-drawer--open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="site-nav__mobile-list">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              tabIndex={mobileMenuOpen ? 0 : -1}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`site-nav__mobile-link ${activeSection === item.id ? 'is-active' : ''}`}
            >
              <span className="site-nav__mobile-index">{item.index}</span>
              <span className="site-nav__mobile-label">{item.label}</span>
              <span className="site-nav__mobile-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};
