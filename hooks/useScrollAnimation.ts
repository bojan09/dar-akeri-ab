"use client";

import { useRef } from "react";
import { useInView, Variants, type UseInViewOptions } from "framer-motion";

// ── Shared easing curves ───────────────────────────────────
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.87, 0, 0.13, 1] as const;
export const EASE_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 24,
} as const;

// ── Reusable variant factories ────────────────────────────
export const fadeUpVariants = (delay = 0, distance = 28): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: EASE_OUT_EXPO },
  },
});

export const fadeInVariants = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  },
});

export const fadeLeftVariants = (delay = 0, distance = 32): Variants => ({
  hidden: { opacity: 0, x: -distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: EASE_OUT_EXPO },
  },
});

export const fadeRightVariants = (delay = 0, distance = 32): Variants => ({
  hidden: { opacity: 0, x: distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: EASE_OUT_EXPO },
  },
});

export const scaleInVariants = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, delay, ease: EASE_OUT_EXPO },
  },
});

export const staggerContainerVariants = (staggerDelay = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay },
  },
});

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

// ── Hook ──────────────────────────────────────────────────
interface UseScrollAnimationOptions {
  once?: boolean;
  margin?: UseInViewOptions["margin"];
  amount?: number | "some" | "all";
}

export function useScrollAnimation({
  once = true,
  margin = "-72px",
  amount,
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin, amount });

  return { ref, isInView };
}

// ── Orchestrated sequence helper ──────────────────────────
// Use when you want multiple elements to appear in a timed cascade
export function buildSequence(
  items: number,
  baseDelay = 0,
  step = 0.08,
): number[] {
  return Array.from({ length: items }, (_, i) => baseDelay + i * step);
}
