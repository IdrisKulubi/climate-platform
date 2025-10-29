"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createScrollCounter, type StatCounterOptions } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface StatCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The target value to count to
   */
  value: number;
  /**
   * Number of decimal places to display
   * @default 0
   */
  decimals?: number;
  /**
   * Prefix to display before the number (e.g., "$")
   */
  prefix?: string;
  /**
   * Suffix to display after the number (e.g., "M", "+", "%")
   */
  suffix?: string;
  /**
   * Thousands separator character
   * @default ","
   */
  separator?: string;
  /**
   * Animation duration in seconds
   * @default 2
   */
  duration?: number;
  /**
   * GSAP easing function
   * @default "power2.out"
   */
  ease?: string;
  /**
   * Label to display below the counter
   */
  label?: string;
  /**
   * Custom trigger element for scroll animation
   */
  trigger?: string | HTMLElement;
  /**
   * ScrollTrigger start position
   * @default "top 80%"
   */
  start?: string;
  /**
   * Callback when animation updates
   */
  onUpdate?: (value: number) => void;
  /**
   * Callback when animation completes
   */
  onComplete?: () => void;
}

/**
 * StatCounter component with GSAP number animation
 * Animates from 0 to target value when scrolled into view
 */
export const StatCounter = React.forwardRef<HTMLDivElement, StatCounterProps>(
  (
    {
      value,
      decimals = 0,
      prefix = "",
      suffix = "",
      separator = ",",
      duration = 2,
      ease = "power2.out",
      label,
      trigger,
      start = "top 80%",
      onUpdate,
      onComplete,
      className,
      ...props
    },
    ref
  ) => {
    const counterRef = useRef<HTMLSpanElement>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    useEffect(() => {
      if (!counterRef.current) return;

      const options: StatCounterOptions & {
        trigger?: string | HTMLElement;
        start?: string;
      } = {
        duration,
        ease,
        decimals,
        prefix,
        suffix,
        separator,
        trigger:
          trigger || counterRef.current.parentElement || counterRef.current,
        start,
        onUpdate,
        onComplete,
      };

      scrollTriggerRef.current = createScrollCounter(
        counterRef.current,
        value,
        options
      );

      return () => {
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }
      };
    }, [
      value,
      decimals,
      prefix,
      suffix,
      separator,
      duration,
      ease,
      trigger,
      start,
      onUpdate,
      onComplete,
    ]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center",
          className
        )}
        {...props}
      >
        <span
          ref={counterRef}
          className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          aria-live="polite"
        >
          0
        </span>
        {label && (
          <span className="mt-2 text-sm font-medium text-muted-foreground md:text-base">
            {label}
          </span>
        )}
      </div>
    );
  }
);

StatCounter.displayName = "StatCounter";
