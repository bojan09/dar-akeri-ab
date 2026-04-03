import type { Metadata } from "next";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found — DAR Åkeri AB",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <span
            className="font-display font-black text-white/5 select-none pointer-events-none"
            style={{ fontSize: "clamp(8rem, 20vw, 14rem)", lineHeight: 1 }}
            aria-hidden="true"
          >
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-orange flex items-center justify-center shadow-cta">
              <Home className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
          </div>
        </div>

        <h1 className="font-display font-black text-3xl text-white mb-3">
          Page Not Found
        </h1>
        <p className="font-sans text-white/60 text-sm leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 btn-primary"
          aria-label="Go back to homepage"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
