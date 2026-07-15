"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Dust({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const N = 520;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame((state, delta) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y += delta * 0.045;
    const tx = (state.pointer.x || 0) * 0.18;
    const ty = (state.pointer.y || 0) * 0.12;
    p.position.x += (tx - p.position.x) * 0.03;
    p.rotation.x += (ty - p.rotation.x) * 0.03;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

/** Ambient drifting dust field for interior page headers (transparent canvas). */
export default function HeaderScene({ color = "#A6431E" }: { color?: string }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Dust color={color} />
    </Canvas>
  );
}
