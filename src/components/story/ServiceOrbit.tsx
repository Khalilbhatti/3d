"use client";

import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMemo, useRef, useState, type ComponentType } from "react";
import * as THREE from "three";
import type { Collection } from "@/content/types";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { LogoAnimation } from "@/components/media/LogoAnimation";
import { cn } from "@/lib/utils";

type IconProps = { className?: string };

function IconCode({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconTrendingUp({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function IconLayout({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

function IconZap({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconPen({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function IconLayers({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

const ICONS: Record<string, ComponentType<IconProps>> = {
  "web-app-development": IconCode,
  "digital-marketing": IconTrendingUp,
  "wordpress-development": IconLayout,
  "gohighlevel-crm": IconZap,
  "graphic-designing": IconPen,
  "ui-ux-designing": IconLayers,
};

const RADIUS = 3.2;
const SPEED = 0.18; // radians / second

/** Six service chips revolving around the centre on a flat ring in 3D space. */
function OrbitRing({ collections, paused }: { collections: Collection[]; paused: boolean }) {
  const anchors = useRef<(THREE.Group | null)[]>([]);
  const angle = useRef(0);

  useFrame((_, delta) => {
    if (!paused) angle.current += delta * SPEED;
    const step = (Math.PI * 2) / collections.length;
    collections.forEach((_, i) => {
      const g = anchors.current[i];
      if (!g) return;
      const a = angle.current + i * step;
      g.position.set(Math.cos(a) * RADIUS, 0, Math.sin(a) * RADIUS);
    });
  });

  return (
    <>
      {collections.map((c, i) => {
        const Icon = ICONS[c.slug] ?? IconLayers;
        return (
          <group key={c.id} ref={(el) => { anchors.current[i] = el; }}>
            <Html center distanceFactor={9} zIndexRange={[60, 0]} style={{ pointerEvents: "auto" }}>
              <Link
                href={`/services/${c.slug}`}
                className="group flex flex-col items-center gap-2"
                style={{ color: c.palette.from }}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-current/40 bg-paper/80 shadow-lg shadow-ink/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-label text-ink/70 transition-colors group-hover:text-ink">
                  {c.title}
                </span>
              </Link>
            </Html>
          </group>
        );
      })}
    </>
  );
}

/** Thin flat ring outline marking the orbit path, plus the animated logo hub. */
function OrbitGuide() {
  const inkRgb = useThemeColor("--ink");
  const ringColor = useMemo(() => new THREE.Color(...inkRgb), [inkRgb]);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[RADIUS - 0.012, RADIUS + 0.012, 96]} />
        <meshBasicMaterial color={ringColor} transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
      <Html center distanceFactor={9} zIndexRange={[70, 0]}>
        <div className="relative flex h-36 w-36 items-center justify-center">
          <div className="absolute inset-0 animate-pulse rounded-full bg-accent/30 blur-2xl" />
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-accent/70 shadow-xl shadow-accent/30">
            <LogoAnimation />
          </div>
        </div>
      </Html>
    </>
  );
}

/**
 * WebGL centrepiece of the services chapter: the six disciplines revolve
 * around a glowing hub on a flat orbital ring, each rendered as a real,
 * clickable chip via drei's <Html> so it always stays upright and readable.
 * Falls back to a static list for reduced motion, mobile, and no-JS.
 */
export function ServiceOrbit({ collections }: { collections: Collection[] }) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [paused, setPaused] = useState(false);

  if (reduced || isMobile) {
    return (
      <div className="mt-16 grid gap-x-12 gap-y-2 border-t border-ink/15 sm:grid-cols-2">
        {collections.map((c, i) => {
          const Icon = ICONS[c.slug] ?? IconLayers;
          return (
            <Link key={c.id} href={`/services/${c.slug}`} className="group flex items-center gap-4 border-b border-ink/12 py-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors group-hover:border-accent group-hover:text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className="font-mono text-xs text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl leading-tight text-ink transition-colors group-hover:text-accent">
                  {c.title}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn("relative mt-16 h-[440px] w-full border-t border-ink/15 sm:h-[500px]")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Canvas
        camera={{ position: [0, 3.7, 7.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <OrbitGuide />
        <OrbitRing collections={collections} paused={paused} />
      </Canvas>
    </div>
  );
}
