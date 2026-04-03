import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FleetSection from "@/components/sections/FleetSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import SectionDivider from "@/components/ui/SectionDivider";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DAR Åkeri AB — Professional Logistics & Transport Sweden",
  description:
    "DAR Åkeri AB delivers reliable, on-time freight and logistics solutions across Sweden and Europe. Full truck load, LTL, express, and temperature-controlled transport.",
  alternates: {
    canonical: "https://dar-akeri.se",
    languages: {
      "sv-SE": "https://dar-akeri.se",
      "en-GB": "https://dar-akeri.se?lang=en",
    },
  },
};

export default function HomePage() {
  return (
    <>
      <ErrorBoundary sectionName="Hero">
        <HeroSection />
      </ErrorBoundary>

      <SectionDivider variant="simple" className="mx-auto max-w-7xl px-8" />

      <ErrorBoundary sectionName="Services">
        <ServicesSection />
      </ErrorBoundary>

      <SectionDivider variant="dots" className="py-0" />

      <ErrorBoundary sectionName="Fleet">
        <FleetSection />
      </ErrorBoundary>

      <SectionDivider variant="labeled" label="What our clients say" className="mx-auto max-w-7xl px-8" />

      <ErrorBoundary sectionName="Testimonials">
        <TestimonialsSection />
      </ErrorBoundary>

      <SectionDivider variant="simple" className="mx-auto max-w-7xl px-8" />

      <ErrorBoundary sectionName="About">
        <AboutSection />
      </ErrorBoundary>

      <SectionDivider variant="dots" className="py-0" />

      <ErrorBoundary sectionName="Contact">
        <ContactSection />
      </ErrorBoundary>
    </>
  );
}
