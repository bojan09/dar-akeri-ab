import { cn } from "@/lib/utils";

type BadgeVariant = "orange" | "navy" | "white" | "green" | "gray";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  orange: "bg-brand-orange/10 text-brand-orange",
  navy: "bg-brand-navy/10 text-brand-navy",
  white: "bg-white/15 text-white backdrop-blur-sm border border-white/20",
  green: "bg-emerald-50 text-emerald-700",
  gray: "bg-gray-100 text-gray-600",
};

const dotClasses: Record<BadgeVariant, string> = {
  orange: "bg-brand-orange",
  navy: "bg-brand-navy",
  white: "bg-white",
  green: "bg-emerald-500",
  gray: "bg-gray-400",
};

export default function Badge({
  children,
  variant = "navy",
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        "text-xs font-display font-bold uppercase tracking-wider",
        "px-3 py-1.5 rounded-full",
        variantClasses[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full animate-pulse", dotClasses[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
