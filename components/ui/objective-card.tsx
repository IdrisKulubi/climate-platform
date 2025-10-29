'use client';

import * as React from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ObjectiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Lucide icon component to display
   */
  icon: LucideIcon;
  /**
   * Title text for the objective
   */
  title: string;
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Icon color (CSS color value)
   * @default "hsl(var(--primary))"
   */
  iconColor?: string;
  /**
   * Icon background color (CSS color value)
   */
  iconBgColor?: string;
  /**
   * Icon size in pixels
   * @default 24
   */
  iconSize?: number;
}

/**
 * ObjectiveCard component with icon, title, and hover scale effect
 * Displays a card with an icon and text, scales up on hover
 */
export const ObjectiveCard = React.forwardRef<HTMLDivElement, ObjectiveCardProps>(
  (
    {
      icon: Icon,
      title,
      description,
      iconColor,
      iconBgColor,
      iconSize = 24,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative flex flex-col items-center gap-2 sm:gap-3 rounded-lg border bg-card p-3 sm:p-4 md:p-6 text-center shadow-sm transition-all duration-300 touch-manipulation',
          'hover:scale-105 hover:shadow-md',
          'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'flex items-center justify-center rounded-full p-2 sm:p-3 transition-transform duration-300 group-hover:scale-110'
          )}
          style={{
            backgroundColor: iconBgColor || 'hsl(var(--primary) / 0.1)',
          }}
        >
          <Icon
            size={iconSize}
            className="transition-colors duration-300 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            style={{
              color: iconColor || 'hsl(var(--primary))',
            }}
            aria-hidden="true"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm md:text-base font-semibold leading-tight text-card-foreground">
            {title}
          </h3>
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);

ObjectiveCard.displayName = 'ObjectiveCard';
