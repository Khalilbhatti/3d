"use client";

import Link from "next/link";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Kicker } from "@/components/typography/primitives";

/** Route-segment error boundary — catches a runtime crash anywhere under the root layout. */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-editorial flex min-h-[70vh] flex-col items-start justify-center pb-24 pt-[calc(var(--header-h)+5rem)]">
      <Kicker accent>Unexpected error</Kicker>
      <h1 className="mt-6 font-display text-display-lg leading-[0.95] text-ink">
        Something didn&rsquo;t load right.
      </h1>
      <p className="mt-6 max-w-md text-pretty text-lg text-ink-soft">
        This page hit an unexpected error. Try again, or head back to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
        <MagneticButton>
          <button
            onClick={reset}
            className="inline-flex items-center gap-3 bg-ink px-7 py-4 font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-accent"
          >
            Try again →
          </button>
        </MagneticButton>
        <Link href="/" className="link-underline self-center text-ink">
          Return home
        </Link>
      </div>
    </div>
  );
}
