"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { type Artwork } from "@/content/types";
import { makeArtTexture, planeSize } from "@/lib/textures";
import { gsap } from "@/lib/gsap";
import { useThemeColor } from "@/hooks/useThemeColor";

export type GalleryLayout = "cylinder" | "sphere";

const FORWARD = new THREE.Vector3(0, 0, 1);
const BG_CANVAS_W = 640;
const BG_CANVAS_H = 360;
const BG_SLIDE_HOLD = 2.8; // seconds each slide holds before advancing

// Reused scratch objects (avoid per-frame allocations).
const _pos = new THREE.Vector3();
const _quat = new THREE.Quaternion();
const _lookHelper = new THREE.Object3D();
const _lookQuat = new THREE.Quaternion();
const _camWorldPos = new THREE.Vector3();
// How strongly idle cards billboard toward the camera vs. facing straight out
// from the sphere's center. Real photography (straight lines, circles, text)
// reads as visibly foreshortened at the sphere's natural outward-facing angle
// in a way the original generated-art placeholders never showed; partial
// billboarding keeps the orbit's visual variety while keeping photos legible.
const BILLBOARD_STRENGTH = 0.45;

type BackdropSource = HTMLImageElement | HTMLCanvasElement;

function isSourceReady(src: BackdropSource): boolean {
  return src instanceof HTMLImageElement ? src.complete && src.naturalWidth > 0 : true;
}

function sourceSize(src: BackdropSource): [number, number] {
  return src instanceof HTMLImageElement ? [src.naturalWidth, src.naturalHeight] : [src.width, src.height];
}

interface Transform {
  pos: THREE.Vector3;
  quat: THREE.Quaternion;
  scale: number;
}

function computeTargets(
  count: number,
  layout: GalleryLayout,
  posOut: THREE.Vector3[],
  quatOut: THREE.Quaternion[]
) {
  // Squashes only the X axis of both layouts, keeping the full vertical
  // spread and depth (Z) — pulls cards in from the left/right screen edges
  // toward a narrower, more centered column instead of shrinking the whole
  // composition (which a uniform radius cut would do).
  const X_SPREAD = 0.68;

  if (layout === "sphere") {
    const r = 6.4;
    const golden = Math.PI * (1 + Math.sqrt(5));
    // setFromUnitVectors only constrains which way a card faces (its forward
    // axis) — it leaves roll (rotation around that axis) undefined, so three.js
    // picks whatever minimal rotation it lands on. On a sphere that means some
    // cards, depending purely on where the golden-angle spiral places them,
    // land rolled ~180° and render upside-down. lookAt anchors roll to a
    // consistent world-up reference instead, so every card stays right-side-up
    // regardless of its position.
    const helper = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const y = 1 - (i + 0.5) / count * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      posOut[i].set(Math.cos(theta) * rad * r * X_SPREAD, y * r, Math.sin(theta) * rad * r);
      helper.position.copy(posOut[i]);
      helper.lookAt(0, 0, 0);
      quatOut[i].copy(helper.quaternion);
    }
  } else {
    const rows = count > 8 ? 3 : 2;
    const perRow = Math.ceil(count / rows);
    const R = 6.6;
    const gapY = 3.1;
    for (let i = 0; i < count; i++) {
      const row = i % rows;
      const col = Math.floor(i / rows);
      const ang = (col / perRow) * Math.PI * 2 + row * 0.5;
      const x = Math.sin(ang) * R * X_SPREAD;
      const z = Math.cos(ang) * R;
      posOut[i].set(x, (row - (rows - 1) / 2) * gapY, z);
      quatOut[i].setFromUnitVectors(FORWARD, new THREE.Vector3(x, 0, z).normalize());
    }
  }
}

/**
 * The floating gallery. Planes are arranged on a sphere / cylinder, morph between
 * the two, bob, and lean toward the cursor (parallax) on top of drag-orbit.
 *
 * Clicking a plane runs a single, continuous, GSAP-eased morph: the chosen plane
 * flies from its orbit position to fill the viewport facing the (frozen) camera,
 * while every other plane scales away and the background dims to near-black — the
 * Pahari-style "card opens" animation. A `progress` value tweened by GSAP drives
 * everything, so it is perfectly smooth and framerate-independent. Closing (or
 * next/prev) reverses / re-runs it.
 */
