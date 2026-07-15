"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Real-time GPU fluid simulation (Stam's stable fluids / Navier-Stokes) — the
 * Alkemy-style cursor smoke. Moving the pointer injects velocity + dye into the
 * field; the solver advects it, adds swirl (vorticity confinement), enforces
 * incompressibility (divergence + Jacobi pressure solve + gradient subtract) and
 * lets the dye slowly dissipate. Everything runs on the GPU across a set of
 * ping-pong framebuffers. Original implementation of the standard algorithm.
 *
 * Runs imperatively inside the R3F canvas: `useFrame(cb, 1)` takes over the
 * render loop (R3F stops auto-rendering) so we can drive the multi-pass solve
 * and blit the final dye to the screen ourselves.
 */

const BASE_VERTEX = /* glsl */ `
  precision highp float;
  attribute vec3 position;
  attribute vec2 uv;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
    vUv = uv;
    vL = uv - vec2(texelSize.x, 0.0);
    vR = uv + vec2(texelSize.x, 0.0);
    vT = uv + vec2(0.0, texelSize.y);
    vB = uv - vec2(0.0, texelSize.y);
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const SPLAT_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

const ADVECTION_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  void main () {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    gl_FragColor = dissipation * texture2D(uSource, coord);
    gl_FragColor.a = 1.0;
  }
`;

const DIVERGENCE_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;
    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) { L = -C.x; }
    if (vR.x > 1.0) { R = -C.x; }
    if (vT.y > 1.0) { T = -C.y; }
    if (vB.y < 0.0) { B = -C.y; }
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

const CURL_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`;

const VORTICITY_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;
    vec2 vel = texture2D(uVelocity, vUv).xy;
    vel += force * dt;
    vel = clamp(vel, -1000.0, 1000.0);
    gl_FragColor = vec4(vel, 0.0, 1.0);
  }
`;

const PRESSURE_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

const GRADIENT_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

const CLEAR_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;
  void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
  }
`;

const DISPLAY_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;
    // near-black cinematic base + gentle vignette so the smoke reads on dark
    vec2 p = vUv - 0.5;
    float vig = 1.0 - dot(p, p) * 0.55;
    vec3 base = vec3(0.012, 0.012, 0.019);
    gl_FragColor = vec4((base + c) * vig, 1.0);
  }
`;

// Brand-palette smoke tints (dark cinematic). Each splat picks the next one.
const PALETTE: [number, number, number][] = [
  [0.13, 0.84, 0.64], // teal
  [0.84, 0.66, 0.29], // gold
  [0.42, 0.23, 0.72], // violet
  [0.15, 0.36, 0.42], // deep blue
  [0.23, 0.9, 0.77], // bright teal
];

interface DoubleFBO {
  read: THREE.WebGLRenderTarget;
  write: THREE.WebGLRenderTarget;
  swap: () => void;
  texelSize: THREE.Vector2;
  dispose: () => void;
}

interface Splat {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: [number, number, number];
}

function resolution(gl: THREE.WebGLRenderer, res: number) {
  const w = gl.domElement.width;
  const h = gl.domElement.height;
  let aspect = w / h;
  if (aspect < 1) aspect = 1 / aspect;
  const min = Math.round(res);
  const max = Math.round(res * aspect);
  return w > h ? { width: max, height: min } : { width: min, height: max };
}

function makeRT(w: number, h: number, type: THREE.TextureDataType, filter: THREE.MinificationTextureFilter) {
  const rt = new THREE.WebGLRenderTarget(w, h, {
    type,
    format: THREE.RGBAFormat,
    minFilter: filter,
    magFilter: filter as THREE.MagnificationTextureFilter,
    depthBuffer: false,
    stencilBuffer: false,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
  });
  return rt;
}

function makeDouble(
  w: number,
  h: number,
  type: THREE.TextureDataType,
  filter: THREE.MinificationTextureFilter
): DoubleFBO {
  let a = makeRT(w, h, type, filter);
  let b = makeRT(w, h, type, filter);
  return {
    get read() {
      return a;
    },
    get write() {
      return b;
    },
    swap() {
      const t = a;
      a = b;
      b = t;
    },
    texelSize: new THREE.Vector2(1 / w, 1 / h),
    dispose() {
      a.dispose();
      b.dispose();
    },
  };
}

