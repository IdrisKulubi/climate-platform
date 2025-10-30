"use client";

import { useRef, useEffect } from "react";
import {
  DollarSign,
  Lightbulb,
  Scale,
  Users,
  BarChart3,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    title: "Mobilize Green Finance",
    description:
      "Connect climate SMEs with investors and funding opportunities",
  },
  {
    icon: Lightbulb,
    title: "Accelerate Innovation",
    description: "Support breakthrough climate solutions across Africa",
  },
  {
    icon: Scale,
    title: "Influence Policy",
    description: "Shape climate-friendly policies and regulations",
  },
  {
    icon: Users,
    title: "Foster Collaboration",
    description: "Build partnerships across sectors and regions",
  },
  {
    icon: BarChart3,
    title: "Document Impact",
    description: "Track and measure climate and economic outcomes",
  },
  {
    icon: BookOpen,
    title: "Build Capacity",
    description: "Provide training and knowledge sharing programs",
  },
];

function AnimatedObjectiveCard({
  objective,
  index,
}: {
  objective: Objective;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const tl = gsap.timeline();

    // Initial state
    gsap.set(cardRef.current, {
      opacity: 0,
      y: 40,
      rotateY: -15,
      transformStyle: "preserve-3d",
    });

    if (iconRef.current) {
      gsap.set(iconRef.current, {
        scale: 0.8,
        rotateZ: -20,
      });
    }

    // Create scroll trigger animation
    tl.to(cardRef.current, {
      opacity: 1,
      y: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: index * 0.12,
    }).to(
      iconRef.current,
      {
        scale: 1,
        rotateZ: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.6)",
      },
      0.2
    );

    // Scroll trigger for the timeline
    ScrollTrigger.create({
      trigger: cardRef.current,
      onEnter: () => {
        if (!tl.isActive()) {
          tl.restart();
        }
      },
      once: true,
    });

    return () => {
      tl.kill();
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col items-center gap-3 sm:gap-4 rounded-2xl border border-green-100 bg-gradient-to-br from-white to-green-50 p-4 sm:p-5 md:p-7 text-center shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-green-200 cursor-pointer overflow-hidden"
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-200 to-green-100 rounded-2xl opacity-0 blur group-hover:opacity-30 transition-opacity duration-300 -z-10" />

      {/* Icon container with enhanced styling */}
      <div
        ref={iconRef}
        className="flex items-center justify-center rounded-full p-3 sm:p-4 bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300 group-hover:scale-110 relative z-10"
      >
        <objective.icon
          size={32}
          className="text-green-700 group-hover:text-green-800 transition-colors duration-300"
          strokeWidth={1.5}
        />
      </div>

      {/* Text content */}
      <div ref={textRef} className="space-y-1 relative z-10">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
          {objective.title}
        </h3>
        {objective.description && (
          <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-snug">
            {objective.description}
          </p>
        )}
      </div>
    </div>
  );
}

export function AboutSection({
  objectives = defaultObjectives,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate heading with text reveal effect
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    // Animate description paragraphs
    if (descRef.current) {
      gsap.fromTo(
        descRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 sm:py-20 md:py-28 lg:py-36 bg-gradient-to-b from-neutral-off-white via-white to-green-50 touch-pan-y overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Ambient background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with accent line */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-green-600 rounded-full" />
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">
              Our Mission
            </span>
          </div>
        </div>

        {/* Two-column layout: text left, cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left side: About text */}
          <div>
            <div ref={headingRef} className="space-y-1 mb-6 sm:mb-8">
              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight"
              >
                <span className="block">Building Africa&apos;s</span>
                <span className="block bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Climate Future
                </span>
              </h2>
            </div>

            <div ref={descRef} className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                The Kenya Climate Innovation Center (KCIC) is a comprehensive
                ecosystem designed to accelerate climate action across Africa.
                We bring together innovators, investors, and partners to create
                lasting impact through our strategic pillars.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed font-light">
                With over 12,000 enterprises supported, $55M mobilized in
                climate finance, and engagement in 10+ African countries,
                we&rsquo;re creating a sustainable future for Africa&rsquo;s
                climate economy through the KCIC Revolving Fund and strategic
                partnerships.
              </p>

              {/* Stat highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    100,000
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Green Jobs Created
                  </p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    1.2M
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Tonnes of CO₂ Mitigated
                  </p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    67,500
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Customers Reached
                  </p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    60
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    New Collaborations
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Objective cards with enhanced grid */}
          <div
            ref={cardGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:auto-rows-max"
          >
            {objectives.map((objective, index) => (
              <AnimatedObjectiveCard
                key={index}
                objective={objective}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
