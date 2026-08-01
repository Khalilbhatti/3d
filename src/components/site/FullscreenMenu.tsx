"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, type FormEvent, type MouseEvent } from "react";
import { useAppStore } from "@/lib/store";
import { lockScroll } from "@/components/providers/SmoothScrollProvider";
import { primaryNav, socialLinks, brand, type NavItem } from "@/config/theme";
import { collections } from "@/content/collections";
import { getStories } from "@/content/index";
import { ThemeToggle } from "@/components/providers/ThemeToggle";
import { cn, smoothScrollToId } from "@/lib/utils";

/**
 * Animated fullscreen navigation. Locks scroll, closes on Esc / route change,
 * exposes primary nav, collection + journal shortcuts, search, and socials.
 * Rendered as an accessible dialog with a labelled heading.
 */
export function FullscreenMenu() {
  const { menuOpen, setMenuOpen } = useAppStore();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const recentStories = getStories().slice(0, 3);

  /** On the homepage, a nav item with a matching section scrolls in place
   *  instead of navigating — everywhere else it's a normal route change. */
  function handleNavClick(item: NavItem, e: MouseEvent<HTMLAnchorElement>) {
    if (!isHome || (!item.sectionId && item.href !== "/")) return;
    e.preventDefault();
    setMenuOpen(false);
    smoothScrollToId(item.sectionId);
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    lockScroll(menuOpen);
    if (menuOpen) {
      const t = setTimeout(() => searchRef.current?.focus(), 450);
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        clearTimeout(t);
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [menuOpen, setMenuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function onSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    router.push(q ? `/portfolio?q=${encodeURIComponent(q)}` : "/portfolio");
  }

  return (
    <div
      id="fullscreen-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      data-open={menuOpen}
      className={cn(
        "group fixed inset-0 z-[74] bg-paper text-ink transition-[clip-path,opacity] duration-700 ease-in-out-quint",
        menuOpen
          ? "pointer-events-auto opacity-100 [clip-path:inset(0_0_0_0)]"
          : "pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0)]"
      )}
    >
      <div className="grain absolute inset-0 opacity-40" aria-hidden />
      <div
        className="container-editorial grid h-full grid-rows-[var(--header-h)_1fr] overflow-y-auto"
        data-lenis-prevent
      >
        <div aria-hidden />

        <div className="grid gap-12 pb-16 pt-6 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <nav aria-label="Primary" className="flex flex-col justify-center">
            <ul className="space-y-1">
              {primaryNav.map((item, i) => (
                <li
                  key={item.href}
                  className={cn(
                    "translate-y-6 opacity-0 transition-all duration-700 ease-editorial",
                    "group-data-[open=true]:translate-y-0 group-data-[open=true]:opacity-100"
                  )}
                  style={{ transitionDelay: `${120 + i * 55}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(item, e)}
                    className="group/link flex items-baseline gap-4 py-2"
                  >
                    <span className="w-8 font-mono text-xs text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[clamp(2rem,6vw,4.25rem)] leading-[0.98] tracking-tight text-ink transition-colors duration-300 group-hover/link:text-accent">
                      {item.label}
                    </span>
                    <span className="hidden translate-x-0 self-center text-xs text-ink/40 opacity-0 transition-all duration-300 group-hover/link:opacity-100 md:block">
                      {item.note}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col justify-center gap-10 border-t border-ink/15 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <form onSubmit={onSearch} className="group/search">
              <label htmlFor="menu-search" className="label text-ink/50">Search projects</label>
              <div className="mt-3 flex items-center gap-3 border-b border-ink/25 pb-2 focus-within:border-accent">
                <input
                  id="menu-search"
                  name="q"
                  ref={searchRef}
                  type="search"
                  placeholder="Project, industry, stack…"
                  className="w-full bg-transparent font-display text-lg text-ink placeholder:text-ink/30 focus:outline-none"
                />
                <button type="submit" className="label text-ink hover:text-accent">Go</button>
              </div>
            </form>

            <div>
              <span className="label text-ink/50">Services</span>
              <ul className="mt-3 space-y-2">
                {collections.map((c) => (
                  <li key={c.id}>
                    <Link href={`/services/${c.slug}`} className="link-underline text-ink/85 hover:text-ink">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="label text-ink/50">Latest insights</span>
              <ul className="mt-3 space-y-2">
                {recentStories.map((s) => (
                  <li key={s.id}>
                    <Link href={`/insights/${s.slug}`} className="link-underline text-ink/85 hover:text-ink">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-4">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="label text-ink/60 transition-colors hover:text-ink">
                  {s.label}
                </a>
              ))}
              <span className="label ml-auto text-ink/40">{brand.email}</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
