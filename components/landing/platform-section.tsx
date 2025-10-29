'use client';

import * as React from 'react';
import {
  TrendingUp,
  BookOpen,
  Users2,
  Briefcase,
  type LucideIcon,
} from 'lucide-react';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import LightRays from '@/components/LightRays';
import { cn } from '@/lib/utils';

export interface PlatformFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  comingSoon?: boolean;
  link?: string;
}

export interface PlatformSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Array of platform features to display
   */
  features?: PlatformFeature[];
  /**
   * Section title
   * @default "Digital Platform"
   */
  title?: string;
  /**
   * Section description
   */
  description?: string;
}

const defaultFeatures: PlatformFeature[] = [
  {
    icon: TrendingUp,
    title: 'Investment Marketplace',
    description:
      'Connect climate SMEs with investors through a curated marketplace. Browse investment opportunities, pitch decks, and due diligence materials.',
    comingSoon: false,
  },
  {
    icon: BookOpen,
    title: 'Knowledge Center',
    description:
      'Access comprehensive resources, case studies, and best practices for climate innovation. Learn from successful African climate entrepreneurs.',
    comingSoon: false,
  },
  {
    icon: Users2,
    title: 'Community Space',
    description:
      'Join a vibrant community of climate innovators, investors, and partners. Network, collaborate, and share insights across the continent.',
    comingSoon: true,
  },
  {
    icon: Briefcase,
    title: 'Technical Assistance Portal',
    description:
      'Get expert support for business development, financial modeling, and climate impact measurement. Access mentorship and advisory services.',
    comingSoon: false,
  },
];

/**
 * PlatformSection component showcasing digital platform features
 * Features hover effects and a responsive grid layout with light rays background
 */
export const PlatformSection = React.forwardRef<HTMLElement, PlatformSectionProps>(
  (
    {
      features = defaultFeatures,
      title = 'Digital Platform',
      description = 'Explore the tools and resources designed to accelerate your climate innovation journey',
      className,
      ...props
    },
    ref
  ) => {
    // Transform features to include icon components and coming soon badges
    const hoverItems = features.map((feature) => ({
      title: feature.title,
      description: feature.description,
      link: feature.link,
      icon: (
        <div className="flex items-center justify-between">
          <div
            className={cn(
              'inline-flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110',
              'bg-climate-green/10'
            )}
          >
            <feature.icon className="h-6 w-6 text-climate-green" />
          </div>
          {feature.comingSoon && (
            <Badge variant="secondary" className="text-xs">
              Coming Soon
            </Badge>
          )}
        </div>
      ),
    }));

    return (
      <section
        id="platform"
        ref={ref}
        className={cn(
          'relative py-12 sm:py-16 md:py-24 lg:py-32 bg-background overflow-hidden touch-pan-y',
          className
        )}
        aria-labelledby="platform-heading"
        {...props}
      >
        {/* Light Rays Background Effect */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#1E5631"
            raysSpeed={0.5}
            lightSpread={1.2}
            rayLength={1.5}
            pulsating={false}
            fadeDistance={0.8}
            saturation={0.7}
            followMouse={true}
            mouseInfluence={0.15}
            noiseAmount={0.1}
            distortion={0.05}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <ScrollReveal direction="up" duration={0.8} className="mb-8 sm:mb-12 text-center">
            <h2
              id="platform-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 sm:mb-4"
            >
              {title}
            </h2>
            {description && (
              <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-muted-foreground px-4">
                {description}
              </p>
            )}
          </ScrollReveal>

          {/* Features Grid with Hover Effect */}
          <HoverEffect items={hoverItems} className="gap-4 sm:gap-6 lg:gap-8" />
        </div>
      </section>
    );
  }
);

PlatformSection.displayName = 'PlatformSection';
