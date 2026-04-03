import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1A1F71",
          "navy-dark": "#12166A",
          "navy-light": "#252B8A",
          orange: "#FF6B35",
          "orange-dark": "#E55A24",
          "orange-light": "#FF8055",
        },
        surface: {
          DEFAULT: "#F8F9FC",
          secondary: "#EEF0F8",
          dark: "#0D1045",
          "dark-secondary": "#161B5E",
        },
        text: {
          muted: "#6B7280",
          subtle: "#9CA3AF",
        },
      },
      fontFamily: {
        display: ["var(--font-barlow-condensed)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.2" }],
      },
      spacing: {
        section: "6rem",
        "section-sm": "4rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(26, 31, 113, 0.08), 0 1px 4px rgba(26, 31, 113, 0.04)",
        "card-hover": "0 12px 40px -8px rgba(26, 31, 113, 0.15), 0 4px 12px rgba(26, 31, 113, 0.06)",
        cta: "0 8px 32px -4px rgba(255, 107, 53, 0.35)",
        "cta-hover": "0 12px 40px -4px rgba(255, 107, 53, 0.5)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #1A1F71 0%, #0D1045 50%, #1A1F71 100%)",
        "section-gradient": "linear-gradient(180deg, #F8F9FC 0%, #EEF0F8 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)",
        "brand-gradient": "linear-gradient(135deg, #1A1F71 0%, #252B8A 100%)",
        "orange-gradient": "linear-gradient(135deg, #FF6B35 0%, #FF8055 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        shimmer: "shimmer 2.2s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "slide-in-right": "slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left": "slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "draw-line": "drawLine 0.6s ease-out forwards",
        "count-up": "countUp 0.4s ease-out forwards",
        "bounce-x": "bounceX 1.4s ease-in-out infinite",
        "wiggle": "wiggle 0.4s ease-in-out",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(0.97)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        drawLine: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        countUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        bounceX: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(5px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      willChange: {
        transform: "transform",
        opacity: "opacity",
        scroll: "scroll-position",
      },
    },
  },
  plugins: [],
};

export default config;
