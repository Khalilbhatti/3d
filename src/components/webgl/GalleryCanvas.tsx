"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { type Artwork } from "@/content/types";
import { FloatingGallery, type GalleryLayout } from "./FloatingGallery";

/**
 * <Canvas> host for the floating gallery. Orbit is driven by <OrbitControls>
 * (drag to rotate, momentum via damping, gentle auto-rotate). While a work is
 * focused (`focused >= 0`) the controls freeze so the camera holds perfectly
 * still for the fly-to-fullscreen morph.
 */
export default function GalleryCanvas({
  artworks,
  layout,
  focused,
  onHover,
  onSelect,
}: {
  artworks: Artwork[];
  layout: GalleryLayout;
  focused: number;
  onHover?: (index: number) => void;
  onSelect?: (index: number) => void;
}) {
  const idle = focused < 0;
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 13], fov: 42 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <FloatingGallery
        artworks={artworks}
        layout={layout}
        focused={focused}
        onHover={onHover}
        onSelect={onSelect}
      />
      <OrbitControls
        makeDefault
        enabled={idle}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.5}
        autoRotate={idle}
        autoRotateSpeed={0.45}
        minDistance={13}
        maxDistance={13}
      />
    </Canvas>
  );
}
