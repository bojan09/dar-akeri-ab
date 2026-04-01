"use client";

// ── Types ─────────────────────────────────────────────────
export type Locale = "en" | "sv";

export interface TranslationSchema {
  nav: {
    services: string;
    fleet: string;
    about: string;
    testimonials: string;
    contact: string;
    getQuote: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineAccent: string;
    subtext: string;
    cta: string;
    ctaSecondary: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };
  services: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  fleet: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    items: {
      name: string;
      capacity: string;
      description: string;
    }[];
  };
  about: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    body1: string;
    body2: string;
    body3: string;
    features: { title: string; description: string }[];
    cta: string;
  };
  testimonials: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    items: {
      quote: string;
      name: string;
      role: string;
      company: string;
    }[];
  };
  contact: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      company: string;
      companyPlaceholder: string;
      service: string;
      servicePlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      successSub: string;
      error: string;
    };
    info: {
      phone: string;
      email: string;
      address: string;
      hours: string;
    };
  };
  footer: {
    tagline: string;
    copyright: string;
    links: { label: string; href: string }[];
  };
}

// ── Translations ──────────────────────────────────────────
const translations: Record<Locale, TranslationSchema> = {
  en: {
    nav: {
      services: "Services",
      fleet: "Fleet",
      about: "About",
      testimonials: "Testimonials",
      contact: "Contact",
      getQuote: "Get a Quote",
    },
    hero: {
      badge: "Reliable Swedish Logistics",
      headline: "We Move Sweden",
      headlineAccent: "Forward.",
      subtext:
        "DAR Åkeri AB delivers freight solutions you can count on — from local distribution to cross-border European logistics. On time, every time.",
      cta: "Get a Free Quote",
      ctaSecondary: "Explore Services",
      stat1Value: "500+",
      stat1Label: "Active Clients",
      stat2Value: "15+",
      stat2Label: "Years of Excellence",
      stat3Value: "99.2%",
      stat3Label: "On-Time Delivery",
    },
    services: {
      sectionLabel: "What We Offer",
      title: "Logistics Built Around Your Business",
      subtitle:
        "From same-day local deliveries to full European freight networks — we tailor every solution to your exact needs.",
      items: [
        {
          title: "Full Truck Load (FTL)",
          description:
            "Dedicated vehicle for your cargo. Maximum efficiency and security for large consignments across Sweden and Europe.",
        },
        {
          title: "Less-than-Truck Load (LTL)",
          description:
            "Cost-effective groupage freight. Share capacity, reduce costs, and still get reliable delivery windows.",
        },
        {
          title: "Express & Time-Critical",
          description:
            "When speed is everything. Our express network handles urgent deliveries within guaranteed time frames.",
        },
        {
          title: "Temperature-Controlled",
          description:
            "Specialized refrigerated and frozen transport. Precise temperature monitoring throughout the journey.",
        },
        {
          title: "Cross-Border European",
          description:
            "Seamless freight across European borders. Customs documentation, compliance, and local expertise included.",
        },
        {
          title: "Warehousing & Distribution",
          description:
            "Strategic storage and last-mile delivery. Integrated warehouse management to streamline your supply chain.",
        },
      ],
    },
    fleet: {
      sectionLabel: "Our Fleet",
      title: "Modern Vehicles for Every Need",
      subtitle:
        "Our continuously renewed fleet meets the highest European emission standards, ensuring reliability and sustainability.",
      items: [
        {
          name: "Heavy Duty Truck",
          capacity: "Up to 24 tonnes",
          description:
            "Euro VI compliant long-haul trucks equipped with GPS tracking and modern safety systems.",
        },
        {
          name: "Refrigerated Trailer",
          capacity: "Up to 22 tonnes",
          description:
            "Full temperature range (-25°C to +25°C) with continuous monitoring and HACCP compliance.",
        },
        {
          name: "Distribution Van",
          capacity: "Up to 3.5 tonnes",
          description:
            "Agile city delivery vehicles for last-mile distribution in urban environments.",
        },
        {
          name: "Flatbed Trailer",
          capacity: "Up to 26 tonnes",
          description:
            "Specialized for oversized, heavy, and awkward cargo requiring open transport.",
        },
      ],
    },
    about: {
      sectionLabel: "Our Story",
      title: "A Swedish Logistics Partner You Can Trust",
      subtitle:
        "More than a transport company — we are your strategic logistics partner, built on Swedish values of reliability, honesty, and quality.",
      body1:
        "Founded on the principles of hard work and honest service, DAR Åkeri AB has grown from a small regional carrier into one of Sweden's trusted logistics operators. Over 15 years, we have built lasting partnerships with manufacturers, retailers, and distributors who rely on us to keep their supply chains running smoothly.",
      body2:
        "Our fleet of modern, Euro VI compliant vehicles covers all of Sweden and connects to major European freight corridors. Every driver on our team is professionally trained, background-checked, and committed to the safe, punctual delivery of your goods — because your cargo is our responsibility.",
      body3:
        "We believe logistics should be simple for you. That means clear communication, transparent pricing, real-time tracking, and a dedicated account manager who knows your business by name. No call centres. No runaround. Just results.",
      features: [
        {
          title: "ISO 9001 Certified",
          description: "Quality management system ensuring consistent, high-standard service delivery.",
        },
        {
          title: "Real-Time GPS Tracking",
          description: "Monitor your shipments 24/7 through our online portal or mobile app.",
        },
        {
          title: "Dedicated Account Manager",
          description: "One point of contact who knows your business and your priorities.",
        },
        {
          title: "Eco-Conscious Operations",
          description: "Euro VI fleet, route optimization, and active CO₂ reduction targets.",
        },
        {
          title: "24/7 Support",
          description: "Around-the-clock operations team ready to handle urgent situations.",
        },
        {
          title: "Flexible Contracts",
          description: "Spot shipments or long-term framework agreements — on your terms.",
        },
      ],
      cta: "Learn More About Us",
    },
    testimonials: {
      sectionLabel: "Client Reviews",
      title: "Trusted by Businesses Across Sweden",
      subtitle:
        "Hear from the companies that rely on DAR Åkeri AB to keep their operations moving.",
      items: [
        {
          quote:
            "DAR Åkeri has been our primary logistics partner for over four years. Their reliability and professionalism have genuinely contributed to our growth — we never worry about our deliveries.",
          name: "Lars Eriksson",
          role: "Supply Chain Director",
          company: "Nordic Build AB",
        },
        {
          quote:
            "Switching to DAR Åkeri was one of the best decisions we made. On-time rates improved dramatically, and their communication is excellent. They feel like part of our team.",
          name: "Maja Lindström",
          role: "Operations Manager",
          company: "Göteborg Foods Group",
        },
        {
          quote:
            "Temperature-controlled transport for our pharmaceutical products requires absolute precision. DAR Åkeri delivers that precision every single time. Highly recommended.",
          name: "Stefan Björk",
          role: "Head of Procurement",
          company: "Scandinavian MedSupply",
        },
        {
          quote:
            "We've used many carriers over the years. DAR Åkeri stands out for their transparency, fair pricing, and the fact that they actually pick up the phone when you need them.",
          name: "Anna Johansson",
          role: "Logistics Coordinator",
          company: "Stockholm Retail Solutions",
        },
      ],
    },
    contact: {
      sectionLabel: "Get in Touch",
      title: "Ready to Move Your Business Forward?",
      subtitle:
        "Get in touch for a free, no-obligation quote. We respond within 2 hours during business hours.",
      form: {
        name: "Full Name",
        namePlaceholder: "Your full name",
        email: "Email Address",
        emailPlaceholder: "your@company.com",
        phone: "Phone Number",
        phonePlaceholder: "+46 70 000 00 00",
        company: "Company Name",
        companyPlaceholder: "Your company",
        service: "Service Required",
        servicePlaceholder: "Select a service...",
        message: "Message",
        messagePlaceholder: "Tell us about your shipment needs, frequency, destinations...",
        submit: "Send Message",
        submitting: "Sending...",
        success: "Message Sent!",
        successSub: "We'll get back to you within 2 business hours.",
        error: "Something went wrong. Please try again or call us directly.",
      },
      info: {
        phone: "+46 8 000 00 00",
        email: "info@dar-akeri.se",
        address: "Logistikvägen 12, 175 62 Järfälla, Sweden",
        hours: "Mon–Fri 07:00–18:00",
      },
    },
    footer: {
      tagline: "Reliable Swedish logistics, built on trust.",
      copyright: "DAR Åkeri AB. All rights reserved.",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  },

  sv: {
    nav: {
      services: "Tjänster",
      fleet: "Fordonsflotta",
      about: "Om oss",
      testimonials: "Omdömen",
      contact: "Kontakt",
      getQuote: "Begär offert",
    },
    hero: {
      badge: "Pålitlig svensk logistik",
      headline: "Vi driver Sverige",
      headlineAccent: "Framåt.",
      subtext:
        "DAR Åkeri AB levererar fraktlösningar du kan lita på — från lokal distribution till gränsöverskridande europeisk logistik. I tid, varje gång.",
      cta: "Begär gratis offert",
      ctaSecondary: "Utforska tjänster",
      stat1Value: "500+",
      stat1Label: "Aktiva kunder",
      stat2Value: "15+",
      stat2Label: "År av excellens",
      stat3Value: "99,2%",
      stat3Label: "Leverans i tid",
    },
    services: {
      sectionLabel: "Vad vi erbjuder",
      title: "Logistik byggd kring ditt företag",
      subtitle:
        "Från same-day lokala leveranser till europeiska frakt nätverk — vi anpassar varje lösning efter dina exakta behov.",
      items: [
        {
          title: "Hel lastbil (FTL)",
          description:
            "Dedikerat fordon för ditt gods. Maximal effektivitet och säkerhet för stora sändningar i Sverige och Europa.",
        },
        {
          title: "Dellast (LTL)",
          description:
            "Kostnadseffektiv styckegods-frakt. Dela kapacitet, minska kostnader och få ändå pålitliga leveransfönster.",
        },
        {
          title: "Express & tidskritisk",
          description:
            "När hastighet är allt. Vårt expressnätverk hanterar brådskande leveranser inom garanterade tidsramar.",
        },
        {
          title: "Temperaturkontrollerad transport",
          description:
            "Specialiserad kyl- och frystransport. Exakt temperaturövervakning under hela resan.",
        },
        {
          title: "Gränsöverskridande europeisk frakt",
          description:
            "Sömlös frakt över europeiska gränser. Tullhantering, regelefterlevnad och lokal expertis ingår.",
        },
        {
          title: "Lagerhållning & distribution",
          description:
            "Strategisk lagring och sista-mil leverans. Integrerad lagerhantering för att effektivisera din leveranskedja.",
        },
      ],
    },
    fleet: {
      sectionLabel: "Vår fordonsflotta",
      title: "Moderna fordon för alla behov",
      subtitle:
        "Vår kontinuerligt förnyade flotta uppfyller de högsta europeiska utsläppsstandarderna och säkerställer tillförlitlighet och hållbarhet.",
      items: [
        {
          name: "Tung lastbil",
          capacity: "Upp till 24 ton",
          description:
            "Euro VI-kompatibla långfärdslastbilar utrustade med GPS-spårning och moderna säkerhetssystem.",
        },
        {
          name: "Kyltransport",
          capacity: "Upp till 22 ton",
          description:
            "Fullt temperaturintervall (-25°C till +25°C) med kontinuerlig övervakning och HACCP-efterlevnad.",
        },
        {
          name: "Distributionsbil",
          capacity: "Upp till 3,5 ton",
          description:
            "Smidiga stadsleveransfordon för sista-mil distribution i stadsmiljö.",
        },
        {
          name: "Flatbed trailer",
          capacity: "Upp till 26 ton",
          description:
            "Specialiserad för överdimensionerat, tungt och svårhanterligt gods som kräver öppen transport.",
        },
      ],
    },
    about: {
      sectionLabel: "Vår historia",
      title: "En svensk logistikpartner du kan lita på",
      subtitle:
        "Mer än ett transportföretag — vi är din strategiska logistikpartner, byggd på svenska värderingar om tillförlitlighet, ärlighet och kvalitet.",
      body1:
        "Grundat på principer om hårt arbete och ärlig service har DAR Åkeri AB vuxit från ett litet regionalt åkeri till en av Sveriges betrodda logistikoperatörer. Under 15 år har vi byggt varaktiga partnerskap med tillverkare, återförsäljare och distributörer som förlitar sig på oss för att hålla sina leveranskedjor igång.",
      body2:
        "Vår flotta av moderna, Euro VI-kompatibla fordon täcker hela Sverige och ansluter till viktiga europeiska fraktvägkorridorer. Varje förare i vårt team är professionellt utbildad, bakgrundskontrollerad och dedikerad till säker, punktlig leverans av ditt gods.",
      body3:
        "Vi tror att logistik ska vara enkelt för dig. Det innebär tydlig kommunikation, transparent prissättning, realtidsspårning och en dedikerad kundansvarig som känner ditt företag vid namn. Inga callcenter. Ingen rundgång. Bara resultat.",
      features: [
        {
          title: "ISO 9001-certifierad",
          description: "Kvalitetsledningssystem som säkerställer konsekvent, högkvalitativ service.",
        },
        {
          title: "Realtids GPS-spårning",
          description: "Övervaka dina sändningar dygnet runt via vår onlineportal eller mobilapp.",
        },
        {
          title: "Dedikerad kundansvarig",
          description: "En kontaktpunkt som känner ditt företag och dina prioriteringar.",
        },
        {
          title: "Miljömedvetna operationer",
          description: "Euro VI-flotta, ruttoptimering och aktiva CO₂-reduktionsmål.",
        },
        {
          title: "Support dygnet runt",
          description: "Operationsteam redo att hantera akuta situationer när som helst.",
        },
        {
          title: "Flexibla avtal",
          description: "Spotsändningar eller långsiktiga ramavtal — på dina villkor.",
        },
      ],
      cta: "Läs mer om oss",
    },
    testimonials: {
      sectionLabel: "Kundrecensioner",
      title: "Betrodd av företag i hela Sverige",
      subtitle:
        "Hör från de företag som förlitar sig på DAR Åkeri AB för att hålla sina verksamheter igång.",
      items: [
        {
          quote:
            "DAR Åkeri har varit vår primära logistikpartner i över fyra år. Deras pålitlighet och professionalism har genuint bidragit till vår tillväxt — vi oroar oss aldrig för våra leveranser.",
          name: "Lars Eriksson",
          role: "Supply Chain Director",
          company: "Nordic Build AB",
        },
        {
          quote:
            "Att byta till DAR Åkeri var ett av de bästa besluten vi tog. Punktligheten förbättrades dramatiskt och deras kommunikation är utmärkt. De känns som en del av vårt team.",
          name: "Maja Lindström",
          role: "Driftschef",
          company: "Göteborg Foods Group",
        },
        {
          quote:
            "Temperaturkontrollerad transport för våra farmaceutiska produkter kräver absolut precision. DAR Åkeri levererar den precisionen varje gång. Varmt rekommenderat.",
          name: "Stefan Björk",
          role: "Inköpschef",
          company: "Scandinavian MedSupply",
        },
        {
          quote:
            "Vi har anlitat många transportörer genom åren. DAR Åkeri utmärker sig för sin transparens, rättvisa prissättning och det faktum att de faktiskt svarar i telefon när du behöver dem.",
          name: "Anna Johansson",
          role: "Logistikkoordinator",
          company: "Stockholm Retail Solutions",
        },
      ],
    },
    contact: {
      sectionLabel: "Kontakta oss",
      title: "Redo att driva ditt företag framåt?",
      subtitle:
        "Kontakta oss för en gratis, icke-bindande offert. Vi svarar inom 2 timmar under arbetstid.",
      form: {
        name: "Fullständigt namn",
        namePlaceholder: "Ditt fullständiga namn",
        email: "E-postadress",
        emailPlaceholder: "din@foretag.se",
        phone: "Telefonnummer",
        phonePlaceholder: "+46 70 000 00 00",
        company: "Företagsnamn",
        companyPlaceholder: "Ditt företag",
        service: "Önskad tjänst",
        servicePlaceholder: "Välj en tjänst...",
        message: "Meddelande",
        messagePlaceholder: "Berätta om dina fraktbehov, frekvens, destinationer...",
        submit: "Skicka meddelande",
        submitting: "Skickar...",
        success: "Meddelande skickat!",
        successSub: "Vi återkommer inom 2 arbetstimmar.",
        error: "Något gick fel. Försök igen eller ring oss direkt.",
      },
      info: {
        phone: "+46 8 000 00 00",
        email: "info@dar-akeri.se",
        address: "Logistikvägen 12, 175 62 Järfälla, Sverige",
        hours: "Mån–Fre 07:00–18:00",
      },
    },
    footer: {
      tagline: "Pålitlig svensk logistik, byggd på förtroende.",
      copyright: "DAR Åkeri AB. Alla rättigheter förbehållna.",
      links: [
        { label: "Integritetspolicy", href: "/privacy" },
        { label: "Användarvillkor", href: "/terms" },
        { label: "Cookiepolicy", href: "/cookies" },
      ],
    },
  },
};

// ── Hook / Helpers ────────────────────────────────────────
export function getTranslation(locale: Locale): TranslationSchema {
  return translations[locale] ?? translations.en;
}

export const SUPPORTED_LOCALES: Locale[] = ["en", "sv"];
export const DEFAULT_LOCALE: Locale = "sv";

export default translations;
