"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

const HeaderScene = dynamic(() => import("./HeaderScene"), { ssr: false });

/**
 * Gated wrapper for the header dust field. Skips WebGL for reduced-motion, small
 * screens and browsers without WebGL (the page header still reads perfectly on
 * its own). Client-only + code-split so three.js never blocks these routes.
 */
export function HeaderCanvas({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setSupported(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setSupported(false);
    }
  }, []);

  if (reduced || isMobile || !supported) return null;

  return (
    <div className={className} aria-hidden>
      <HeaderScene color={color} />
    </div>
  );
}
