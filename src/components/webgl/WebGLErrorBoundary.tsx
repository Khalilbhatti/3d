"use client";

import { Component, type ReactNode } from "react";

/**
 * Catches runtime errors thrown by a mounted Three.js/React-Three-Fiber scene
 * (a driver quirk, a lost WebGL context, an unsupported extension — none of
 * which the pre-flight `canvas.getContext("webgl")` feature-detection used
 * elsewhere in these components can catch, since it only tests support
 * before the real scene ever mounts). React error boundaries must be class
 * components — there's no hooks equivalent, and no `react-error-boundary`
 * dependency is installed, so this is a minimal hand-rolled one.
 */
export class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("WebGL scene failed at runtime, falling back:", error);
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
