"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { brand } from "@/config/theme";
import { chapters } from "@/content/chapters";
import { cn } from "@/lib/utils";

/**
 * Minimal fixed header. Transparent over the hero, gains a paper backdrop and
 * hairline once scrolled, hides on scroll-down and returns on scroll-up. On the
 * home story it surfaces the current chapter's kicker.
 */
export function Header() {
  const { menuOpen, toggleMenu } = useAppStore();
  const activeChapter = useAppStore((s) => s.activeChapter);
  const overlayOpen = useAppStore((s) => s.overlayOpen);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 320 && y > last && !menuOpen);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  const currentKicker = isHome ? chapters[activeChapter]?.kicker : undefined;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[75] transition-all duration-500 ease-editorial",
        hidden ? "-translate-y-full" : "translate-y-0",
        overlayOpen && "pointer-events-none -translate-y-full opacity-0",
        scrolled && !menuOpen
          ? "border-b border-line/12 bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
      aria-hidden={overlayOpen}
      style={{ height: "var(--header-h)" }}
    >
      <div className="container-editorial flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          className={cn(
            "font-display text-xl leading-none tracking-tight transition-colors",
            menuOpen ? "text-ink" : "text-ink"
          )}
          aria-label={`${brand.full} — home`}
        >
          {brand.name}
          <span className="text-accent">.</span>
        </Link>

        <div className="pointer-events-none hidden flex-1 items-center justify-center md:flex">
          {currentKicker && !menuOpen ? (
            <span key={currentKicker} className="label animate-fade-up">
              {currentKicker}
            </span>
          ) : null}
        </div>

        <nav className="flex items-center gap-5">
          <Link
            href="/archive"
            className={cn(
              "hidden font-mono text-xs uppercase tracking-label transition-colors sm:inline-block link-underline",
              menuOpen ? "text-ink" : "text-ink-soft hover:text-ink"
            )}
          >
            Archive
          </Link>
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="fullscreen-menu"
            className={cn(
              "group flex items-center gap-2.5 font-mono text-xs uppercase tracking-label transition-colors",
              menuOpen ? "text-ink" : "text-ink"
            )}
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span className="relative flex h-3 w-5 flex-col justify-between">
              <span className={cn("h-px w-full origin-center bg-current transition-transform duration-300", menuOpen && "translate-y-[5.5px] rotate-45")} />
              <span className={cn("h-px w-full bg-current transition-opacity duration-300", menuOpen && "opacity-0")} />
              <span className={cn("h-px w-full origin-center bg-current transition-transform duration-300", menuOpen && "-translate-y-[5.5px] -rotate-45")} />
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
