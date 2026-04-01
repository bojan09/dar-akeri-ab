"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  as?: "button" | "a";
  href?: string;
}

// ── Variant styles ────────────────────────────────────────
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-orange text-white shadow-cta hover:shadow-cta-hover hover:bg-brand-orange-dark active:scale-[0.97]",
  secondary:
    "bg-white text-brand-navy border-2 border-brand-navy/10 hover:border-brand-navy/30 hover:bg-surface active:scale-[0.97]",
  ghost:
    "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40 backdrop-blur-sm active:scale-[0.97]",
  outline:
    "bg-transparent text-brand-navy border-2 border-brand-navy hover:bg-brand-navy hover:text-white active:scale-[0.97]",
  danger:
    "bg-red-500 text-white hover:bg-red-600 shadow-sm active:scale-[0.97]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-xl gap-1.5",
  md: "px-6 py-3 text-sm rounded-2xl gap-2",
  lg: "px-7 py-3.5 text-base rounded-2xl gap-2",
  xl: "px-9 py-4 text-lg rounded-2xl gap-2.5",
};

// ── Component ─────────────────────────────────────────────
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "lg",
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base
          "inline-flex items-center justify-center font-sans font-semibold",
          "select-none cursor-pointer transition-all duration-200 ease-out-expo",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2",
          // Variant
          variantClasses[variant],
          // Size
          sizeClasses[size],
          // States
          isDisabled && "opacity-60 cursor-not-allowed pointer-events-none",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <svg
            className="animate-spin -ml-1 w-4 h-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}

        {/* Left icon */}
        {!loading && iconLeft && (
          <span className="shrink-0" aria-hidden="true">
            {iconLeft}
          </span>
        )}

        {/* Label */}
        <span>{children}</span>

        {/* Right icon */}
        {iconRight && (
          <span className="shrink-0" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
export type { ButtonProps, ButtonVariant, ButtonSize };
