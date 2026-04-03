"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[ErrorBoundary: ${this.props.sectionName ?? "unknown"}]`, error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          className="py-16 flex flex-col items-center justify-center gap-4 text-center px-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-navy/6 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-brand-navy/40" aria-hidden="true" />
          </div>
          <div>
            <p className="font-display font-bold text-brand-navy/60 text-sm">
              Something went wrong loading this section.
            </p>
            <p className="font-sans text-xs text-text-subtle mt-1">
              Please refresh the page to try again.
            </p>
          </div>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors duration-200"
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
