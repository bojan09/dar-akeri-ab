import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FleetSection from "@/components/sections/FleetSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FleetSection />
      <TestimonialsSection />

      {/* Placeholder anchors for upcoming sections */}
      <div id="about" className="h-1" aria-hidden="true" />
      <div id="contact" className="h-1" aria-hidden="true" />

      <section className="py-32 bg-white flex items-center justify-center">
        <p className="font-display font-bold text-2xl text-brand-navy/20 text-center px-4">
          About · Contact — coming in Phases 6–7
        </p>
      </section>
    </>
  );
}
