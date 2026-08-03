"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/config/theme";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { LogoAnimation } from "@/components/media/LogoAnimation";

const KEY = "auren:loaded";

/**
 * First-load preloader: an animated 0 → 100 counter over an paper curtain that
 * lifts to reveal the site. Shown once per session (sessionStorage) and kept
 * brief for reduced-motion users. Locks scroll while visible.
 */
export function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  // Skip instantly (pre-paint) if already shown this session.
  useIsomorphicLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) setVisible(false);
    } catch {
      /* storage blocked — just show it */
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    document.documentElement.style.overflow = "hidden";

    const duration = reduced ? 400 : 1900;
    let raf = 0;
    let start = 0;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      // ease-out for a natural settle
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        setTimeout(() => setVisible(false), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, reduced]);

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[120] flex flex-col justify-between bg-paper px-6 py-8 text-ink md:px-10"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <LogoAnimation className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-paper/55" />

          <div className="relative flex items-center justify-between">
            <span className="label text-ink/70">{brand.full}</span>
            <span className="label text-ink/50">Digital agency</span>
          </div>

          <div className="relative flex items-end justify-between">
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-ink/60">
              Smart solutions for your business — every byte in excellence.
            </p>
            <div className="text-right">
              <span className="font-display text-[clamp(4rem,14vw,10rem)] leading-none text-ink">
                {String(count).padStart(3, "0")}
              </span>
            </div>
          </div>

          {/* progress line */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-ink/15">
            <motion.div
              className="h-full origin-left bg-accent"
              style={{ scaleX: count / 100 }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
