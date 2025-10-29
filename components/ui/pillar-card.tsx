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
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Default Overlay - Title */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-0">
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              {Icon && (
                <Icon
                  size={20}
                  className="text-white shrink-0 sm:w-6 sm:h-6"
                  aria-hidden="true"
                />
              )}
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Hover Overlay - Description */}
        <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-full flex-col items-center justify-center p-4 sm:p-6 text-center">
            {Icon && (
              <Icon
                size={28}
                className="mb-3 sm:mb-4 text-white sm:w-8 sm:h-8"
                aria-hidden="true"
              />
            )}
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl md:text-2xl font-bold text-white">
              {title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </>
    );

    if (href) {
      return (
        <a
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={ref as any}
          href={href}
          className={cn(
            'group relative overflow-hidden rounded-lg aspect-4/3 transition-all duration-300 touch-manipulation',
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
          isInteractive && 'cursor-pointer hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation',
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
