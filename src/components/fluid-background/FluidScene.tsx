"use client";

import { Canvas } from "@react-three/fiber";
import { FluidSimulation } from "./FluidSimulation";

/** The single WebGL canvas hosting the real-time fluid simulation. */
export default function FluidScene({
  frameloop = "always",
  dpr,
  intensity = 1,
}: {
  frameloop?: "always" | "never" | "demand";
  dpr?: [number, number];
  intensity?: number;
}) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={dpr ?? [1, 1.5]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance", preserveDrawingBuffer: false }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <FluidSimulation intensity={intensity} />
    </Canvas>
  );
}
