import type { ReactEventHandler } from "react";
import { cn } from "@/lib/utils";

/**
 * The brand's animated logo. Callers size it entirely via `className`;
 * `fit` picks object-fit — "cover" fills the frame (cropping), "contain"
 * shows the whole animation shrunk to fit, uncropped.
 */
export function LogoAnimation({
  className,
  fit = "cover",
  loop = true,
  onEnded,
  onLoadedMetadata,
}: {
  className?: string;
  fit?: "cover" | "contain";
  loop?: boolean;
  onEnded?: ReactEventHandler<HTMLVideoElement>;
  onLoadedMetadata?: ReactEventHandler<HTMLVideoElement>;
}) {
  return (
    <video
      src="/video/logo-animation.mp4"
      autoPlay
      loop={loop}
      muted
      playsInline
      onEnded={onEnded}
      onLoadedMetadata={onLoadedMetadata}
      className={cn(fit === "cover" ? "object-cover" : "object-contain", className)}
    />
  );
}
