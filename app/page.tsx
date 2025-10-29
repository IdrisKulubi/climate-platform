import { HeroSection, AboutSection, PillarsSection } from "@/components/landing"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <PillarsSection />
    </main>
  );
}
