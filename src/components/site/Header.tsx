"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { brand, primaryNav, type NavItem } from "@/config/theme";
import { chapters } from "@/content/chapters";
import { ThemeToggle } from "@/components/providers/ThemeToggle";
import { cn, smoothScrollToId } from "@/lib/utils";

/** Primary nav items shown inline in the desktop navbar (skip Contact, which
 *  gets its own CTA button on the right). */
const desktopNav = primaryNav.filter((item) => item.href !== "/contact");

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

  /** On the homepage, a nav item with a matching section scrolls in place
   *  instead of navigating — everywhere else it's a normal route change. */
  function handleNavClick(item: NavItem, e: MouseEvent<HTMLAnchorElement>) {
    if (!isHome || (!item.sectionId && item.href !== "/")) return;
    e.preventDefault();
    smoothScrollToId(item.sectionId);
  }

  function handleQuoteClick(e: MouseEvent<HTMLAnchorElement>) {
    if (!isHome) return;
    e.preventDefault();
    smoothScrollToId("contact");
  }

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
        <div className="flex items-center gap-9">
          <Link href="/" className="flex items-center" aria-label={`${brand.full} — home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" className="h-16 w-auto md:h-[4.5rem]" />
          </Link>

          {/* Full desktop navbar — collapses behind the hamburger below `lg`. */}
          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {desktopNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(item, e)}
                className={cn(
                  "font-mono text-xs uppercase tracking-label link-underline transition-colors",
                  menuOpen ? "text-ink" : "text-ink-soft hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pointer-events-none hidden flex-1 items-center justify-center md:flex">
          {currentKicker && !menuOpen ? (
            <span key={currentKicker} className="label animate-fade-up">
              {currentKicker}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-5">
          <ThemeToggle className="hidden lg:flex" />
          <Link
            href="/contact"
            onClick={handleQuoteClick}
            className={cn(
              "hidden items-center border px-4 py-2 font-mono text-xs uppercase tracking-label transition-colors lg:inline-flex",
              menuOpen
                ? "border-ink/30 text-ink"
                : "border-ink-soft/25 text-ink-soft hover:border-accent hover:text-accent"
            )}
          >
            Get a Quote
          </Link>
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="fullscreen-menu"
            className="group flex items-center gap-2.5 font-mono text-xs uppercase tracking-label text-ink transition-colors lg:hidden"
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span className="relative flex h-3 w-5 flex-col justify-between">
              <span className={cn("h-px w-full origin-center bg-current transition-transform duration-300", menuOpen && "translate-y-[5.5px] rotate-45")} />
              <span className={cn("h-px w-full bg-current transition-opacity duration-300", menuOpen && "opacity-0")} />
              <span className={cn("h-px w-full origin-center bg-current transition-transform duration-300", menuOpen && "-translate-y-[5.5px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
