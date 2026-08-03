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

/** React — real brand mark (Simple Icons, CC0); explicitly named in the site's own web/app copy. */
function IconReact({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
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

/** WordPress — real brand mark (Simple Icons, CC0); this service is literally named after it. */
function IconWordPress({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0" />
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
  "web-app-development": IconReact,
  "digital-marketing": IconTrendingUp,
  "wordpress-development": IconWordPress,
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
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 bg-paper/85 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                  style={{
                    borderColor: `${c.palette.from}99`,
                    boxShadow: `0 0 26px ${c.palette.from}66, 0 0 4px ${c.palette.from}55 inset`,
                  }}
                >
                  <Icon className="h-7 w-7" />
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
          <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-accent/70 bg-paper shadow-xl shadow-accent/30">
            <LogoAnimation fit="contain" className="h-20 w-20" />
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
