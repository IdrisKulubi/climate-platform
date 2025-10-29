'use client';

import * as React from 'react';
import { type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface PlatformFeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon component from lucide-react
   */
  icon: LucideIcon;
  /**
   * Feature title
   */
  title: string;
  /**
   * Feature description
   */
  description: string;
  /**
   * Whether to show "Coming Soon" badge
   * @default false
   */
  comingSoon?: boolean;
  /**
   * Icon background color
   * @default "bg-climate-green/10"
   */
  iconBgColor?: string;
  /**
   * Icon color
   * @default "text-climate-green"
   */
  iconColor?: string;
}

/**
 * PlatformFeatureCard component for displaying digital platform features
 * Features an icon, title, description, and optional "Coming Soon" badge
 */
export const PlatformFeatureCard = React.forwardRef<HTMLDivElement, PlatformFeatureCardProps>(
  (
    {
      icon: Icon,
      title,
      description,
      comingSoon = false,
      iconBgColor = 'bg-climate-green/10',
      iconColor = 'text-climate-green',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative rounded-xl border bg-card p-6 shadow-sm transition-all duration-300',
          'hover:shadow-md hover:border-climate-green/30',
          className
        )}
        {...props}
      >
        {/* Coming Soon Badge */}
        {comingSoon && (
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="text-xs">
              Coming Soon
            </Badge>
          </div>
        )}

        {/* Icon */}
        <div
          className={cn(
            'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110',
            iconBgColor
          )}
        >
          <Icon className={cn('h-6 w-6', iconColor)} />
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    );
  }
);

PlatformFeatureCard.displayName = 'PlatformFeatureCard';
