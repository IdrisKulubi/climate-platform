"use client";

import * as React from "react";
import Image from "next/image";
import { StatCounter } from "@/components/ui/stat-counter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FundStat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
}

export interface FundSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Array of statistics to display
   */
  stats: FundStat[];
  /**
   * Background image URL
   */
  backgroundImage: string;
  /**
   * CTA button label
   * @default "Apply for Funding"
   */
  ctaLabel?: string;
  /**
   * CTA button href
   */
  ctaHref?: string;
  /**
   * Section title
   * @default "Green SME Fund"
   */
  title?: string;
  /**
   * Section description
   */
  description?: string;
}

/**
 * FundSection component showcasing the Green SME Fund with animated stat counters
 * Features a background image, four stat counters, and a CTA button
 */
export const FundSection = React.forwardRef<HTMLElement, FundSectionProps>(
  (
    {
      stats,
      backgroundImage,
      ctaLabel = "Apply for Funding",
      ctaHref = "#apply",
      title = "Green SME Fund",
      description = "Empowering climate-aligned SMEs across Africa with technical assistance and financing",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative min-h-[500px] sm:min-h-[600px] w-full overflow-hidden py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32 touch-pan-y",
          className
        )}
        {...props}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Green SME Fund - African farms and renewable energy"
            fill
            className="object-cover"
            priority={false}
            loading="lazy"
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="mb-3 sm:mb-4 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{title}</h2>
            {description && (
              <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-white/90 px-4">
                {description}
              </p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="mb-8 sm:mb-12 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-lg bg-white/10 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/15 touch-manipulation"
              >
                <StatCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                  label={stat.label}
                  className="text-white"
                  duration={2}
                  ease="power2.out"
                />
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center px-4">
            <Button
              asChild
              size="lg"
              className="bg-partner-wri text-black hover:bg-partner-wri/90 hover:scale-105 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 font-semibold w-full sm:w-auto touch-manipulation"
            >
              <a href={ctaHref}>{ctaLabel}</a>
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-partner-wri to-transparent opacity-50" />
      </section>
    );
  }
);

FundSection.displayName = "FundSection";
