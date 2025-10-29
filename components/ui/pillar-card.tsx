'use client';

import * as React from 'react';
import { type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface PillarCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title of the pillar
   */
  title: string;
  /**
   * Description text shown on hover
   */
  description: string;
  /**
   * Background image URL or path
   */
  backgroundImage: string;
  /**
   * Optional icon to display with the title
   */
  icon?: LucideIcon;
  /**
   * Alt text for the background image
   */
  imageAlt?: string;
  /**
   * Whether the card is clickable/interactive
   * @default false
   */
  interactive?: boolean;
  /**
   * Click handler for interactive cards
   */
  onClick?: () => void;
  /**
   * Link href for navigation
   */
  href?: string;
}

/**
 * PillarCard component with background image and hover overlay
 * Displays a card with a background image, title, and description revealed on hover
 */
export const PillarCard = React.forwardRef<HTMLDivElement, PillarCardProps>(
  (
    {
      title,
      description,
      backgroundImage,
      icon: Icon,
      imageAlt,
      interactive = false,
      onClick,
      href,
      className,
      ...props
    },
    ref
  ) => {
    const isInteractive = interactive || !!onClick || !!href;

    const content = (
      <>
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Default Overlay - Title */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-0">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-3">
              {Icon && (
                <Icon
                  size={24}
                  className="text-white shrink-0"
                  aria-hidden="true"
                />
              )}
              <h3 className="text-xl font-bold text-white leading-tight md:text-2xl">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Hover Overlay - Description */}
        <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            {Icon && (
              <Icon
                size={32}
                className="mb-4 text-white"
                aria-hidden="true"
              />
            )}
            <h3 className="mb-3 text-xl font-bold text-white md:text-2xl">
              {title}
            </h3>
            <p className="text-sm text-white/90 md:text-base">
              {description}
            </p>
          </div>
        </div>
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as any}
          href={href}
          className={cn(
            'group relative overflow-hidden rounded-lg aspect-4/3 transition-all duration-300',
            'cursor-pointer hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
          'group relative overflow-hidden rounded-lg aspect-4/3 transition-all duration-300',
          isInteractive && 'cursor-pointer hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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

PillarCard.displayName = 'PillarCard';
