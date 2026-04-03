"use client";

import { useLocale } from "@/hooks/useLocale";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { scrollToSection } from "@/lib/utils";
import {
  Truck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";

const NAV_SECTIONS = [
  { labelKey: "services" as const, id: "services" },
  { labelKey: "fleet" as const, id: "fleet" },
  { labelKey: "about" as const, id: "about" },
  { labelKey: "testimonials" as const, id: "testimonials" },
  { labelKey: "contact" as const, id: "contact" },
];

const CERTIFICATIONS = [
  "ISO 9001:2015",
  "Euro VI Fleet",
  "HACCP Certified",
  "ADR Licensed",
];

export default function Footer() {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-surface-dark text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ── Top CTA Banner ─────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <p className="section-label text-brand-orange">
                Ready to start?
              </p>
              <h2 className="text-display-md font-display font-black text-white mt-1 leading-tight">
                Get a free logistics quote{" "}
                <span className="text-brand-orange">today.</span>
              </h2>
            </div>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-primary shrink-0 group"
              aria-label="Contact us for a quote"
            >
              {t.nav.getQuote}
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Col 1: Brand ─────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-xl text-white tracking-tight">
                  DAR Åkeri
                </span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-brand-orange">
                  AB
                </span>
              </div>
            </div>

            <p className="font-sans text-sm text-white/60 leading-relaxed max-w-xs">
              {t.footer.tagline} Serving Sweden and Europe with precision,
              reliability, and care since 2009.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {CERTIFICATIONS.map((cert) => (
                <span
                  key={cert}
                  className="text-[10px] font-display font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/8 text-white/50 border border-white/10"
                >
                  {cert}
                </span>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`DAR Åkeri on ${label}`}
                  className="w-9 h-9 rounded-xl bg-white/8 hover:bg-brand-orange border border-white/10 hover:border-brand-orange flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Navigation ────────────────────────── */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white/40">
              Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2.5">
                {NAV_SECTIONS.map(({ labelKey, id }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-brand-orange transition-all duration-200 overflow-hidden" aria-hidden="true" />
                      {t.nav[labelKey]}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Col 3: Services quick list ───────────────── */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white/40">
              {t.nav.services}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {t.services.items.slice(0, 5).map((item) => (
                <li key={item.title}>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-200 text-left flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-brand-orange transition-all duration-200 overflow-hidden" aria-hidden="true" />
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact info ──────────────────────── */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white/40">
              Contact
            </h3>
            <address className="not-italic flex flex-col gap-3">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: t.contact.info.phone,
                  href: `tel:${t.contact.info.phone.replace(/\s/g, "")}`,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: t.contact.info.email,
                  href: `mailto:${t.contact.info.email}`,
                },
                {
                  icon: MapPin,
                  label: "Address",
                  value: t.contact.info.address,
                  href: `https://maps.google.com?q=${encodeURIComponent(t.contact.info.address)}`,
                },
                {
                  icon: Clock,
                  label: "Hours",
                  value: t.contact.info.hours,
                  href: null,
                },
              ].map(({ icon: Icon, label, value, href }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    className="flex items-start gap-3 group"
                    aria-label={`${label}: ${value}`}
                    target={href.startsWith("https") ? "_blank" : undefined}
                    rel={href.startsWith("https") ? "noopener noreferrer" : undefined}
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-orange transition-colors duration-200">
                      <Icon className="w-3.5 h-3.5 text-white/50 group-hover:text-white" aria-hidden="true" />
                    </div>
                    <span className="font-sans text-sm text-white/60 group-hover:text-white transition-colors duration-200 leading-relaxed">
                      {value}
                    </span>
                  </a>
                ) : (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
                    </div>
                    <span className="font-sans text-sm text-white/60 leading-relaxed">
                      {value}
                    </span>
                  </div>
                )
              )}
            </address>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-sans text-xs text-white/40 text-center sm:text-left">
              © {currentYear} {t.footer.copyright}
            </p>
            <LanguageToggle variant="pill" theme="dark" />
            <nav aria-label="Legal links">
              <ul className="flex items-center gap-1">
                {t.footer.links.map((link, i) => (
                  <li key={link.href} className="flex items-center gap-1">
                    {i > 0 && (
                      <span className="text-white/20 text-xs" aria-hidden="true">
                        ·
                      </span>
                    )}
                    <a
                      href={link.href}
                      className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
