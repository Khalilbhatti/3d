"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";

const HeaderScene = dynamic(() => import("./HeaderScene"), { ssr: false });

/**
 * Gated wrapper for the header dust field. Skips WebGL for reduced-motion, small
 * screens and browsers without WebGL (the page header still reads perfectly on
 * its own). Client-only + code-split so three.js never blocks these routes.
 *
 * Decided once on mount and never re-evaluated — this used to gate directly
 * on live `reduced`/`isMobile` hook values (`if (reduced || isMobile ||
 * !supported) return null`), so resizing the window across the mobile
 * breakpoint unmounted a live R3F canvas mid-session and crashed React's
 * reconciler with a removeChild/insertBefore "not a child of this node"
 * error (the same class of bug found and fixed elsewhere in this codebase
 * via gstack:browse, e.g. FloatingGalleryHero, ChapterStack). Nothing here
 * needs to live-swap mid-session, so this only ever resolves once.
 */
export function HeaderCanvas({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let supported = false;
    try {
      const c = document.createElement("canvas");
      supported = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      supported = false;
    }
    const reducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileNow = window.matchMedia("(max-width: 767px)").matches;
    setEnabled(supported && !reducedNow && !mobileNow);
  }, []);

  if (!enabled) return null;

  return (
    <div className={className} aria-hidden>
      <WebGLErrorBoundary fallback={null}>
        <HeaderScene color={color} />
      </WebGLErrorBoundary>
    </div>
  );
}
