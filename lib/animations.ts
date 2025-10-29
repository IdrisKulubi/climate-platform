import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Configuration options for scroll reveal animations
 */
export interface ScrollRevealOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  toggleActions?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
  animation?: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    duration?: number;
    ease?: string;
    stagger?: number;
  };
}

/**
 * Default scroll reveal configuration
 */
export const defaultScrollRevealConfig: ScrollRevealOptions = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
  markers: false,
  once: false,
  animation: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    duration: 0.8,
    ease: 'power2.out',
  },
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Create a scroll-triggered reveal animation
 * @param element - The element(s) to animate
 * @param options - Configuration options for the animation
 * @returns GSAP ScrollTrigger instance or null if reduced motion is preferred
 */
export const createScrollReveal = (
  element: string | HTMLElement | HTMLElement[],
  options: ScrollRevealOptions = {}
): ScrollTrigger | null => {
  if (typeof window === 'undefined') return null;

  // Respect user's motion preferences
  if (prefersReducedMotion()) {
    // Apply final state immediately without animation
    const elements = typeof element === 'string' 
      ? document.querySelectorAll(element) 
      : Array.isArray(element) 
      ? element 
      : [element];
    
    elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        gsap.set(el, options.animation?.to || defaultScrollRevealConfig.animation?.to || {});
      }
    });
    return null;
  }

  const config = { ...defaultScrollRevealConfig, ...options };
  const animConfig = { ...defaultScrollRevealConfig.animation, ...options.animation };

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: config.trigger || element,
      start: config.start,
      end: config.end,
      toggleActions: config.toggleActions,
      scrub: config.scrub,
      markers: config.markers,
      once: config.once,
    },
  });

  timeline.fromTo(
    element,
    animConfig.from || {},
    {
      ...animConfig.to,
      duration: animConfig.duration,
      ease: animConfig.ease,
      stagger: animConfig.stagger,
    }
  );

  return timeline.scrollTrigger || null;
};

/**
 * Configuration options for parallax background animations
 */
export interface ParallaxOptions {
  speed?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

/**
 * Create a parallax scrolling effect for background elements
 * @param element - The element to apply parallax effect to
 * @param options - Configuration options
 * @returns GSAP ScrollTrigger instance or null
 */
export const createParallaxBackground = (
  element: string | HTMLElement,
  options: ParallaxOptions = {}
): ScrollTrigger | null => {
  if (typeof window === 'undefined') return null;

  // Respect user's motion preferences
  if (prefersReducedMotion()) {
    return null;
  }

  const {
    speed = 0.5,
    start = 'top top',
    end = 'bottom top',
    scrub = 1,
    markers = false,
  } = options;

  const yPercent = -(1 - speed) * 100;

  const tween = gsap.to(element, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
      markers,
    },
  });

  return tween.scrollTrigger || null;
};

/**
 * Configuration options for stat counter animations
 */
export interface StatCounterOptions {
  duration?: number;
  ease?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  onUpdate?: (value: number) => void;
  onComplete?: () => void;
}

/**
 * Format a number with separators and affixes
 */
const formatNumber = (
  value: number,
  decimals: number = 0,
  separator: string = ',',
  prefix: string = '',
  suffix: string = ''
): string => {
  const fixed = value.toFixed(decimals);
  const parts = fixed.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  const decimalPart = parts[1] ? `.${parts[1]}` : '';
  return `${prefix}${integerPart}${decimalPart}${suffix}`;
};

/**
 * Animate a number counter with formatting
 * @param element - The element to update with the counter value
 * @param targetValue - The final value to count to
 * @param options - Configuration options
 * @returns GSAP Tween instance or null
 */
export const animateCounter = (
  element: HTMLElement,
  targetValue: number,
  options: StatCounterOptions = {}
): gsap.core.Tween | null => {
  if (typeof window === 'undefined') return null;

  const {
    duration = 2,
    ease = 'power2.out',
    decimals = 0,
    prefix = '',
    suffix = '',
    separator = ',',
    onUpdate,
    onComplete,
  } = options;

  // Respect user's motion preferences
  if (prefersReducedMotion()) {
    element.textContent = formatNumber(targetValue, decimals, separator, prefix, suffix);
    onComplete?.();
    return null;
  }

  const counter = { value: 0 };

  return gsap.to(counter, {
    value: targetValue,
    duration,
    ease,
    onUpdate: () => {
      element.textContent = formatNumber(
        counter.value,
        decimals,
        separator,
        prefix,
        suffix
      );
      onUpdate?.(counter.value);
    },
    onComplete,
  });
};

/**
 * Create a scroll-triggered counter animation
 * @param element - The element to update with the counter value
 * @param targetValue - The final value to count to
 * @param options - Configuration options including scroll trigger settings
 * @returns GSAP ScrollTrigger instance or null
 */
export const createScrollCounter = (
  element: HTMLElement,
  targetValue: number,
  options: StatCounterOptions & { trigger?: string | HTMLElement; start?: string } = {}
): ScrollTrigger | null => {
  if (typeof window === 'undefined') return null;

  const {
    trigger = element,
    start = 'top 80%',
    duration = 2,
    ease = 'power2.out',
    decimals = 0,
    prefix = '',
    suffix = '',
    separator = ',',
    onUpdate,
    onComplete,
  } = options;

  // Respect user's motion preferences
  if (prefersReducedMotion()) {
    element.textContent = formatNumber(targetValue, decimals, separator, prefix, suffix);
    onComplete?.();
    return null;
  }

  const counter = { value: 0 };

  const tween = gsap.to(counter, {
    value: targetValue,
    duration,
    ease,
    scrollTrigger: {
      trigger,
      start,
      once: true,
    },
    onUpdate: () => {
      element.textContent = formatNumber(
        counter.value,
        decimals,
        separator,
        prefix,
        suffix
      );
      onUpdate?.(counter.value);
    },
    onComplete,
  });

  return tween.scrollTrigger || null;
};

/**
 * Utility to kill all ScrollTriggers (useful for cleanup)
 */
export const killAllScrollTriggers = (): void => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
};

/**
 * Utility to refresh all ScrollTriggers (useful after layout changes)
 */
export const refreshScrollTriggers = (): void => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh();
  }
};
