"use client";

/**
 * Root-layout error boundary — only fires when the layout itself (which
 * provides <ThemeStyle/> and every Tailwind color token) crashes, so this
 * file cannot rely on those tokens and uses literal brand hex values instead.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          padding: "2rem",
          textAlign: "center",
          backgroundColor: "#0E2038",
          color: "#F3F5F8",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#FF9807" }}>
          Unexpected error
        </p>
        <h1 style={{ margin: 0, fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>Something went wrong.</h1>
        <p style={{ margin: 0, maxWidth: "32ch", opacity: 0.8 }}>
          The page failed to load. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            border: "none",
            cursor: "pointer",
            padding: "1rem 1.75rem",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            backgroundColor: "#FF9807",
            color: "#0E2038",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
