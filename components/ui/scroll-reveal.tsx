'use client';

import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollReveal, type ScrollRevealOptions } from '@/lib/animations';
import { cn } from '@/lib/utils';

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Children elements to animate
   */
  children: React.ReactNode;
  /**
   * Animation direction
   * @default "up"
   */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /**
   * Animation duration in seconds
   * @default 0.8
   */
  duration?: number;
  /**
   * Delay before animation starts in seconds
   * @default 0
   */
  delay?: number;
  /**
   * Stagger delay between child elements in seconds
   * @default 0
   */
  stagger?: number;
  /**
   * Distance to move during animation in pixels
   * @default 50
   */
  distance?: number;
  /**
   * GSAP easing function
   * @default "power2.out"
   */
  ease?: string;
  /**
   * ScrollTrigger start position
   * @default "top 80%"
   */
  start?: string;
  /**
   * ScrollTrigger end position
   * @default "bottom 20%"
   */
  end?: string;
  /**
   * Whether animation should only play once
   * @default false
   */
  once?: boolean;
  /**
   * Custom trigger element selector or element
   */
  trigger?: string | HTMLElement;
  /**
   * Whether to animate children individually (requires children to be direct elements)
   * @default false
   */
  animateChildren?: boolean;
}

/**
 * ScrollReveal wrapper component for section animations
 * Wraps content and applies GSAP scroll-triggered animations
 */
export const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      direction = 'up',
      duration = 0.8,
      delay = 0,
      stagger = 0,
      distance = 50,
      ease = 'power2.out',
      start = 'top 80%',
      end = 'bottom 20%',
      once = false,
      trigger,
      animateChildren = false,
      className,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      // Determine initial position based on direction
      const getInitialPosition = () => {
        switch (direction) {
          case 'up':
            return { opacity: 0, y: distance };
          case 'down':
            return { opacity: 0, y: -distance };
          case 'left':
            return { opacity: 0, x: distance };
          case 'right':
            return { opacity: 0, x: -distance };
          case 'none':
            return { opacity: 0 };
          default:
            return { opacity: 0, y: distance };
        }
      };

      const options: ScrollRevealOptions = {
        trigger: trigger || containerRef.current,
        start,
        end,
        once,
        animation: {
          from: getInitialPosition(),
          to: { opacity: 1, x: 0, y: 0 },
          duration,
          ease,
          stagger: stagger > 0 ? stagger : undefined,
        },
      };

      // Animate children individually or the container as a whole
      const target = animateChildren
        ? Array.from(containerRef.current.children) as HTMLElement[]
        : containerRef.current;

      scrollTriggerRef.current = createScrollReveal(target, options);

      return () => {
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }
      };
    }, [direction, duration, delay, stagger, distance, ease, start, end, once, trigger, animateChildren]);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn('scroll-reveal-container', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal';
