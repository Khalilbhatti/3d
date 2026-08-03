"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeColor } from "@/hooks/useThemeColor";
import { fluidVertex } from "./shaders/fluidVertex";
import { fluidFragment } from "./shaders/fluidFragment";

/**
 * Fluid vein colours — navy + brand orange, matching the logo. The dominant
 * base colour isn't listed here: it tracks the live `--paper` theme token
 * (see `paperRgb` below) so the background itself flips dark navy / light
 * off-white with the rest of the site, instead of staying near-black always.
 */
const COLORS = {
  orange: "#FF9807", // brand orange
  amber: "#FFB347", // warm amber accent
  navy: "#1B3A63", // muted navy
  navyBright: "#2E5C99", // brighter navy-blue
  amberBright: "#FFC157", // bright warm highlight
  navyDeep: "#0B1F3D", // deep navy
} as const;

/**
 * The shader plane. Tracks the global pointer via a ref (never React state),
 * smoothly interpolates the position, derives a decaying velocity, and feeds it
 * all to the shader uniforms in useFrame. No per-frame state updates.
 */
export function FluidPlane({ intensity = 1 }: { intensity?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const paperRgb = useThemeColor("--paper");

  const target = useRef(new THREE.Vector2(0.5, 0.5));
  const smoothed = useRef(new THREE.Vector2(0.5, 0.5));
  const prev = useRef(new THREE.Vector2(0.5, 0.5));
  const velocity = useRef(0);
  const trail = useRef<THREE.Vector2[]>(
    Array.from({ length: 12 }, () => new THREE.Vector2(0.5, 0.5))
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTrail: { value: trail.current },
      uMouseVelocity: { value: 0 },
      uDistortion: { value: 0.16 * intensity },
      uCursorInfluence: { value: 0.85 * intensity },
      uSpeed: { value: 1.0 },
      uColor1: { value: new THREE.Color(...paperRgb) },
      uColor2: { value: new THREE.Color(COLORS.orange) },
      uColor3: { value: new THREE.Color(COLORS.amber) },
      uColor4: { value: new THREE.Color(COLORS.navy) },
      uColor5: { value: new THREE.Color(COLORS.navyBright) },
      uColor6: { value: new THREE.Color(COLORS.amberBright) },
      uColor7: { value: new THREE.Color(COLORS.navyDeep) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- uColor1 (base) is kept in sync imperatively below, not by recreating uniforms on every theme flip
    [intensity]
  );

  // Keep the base colour in sync with the live theme (dark navy / light off-white)
  // without recreating the shader material on every light/dark toggle.
  useEffect(() => {
    mat.current?.uniforms.uColor1.value.setRGB(...paperRgb);
  }, [paperRgb]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: PointerEvent) => {
      target.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m) return;
    const u = m.uniforms;

    const fine = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
    if (!fine) {
      // Autonomous, very slow drift on touch / no-pointer devices.
      const t = state.clock.elapsedTime;
      target.current.set(0.5 + 0.26 * Math.sin(t * 0.13), 0.5 + 0.22 * Math.cos(t * 0.1));
    }

    // Smooth interpolation toward the pointer — responsive head, gentle lag.
    prev.current.copy(smoothed.current);
    smoothed.current.lerp(target.current, 0.1);

    // Advance the trail buffer: newest sample = the pointer; every older sample
    // chases the one ahead, so the cursor path spreads into a fading smoke wake.
    const tr = trail.current;
    for (let i = tr.length - 1; i > 0; i--) tr[i].lerp(tr[i - 1], 0.3);
    tr[0].copy(smoothed.current);

    // Decaying pointer velocity → a small, temporary extra turbulence.
    const moved = smoothed.current.distanceTo(prev.current);
    velocity.current = Math.min(1, velocity.current * 0.9 + moved * 3.6);

    u.uTime.value += Math.min(delta, 0.05);
    u.uResolution.value.set(size.width, size.height);
    (u.uMouse.value as THREE.Vector2).copy(smoothed.current);
    u.uMouseVelocity.value = velocity.current;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={fluidVertex}
        fragmentShader={fluidFragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}
