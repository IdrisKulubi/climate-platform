'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { prefersReducedMotion } from '@/lib/animations';
import gsap from 'gsap';
import { Building2, Users, TrendingUp, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RegionData {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  partners: string[];
  countries: string[];
  stats: {
    projects: number;
    entrepreneurs: number;
    funding: string;
  };
  color: string;
}

export interface MapSectionProps {
  regions?: RegionData[];
}

const defaultRegions: RegionData[] = [
  {
    id: 'north-africa',
    name: 'North Africa',
    coordinates: { x: 50, y: 22 },
    partners: ['MENA Climate Innovation Center', 'North Africa Green Fund'],
    countries: ['Egypt', 'Morocco', 'Tunisia', 'Algeria', 'Libya'],
    stats: { projects: 45, entrepreneurs: 230, funding: '$4.2M' },
    color: '#FF6B6B',
  },
  {
    id: 'west-africa',
    name: 'West Africa',
    coordinates: { x: 42, y: 48 },
    partners: ['ECOWAS Innovation Hub', 'West Africa Climate Alliance'],
    countries: ['Nigeria', 'Ghana', 'Senegal', 'Côte d\'Ivoire', 'Mali'],
    stats: { projects: 78, entrepreneurs: 420, funding: '$8.5M' },
    color: '#4ECDC4',
  },
  {
    id: 'central-africa',
    name: 'Central Africa',
    coordinates: { x: 54, y: 52 },
    partners: ['Congo Basin Climate Initiative', 'Central Africa Green Network'],
    countries: ['DRC', 'Cameroon', 'Gabon', 'Congo', 'CAR'],
    stats: { projects: 32, entrepreneurs: 180, funding: '$3.1M' },
    color: '#95E1D3',
  },
  {
    id: 'east-africa',
    name: 'East Africa',
    coordinates: { x: 66, y: 50 },
    partners: ['KCIC Kenya', 'East Africa Climate Innovation Network'],
    countries: ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Ethiopia'],
    stats: { projects: 92, entrepreneurs: 510, funding: '$11.2M' },
    color: '#F38181',
  },
  {
    id: 'southern-africa',
    name: 'Southern Africa',
    coordinates: { x: 54, y: 78 },
    partners: ['SADC Climate Network', 'Southern Africa Innovation Hub'],
    countries: ['South Africa', 'Botswana', 'Namibia', 'Zimbabwe', 'Zambia'],
    stats: { projects: 64, entrepreneurs: 340, funding: '$6.8M' },
    color: '#AA96DA',
  },
];

export function MapSection({ regions = defaultRegions }: MapSectionProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const markersRef = useRef<Map<string, SVGGElement>>(new Map());
  const connectionsRef = useRef<SVGGElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);

  // Initialize animations
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return;

    const markers = Array.from(markersRef.current.values());
    
    // Staggered entrance animation for markers
    gsap.fromTo(
      markers,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        delay: 0.5,
      }
    );

    // Continuous pulse animation
    markers.forEach((marker, index) => {
      const pulseRings = marker.querySelectorAll('.pulse-ring');
      pulseRings.forEach((ring, ringIndex) => {
        gsap.to(ring, {
          scale: 2.5,
          opacity: 0,
          duration: 2.5,
          ease: 'power2.out',
          repeat: -1,
          delay: index * 0.4 + ringIndex * 0.8,
        });
      });
    });

    // Animate connection lines
    const connections = connectionsRef.current;
    if (connections) {
      const lines = connections.querySelectorAll('line');
      gsap.fromTo(
        lines,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          stagger: 0.2,
          ease: 'power2.inOut',
          delay: 1,
        }
      );
    }

    return () => {
      gsap.killTweensOf(markers);
      if (connections) {
        gsap.killTweensOf(connections.querySelectorAll('line'));
      }
    };
  }, []);

  // Handle region selection animation
  useEffect(() => {
    if (!activeRegion || prefersReducedMotion()) return;

    const marker = markersRef.current.get(activeRegion);
    if (!marker) return;

    // Emphasize selected marker
    gsap.to(marker, {
      scale: 1.3,
      duration: 0.4,
      ease: 'back.out(2)',
    });

    // Animate details panel
    if (detailsPanelRef.current) {
      gsap.fromTo(
        detailsPanelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }

    return () => {
      if (marker) {
        gsap.to(marker, { scale: 1, duration: 0.3 });
      }
    };
  }, [activeRegion]);

  const selectedRegion = regions.find((r) => r.id === activeRegion);
  const displayRegion = selectedRegion || regions.find((r) => r.id === hoveredRegion);

  return (
    <section
      className="relative py-16 md:py-24 lg:py-32 bg-linear-to-br from-slate-50 via-blue-50/30 to-green-50/20 overflow-hidden"
      aria-labelledby="map-heading"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.8} className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-partner-ifc/10 rounded-full mb-4">
            <MapPin className="w-4 h-4 text-partner-ifc" />
            <span className="text-sm font-medium text-partner-ifc">Continental Network</span>
          </div>
          <h2
            id="map-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4"
          >
            Pan-African Climate Innovation Network
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Five interconnected regional hubs driving climate action across 54 countries, 
            supporting over 1,600 entrepreneurs with $34M+ in funding.
          </p>
        </ScrollReveal>

        {/* Interactive Map Container */}
        <ScrollReveal direction="up" duration={0.8} delay={0.2}>
          <div className="grid lg:grid-cols-[1fr,380px] gap-8 max-w-7xl mx-auto">
            {/* Map */}
            <div className="relative">
              <div className="relative w-full aspect-square lg:aspect-4/3 bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200/50 backdrop-blur-sm">
                <svg
                  ref={mapRef}
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  aria-label="Interactive map of Africa showing regional climate innovation hubs"
                  role="img"
                >
                  <defs>
                    {/* Gradient for Africa continent */}
                    <linearGradient id="africaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E5631" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#003C70" stopOpacity="0.12" />
                    </linearGradient>
                    
                    {/* Glow filter for markers */}
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Enhanced Africa continent shape */}
                  <path
                    d="M 50 12 
                       C 52 12, 54 12.5, 56 14
                       L 60 18
                       C 62 20, 63 23, 64 26
                       L 66 32
                       C 67 36, 68 39, 70 41
                       L 72 44
                       C 73 46, 73.5 49, 73 52
                       L 71 58
                       C 69 62, 67 65, 64 68
                       L 61 72
                       C 59 75, 57 78, 54 81
                       L 51 85
                       C 48 88, 45 89, 42 89
                       L 39 88
                       C 37 87, 35 85, 34 83
                       L 32 79
                       C 31 76, 29 74, 27 72
                       L 25 69
                       C 23 67, 22 64, 21 61
                       L 20 56
                       C 19.5 52, 19.5 48, 20 44
                       L 21 39
                       C 22 35, 24 32, 26 29
                       L 29 25
                       C 31 22, 34 20, 37 18
                       L 41 15
                       C 44 13, 47 12, 50 12 Z"
                    fill="url(#africaGradient)"
                    stroke="#1E5631"
                    strokeWidth="0.3"
                    className="transition-all duration-500"
                    style={{
                      filter: activeRegion ? 'brightness(0.95)' : 'brightness(1)',
                    }}
                  />

                  {/* Connection lines between hubs */}
                  <g ref={connectionsRef} opacity="0.3">
                    {regions.map((region, i) =>
                      regions.slice(i + 1).map((otherRegion) => (
                        <line
                          key={`${region.id}-${otherRegion.id}`}
                          x1={region.coordinates.x}
                          y1={region.coordinates.y}
                          x2={otherRegion.coordinates.x}
                          y2={otherRegion.coordinates.y}
                          stroke="#003C70"
                          strokeWidth="0.15"
                          strokeDasharray="2,2"
                          className="transition-opacity duration-300"
                          style={{
                            opacity:
                              activeRegion === region.id || activeRegion === otherRegion.id
                                ? 0.6
                                : 0.2,
                          }}
                        />
                      ))
                    )}
                  </g>

                  {/* Regional Markers */}
                  {regions.map((region) => (
                    <g
                      key={region.id}
                      ref={(el) => {
                        if (el) markersRef.current.set(region.id, el);
                      }}
                      className="cursor-pointer"
                      style={{ transformOrigin: `${region.coordinates.x}% ${region.coordinates.y}%` }}
                      onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      role="button"
                      tabIndex={0}
                      aria-label={`${region.name} Hub - Click for details`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveRegion(activeRegion === region.id ? null : region.id);
                        }
                      }}
                    >
                      {/* Outer pulse rings */}
                      <circle
                        className="pulse-ring"
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r="1.5"
                        fill="none"
                        stroke={region.color}
                        strokeWidth="0.4"
                        opacity="0.5"
                        style={{ transformOrigin: `${region.coordinates.x}% ${region.coordinates.y}%` }}
                      />
                      <circle
                        className="pulse-ring"
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r="1.5"
                        fill="none"
                        stroke={region.color}
                        strokeWidth="0.4"
                        opacity="0.5"
                        style={{ transformOrigin: `${region.coordinates.x}% ${region.coordinates.y}%` }}
                      />

                      {/* Main marker */}
                      <circle
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r="2.2"
                        fill={region.color}
                        filter="url(#glow)"
                        className={cn(
                          'transition-all duration-300',
                          (activeRegion === region.id || hoveredRegion === region.id) &&
                            'drop-shadow-lg'
                        )}
                        opacity={activeRegion && activeRegion !== region.id ? 0.4 : 1}
                      />

                      {/* Inner ring */}
                      <circle
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r="1.5"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.3"
                        opacity="0.8"
                      />

                      {/* Center dot */}
                      <circle
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r="0.6"
                        fill="white"
                        opacity="0.9"
                      />

                      {/* Region label */}
                      <text
                        x={region.coordinates.x}
                        y={region.coordinates.y - 4}
                        textAnchor="middle"
                        className="text-[2.5px] font-semibold fill-foreground"
                        opacity={hoveredRegion === region.id || activeRegion === region.id ? 1 : 0.7}
                      >
                        {region.name}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Floating stats indicator */}
                {displayRegion && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-slate-200/50 max-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: displayRegion.color }}
                      />
                      <h4 className="font-semibold text-sm">{displayRegion.name}</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-lg font-bold text-partner-ifc">
                          {displayRegion.stats.projects}
                        </div>
                        <div className="text-[10px] text-muted-foreground">Projects</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-climate-green">
                          {displayRegion.stats.entrepreneurs}
                        </div>
                        <div className="text-[10px] text-muted-foreground">Founders</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-climate-yellow">
                          {displayRegion.stats.funding}
                        </div>
                        <div className="text-[10px] text-muted-foreground">Funding</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Details Panel */}
            <div className="hidden lg:block">
              {activeRegion ? (
                <div
                  ref={detailsPanelRef}
                  className="sticky top-24 bg-white rounded-3xl shadow-2xl p-8 border border-slate-200/50"
                >
                  {selectedRegion && (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: `${selectedRegion.color}20` }}
                        >
                          <MapPin
                            className="w-6 h-6"
                            style={{ color: selectedRegion.color }}
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{selectedRegion.name}</h3>
                          <p className="text-sm text-muted-foreground">Regional Hub</p>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-linear-to-br from-blue-50 to-blue-100/50 rounded-xl p-4">
                          <Building2 className="w-5 h-5 text-partner-ifc mb-2" />
                          <div className="text-2xl font-bold text-partner-ifc">
                            {selectedRegion.stats.projects}
                          </div>
                          <div className="text-xs text-muted-foreground">Active Projects</div>
                        </div>
                        <div className="bg-linear-to-br from-green-50 to-green-100/50 rounded-xl p-4">
                          <Users className="w-5 h-5 text-climate-green mb-2" />
                          <div className="text-2xl font-bold text-climate-green">
                            {selectedRegion.stats.entrepreneurs}
                          </div>
                          <div className="text-xs text-muted-foreground">Entrepreneurs</div>
                        </div>
                        <div className="bg-linear-to-br from-yellow-50 to-yellow-100/50 rounded-xl p-4">
                          <TrendingUp className="w-5 h-5 text-climate-yellow mb-2" />
                          <div className="text-2xl font-bold text-climate-yellow">
                            {selectedRegion.stats.funding}
                          </div>
                          <div className="text-xs text-muted-foreground">Total Funding</div>
                        </div>
                      </div>

                      {/* Partners */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                          Partner Organizations
                        </h4>
                        <div className="space-y-2">
                          {selectedRegion.partners.map((partner, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: selectedRegion.color }}
                              />
                              <span className="text-sm">{partner}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Countries */}
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                          Key Countries
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedRegion.countries.map((country, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-slate-100 text-sm rounded-full hover:bg-slate-200 transition-colors"
                            >
                              {country}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="sticky top-24 bg-linear-to-br from-slate-50 to-blue-50/30 rounded-3xl shadow-lg p-8 border border-slate-200/50 flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Click on a regional hub to view details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden mt-8 space-y-4">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
                className="w-full text-left bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                    style={{ backgroundColor: `${region.color}20` }}
                  >
                    <MapPin className="w-6 h-6" style={{ color: region.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{region.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {region.countries.length} countries
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-lg font-bold" style={{ color: region.color }}>
                      {region.stats.projects}
                    </div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-lg font-bold" style={{ color: region.color }}>
                      {region.stats.entrepreneurs}
                    </div>
                    <div className="text-xs text-muted-foreground">Founders</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-lg font-bold" style={{ color: region.color }}>
                      {region.stats.funding}
                    </div>
                    <div className="text-xs text-muted-foreground">Funding</div>
                  </div>
                </div>

                {/* Expandable Details */}
                {activeRegion === region.id && (
                  <div className="pt-4 border-t border-slate-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Partners
                      </h4>
                      <div className="space-y-1">
                        {region.partners.map((partner, idx) => (
                          <div key={idx} className="text-sm flex items-center gap-2">
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: region.color }}
                            />
                            {partner}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Countries
                      </h4>
                      <p className="text-sm">{region.countries.join(', ')}</p>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
