import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface TextRevealOptions {
  yPercent?: number;
  xPercent?: number;
  rotateX?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  trigger?: gsap.DOMTarget | null;
  start?: string;
}

export interface DirectionalRevealOptions {
  x?: number;
  y?: number;
  z?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  trigger?: gsap.DOMTarget | null;
  start?: string;
}

export interface MaskRevealOptions {
  direction?: 'vertical-up' | 'vertical-down' | 'horizontal-left' | 'horizontal-right' | 'center-expand';
  duration?: number;
  ease?: string;
  innerScale?: number;
  trigger?: gsap.DOMTarget | null;
  start?: string;
}

/**
 * Shared Motion System Utilities for Nisam Portfolio
 * Provides reusable, parameterizable choreography primitives while ensuring
 * every section has a distinct motion identity and clean end state.
 */
export const motionUtils = {
  /**
   * 1. Text Reveal Utility (clipped mask rise, horizontal line slide, or 3D plane tilt)
   */
  revealTextLines(targets: gsap.TweenTarget, options: TextRevealOptions = {}) {
    const {
      yPercent = 108,
      xPercent = 0,
      rotateX = 0,
      duration = 1.05,
      stagger = 0.09,
      delay = 0,
      ease = 'power4.out',
      trigger,
      start = 'top 86%',
    } = options;

    return gsap.fromTo(
      targets,
      {
        yPercent,
        xPercent,
        rotateX,
        opacity: 0,
        transformOrigin: '50% 100% -20px',
      },
      {
        yPercent: 0,
        xPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease,
        clearProps: 'transform,opacity',
        scrollTrigger: trigger
          ? {
              trigger,
              start,
              toggleActions: 'play none none none',
            }
          : undefined,
      }
    );
  },

  /**
   * 2. Line Reveal Utility (architectural divider drawing X or Y)
   */
  revealLine(
    targets: gsap.TweenTarget,
    options: {
      axis?: 'x' | 'y';
      origin?: string;
      duration?: number;
      stagger?: number;
      delay?: number;
      ease?: string;
      trigger?: gsap.DOMTarget | null;
      start?: string;
    } = {}
  ) {
    const {
      axis = 'x',
      origin = 'left center',
      duration = 1.15,
      stagger = 0.1,
      delay = 0,
      ease = 'expo.out',
      trigger,
      start = 'top 88%',
    } = options;

    const fromVars = axis === 'x' ? { scaleX: 0 } : { scaleY: 0 };
    const toVars = axis === 'x' ? { scaleX: 1 } : { scaleY: 1 };

    return gsap.fromTo(
      targets,
      {
        ...fromVars,
        transformOrigin: origin,
      },
      {
        ...toVars,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: trigger
          ? {
              trigger,
              start,
              toggleActions: 'play none none none',
            }
          : undefined,
      }
    );
  },

  /**
   * 3. Image / Frame Mask Reveal Utility
   */
  revealMaskedFrame(
    frameEl: Element | null,
    innerEl: Element | null,
    options: MaskRevealOptions = {}
  ) {
    if (!frameEl) return null;
    const {
      direction = 'vertical-up',
      duration = 1.25,
      ease = 'power4.inOut',
      innerScale = 1.14,
      trigger = frameEl,
      start = 'top 84%',
    } = options;

    let initialClip = 'inset(100% 0% 0% 0%)';
    if (direction === 'vertical-down') initialClip = 'inset(0% 0% 100% 0%)';
    if (direction === 'horizontal-left') initialClip = 'inset(0% 100% 0% 0%)';
    if (direction === 'horizontal-right') initialClip = 'inset(0% 0% 0% 100%)';
    if (direction === 'center-expand') initialClip = 'inset(18% 24% 18% 24%)';

    const tl = gsap.timeline({
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            toggleActions: 'play none none none',
          }
        : undefined,
    });

    tl.fromTo(
      frameEl,
      { clipPath: initialClip, opacity: 0.2 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration,
        ease,
        clearProps: 'clipPath',
      },
      0
    );

    if (innerEl) {
      tl.fromTo(
        innerEl,
        { scale: innerScale, yPercent: direction === 'vertical-up' ? 8 : -6 },
        {
          scale: 1,
          yPercent: 0,
          duration: duration * 1.15,
          ease: 'power3.out',
        },
        0
      );
    }

    return tl;
  },

  /**
   * 4. Directional & Spatial Depth Entrance Utility
   */
  revealDirectional(targets: gsap.TweenTarget, options: DirectionalRevealOptions = {}) {
    const {
      x = 0,
      y = 36,
      z = 0,
      rotateX = 0,
      rotateY = 0,
      rotateZ = 0,
      scale = 1,
      opacity = 0,
      duration = 1.0,
      delay = 0,
      stagger = 0.08,
      ease = 'power3.out',
      trigger,
      start = 'top 86%',
    } = options;

    return gsap.fromTo(
      targets,
      {
        x,
        y,
        z,
        rotateX,
        rotateY,
        rotateZ,
        scale,
        opacity,
        transformPerspective: 1100,
      },
      {
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease,
        clearProps: 'transform,opacity',
        scrollTrigger: trigger
          ? {
              trigger,
              start,
              toggleActions: 'play none none none',
            }
          : undefined,
      }
    );
  },

  /**
   * 5. Scroll-Linked Parallax & Spatial Movement Utility
   */
  parallaxScroll(
    target: gsap.TweenTarget,
    trigger: gsap.DOMTarget | null,
    options: {
      yPercent?: number;
      xPercent?: number;
      rotateZ?: number;
      rotateX?: number;
      scale?: number;
      start?: string;
      end?: string;
      scrub?: boolean | number;
    } = {}
  ) {
    if (!trigger) return null;
    const {
      yPercent = -12,
      xPercent = 0,
      rotateZ = 0,
      rotateX = 0,
      scale = 1,
      start = 'top bottom',
      end = 'bottom top',
      scrub = 0.65,
    } = options;

    return gsap.to(target, {
      yPercent,
      xPercent,
      rotateZ,
      rotateX,
      scale,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
      },
    });
  },
};

/**
 * Hook that detects prefers-reduced-motion and current responsive tier
 * so animations adapt cleanly across desktop, tablet, and mobile.
 */
export function useMotionEnvironment() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    setPrefersReducedMotion(motionQuery.matches);
    setIsMobile(mobileQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    motionQuery.addEventListener('change', handleMotionChange);
    mobileQuery.addEventListener('change', handleMobileChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      mobileQuery.removeEventListener('change', handleMobileChange);
    };
  }, []);

  return { prefersReducedMotion, isMobile };
}
