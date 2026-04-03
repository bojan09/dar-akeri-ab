# DAR Åkeri AB — Website

Production-grade logistics company website built with Next.js 14, Tailwind CSS, and Framer Motion.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS only — zero inline styles, zero CSS modules |
| Animations | Framer Motion |
| Forms/Email | @emailjs/browser |
| Fonts | Barlow Condensed (display) + DM Sans (body) |
| Language | TypeScript |
| i18n | Custom EN + SV system via `lib/i18n.ts` |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.local.example .env.local
# Edit .env.local with your EmailJS credentials

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build && npm start
```

Open [http://localhost:3000](http://localhost:3000).

## EmailJS Setup

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Add an Email Service (Gmail, Outlook, SMTP)
3. Create a template — use these variables:
   - `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{company}}`, `{{service}}`, `{{message}}`
4. Copy credentials into `.env.local`

## Project Structure

```
/app
  layout.tsx          Root layout — fonts, metadata, providers
  page.tsx            Home page — all sections composed here
  sitemap.ts          Auto-generated XML sitemap
  robots.ts           Crawl directives
  not-found.tsx       Custom 404 page
  error.tsx           Global error boundary

/components
  /ui
    Button.tsx        5 variants, 4 sizes, loading state
    Badge.tsx         5 variants + pulsing dot
    Container.tsx     Max-width wrapper
    SectionWrapper.tsx  Section spacing + bg variants
    SectionHeader.tsx   Label + title + subtitle block
    SectionDivider.tsx  3 animated divider variants
    LanguageToggle.tsx  Animated pill + text toggle
  /layout
    Navbar.tsx            Responsive nav + mobile drawer
    Footer.tsx            4-column footer
    LocaleProvider.tsx    i18n context + localStorage persistence
    ScrollProgressBar.tsx Spring-smoothed reading indicator
    ScrollToTop.tsx       Floating scroll-to-top button
    StructuredData.tsx    JSON-LD schema (LocalBusiness)
    ErrorBoundary.tsx     Section-level error recovery
    PageTransition.tsx    Route change fade animation
  /sections
    HeroSection.tsx        Full-screen landing + stats bar
    ServicesSection.tsx    6 service cards + CTA banner
    FleetSection.tsx       4 vehicle cards + stats strip
    TestimonialsSection.tsx  Reviews + mobile carousel
    AboutSection.tsx       Timeline panel + copy + features
    ContactSection.tsx     EmailJS form + contact info

/hooks
  useLocale.ts           Language context consumer
  useScrollAnimation.ts  Shared Framer Motion variants

/lib
  i18n.ts    Complete EN + SV translations for all sections
  utils.ts   cn(), scrollToSection(), isValidEmail(), etc.

/public
  site.webmanifest  PWA manifest
```

## Design System

| Token | Value |
|---|---|
| Primary | `#1A1F71` (navy) |
| Accent | `#FF6B35` (orange) |
| Surface | `#F8F9FC` |
| Display font | Barlow Condensed |
| Body font | DM Sans |

Custom component classes live in `app/globals.css` under `@layer components` and `@layer utilities`.

## Language System

- Default: Swedish (`sv`)
- Secondary: English (`en`)
- Toggle: animated pill switcher in Navbar + Footer
- Persistence: `localStorage` with browser-language auto-detection fallback
- Sync: `html[lang]` attribute updated on every change
- Extend: add a new locale to `lib/i18n.ts` → `SUPPORTED_LOCALES` → translation object

## SEO

- Full `<head>` metadata via Next.js Metadata API
- Open Graph + Twitter card tags
- JSON-LD structured data (LocalBusiness, WebSite, BreadcrumbList)
- Auto-generated `sitemap.xml` and `robots.txt`
- `hreflang` alternate links for EN/SV
- Semantic HTML throughout (`<header>`, `<main>`, `<footer>`, `<article>`, `<section>`, `aria-*`)

## Build Phases

1. ✅ Project Setup & Foundation
2. ✅ Core Layout Components
3. ✅ Hero Section
4. ✅ Services Section
5. ✅ Fleet + Testimonials
6. ✅ About Section
7. ✅ Contact System
8. ✅ Animations & Polish
9. ✅ Language System
10. ✅ Final Optimization
