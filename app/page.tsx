import { HeroSection, AboutSection, PillarsSection, FundSection, PlatformSection, ActivitiesSection, FooterSection } from "@/components/landing"
import { Navbar } from "@/components/navigation"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Africa Climate Platform",
  description: "A comprehensive ecosystem designed to accelerate climate action across Africa",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://africaclimate.org",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://africaclimate.org"}/images/logo.png`,
  sameAs: [
    "https://twitter.com/AfricaClimatePlatform",
    "https://linkedin.com/company/africa-climate-platform",
    "https://facebook.com/AfricaClimatePlatform",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "General Inquiries",
    email: "info@africaclimate.org",
  },
  areaServed: {
    "@type": "Place",
    name: "Africa",
  },
  knowsAbout: [
    "Climate Action",
    "Green Finance",
    "Sustainable Development",
    "Renewable Energy",
    "Climate Innovation",
  ],
};

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
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
        <FooterSection />
      </main>
    </>
  );
}
