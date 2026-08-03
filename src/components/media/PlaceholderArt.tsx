import { type ArtPalette } from "@/content/types";

/**
 * Deterministic, self-contained "artwork" generator. From a seed + palette it
 * paints a small vector scene that actually reads as the work it stands in for —
 * a luminist coastal landscape, a chiaroscuro portrait, or an illuminated
 * manuscript page — so every card shows a distinct, content-appropriate image
 * with no network and no external assets. Server-renderable (no hooks), scalable
 * to any size, and stable between SSR and client (pure function of the seed).
 */

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** Small deterministic PRNG (LCG) seeded from the string. */
function makeRand(seed: string) {
  let s = hash(seed) || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** 6-digit hex + alpha byte → 8-digit hex. */
function a(hex: string, alpha: number) {
  const v = Math.max(0, Math.min(255, Math.round(alpha * 255)))
    .toString(16)
    .padStart(2, "0");
  return `${hex}${v}`;
}

const W = 400;
const H = 500;

export function PlaceholderArt({
  seed,
  palette,
  className,
  motif = "field",
}: {
  seed: string;
  palette: ArtPalette;
  className?: string;
  /** Visual family. */
  motif?: "field" | "portrait" | "manuscript";
}) {
  const rand = makeRand(seed);
  const uid = hash(seed).toString(36);
  const from = palette.from;
  const via = palette.via ?? palette.to;
  const to = palette.to;

  const grain = (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.1,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );

  let scene: JSX.Element;

  if (motif === "portrait") {
    // Chiaroscuro bust against a luminous ground.
    const leftLit = rand() > 0.5;
    const headCx = W * (0.46 + rand() * 0.08);
    const headCy = H * (0.42 + rand() * 0.06);
    const headR = W * (0.15 + rand() * 0.03);
    const glowX = leftLit ? headCx - headR * 0.7 : headCx + headR * 0.7;
    scene = (
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, display: "block" }}
      >
        <defs>
          <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={to} />
            <stop offset="60%" stopColor={via} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <radialGradient id={`glow-${uid}`} cx={`${(glowX / W) * 100}%`} cy="38%" r="55%">
            <stop offset="0%" stopColor={a(from, 0.9)} />
            <stop offset="100%" stopColor={a(from, 0)} />
          </radialGradient>
          <linearGradient id={`face-${uid}`} x1={leftLit ? "0" : "1"} y1="0" x2={leftLit ? "1" : "0"} y2="1">
            <stop offset="0%" stopColor={a(from, 0.85)} />
            <stop offset="55%" stopColor={via} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <radialGradient id={`vig-${uid}`} cx="50%" cy="42%" r="75%">
            <stop offset="55%" stopColor={a(to, 0)} />
            <stop offset="100%" stopColor={a("#000000",0.55)} />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill={`url(#bg-${uid})`} />
        <rect width={W} height={H} fill={`url(#glow-${uid})`} />
        {/* shoulders */}
        <path
          d={`M ${W * 0.1} ${H} C ${W * 0.2} ${H * 0.72}, ${W * 0.34} ${H * 0.66}, ${headCx} ${H * 0.66}
             C ${W * 0.66} ${H * 0.66}, ${W * 0.8} ${H * 0.72}, ${W * 0.9} ${H} Z`}
          fill={`url(#face-${uid})`}
        />
        {/* neck */}
        <rect x={headCx - headR * 0.38} y={headCy} width={headR * 0.76} height={headR * 1.4} fill={to} />
        {/* head */}
        <ellipse cx={headCx} cy={headCy} rx={headR} ry={headR * 1.25} fill={`url(#face-${uid})`} />
        {/* rim light */}
        <ellipse
          cx={leftLit ? headCx - headR * 0.55 : headCx + headR * 0.55}
          cy={headCy - headR * 0.1}
          rx={headR * 0.28}
          ry={headR * 0.8}
          fill={a(from, 0.4)}
        />
        <rect width={W} height={H} fill={`url(#vig-${uid})`} />
      </svg>
    );
  } else if (motif === "manuscript") {
    // Illuminated vellum page: margins, ruled lines, an initial, a stain.
    const lines = 6 + Math.floor(rand() * 4);
    const parchment = via;
    scene = (
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, display: "block" }}
      >
        <defs>
          <linearGradient id={`pg-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={a(from, 0.7)} />
            <stop offset="45%" stopColor={parchment} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <radialGradient id={`stain-${uid}`} cx={`${30 + rand() * 40}%`} cy={`${25 + rand() * 45}%`} r="35%">
            <stop offset="0%" stopColor={a(to, 0.35)} />
            <stop offset="100%" stopColor={a(to, 0)} />
          </radialGradient>
          <radialGradient id={`vig-${uid}`} cx="50%" cy="45%" r="75%">
            <stop offset="60%" stopColor={a(to, 0)} />
            <stop offset="100%" stopColor={a("#000000",0.5)} />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill={`url(#pg-${uid})`} />
        <rect width={W} height={H} fill={`url(#stain-${uid})`} />
        {/* margin frame */}
        <rect
          x={W * 0.12}
          y={H * 0.1}
          width={W * 0.76}
          height={H * 0.8}
          fill="none"
          stroke={a(to, 0.5)}
          strokeWidth={1.5}
        />
        {/* illuminated initial */}
        <rect x={W * 0.16} y={H * 0.15} width={W * 0.16} height={W * 0.16} fill={a(from, 0.9)} stroke={a(to, 0.6)} />
        <rect
          x={W * 0.18}
          y={H * 0.17}
          width={W * 0.12}
          height={W * 0.12}
          fill="none"
          stroke={a(to, 0.55)}
          strokeWidth={1.2}
        />
        {/* ruled text */}
        {Array.from({ length: lines }).map((_, i) => {
          const y = H * 0.2 + (i + 1) * ((H * 0.62) / (lines + 1));
          const startX = i < 2 ? W * 0.35 : W * 0.18;
          const w = (W * 0.64 - (startX - W * 0.18)) * (0.7 + rand() * 0.28);
          return <rect key={i} x={startX} y={y} width={w} height={2} rx={1} fill={a(to, 0.6)} />;
        })}
        <rect width={W} height={H} fill={`url(#vig-${uid})`} />
      </svg>
    );
  } else {
    // Luminist coastal landscape.
    const horizon = H * (0.54 + rand() * 0.16);
    const sunX = W * (0.16 + rand() * 0.68);
    const sunR = W * (0.08 + rand() * 0.07);
    const sunY = horizon - sunR * (0.2 + rand() * 0.9);
    const clouds = 1 + Math.floor(rand() * 2);
    const hasCoast = rand() > 0.35;
    return (
      <div
        aria-hidden
        className={className}
        style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%", backgroundColor: to }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, display: "block" }}
        >
          <defs>
            <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={to} />
              <stop offset="55%" stopColor={via} />
              <stop offset="100%" stopColor={a(from, 0.95)} />
            </linearGradient>
            <linearGradient id={`sea-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={a(from, 0.65)} />
              <stop offset="30%" stopColor={via} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
            <radialGradient id={`sun-${uid}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFEAC2" />
              <stop offset="28%" stopColor={a(from, 0.95)} />
              <stop offset="100%" stopColor={a(from, 0)} />
            </radialGradient>
            <radialGradient id={`refl-${uid}`} cx="50%" cy="0%" r="90%">
              <stop offset="0%" stopColor={a(from, 0.5)} />
              <stop offset="100%" stopColor={a(from, 0)} />
            </radialGradient>
            <radialGradient id={`vig-${uid}`} cx="50%" cy="42%" r="78%">
              <stop offset="58%" stopColor={a(to, 0)} />
              <stop offset="100%" stopColor={a("#000000",0.4)} />
            </radialGradient>
          </defs>

          {/* sky */}
          <rect width={W} height={horizon} fill={`url(#sky-${uid})`} />
          {/* clouds */}
          {Array.from({ length: clouds }).map((_, i) => {
            const cy = horizon * (0.2 + rand() * 0.5);
            const cx = W * (0.1 + rand() * 0.8);
            const rx = W * (0.16 + rand() * 0.18);
            return <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={rx * 0.22} fill={a(from, 0.18)} />;
          })}
          {/* sun glow + core */}
          <circle cx={sunX} cy={sunY} r={sunR * 2.6} fill={`url(#sun-${uid})`} />
          <circle cx={sunX} cy={sunY} r={sunR} fill="#FFE4B3" opacity={0.92} />
          {/* distant coast */}
          {hasCoast ? (
            <path
              d={`M 0 ${horizon} Q ${W * 0.25} ${horizon - 22}, ${W * 0.5} ${horizon - 6}
                 T ${W} ${horizon - 14} L ${W} ${horizon} Z`}
              fill={a(to, 0.85)}
            />
          ) : null}
          {/* sea */}
          <rect y={horizon} width={W} height={H - horizon} fill={`url(#sea-${uid})`} />
          {/* horizon line */}
          <rect y={horizon - 1} width={W} height={2} fill={a(from, 0.7)} />
          {/* sun reflection on water */}
          <rect x={sunX - sunR * 1.3} y={horizon} width={sunR * 2.6} height={H - horizon} fill={`url(#refl-${uid})`} />
          {/* water striations */}
          {Array.from({ length: 4 }).map((_, i) => {
            const y = horizon + ((H - horizon) * (i + 1)) / 5;
            return <rect key={i} x={0} y={y} width={W} height={1} fill={a(from, 0.1 + i * 0.02)} />;
          })}
          <rect width={W} height={H} fill={`url(#vig-${uid})`} />
        </svg>
        {grain}
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={className}
      style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%", backgroundColor: to }}
    >
      {scene}
      {grain}
    </div>
  );
}
