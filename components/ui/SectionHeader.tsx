import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean; // for dark backgrounds
  className?: string;
  id?: string;
}

export default function SectionHeader({
  label,
  title,
  titleAccent,
  subtitle,
  centered = false,
  light = false,
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className
      )}
    >
      {label && (
        <span
          className={cn(
            "section-label",
            light && "text-brand-orange"
          )}
          aria-hidden="true"
        >
          {label}
        </span>
      )}

      <h2
        id={id}
        className={cn(
          "text-display-md font-display font-black leading-tight",
          light ? "text-white" : "text-brand-navy",
          centered && "max-w-3xl"
        )}
      >
        {title}{" "}
        {titleAccent && (
          <span className="text-brand-orange">{titleAccent}</span>
        )}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-lg leading-relaxed font-sans",
            light ? "text-white/70" : "text-text-muted",
            centered ? "max-w-2xl" : "max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
