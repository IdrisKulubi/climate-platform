'use client';

import {
  Lightbulb,
  DollarSign,
  TrendingUp,
  Scale,
  BookOpen,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { PillarCard } from '@/components/ui/pillar-card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export interface Pillar {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  icon: LucideIcon;
}

export interface PillarsSectionProps {
  pillars?: Pillar[];
}

const defaultPillars: Pillar[] = [
  {
    id: 'innovation',
    title: 'Innovation & Entrepreneurship',
    description:
      'Accelerate climate innovation by supporting entrepreneurs with incubation, mentorship, and access to cutting-edge resources.',
    backgroundImage: '/images/pillars/innovation.jpg',
    icon: Lightbulb,
  },
  {
    id: 'fund',
    title: 'Green SME Fund',
    description:
      'Provide technical assistance and financing to climate-aligned SMEs through our flagship revolving fund.',
    backgroundImage: '/images/pillars/fund.jpg',
    icon: DollarSign,
  },
  {
    id: 'finance',
    title: 'Climate Finance & Investment',
    description:
      'Connect investors with high-impact climate projects and facilitate deal flow across Africa.',
    backgroundImage: '/images/pillars/finance.jpg',
    icon: TrendingUp,
  },
  {
    id: 'policy',
    title: 'Policy & Advocacy',
    description:
      'Shape climate-friendly policies and regulations through evidence-based advocacy and stakeholder engagement.',
    backgroundImage: '/images/pillars/policy.jpg',
    icon: Scale,
  },
  {
    id: 'knowledge',
    title: 'Knowledge & Learning Hub',
    description:
      'Build capacity through training programs, research, and knowledge sharing across the climate ecosystem.',
    backgroundImage: '/images/pillars/knowledge.jpg',
    icon: BookOpen,
  },
  {
    id: 'partnerships',
    title: 'Partnerships & Community',
    description:
      'Foster collaboration among innovators, investors, and partners to amplify climate impact across the continent.',
    backgroundImage: '/images/pillars/partnerships.jpg',
    icon: Users,
  },
];

export function PillarsSection({ pillars = defaultPillars }: PillarsSectionProps) {
  return (
    <section
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-background touch-pan-y"
      aria-labelledby="pillars-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.8} className="mb-8 sm:mb-12 text-center">
          <h2
            id="pillars-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 sm:mb-4"
          >
            Strategic Pillars
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Our comprehensive approach to accelerating climate action across Africa
            through six interconnected focus areas.
          </p>
        </ScrollReveal>

        {/* Pillars Grid */}
        <ScrollReveal
          direction="up"
          duration={0.8}
          stagger={0.15}
          animateChildren
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {pillars.map((pillar) => (
            <PillarCard
              key={pillar.id}
              title={pillar.title}
              description={pillar.description}
              backgroundImage={pillar.backgroundImage}
              icon={pillar.icon}
              imageAlt={`${pillar.title} - Strategic pillar of the Africa Climate Platform`}
              interactive
            />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
