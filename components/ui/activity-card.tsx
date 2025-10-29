'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ActivityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title of the activity
   */
  title: string;
  /**
   * Description text for the activity
   */
  description: string;
  /**
   * Image URL or path
   */
  image: string;
  /**
   * Alt text for the image
   */
  imageAlt?: string;
  /**
   * Optional date or time information
   */
  date?: string;
  /**
   * Optional link for the activity
   */
  href?: string;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Accent color for the card (CSS color value)
   */
  accentColor?: string;
}

/**
 * ActivityCard component with image, title, description, and lift effect
 * Displays an activity card with hover lift animation and shadow transition
 */
export const ActivityCard = React.forwardRef<HTMLDivElement, ActivityCardProps>(
  (
    {
      title,
      description,
      image,
      imageAlt,
      date,
      href,
      onClick,
      accentColor,
      className,
      ...props
    },
    ref
  ) => {
    const isInteractive = !!href || !!onClick;

    const content = (
      <>
        {/* Image Container */}
        <div className="relative aspect-3/2 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {accentColor && (
            <div
              className="absolute inset-x-0 bottom-0 h-1 transition-all duration-300 group-hover:h-2"
              style={{ backgroundColor: accentColor }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Content Container */}
        <div className="flex flex-1 flex-col p-5">
          {date && (
            <time className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {date}
            </time>
          )}
          <h3 className="mb-2 text-lg font-bold leading-tight text-card-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as any}
          href={href}
          className={cn(
            'group flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-300',
            'hover:-translate-y-2 hover:shadow-lg',
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            className
          )}
        >
          {content}
        </a>
      );
    }

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'group flex flex-col overflow-hidden rounded-lg border bg-card transition-all duration-300',
          'hover:-translate-y-2 hover:shadow-lg',
          isInteractive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
        tabIndex={isInteractive ? 0 : undefined}
        role={isInteractive ? 'button' : undefined}
        {...props}
      >
        {content}
      </div>
    );
  }
);

ActivityCard.displayName = 'ActivityCard';
