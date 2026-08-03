"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/config/theme";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { LogoAnimation } from "@/components/media/LogoAnimation";

const KEY = "auren:loaded";
// Cosmetic counter duration until the video's real length is known, and a
// last-resort cap so a video that fails to load/play never traps a visitor.
const FALLBACK_DURATION = 4000;
const MAX_WAIT = 9000;

/**
 * First-load preloader: the full brand logo video plays once, full-bleed,
 * behind a 0 → 100 counter — the site only reveals once the video has
 * actually finished (or the safety cap trips). Shown once per session
 * (sessionStorage). Reduced-motion visitors skip the video and dismiss
 * quickly. Locks scroll while visible.
 */
export function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const durationRef = useRef(FALLBACK_DURATION);
  const doneRef = useRef(false);

  // Skip instantly (pre-paint) if already shown this session.
  useIsomorphicLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) setVisible(false);
    } catch {
      /* storage blocked — just show it */
    }
  }, []);

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    setCount(100);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    setTimeout(() => setVisible(false), 350);
  }

  // Cosmetic 0 → 100 counter, timed to the video's real duration once known.
  useEffect(() => {
    if (!visible) return;
    document.documentElement.style.overflow = "hidden";

    let raf = 0;
    let start = 0;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / durationRef.current);
      const eased = 1 - Math.pow(1 - p, 3);
      if (!doneRef.current) setCount(Math.round(eased * 100));
      if (p < 1 && !doneRef.current) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  // Reduced motion: no video, dismiss quickly. Full motion: safety cap only
  // — normal dismissal is driven by the video's own `ended` event below.
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(finish, reduced ? 400 : MAX_WAIT);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, reduced]);

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[120] flex flex-col justify-between bg-[#0E2038] px-6 py-8 text-[#F3F5F8] md:px-10"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          {!reduced ? (
            <LogoAnimation
              loop={false}
              className="absolute inset-0 h-full w-full opacity-70"
              onEnded={finish}
              onLoadedMetadata={(e) => {
                const d = e.currentTarget.duration;
                if (Number.isFinite(d) && d > 0) durationRef.current = d * 1000;
              }}
            />
          ) : null}
          <div className="absolute inset-0 bg-[#0A1626]/55" />

          <div className="relative flex items-center justify-between">
            <span className="label text-[#F3F5F8]/70">{brand.full}</span>
            <span className="label text-[#F3F5F8]/50">Digital agency</span>
          </div>

          <div className="relative flex items-end justify-between">
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-[#F3F5F8]/60">
              Smart solutions for your business — every byte in excellence.
            </p>
            <div className="text-right">
              <span className="font-display text-[clamp(4rem,14vw,10rem)] leading-none text-[#F3F5F8]">
                {String(count).padStart(3, "0")}
              </span>
            </div>
          </div>

          {/* progress line */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-[#F3F5F8]/15">
            <motion.div
              className="h-full origin-left bg-[#FF9807]"
              style={{ scaleX: count / 100 }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
