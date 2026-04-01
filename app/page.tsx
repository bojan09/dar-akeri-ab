import HeroSection from "@/components/sections/HeroSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Placeholder anchors for navbar active-section detection */}
      <div id="services" className="h-1" aria-hidden="true" />
      <div id="fleet" className="h-1" aria-hidden="true" />
      <div id="about" className="h-1" aria-hidden="true" />
      <div id="testimonials" className="h-1" aria-hidden="true" />
      <div id="contact" className="h-1" aria-hidden="true" />

      <section className="py-32 bg-white flex items-center justify-center">
        <p className="font-display font-bold text-2xl text-brand-navy/20 text-center px-4">
          Services · Fleet · About · Testimonials · Contact<br/>
          <span className="text-lg">— coming in Phases 4–7</span>
        </p>
      </section>
    </>
  );
}
