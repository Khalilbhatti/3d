"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { type ArtPalette } from "@/content/types";

const vertex = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAmp;
  void main() {
    vUv = uv;
    vec3 p = position;
    float w = sin(p.x * 2.4 + uTime * 0.25) * cos(p.y * 1.8 - uTime * 0.18);
    p.z += w * uAmp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  varying vec2 vUv;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uInk;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    vec2 uv = vUv;
    float g = uv.y + (noise(uv * 3.0 + uTime * 0.04) - 0.5) * 0.18;
    vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 0.62, g));
    col = mix(col, uColorC, smoothstep(0.5, 1.0, g));

    // drifting horizon of light, nudged by the pointer
    float centre = 0.42 + 0.08 * sin(uTime * 0.18 + uMouse.x * 1.2);
    float band = smoothstep(0.0, 0.34, 0.34 - abs(uv.y - centre));
    col += band * 0.07;

    // fine film grain
    float n = noise(uv * 240.0);
    col += (n - 0.5) * 0.05;

    // ink vignette for depth
    float d = distance(uv, vec2(0.5 + uMouse.x * 0.04, 0.42 + uMouse.y * 0.04));
    col -= smoothstep(0.42, 0.98, d) * uInk;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function toColor(hex: string) {
  return new THREE.Color(hex.length > 7 ? hex.slice(0, 7) : hex);
}

function Plane({ palette }: { palette: ArtPalette }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.12 },
      uInk: { value: palette.ink ?? 0.1 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: toColor(palette.from) },
      uColorB: { value: toColor(palette.via ?? palette.to) },
      uColorC: { value: toColor(palette.to) },
    }),
    [palette]
  );

  useFrame((state, delta) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value += delta;
    const px = (state.pointer.x || 0) * 0.5;
    const py = (state.pointer.y || 0) * 0.5;
    mouse.current.x += (px - mouse.current.x) * 0.04;
    mouse.current.y += (py - mouse.current.y) * 0.04;
    mat.current.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 48, 48]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/**
 * Fullscreen procedural "layered image plane" scene — a self-contained WebGL
 * surface (no textures to load), pointer-reactive, mounted only while on screen.
 */
export default function HeroScene({ palette }: { palette: ArtPalette }) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [0, 0, 1.4], fov: 50 }}
      style={{ position: "absolute" }}
    >
      <Plane palette={palette} />
    </Canvas>
  );
}
