/** Keyboard skip-to-content link. Visible only when focused. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only-focusable fixed left-4 top-4 z-[100] bg-ink px-4 py-2 font-mono text-xs uppercase tracking-label text-paper"
    >
      Skip to content
    </a>
  );
}
