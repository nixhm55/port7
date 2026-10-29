import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SITE_IDENTITY } from '../data/portfolioData';
import { motionUtils, useMotionEnvironment } from '../motion/useMotionSystem';

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const { prefersReducedMotion } = useMotionEnvironment();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(['.contact__headline', '.contact__rule', '.contact__col', '.footer__inner'], {
          opacity: 1,
          y: 0,
          scale: 1,
          scaleX: 1,
        });
        return;
      }

      // Signature Animation Family #8 (Contact & Closing):
      // Calm, measured typographic settling + fine horizontal line draw + quiet stagger
      gsap.fromTo(
        '.contact__headline',
        { y: 28, scale: 1.03, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        }
      );

      motionUtils.revealLine('.contact__rule', {
        axis: 'x',
        origin: 'left center',
        duration: 1.3,
        trigger: el,
        start: 'top 78%',
      });

      gsap.fromTo(
        '.contact__col',
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact__grid',
            start: 'top 84%',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_IDENTITY.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2600);
    } catch {
      setStatusMessage(`Direct email address: ${SITE_IDENTITY.contactEmail}`);
    }
  };

  // Honest client-side mailto preparation — never fabricates a backend submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry for Nisam — ${senderName ? senderName : 'New Project'}`
    );
    const body = encodeURIComponent(
      `Hello Nisam,\n\nName: ${senderName || '[Not specified]'}\nEmail: ${
        senderEmail || '[Not specified]'
      }\n\nInquiry / Project Notes:\n${
        projectScope || '[Written via Nisam Portfolio]'
      }\n`
    );

    const mailtoUrl = `mailto:${SITE_IDENTITY.contactEmail}?subject=${subject}&body=${body}`;
    setStatusMessage(
      `No external backend is connected to this static portfolio template. Opening your default mail client addressed to ${SITE_IDENTITY.contactEmail} with your drafted message pre-filled.`
    );
    window.location.href = mailtoUrl;
  };

  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', '#home');
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="section-header-tag">
          <span className="mono-label">08 / INITIATE DIALOGUE</span>
          <span className="section-header-tag__dash" aria-hidden="true" />
          <span className="mono-label">FINAL CLOSING COMPOSITION</span>
        </div>

        <div className="contact__hero-block">
          <h2 id="contact-heading" className="contact__headline">
            Let’s shape a quiet,{' '}
            <span className="contact__headline-italic">lasting digital space.</span>
          </h2>
          <p className="contact__invitation">
            Available for selected creative direction, editorial web design, and motion architecture collaborations. Replace the placeholder channels below with Nisam’s live studio coordinates.
          </p>
        </div>

        <div className="contact__rule structural-line" aria-hidden="true" />

        <div className="contact__grid">
          {/* Left Column: Direct Email & Social Channels */}
          <div className="contact__col contact__col--direct">
            <span className="mono-label contact__col-label">DIRECT ELECTRONIC MAIL (EDITABLE)</span>

            <div className="contact__email-group">
              <a href={`mailto:${SITE_IDENTITY.contactEmail}`} className="contact__email-link">
                {SITE_IDENTITY.contactEmail}
              </a>
              <button
                type="button"
                className="btn-editorial btn-editorial--outline contact__copy-btn"
                onClick={handleCopyEmail}
              >
                <span>{copiedEmail ? 'Address Copied to Clipboard ✓' : 'Copy Email Address'}</span>
              </button>
            </div>

            <div className="contact__meta-block">
              <span className="mono-label">LOCATION &amp; CADENCE</span>
              <p>{SITE_IDENTITY.locationPlaceholder}</p>
            </div>

            <div className="contact__socials-block">
              <span className="mono-label">INDEX &amp; CHANNELS (PLACEHOLDERS)</span>
              <ul className="contact__socials-list">
                {SITE_IDENTITY.socials.map((soc, i) => (
                  <li key={i}>
                    <a href={soc.href} className="contact__social-link">
                      <span>{soc.label}</span>
                      <span className="mono-label contact__social-handle">{soc.handle} ↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Honest Mailto Composer Form */}
          <div className="contact__col contact__col--form">
            <div className="contact__form-header">
              <span className="mono-label">COMPOSE DIRECT INQUIRY (MAILTO DISPATCH)</span>
              <p className="contact__form-note">
                This static portfolio uses an honest client-side mailto handoff—your message opens directly in your email client without third-party tracking or simulated submission.
              </p>
            </div>

            <form className="contact__form" onSubmit={handleFormSubmit}>
              <div className="contact__field-row">
                <label className="contact__field">
                  <span className="mono-label">01 / YOUR NAME</span>
                  <input
                    type="text"
                    name="name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Studio / Collaborator"
                    required
                  />
                </label>

                <label className="contact__field">
                  <span className="mono-label">02 / RETURN EMAIL</span>
                  <input
                    type="email"
                    name="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="name@domain.com"
                    required
                  />
                </label>
              </div>

              <label className="contact__field">
                <span className="mono-label">03 / PROJECT CONTEXT OR INQUIRY</span>
                <textarea
                  name="message"
                  rows={4}
                  value={projectScope}
                  onChange={(e) => setProjectScope(e.target.value)}
                  placeholder="Share brief notes on timeline, scope, or creative direction..."
                  required
                />
              </label>

              <div className="contact__form-actions">
                <button type="submit" className="btn-editorial btn-editorial--primary">
                  <span>Prepare Email in Mail Client</span>
                  <span className="btn-editorial__arrow" aria-hidden="true">↗</span>
                </button>
              </div>

              {statusMessage && (
                <div className="contact__honest-status" role="status" aria-live="polite">
                  <span className="mono-label">DISPATCH STATUS //</span>
                  <p>{statusMessage}</p>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="contact__rule structural-line" aria-hidden="true" />

        {/* Final Closing Monograph Footer */}
        <div className="footer__inner">
          <div className="footer__wordmark-col">
            <span className="footer__giant-name">Nisam</span>
            <span className="mono-label footer__copyright">
              © {new Date().getFullYear()} Nisam — SINGLE-PAGE SPATIAL PORTFOLIO EDITION
            </span>
          </div>

          <div className="footer__return-col">
            <a
              href="#home"
              onClick={handleScrollTop}
              className="footer__back-to-top"
              aria-label="Return smoothly to the top of the portfolio"
            >
              <span className="mono-label">RETURN TO OPENING SCENE</span>
              <span className="footer__up-circle" aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
