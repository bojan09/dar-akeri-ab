import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />

      {/* Placeholder anchors for upcoming sections */}
      <div id="fleet" className="h-1" aria-hidden="true" />
      <div id="about" className="h-1" aria-hidden="true" />
      <div id="testimonials" className="h-1" aria-hidden="true" />
      <div id="contact" className="h-1" aria-hidden="true" />

      <section className="py-32 bg-white flex items-center justify-center">
        <p className="font-display font-bold text-2xl text-brand-navy/20 text-center px-4">
          Fleet · About · Testimonials · Contact<br />
          <span className="text-lg">— coming in Phases 5–7</span>
        </p>
      </section>
    </>
  );
}