export function FluidSimulation({ intensity = 1 }: { intensity?: number }) {
  const gl = useThree((s) => s.gl);
  const sim = useRef<{
    dye: DoubleFBO;
    velocity: DoubleFBO;
    divergence: THREE.WebGLRenderTarget;
    curl: THREE.WebGLRenderTarget;
    pressure: DoubleFBO;
    mats: Record<string, THREE.RawShaderMaterial>;
    scene: THREE.Scene;
    camera: THREE.Camera;
    mesh: THREE.Mesh;
    geo: THREE.PlaneGeometry;
    iterations: number;
  } | null>(null);

  const splats = useRef<Splat[]>([]);
  const pointer = useRef({ x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5, moved: false, active: false });
  const colorIndex = useRef(0);
  const lastInput = useRef(0);

  const mobile = intensity < 0.9;
  const SIM_RES = mobile ? 96 : 128;
  const DYE_RES = mobile ? 384 : 512;
  const PRESSURE_ITER = mobile ? 16 : 20;
  const CURL = 24;
  const SPLAT_RADIUS = 0.11; // small, refined
  const SPLAT_FORCE = 5200;
  const DENSITY_DISSIPATION = 0.978;
  const VELOCITY_DISSIPATION = 0.986;
  const PRESSURE = 0.8;

  // Build the simulation (and rebuild on renderer resize).
  useEffect(() => {
    const caps = gl.capabilities;
    const halfSupported = caps.isWebGL2 || !!gl.extensions.get("OES_texture_half_float");
    const linearSupported =
      caps.isWebGL2 || !!gl.extensions.get("OES_texture_half_float_linear") || !!gl.extensions.get("OES_texture_float_linear");
    const type: THREE.TextureDataType = halfSupported ? THREE.HalfFloatType : THREE.UnsignedByteType;
    const linFilter: THREE.MinificationTextureFilter = linearSupported ? THREE.LinearFilter : THREE.NearestFilter;

    const build = () => {
      sim.current?.dye.dispose();
      sim.current?.velocity.dispose();
      sim.current?.pressure.dispose();
      sim.current?.divergence.dispose();
      sim.current?.curl.dispose();

      const simRes = resolution(gl, SIM_RES);
      const dyeRes = resolution(gl, DYE_RES);

      const dye = makeDouble(dyeRes.width, dyeRes.height, type, linFilter);
      const velocity = makeDouble(simRes.width, simRes.height, type, linFilter);
      const divergence = makeRT(simRes.width, simRes.height, type, THREE.NearestFilter);
      const curl = makeRT(simRes.width, simRes.height, type, THREE.NearestFilter);
      const pressure = makeDouble(simRes.width, simRes.height, type, THREE.NearestFilter);

      const make = (frag: string) =>
        new THREE.RawShaderMaterial({
          vertexShader: BASE_VERTEX,
          fragmentShader: frag,
          depthTest: false,
          depthWrite: false,
          uniforms: { texelSize: { value: new THREE.Vector2() } } as Record<string, THREE.IUniform>,
        });

      const prev = sim.current;
      const mats =
        prev?.mats ??
        {
          splat: make(SPLAT_FRAG),
          advection: make(ADVECTION_FRAG),
          divergence: make(DIVERGENCE_FRAG),
          curl: make(CURL_FRAG),
          vorticity: make(VORTICITY_FRAG),
          pressure: make(PRESSURE_FRAG),
          gradient: make(GRADIENT_FRAG),
          clear: make(CLEAR_FRAG),
          display: make(DISPLAY_FRAG),
        };

      const scene = prev?.scene ?? new THREE.Scene();
      const camera = prev?.camera ?? new THREE.Camera();
      const geo = prev?.geo ?? new THREE.PlaneGeometry(2, 2);
      const mesh = prev?.mesh ?? new THREE.Mesh(geo);
      if (!prev) scene.add(mesh);

      sim.current = { dye, velocity, divergence, curl, pressure, mats, scene, camera, mesh, geo, iterations: PRESSURE_ITER };
    };

    build();

    // rebuild targets when the drawing buffer size changes
    let lastW = gl.domElement.width;
    let lastH = gl.domElement.height;
    const ro = () => {
      if (gl.domElement.width !== lastW || gl.domElement.height !== lastH) {
        lastW = gl.domElement.width;
        lastH = gl.domElement.height;
        build();
      }
    };
    const interval = window.setInterval(ro, 500);

    return () => {
      window.clearInterval(interval);
      const s = sim.current;
      if (s) {
        s.dye.dispose();
        s.velocity.dispose();
        s.pressure.dispose();
        s.divergence.dispose();
        s.curl.dispose();
        Object.values(s.mats).forEach((m) => m.dispose());
        s.geo.dispose();
      }
      sim.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl]);

  // Pointer → queued splats (fine pointers + touch drag).
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      const p = pointer.current;
      const dx = (x - p.x) * SPLAT_FORCE;
      const dy = (y - p.y) * SPLAT_FORCE;
      p.prevX = p.x;
      p.prevY = p.y;
      p.x = x;
      p.y = y;
      if (!p.active) {
        p.active = true;
        return; // skip the first jump
      }
      const moved = Math.abs(dx) + Math.abs(dy);
      if (moved < 0.5) return;
      const c = PALETTE[colorIndex.current % PALETTE.length];
      colorIndex.current++;
      const k = 0.22;
      splats.current.push({ x, y, dx, dy, color: [c[0] * k, c[1] * k, c[2] * k] });
      if (splats.current.length > 24) splats.current.shift();
      lastInput.current = performance.now();
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Take over the render loop (priority 1 → R3F stops auto-rendering).
  useFrame((state, delta) => {
    const s = sim.current;
    if (!s) return;
    const dt = Math.min(delta, 0.016666);
    const { mats, dye, velocity, divergence, curl, pressure, scene, camera, mesh } = s;

    const blit = (mat: THREE.RawShaderMaterial, target: THREE.WebGLRenderTarget | null) => {
      mesh.material = mat;
      gl.setRenderTarget(target);
      gl.render(scene, camera);
    };
    const setTexel = (mat: THREE.RawShaderMaterial, v: THREE.Vector2) =>
      ((mat.uniforms.texelSize.value as THREE.Vector2).copy(v));

    // Ambient life: if idle (or touch), inject a slow drifting auto-splat.
    const idle = performance.now() - lastInput.current > 1400;
    if (idle) {
      const t = state.clock.elapsedTime;
      const x = 0.5 + 0.34 * Math.sin(t * 0.19);
      const y = 0.5 + 0.28 * Math.cos(t * 0.15);
      const dx = Math.cos(t * 0.19) * 0.19 * SPLAT_FORCE * 0.012;
      const dy = -Math.sin(t * 0.15) * 0.28 * SPLAT_FORCE * 0.012;
      const c = PALETTE[colorIndex.current % PALETTE.length];
      colorIndex.current++;
      splats.current.push({ x, y, dx, dy, color: [c[0] * 0.09, c[1] * 0.09, c[2] * 0.09] });
    }

    // 1. apply queued splats (velocity + dye)
    const aspect = gl.domElement.width / gl.domElement.height;
    let radius = SPLAT_RADIUS / 100;
    if (aspect > 1) radius *= aspect;
    const splatMat = mats.splat;
    for (const sp of splats.current) {
      setTexel(splatMat, velocity.texelSize);
      splatMat.uniforms.uTarget = { value: velocity.read.texture };
      splatMat.uniforms.aspectRatio = { value: aspect };
      splatMat.uniforms.point = { value: new THREE.Vector2(sp.x, sp.y) };
      splatMat.uniforms.radius = { value: radius };
      splatMat.uniforms.color = { value: new THREE.Vector3(sp.dx, sp.dy, 0) };
      blit(splatMat, velocity.write);
      velocity.swap();

      splatMat.uniforms.uTarget = { value: dye.read.texture };
      splatMat.uniforms.color = { value: new THREE.Vector3(sp.color[0], sp.color[1], sp.color[2]) };
      blit(splatMat, dye.write);
      dye.swap();
    }
    splats.current.length = 0;

    // 2. curl
    setTexel(mats.curl, velocity.texelSize);
    mats.curl.uniforms.uVelocity = { value: velocity.read.texture };
    blit(mats.curl, curl);

    // 3. vorticity
    setTexel(mats.vorticity, velocity.texelSize);
    mats.vorticity.uniforms.uVelocity = { value: velocity.read.texture };
    mats.vorticity.uniforms.uCurl = { value: curl.texture };
    mats.vorticity.uniforms.curl = { value: CURL };
    mats.vorticity.uniforms.dt = { value: dt };
    blit(mats.vorticity, velocity.write);
    velocity.swap();

    // 4. divergence
    setTexel(mats.divergence, velocity.texelSize);
    mats.divergence.uniforms.uVelocity = { value: velocity.read.texture };
    blit(mats.divergence, divergence);

    // 5. clear pressure
    setTexel(mats.clear, velocity.texelSize);
    mats.clear.uniforms.uTexture = { value: pressure.read.texture };
    mats.clear.uniforms.value = { value: PRESSURE };
    blit(mats.clear, pressure.write);
    pressure.swap();

    // 6. pressure solve (Jacobi)
    setTexel(mats.pressure, velocity.texelSize);
    mats.pressure.uniforms.uDivergence = { value: divergence.texture };
    for (let i = 0; i < s.iterations; i++) {
      mats.pressure.uniforms.uPressure = { value: pressure.read.texture };
      blit(mats.pressure, pressure.write);
      pressure.swap();
    }

    // 7. gradient subtract
    setTexel(mats.gradient, velocity.texelSize);
    mats.gradient.uniforms.uPressure = { value: pressure.read.texture };
    mats.gradient.uniforms.uVelocity = { value: velocity.read.texture };
    blit(mats.gradient, velocity.write);
    velocity.swap();

    // 8. advect velocity
    setTexel(mats.advection, velocity.texelSize);
    mats.advection.uniforms.uVelocity = { value: velocity.read.texture };
    mats.advection.uniforms.uSource = { value: velocity.read.texture };
    mats.advection.uniforms.dt = { value: dt };
    mats.advection.uniforms.dissipation = { value: VELOCITY_DISSIPATION };
    blit(mats.advection, velocity.write);
    velocity.swap();

    // 9. advect dye
    setTexel(mats.advection, velocity.texelSize);
    mats.advection.uniforms.uVelocity = { value: velocity.read.texture };
    mats.advection.uniforms.uSource = { value: dye.read.texture };
    mats.advection.uniforms.dissipation = { value: DENSITY_DISSIPATION };
    blit(mats.advection, dye.write);
    dye.swap();

    // 10. display to screen
    mats.display.uniforms.uTexture = { value: dye.read.texture };
    blit(mats.display, null);
    gl.setRenderTarget(null);
  }, 1);

  return null;
}
