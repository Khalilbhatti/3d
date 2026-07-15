"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

// One WebGL canvas, client-only + code-split so three never blocks SSR/hydration.
const FluidScene = dynamic(() => import("./FluidScene"), { ssr: false });

/**
 * The single global cursor-responsive fluid background. Fixed, full-viewport,
 * pointer-events:none, behind all content (see `.global-fluid-background` in
 * globals.css). Renders one WebGL canvas on capable devices and falls back to a
 * static CSS gradient (WebGL failure, reduced-motion, no support, load delay).
 * Pauses rendering when the tab is hidden; lighter DPR + intensity on mobile.
 */
export function GlobalFluidBackground() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [supported, setSupported] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setSupported(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const enabled = supported && !reduced;

  return (
    <div className="global-fluid-background fluid-fallback" aria-hidden>
      {enabled ? (
        <FluidScene
          frameloop={pageVisible ? "always" : "never"}
          dpr={isMobile ? [1, 1.25] : [1, 1.5]}
          intensity={isMobile ? 0.7 : 1}
        />
      ) : null}
    </div>
  );
}
