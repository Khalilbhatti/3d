"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/** One textured plane that tilts toward the pointer and idles with a slow bob. */
function TiltedPlane({
  src,
  position,
  size,
}: {
  src: string;
  position: [number, number, number];
  size: [number, number];
}) {
  const texture = useTexture(src);
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const targetX = state.pointer.x * 0.18;
    const targetY = state.pointer.y * -0.12;
    m.rotation.y += (targetX - m.rotation.y) * 0.04;
    m.rotation.x += (targetY - m.rotation.x) * 0.04;
    m.position.y = position[1] + Math.sin(t * 0.6) * 0.08;
  });

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={texture} toneMapped={false} transparent />
    </mesh>
  );
}

/**
 * Bespoke single-project hero: 1–2 layered planes of the real Thornton
 * screenshots, tilting toward the pointer with a slow idle float. Deliberately
 * simpler than the homepage's multi-card `FloatingGallery` (that component is
 * shaped for orbiting many artworks, not showcasing one hero image).
 */
export function CaseStudyHero3D({ images }: { images: string[] }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 35 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <TiltedPlane src={images[0]} position={[0, 0, 0]} size={[3.2, 2.4]} />
        {images[1] ? <TiltedPlane src={images[1]} position={[1.7, -0.5, 0.7]} size={[1.47, 1.1]} /> : null}
      </Suspense>
    </Canvas>
  );
}
