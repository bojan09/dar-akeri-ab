import { cn } from "@/lib/utils";

type SectionBg = "white" | "surface" | "navy" | "gradient" | "transparent";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  bg?: SectionBg;
  compact?: boolean;
}

const bgClasses: Record<SectionBg, string> = {
  white: "bg-white",
  surface: "bg-surface",
  navy: "bg-brand-navy",
  gradient: "bg-hero-gradient",
  transparent: "bg-transparent",
};

export default function SectionWrapper({
  children,
  id,
  className,
  bg = "white",
  compact = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        compact ? "py-section-sm" : "py-section-sm lg:py-section",
        bgClasses[bg],
        className
      )}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      {children}
    </section>
  );
}
