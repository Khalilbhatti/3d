"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fluidVertex } from "./shaders/fluidVertex";
import { fluidFragment } from "./shaders/fluidFragment";

/**
 * Fluid colours — pulled from the site's existing palette. Adjust these hexes to
 * re-tint the animation; nothing else in the site changes.
 */
const COLORS = {
  base: "#050508", // near-black (dominant)
  teal: "#20D6A3",
  gold: "#D7A928",
  blue: "#255B6A",
  violet: "#6B3BB7",
  brightTeal: "#3BE6C4",
  deepViolet: "#4A278C",
} as const;

/**
 * The shader plane. Tracks the global pointer via a ref (never React state),
 * smoothly interpolates the position, derives a decaying velocity, and feeds it
 * all to the shader uniforms in useFrame. No per-frame state updates.
 */
export function FluidPlane({ intensity = 1 }: { intensity?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

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
      uColor1: { value: new THREE.Color(COLORS.base) },
      uColor2: { value: new THREE.Color(COLORS.teal) },
      uColor3: { value: new THREE.Color(COLORS.gold) },
      uColor4: { value: new THREE.Color(COLORS.blue) },
      uColor5: { value: new THREE.Color(COLORS.violet) },
      uColor6: { value: new THREE.Color(COLORS.brightTeal) },
      uColor7: { value: new THREE.Color(COLORS.deepViolet) },
    }),
    [intensity]
  );

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
