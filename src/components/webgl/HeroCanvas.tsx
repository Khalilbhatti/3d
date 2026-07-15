"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { type ArtPalette } from "@/content/types";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { gradientFrom } from "@/lib/utils";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * Decides whether the immersive WebGL scene is appropriate, and always provides
 * a matching static gradient fallback. WebGL is skipped for reduced-motion,
 * small screens, and browsers without WebGL. The scene is unmounted while the
 * hero is scrolled out of view to free the GPU.
 */
export function HeroCanvas({
  palette,
  className,
}: {
  palette: ArtPalette;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(false);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setSupported(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setOnScreen(e.isIntersecting),
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const useWebGL = supported && !reduced && !isMobile && onScreen;

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <div
        className="absolute inset-0"
        style={{ backgroundImage: gradientFrom(palette, 155) }}
      />
      {useWebGL ? <HeroScene palette={palette} /> : null}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_38%,transparent_55%,rgba(20,16,12,0.28)_100%)]" />
    </div>
  );
}
