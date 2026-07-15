/**
 * Dark cinematic marbled liquid-ink / smoke shader. A near-black base with soft
 * flowing colour veins (emerald/teal, gold, violet, blue) that emerge from the
 * darkness — organic, blurred and translucent. A flow field advects the UVs for
 * smoky streaks; ridged FBM adds marbled veins; two noise fields blend the
 * palette. Colour is weighted toward the edges (the centre reading area stays
 * calm/dark for readability). The cursor gently bends the flow toward it and its
 * velocity adds a little brightening, all decaying smoothly when idle. Original
 * GLSL, single pass, no textures.
 */
export const fluidFragment = /* glsl */ `
  precision highp float;

  #define TRAIL 12

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec2 uTrail[TRAIL]; // recent cursor path — [0] newest
  uniform float uMouseVelocity;
  uniform float uDistortion;
  uniform float uCursorInfluence;
  uniform float uSpeed;
  uniform vec3 uColor1; // near-black base
  uniform vec3 uColor2; // teal
  uniform vec3 uColor3; // gold
  uniform vec3 uColor4; // blue
  uniform vec3 uColor5; // violet
  uniform vec3 uColor6; // bright teal
  uniform vec3 uColor7; // deep violet

  float hash(vec2 p){
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++){
      v += a * noise(p);
      p = p * 2.0 + 7.13;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    float aspect = uResolution.x / max(1.0, uResolution.y);
    vec2 p = vUv; p.x *= aspect;

    float t = uTime * 0.03 * uSpeed;

    // Accumulate a spreading smoke WAKE from the cursor's recent path. Each
    // trailing sample adds a soft bloom (newer = stronger) and pushes the flow
    // field along the path, so moving the cursor disperses ink behind it and it
    // slowly fades. When idle the samples converge into one compact wisp.
    float infl = 0.0;
    vec2 pull = vec2(0.0);
    for (int i = 0; i < TRAIL; i++) {
      vec2 tp = uTrail[i]; tp.x *= aspect;
      float w = 1.0 - float(i) / float(TRAIL);        // fade along the tail
      float d = distance(p, tp);
      float f = (1.0 - smoothstep(0.0, 0.16 + 0.24 * w, d)) * w;
      infl += f;
      pull += (tp - p) * f;
    }
    infl = clamp(infl * uCursorInfluence, 0.0, 1.0);

    // flowing advection — fine, smaller-scale smoke streaks
    vec2 flow = vec2(fbm(p * 1.45 + t), fbm(p * 1.45 + vec2(4.0, 2.0) - t)) - 0.5;
    vec2 uv = p + flow * 0.19;
    uv += pull * 0.20;                                 // spread ink along the wake
    uv += (uDistortion + uMouseVelocity * 0.5) * infl *
          (vec2(fbm(p * 3.2 + t * 1.3), fbm(p * 3.2 - t * 1.1)) - 0.5);

    float base = fbm(uv * 2.15 + t * 0.8);
    float veins = 1.0 - abs(fbm(uv * 3.3 - t * 0.6) * 2.0 - 1.0);
    veins = pow(clamp(veins, 0.0, 1.0), 2.0);

    float n = clamp(base * 0.78 + veins * 0.42, 0.0, 1.0);
    float h = fbm(uv * 1.2 + 11.0);

    // Colour weighted toward the edges — calm, dark reading centre.
    float edge = smoothstep(0.02, 0.62, distance(vUv, vec2(0.5)));
    float acc = 0.30 + 0.70 * edge;

    vec3 col = uColor1; // near-black base
    col = mix(col, uColor2, smoothstep(0.30, 0.62, n) * 0.85 * acc);   // teal
    col = mix(col, uColor3, smoothstep(0.55, 0.92, n) * 0.80 * acc);   // gold
    col = mix(col, uColor4, smoothstep(0.0, 0.30, h) * 0.70 * acc);    // blue
    col = mix(col, uColor7, smoothstep(0.55, 1.0, n) * veins * 0.75 * acc); // deep violet
    col = mix(col, uColor5, smoothstep(0.50, 0.86, h) * 0.55 * acc);   // violet
    col = mix(col, uColor6, veins * 0.45 * acc);                       // bright teal veins

    // cursor gently brightens the flow near the pointer
    col += (uColor2 * 0.5 + uColor3 * 0.5) * infl * (0.10 + uMouseVelocity * 0.14) * acc;

    // gentle contrast lift
    col = (col - 0.015) * 1.14;
    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;
