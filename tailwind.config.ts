import type { Config } from "tailwindcss";

/**
 * Colours are driven by CSS custom properties declared in src/app/globals.css.
 * Each variable holds an "R G B" triplet so Tailwind's <alpha-value> works,
 * e.g. `bg-paper/70`. The single source of truth for the palette is
 * src/config/theme.ts, which is written into :root at runtime by ThemeStyle.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        "paper-deep": "rgb(var(--paper-deep) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--ink-soft) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-deep": "rgb(var(--accent-deep) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 11vw, 11rem)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 7vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(2rem, 4.5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        label: "0.28em",
      },
      maxWidth: {
        prose: "68ch",
        editorial: "1680px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(1.25rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-1.2%,0)" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both",
        drift: "drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
