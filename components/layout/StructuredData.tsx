// Server component — renders inline <script type="application/ld+json">
// for search engine rich results (Google Business, Bing, etc.)

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // ── Local Business ────────────────────────────
      {
        "@type": ["LocalBusiness", "MovingCompany"],
        "@id": "https://dar-akeri.se/#business",
        name: "DAR Åkeri AB",
        description:
          "Professional logistics and freight transport across Sweden and Europe. Full truck load, LTL, express, temperature-controlled and cross-border services.",
        url: "https://dar-akeri.se",
        telephone: "+46-8-000-00-00",
        email: "info@dar-akeri.se",
        foundingDate: "2009",
        numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Logistikvägen 12",
          addressLocality: "Järfälla",
          postalCode: "175 62",
          addressCountry: "SE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 59.4238,
          longitude: 17.8428,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "07:00",
            closes: "18:00",
          },
        ],
        areaServed: [
          { "@type": "Country", name: "Sweden" },
          { "@type": "Country", name: "Norway" },
          { "@type": "Country", name: "Denmark" },
          { "@type": "Country", name: "Finland" },
          { "@type": "Continent", name: "Europe" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Logistics Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full Truck Load (FTL)" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Less-than-Truck Load (LTL)" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Express & Time-Critical Delivery" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Temperature-Controlled Transport" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cross-Border European Freight" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Warehousing & Distribution" } },
          ],
        },
        sameAs: [
          "https://www.linkedin.com/company/dar-akeri-ab",
          "https://www.facebook.com/darakeri",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "120",
          bestRating: "5",
          worstRating: "1",
        },
      },

      // ── Website ───────────────────────────────────
      {
        "@type": "WebSite",
        "@id": "https://dar-akeri.se/#website",
        url: "https://dar-akeri.se",
        name: "DAR Åkeri AB",
        inLanguage: ["sv-SE", "en-GB"],
        publisher: { "@id": "https://dar-akeri.se/#business" },
      },

      // ── BreadcrumbList ────────────────────────────
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://dar-akeri.se",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
