"use client";

import { useRef, useEffect, useState, useMemo } from "react";
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

export type RegionHotspot = {
  id: string;
  name: string;
  top: number;   // percentage [0-100]
  left: number;  // percentage [0-100]
  description?: string;
};

export interface ImpactMapSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  mapImage?: string;
  stats?: ImpactStat[];
  hotspots?: RegionHotspot[];
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

const defaultHotspots: RegionHotspot[] = [];

export function ImpactMapSection({
  title = "Our Pan-African Impact",
  subtitle = "Engagement Across the Continent",
  description = "From Kenya to the broader African region, KCIC&rsquo;s influence spans multiple countries, fostering climate innovation and sustainable development through strategic partnerships and policy engagement.",
  mapImage = "/images/maps/map.png",
  stats = defaultStats,
  hotspots = defaultHotspots,
}: ImpactMapSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardGridRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null); // outer card wrapper
  const mapInnerRef = useRef<HTMLDivElement>(null); // inner container with image and hotspots

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mapSize, setMapSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // Track map container size with ResizeObserver
  useEffect(() => {
    const el = mapInnerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const obs = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr) setMapSize({ width: cr.width, height: cr.height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Compute pixel positions of hotspots given the current map size
  const hotspotPixels = useMemo(() => {
    const width = mapSize.width;
    const height = mapSize.height;
    return hotspots.map(h => ({
      id: h.id,
      name: h.name,
      x: (h.left / 100) * width,
      y: (h.top / 100) * height,
    }));
  }, [hotspots, mapSize.width, mapSize.height]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title reveal
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

      // Card & map entrance
      if (mapWrapperRef.current) {
        gsap.fromTo(
          mapWrapperRef.current,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapWrapperRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Hotspots pop-in
      if (mapInnerRef.current) {
        const markers = mapInnerRef.current.querySelectorAll(".hotspot");
        gsap.fromTo(
          markers,
          { opacity: 0, scale: 0.6, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: mapInnerRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Subtle 3D tilt and nearest-hotspot detection
  useEffect(() => {
    const el = mapInnerRef.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const maxTilt = 6; // degrees
      const tiltY = (dx / (rect.width / 2)) * maxTilt; // rotateY by X movement
      const tiltX = (-dy / (rect.height / 2)) * maxTilt; // rotateX by Y movement

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        gsap.to(el, { rotateY: tiltY, rotateX: tiltX, transformPerspective: 800, duration: 0.4, ease: "power2.out" });
      });

      // Nearest hotspot label
      const nearest = hotspotPixels.reduce(
        (acc, p) => {
          const d = Math.hypot(p.x - (e.clientX - rect.left), p.y - (e.clientY - rect.top));
          return d < acc.dist ? { id: p.id, dist: d } : acc;
        },
        { id: null as string | null, dist: Infinity }
      );
      const threshold = Math.max(56, Math.min(rect.width, rect.height) * 0.07); // responsive threshold
      setHoveredId(nearest.dist < threshold ? nearest.id : null);
    };

    const onLeave = () => {
      gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power3.out" });
      setHoveredId(null);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [hotspotPixels]);

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

        {/* Map Card */}
        <div ref={mapWrapperRef} className="relative max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-4 sm:p-6 md:p-8">
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-3xl opacity-20 blur-xl" />

            {/* Inner 3D container */}
            <div
              ref={mapInnerRef}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-white will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Map image */}
              <Image
                src={mapImage}
                alt="KCIC Impact Map - Engagement across African countries"
                fill
                className="object-contain p-4 select-none pointer-events-none"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />

              {/* Hotspots */}
              {hotspots.map((h) => (
                <button
                  key={h.id}
                  className="hotspot group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${h.top}%`, left: `${h.left}%` }}
                  aria-label={h.name}
                  onMouseEnter={() => setHoveredId(h.id)}
                  onFocus={() => setHoveredId(h.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Outer pulse */}
                  <span className="absolute inset-0 -m-2 rounded-full bg-green-500/10 scale-0 group-hover:scale-100 transition-transform duration-300" />

                  {/* Ping ring */}
                  <span className="absolute -inset-3 rounded-full border-2 border-green-500/40 animate-ping" />

                  {/* Marker */}
                  <span className="relative z-10 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-green-600 shadow ring-4 ring-green-400/30 group-hover:scale-110 transition-transform" />

                  {/* Label on hover */}
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800 shadow-md opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                    {h.name}
                  </span>
                </button>
              ))}

              {/* Dynamic cursor label for nearest hotspot */}
              {hoveredId && (() => {
                const hs = hotspots.find(h => h.id === hoveredId);
                if (!hs) return null;
                return (
                  <div
                    className="pointer-events-none absolute -translate-x-1/2 -translate-y-[140%] rounded-md bg-gray-900/90 px-2.5 py-1 text-xs font-medium text-white shadow-lg"
                    style={{ left: `${hs.left}%`, top: `${hs.top}%` }}
                  >
                    {hs.name}
                  </div>
                );
              })()}

              {/* Subtle gradient vignette */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-black/5" />
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Legend */}
        <div className="max-w-6xl mx-auto mb-10 -mt-6 flex items-center gap-3 text-sm text-gray-600">
          <span className="inline-flex items-center gap-2"><span className="inline-block w-2.5 h-2.5 rounded-full bg-green-600" /> Engagement hotspot</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Hover near a hotspot to see the area label</span>
        </div>

        {/* Stats Grid */}
        <div
          ref={cardGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="stat-card group relative">
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
