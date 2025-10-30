"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Globe, MapPin, TrendingUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ImpactStat {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ImpactMapSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  mapImage?: string;
  stats?: ImpactStat[];
}

const defaultStats: ImpactStat[] = [
  {
    value: "10+",
    label: "African Countries",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    value: "60",
    label: "New Collaborations",
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    value: "5+",
    label: "Policy Instruments Influenced",
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

export function ImpactMapSection({
  title = "Our Pan-African Impact",
  subtitle = "Engagement Across the Continent",
  description = "From Kenya to the broader African region, KCIC's influence spans multiple countries, fostering climate innovation and sustainable development through strategic partnerships and policy engagement.",
  mapImage = "/images/maps/map.png",
  stats = defaultStats,
}: ImpactMapSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Animate map with scale and fade
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { opacity: 0, scale: 0.9, rotateY: -10 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // Animate stats cards
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll(".stat-card");
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
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
      id="impact-map"
      className="relative py-16 sm:py-20 md:py-28 lg:py-36 bg-gradient-to-b from-white via-green-50/30 to-white overflow-hidden"
      aria-labelledby="impact-map-heading"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
            <Globe className="w-4 h-4" />
            <span>{subtitle}</span>
          </div>
          <h2
            id="impact-map-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-4 sm:mb-6"
          >
            {title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Map Container with modern styling */}
        <div
          ref={mapRef}
          className="relative max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-20"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-4 sm:p-6 md:p-8">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-3xl opacity-20 blur-xl" />
            
            {/* Map image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-white">
              <Image
                src={mapImage}
                alt="KCIC Impact Map - Engagement across African countries"
                fill
                className="object-contain p-4"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card group relative"
            >
              <div className="relative rounded-2xl bg-white border border-green-100 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                
                {/* Icon */}
                {stat.icon && (
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-50 text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                )}
                
                {/* Value */}
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {stat.value}
                </div>
                
                {/* Label */}
                <p className="text-sm sm:text-base text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