export function FloatingGallery({
  artworks,
  layout,
  focused,
  onHover,
  onSelect,
}: {
  artworks: Artwork[];
  layout: GalleryLayout;
  /** -1 = gallery; >=0 = that index is opened fullscreen. Controlled by parent. */
  focused: number;
  onHover?: (index: number) => void;
  onSelect?: (index: number) => void;
}) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  const root = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(-1);
  const { scene, camera, size } = useThree();

  // Scene backdrop tracks the live theme instead of a hardcoded dark colour,
  // so the light/dark toggle doesn't leave this canvas looking broken.
  const paperRgb = useThemeColor("--paper");
  const paperDeepRgb = useThemeColor("--paper-deep");
  const baseBg = useMemo(() => new THREE.Color(...paperRgb), [paperRgb]);
  const focusBg = useMemo(() => new THREE.Color(...paperDeepRgb), [paperDeepRgb]);
  const frameBg = useMemo(() => new THREE.Color(...paperDeepRgb), [paperDeepRgb]);

  const count = artworks.length;
  const textures = useMemo(
    () =>
      artworks.map((a) => {
        // Real project imagery: start with a solid palette tile (no black flash),
        // then swap in the loaded photo. Falls back to the generated art otherwise.
        if (a.image) {
          const [pw, ph] = planeSize(a.orientation);
          const planeAspect = pw / ph;
          // Source screenshots run up to several MB at 2000px+ wide; these
          // planes only ever render at a few hundred screen pixels. Loading
          // the raw file as a WebGL texture was costing ~100MB+ of GPU memory
          // and real per-frame sampling bandwidth across a dozen-plus cards —
          // routing through Next's existing image-optimization endpoint (the
          // same one <Image> already uses everywhere else on the site) cuts
          // that by roughly two orders of magnitude with no visible quality
          // loss at this display size.
          const optimizedSrc = `/_next/image?url=${encodeURIComponent(a.image)}&w=750&q=75`;
          const tex = new THREE.TextureLoader().load(optimizedSrc, (loaded) => {
            const src = loaded.image as HTMLImageElement;
            // Emulate CSS object-fit: cover via UV crop, so a real photo isn't
            // stretched to the plane's (orientation-derived) aspect ratio.
            const imgAspect = src.width / src.height;
            if (imgAspect > planeAspect) {
              const s = planeAspect / imgAspect;
              loaded.repeat.set(s, 1);
              loaded.offset.set((1 - s) / 2, 0);
            } else {
              const s = imgAspect / planeAspect;
              loaded.repeat.set(1, s);
              loaded.offset.set(0, (1 - s) / 2);
            }
            loaded.needsUpdate = true;
          });
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.generateMipmaps = false;
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          return tex;
        }
        return makeArtTexture(a.seed, a.palette, a.medium.toLowerCase().includes("vellum") ? "manuscript" : "field");
      }),
    [artworks]
  );
  // What each hovered card shows as the full-bleed hero backdrop: the project's
  // own extra images when it has any (cycled as a slider), otherwise its single
  // card image — every project always has *something* to show, never a blank
  // hover. Loaded from `a.image`/`a.images` directly rather than reused from
  // `textures[i].image`: THREE.TextureLoader populates that property
  // asynchronously once the network fetch completes, so reading it inside this
  // memo (which runs synchronously, before any image has loaded) always saw
  // `undefined` for cards without an explicit `images` array — and since this
  // memo's dependency is the `textures` array reference, which three.js never
  // replaces when it mutates `.image` in place, it never recomputed. Every
  // artwork relying on this fallback (all 9 n8n cards) was permanently
  // stuck with no hover backdrop at all.
  const backdropSources = useMemo(
    () =>
      artworks.map((a): BackdropSource[] => {
        const list = a.images && a.images.length ? a.images : a.image ? [a.image] : [];
        return list.map((src) => {
          const img = new window.Image();
          img.src = src;
          return img;
        });
      }),
    [artworks]
  );

  const sizes = useMemo(() => artworks.map((a) => planeSize(a.orientation)), [artworks]);
  const phases = useMemo(() => artworks.map((_, i) => (i * 1.61803) % (Math.PI * 2)), [artworks]);

  const displayedPos = useMemo(() => artworks.map(() => new THREE.Vector3()), [artworks]);
  const displayedQuat = useMemo(() => artworks.map(() => new THREE.Quaternion()), [artworks]);
  const scales = useRef<number[]>(artworks.map(() => 1));
  const targetPos = useMemo(() => artworks.map(() => new THREE.Vector3()), [artworks]);
  const targetQuat = useMemo(() => artworks.map(() => new THREE.Quaternion()), [artworks]);
  const inited = useRef(false);
  const bgTarget = useRef(new THREE.Color());
  const displayedBg = useRef(baseBg.clone());

  // Hover backdrop: a small canvas, redrawn each frame, used as `scene.background`
  // for its whole lifetime — the flat colour wash and the cross-faded photo are
  // both just paint on the same canvas, so there is never a Color↔Texture pop.
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgTextureRef = useRef<THREE.CanvasTexture | null>(null);
  if (!bgCanvasRef.current) {
    const c = document.createElement("canvas");
    c.width = BG_CANVAS_W;
    c.height = BG_CANVAS_H;
    bgCanvasRef.current = c;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    bgTextureRef.current = tex;
  }
  const bgImageFade = useRef(0);
  const lastHovered = useRef(-1);
  const bgSlideIndex = useRef(0);
  const bgSlideElapsed = useRef(0);
  const lastBgDrawSignature = useRef("");

  // Focus morph state.
  const progress = useRef({ v: 0 });
  const activeFocus = useRef(-1);
  const from = useRef<Transform | null>(null);
  const to = useRef<Transform | null>(null);
  const tween = useRef<ReturnType<typeof gsap.to> | null>(null);

  useEffect(() => {
    computeTargets(count, layout, targetPos, targetQuat);
    if (!inited.current) {
      for (let i = 0; i < count; i++) {
        displayedPos[i].copy(targetPos[i]);
        displayedQuat[i].copy(targetQuat[i]);
      }
      inited.current = true;
    }
  }, [layout, count, targetPos, targetQuat, displayedPos, displayedQuat]);

  useEffect(() => {
    const list = textures;
    return () => list.forEach((t) => t.dispose());
  }, [textures]);

  useEffect(() => {
    return () => bgTextureRef.current?.dispose();
  }, []);

  const setOnTop = (i: number, on: boolean) => {
    const g = groups.current[i];
    const img = g?.children[1] as THREE.Mesh | undefined;
    if (!img) return;
    img.renderOrder = on ? 999 : 0;
    (img.material as THREE.Material).depthTest = !on;
  };

  // Drive the open / close / swap morph whenever `focused` changes.
  useEffect(() => {
    const prev = activeFocus.current;

    if (focused >= 0) {
      const g = groups.current[focused];
      if (!g || !root.current) return;

      // Fullscreen world transform, computed from the (now frozen) camera.
      const cam = camera as THREE.PerspectiveCamera;
      cam.updateMatrixWorld();
      const dir = new THREE.Vector3();
      cam.getWorldDirection(dir);
      const D = 5;
      const [pw, ph] = sizes[focused];
      const vFOV = (cam.fov * Math.PI) / 180;
      const fullH = 2 * Math.tan(vFOV / 2) * D;
      const fullW = fullH * (size.width / size.height);
      const fillScale = Math.min((0.86 * fullH) / ph, (0.92 * fullW) / pw);

      const worldPos = cam.position.clone().add(dir.multiplyScalar(D));
      const worldQuat = cam.quaternion.clone();

      // Convert to the root group's local space (root may be parallax-rotated).
      root.current.updateWorldMatrix(true, false);
      const invMatrix = root.current.matrixWorld.clone().invert();
      const localPos = worldPos.clone().applyMatrix4(invMatrix);
      const localQuat = root.current
        .getWorldQuaternion(new THREE.Quaternion())
        .invert()
        .multiply(worldQuat);

      to.current = { pos: localPos, quat: localQuat, scale: fillScale };

      const swapping = prev >= 0 && prev !== focused;
      if (swapping) setOnTop(prev, false);
      activeFocus.current = focused;
      setOnTop(focused, true);

      if (swapping) {
        // Grow the new work in place (quick cross-scale).
        from.current = { pos: localPos.clone(), quat: localQuat.clone(), scale: fillScale * 0.7 };
        progress.current.v = 0;
        tween.current?.kill();
        tween.current = gsap.to(progress.current, { v: 1, duration: 0.5, ease: "power2.out" });
      } else {
        // Fly from the plane's current orbit position.
        from.current = { pos: g.position.clone(), quat: g.quaternion.clone(), scale: g.scale.x };
        progress.current.v = 0;
        tween.current?.kill();
        tween.current = gsap.to(progress.current, { v: 1, duration: 0.95, ease: "power3.inOut" });
      }
    } else if (prev >= 0) {
      // Close — reverse back to the gallery, then release.
      tween.current?.kill();
      tween.current = gsap.to(progress.current, {
        v: 0,
        duration: 0.75,
        ease: "power3.inOut",
        onComplete: () => {
          setOnTop(prev, false);
          activeFocus.current = -1;
          from.current = null;
          to.current = null;
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  useEffect(() => {
    return () => {
      tween.current?.kill();
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = progress.current.v;
    const af = activeFocus.current;
    const focusing = af >= 0;

    if (root.current && !focusing) {
      const px = state.pointer.x || 0;
      const py = state.pointer.y || 0;
      root.current.rotation.y += (px * 0.42 - root.current.rotation.y) * 0.045;
      root.current.rotation.x += (-py * 0.26 - root.current.rotation.x) * 0.045;
    }

    for (let i = 0; i < count; i++) {
      const g = groups.current[i];
      if (!g) continue;
      const frame = g.children[0] as THREE.Mesh;

      if (focusing && i === af && from.current && to.current) {
        _pos.copy(from.current.pos).lerp(to.current.pos, p);
        g.position.copy(_pos);
        _quat.copy(from.current.quat).slerp(to.current.quat, p);
        g.quaternion.copy(_quat);
        g.scale.setScalar(THREE.MathUtils.lerp(from.current.scale, to.current.scale, p));
        // Retract the mat/frame border as it fills the screen.
        frame.scale.setScalar(Math.max(0.0001, 1 - p));
      } else {
        displayedPos[i].lerp(targetPos[i], 0.06);
        displayedQuat[i].slerp(targetQuat[i], 0.07);
        g.position.copy(displayedPos[i]);
        if (!focusing) {
          g.position.y += Math.sin(t * 0.5 + phases[i]) * 0.1;
          g.position.x += Math.cos(t * 0.35 + phases[i]) * 0.05;
        }
        g.quaternion.copy(displayedQuat[i]);
        if (!focusing && root.current) {
          // Partial billboard toward the camera's actual current position
          // (which itself orbits via OrbitControls), softening perspective
          // foreshortening on real photography without fully flattening the
          // sphere's tilt variety. g.position is in root's local space, so
          // the camera's world position must be converted into that same
          // space before comparing — root itself is rotated for parallax.
          camera.getWorldPosition(_camWorldPos);
          root.current.worldToLocal(_camWorldPos);
          _lookHelper.position.copy(g.position);
          _lookHelper.lookAt(_camWorldPos);
          _lookQuat.copy(_lookHelper.quaternion);
          g.quaternion.slerp(_lookQuat, BILLBOARD_STRENGTH);
        }
        const want = focusing ? 1 : hovered === i ? 1.16 : 1;
        scales.current[i] += (want - scales.current[i]) * 0.12;
        // Others shrink away while a work is focused (no transparency needed).
        const factor = focusing ? Math.max(0, 1 - p * 1.5) : 1;
        g.scale.setScalar(scales.current[i] * factor);
        frame.scale.setScalar(1);
      }
    }

    if (scene.background !== bgTextureRef.current) scene.background = bgTextureRef.current;
    if (!scene.fog) scene.fog = new THREE.Fog(baseBg.getHex(), 13, 30);
    if (focusing) {
      bgTarget.current.copy(baseBg).lerp(focusBg, p);
    } else {
      bgTarget.current.copy(baseBg);
      if (hovered >= 0) {
        bgTarget.current.lerp(
          new THREE.Color(artworks[hovered].palette.via ?? artworks[hovered].palette.from),
          0.14
        );
      }
    }
    displayedBg.current.lerp(bgTarget.current, 0.08);
    (scene.fog as THREE.Fog).color.copy(displayedBg.current);

    // Hover backdrop: which card's images to show, and slider bookkeeping.
    if (hovered !== lastHovered.current) {
      lastHovered.current = hovered;
      bgSlideIndex.current = 0;
      bgSlideElapsed.current = 0;
      bgImageFade.current *= 0.3; // brief dip so switching cards reads as a crossfade
    }
    const sources = !focusing && hovered >= 0 ? backdropSources[hovered] : null;
    if (sources && sources.length > 1) {
      bgSlideElapsed.current += delta;
      if (bgSlideElapsed.current > BG_SLIDE_HOLD) {
        bgSlideElapsed.current = 0;
        bgSlideIndex.current = (bgSlideIndex.current + 1) % sources.length;
      }
    }
    bgImageFade.current += ((sources && sources.length ? 1 : 0) - bgImageFade.current) * 0.09;

    const bgCanvas = bgCanvasRef.current;
    const bgCtx = bgCanvas?.getContext("2d");
    if (bgCanvas && bgCtx) {
      const activeSrc = sources && sources[bgSlideIndex.current % sources.length];
      const srcReady = !!(activeSrc && isSourceReady(activeSrc));
      // The lerps above settle to bit-identical values once idle (no hover,
      // background color at rest), so most frames would repaint pixel-identical
      // output. Redrawing the canvas and re-uploading it as a GPU texture on
      // every single frame regardless — as this used to do — burns real
      // bandwidth for no visible change. Skip both unless something that
      // actually affects the drawn pixels has moved since the last paint.
      const signature = `${displayedBg.current.getHexString()}|${bgImageFade.current.toFixed(4)}|${srcReady ? bgSlideIndex.current : -1}`;
      if (signature === lastBgDrawSignature.current) {
        return;
      }
      lastBgDrawSignature.current = signature;

      const cw = bgCanvas.width;
      const ch = bgCanvas.height;
      bgCtx.globalAlpha = 1;
      bgCtx.fillStyle = `#${displayedBg.current.getHexString()}`;
      bgCtx.fillRect(0, 0, cw, ch);

      if (bgImageFade.current > 0.01 && activeSrc && isSourceReady(activeSrc)) {
        const [sw, sh] = sourceSize(activeSrc);
        const srcAspect = sw / sh;
        const dstAspect = cw / ch;
        let dw = cw;
        let dh = ch;
        let dx = 0;
        let dy = 0;
        if (srcAspect > dstAspect) {
          dh = ch;
          dw = ch * srcAspect;
          dx = (cw - dw) / 2;
        } else {
          dw = cw;
          dh = cw / srcAspect;
          dy = (ch - dh) / 2;
        }
        bgCtx.globalAlpha = bgImageFade.current * 0.85;
        bgCtx.drawImage(activeSrc, dx, dy, dw, dh);
        // Strong dark scrim — foreground text must stay legible no matter how
        // bright the hovered project's own photo is.
        bgCtx.globalAlpha = 0.78 * bgImageFade.current;
        bgCtx.fillStyle = "#0E2038";
        bgCtx.fillRect(0, 0, cw, ch);
        bgCtx.globalAlpha = 1;
      }
      bgTextureRef.current!.needsUpdate = true;
    }
  });

  function enter(i: number) {
    return (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (activeFocus.current >= 0) return;
      setHovered(i);
      onHover?.(i);
      document.body.dataset.cursor = "view";
    };
  }
  function leave(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    setHovered(-1);
    onHover?.(-1);
    delete document.body.dataset.cursor;
  }
  function click(i: number) {
    return (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (activeFocus.current >= 0) return;
      setHovered(-1);
      onHover?.(-1);
      delete document.body.dataset.cursor;
      onSelect?.(i);
    };
  }

  return (
    <group ref={root}>
      {artworks.map((artwork, i) => {
        const [w, h] = sizes[i];
        return (
          <group
            key={artwork.id}
            ref={(el) => {
              groups.current[i] = el;
            }}
            onPointerOver={enter(i)}
            onPointerOut={leave}
            onClick={click(i)}
          >
            <mesh position={[0, 0, -0.03]}>
              <planeGeometry args={[w + 0.16, h + 0.16]} />
              <meshBasicMaterial color={frameBg} toneMapped={false} />
            </mesh>
            <mesh>
              <planeGeometry args={[w, h]} />
              <meshBasicMaterial map={textures[i]} toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
