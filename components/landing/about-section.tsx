"use client";

import { useRef, useEffect } from "react";
import { Target } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface Objective {
  number: number;
  title: string;
  description: string;
}

export interface AboutSectionProps {
  vision?: string;
  objectives?: Objective[];
}

const defaultObjectives: Objective[] = [
  { number: 1, title: "Mobilize Green Finance", description: "For African climate SMEs through a revolving Green SME Fund" },
  { number: 2, title: "Accelerate Innovation", description: "And enterprise growth in key climate sectors" },
  { number: 3, title: "Influence Policy", description: "And build enabling ecosystems for green entrepreneurship" },
  { number: 4, title: "Facilitate Collaboration", description: "Among African hubs, investors, and global climate partners" },
  { number: 5, title: "Document and Disseminate", description: "Africa's climate innovations and impact evidence" },
];

function AnimatedObjectiveCard({
  objective,
  index,
}: {
  objective: Objective;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const tl = gsap.timeline();

    // Initial state
    gsap.set(cardRef.current, {
      opacity: 0,
      x: -30,
      scale: 0.95,
    });

    if (numberRef.current) {
      gsap.set(numberRef.current, {
        scale: 0.5,
        opacity: 0,
      });
    }

    // Create scroll trigger animation
    tl.to(cardRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
      delay: index * 0.1,
    }).to(
      numberRef.current,
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Scroll trigger for the timeline
    ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 85%",
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
      className="group relative flex items-start gap-4 rounded-xl border border-green-100/50 bg-white/80 backdrop-blur-sm p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-green-200 hover:-translate-x-1"
    >
      {/* Number badge */}
      <div
        ref={numberRef}
        className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-lg sm:text-xl shadow-md group-hover:shadow-lg transition-all duration-300"
      >
        {objective.number}
      </div>

      {/* Text content */}
      <div className="flex-1 space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
          {objective.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {objective.description}
        </p>
      </div>

      {/* Subtle hover indicator */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-green-400 to-green-600 rounded-r-full group-hover:h-3/4 transition-all duration-300" />
    </div>
  );
}

export function AboutSection({
  vision = "To create a pan-African ecosystem that mobilizes knowledge, finance, and partnerships to scale climate-smart SMEs and innovations driving Africa's green transition.",
  objectives = defaultObjectives,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLParagraphElement>(null);
  const objectivesHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Badge entrance
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.9, y: -10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: badgeRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Vision text
      if (visionRef.current) {
        gsap.fromTo(
          visionRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Objectives header
      if (objectivesHeaderRef.current) {
        gsap.fromTo(
          objectivesHeaderRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: objectivesHeaderRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 sm:py-20 md:py-28 lg:py-36 bg-gradient-to-b from-white via-green-50/20 to-white touch-pan-y overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Ambient background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Vision & Purpose Section */}
          <div className="mb-16 sm:mb-20 md:mb-24">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-6">
              <Target className="w-4 h-4" />
              <span>Vision & Purpose</span>
            </div>

            {/* Heading */}
            <div ref={headingRef} className="mb-6">
              <h2 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">Mobilizing Africa&rsquo;s Green Future</span>
              </h2>
            </div>

            {/* Vision statement */}
            <p ref={visionRef} className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
              {vision}
            </p>
          </div>

          {/* Core Objectives Section */}
          <div>
            {/* Objectives Header */}
            <div ref={objectivesHeaderRef} className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-1 w-12 bg-green-600 rounded-full" />
                <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">Core Objectives</span>
              </div>
            </div>

            {/* Objectives List */}
            <div className="space-y-4 sm:space-y-5">
              {objectives.map((objective, index) => (
                <AnimatedObjectiveCard key={objective.number} objective={objective} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
