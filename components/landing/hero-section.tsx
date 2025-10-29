'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { createParallaxBackground, prefersReducedMotion } from '@/lib/animations';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaButtons?: CTAButton[];
}

export function HeroSection({
  title = 'Accelerating African Climate Solutions through Innovation, Investment, and Impact',
  subtitle = 'Join the movement to mobilize green finance, accelerate climate innovation, and foster collaboration across Africa',
  backgroundImage = '/images/hero/africa-climate-hero.jpg',
  ctaButtons = [
    { label: 'Join the Movement', href: '#join', variant: 'primary' },
    { label: 'Explore Opportunities', href: '#explore', variant: 'secondary' },
  ],
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create parallax effect for background
    if (backgroundRef.current) {
      createParallaxBackground(backgroundRef.current, {
        speed: 0.5,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      });
    }

    // Staggered text animation timeline
    if (!prefersReducedMotion()) {
      const timeline = gsap.timeline({ delay: 0.3 });

      // Title animation
      if (titleRef.current) {
        timeline.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          0.3
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        timeline.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          0.6
        );
      }

      // CTA buttons animation
      if (ctaContainerRef.current) {
        const buttons = ctaContainerRef.current.querySelectorAll('a');
        timeline.fromTo(
          buttons,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.2,
          },
          0.9
        );
      }
    } else {
      // Apply final state immediately for reduced motion
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 1, y: 0 });
      if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
      if (ctaContainerRef.current) {
        const buttons = ctaContainerRef.current.querySelectorAll('a');
        gsap.set(buttons, { opacity: 1, y: 0 });
      }
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-dvh md:min-h-screen flex items-center justify-center overflow-hidden touch-pan-y"
      aria-label="Hero section"
    >
      {/* Parallax Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ willChange: 'transform' }}
      >
        <Image
          src={backgroundImage}
          alt="African landscapes and climate innovation"
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Title */}
          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2"
          >
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaContainerRef}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 sm:px-0"
          >
            {ctaButtons.map((cta, index) => (
              <Button
                key={index}
                asChild
                size="lg"
                variant={cta.variant === 'primary' ? 'default' : 'outline'}
                className={
                  cta.variant === 'primary'
                    ? 'bg-climate-green hover:bg-climate-green-dark text-white transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto sm:min-w-[200px] touch-manipulation'
                    : 'bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto sm:min-w-[200px] touch-manipulation'
                }
              >
                <a href={cta.href} className="flex items-center justify-center gap-2 w-full">
                  {cta.label}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator (hidden on mobile) */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
