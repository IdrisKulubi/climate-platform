import { HeroSection, AboutSection, PillarsSection, FundSection, PlatformSection, ActivitiesSection } from "@/components/landing"

export default function HomePage() {
  const fundStats = [
    {
      value: 20,
      prefix: "$",
      suffix: "M",
      label: "Fund Target",
    },
    {
      value: 300,
      suffix: "+",
      label: "SMEs Supported",
    },
    {
      value: 10000,
      suffix: "+",
      label: "Jobs Created",
    },
    {
      value: 500000,
      suffix: "+",
      label: "tCO₂e Reduced",
    },
  ];

  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <PillarsSection />
      <FundSection
        stats={fundStats}
        backgroundImage="/images/fund/african-renewable-energy.jpg"
        ctaHref="#apply-funding"
      />
      <PlatformSection />
      <ActivitiesSection />
    </main>
  );
}
