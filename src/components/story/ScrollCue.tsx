import { cn } from "@/lib/utils";

/** Ambient "scroll to enter" indicator with a travelling line. */
export function ScrollCue({
  label = "Scroll to enter",
  className,
  tone = "ink",
}: {
  label?: string;
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        tone === "paper" ? "text-paper/70" : "text-ink/60",
        className
      )}
    >
      <span className="font-mono text-[0.65rem] uppercase tracking-label">{label}</span>
      <span className="relative block h-10 w-px overflow-hidden">
        <span className="absolute inset-0 bg-current opacity-25" />
        <span className="absolute inset-x-0 top-0 h-4 w-px animate-[cue_2.2s_ease-in-out_infinite] bg-current" />
      </span>
    </div>
  );
}
