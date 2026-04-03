import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, DM_Sans, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import LocaleProvider from "@/components/layout/LocaleProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { MotionConfig } from "framer-motion";
import StructuredData from "@/components/layout/StructuredData";

// ── Fonts ──────────────────────────────────────────────────
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-barlow-condensed",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

// ── Metadata ───────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://dar-akeri.se"),
  title: {
    default: "DAR Åkeri AB — Professional Logistics & Transport Sweden",
    template: "%s | DAR Åkeri AB",
  },
  description:
    "DAR Åkeri AB delivers reliable, on-time freight and logistics solutions across Sweden and Europe. Trusted transport partner for businesses of all sizes.",
  keywords: [
    "logistics Sweden",
    "transport company Sweden",
    "åkeri",
    "freight Sweden",
    "DAR Åkeri",
    "spedition",
    "lastbilstransport",
    "godstransport",
  ],
  authors: [{ name: "DAR Åkeri AB" }],
  creator: "DAR Åkeri AB",
  publisher: "DAR Åkeri AB",
  openGraph: {
    type: "website",
    locale: "sv_SE",
    alternateLocale: "en_GB",
    url: "https://dar-akeri.se",
    siteName: "DAR Åkeri AB",
    title: "DAR Åkeri AB — Professional Logistics & Transport Sweden",
    description:
      "Reliable, on-time freight and logistics solutions across Sweden and Europe.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DAR Åkeri AB — Logistics & Transport",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAR Åkeri AB — Professional Logistics & Transport",
    description:
      "Reliable freight and logistics solutions across Sweden and Europe.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#1A1F71" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#1A1F71",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ── Root Layout ────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${barlowCondensed.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <StructuredData />
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] btn-primary"
        >
          Skip to main content
        </a>

        <MotionConfig reducedMotion="user">
        <LocaleProvider>
          <ScrollProgressBar />
          <ScrollToTop />
          <Navbar />
          <main id="main-content" className="flex flex-col flex-1" role="main">
            {children}
          </main>
          <Footer />
        </LocaleProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
