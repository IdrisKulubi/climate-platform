'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ActivityCard } from '@/components/ui/activity-card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Activity {
  title: string;
  description: string;
  image: string;
  date?: string;
  link?: string;
}

export interface ActivitiesSectionProps {
  activities?: Activity[];
}

const defaultActivities: Activity[] = [
  {
    title: 'Africa Climate Investment Summit (ACIS)',
    description: 'Annual flagship event bringing together investors, innovators, and policymakers to catalyze climate finance across Africa.',
    image: '/images/activities/acis.jpg',
    date: 'Annual Event',
  },
  {
    title: 'Climate Deal Room',
    description: 'Curated matchmaking platform connecting investment-ready climate SMEs with impact investors and financial institutions.',
    image: '/images/activities/deal-room.jpg',
    date: 'Quarterly',
  },
  {
    title: 'Africa Green SME Fund Calls',
    description: 'Open funding calls providing technical assistance grants and concessional financing to climate-aligned SMEs.',
    image: '/images/activities/fund-calls.jpg',
    date: 'Bi-Annual',
  },
  {
    title: 'Climate Enterprise Academy',
    description: 'Intensive training program equipping climate entrepreneurs with business skills, technical knowledge, and investor readiness.',
    image: '/images/activities/academy.jpg',
    date: 'Ongoing',
  },
  {
    title: 'Policy & Innovation Dialogues',
    description: 'Multi-stakeholder forums shaping climate policy, regulatory frameworks, and innovation ecosystems across Africa.',
    image: '/images/activities/dialogues.jpg',
    date: 'Monthly',
  },
  {
    title: 'Impact Dashboard',
    description: 'Real-time tracking and reporting of climate impact metrics, job creation, and emissions reductions across the portfolio.',
    image: '/images/activities/dashboard.jpg',
    date: 'Live',
  },
];

export function ActivitiesSection({ activities = defaultActivities }: ActivitiesSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="relative py-16 md:py-24 lg:py-32 bg-background"
      aria-labelledby="activities-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.8} className="mb-12 text-center">
          <h2
            id="activities-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4"
          >
            Flagship Activities
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our key programs and initiatives designed to accelerate climate action and innovation across Africa.
          </p>
        </ScrollReveal>

        {/* Desktop Grid View (hidden on mobile) */}
        <div className="hidden md:block">
          <ScrollReveal
            direction="up"
            duration={0.8}
            stagger={0.15}
            animateChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {activities.map((activity, index) => (
              <ActivityCard
                key={index}
                title={activity.title}
                description={activity.description}
                image={activity.image}
                date={activity.date}
                link={activity.link}
              />
            ))}
          </ScrollReveal>
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_85%] min-w-0"
                  >
                    <ActivityCard
                      title={activity.title}
                      description={activity.description}
                      image={activity.image}
                      date={activity.date}
                      link={activity.link}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={cn(
                  'h-10 w-10 rounded-full',
                  !canScrollPrev && 'opacity-50 cursor-not-allowed'
                )}
                aria-label="Previous activity"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={cn(
                  'h-10 w-10 rounded-full',
                  !canScrollNext && 'opacity-50 cursor-not-allowed'
                )}
                aria-label="Next activity"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
