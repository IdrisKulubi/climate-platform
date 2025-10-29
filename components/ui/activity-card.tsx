'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { COLORS } from '@/lib/constants';

export interface ActivityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Activity title
   */
  title: string;
  /**
   * Activity description
   */
  description: string;
  /**
   * Image source path
   */
  image: string;
  /**
   * Optional date or time information
   */
  date?: string;
  /**
   * Optional link URL
   */
  link?: string;
}

/**
 * ActivityCard component with image, title, description, and lift effect
 * Displays an activity card with hover lift and shadow transition
 */
export const ActivityCard = React.forwardRef<HTMLDivElement, ActivityCardProps>(
  (
    {
      title,
      description,
      image,
      date,
      link,
      className,
      ...props
    },
    ref
  ) => {
    const CardWrapper = link ? 'a' : 'div';
    const wrapperProps = link ? { href: link } : {};

    return (
      <CardWrapper
        {...wrapperProps}
        className={cn(
          'group block h-full',
          link && 'cursor-pointer'
        )}
      >
        <div
          ref={ref}
          className={cn(
            'relative flex flex-col h-full overflow-hidden rounded-lg border bg-card shadow-sm',
            'transition-all duration-300 ease-out',
            'hover:-translate-y-2 hover:shadow-xl',
            'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
            className
          )}
          {...props}
        >
          {/* Image */}
          <div className="relative aspect-3/2 w-full overflow-hidden bg-muted">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* AGRA orange accent overlay on hover */}
            <div 
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10"
              style={{ backgroundColor: COLORS.partner.agra }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-2 p-5">
            {date && (
              <span 
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: COLORS.partner.agra }}
              >
                {date}
              </span>
            )}
            <h3 className="text-lg font-semibold leading-tight text-card-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {description}
            </p>
          </div>

          {/* Bottom accent bar */}
          <div 
            className="h-1 w-0 transition-all duration-300 group-hover:w-full"
            style={{ backgroundColor: COLORS.partner.agra }}
          />
        </div>
      </CardWrapper>
    );
  }
);

ActivityCard.displayName = 'ActivityCard';
