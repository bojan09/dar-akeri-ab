import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FleetSection from "@/components/sections/FleetSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import SectionDivider from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionDivider variant="simple" className="mx-auto max-w-7xl px-8" />
      <ServicesSection />
      <SectionDivider variant="dots" className="py-0" />
      <FleetSection />
      <SectionDivider variant="labeled" label="What our clients say" className="mx-auto max-w-7xl px-8" />
      <TestimonialsSection />
      <SectionDivider variant="simple" className="mx-auto max-w-7xl px-8" />
      <AboutSection />
      <SectionDivider variant="dots" className="py-0" />
      <ContactSection />
    </>
  );
}
