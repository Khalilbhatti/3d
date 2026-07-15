"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Zoom + share controls for the artwork detail page. Zoom opens the fullscreen
 * viewer (with related works queued after this one). Share uses the Web Share
 * API where available and falls back to copying the page URL.
 */
export function ArtworkActions({
  ids,
  title,
  className,
}: {
  ids: string[];
  title: string;
  className?: string;
}) {
  const openViewer = useAppStore((s) => s.openViewer);
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user dismissed — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  const base =
    "inline-flex items-center gap-2 border border-line/30 px-5 py-3 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper";

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <button type="button" onClick={() => openViewer(ids, 0)} className={base}>
        Zoom &amp; pan ⤢
      </button>
      <button type="button" onClick={share} className={base}>
        {copied ? "Link copied ✓" : "Share →"}
      </button>
    </div>
  );
}
