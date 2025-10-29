'use client';

import { 
  DollarSign, 
  Lightbulb, 
  Scale, 
  Users, 
  BarChart3,
  type LucideIcon 
} from 'lucide-react';
import { ObjectiveCard } from '@/components/ui/objective-card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { COLORS } from '@/lib/constants';

export interface Objective {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export interface AboutSectionProps {
  objectives?: Objective[];
}

const defaultObjectives: Objective[] = [
  {
    icon: DollarSign,
    title: 'Mobilize Green Finance',
    description: 'Connect climate SMEs with investors and funding opportunities',
  },
  {
    icon: Lightbulb,
    title: 'Accelerate Innovation',
    description: 'Support breakthrough climate solutions across Africa',
  },
  {
    icon: Scale,
    title: 'Influence Policy',
    description: 'Shape climate-friendly policies and regulations',
  },
  {
    icon: Users,
    title: 'Foster Collaboration',
    description: 'Build partnerships across sectors and regions',
  },
  {
    icon: BarChart3,
    title: 'Document Impact',
    description: 'Track and measure climate and economic outcomes',
  },
];

export function AboutSection({ objectives = defaultObjectives }: AboutSectionProps) {
  return (
    <section
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-neutral-off-white touch-pan-y"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-screen layout: text left, cards right on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left side: About text */}
          <ScrollReveal direction="left" duration={0.8}>
            <div className="space-y-4 sm:space-y-6">
              <h2
                id="about-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-gray-500"
              >
                About the Platform
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                The Africa Climate Platform is a comprehensive ecosystem designed to 
                accelerate climate action across the continent. We bring together 
                innovators, investors, and partners to create lasting impact through 
                five core objectives.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                By mobilizing resources, fostering innovation, and building strategic 
                partnerships, we&apos;re creating a sustainable future for Africa&apos;s climate 
                economy.
              </p>
            </div>
          </ScrollReveal>

          {/* Right side: Objective cards */}
          <div>
            <ScrollReveal
              direction="up"
              duration={0.8}
              stagger={0.15}
              animateChildren
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
            >
              {objectives.map((objective, index) => (
                <ObjectiveCard
                  key={index}
                  icon={objective.icon}
                  title={objective.title}
                  description={objective.description}
                  iconColor={COLORS.climate.green}
                  iconBgColor={`${COLORS.climate.greenLight}33`}
                  iconSize={28}
                />
              ))}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
