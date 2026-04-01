# DAR Åkeri AB — Website

Modern, production-grade logistics company website built with Next.js 14, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (only — no CSS modules, no inline styles)
- **Animations**: Framer Motion
- **UI Components**: ShadCN UI (Radix primitives)
- **Forms**: EmailJS
- **Fonts**: Barlow Condensed (display) + DM Sans (body)
- **Language**: TypeScript

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
/app              → Next.js App Router pages & layout
/components
  /ui             → Reusable base UI components
  /layout         → Navbar, Footer, Section wrappers
  /sections       → Page sections (Hero, Services, Fleet, etc.)
/lib
  i18n.ts         → Translation system (EN + SV)
  utils.ts        → Utility functions
/hooks
  useLocale.ts    → Language state hook
/public           → Static assets
```

## Styling Rules

- **Tailwind CSS ONLY** — no inline styles, no CSS modules
- Custom utilities defined in `/app/globals.css` using `@layer` directives
- Brand colors: Navy `#1A1F71` / Orange `#FF6B35`

## Languages

Supports English (`en`) and Swedish (`sv`). Toggle via the language switcher in the Navbar. Add more locales by extending `/lib/i18n.ts`.

## Build Phases

This project was built in 10 structured phases:

1. ✅ Project Setup & Foundation  
2. ⬜ Core Layout Components  
3. ⬜ Hero Section  
4. ⬜ Services Section  
5. ⬜ Fleet + Testimonials  
6. ⬜ About Section  
7. ⬜ Contact System  
8. ⬜ Animations & Polish  
9. ⬜ Language System  
10. ⬜ Final Optimization  
