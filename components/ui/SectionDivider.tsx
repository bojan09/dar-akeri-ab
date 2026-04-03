"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  label?: string;
  variant?: "simple" | "labeled" | "dots";
  className?: string;
}

export default function SectionDivider({
  label,
  variant = "simple",
  className,
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  if (variant === "dots") {
    return (
      <div ref={ref} className={cn("flex items-center justify-center gap-2 py-2", className)}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "rounded-full bg-brand-navy/20",
              i === 1 ? "w-2 h-2" : "w-1.5 h-1.5"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  if (variant === "labeled" && label) {
    return (
      <div ref={ref} className={cn("flex items-center gap-4", className)} aria-hidden="true">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "right" }}
          className="flex-1 h-px bg-gradient-to-l from-brand-navy/15 to-transparent"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="font-display font-bold text-xs uppercase tracking-widest text-text-subtle px-2 shrink-0"
        >
          {label}
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
          className="flex-1 h-px bg-gradient-to-r from-brand-navy/15 to-transparent"
        />
      </div>
    );
  }

  // Simple
  return (
    <div ref={ref} className={cn("overflow-hidden", className)} aria-hidden="true">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
        className="h-px bg-gradient-to-r from-brand-orange/40 via-brand-navy/20 to-transparent"
      />
    </div>
  );
}
